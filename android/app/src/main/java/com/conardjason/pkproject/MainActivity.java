package com.conardjason.pkproject;

import android.os.Build;
import android.os.Bundle;
import android.view.Display;
import android.view.WindowManager;

import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import com.getcapacitor.BridgeActivity;

/**
 * The game in a WebView, with what a browser tab can't do: the screen kept at its highest refresh rate
 * (no drop to 30-60 Hz when nothing moves on screen), kept awake, and the system bars hidden.
 */
public class MainActivity extends BridgeActivity {

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    useHighestRefreshRate();
  }

  @Override
  public void onWindowFocusChanged(boolean hasFocus) {
    super.onWindowFocusChanged(hasFocus);
    if (hasFocus) {
      hideSystemBars();
    }
  }

  /** Full screen: the bars come back for a moment with a swipe from the edge. */
  private void hideSystemBars() {
    WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
    WindowInsetsControllerCompat controller = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
    controller.hide(WindowInsetsCompat.Type.systemBars());
    controller.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
  }

  /** Asks for the display mode with the highest refresh rate, at the current resolution (e.g. 120 or 144 Hz). */
  private void useHighestRefreshRate() {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
      return;
    }
    Display display = getWindowManager().getDefaultDisplay();
    Display.Mode current = display.getMode();
    Display.Mode best = current;
    for (Display.Mode mode : display.getSupportedModes()) {
      boolean sameSize = mode.getPhysicalWidth() == current.getPhysicalWidth()
        && mode.getPhysicalHeight() == current.getPhysicalHeight();
      if (sameSize && mode.getRefreshRate() > best.getRefreshRate()) {
        best = mode;
      }
    }
    WindowManager.LayoutParams params = getWindow().getAttributes();
    params.preferredDisplayModeId = best.getModeId();
    params.preferredRefreshRate = best.getRefreshRate();
    getWindow().setAttributes(params);
  }
}
