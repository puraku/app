export const currentUser = state => {
  return state.loginUsers[state.selectedUserId];
};
