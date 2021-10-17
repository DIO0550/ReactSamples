/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fetchUserAsync, userSlice } from '../state/userSlice';
import { UserRequest, UserResponse } from '../types/user';
import { store } from '../state/store';

describe('AsyncTest', () => {
  describe('CreateAsyncChunk', () => {
    it('OK fetchUser', async () => {
      const response: UserResponse = {
        resultCode: 'OK',
        id: '123',
        name: 'Tarou',
        age: 12,
      };
      const handler = [
        rest.post('http://localhost:3030/users', (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json(response),
          );
        })];
      const mockServer = setupServer(...handler);
      mockServer.listen();
      const request: UserRequest = {
        id: 'fnsduejf',
        serial: 'AAAAA-1111222233334444',
      };
      const res = await store.dispatch(fetchUserAsync(request));
      expect(res.payload).toEqual(response);
      mockServer.close();
    });
  });

  describe('extraReducerTest', () => {
    const initialState = {
      id: '',
      name: '',
      age: 0,
    };
    it('fetchUserAsync.fulfilled OK', () => {
      const action = {
        type: fetchUserAsync.fulfilled.type,
        payload: {
          resultCode: 'OK',
          id: '123',
          name: 'Tarou',
          age: 12,
        },
      };
      const state = userSlice.reducer(initialState, action);
      expect(state.id).toEqual('123');
      expect(state.name).toEqual('Tarou');
      expect(state.age).toEqual(12);
    });

    it('fetchUserAsync.fulfilled ERROR', () => {
      const action = {
        type: fetchUserAsync.fulfilled.type,
        payload: {
          resultCode: 'ERROR',
          id: '',
          name: '',
          age: 0,
        },
      };
      const state = userSlice.reducer(initialState, action);
      expect(state.id).toEqual(initialState.id);
      expect(state.name).toEqual(initialState.name);
      expect(state.age).toEqual(initialState.age);
    });
  });
});
