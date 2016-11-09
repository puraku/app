import { postedDateTagger } from 'helpers/plurkHelper';

export const currentUser = state => {
  return state.loginUsers[state.selectedUserId];
};

export const currentUserTimeline = state => {
  const timeline = state.plurks.timeline[state.selectedUserId] || {};

  if (typeof timeline !== 'undefined' &&
      typeof timeline[state.route.query.filter || 'all'] !== 'undefined') {
    const plurkIds = timeline[state.route.query.filter || 'all'] || [];
    return postedDateTagger(plurkIds.map(id => state.plurks.plurks[id]));
  } else {
    return [];
  }
};

export const currentUserUnread = state => {
  const unreadPlurks = state.plurks.unreadPlurks[state.selectedUserId] || {};

  if (typeof unreadPlurks !== 'undefined' &&
      typeof unreadPlurks[state.route.query.filter || 'all'] !== 'undefined') {
    const plurkIds = unreadPlurks[state.route.query.filter || 'all'] || [];
    return postedDateTagger(plurkIds.map(id => state.plurks.plurks[id]));
  } else {
    return [];
  }
};
