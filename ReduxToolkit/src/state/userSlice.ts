/* eslint-disable import/no-unresolved */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// eslint-disable-next-line import/extensions
import { UserResponse, UserRequest, User } from '../types/user';

const API_URL = process.env.REACT_APP_API_DOMAIN;

const initialState: User = {
  id: '',
  name: '',
  age: 0,
};

export const fetchUserAsync = createAsyncThunk<
    UserResponse,
    UserRequest,
    {
      rejectValue: string;
    }
>('fetchUserAsync', async (args: UserRequest, { rejectWithValue }) => {
  try {
    const params = new URLSearchParams();
    params.append('id', args.id);
    params.append('serial', args.serial);
    const res = await axios.post<UserResponse>(`${API_URL ?? ''}/users`, params);
    return res.data;
  } catch (err) {
    return rejectWithValue('エラーが発生しました');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => { return initialState; },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserAsync.fulfilled, (state, action) => {
      if (action.payload.resultCode !== 'OK') {
        return;
      }
      // eslint-disable-next-line no-param-reassign
      state.id = action.payload.id;
      // eslint-disable-next-line no-param-reassign
      state.name = action.payload.name;
      // eslint-disable-next-line no-param-reassign
      state.age = action.payload.age;
    });
  },
});
export { userSlice };
