import { useState } from 'react'
import { Volunteer } from '../types'

interface Props {
  handleSubmit: (formData: Volunteer) => void
  initialFormState: Volunteer
}

function VolunteerForm({handleSubmit, initialFormState} : Props) {
  const [formData, setFormData] = useState(initialFormState)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit(formData)
  }
  const handleFileSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target || !e.target.files || e.target.files.length === 0) return
    const selectedFile = e.target.files[0]
    const reader = new FileReader()
    // Define reader onload
    reader.onload = (e => {
      if (!e.target) return
      setFormData({...formData, avatar: e.target.result as string})
    })
    reader.readAsDataURL(selectedFile)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={e => setFormData({...formData, name: e.target.value})}
      />
      <input
        type="file"
        placeholder="Avatar"
        onChange={handleFileSubmit}
      />
      <input
        type="text"
        placeholder="Hero Project"
        value={formData.hero_project}
        onChange={e => setFormData({...formData, hero_project: e.target.value})}
      />
      <input
        type="text"
        placeholder="Notes"
        value={formData.notes}
        onChange={e => setFormData({...formData, notes: e.target.value})}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={e => setFormData({...formData, email: e.target.value})}
      />
      <input
        type="number"
        placeholder="phone"
        value={formData.phone}
        onChange={e => setFormData({...formData, phone: e.target.value})}
      />
      <input
        type="number"
        placeholder="rating"
        value={formData.rating}
        onChange={e => setFormData({...formData, rating: Number(e.target.value)})}
      />
      <input
        type="checkbox"
        placeholder="status"
        checked={formData.status}
        onChange={e => setFormData({...formData, status: e.target.value === "yes"})}
      />
      <button type="submit">Add Volunteer</button>
    </form>
  )
}
export default VolunteerForm
