import './App.css';
import { useState, useEffect } from 'react';

interface Volunteer {
  name: string;
  avatar: string;
  hero_project: string;
  notes: string;
  email: string;
  phone: string;
  rating: number;
  status: boolean;
  id: number;
}

const TableEntry: React.FC<{ volunteer: Volunteer }> = ({ volunteer }) => {
  return (
    <tr>
      <td>{volunteer.name}</td>
      <td>{volunteer.avatar}</td>
      <td>{volunteer.hero_project}</td>
      <td>{volunteer.notes}</td>
      <td>{volunteer.email}</td>
      <td>{volunteer.phone}</td>
      <td>{volunteer.rating}</td>
      <td>{volunteer.status ? 'Active' : 'Inactive'}</td>
    </tr>
  );
};

function App() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/bog/users')
      .then(response => response.json())
      .then(initialVolunteers => {
        setVolunteers(initialVolunteers);
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Avatar</th>
            <th>Hero Project</th>
            <th>Notes</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Rating</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map(volunteer => (
            <TableEntry key={volunteer.id} volunteer={volunteer} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

