import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface PrayerRequest {
  id: number;
  backendId?: string;
  country: string;
  initial: string;
  name: string;
  date: string;
  prayerText: string;
  priority: 'low' | 'medium' | 'high';
  active: boolean;
  prayedCount: number;
  candleCount: number;
  userPrayed: boolean;
  userCandled: boolean;
}

interface ApiPrayerRequest {
  _id?: string;
  id?: number;
  name?: string;
  region?: string;
  request?: string;
  dateFormatted?: string;
  createdAt?: string;
  urgency?: 'low' | 'medium' | 'high';
  prayedCount?: number;
  candleCount?: number;
  userPrayed?: boolean;
  userCandled?: boolean;
}

@Component({
  selector: 'app-prayer-wall',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prayer-wall.component.html',
  styleUrl: './prayer-wall.component.scss',
})
export class PrayerWallComponent implements OnInit {
  @Input() prayers: PrayerRequest[] = [];

  isLoading = true;
  hasError = false;
  animatingActions = new Set<string>();

  private readonly apiUrl = 'https://global-prayer-dashboard.onrender.com/api/prayers';
  private readonly interactionApiBase = 'https://global-prayer-dashboard.onrender.com';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPrayers();
  }

  loadPrayers() {
    this.isLoading = true;
    this.hasError = false;

    this.http.get<{ data: ApiPrayerRequest[] }>(this.apiUrl).subscribe({
      next: (res) => {
        this.prayers = (res.data || []).map((prayer, index) => this.toPrayerRequest(prayer, index));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading prayers:', err);
        this.prayers = [];
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }

  private toPrayerRequest(prayer: ApiPrayerRequest, index: number): PrayerRequest {
    const name = prayer.name?.trim() || 'Anonymous';
    const createdAt = prayer.createdAt ? new Date(prayer.createdAt) : null;

    return {
      id: prayer.id || index + 1,
      backendId: prayer._id,
      country: prayer.region?.trim() || 'Global',
      initial: name.slice(0, 1).toUpperCase(),
      name,
      date: prayer.dateFormatted || (createdAt ? createdAt.toLocaleDateString() : 'Recently'),
      prayerText: prayer.request?.trim() || 'Prayer request submitted.',
      priority: prayer.urgency || 'low',
      active: true,
      prayedCount: prayer.prayedCount || 0,
      candleCount: prayer.candleCount || 0,
      userPrayed: prayer.userPrayed || false,
      userCandled: prayer.userCandled || false,
    };
  }

  togglePrayed(prayer: PrayerRequest, event: MouseEvent) {
    event.stopPropagation();
    this.toggleInteraction(prayer, 'pray');
  }

  toggleCandle(prayer: PrayerRequest, event: MouseEvent) {
    event.stopPropagation();
    this.toggleInteraction(prayer, 'candle');
  }

  isAnimating(prayer: PrayerRequest, action: 'pray' | 'candle') {
    return this.animatingActions.has(this.actionKey(prayer, action));
  }

  private toggleInteraction(prayer: PrayerRequest, action: 'pray' | 'candle') {
    const wasActive = action === 'pray' ? prayer.userPrayed : prayer.userCandled;
    const delta = wasActive ? -1 : 1;

    this.applyInteraction(prayer, action, !wasActive, delta);
    this.animateAction(prayer, action);

    this.http.patch(this.interactionUrl(prayer, action), {}).subscribe({
      error: (err) => {
        console.error(`Error updating ${action} interaction:`, err);
        this.applyInteraction(prayer, action, wasActive, -delta);
      },
    });
  }

  private applyInteraction(
    prayer: PrayerRequest,
    action: 'pray' | 'candle',
    active: boolean,
    delta: number,
  ) {
    if (action === 'pray') {
      prayer.userPrayed = active;
      prayer.prayedCount = Math.max(0, prayer.prayedCount + delta);
      return;
    }

    prayer.userCandled = active;
    prayer.candleCount = Math.max(0, prayer.candleCount + delta);
  }

  private animateAction(prayer: PrayerRequest, action: 'pray' | 'candle') {
    const key = this.actionKey(prayer, action);
    this.animatingActions = new Set(this.animatingActions).add(key);

    setTimeout(() => {
      const next = new Set(this.animatingActions);
      next.delete(key);
      this.animatingActions = next;
    }, 200);
  }

  private interactionUrl(prayer: PrayerRequest, action: 'pray' | 'candle') {
    const id = prayer.backendId || prayer.id;
    return `${this.interactionApiBase}/prayer-requests/${id}/${action}`;
  }

  private actionKey(prayer: PrayerRequest, action: 'pray' | 'candle') {
    return `${prayer.backendId || prayer.id}:${action}`;
  }
}
