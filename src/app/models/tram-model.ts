// src/app/models/tram-model.ts
export interface Departure {
  JourneyDirection: number;
  GroupOfLine: string;
  DisplayTime: string;
  TransportMode: string;
  LineNumber: string;
  Destination: string;
  StopAreaName: string;
  StopAreaNumber: number;
  StopPointNumber: number;
  StopPointDesignation: string;
  TimeTabledDateTime: string;
  ExpectedDateTime: string;
  JourneyNumber: number;
  Deviations: any[];
}

export interface StopDeviation {
  StopInfo: {
    StopAreaNumber: number;
    TransportMode: string;
    StopAreaName: string;
  };
  Deviation: {
    Text: string;
    Consequence: string;
  };
}
