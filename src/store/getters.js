import { postedDateTagger } from 'helpers/plurkHelper';

export const currentUser = state => {
  return state.loginUsers[state.selectedUserId];
};

export const currentUserTimeline = state => {
  const plurkIds = state.plurks.timeline[state.selectedUserId];
  if (typeof plurkIds !== 'undefined') {
    return postedDateTagger(plurkIds.map(id => state.plurks.plurks[id]));
  } else {
    return [];
  }
};
