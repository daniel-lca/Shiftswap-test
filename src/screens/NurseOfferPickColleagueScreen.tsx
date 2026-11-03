import { PhoneFrame } from '@/components/PhoneFrame';
import { Button } from '@/components/ui/button';
import { ScreenLink } from '@/prototype/navigation';
import { AVAILABLE_COLLEAGUES, CURRENT_NURSE, type Colleague } from '@/data/mockData';

export function NurseOfferPickColleagueScreen({ isEmpty = false }: { isEmpty?: boolean }) {
  const colleagues: Colleague[] = isEmpty ? [] : AVAILABLE_COLLEAGUES;

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-full bg-neutral-50 text-neutral-900">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-neutral-300 bg-neutral-100 px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-base font-medium text-neutral-900">Choose colleague</h1>
            <ScreenLink
              to="nurse-offer-schedule"
              className="text-xs text-neutral-600 underline hover:text-neutral-900"
            >
              Cancel
            </ScreenLink>
          </div>
          <p className="text-xs text-neutral-600 mt-1">Select who should receive your shift offer</p>
        </header>

        {/* Selected Shift Context Card */}
        <div className="border-b border-neutral-300 bg-white p-4">
          <p className="text-xs font-medium text-neutral-500">Shift to trade</p>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-900">Wed 6 Nov 2026 · Night shift</span>
            <span className="rounded border border-neutral-300 bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700">
              10 hours
            </span>
          </div>
          <p className="text-xs text-neutral-600 mt-0.5">21:30 - 07:30 · Acute Medical Unit (AMU)</p>
        </div>

        {/* Policy notice */}
        <div className="border-b border-neutral-200 bg-neutral-200 px-4 py-2 text-xs text-neutral-700">
          Showing {CURRENT_NURSE.grade} colleagues who are not rostered on 6 Nov.
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center rounded border border-dashed border-neutral-300 bg-white p-8 text-center">
              <div className="rounded border border-neutral-300 bg-neutral-100 px-3 py-1 text-xs text-neutral-600">
                [No colleagues available]
              </div>
              <h2 className="mt-4 text-sm font-medium text-neutral-900">No eligible colleagues found</h2>
              <p className="mt-2 text-xs text-neutral-600 max-w-xs">
                All Band 5 nurses on AMU and linked wards are already rostered for shifts on Wednesday 6 Nov.
              </p>
              <div className="mt-6 flex flex-col gap-2 w-full max-w-xs">
                <Button asChild variant="outline" className="text-xs border-neutral-400">
                  <ScreenLink to="nurse-offer-schedule">Return to schedule</ScreenLink>
                </Button>
                <p className="text-xs text-neutral-500">
                  For emergency cover, contact the St. Mary&apos;s ward coordinator directly.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              <p className="text-xs text-neutral-500 font-medium">Eligible staff ({colleagues.length})</p>
              {colleagues.map((colleague) => (
                <div
                  key={colleague.id}
                  className="rounded border border-neutral-200 bg-white p-3.5 hover:border-neutral-400 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-neutral-900">{colleague.name}</h3>
                      <p className="text-xs text-neutral-600">
                        {colleague.grade} · {colleague.ward}
                      </p>
                    </div>
                    <span className="rounded bg-neutral-100 border border-neutral-300 px-2 py-0.5 text-xs text-neutral-700">
                      Off duty
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-2 text-xs">
                    <span className="text-neutral-500">Current week: {colleague.currentWeekHours}h</span>
                    <Button asChild size="sm" className="h-7 text-xs bg-neutral-900 text-white hover:bg-neutral-800">
                      <ScreenLink to="nurse-offer-review-send">Select {colleague.name.split(' ')[0]}</ScreenLink>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-neutral-300 bg-neutral-100 p-4">
          <Button asChild variant="outline" className="w-full text-xs justify-center border-neutral-300">
            <ScreenLink to="nurse-offer-schedule">Back to schedule</ScreenLink>
          </Button>
        </footer>
      </div>
    </PhoneFrame>
  );
}

export function NurseOfferPickColleagueEmptyScreen() {
  return <NurseOfferPickColleagueScreen isEmpty={true} />;
}
