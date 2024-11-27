import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

const Edit = () => {

  const users = {
    fname: "",
    lname: "",
    email: "",
    dateofbirth: ""
  }

  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(users);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/api/getone/${id}`)
      .then((response) => {
        setUser(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [id])

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/update/${id}`, user)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" })
        navigate("/")
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="bg-cover bg-[url('https://propkarmaa.com/wp-content/uploads/2024/05/website-banner-scaled.jpg')] min-h-screen p-0 m-0">
      <div className="bg-white bg-opacity-50 shadow-lg rounded-lg p-8 w-3/5 mx-auto backdrop-blur-md">
        <Link to={"/"} className="text-white bg-green-500 px-4 py-2 rounded-md shadow-md mb-4 inline-block hover:bg-green-600">Back</Link>
        <h2 className="text-2xl font-semibold text-center underline mb-6">Update User</h2>
        <form className="space-y-4" onSubmit={submitForm}>
          <div className="flex flex-col">
            <label htmlFor="fname" className="mb-2">First name</label>
            <input
              type="text"
              value={user.fname}
              onChange={inputChangeHandler}
              id="fname"
              name="fname"
              autoComplete="off"
              placeholder="First name"
              className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lname" className="mb-2">Last name</label>
            <input
              type="text"
              value={user.lname}
              onChange={inputChangeHandler}
              id="lname"
              name="lname"
              autoComplete="off"
              placeholder="Last name"
              className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2">Email</label>
            <input
              type="email"
              value={user.email}
              onChange={inputChangeHandler}
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Email"
              className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="dateofbirth" className="mb-2">Date Of Birth</label>
            <input
              type="date"
              value={user.dateofbirth}
              onChange={inputChangeHandler}
              id="dateofbirth"
              name="dateofbirth"
              autoComplete="off"
              placeholder="DOB"
              className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-blue-600"
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Edit;
