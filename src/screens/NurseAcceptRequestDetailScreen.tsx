import { useState } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { Button } from '@/components/ui/button';
import { ScreenLink } from '@/prototype/navigation';
import { CURRENT_NURSE, INCOMING_SWAP_OFFER } from '@/data/mockData';

export function NurseAcceptRequestDetailScreen() {
  const [status, setStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-full bg-neutral-50 text-neutral-900">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-neutral-300 bg-neutral-100 px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-base font-medium text-neutral-900">Swap request details</h1>
            <ScreenLink
              to="nurse-accept-schedule"
              className="text-xs text-neutral-600 underline hover:text-neutral-900"
            >
              Back
            </ScreenLink>
          </div>
          <p className="text-xs text-neutral-600 mt-1">Review coverage proposal</p>
        </header>

        {status === 'accepted' ? (
          <div className="flex-1 p-4 flex flex-col justify-center items-center text-center">
            <div className="rounded border border-neutral-400 bg-neutral-100 px-3 py-1.5 text-xs text-neutral-800">
              [Colleague agreement confirmed]
            </div>
            <h2 className="mt-4 text-base font-medium text-neutral-900">Swap accepted!</h2>
            <p className="mt-2 text-xs text-neutral-600 max-w-xs">
              Status updated to <strong>Waiting for manager approval</strong>. Your agreement has been logged and sent to
              the ward manager for overtime compliance and final sign-off.
            </p>

            <div className="mt-6 rounded border border-neutral-200 bg-white p-3 text-left w-full max-w-xs space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Shift covered</span>
                <span className="font-medium text-neutral-900">Sat 9 Nov · Late (8.5h)</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Traded with</span>
                <span className="font-medium text-neutral-900">{INCOMING_SWAP_OFFER.requesterName}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Your weekly hours</span>
                <span className="font-medium text-neutral-900">30h → 38.5h (within limits)</span>
              </div>
              <div className="flex justify-between text-neutral-600 border-t border-neutral-100 pt-1.5">
                <span>Current state</span>
                <span className="rounded bg-neutral-200 px-1.5 py-0.5 text-xs text-neutral-800">
                  Waiting for manager approval
                </span>
              </div>
            </div>

            <div className="mt-6 w-full max-w-xs">
              <Button asChild className="w-full text-xs bg-neutral-900 text-white hover:bg-neutral-800">
                <ScreenLink to="nurse-accept-schedule">Back to schedule</ScreenLink>
              </Button>
            </div>
          </div>
        ) : status === 'declined' ? (
          <div className="flex-1 p-4 flex flex-col justify-center items-center text-center">
            <div className="rounded border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-xs text-neutral-700">
              [Request declined]
            </div>
            <h2 className="mt-4 text-base font-medium text-neutral-900">Swap offer declined</h2>
            <p className="mt-2 text-xs text-neutral-600 max-w-xs">
              Elena has been notified that you cannot cover this shift. Your schedule remains unchanged.
            </p>
            <div className="mt-6 w-full max-w-xs">
              <Button asChild variant="outline" className="w-full text-xs border-neutral-400">
                <ScreenLink to="nurse-accept-schedule">Back to schedule</ScreenLink>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-between p-4">
            <div className="space-y-4">
              {/* Requester Card */}
              <div className="rounded border border-neutral-300 bg-white p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-medium text-neutral-500">Requested by</span>
                    <h3 className="text-base font-medium text-neutral-900 mt-0.5">
                      {INCOMING_SWAP_OFFER.requesterName}
                    </h3>
                    <p className="text-xs text-neutral-600">{INCOMING_SWAP_OFFER.requesterGrade}</p>
                  </div>
                  <span className="rounded border border-neutral-300 bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700">
                    Same grade
                  </span>
                </div>

                <div className="border-t border-neutral-200 pt-3">
                  <span className="text-xs font-medium text-neutral-500">Shift to take over</span>
                  <p className="text-sm font-medium text-neutral-900 mt-0.5">{INCOMING_SWAP_OFFER.shiftDate}</p>
                  <p className="text-xs text-neutral-600">{INCOMING_SWAP_OFFER.shiftTime}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">Ward: {INCOMING_SWAP_OFFER.ward}</p>
                </div>

                <div className="border-t border-neutral-200 pt-3">
                  <span className="text-xs font-medium text-neutral-500">Reason provided</span>
                  <p className="text-xs text-neutral-800 italic mt-1 bg-neutral-50 p-2 rounded border border-neutral-200">
                    &ldquo;{INCOMING_SWAP_OFFER.reason}&rdquo;
                  </p>
                </div>
              </div>

              {/* Roster Impact */}
              <div className="rounded border border-neutral-200 bg-white p-4 space-y-2 text-xs">
                <p className="font-medium text-neutral-900">Your roster impact</p>
                <div className="flex justify-between text-neutral-600">
                  <span>Current schedule for 9 Nov:</span>
                  <span className="font-medium text-neutral-800">Rest day (Off duty)</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Weekly hours before swap:</span>
                  <span className="font-medium text-neutral-800">30.0 hrs</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Weekly hours after swap:</span>
                  <span className="font-medium text-neutral-800">38.5 hrs (within 48h limit)</span>
                </div>
              </div>

              {/* Notice */}
              <div className="rounded border border-neutral-200 bg-neutral-100 p-3 text-xs text-neutral-700 space-y-1">
                <p className="font-medium text-neutral-900">Next step after accepting:</p>
                <p>Status changes to &ldquo;Waiting for manager approval&rdquo;. The ward manager reviews it next.</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-2 border-t border-neutral-200 pt-4">
              <Button
                onClick={() => setStatus('accepted')}
                className="w-full text-xs bg-neutral-900 text-white hover:bg-neutral-800"
              >
                Accept swap
              </Button>
              <Button
                onClick={() => setStatus('declined')}
                variant="outline"
                className="w-full text-xs justify-center border-neutral-300 text-neutral-700 hover:bg-neutral-100"
              >
                Decline request
              </Button>
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
