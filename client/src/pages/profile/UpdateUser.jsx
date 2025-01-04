import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setUser, setUserAuthenticated } from '../../app/UserInfo';
import toast from 'react-hot-toast';

const UpdateUser = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    profilePic: user?.profile_pic || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profilePic: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', formData.username);
    data.append('email', formData.email);
    if (formData.profilePic instanceof File) {
      data.append('profile_pic', formData.profilePic);
    }

    try {
      const response = await axios.put('/api/v1/update-user', data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log('User updated:', response.data);
      dispatch(setUser({...response.data.user}));
      dispatch(setUserAuthenticated(true));
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <div className="page-container max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Update Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username Section */}
        <div>
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Edit username"
          />
        </div>

        {/* Email Section */}
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Edit email"
          />
        </div>

        {/* Profile Picture Section */}
        <div>
          <label className="block text-gray-700 mb-2">Profile Picture</label>
          <div className="flex items-center space-x-4">
            <img
              src={formData.profilePic instanceof File ? URL.createObjectURL(formData.profilePic) : formData.profilePic}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <input
              type="file"
              name="profilePic"
              onChange={handleFileChange}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
