import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { SwUpdate } from "@angular/service-worker";
import { Capacitor } from "@capacitor/core";
import { BundleInfo, CapacitorUpdater } from "@capgo/capacitor-updater";
import { version } from "../../../../package.json";
import { onAppVisibility } from "../shared/app-visibility";

/** Latest release of the game on GitHub: the Android app is attached to it (see .github/workflows/main.yml). */
const LATEST_RELEASE =
  "https://api.github.com/repos/jasonconard/pk-project/releases/latest";
const CHECK_TIMEOUT = 8000;
/** Android app: back on the screen, a new version is looked for again, at most this often (ms). */
const RESUME_CHECK_GAP = 5 * 60 * 1000;
/** Installed web app (PWA): how often a new version is looked for while playing (ms). */
const PWA_CHECK_EVERY = 30 * 60 * 1000;

interface Update {
  version: string;
  apkUrl: string;
  sizeMb: number;
}

/**
 * Game files of a release, for the live update: `pk-project-web-v0.0.19-apk0.0.19-<native fingerprint>.zip`.
 * The `apk` part is the oldest app that can run them (its native part — Android files, plugins — is the same).
 */
const WEB_ZIP = /^pk-project-web-v([\d.]+)-apk([\d.]+)-[\da-f]+\.zip$/;

interface ReleaseAsset {
  name: string;
  size: number;
  browser_download_url: string;
  /** "sha256:<hex>", given by GitHub: the updater checks the downloaded zip against it (required). */
  digest?: string | null;
}

/** 1.2.3 > 1.2.0? (numbers compared part by part, a missing part is 0) */
export function isNewer(candidate: string, current: string): boolean {
  const a = candidate.replace(/^v/, "").split(".").map(Number);
  const b = current.replace(/^v/, "").split(".").map(Number);
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
 * - Android app: at launch and when the app comes back on the screen (at most every 5 min), looks for a newer
 *   release on GitHub. A version put off ("Plus tard") is not offered again before the next launch.
 *   - Its game files can run in this app (same native part): they are downloaded in the background (live update,
 *     @capgo/capacitor-updater) and a restart is offered; "later" uses them the next time the app leaves the screen
 *     or starts. No APK, no installation.
 *   - Otherwise (a new plugin, new Android files…): its APK is offered. The link opens outside the app (Chrome
 *     downloads it, then Android installs it over the current version: same signing key).
 *   Silent when offline or when GitHub doesn't answer. A broken update (the game doesn't start) is rolled back.
 * - Web app (PWA, iOS included): the service worker downloads a new version in the background, but it would only
 *   be used once the app is fully closed (an iOS home screen app hardly ever is). It is looked for at launch, when
 *   the app comes back to the screen and every 30 min; once downloaded, a reload is offered.
 */
@Component({
  selector: "app-update-prompt",
  templateUrl: "./update-prompt.component.html",
  styleUrl: "./update-prompt.component.scss",
})
export class UpdatePromptComponent implements OnInit {
  private readonly swUpdate = inject(SwUpdate);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly update = signal<Update | null>(null);
  /** Web app: a new version is downloaded, ready to be used after a reload. */
  protected readonly webReady = signal(false);
  /** Android app: the game files of a new version are downloaded (live update), used after a restart. */
  protected readonly bundleReady = signal<BundleInfo | null>(null);
  /** Android app: why the game files could not be updated without the APK (shown with the APK offer). */
  protected readonly liveUpdateError = signal("");
  /** Android app: when the last check started (ms), whether one is running, the versions put off ("Plus tard"). */
  private lastCheck = 0;
  private checking = false;
  private readonly putOff = new Set<string>();
  protected readonly current = version;

  ngOnInit() {
    if (Capacitor.isNativePlatform()) {
      // These game files started fine: kept (otherwise the updater goes back to the previous ones)
      void CapacitorUpdater.notifyAppReady().catch(() => undefined);
      this.check();
      // Back on the screen (the app often stays open in the background): a version released meanwhile
      const stop = onAppVisibility((hidden) => {
        if (!hidden && Date.now() - this.lastCheck > RESUME_CHECK_GAP) {
          this.check();
        }
      });
      this.destroyRef.onDestroy(stop);
    } else if (this.swUpdate.isEnabled) {
      this.watchWebVersions();
    }
  }

  protected later() {
    const offered = this.bundleReady()?.version ?? this.update()?.version;
    if (offered) {
      this.putOff.add(offered);
    }
    this.update.set(null);
    this.webReady.set(false);
    this.bundleReady.set(null);
  }

  /** Android app: restarts on the downloaded game files. */
  protected applyBundle() {
    const bundle = this.bundleReady();
    if (bundle) {
      void CapacitorUpdater.set({ id: bundle.id });
    }
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
    this.swUpdate.versionUpdates
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event.type === "VERSION_READY") {
          this.webReady.set(true);
        }
      });
    // Broken cache (files of the running version gone): only a reload can fix it
    this.swUpdate.unrecoverable
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => document.location.reload());
    const lookForUpdate = () =>
      this.swUpdate.checkForUpdate().catch(() => undefined);
    const onVisible = () =>
      document.visibilityState === "visible" && lookForUpdate();
    document.addEventListener("visibilitychange", onVisible);
    const timer = setInterval(lookForUpdate, PWA_CHECK_EVERY);
    this.destroyRef.onDestroy(() => {
      document.removeEventListener("visibilitychange", onVisible);
      clearInterval(timer);
    });
    lookForUpdate();
  }

  private async check() {
    // One at a time, and not while an offer is on the screen
    if (this.checking || this.update() || this.bundleReady()) {
      return;
    }
    this.checking = true;
    this.lastCheck = Date.now();
    try {
      const response = await fetch(LATEST_RELEASE, {
        signal: AbortSignal.timeout(CHECK_TIMEOUT),
      });
      if (!response.ok) {
        return;
      }
      const release = await response.json();
      if (
        !isNewer(release.tag_name, version) ||
        this.putOff.has(release.tag_name.replace(/^v/, ""))
      ) {
        return;
      }
      const assets: ReleaseAsset[] = release.assets ?? [];
      if (await this.liveUpdate(assets)) {
        return;
      }
      const apk = assets.find((asset) => asset.name.endsWith(".apk"));
      if (apk) {
        this.update.set({
          version: release.tag_name.replace(/^v/, ""),
          apkUrl: apk.browser_download_url,
          sizeMb: Math.round(apk.size / 1e5) / 10,
        });
      }
    } catch {
      // Offline, timeout: checked again later (back on the screen, next launch)
    } finally {
      this.checking = false;
    }
  }

  /**
   * Downloads the release's game files if this app can run them (its APK is recent enough), and offers to restart
   * on them. False when the release needs a new APK (or has no game files): the APK is offered instead.
   */
  private async liveUpdate(assets: ReleaseAsset[]): Promise<boolean> {
    const zip = assets
      .map((asset) => ({ asset, match: WEB_ZIP.exec(asset.name) }))
      .find((z) => z.match);
    if (!zip?.match) {
      return false;
    }
    const [, target, minApk] = zip.match;
    const checksum = zip.asset.digest?.startsWith("sha256:")
      ? zip.asset.digest.slice("sha256:".length)
      : "";
    if (!checksum) {
      this.liveUpdateError.set("somme de contrôle absente");
      return false;
    }
    try {
      const { version: apkVersion } =
        await CapacitorUpdater.getBuiltinVersion();
      if (isNewer(minApk, apkVersion)) {
        return false; // its native part changed: a new APK is needed
      }
      // Already downloaded (restart postponed last time)? Otherwise downloaded now
      const { bundles } = await CapacitorUpdater.list();
      const bundle =
        bundles.find((b) => b.version === target && b.status !== "error") ??
        (await CapacitorUpdater.download({
          url: zip.asset.browser_download_url,
          version: target,
          checksum,
        }));
      // Used anyway the next time the app leaves the screen or starts
      await CapacitorUpdater.next({ id: bundle.id });
      this.bundleReady.set(bundle);
      return true;
    } catch (error) {
      // Download failed: the APK is offered, with the reason
      this.liveUpdateError.set(
        error instanceof Error ? error.message : String(error)
      );
      return false;
    }
  }
}
