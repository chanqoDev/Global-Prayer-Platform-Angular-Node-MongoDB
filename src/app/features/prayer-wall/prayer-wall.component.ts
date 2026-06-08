import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface PrayerRequest {
  id: number;
  country: string;
  initial: string;
  name: string;
  date: string;
  prayerText: string;
  priority: 'low' | 'medium' | 'high';
  active: boolean;
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

  private readonly apiUrl = 'https://global-prayer-dashboard.onrender.com/api/prayers';

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
      country: prayer.region?.trim() || 'Global',
      initial: name.slice(0, 1).toUpperCase(),
      name,
      date: prayer.dateFormatted || (createdAt ? createdAt.toLocaleDateString() : 'Recently'),
      prayerText: prayer.request?.trim() || 'Prayer request submitted.',
      priority: prayer.urgency || 'low',
      active: true,
    };
  }
}
