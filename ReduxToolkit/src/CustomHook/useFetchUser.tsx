/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { useSelector } from 'react-redux';
import { fetchUserAsync, userSlice } from '../state/userSlice';
import { RootState, useAppDispatch } from '../state/store';
import { User, UserRequest } from '../types/user';

const useFetchUser = () => {
  const dispatch = useAppDispatch();
  const user = useSelector<RootState, User>((state) => { return state.user; });
  const { reset } = userSlice.actions;
  return {
    user,
    fetchUser: (param: UserRequest) => { return dispatch(fetchUserAsync(param)); },
    reset: () => { return dispatch(reset()); },
  };
};

export default useFetchUser;
