// Profile.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/authContext';

function Profile() {
  const [user, setUser] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [userReservations, setUserReservations] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:3002/users/${currentUser._id}`);
        setUser(userResponse.data);
        setUpdatedUser(userResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentUser._id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put(`http://localhost:3002/users/${currentUser._id}`, updatedUser);
      const response = await axios.get(`http://localhost:3002/users/${currentUser._id}`);
      setUser(response.data);
      setUpdatedUser(response.data);
      alert('Profile updated successfully');
    } catch (error) {
      console.log(error);
      alert('Failed to update profile');
    }
  };

  const getUserReservations = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/reservation/user/${currentUser._id}/withStands`);
      setUserReservations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserReservations();
  }, [currentUser._id]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={updatedUser.name || ''}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={updatedUser.email || ''}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">Photo URL:</label>
          <input
            type="text"
            id="photo"
            name="photo"
            value={updatedUser.photo || ''}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={updatedUser.password || ''}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          onClick={handleUpdateProfile}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Profile
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reservations</h2>
        {userReservations.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {userReservations.map((reservation) => (
              <li key={reservation._id} className="py-4">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-900">{reservation.stand?.StandName}</p>
                    <p className="text-sm text-gray-500">Location: {reservation.stand?.Location}</p>
                  </div>
                  <div>
                    {reservation.acceptation ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Accepté
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        En attente
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reservations found.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
