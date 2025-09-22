import React, { useEffect, useState } from "react";
import { getUsers } from "../api/users";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(data => {
      if (data) setUsers(data);
    });
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;