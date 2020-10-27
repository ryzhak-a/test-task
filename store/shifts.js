const getItemIndex = (arr, item) => arr.indexOf(item);

export const state = () => ({
  shifts: [],
  vacancy: {
    title: '',
    description: '',
    dates: []
  }
});

export const mutations = {
  CREATE_SHIFT(state, shift) {
    const shiftCopy = { ...shift };

    state.shifts.push(shiftCopy);
  },
  UPDATE_SHIFT(state, shift) {
    const targetShiftIndex = getItemIndex(state.shifts, shift);

    state.shifts[targetShiftIndex] = { ...shift };
  },
  DELETE_SHIFT(state, shift) {
    state.shifts.splice(getItemIndex(state.shifts, shift), 1);
  }
};
