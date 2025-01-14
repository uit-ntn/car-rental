import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" style={styles.link}>
        Go Back Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: '6rem',
    color: '#ff6f61',
    margin: '0',
  },
  message: {
    fontSize: '1.5rem',
    color: '#343a40',
    margin: '20px 0',
  },
  link: {
    textDecoration: 'none',
    color: '#ffffff',
    backgroundColor: '#007bff',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '1rem',
  },
};

export default NotFound;
