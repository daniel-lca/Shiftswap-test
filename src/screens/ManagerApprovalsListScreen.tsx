import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScreenLink } from '@/prototype/navigation';
import { PENDING_MANAGER_SWAPS, type SwapRequest } from '@/data/mockData';

export function ManagerApprovalsListScreen({ isEmpty = false }: { isEmpty?: boolean }) {
  const [swaps, setSwaps] = useState<SwapRequest[]>(isEmpty ? [] : PENDING_MANAGER_SWAPS);

  return (
    <div className="min-h-[calc(100dvh-var(--prototype-bar-height,0px))] bg-neutral-100 text-neutral-900">
      {/* Desktop Header */}
      <header className="border-b border-neutral-300 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-xs font-semibold text-white">
                Ward Office
              </span>
              <h1 className="text-lg font-medium text-neutral-900">Shift swap approvals</h1>
            </div>
            <p className="text-xs text-neutral-600 mt-1">
              St. Mary&apos;s Hospital · Acute Medical Unit &amp; Surgical Units
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-neutral-600">
            <span>Reviewer: Matron E. Walker (Ward Manager)</span>
            <span className="rounded border border-neutral-300 bg-neutral-100 px-2 py-1 font-medium text-neutral-800">
              Desktop Mode (1440px)
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl p-6">
        {/* KPI / Status Bar */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded border border-neutral-300 bg-white p-4">
            <span className="text-xs text-neutral-500 font-medium">Pending approvals</span>
            <p className="text-2xl font-medium text-neutral-900 mt-1">{swaps.length}</p>
            <p className="text-xs text-neutral-600 mt-1">Awaiting manager sign-off</p>
          </div>
          <div className="rounded border border-neutral-300 bg-white p-4">
            <span className="text-xs text-neutral-500 font-medium">Overtime risk flags</span>
            <p className="text-2xl font-medium text-neutral-900 mt-1">
              {swaps.filter((s) => s.overtimeExceeded).length}
            </p>
            <p className="text-xs text-neutral-600 mt-1">&gt;48 hours in rolling 7-day period</p>
          </div>
          <div className="rounded border border-neutral-300 bg-white p-4">
            <span className="text-xs text-neutral-500 font-medium">Average turnaround</span>
            <p className="text-2xl font-medium text-neutral-900 mt-1">&lt; 4 hrs</p>
            <p className="text-xs text-neutral-600 mt-1">Target: &lt; 24 hours</p>
          </div>
        </div>

        {/* Approvals Table / Dense List */}
        <div className="rounded border border-neutral-300 bg-white shadow-xs overflow-hidden">
          <div className="border-b border-neutral-200 bg-neutral-50 px-6 py-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium text-neutral-900">Pending swap queue</h2>
              <p className="text-xs text-neutral-600">
                Linear-style high-density queue with automated Working Time Directive checks
              </p>
            </div>
            <span className="text-xs text-neutral-500">Sorted by submission time</span>
          </div>

          {swaps.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-block rounded border border-neutral-300 bg-neutral-100 px-3 py-1 text-xs text-neutral-600">
                [Queue empty]
              </div>
              <h3 className="mt-4 text-base font-medium text-neutral-900">No pending shift swaps</h3>
              <p className="mt-1 text-xs text-neutral-600 max-w-md mx-auto">
                All submitted swap requests have been reviewed. When nurses submit new trades, they will appear here
                automatically.
              </p>
              <div className="mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSwaps(PENDING_MANAGER_SWAPS)}
                  className="text-xs border-neutral-400"
                >
                  Reload mock requests
                </Button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-100/70 text-neutral-600">
                    <th className="py-2.5 px-4 font-medium">ID</th>
                    <th className="py-2.5 px-4 font-medium">Shift date &amp; type</th>
                    <th className="py-2.5 px-4 font-medium">Ward</th>
                    <th className="py-2.5 px-4 font-medium">Original nurse</th>
                    <th className="py-2.5 px-4 font-medium">Covering nurse</th>
                    <th className="py-2.5 px-4 font-medium">48h overtime risk check</th>
                    <th className="py-2.5 px-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {swaps.map((swap) => {
                    const isTargetDetailSwap = swap.id === 'SWP-1042';
                    const isOvertimeSwap = swap.id === 'SWP-1049';

                    return (
                      <tr key={swap.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="py-3 px-4 font-mono font-medium text-neutral-800">{swap.id}</td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-neutral-900">{swap.shiftDate}</div>
                          <div className="text-neutral-500">
                            {swap.shiftType} ({swap.shiftTime})
                          </div>
                        </td>
                        <td className="py-3 px-4 text-neutral-700">{swap.ward}</td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-neutral-900">{swap.requesterName}</div>
                          <div className="text-neutral-500">{swap.requesterGrade}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-neutral-900">{swap.coveringName}</div>
                          <div className="text-neutral-500">{swap.coveringGrade}</div>
                        </td>
                        <td className="py-3 px-4">
                          {swap.overtimeExceeded ? (
                            <span className="inline-flex items-center rounded border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-xs font-semibold text-white">
                              Warning: {swap.overtimeHours}h / 48h limit
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded border border-neutral-300 bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700">
                              Compliant ({swap.coveringHoursAfter}h)
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            asChild
                            size="sm"
                            variant={swap.overtimeExceeded ? 'default' : 'outline'}
                            className={`h-7 text-xs ${
                              swap.overtimeExceeded
                                ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                                : 'border-neutral-300'
                            }`}
                          >
                            <ScreenLink
                              to={
                                isOvertimeSwap
                                  ? 'manager-approvals-detail-overtime-risk'
                                  : 'manager-approvals-detail'
                              }
                            >
                              Review swap
                            </ScreenLink>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Regulatory note */}
        <div className="mt-6 rounded border border-neutral-300 bg-neutral-200 p-4 text-xs text-neutral-700">
          <p className="font-medium text-neutral-900">NHS Working Time Regulations policy:</p>
          <p className="mt-1">
            Clinical staff must not exceed 48 weekly hours averaged over 17 weeks without an explicit opt-out agreement.
            Any swap pushing scheduled hours above 48 hours within 7 days triggers the high-risk warning.
          </p>
        </div>
      </main>
    </div>
  );
}

export function ManagerApprovalsListEmptyScreen() {
  return <ManagerApprovalsListScreen isEmpty={true} />;
}
