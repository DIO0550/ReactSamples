/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import axios from 'axios';
import { useState } from 'react';
import { UserRequest, UserResponse } from '../types/user';

const API_URL = process.env.REACT_APP_API_DOMAIN;

export const useGetUser = () => {
  const initState: UserResponse = {
    resultCode: '',
    id: '',
    name: '',
    age: 0,
  };
  const [response, setResponse] = useState(initState);

  const callAPIUser = (req: UserRequest) => {
    const params = new URLSearchParams();
    params.append('id', req.id);
    params.append('serial', req.serial);
    axios.post<UserResponse>(`${API_URL ?? ''}/users`, params)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    response,
    callAPIUser,
  };
};
