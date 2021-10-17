/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useEffect } from 'react';
import { rest } from 'msw';
import { render, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { UserRequest, UserResponse } from '../types/user';
import { useGetUser } from '../CustomHook/useGetUser';

describe('fetchUser', () => {
  describe('OK fetchUser', () => {
    it('fetchUser', async () => {
      const apiResponse: UserResponse = {
        resultCode: 'OK',
        id: '123',
        name: 'Tarou',
        age: 12,
      };
      const handler = [
        rest.post('http://localhost:3030/users', (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json(apiResponse),
          );
        })];
      const mockServer = setupServer(...handler);
      mockServer.listen();
      const req: UserRequest = {
        id: 'dskfysuerhfsf',
        serial: 'AAAAA-1111222333444',
      };
      const TestComponent: React.FC = () => {
        const { response, callAPIUser } = useGetUser();

        useEffect(() => {
          callAPIUser(req);
        }, []);

        return (
          <div>
            <div title="user-id">{response.id}</div>
            <div title="user-name">{response.name}</div>
            <div title="user-age">{response.age}</div>
          </div>
        );
      };
      const { getByTitle } = render(
        <TestComponent />,
      );
      await waitFor(() => {
        const userId = getByTitle('user-id');
        expect(userId.textContent).toEqual(apiResponse.id);

        const userName = getByTitle('user-name');
        expect(userName.textContent).toEqual(apiResponse.name);

        const userAge = getByTitle('user-age');
        expect(Number(userAge.textContent)).toEqual(apiResponse.age);
        mockServer.close();
      });
    });
  });
});
