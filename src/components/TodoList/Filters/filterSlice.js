import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'filter',
  initialState: {
    status: 'all',
  },
  reducers: {
    filterChange: (state, action) => {
      state.status = action.payload;
    },
  },
});
