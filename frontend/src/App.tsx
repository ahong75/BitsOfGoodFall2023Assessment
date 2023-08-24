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
      <td className="font-bold px-4 py-2">{volunteer.name}</td>
      <td className="px-4 py-2">{volunteer.avatar}</td>
      <td className="px-4 py-2">{volunteer.hero_project}</td>
      <td className="px-4 py-2">{volunteer.notes}</td>
      <td className="px-4 py-2">{volunteer.email}</td>
      <td className="px-4 py-2">{volunteer.phone}</td>
      <td className="px-4 py-2">{volunteer.rating}</td>
      <td className="px-4 py-2">
        {volunteer.status ? (
          <span className="bg-green-500 text-white px-2 py-1 rounded-full">
            Active
          </span>
        ) : (
          <span className="bg-red-500 text-white px-2 py-1 rounded-full">
            Inactive
          </span>
        )}
      </td>
    </tr>
  )
}

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
    <div className="container mx-auto mt-8">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Avatar</th>
            <th className="px-4 py-2">Hero Project</th>
            <th className="px-4 py-2">Notes</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Rating</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map(volunteer => (
            <TableEntry key={volunteer.id} volunteer={volunteer} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App;

