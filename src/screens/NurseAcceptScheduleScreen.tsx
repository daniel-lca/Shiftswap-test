import { PhoneFrame } from '@/components/PhoneFrame';
import { Button } from '@/components/ui/button';
import { ScreenLink } from '@/prototype/navigation';
import { CURRENT_NURSE, INITIAL_SHIFTS, INCOMING_SWAP_OFFER } from '@/data/mockData';

export function NurseAcceptScheduleScreen() {
  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-full bg-neutral-50 text-neutral-900">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-neutral-300 bg-neutral-100 px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-600 font-medium">Shiftswap · Nurse Portal</p>
              <h1 className="text-base font-medium text-neutral-900">My schedule & requests</h1>
            </div>
            <span className="rounded border border-neutral-300 bg-neutral-200 px-2 py-0.5 text-xs text-neutral-700">
              {CURRENT_NURSE.grade}
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-neutral-600">
            <span>{CURRENT_NURSE.name}</span>
            <span>{CURRENT_NURSE.ward}</span>
          </div>
        </header>

        {/* Incoming Swap Request Highlight Card */}
        <div className="m-4 rounded border-2 border-neutral-800 bg-white p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="rounded bg-neutral-900 px-2 py-0.5 text-xs font-semibold text-white">
              1 incoming swap request
            </span>
            <span className="text-xs text-neutral-500">Received 2h ago</span>
          </div>

          <div>
            <p className="text-sm font-medium text-neutral-900">
              {INCOMING_SWAP_OFFER.requesterName} wants you to cover a shift
            </p>
            <p className="text-xs text-neutral-600 mt-0.5">
              {INCOMING_SWAP_OFFER.shiftDate} · {INCOMING_SWAP_OFFER.shiftType} ({INCOMING_SWAP_OFFER.shiftTime})
            </p>
            <p className="text-xs text-neutral-500 mt-1">Your status: {INCOMING_SWAP_OFFER.receiverStatus}</p>
          </div>

          <div className="pt-2 border-t border-neutral-200 flex gap-2">
            <Button asChild size="sm" className="w-full text-xs bg-neutral-900 text-white hover:bg-neutral-800">
              <ScreenLink to="nurse-accept-request-detail">Review request</ScreenLink>
            </Button>
          </div>
        </div>

        {/* Schedule Subheading */}
        <div className="border-t border-b border-neutral-200 bg-neutral-200 px-4 py-2 text-xs text-neutral-700">
          My upcoming 14-day schedule
        </div>

        {/* Schedule List */}
        <div className="flex-1 space-y-2 p-4">
          {INITIAL_SHIFTS.slice(0, 8).map((shift) => {
            const isTargetCoverageDate = shift.date === '2026-11-09';
            return (
              <div
                key={shift.id}
                className={`rounded border p-3 ${
                  isTargetCoverageDate ? 'border-neutral-800 bg-neutral-100' : 'border-neutral-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-neutral-700 w-8">{shift.day}</span>
                    <span className="text-xs text-neutral-500 w-12">{shift.dateFormatted}</span>
                    <span className="rounded px-1.5 py-0.5 text-xs font-medium border border-neutral-300 bg-neutral-100 text-neutral-700">
                      {shift.type}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-600">{shift.time}</span>
                </div>
                {isTargetCoverageDate && (
                  <div className="mt-2 text-xs text-neutral-700 border-t border-neutral-300 pt-1 flex justify-between items-center">
                    <span>Elena requested coverage for Late shift</span>
                    <Button asChild size="sm" variant="outline" className="h-6 text-xs border-neutral-400">
                      <ScreenLink to="nurse-accept-request-detail">View</ScreenLink>
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="border-t border-neutral-300 bg-neutral-100 p-4">
          <Button asChild variant="outline" className="w-full text-xs justify-center border-neutral-300">
            <ScreenLink to="nurse-offer-schedule">Switch to offer a shift</ScreenLink>
          </Button>
        </footer>
      </div>
    </PhoneFrame>
  );
}
