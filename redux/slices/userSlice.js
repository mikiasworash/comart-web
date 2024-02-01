import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vendors: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setVendors: (state, action) => {
      state.vendors = action.payload;
    },
  },
});

export const { setVendors } = userSlice.actions;

export default userSlice.reducer;
