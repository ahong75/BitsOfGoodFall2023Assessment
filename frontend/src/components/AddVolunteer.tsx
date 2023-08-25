import { useState } from 'react'
import { Volunteer } from '../types'

interface Props {
  volunteers: Volunteer[]
  setVolunteers: React.Dispatch<React.SetStateAction<Volunteer[]>>
}

function AddVolunteer({volunteers, setVolunteers} : Props) {
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
  const [newVolunteer, setNewVolunteer] = useState<Volunteer>(newVolunteerInitial)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newVolunteerWithId = {...newVolunteer, id: volunteers.length + 1}
    setVolunteers([...volunteers, newVolunteerWithId])
    setNewVolunteer(newVolunteerInitial)
  }

  const handleFileSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target || !e.target.files || e.target.files.length === 0) return
    const selectedFile = e.target.files[0]
    const reader = new FileReader()
    // Define reader onload
    reader.onload = (e => {
      if (!e.target) return
      setNewVolunteer({...newVolunteer, avatar: e.target.result as string})
    })
    reader.readAsDataURL(selectedFile)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={newVolunteer.name}
        onChange={e => setNewVolunteer({...newVolunteer, name: e.target.value})}
      />
      <input
        type="file"
        placeholder="Avatar"
        onChange={handleFileSubmit}
      />
      <input
        type="text"
        placeholder="Hero Project"
        value={newVolunteer.hero_project}
        onChange={e => setNewVolunteer({...newVolunteer, hero_project: e.target.value})}
      />
      <input
        type="text"
        placeholder="Notes"
        value={newVolunteer.notes}
        onChange={e => setNewVolunteer({...newVolunteer, notes: e.target.value})}
      />
      <input
        type="email"
        placeholder="Email"
        value={newVolunteer.email}
        onChange={e => setNewVolunteer({...newVolunteer, email: e.target.value})}
      />
      <input
        type="number"
        placeholder="phone"
        value={newVolunteer.phone}
        onChange={e => setNewVolunteer({...newVolunteer, phone: e.target.value})}
      />
      <input
        type="number"
        placeholder="rating"
        value={newVolunteer.rating}
        onChange={e => setNewVolunteer({...newVolunteer, rating: Number(e.target.value)})}
      />
      <input
        type="checkbox"
        placeholder="status"
        checked={newVolunteer.status}
        onChange={e => setNewVolunteer({...newVolunteer, status: e.target.value === "yes"})}
      />
      <button type="submit">Add Volunteer</button>
    </form>
  )
}
export default AddVolunteer
