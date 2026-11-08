import { Component, OnInit, signal } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { version } from '../../../../package.json';

/** Latest release of the game on GitHub: the Android app is attached to it (see .github/workflows/main.yml). */
const LATEST_RELEASE = 'https://api.github.com/repos/jasonconard/pk-project/releases/latest';
const CHECK_TIMEOUT = 8000;

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
 * Android app only: at launch, looks for a newer release on GitHub and offers to install its APK. The link opens
 * outside the app (Chrome downloads it, then Android installs it over the current version: same signing key).
 * Silent when offline or when GitHub doesn't answer.
 */
@Component({
  selector: 'app-update-prompt',
  templateUrl: './update-prompt.component.html',
  styleUrl: './update-prompt.component.scss',
})
export class UpdatePromptComponent implements OnInit {
  protected readonly update = signal<Update | null>(null);
  protected readonly current = version;

  ngOnInit() {
    if (Capacitor.isNativePlatform()) {
      this.check();
    }
  }

  protected later() {
    this.update.set(null);
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
