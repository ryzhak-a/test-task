export const state = () => ({
  isDrawerOpen: false,
  shift: null
});

export const mutations = {
  OPEN_DRAWER(state, shift = null) {
    state.isDrawerOpen = true;

    if (shift) {
      state.shift = shift;
    }
  },
  CLOSE_DRAWER(state) {
    state.isDrawerOpen = false;
    state.shift = null;
  }
};
