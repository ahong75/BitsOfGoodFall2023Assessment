import './App.css';
import { useState, useEffect } from 'react'
import { TableEntry, VolunteerForm} from './components'
import { Volunteer, TableEntryActions } from './types'

function App() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [volunteerFormDisplayMode, setVolunteerFormDisplayMode] = useState("notDisplaying");
  const newVolunteerInitial = {
    name: "",
    avatar: "",
    hero_project: "",
    notes: "",
    email: "",
    phone: "",
    rating: 0,
    status: false,
    id: 0,
  }
  const [volunteerToUpdate, setVolunteerToUpdate] = useState(newVolunteerInitial)

  useEffect(() => {
    fetch('http://localhost:5000/api/bog/users')
      .then(response => response.json())
      .then(initialVolunteers => {
        setVolunteers(initialVolunteers)
      })
      .catch(error => {
        console.error('Error fetching data', error)
      })
  }, [])
  
  const newVolunteerSubmit = (newVolunteer: Volunteer) => {
    const newVolunteerWithId = {...newVolunteer, id: volunteers.length + 1}
    fetch(`http://localhost:5000/api/bog/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newVolunteerWithId),
    })
    .then(response => {
      if (response.ok) {
        setVolunteers([newVolunteerWithId, ...volunteers])
      }
    })
    .catch(error => {
      console.log('Error creating new volunteer', error)
    })
    setVolunteerFormDisplayMode("notDisplaying")
  }

  const updateVolunteerSubmit = (updatedVolunteer: Volunteer) => {
    fetch(`http://localhost:5000/api/bog/users/${updatedVolunteer.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedVolunteer),
    })
    .then(response => {
      if (response.ok) {
        const updatedVolunteers = volunteers.map(volunteer => (
          updatedVolunteer.id === volunteer.id ? updatedVolunteer : volunteer
        ))
        setVolunteers(updatedVolunteers)
      }
    })
    .catch(error => {
      console.error("Error updating volunteer", error)
    })
    setVolunteerFormDisplayMode("notDisplaying")
  }

  const tableEntryActions: TableEntryActions = {
    edit: (volunteerId: number) => {
      setVolunteerFormDisplayMode("updatingVolunteer")
      const newVolunteerToUpdate = volunteers.find(volunteer => volunteer.id === volunteerId)
      if (newVolunteerToUpdate) {
        setVolunteerToUpdate(newVolunteerToUpdate)
      }
    },
    delete: (volunteerId: number) => {
      fetch(`http://localhost:5000/api/bog/users/${volunteerId}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          setVolunteers(volunteers.filter(volunteer => volunteer.id !== volunteerId))
        }
      })
      .catch(error => {
        console.error("Error deleting volunteer", error)
      })
    }
  }
  return (
    <div className="container mx-auto mt-8">
      <button onClick={() => {setVolunteerFormDisplayMode("creatingVolunteer")}}>Add New Volunteer</button>
      {volunteerFormDisplayMode === "creatingVolunteer" && (
        <VolunteerForm handleSubmit={newVolunteerSubmit} initialFormState={newVolunteerInitial}/>
      )}
      {volunteerFormDisplayMode === "updatingVolunteer" && (
        <VolunteerForm handleSubmit={updateVolunteerSubmit} initialFormState={volunteerToUpdate}/>
      )}
      {volunteers.length > 0 ? (
        <table className="min-w-full">
          <thead>
            <tr>
              {Object.keys(volunteers[0]).map(propertyName => (
                <th key={propertyName} className="px-4 py-2">
                  {propertyName}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map(volunteer => (
              <TableEntry key={volunteer.id} volunteer={volunteer} actions={tableEntryActions}/>
            ))}
            
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default App;

