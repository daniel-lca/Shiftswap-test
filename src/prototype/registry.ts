import type { Registry } from './types';
import {
  NurseOfferScheduleScreen,
  NurseOfferScheduleCancelConfirmScreen,
} from '../screens/NurseOfferScheduleScreen';
import {
  NurseOfferPickColleagueScreen,
  NurseOfferPickColleagueEmptyScreen,
} from '../screens/NurseOfferPickColleagueScreen';
import { NurseOfferReviewSendScreen } from '../screens/NurseOfferReviewSendScreen';
import { NurseAcceptScheduleScreen } from '../screens/NurseAcceptScheduleScreen';
import { NurseAcceptRequestDetailScreen } from '../screens/NurseAcceptRequestDetailScreen';
import {
  ManagerApprovalsListScreen,
  ManagerApprovalsListEmptyScreen,
} from '../screens/ManagerApprovalsListScreen';
import {
  ManagerApprovalsDetailScreen,
  ManagerApprovalsDetailOvertimeRiskScreen,
} from '../screens/ManagerApprovalsDetailScreen';

export const registry: Registry = {
  name: 'Shiftswap',
  fidelity: 'lo-fi',
  description:
    'Lets hospital nurses trade shifts with colleagues without calling the ward office, and lets ward managers approve swaps in one place.',
  userTypes: [
    {
      id: 'nurse',
      name: 'Nurse',
      description: 'Works rotating clinical shifts on mobile; offers shifts and accepts trades from colleagues.',
      order: 1,
    },
    {
      id: 'ward-manager',
      name: 'Ward manager',
      description: 'Reviews overtime risk and authorizes or rejects shift swaps on desktop.',
      order: 2,
    },
  ],
  flows: [
    {
      id: 'nurse-offer-shift',
      userTypeId: 'nurse',
      name: 'Offer a shift',
      description: 'Nurse selects a rostered shift, chooses an eligible colleague, and submits a trade request.',
      screenIds: ['nurse-offer-schedule', 'nurse-offer-pick-colleague', 'nurse-offer-review-send'],
      startScreenId: 'nurse-offer-schedule',
      status: 'ready-for-review',
      order: 1,
    },
    {
      id: 'nurse-accept-swap',
      userTypeId: 'nurse',
      name: 'Accept a swap',
      description: 'Nurse receives an incoming swap request from a colleague and accepts coverage.',
      screenIds: ['nurse-accept-schedule', 'nurse-accept-request-detail'],
      startScreenId: 'nurse-accept-schedule',
      status: 'ready-for-review',
      order: 2,
    },
    {
      id: 'manager-approve-swap',
      userTypeId: 'ward-manager',
      name: 'Approve swaps',
      description: 'Ward manager inspects pending swap requests, reviews overtime compliance, and approves or rejects.',
      screenIds: ['manager-approvals-list', 'manager-approvals-detail'],
      startScreenId: 'manager-approvals-list',
      status: 'ready-for-review',
      order: 3,
    },
  ],
  screens: [
    // Flow 1 screens
    {
      id: 'nurse-offer-schedule',
      userTypeId: 'nurse',
      flowId: 'nurse-offer-shift',
      name: 'My schedule',
      description: '14-day schedule overview with shift details and trade initiation action.',
      route: '/prototype/nurse/offer/schedule',
      component: NurseOfferScheduleScreen,
      previewViewport: { width: 390, height: 844 },
    },
    {
      id: 'nurse-offer-schedule-cancel-confirm',
      userTypeId: 'nurse',
      flowId: 'nurse-offer-shift',
      parentScreenId: 'nurse-offer-schedule',
      variant: 'cancel-confirm',
      name: 'My schedule',
      description: 'Confirmation dialog to cancel an existing shift offer before acceptance.',
      route: '/prototype/nurse/offer/schedule/cancel-confirm',
      component: NurseOfferScheduleCancelConfirmScreen,
      previewViewport: { width: 390, height: 844 },
    },
    {
      id: 'nurse-offer-pick-colleague',
      userTypeId: 'nurse',
      flowId: 'nurse-offer-shift',
      name: 'Choose colleague',
      description: 'Filtered list of same-grade colleagues rostered off on the shift date.',
      route: '/prototype/nurse/offer/pick-colleague',
      component: NurseOfferPickColleagueScreen,
      previewViewport: { width: 390, height: 844 },
    },
    {
      id: 'nurse-offer-pick-colleague-empty',
      userTypeId: 'nurse',
      flowId: 'nurse-offer-shift',
      parentScreenId: 'nurse-offer-pick-colleague',
      variant: 'no-colleagues',
      name: 'Choose colleague',
      description: 'Empty state when no same-grade colleagues are available on the selected date.',
      route: '/prototype/nurse/offer/pick-colleague/empty',
      component: NurseOfferPickColleagueEmptyScreen,
      previewViewport: { width: 390, height: 844 },
    },
    {
      id: 'nurse-offer-review-send',
      userTypeId: 'nurse',
      flowId: 'nurse-offer-shift',
      name: 'Review and send',
      description: 'Summary of the trade offer with optional note and submission action.',
      route: '/prototype/nurse/offer/review',
      component: NurseOfferReviewSendScreen,
      previewViewport: { width: 390, height: 844 },
    },

    // Flow 2 screens
    {
      id: 'nurse-accept-schedule',
      userTypeId: 'nurse',
      flowId: 'nurse-accept-swap',
      name: 'Incoming request on schedule',
      description: 'Schedule view with prominent notification card for incoming trade requests.',
      route: '/prototype/nurse/accept/schedule',
      component: NurseAcceptScheduleScreen,
      previewViewport: { width: 390, height: 844 },
    },
    {
      id: 'nurse-accept-request-detail',
      userTypeId: 'nurse',
      flowId: 'nurse-accept-swap',
      name: 'Swap request details',
      description: 'Detailed view of incoming swap offer with roster impact and accept/decline buttons.',
      route: '/prototype/nurse/accept/detail',
      component: NurseAcceptRequestDetailScreen,
      previewViewport: { width: 390, height: 844 },
    },

    // Flow 3 screens
    {
      id: 'manager-approvals-list',
      userTypeId: 'ward-manager',
      flowId: 'manager-approve-swap',
      name: 'Pending approvals list',
      description: 'High-density queue of shift swaps awaiting manager authorization with overtime flags.',
      route: '/prototype/manager/approvals/list',
      component: ManagerApprovalsListScreen,
      previewViewport: { width: 1440, height: 900 },
    },
    {
      id: 'manager-approvals-list-empty',
      userTypeId: 'ward-manager',
      flowId: 'manager-approve-swap',
      parentScreenId: 'manager-approvals-list',
      variant: 'empty',
      name: 'Pending approvals list',
      description: 'Empty queue state when all submitted swaps have been processed.',
      route: '/prototype/manager/approvals/list/empty',
      component: ManagerApprovalsListEmptyScreen,
      previewViewport: { width: 1440, height: 900 },
    },
    {
      id: 'manager-approvals-detail',
      userTypeId: 'ward-manager',
      flowId: 'manager-approve-swap',
      name: 'Review swap',
      description: 'Detailed inspection of swap participants, hours impact, and approve/reject actions.',
      route: '/prototype/manager/approvals/detail',
      component: ManagerApprovalsDetailScreen,
      previewViewport: { width: 1440, height: 900 },
    },
    {
      id: 'manager-approvals-detail-overtime-risk',
      userTypeId: 'ward-manager',
      flowId: 'manager-approve-swap',
      parentScreenId: 'manager-approvals-detail',
      variant: 'overtime-warning',
      name: 'Review swap',
      description: 'Inspection view showing high-risk breach of the 48-hour Working Time Regulations limit.',
      route: '/prototype/manager/approvals/detail/overtime-warning',
      component: ManagerApprovalsDetailOvertimeRiskScreen,
      previewViewport: { width: 1440, height: 900 },
    },
  ],
  shortcuts: [
    {
      id: 'no-colleagues',
      label: 'No colleagues available',
      screenId: 'nurse-offer-pick-colleague-empty',
      description: 'Reviewer state when no same-grade colleagues are off duty.',
      order: 1,
    },
    {
      id: 'cancel-confirm',
      label: 'Cancel swap confirmation dialog',
      screenId: 'nurse-offer-schedule-cancel-confirm',
      description: 'Confirmation modal before withdrawing an offered shift trade.',
      order: 2,
    },
    {
      id: 'overtime-warning',
      label: '48h overtime risk warning',
      screenId: 'manager-approvals-detail-overtime-risk',
      description: 'Ward manager view of a swap taking a nurse over 48 weekly hours.',
      order: 3,
    },
    {
      id: 'empty-approvals',
      label: 'No pending manager approvals',
      screenId: 'manager-approvals-list-empty',
      description: 'Zero pending approvals empty state for the ward office.',
      order: 4,
    },
  ],
};
