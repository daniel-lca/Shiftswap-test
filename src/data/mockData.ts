export interface Shift {
  id: string;
  date: string;
  day: string;
  dateFormatted: string;
  type: 'Early' | 'Late' | 'Night' | 'Off';
  time: string;
  ward: string;
  hours: number;
  tradeStatus?: 'none' | 'can-trade' | 'waiting-colleague' | 'waiting-approval' | 'approved';
  tradeRecipient?: string;
}

export interface Colleague {
  id: string;
  name: string;
  grade: string;
  ward: string;
  contractHours: number;
  currentWeekHours: number;
  available: boolean;
  statusNote: string;
}

export interface SwapRequest {
  id: string;
  shiftId: string;
  shiftDate: string;
  shiftType: 'Early' | 'Late' | 'Night';
  shiftTime: string;
  ward: string;
  hours: number;
  requesterName: string;
  requesterGrade: string;
  requesterHoursBefore: number;
  requesterHoursAfter: number;
  coveringName: string;
  coveringGrade: string;
  coveringHoursBefore: number;
  coveringHoursAfter: number;
  overtimeExceeded: boolean;
  overtimeHours: number;
  reason: string;
  status: 'Waiting for manager approval' | 'Approved' | 'Rejected';
  createdAt: string;
}

export const CURRENT_NURSE = {
  name: 'Sarah Jenkins',
  role: 'Staff Nurse',
  grade: 'Band 5',
  ward: 'Acute Medical Unit (AMU)',
  hospital: "St. Mary's Hospital",
  contractHours: 37.5,
};

export const INITIAL_SHIFTS: Shift[] = [
  {
    id: 'sh-1',
    date: '2026-11-04',
    day: 'Mon',
    dateFormatted: '4 Nov',
    type: 'Early',
    time: '07:00 - 15:30',
    ward: 'AMU',
    hours: 8.5,
    tradeStatus: 'none',
  },
  {
    id: 'sh-2',
    date: '2026-11-05',
    day: 'Tue',
    dateFormatted: '5 Nov',
    type: 'Early',
    time: '07:00 - 15:30',
    ward: 'AMU',
    hours: 8.5,
    tradeStatus: 'none',
  },
  {
    id: 'sh-3',
    date: '2026-11-06',
    day: 'Wed',
    dateFormatted: '6 Nov',
    type: 'Night',
    time: '21:30 - 07:30',
    ward: 'AMU',
    hours: 10,
    tradeStatus: 'can-trade',
  },
  {
    id: 'sh-4',
    date: '2026-11-07',
    day: 'Thu',
    dateFormatted: '7 Nov',
    type: 'Night',
    time: '21:30 - 07:30',
    ward: 'AMU',
    hours: 10,
    tradeStatus: 'none',
  },
  {
    id: 'sh-5',
    date: '2026-11-08',
    day: 'Fri',
    dateFormatted: '8 Nov',
    type: 'Off',
    time: 'Rest day',
    ward: '—',
    hours: 0,
    tradeStatus: 'none',
  },
  {
    id: 'sh-6',
    date: '2026-11-09',
    day: 'Sat',
    dateFormatted: '9 Nov',
    type: 'Off',
    time: 'Rest day',
    ward: '—',
    hours: 0,
    tradeStatus: 'none',
  },
  {
    id: 'sh-7',
    date: '2026-11-10',
    day: 'Sun',
    dateFormatted: '10 Nov',
    type: 'Late',
    time: '13:30 - 22:00',
    ward: 'AMU',
    hours: 8.5,
    tradeStatus: 'waiting-colleague',
    tradeRecipient: 'Marcus Vance',
  },
  {
    id: 'sh-8',
    date: '2026-11-11',
    day: 'Mon',
    dateFormatted: '11 Nov',
    type: 'Late',
    time: '13:30 - 22:00',
    ward: 'AMU',
    hours: 8.5,
    tradeStatus: 'none',
  },
  {
    id: 'sh-9',
    date: '2026-11-12',
    day: 'Tue',
    dateFormatted: '12 Nov',
    type: 'Late',
    time: '13:30 - 22:00',
    ward: 'AMU',
    hours: 8.5,
    tradeStatus: 'none',
  },
  {
    id: 'sh-10',
    date: '2026-11-13',
    day: 'Wed',
    dateFormatted: '13 Nov',
    type: 'Off',
    time: 'Rest day',
    ward: '—',
    hours: 0,
    tradeStatus: 'none',
  },
  {
    id: 'sh-11',
    date: '2026-11-14',
    day: 'Thu',
    dateFormatted: '14 Nov',
    type: 'Early',
    time: '07:00 - 15:30',
    ward: 'AMU',
    hours: 8.5,
    tradeStatus: 'none',
  },
  {
    id: 'sh-12',
    date: '2026-11-15',
    day: 'Fri',
    dateFormatted: '15 Nov',
    type: 'Early',
    time: '07:00 - 15:30',
    ward: 'AMU',
    hours: 8.5,
    tradeStatus: 'none',
  },
  {
    id: 'sh-13',
    date: '2026-11-16',
    day: 'Sat',
    dateFormatted: '16 Nov',
    type: 'Off',
    time: 'Rest day',
    ward: '—',
    hours: 0,
    tradeStatus: 'none',
  },
  {
    id: 'sh-14',
    date: '2026-11-17',
    day: 'Sun',
    dateFormatted: '17 Nov',
    type: 'Off',
    time: 'Rest day',
    ward: '—',
    hours: 0,
    tradeStatus: 'none',
  },
];

export const AVAILABLE_COLLEAGUES: Colleague[] = [
  {
    id: 'col-1',
    name: 'David Miller',
    grade: 'Band 5',
    ward: 'AMU',
    contractHours: 37.5,
    currentWeekHours: 37.5,
    available: true,
    statusNote: 'Scheduled off on 6 Nov',
  },
  {
    id: 'col-2',
    name: 'Elena Rostova',
    grade: 'Band 5',
    ward: 'AMU',
    contractHours: 37.5,
    currentWeekHours: 30,
    available: true,
    statusNote: 'Scheduled off on 6 Nov',
  },
  {
    id: 'col-3',
    name: 'Marcus Vance',
    grade: 'Band 5',
    ward: 'Cardiology (AMU pool)',
    contractHours: 37.5,
    currentWeekHours: 37.5,
    available: true,
    statusNote: 'Scheduled off on 6 Nov',
  },
  {
    id: 'col-4',
    name: 'Priya Patel',
    grade: 'Band 5',
    ward: 'AMU',
    contractHours: 37.5,
    currentWeekHours: 28,
    available: true,
    statusNote: 'Scheduled off on 6 Nov',
  },
];

export const INCOMING_SWAP_OFFER = {
  id: 'inc-902',
  requesterName: 'Elena Rostova',
  requesterGrade: 'Band 5 Staff Nurse',
  requesterWard: 'Acute Medical Unit',
  shiftDate: 'Saturday 9 Nov 2026',
  shiftType: 'Late Shift',
  shiftTime: '13:30 - 22:00 (8.5 hrs)',
  ward: 'Acute Medical Unit',
  reason: "Child's medical appointment in afternoon. Seeking coverage.",
  receiverStatus: 'Currently scheduled off on Saturday 9 Nov',
};

export const PENDING_MANAGER_SWAPS: SwapRequest[] = [
  {
    id: 'SWP-1042',
    shiftId: 'sh-3',
    shiftDate: 'Wed 6 Nov 2026',
    shiftType: 'Night',
    shiftTime: '21:30 - 07:30',
    ward: 'Acute Medical Unit',
    hours: 10,
    requesterName: 'Sarah Jenkins',
    requesterGrade: 'Band 5 Staff Nurse',
    requesterHoursBefore: 37.5,
    requesterHoursAfter: 27.5,
    coveringName: 'David Miller',
    coveringGrade: 'Band 5 Staff Nurse',
    coveringHoursBefore: 37.5,
    coveringHoursAfter: 47.5,
    overtimeExceeded: false,
    overtimeHours: 47.5,
    reason: 'Family event attendance',
    status: 'Waiting for manager approval',
    createdAt: 'Today, 09:15',
  },
  {
    id: 'SWP-1049',
    shiftId: 'sh-18',
    shiftDate: 'Fri 8 Nov 2026',
    shiftType: 'Night',
    shiftTime: '21:30 - 07:30',
    ward: 'Surgical Ward 3',
    hours: 10,
    requesterName: 'Chloe Bennett',
    requesterGrade: 'Band 6 Sister',
    requesterHoursBefore: 37.5,
    requesterHoursAfter: 27.5,
    coveringName: 'James Thornton',
    coveringGrade: 'Band 6 Charge Nurse',
    coveringHoursBefore: 42,
    coveringHoursAfter: 52,
    overtimeExceeded: true,
    overtimeHours: 52,
    reason: 'Personal study leave preparation',
    status: 'Waiting for manager approval',
    createdAt: 'Today, 10:40',
  },
  {
    id: 'SWP-1038',
    shiftId: 'sh-7',
    shiftDate: 'Sun 10 Nov 2026',
    shiftType: 'Early',
    shiftTime: '07:00 - 15:30',
    ward: 'Acute Medical Unit',
    hours: 8.5,
    requesterName: "Liam O'Connor",
    requesterGrade: 'Band 5 Staff Nurse',
    requesterHoursBefore: 37.5,
    requesterHoursAfter: 29,
    coveringName: 'Elena Rostova',
    coveringGrade: 'Band 5 Staff Nurse',
    coveringHoursBefore: 30,
    coveringHoursAfter: 38.5,
    overtimeExceeded: false,
    overtimeHours: 38.5,
    reason: 'Commute train disruption',
    status: 'Waiting for manager approval',
    createdAt: 'Yesterday, 16:20',
  },
];
