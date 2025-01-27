import React, {useState, useEffect} from 'react'

const UserForm = ({onSave, editingUser, onCancel}) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  })

  useEffect(() => {
    if (editingUser) {
      setUser(editingUser)
    } else {
      setUser({firstName: '', lastName: '', email: '', department: ''})
    }
  }, [editingUser])

  const handleChange = e => {
    const {name, value} = e.target
    setUser({...user, [name]: value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSave(user)
    setUser({firstName: '', lastName: '', email: '', department: ''})
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={user.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={user.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={user.department}
        onChange={handleChange}
        required
      />
      <button type="submit">{editingUser ? 'Update' : 'Add'}</button>
      {editingUser && <button onClick={onCancel}>Cancel</button>}
    </form>
  )
}

export default UserForm
