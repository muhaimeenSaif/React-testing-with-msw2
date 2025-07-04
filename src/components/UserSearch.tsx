import React, { useEffect, useState, useCallback } from 'react';
import { faker } from '@faker-js/faker';
import { User } from '../typings/User';
import _ from 'lodash';

const generateFakeUsers = (count: number): User[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'Developer',
    avatar: faker.image.avatar(),
  }))
};

const UserSearch: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fakeUsers = generateFakeUsers(20); // Mocking backend api
  
  useEffect(() => {
    setUsers(fakeUsers);
    setFilteredUsers(fakeUsers);
    console.log("Initial users loaded");
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    _.debounce((searchTerm: string) => {
      const query = searchTerm.toLowerCase();
      const result = users.filter((user) =>
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
      setFilteredUsers(result);
      console.log(`Searching for: ${searchTerm}`);
    }, 300), // 300ms delay
    [users]
  );

  useEffect(() => {
    debouncedSearch(search);
    
    // Cleanup function to cancel debounced calls
    return () => {
      debouncedSearch.cancel();
    };
  }, [search, debouncedSearch]);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>User Search</h2>
      <input
        type="text"
        placeholder="Search by name, username, or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ 
          width: '100%', 
          padding: '12px', 
          marginBottom: '20px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          fontSize: '16px'
        }}
      />

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h3>Users ({filteredUsers.length})</h3>
          <ul
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              maxHeight: '400px',
              overflowY: 'auto',
              padding: 0,
              listStyle: 'none',
              margin: 0,
            }}
          >
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                onClick={() => setSelectedUser(user)}
                style={{
                  padding: '12px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                  backgroundColor: selectedUser?.id === user.id ? '#f0f0f0' : 'transparent',
                  transition: 'background-color 0.2s'
                }}
              >
                <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>@{user.username}</div>
              </li>
            ))}
            {filteredUsers.length === 0 && (
              <li style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                No users found
              </li>
            )}
          </ul>
        </div>

        {selectedUser && (
          <div style={{ 
            flex: 1, 
            border: '1px solid #ccc', 
            borderRadius: '5px',
            padding: '20px'
          }}>
            <h3>User Details</h3>
            <img 
              src={selectedUser.avatar} 
              alt="avatar" 
              width="80" 
              style={{ borderRadius: '50%', marginBottom: '15px' }}
            />
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Username:</strong> @{selectedUser.username}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSearch;