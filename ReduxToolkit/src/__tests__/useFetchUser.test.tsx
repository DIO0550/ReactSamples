/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import { rest } from 'msw';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import useFetchUser from '../CustomHook/useFetchUser';
import { UserRequest, UserResponse } from '../types/user';
import { store } from '../state/store';

describe('fetchUser', () => {
  describe('OK fetchUser', () => {
    it('fetchUser', async () => {
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
      const req: UserRequest = {
        id: 'dskfysuerhfsf',
        serial: 'AAAAA-1111222333444',
      };
      const TestComponent: React.FC = () => {
        const { user, fetchUser, reset } = useFetchUser();
        const onClick = async () => {
          reset();
          await fetchUser(req);
        };
        return (
          <div>
            <div title="user-id">{user.id}</div>
            <div title="user-name">{user.name}</div>
            <div title="user-age">{user.age}</div>
            <button title="start-call" type="button" onClick={async () => { return onClick(); }}>テスト</button>
          </div>
        );
      };
      const { getByTitle } = render(
        <Provider store={store}>
          <TestComponent />
        </Provider>,
      );
      await fireEvent.click(getByTitle('start-call'));
      await waitFor(() => {
        const userId = getByTitle('user-id');
        expect(userId.textContent).toEqual(response.id);

        const userName = getByTitle('user-name');
        expect(userName.textContent).toEqual(response.name);

        const userAge = getByTitle('user-age');
        expect(Number(userAge.textContent)).toEqual(response.age);
        mockServer.close();
      });
    });

    it('fetchUser', async () => {
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
      const req: UserRequest = {
        id: 'dskfysuerhfsf',
        serial: 'AAAAA-1111222333444',
      };
      const TestComponent: React.FC = () => {
        const { user, fetchUser, reset } = useFetchUser();
        const onClick = async () => {
          reset();
          await fetchUser(req);
        };
        return (
          <div>
            <div title="user-id">{user.id}</div>
            <div title="user-name">{user.name}</div>
            <div title="user-age">{user.age}</div>
            <button title="start-call" type="button" onClick={async () => { return onClick(); }}>テスト</button>
          </div>
        );
      };
      const { getByTitle } = render(
        <Provider store={store}>
          <TestComponent />
        </Provider>,
      );
      await fireEvent.click(getByTitle('start-call'));
      await waitFor(() => {
        const userId = getByTitle('user-id');
        expect(userId.textContent).toEqual(response.id);

        const userName = getByTitle('user-name');
        expect(userName.textContent).toEqual(response.name);

        const userAge = getByTitle('user-age');
        expect(Number(userAge.textContent)).toEqual(response.age);

        mockServer.close();
      });
    });
  });
});
