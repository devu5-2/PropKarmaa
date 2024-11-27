import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

const Add = () => {

    const users = {
        fname: "",
        lname: "",
        email: "",
        dateofbirth: "",
        description: ""
    }

    const [user, setUser] = useState(users);
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/api/create", user)
            .then((response) => {
                toast.success(response.data.msg, { position: "top-right" })
                navigate("/")
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="bg-cover bg-center min-h-screen flex justify-center items-center">
            <div className="bg-white bg-opacity-50 p-8 rounded-lg shadow-lg backdrop-blur-sm w-96">
                <Link to={"/"} className="text-white bg-green-500 px-4 py-2 rounded-md shadow-md mb-4 inline-block hover:bg-green-600">Back</Link>
                <h2 className="text-2xl font-semibold text-center underline mb-6">Add New User</h2>
                <form className="space-y-4" onSubmit={submitForm}>
                    <div className="flex flex-col">
                        <label htmlFor="fname" className="mb-2 text-sm font-medium text-gray-700">First Name :</label>
                        <input
                            type="text"
                            onChange={inputHandler}
                            id="fname"
                            name="fname"
                            autoComplete="off"
                            placeholder="First name"
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="lname" className="mb-2 text-sm font-medium text-gray-700">Last Name :</label>
                        <input
                            type="text"
                            onChange={inputHandler}
                            id="lname"
                            name="lname"
                            autoComplete="off"
                            placeholder="Last name"
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-700">Email :</label>
                        <input
                            type="email"
                            onChange={inputHandler}
                            id="email"
                            name="email"
                            autoComplete="off"
                            placeholder="Email"
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="dateofbirth" className="mb-2 text-sm font-medium text-gray-700">Date Of Birth :</label>
                        <input
                            type="date"
                            onChange={inputHandler}
                            id="dateofbirth"
                            name="dateofbirth"
                            autoComplete="off"
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="description" className="mb-2 text-sm font-medium text-gray-700">
                            Description :
                            </label>

                            <textarea
                                name="description"
                                id="description"
                                value={user.description}
                                onChange={inputHandler}
                                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Tell us something about Yourself..!"
                                rows={4}
                                cols={40}
                            />
                    </div>
                    <div className="flex flex-col">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            ADD USER
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Add;
