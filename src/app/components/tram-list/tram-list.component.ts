// src/app/components/tram-list/tram-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramService } from '../../services/tram.service';
import { Departure, StopDeviation } from '../../models/tram-model';

@Component({
  selector: 'app-tram-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tram-list.component.html',
  styleUrls: ['./tram-list.component.scss'],
})
export class TramListComponent implements OnInit {
  departures: Departure[] = [];
  deviations: StopDeviation[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private tramService: TramService) {}

  ngOnInit(): void {
    this.loadDepartures();

    // Refresh data every 30 seconds
    setInterval(() => {
      this.loadDepartures();
    }, 30000);
  }

  loadDepartures(): void {
    this.loading = true;

    this.tramService.getCombinedData().subscribe({
      next: (data) => {
        this.departures = data.departures;
        this.deviations = data.deviations;
        this.loading = false;
        console.log('Dep', data);
      },
      error: (err) => {
        this.error =
          'Failed to load tram departure data. Please try again later.';
        this.loading = false;
        console.error('Error loading departures:', err);
      },
    });
  }

  // Helper function to get time until departure
  getTimeUntil(expectedTime: string): string {
    const now = new Date();
    const expected = new Date(expectedTime);
    const diffMs = expected.getTime() - now.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    console.log('Check', diffMins);
    console.log('Check2', expected);
    console.log('Check3', diffMs);

    if (diffMins <= 0) {
      return 'Now';
    } else if (diffMins === 1) {
      return '1 min';
    } else {
      return `${diffMins} mins`;
    }
  }

  // Check if a departure has deviations
  hasDeviations(departure: Departure): boolean {
    return this.deviations.some(
      (dev) => dev.StopInfo.StopAreaNumber === departure.StopAreaNumber
    );
  }

  // Get deviations for a specific departure
  getDeviationsForDeparture(departure: Departure): StopDeviation[] {
    return this.deviations.filter(
      (dev) => dev.StopInfo.StopAreaNumber === departure.StopAreaNumber
    );
  }
}
