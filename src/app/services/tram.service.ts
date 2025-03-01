import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, forkJoin } from 'rxjs';
import { Departure, StopDeviation } from '../models/tram-model';

@Injectable({
  providedIn: 'root',
})
export class TramService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getDepartures(): Observable<Departure[]> {
    return this.http.get<any>(`${this.apiUrl}/departures`).pipe(
      map((response) => {
        if (
          response &&
          response.departures &&
          Array.isArray(response.departures)
        ) {
          return response.departures
            .map((apiDeparture: any): Departure => {
              return {
                JourneyDirection: apiDeparture.direction_code,
                GroupOfLine: apiDeparture.line.group_of_lines || '',
                DisplayTime: apiDeparture.display || '',
                TransportMode: apiDeparture.line.transport_mode || '',
                LineNumber: apiDeparture.line.designation || '',
                Destination: apiDeparture.destination || '',
                StopAreaName: apiDeparture.stop_area.name || '',
                StopAreaNumber: apiDeparture.stop_area.id || 0,
                StopPointNumber: apiDeparture.stop_point.id || 0,
                StopPointDesignation: apiDeparture.stop_point.designation || '',
                TimeTabledDateTime: apiDeparture.scheduled || '',
                ExpectedDateTime: apiDeparture.expected || '',
                JourneyNumber: apiDeparture.journey.id || 0,
                Deviations: apiDeparture.deviations || [],
              };
            })
            .filter(
              (departure: Departure) =>
                departure.StopAreaName === 'Luma' &&
                this.isTowardsLinde(departure)
            );
        }
        return [];
      })
    );
  }

  getStopDeviations(): Observable<StopDeviation[]> {
    return this.http.get<any>(`${this.apiUrl}/stop_deviations`).pipe(
      map((response) => {
        if (
          response &&
          response.stop_deviations &&
          Array.isArray(response.stop_deviations)
        ) {
          return response.stop_deviations.map((dev: any): StopDeviation => {
            return {
              StopInfo: {
                StopAreaNumber: dev.scope?.stop_areas?.[0]?.id || 0,
                TransportMode: dev.scope?.lines?.[0]?.transport_mode || '',
                StopAreaName: dev.scope?.stop_areas?.[0]?.name || '',
              },
              Deviation: {
                Text: dev.message || '',
                Consequence: dev.importance_level
                  ? `Priority ${dev.importance_level}`
                  : '',
              },
            };
          });
        }
        return [];
      })
    );
  }

  getCombinedData(): Observable<{
    departures: Departure[];
    deviations: StopDeviation[];
  }> {
    return forkJoin({
      departures: this.getDepartures(),
      deviations: this.getStopDeviations(),
    });
  }

  // Helper function to determine if a departure is towards Linde
  private isTowardsLinde(departure: Departure): boolean {
    return (
      departure.JourneyDirection === 2 && departure.Destination === 'Linde'
    );
  }
}
