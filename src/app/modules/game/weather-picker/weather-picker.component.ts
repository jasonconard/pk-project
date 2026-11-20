import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, OnInit, output, signal } from '@angular/core';
import { LucideCheck, LucideSearch, LucideX } from '@lucide/angular';
import { EscapeService } from '../../../core/shared/service/escape.service';
import { WEATHER_CHOICES, WeatherType } from '../shared/weather/Weather';
import { weatherScreenshot } from '../shared/weather/weather-catalog';

/**
 * Choosing a weather in a long list: a search field and one 40 px line per weather, with its catalog picture.
 * A sheet from the bottom on a phone, a centered window elsewhere. Escape and the back button close it first
 * (it is the latest layer); Enter in the search takes the first weather.
 */
@Component({
  selector: 'game-weather-picker',
  imports: [LucideCheck, LucideSearch, LucideX],
  templateUrl: './weather-picker.component.html',
  styleUrl: './weather-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherPickerComponent implements OnInit {
  readonly title = input('Choisir une météo');
  /** Weathers not offered (already chosen). */
  readonly exclude = input<readonly string[]>([]);
  /** The weather chosen now (marked). */
  readonly current = input<string | null>(null);
  /** Offer « Neutre » too. */
  readonly withNeutral = input(false);
  readonly picked = output<WeatherType>();
  readonly closed = output<void>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly search = signal('');
  protected readonly weathers = computed(() => {
    const exclude = new Set(this.exclude());
    const q = norm(this.search());
    return WEATHER_CHOICES.filter(w => (this.withNeutral() || w.type !== WeatherType.NEUTRAL) && !exclude.has(w.type)
      && (!q || norm(w.label).includes(q)));
  });

  constructor() {
    inject(EscapeService).whileAlive(() => this.closed.emit());
  }

  ngOnInit(): void {
    // The keyboard only on computers (on a phone it would hide half the list)
    if (matchMedia('(pointer: fine)').matches) {
      setTimeout(() => this.host.nativeElement.querySelector<HTMLInputElement>('input')?.focus());
    }
  }

  protected pick(type: WeatherType): void {
    this.picked.emit(type);
    this.closed.emit();
  }

  protected pickFirst(): void {
    const first = this.weathers()[0];
    if (first) {
      this.pick(first.type);
    }
  }

  /** Escape in the search field (the escape service leaves text fields alone): closes. */
  protected escape(ev: Event): void {
    ev.preventDefault();
    ev.stopPropagation();
    this.closed.emit();
  }

  protected image(type: WeatherType): string {
    return weatherScreenshot(type, false);
  }

  /** Some weathers only have a night picture. */
  protected imageMissing(ev: Event, type: WeatherType): void {
    const img = ev.target as HTMLImageElement;
    const night = weatherScreenshot(type, true);
    if (!img.src.endsWith(night)) {
      img.src = night;
    } else {
      img.style.visibility = 'hidden';
    }
  }
}

function norm(text: string): string {
  return text.trim().toLocaleLowerCase('fr-FR').normalize('NFD').replace(/\p{M}/gu, '');
}
