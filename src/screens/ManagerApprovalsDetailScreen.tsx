import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScreenLink, useGoToScreen } from '@/prototype/navigation';
import { PENDING_MANAGER_SWAPS, type SwapRequest } from '@/data/mockData';

export function ManagerApprovalsDetailScreen({ isOvertimeCase = false }: { isOvertimeCase?: boolean }) {
  const swap: SwapRequest = isOvertimeCase ? PENDING_MANAGER_SWAPS[1] : PENDING_MANAGER_SWAPS[0];
  const [decision, setDecision] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectError, setRejectError] = useState(false);
  const goTo = useGoToScreen();

  const handleApprove = () => {
    setDecision('approved');
  };

  const handleConfirmReject = () => {
    if (!rejectReason.trim()) {
      setRejectError(true);
      return;
    }
    setRejectError(false);
    setShowRejectModal(false);
    setDecision('rejected');
  };

  return (
    <div className="min-h-[calc(100dvh-var(--prototype-bar-height,0px))] bg-neutral-100 text-neutral-900">
      {/* Header */}
      <header className="border-b border-neutral-300 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <ScreenLink
              to="manager-approvals-list"
              className="text-xs text-neutral-600 underline hover:text-neutral-900"
            >
              ← Back to approvals list
            </ScreenLink>
            <span className="text-neutral-300">/</span>
            <h1 className="text-base font-medium text-neutral-900">Review swap {swap.id}</h1>
          </div>
          <span className="rounded border border-neutral-300 bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700">
            Ward manager review
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-4xl p-6">
        {decision === 'approved' ? (
          <div className="rounded border border-neutral-400 bg-white p-8 text-center shadow-xs">
            <div className="inline-block rounded border border-neutral-400 bg-neutral-100 px-3 py-1 text-xs text-neutral-800">
              [Swap approval registered]
            </div>
            <h2 className="mt-4 text-xl font-medium text-neutral-900">Shift swap {swap.id} approved</h2>
            <p className="mt-2 text-xs text-neutral-600 max-w-md mx-auto">
              The hospital electronic roster has been updated. Both {swap.requesterName} and {swap.coveringName} have
              been notified of the confirmed shift change.
            </p>
            <div className="mt-6">
              <Button asChild className="text-xs bg-neutral-900 text-white hover:bg-neutral-800">
                <ScreenLink to="manager-approvals-list">Return to approvals queue</ScreenLink>
              </Button>
            </div>
          </div>
        ) : decision === 'rejected' ? (
          <div className="rounded border border-neutral-400 bg-white p-8 text-center shadow-xs">
            <div className="inline-block rounded border border-neutral-300 bg-neutral-100 px-3 py-1 text-xs text-neutral-700">
              [Swap rejection recorded]
            </div>
            <h2 className="mt-4 text-xl font-medium text-neutral-900">Shift swap {swap.id} rejected</h2>
            <p className="mt-2 text-xs text-neutral-600 max-w-md mx-auto">
              The request was rejected and returned to the nurses with the reason:
            </p>
            <p className="mt-2 text-xs text-neutral-800 italic bg-neutral-50 p-3 rounded border border-neutral-200 max-w-md mx-auto">
              &ldquo;{rejectReason}&rdquo;
            </p>
            <div className="mt-6">
              <Button asChild className="text-xs bg-neutral-900 text-white hover:bg-neutral-800">
                <ScreenLink to="manager-approvals-list">Return to approvals queue</ScreenLink>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Overtime Risk Alert if applicable */}
            {swap.overtimeExceeded && (
              <div className="rounded border-2 border-neutral-900 bg-neutral-200 p-4">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-neutral-900 px-2 py-0.5 text-xs font-semibold text-white">
                    Compliance Warning
                  </span>
                  <h2 className="text-sm font-semibold text-neutral-900">48-hour Working Time limit breached</h2>
                </div>
                <p className="mt-2 text-xs text-neutral-800 leading-relaxed">
                  This swap increases <strong>{swap.coveringName}&apos;s</strong> scheduled hours to{' '}
                  <strong>{swap.overtimeHours} hours</strong> in the current 7-day period (maximum allowed limit:{' '}
                  <strong>48.0 hours</strong>).
                </p>
                <p className="mt-1 text-xs text-neutral-600">
                  Approval requires that an opt-out agreement is recorded on file and adequate rest breaks are
                  scheduled between shifts.
                </p>
              </div>
            )}

            {/* Shift Overview Card */}
            <div className="rounded border border-neutral-300 bg-white p-6 shadow-xs">
              <div className="flex items-start justify-between border-b border-neutral-200 pb-4">
                <div>
                  <span className="text-xs text-neutral-500 font-medium">Shift requested to swap</span>
                  <h3 className="text-lg font-medium text-neutral-900 mt-1">
                    {swap.shiftDate} · {swap.shiftType} Shift
                  </h3>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    {swap.shiftTime} ({swap.hours} hours) · {swap.ward}
                  </p>
                </div>
                <div className="text-right">
                  <span className="rounded border border-neutral-300 bg-neutral-100 px-2 py-1 text-xs text-neutral-700">
                    Request ID: {swap.id}
                  </span>
                  <p className="text-xs text-neutral-500 mt-1">Submitted: {swap.createdAt}</p>
                </div>
              </div>

              {/* Both Nurses Comparison Grid */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Original Nurse */}
                <div className="rounded border border-neutral-200 bg-neutral-50 p-4">
                  <span className="text-xs font-semibold text-neutral-700">Original nurse (giving up shift)</span>
                  <h4 className="text-base font-medium text-neutral-900 mt-1">{swap.requesterName}</h4>
                  <p className="text-xs text-neutral-600">{swap.requesterGrade}</p>

                  <div className="mt-4 space-y-1.5 border-t border-neutral-200 pt-3 text-xs text-neutral-600">
                    <div className="flex justify-between">
                      <span>Hours before swap:</span>
                      <span className="font-medium text-neutral-900">{swap.requesterHoursBefore}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hours after swap:</span>
                      <span className="font-medium text-neutral-900">{swap.requesterHoursAfter}h</span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Net impact:</span>
                      <span>-{swap.hours}h</span>
                    </div>
                  </div>
                </div>

                {/* Covering Nurse */}
                <div
                  className={`rounded border p-4 ${
                    swap.overtimeExceeded ? 'border-neutral-800 bg-neutral-100' : 'border-neutral-200 bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-700">Covering nurse (taking shift)</span>
                    {swap.overtimeExceeded && (
                      <span className="rounded bg-neutral-800 px-1.5 py-0.5 text-xs text-white">Overtime</span>
                    )}
                  </div>
                  <h4 className="text-base font-medium text-neutral-900 mt-1">{swap.coveringName}</h4>
                  <p className="text-xs text-neutral-600">{swap.coveringGrade}</p>

                  <div className="mt-4 space-y-1.5 border-t border-neutral-200 pt-3 text-xs text-neutral-600">
                    <div className="flex justify-between">
                      <span>Hours before swap:</span>
                      <span className="font-medium text-neutral-900">{swap.coveringHoursBefore}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hours after swap:</span>
                      <span
                        className={`font-semibold ${
                          swap.overtimeExceeded ? 'text-neutral-900 underline' : 'text-neutral-900'
                        }`}
                      >
                        {swap.coveringHoursAfter}h
                      </span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Weekly limit:</span>
                      <span>48.0h</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stated Reason */}
              <div className="mt-6 border-t border-neutral-200 pt-4">
                <span className="text-xs font-medium text-neutral-500">Nurse reason statement</span>
                <p className="mt-1 text-xs text-neutral-800 bg-neutral-50 p-3 rounded border border-neutral-200 italic">
                  &ldquo;{swap.reason}&rdquo;
                </p>
              </div>
            </div>

            {/* Decision Actions Bar */}
            <div className="flex items-center justify-between rounded border border-neutral-300 bg-white p-4 shadow-xs">
              <div className="text-xs text-neutral-600">
                Action will update the official ward roster immediately and notify both staff members.
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowRejectModal(true)}
                  className="text-xs border-neutral-400 text-neutral-800 hover:bg-neutral-100"
                >
                  Reject swap…
                </Button>
                <Button
                  size="sm"
                  onClick={handleApprove}
                  className="text-xs bg-neutral-900 text-white hover:bg-neutral-800"
                >
                  Approve swap
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Rejection Modal with Mandatory Reason */}
        <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
          <DialogContent className="max-w-md border border-neutral-300 bg-white">
            <DialogHeader>
              <DialogTitle className="text-base font-medium text-neutral-900">
                Reject shift swap {swap.id}
              </DialogTitle>
              <DialogDescription className="text-xs text-neutral-600">
                A reason is required by hospital policy so both staff members understand why this swap could not be
                authorized.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2 py-2">
              <label htmlFor="reject-reason" className="block text-xs font-medium text-neutral-700">
                Rejection reason <span className="text-neutral-500">(required)</span>
              </label>
              <Textarea
                id="reject-reason"
                value={rejectReason}
                onChange={(e) => {
                  setRejectReason(e.target.value);
                  if (e.target.value.trim()) setRejectError(false);
                }}
                className={`text-xs resize-none border ${
                  rejectError ? 'border-neutral-900 ring-1 ring-neutral-900' : 'border-neutral-300'
                }`}
                rows={3}
                placeholder="e.g. Would breach 48h Working Time Directive; minimum 11h rest period required between shifts…"
              />
              {rejectError && (
                <p className="text-xs text-neutral-900 font-medium">Please enter a reason before rejecting.</p>
              )}
            </div>

            <DialogFooter className="flex gap-2 sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectError(false);
                }}
                className="text-xs border-neutral-300"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleConfirmReject}
                className="text-xs bg-neutral-900 text-white hover:bg-neutral-800"
              >
                Confirm rejection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

export function ManagerApprovalsDetailOvertimeRiskScreen() {
  return <ManagerApprovalsDetailScreen isOvertimeCase={true} />;
}
