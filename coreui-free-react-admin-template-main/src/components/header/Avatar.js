import React from 'react';
import { UserContext } from 'src';

const Avatar = () => {
    const { user } = React.useContext(UserContext);
  // Get the first letter of the username (assuming the username is not empty)
  const firstLetter = user.firstName.charAt(0).toUpperCase();

  // CSS styles for the circular avatar
  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff', // You can set your desired background color here
    color: '#fff', // You can set the text color here
    fontSize: '18px',
    fontWeight: 'bold',
  };

  return <div style={avatarStyle}>{firstLetter}</div>;
};

export default Avatar;
