import { useState } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ScreenLink, useGoToScreen } from '@/prototype/navigation';
import { CURRENT_NURSE, INITIAL_SHIFTS, type Shift } from '@/data/mockData';

export function NurseOfferScheduleScreen({ initialShowCancelModal = false }: { initialShowCancelModal?: boolean }) {
  const [shifts, setShifts] = useState<Shift[]>(INITIAL_SHIFTS);
  const [showCancelDialog, setShowCancelDialog] = useState(initialShowCancelModal);
  const [cancelledSuccess, setCancelledSuccess] = useState(false);
  const goTo = useGoToScreen();

  const handleConfirmCancel = () => {
    setShifts((prev) =>
      prev.map((s) => (s.id === 'sh-7' ? { ...s, tradeStatus: 'can-trade', tradeRecipient: undefined } : s)),
    );
    setShowCancelDialog(false);
    setCancelledSuccess(true);
    setTimeout(() => setCancelledSuccess(false), 4000);
  };

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-full bg-neutral-50 text-neutral-900">
        {/* Mobile App Header */}
        <header className="sticky top-0 z-10 border-b border-neutral-300 bg-neutral-100 px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-600 font-medium">Shiftswap · Nurse Portal</p>
              <h1 className="text-base font-medium text-neutral-900">My 14-day schedule</h1>
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

        {/* Notice Bar */}
        <div className="border-b border-neutral-200 bg-neutral-200 px-4 py-2 text-xs text-neutral-700">
          Showing next 14 days · Tap any eligible shift to offer a trade
        </div>

        {cancelledSuccess && (
          <div className="mx-4 mt-3 rounded border border-neutral-400 bg-neutral-100 p-3 text-xs text-neutral-800">
            Swap request cancelled. The shift remains on your schedule.
          </div>
        )}

        {/* Schedule List */}
        <div className="flex-1 space-y-2 p-4">
          {shifts.map((shift) => {
            const isNight = shift.type === 'Night';
            const isOff = shift.type === 'Off';
            const isTargetTradeShift = shift.id === 'sh-3';
            const isWaitingColleague = shift.tradeStatus === 'waiting-colleague';

            return (
              <div
                key={shift.id}
                className={`rounded border p-3 ${
                  isTargetTradeShift
                    ? 'border-neutral-400 bg-white'
                    : isOff
                      ? 'border-neutral-200 bg-neutral-100/60'
                      : 'border-neutral-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-neutral-700 w-8">{shift.day}</span>
                    <span className="text-xs text-neutral-500 w-12">{shift.dateFormatted}</span>
                    <span
                      className={`rounded px-1.5 py-0.5 text-xs font-medium border ${
                        isOff
                          ? 'border-neutral-300 bg-neutral-100 text-neutral-600'
                          : isNight
                            ? 'border-neutral-400 bg-neutral-200 text-neutral-800'
                            : 'border-neutral-300 bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {shift.type}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-600">{shift.time}</span>
                </div>

                <div className="mt-2 flex items-center justify-between pt-1 border-t border-neutral-100 text-xs text-neutral-600">
                  <span>{shift.ward !== '—' ? `Ward: ${shift.ward} (${shift.hours}h)` : 'Rest day'}</span>

                  {isTargetTradeShift && (
                    <Button asChild size="sm" variant="outline" className="h-7 text-xs border-neutral-400">
                      <ScreenLink to="nurse-offer-pick-colleague">Trade shift</ScreenLink>
                    </Button>
                  )}

                  {isWaitingColleague && (
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-neutral-200 px-1.5 py-0.5 text-xs text-neutral-800">
                        Waiting for colleague
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs text-neutral-700 border-neutral-300"
                        onClick={() => setShowCancelDialog(true)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <footer className="border-t border-neutral-300 bg-neutral-100 p-4">
          <Button
            asChild
            variant="outline"
            className="w-full text-xs justify-center border-neutral-400 bg-white text-neutral-800"
          >
            <ScreenLink to="nurse-accept-schedule">Switch to incoming swap requests (1 pending)</ScreenLink>
          </Button>
        </footer>

        {/* Cancel Request Confirmation Dialog */}
        <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <AlertDialogContent className="max-w-xs border border-neutral-300 bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-base font-medium text-neutral-900">
                Cancel shift trade request?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xs text-neutral-600">
                Are you sure you want to withdraw your swap offer to Marcus Vance for Sunday 10 Nov (Late Shift, AMU)?
                Marcus will no longer be able to accept it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-col gap-2 sm:flex-row">
              <AlertDialogCancel
                onClick={() => {
                  setShowCancelDialog(false);
                  if (initialShowCancelModal) {
                    goTo('nurse-offer-schedule');
                  }
                }}
                className="text-xs border-neutral-300"
              >
                Keep request
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmCancel}
                className="text-xs bg-neutral-800 text-white hover:bg-neutral-700"
              >
                Yes, cancel request
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PhoneFrame>
  );
}

export function NurseOfferScheduleCancelConfirmScreen() {
  return <NurseOfferScheduleScreen initialShowCancelModal={true} />;
}
