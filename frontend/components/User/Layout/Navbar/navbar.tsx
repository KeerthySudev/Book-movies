"use client";

import styles from './navbar.module.css';
import React, { useState, useEffect, ReactHTMLElement } from "react";
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  // const[word, setWord] = useState('');

  const handleClick = () => {
    window.location.href = 'http://localhost:5000/api/home/google'; // Redirect to Express server for Google sign-in
  };

  // const searchMovie = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/user/searchMovie?word=${encodeURIComponent(word)}`, {
  //       method: "GET",
  //     });
      
  //     console.log(`Response status: ${response.status}`);
      
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log('Fetched genre data:', data);
  //       setMovies(data);
  //       console.log(data);
  //       console.log(searchPerformed)
  //       setSearchPerformed(true);
  //       console.log(searchPerformed)
  //     } else {
  //       console.error('Response error:', await response.text());
  //     }
  //   } catch (error) {

  //     console.error('Fetch error:', error);
  //   } 
  // };

  return (
    <>
    <div>
    <div className={styles.navbar}>
<div className={styles.logo}>
  <img src='/images/movie-ticket-transparent-5.png' alt='logo'></img>
  <h4>Book Movies</h4>
  
</div>
{/* <div className={styles.searchbar}>
<form onSubmit={searchMovie} className={styles.formContainer}>
          <div>
              <input
                  type="text"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  placeholder="Search genre"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      searchMovie(e); // Trigger the search function
                    }
                  }}
                  required />
                  
          </div>
      </form>
  </div> */}
  <div className={styles.signin}>
    <button onClick={handleClick}>Sign In</button>
  </div>
</div>
    </div>
    
       
        </>
  );
};

export default Navbar;
