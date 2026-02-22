export type ChargingSession = {
  sessionId: string;
  station: string;
  startedAt: string;
  endedAt: string;
  energyKwh: number;
  costUsd: number;
  status: 'Completed' | 'In Progress';
  connector: string;
  tariffPerKwh: number;
  taxesUsd: number;
  paymentMethod: string;
};

export const CHARGING_SESSIONS: ChargingSession[] = [
  {
    sessionId: 'sess-1001',
    station: 'Electra Hub - SF Downtown',
    startedAt: '2026-02-21 07:40',
    endedAt: '2026-02-21 08:32',
    energyKwh: 21.4,
    costUsd: 9.12,
    status: 'Completed',
    connector: 'CCS-1',
    tariffPerKwh: 0.36,
    taxesUsd: 1.42,
    paymentMethod: 'Visa •••• 4242',
  },
  {
    sessionId: 'sess-1000',
    station: 'Electra Hub - Palo Alto',
    startedAt: '2026-02-19 19:05',
    endedAt: '2026-02-19 19:44',
    energyKwh: 16.9,
    costUsd: 7.43,
    status: 'Completed',
    connector: 'Type2-2',
    tariffPerKwh: 0.34,
    taxesUsd: 1.12,
    paymentMethod: 'Mastercard •••• 1144',
  },
  {
    sessionId: 'sess-999',
    station: 'Electra Hub - San Jose North',
    startedAt: '2026-02-18 09:12',
    endedAt: '-',
    energyKwh: 4.8,
    costUsd: 2.11,
    status: 'In Progress',
    connector: 'CCS-2',
    tariffPerKwh: 0.35,
    taxesUsd: 0.0,
    paymentMethod: 'Visa •••• 4242',
  },
];
