import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/authContext';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faCamera, faLock, faPhone } from '@fortawesome/free-solid-svg-icons';

function Profile() {
  const [user, setUser] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const { currentUser } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpdateProfile = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
  
        const uploadResponse = await axios.post('http://localhost:3002/users/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        updatedUser.photo = uploadResponse.data.imageUrl;
      }
  
      await axios.put(`http://localhost:3002/users/${currentUser._id}`, updatedUser);
      const response = await axios.get(`http://localhost:3002/users/${currentUser._id}`);
      setUser(response.data);
      setUpdatedUser(response.data);
      Swal.fire('Succès', 'Mise à jour du profil réussie', 'success');
    } catch (error) {
      console.log(error);
      Swal.fire('Erreur', 'Échec de la mise à jour du profil', 'error');
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full p-4">
          <div className="text-center">
            <img className="h-24 w-24 rounded-full mx-auto shadow-md" src={updatedUser.photo || 'https://www.pngall.com/wp-content/uploads/5/User-Profile-F.png'} alt="User Profile" />
            <h2 className="text-lg font-semibold mt-2">{user.FullName || 'User Name'}</h2>
            <p className="text-gray-600 text-sm">{user.email || 'User Email'}</p>
          </div>
          <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="FullName">Name:</label>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="text-gray-700 mr-2" />
              <input
                type="text"
                id="FullName"
                name="FullName"
                value={updatedUser.FullName || ''}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              />
            </div>
          </div>
          <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">Email:</label>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-700 mr-2" />
              <input
                type="text"
                id="email"
                name="email"
                value={updatedUser.email || ''}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              />
            </div>
          </div>
          <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="Phone">Phone:</label>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faPhone} className="text-gray-700 mr-2" />
              <input
                type="text"
                id="Phone"
                name="Phone"
                value={updatedUser.Phone || ''}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              />
            </div>
          </div>
          <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="photo">Photo:</label>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCamera} className="text-gray-700 mr-2" />
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={handleFileChange}
                className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              />
            </div>
          </div>
          <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">Password:</label>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faLock} className="text-gray-700 mr-2" />
              <input
                type="password"
                id="password"
                name="password"
                value={updatedUser.password || ''}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              />
            </div>
          </div>
          <div className="mt-2">
            <button
              onClick={handleUpdateProfile}
              className="bg-brown-500 hover:bg-brown-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full text-sm"
            >
              Modifier
            </button>
          </div>
        </div>
      </div>
 
    </div>
  );
}

export default Profile;
