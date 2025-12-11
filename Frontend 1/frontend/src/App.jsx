import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

const App = () => {
  const [form, setForm] = useState({ Firstname: "", Lastname: "" })
  const [getform, setGetform] = useState([])
  const [editid, setEditid] = useState(null)

  const handlechange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  const handlesumbit = async (event) => {
    event.preventDefault();
    try {
      const formsubmit = await axios.post("http://localhost:3000/api/form/details", form);
      alert(formsubmit.data.message)
      setForm({ Firstname: "", Lastname: "" })
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form");
    }
  }

  const getdatas = async () => {
    try {
      const getdata = await axios.get("http://localhost:3000/api/form/getdetails")
      setGetform(getdata.data.getdatay)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    (async () => {
      await getdatas()
    })()
  }, [form])

  const handleEdit = async (id) => {
    try {
      const editres = await axios.get(`http://localhost:3000/api/form/editdetails/${id}`);
      setForm(editres.data.temp);
      setEditid(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error editing:", error);
      alert("Failed to load data for editing");
    }
  };

  const handleUpdate = async () => {
    try {
      const updateres = await axios.put(`http://localhost:3000/api/form/updatedetails/${editid}`, form);
      setForm({ Firstname: "", Lastname: "" });
      setEditid(null);
      alert("Updated successfully!");
    } catch (error) {
      console.error("Error updating:", error);
      alert("Failed to update");
    }
  };

  const handleDel = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) {
      return;
    }
    try {
      const delres = await axios.put(`http://localhost:3000/api/form/deldetails/${id}`);
      alert(delres.data.msg);
      await getdatas();
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete");
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">CRUD Operations</h1>
        <p className="app-subtitle">Create, Read, Update & Delete with Style</p>
      </header>

      {/* Form Container */}
      <div className="form-container">
        <form onSubmit={handlesumbit}>
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              className="form-input"
              type="text"
              placeholder="Enter your first name"
              value={form.Firstname}
              name="Firstname"
              onChange={handlechange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              className="form-input"
              type="text"
              placeholder="Enter your last name"
              value={form.Lastname}
              name="Lastname"
              onChange={handlechange}
              required
            />
          </div>

          {editid ? (
            <button type="button" className="btn btn-update" onClick={handleUpdate}>
              ✓ Update Entry
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              + Add Entry
            </button>
          )}
        </form>
      </div>

      {/* Data Grid */}
      <div className="data-grid">
        {getform.length > 0 ? (
          getform.map((event) => (
            <div key={event._id} className="data-card">
              <div className="card-content">
                <h2 className="card-title">{event.Firstname}</h2>
                <p className="card-subtitle">{event.Lastname}</p>
              </div>
              <div className="card-actions">
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(event._id)}
                  title="Edit this entry"
                >
                  ✎ Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDel(event._id)}
                  title="Delete this entry"
                >
                  ✕ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <p className="empty-state-text">No entries yet. Create your first one!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App;






