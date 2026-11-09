import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SwUpdate } from '@angular/service-worker';
import { Capacitor } from '@capacitor/core';
import { version } from '../../../../package.json';

/** Latest release of the game on GitHub: the Android app is attached to it (see .github/workflows/main.yml). */
const LATEST_RELEASE = 'https://api.github.com/repos/jasonconard/pk-project/releases/latest';
const CHECK_TIMEOUT = 8000;
/** Installed web app (PWA): how often a new version is looked for while playing (ms). */
const PWA_CHECK_EVERY = 30 * 60 * 1000;

interface Update {
  version: string;
  apkUrl: string;
  sizeMb: number;
}

/** 1.2.3 > 1.2.0? (numbers compared part by part, a missing part is 0) */
export function isNewer(candidate: string, current: string): boolean {
  const a = candidate.replace(/^v/, '').split('.').map(Number);
  const b = current.replace(/^v/, '').split('.').map(Number);
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const diff = (a[i] || 0) - (b[i] || 0);
    if (diff) {
      return diff > 0;
    }
  }
  return false;
}

/**
 * Offers the new versions of the game.
 * - Android app: at launch, looks for a newer release on GitHub and offers to install its APK. The link opens
 *   outside the app (Chrome downloads it, then Android installs it over the current version: same signing key).
 *   Silent when offline or when GitHub doesn't answer.
 * - Web app (PWA, iOS included): the service worker downloads a new version in the background, but it would only
 *   be used once the app is fully closed (an iOS home screen app hardly ever is). It is looked for at launch, when
 *   the app comes back to the screen and every 30 min; once downloaded, a reload is offered.
 */
@Component({
  selector: 'app-update-prompt',
  templateUrl: './update-prompt.component.html',
  styleUrl: './update-prompt.component.scss',
})
export class UpdatePromptComponent implements OnInit {
  private readonly swUpdate = inject(SwUpdate);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly update = signal<Update | null>(null);
  /** Web app: a new version is downloaded, ready to be used after a reload. */
  protected readonly webReady = signal(false);
  protected readonly current = version;

  ngOnInit() {
    if (Capacitor.isNativePlatform()) {
      this.check();
    } else if (this.swUpdate.isEnabled) {
      this.watchWebVersions();
    }
  }

  protected later() {
    this.update.set(null);
    this.webReady.set(false);
  }

  /** Web app: switches to the downloaded version (the page is loaded again from it). */
  protected async reload() {
    try {
      await this.swUpdate.activateUpdate();
    } finally {
      document.location.reload();
    }
  }

  private watchWebVersions() {
    this.swUpdate.versionUpdates.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(event => {
      if (event.type === 'VERSION_READY') {
        this.webReady.set(true);
      }
    });
    // Broken cache (files of the running version gone): only a reload can fix it
    this.swUpdate.unrecoverable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => document.location.reload());
    const lookForUpdate = () => this.swUpdate.checkForUpdate().catch(() => undefined);
    const onVisible = () => document.visibilityState === 'visible' && lookForUpdate();
    document.addEventListener('visibilitychange', onVisible);
    const timer = setInterval(lookForUpdate, PWA_CHECK_EVERY);
    this.destroyRef.onDestroy(() => {
      document.removeEventListener('visibilitychange', onVisible);
      clearInterval(timer);
    });
    lookForUpdate();
  }

  private async check() {
    try {
      const response = await fetch(LATEST_RELEASE, { signal: AbortSignal.timeout(CHECK_TIMEOUT) });
      if (!response.ok) {
        return;
      }
      const release = await response.json();
      const apk = (release.assets ?? []).find((asset: { name: string }) => asset.name.endsWith('.apk'));
      if (apk && isNewer(release.tag_name, version)) {
        this.update.set({
          version: release.tag_name.replace(/^v/, ''),
          apkUrl: apk.browser_download_url,
          sizeMb: Math.round(apk.size / 1e5) / 10,
        });
      }
    } catch {
      // Offline, timeout: checked again at the next launch
    }
  }
}
