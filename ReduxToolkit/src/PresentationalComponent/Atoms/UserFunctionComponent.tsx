/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import useFetchUser from '../../CustomHook/useFetchUser';
import { UserRequest } from '../../types/user';

const UserFunctionComponent: React.FC = () => {
  const { user, fetchUser } = useFetchUser();
  const onClick = async () => {
    const req: UserRequest = {
      id: 'fsadfuyeuhcsfs',
      serial: 'AAAAA-1111222233334444',
    };
    fetchUser(req)
      .then(unwrapResult)
      .then((res) => {
        if (res.resultCode !== 'OK') {
          // eslint-disable-next-line no-alert
          alert(`${res.resultCode}`);
        } else {
          // eslint-disable-next-line no-alert
          alert(`${res.resultCode}`);
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-alert
        alert(err);
      });
  };

  return (
    <div>
      <div>user-id:{user.id}</div>
      <div>user-name:{user.name}</div>
      <div>user-aga:{user.age}</div>
      <button type="button" onClick={() => { return onClick(); }}>
        fetchUser
      </button>
    </div>
  );
};

export default UserFunctionComponent;
