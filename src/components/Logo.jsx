import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logo({ width = '100px' }) {
  const navigate = useNavigate();

  return (
    <img
      onClick={() => navigate('/home')}
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5SUQQAh8Te6B72-R4fWExrarP2xVGwJBzdQ&s"
      alt="image"
      className="h-12 w-12 rounded-full opacity-70 cursor-pointer transition-opacity hover:opacity-100"
      style={{ width }}
    />
  );
}

export default Logo
