import { FC, useEffect, useState } from 'react';
import { getRegisteredUsers, UserListDataInterface } from '../../services/user';

const UserList: FC = () => {
  const [users, setUsers] = useState<UserListDataInterface[] | null>(null);

  useEffect(() => {
    getRegisteredUsers()
      .then(setUsers)
      .catch(() => setUsers([]));
  }, [])

  return (
    <div>
      <p><strong>List of users registered in the platform</strong></p>

      {users && users.length === 0 && (
        <p>There are no users or the request failed.</p>
      )}

      {users === null && (
        <p>Loading users...</p>
      )}

      {users && users.length > 0 && (
        <ul>
          {users.map(user => <li key={user.username}>{user.username}</li>)}
        </ul>
      )}
    </div>
  )
}

export default UserList;
