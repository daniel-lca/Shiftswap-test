import { useState } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScreenLink, useGoToScreen } from '@/prototype/navigation';
import { CURRENT_NURSE } from '@/data/mockData';

export function NurseOfferReviewSendScreen() {
  const [note, setNote] = useState('Attending family wedding on Thursday morning.');
  const [submitted, setSubmitted] = useState(false);
  const goTo = useGoToScreen();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-full bg-neutral-50 text-neutral-900">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-neutral-300 bg-neutral-100 px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-base font-medium text-neutral-900">Review and send</h1>
            <ScreenLink
              to="nurse-offer-pick-colleague"
              className="text-xs text-neutral-600 underline hover:text-neutral-900"
            >
              Back
            </ScreenLink>
          </div>
          <p className="text-xs text-neutral-600 mt-1">Step 3 of 3 · Final confirmation</p>
        </header>

        {submitted ? (
          <div className="flex-1 p-4 flex flex-col justify-center items-center text-center">
            <div className="rounded border border-neutral-400 bg-neutral-100 px-3 py-1.5 text-xs text-neutral-800">
              [Swap offer dispatched]
            </div>
            <h2 className="mt-4 text-base font-medium text-neutral-900">Offer sent to David Miller</h2>
            <p className="mt-2 text-xs text-neutral-600 max-w-xs">
              Status updated to <strong>Waiting for colleague</strong>. Once David accepts on his phone, the swap will
              automatically go to your ward manager for sign-off.
            </p>

            <div className="mt-6 rounded border border-neutral-200 bg-white p-3 text-left w-full max-w-xs space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Shift</span>
                <span className="font-medium text-neutral-900">Wed 6 Nov · Night (10h)</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Recipient</span>
                <span className="font-medium text-neutral-900">David Miller (Band 5)</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Current status</span>
                <span className="rounded bg-neutral-200 px-1 text-xs text-neutral-800">Waiting for colleague</span>
              </div>
            </div>

            <div className="mt-6 w-full max-w-xs">
              <Button asChild className="w-full text-xs bg-neutral-900 text-white hover:bg-neutral-800">
                <ScreenLink to="nurse-offer-schedule">Return to my schedule</ScreenLink>
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSend} className="flex-1 flex flex-col justify-between p-4">
            <div className="space-y-4">
              {/* Summary Card */}
              <div className="rounded border border-neutral-300 bg-white p-4 space-y-3">
                <div>
                  <span className="text-xs font-medium text-neutral-500">Shift being traded</span>
                  <p className="text-sm font-medium text-neutral-900 mt-0.5">Wednesday 6 Nov 2026</p>
                  <p className="text-xs text-neutral-600">Night Shift · 21:30 - 07:30 (10 hours)</p>
                  <p className="text-xs text-neutral-500 mt-0.5">Ward: {CURRENT_NURSE.ward}</p>
                </div>

                <div className="border-t border-neutral-200 pt-3">
                  <span className="text-xs font-medium text-neutral-500">Offered to</span>
                  <p className="text-sm font-medium text-neutral-900 mt-0.5">David Miller</p>
                  <p className="text-xs text-neutral-600">Band 5 Staff Nurse · Scheduled off on 6 Nov</p>
                </div>
              </div>

              {/* Reason / Note input */}
              <div className="rounded border border-neutral-200 bg-white p-4">
                <label htmlFor="swap-note" className="block text-xs font-medium text-neutral-700">
                  Optional note for David
                </label>
                <Textarea
                  id="swap-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="mt-2 text-xs resize-none border-neutral-300"
                  rows={3}
                  placeholder="Explain why you need this shift covered…"
                />
              </div>

              {/* Approval lifecycle guide */}
              <div className="rounded border border-neutral-200 bg-neutral-100 p-3 space-y-1.5 text-xs text-neutral-700">
                <p className="font-medium text-neutral-900">What happens next?</p>
                <p>1. David receives your request on his Shiftswap schedule.</p>
                <p>2. You can cancel anytime before David accepts.</p>
                <p>3. After David accepts, it is routed to the Ward Manager to approve overtime limits.</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-2 border-t border-neutral-200 pt-4">
              <Button type="submit" className="w-full text-xs bg-neutral-900 text-white hover:bg-neutral-800">
                Send swap request
              </Button>
              <Button
                asChild
                type="button"
                variant="outline"
                className="w-full text-xs justify-center border-neutral-300 text-neutral-700"
              >
                <ScreenLink to="nurse-offer-pick-colleague">Change colleague</ScreenLink>
              </Button>
            </div>
          </form>
        )}
      </div>
    </PhoneFrame>
  );
}
