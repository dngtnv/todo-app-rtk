import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
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
export default filterSlice;
