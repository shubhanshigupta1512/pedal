import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: {
    startTime: "00:00",
    endTime: "00:00",
    landmark: "nac",
    cycleType: "both",
  },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search.startTime = action.payload.startTime;
      state.search.endTime = action.payload.endTime;
      state.search.landmark = action.payload.landmark;
      state.search.cycleType = action.payload.cycleType;
    },
  },
});

export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;
