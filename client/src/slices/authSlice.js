import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload.user;
      localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
