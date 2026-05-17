import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    currentBooking: null,
    history: [],
  },
  reducers: {
    setCurrentBooking(state, action) {
      state.currentBooking = action.payload || null;
    },
    setBookingHistory(state, action) {
      state.history = Array.isArray(action.payload) ? action.payload : [];
    },
    clearCurrentBooking(state) {
      state.currentBooking = null;
    },
  },
});

export const { setCurrentBooking, setBookingHistory, clearCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;