
import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { User } from '../typings/User';


const generateFakeUsers = (count: number): User[] =>
  Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'Developer',
    avatar: faker.image.avatar(),
  }));

const UserSearch: React.FC = () => {
   const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fakeUsers = generateFakeUsers(20);
    setUsers(fakeUsers);
    setFilteredUsers(fakeUsers);
  }, []);

  useEffect(() => {
    const query = search.toLowerCase();
    const result = users.filter((user) =>
        user.name.toLowerCase().includes(query)
      );
      setFilteredUsers(result);
  }, [search, users]);

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>User Search</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />

      <ul
        style={{
          border: '1px solid #ccc',
          borderRadius: '5px',
          maxHeight: '150px',
          overflowY: 'auto',
          padding: 0,
          listStyle: 'none',
          marginBottom: '20px',
        }}
      >
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            onClick={() => setSelectedUser(user)}
            style={{
              padding: '8px',
              cursor: 'pointer',
              borderBottom: '1px solid #eee',
            }}
          >
            {user.name}
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div style={{ borderTop: '1px solid #ccc', paddingTop: '10px' }}>
          <h3>User Details</h3>
          <img src={selectedUser.avatar} alt="avatar" width="60" />
          <p><strong>Name:</strong> {selectedUser.name}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserSearch;