import { createSlice } from "@reduxjs/toolkit";

const busSlice = createSlice({
  name: "bus",
  initialState: {
    buses: [],
    selectedBus: null,
  },
  reducers: {
    setBuses(state, action) {
      state.buses = Array.isArray(action.payload) ? action.payload : [];
    },
    setSelectedBus(state, action) {
      state.selectedBus = action.payload || null;
    },
    clearSelectedBus(state) {
      state.selectedBus = null;
    },
  },
});

export const { setBuses, setSelectedBus, clearSelectedBus } = busSlice.actions;
export default busSlice.reducer;