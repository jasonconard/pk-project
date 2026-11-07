import { Component, computed, DestroyRef, ElementRef, inject, input, output, signal, viewChild } from '@angular/core';
import { DAY_ONLY_HOUR, formatHour, NIGHT_ONLY_HOUR, FIREFLY_COLORS, FireflyColor, isWeatherAvailable, LEAF_MODES, LeafMode, TEMPERATURES, WEATHER_CHOICES, WeatherChoice, WeatherType } from '../shared/weather/Weather';
import { WEATHER_CATEGORIES, WEATHER_INFO, WeatherCategory, WeatherInfo, weatherScreenshot } from '../shared/weather/weather-catalog';
import { KeyService } from '../../../core/shared/service/key.service';

/** Key opening / closing the catalog from the game. */
const SHORTCUT = 'm';

export interface CatalogEntry extends WeatherChoice {
  info: WeatherInfo;
  /** Day / night availability badge ('' = both). */
  only: '' | 'day' | 'night';
  temperature: [number, number];
}

const ENTRIES: CatalogEntry[] = WEATHER_CHOICES.map(choice => {
  const day = isWeatherAvailable(choice.type, false);
  const night = isWeatherAvailable(choice.type, true);
  return {
    ...choice,
    info: WEATHER_INFO[choice.type],
    only: day && night ? '' : day ? 'day' : 'night',
    temperature: TEMPERATURES[choice.type],
  };
});

/** Plain lowercase without accents, for the search. */
function normalize(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/**
 * Weather catalog: a popup in the middle of the screen. Categories on the left, cards (screenshot, name,
 * summary, badges) in the middle, the selected weather details on the right. Keyboard: M opens / closes,
 * arrows move between the cards, Enter applies, Escape closes.
 */
@Component({
  selector: 'game-weather-catalog',
  templateUrl: './weather-catalog.component.html',
  styleUrl: './weather-catalog.component.scss',
  host: {
    '[class.open]': 'isOpen()',
  },
})
export class WeatherCatalogComponent {
  private readonly keyService = inject(KeyService);

  readonly weather = input.required<WeatherType>();
  readonly night = input(false);
  readonly fireflyColor = input<FireflyColor>('green');
  readonly leafMode = input<LeafMode>('autumn');
  readonly weatherSelected = output<WeatherType>();
  readonly fireflyColorChange = output<FireflyColor>();
  readonly leafModeChange = output<LeafMode>();

  protected readonly categories = WEATHER_CATEGORIES;
  protected readonly fireflyColors = FIREFLY_COLORS;
  protected readonly leafModes = LEAF_MODES;
  protected readonly WeatherType = WeatherType;
  readonly isOpen = signal(false);
  /** null = all categories. */
  protected readonly category = signal<WeatherCategory | null>(null);
  protected readonly search = signal('');
  /** Weather shown in the detail panel (not applied until "Appliquer"). */
  protected readonly focused = signal<WeatherType>(WeatherType.NEUTRAL);
  /** Where the arrows act: the categories list or the cards (Tab switches). */
  protected readonly zone = signal<'categories' | 'cards'>('cards');
  /** Detail screenshot: day or night version. */
  protected readonly detailNight = signal(false);
  /** Screenshots that failed to load: the emoji is shown instead. */
  protected readonly missing = signal<ReadonlySet<string>>(new Set());

  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  private readonly grid = viewChild<ElementRef<HTMLElement>>('grid');

  /** Visible cards, in display order. */
  protected readonly visible = computed(() => {
    const query = normalize(this.search().trim());
    const category = this.category();
    return ENTRIES.filter(e => (!category || e.info.category === category)
      && (!query || normalize(`${e.label} ${e.info.summary} ${e.info.description}`).includes(query)));
  });
  /** Visible cards grouped by category (headings shown when all categories are listed). */
  protected readonly groups = computed(() => {
    const visible = this.visible();
    return WEATHER_CATEGORIES
      .map(c => ({ category: c, entries: visible.filter(e => e.info.category === c.id) }))
      .filter(g => g.entries.length);
  });
  protected readonly counts = computed(() => {
    const counts: Partial<Record<WeatherCategory, number>> = {};
    ENTRIES.forEach(e => counts[e.info.category] = (counts[e.info.category] ?? 0) + 1);
    return counts;
  });
  protected readonly detail = computed(() => ENTRIES.find(e => e.type === this.focused()) ?? ENTRIES[0]);
  protected readonly detailCategory = computed(() => WEATHER_CATEGORIES.find(c => c.id === this.detail().info.category)!);
  protected readonly total = ENTRIES.length;

  constructor() {
    // Capture phase: the catalog sees the keys before the game (which listens on the document)
    const onKeyDown = (ev: KeyboardEvent) => this.onKeyDown(ev);
    const onKeyUp = (ev: KeyboardEvent) => this.isOpen() && ev.stopPropagation();
    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('keyup', onKeyUp, true);
    inject(DestroyRef).onDestroy(() => {
      window.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener('keyup', onKeyUp, true);
    });
  }

  show(): void {
    if (this.isOpen()) {
      return;
    }
    this.focused.set(this.weather());
    this.detailNight.set(this.night());
    this.zone.set('cards');
    this.isOpen.set(true);
    // Held keys would stay pressed (their keyup won't reach the game)
    this.keyService.clearKeys();
    setTimeout(() => this.scrollToFocused(), 50);
  }

  close(): void {
    this.isOpen.set(false);
    this.keyService.clearKeys();
    (document.activeElement as HTMLElement | null)?.blur();
  }

  protected available(entry: CatalogEntry): boolean {
    return isWeatherAvailable(entry.type, this.night());
  }

  /** Applying it changes the time of day (it only exists at the other time). */
  protected timeChangeHint(entry: CatalogEntry): string {
    return entry.only === 'day' ? `passe au jour (${formatHour(DAY_ONLY_HOUR)})` : `passe à la nuit (${formatHour(NIGHT_ONLY_HOUR)})`;
  }

  protected screenshot(entry: CatalogEntry, night: boolean): string {
    // A day-only weather has no night picture (and the other way round)
    const n = entry.only === 'day' ? false : entry.only === 'night' ? true : night;
    return weatherScreenshot(entry.type, n);
  }

  protected isMissing(src: string): boolean {
    return this.missing().has(src);
  }

  protected markMissing(src: string): void {
    this.missing.update(set => new Set([...set, src]));
  }

  protected selectCategory(category: WeatherCategory | null): void {
    this.zone.set('categories');
    this.category.set(category);
    const first = this.visible()[0];
    if (first && !this.visible().some(e => e.type === this.focused())) {
      this.focused.set(first.type);
    }
  }

  protected setSearch(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
    const first = this.visible()[0];
    if (first && !this.visible().some(e => e.type === this.focused())) {
      this.focused.set(first.type);
    }
  }

  protected focus(entry: CatalogEntry): void {
    this.zone.set('cards');
    this.focused.set(entry.type);
    this.detailNight.set(entry.only === 'night' || (entry.only !== 'day' && this.night()));
  }

  protected apply(entry: CatalogEntry = this.detail()): void {
    this.weatherSelected.emit(entry.type);
  }

  private onKeyDown(ev: KeyboardEvent): void {
    const typing = ev.target instanceof HTMLInputElement && ev.target.type === 'text';
    if (!this.isOpen()) {
      // Shortcut from the game (not while typing somewhere else)
      if (ev.key.toLowerCase() === SHORTCUT && !(ev.target instanceof HTMLInputElement) && !ev.repeat) {
        ev.stopPropagation();
        this.show();
      }
      return;
    }
    // Open: the game doesn't get any key
    ev.stopPropagation();
    if (ev.key === 'Escape') {
      if (typing && this.search()) {
        this.search.set('');
        (ev.target as HTMLInputElement).value = '';
      } else {
        this.close();
      }
      ev.preventDefault();
      return;
    }
    if (ev.key === 'Tab') {
      // Tab: switches between the categories and the cards
      this.zone.set(this.zone() === 'cards' ? 'categories' : 'cards');
      (document.activeElement as HTMLElement | null)?.blur();
      ev.preventDefault();
      return;
    }
    if (typing && (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight')) {
      return; // moves the text cursor
    }
    if (this.zone() === 'categories') {
      this.categoriesKey(ev);
    } else {
      this.cardsKey(ev);
    }
    if (ev.defaultPrevented) {
      return;
    }
    if (!typing && ev.key.toLowerCase() === SHORTCUT) {
      this.close();
      return;
    }
    // Typing a letter anywhere goes to the search
    if (!typing && ev.key.length === 1 && !ev.ctrlKey && !ev.metaKey && !ev.altKey) {
      this.searchInput()?.nativeElement.focus();
    }
  }

  /** Categories list: up / down changes the category, right / Enter goes to its cards. */
  private categoriesKey(ev: KeyboardEvent): void {
    const ids: (WeatherCategory | null)[] = [null, ...WEATHER_CATEGORIES.map(c => c.id)];
    const index = ids.indexOf(this.category());
    switch (ev.key) {
      case 'ArrowUp':
      case 'ArrowDown': {
        const next = (index + (ev.key === 'ArrowUp' ? -1 : 1) + ids.length) % ids.length;
        this.selectCategory(ids[next]);
        this.grid()?.nativeElement.scrollTo({ top: 0 });
        ev.preventDefault();
        return;
      }
      case 'ArrowRight':
      case 'Enter':
        this.zone.set('cards');
        if (!this.visible().some(e => e.type === this.focused()) && this.visible().length) {
          this.focused.set(this.visible()[0].type);
        }
        setTimeout(() => this.scrollToFocused());
        ev.preventDefault();
        return;
    }
  }

  /** Cards: arrows move on screen (up / down to the card really above / below, across the category groups),
   * left on the first card of a row goes to the categories, Enter applies. */
  private cardsKey(ev: KeyboardEvent): void {
    switch (ev.key) {
      case 'Enter':
        this.apply();
        ev.preventDefault();
        return;
      case 'ArrowLeft':
        if (this.firstInRow()) {
          this.zone.set('categories');
        } else {
          this.move(-1);
        }
        ev.preventDefault();
        return;
      case 'ArrowRight':
        this.move(1);
        ev.preventDefault();
        return;
      case 'ArrowUp':
      case 'ArrowDown':
        this.moveVertically(ev.key === 'ArrowUp' ? -1 : 1);
        ev.preventDefault();
        return;
    }
  }

  /** Moves the focused card by `delta` in the visible list. */
  private move(delta: number): void {
    const list = this.visible();
    if (!list.length) {
      return;
    }
    const index = Math.max(0, list.findIndex(e => e.type === this.focused()));
    const next = Math.min(list.length - 1, Math.max(0, index + delta));
    this.focus(list[next]);
    setTimeout(() => this.scrollToFocused());
  }

  /** The card on screen right above / below the focused one (closest horizontally in the nearest row). */
  private moveVertically(direction: -1 | 1): void {
    const cards = this.cardElements();
    const current = cards.find(c => c.dataset['type'] === this.focused());
    if (!current) {
      this.move(direction);
      return;
    }
    const from = current.getBoundingClientRect();
    const fromX = from.left + from.width / 2;
    let best: HTMLElement | null = null;
    let bestRow = Infinity;
    let bestDx = Infinity;
    for (const card of cards) {
      const r = card.getBoundingClientRect();
      const dy = (r.top - from.top) * direction;
      if (dy < 5) {
        continue;
      }
      const dx = Math.abs(r.left + r.width / 2 - fromX);
      if (dy < bestRow - 5 || (Math.abs(dy - bestRow) <= 5 && dx < bestDx)) {
        best = card;
        bestRow = dy;
        bestDx = dx;
      }
    }
    const entry = best && this.visible().find(e => e.type === best!.dataset['type']);
    if (entry) {
      this.focus(entry);
      setTimeout(() => this.scrollToFocused());
    }
  }

  /** True when no card stands left of the focused one on its row. */
  private firstInRow(): boolean {
    const cards = this.cardElements();
    const current = cards.find(c => c.dataset['type'] === this.focused());
    if (!current) {
      return true;
    }
    const from = current.getBoundingClientRect();
    return !cards.some(c => {
      const r = c.getBoundingClientRect();
      return Math.abs(r.top - from.top) < 5 && r.left < from.left - 5;
    });
  }

  private cardElements(): HTMLElement[] {
    return Array.from(this.grid()?.nativeElement.querySelectorAll<HTMLElement>('.card') ?? []);
  }

  private scrollToFocused(): void {
    this.grid()?.nativeElement.querySelector('.card.focused')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}
