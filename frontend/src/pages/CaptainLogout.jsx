import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const CaptainLogout = () => {
  const token = localStorage.getItem('captain-token');
  const navigate = useNavigate();

  // Handle logout logic when the button is clicked
  const handleLogout = () => {
    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.removeItem('captain-token');
            navigate('/captain-login'); // Redirect to captain login page
          }
        })
        .catch((error) => {
          console.log('Logout failed:', error);
          navigate('/captain-login'); // Redirect to login page in case of error
        });
    } else {
      navigate('/captain-login'); // If no token, go to login page
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default CaptainLogout;
