import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom'

const User = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            const response = await axios.get("http://localhost:8000/api/getall");
            setUsers(response.data);
        }

        fetchData();

    }, [])

    const deleteUser = async (userId) => {
        await axios.delete(`http://localhost:8000/api/delete/${userId}`)
            .then((response) => {
                setUsers((prevUser) => prevUser.filter((user) => user._id !== userId))
                toast.success(response.data.msg, { position: 'top-right' })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="bg-cover bg-[url('https://propkarmaa.com/wp-content/uploads/2024/05/website-banner-scaled.jpg')] min-h-screen p-0 m-0">
            <div className="bg-white bg-opacity-50 shadow-lg rounded-lg p-8 w-3/5 mx-auto backdrop-blur-sm">
                <Link to="/add" className="text-white bg-green-500 px-4 py-2 rounded-md shadow-md mb-4 inline-block hover:bg-green-600">Add User</Link>
                <h1 className="text-3xl font-semibold text-center mb-6 border-2 border-black rounded-md p-2">Registered Users</h1>
                <table className="w-full border-collapse table-auto">
                    <thead>
                        <tr>
                            <th className="bg-blue-800 text-white px-4 py-2">S.No.</th>
                            <th className="bg-blue-800 text-white px-4 py-2">User Name</th>
                            <th className="bg-blue-800 text-white px-4 py-2">User Email</th>
                            <th className="bg-blue-800 text-white px-4 py-2">Date Of Birth</th>
                            <th className="bg-blue-800 text-white px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr key={user._id} className="text-center">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{user.fname} {user.lname}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">{user.dateofbirth}</td>
                                    <td className="px-4 py-2">
                                        <button 
                                            onClick={() => deleteUser(user._id)} 
                                            className="bg-red-500 px-3 py-2 text-white rounded-md shadow-md hover:bg-red-600"
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                        <Link 
                                            to={`/edit/` + user._id} 
                                            className="bg-green-500 px-3 py-2 text-white rounded-md shadow-md mx-2 hover:bg-green-600"
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default User;
