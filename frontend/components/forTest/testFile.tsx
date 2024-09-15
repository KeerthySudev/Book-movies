"use client";

import styles from './movies.module.css';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
// import { fetchMovies, searchGenre, searchThriller, searchMatinee, showMovie } from './movieData';

const ShowMovies = () => {
  const router = useRouter();
  const [movies, setMovies] = useState<any>(null);
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const[genre, setGenre] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const BASE_URL = 'http://localhost:5000';
  

  // Fetch theatres from the backend using fetch
  useEffect(() => {
    console.log('searchPerformed has changed:', searchPerformed);
      if(searchPerformed == false){
        const fetchMovies = async () => {
          try {
            const response = await fetch("http://localhost:5000/api/admin/showMovies");
            
            console.log(`Response status: ${response.status}`);
            
            if (response.ok) {
              const data = await response.json();
              console.log('Fetched user data:', data);
              setMovies(data);

              const allLanguages = data.map((movie: any) => movie.language);
          const distinctLanguages = Array.from(new Set(allLanguages)) as string[]; // Cast to string[]
          setLanguages(distinctLanguages);
            } else {
              console.error('Response error:', await response.text());
            }
          } catch (error) {
      
            console.error('Fetch error:', error);
          } 
        };
  fetchMovies();
      }
      
  }, [searchPerformed]);

  const searchGenre = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/user/searchGenre?genre=${encodeURIComponent(genre)}`, {
        method: "GET",
      });
      
      console.log(`Response status: ${response.status}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched genre data:', data);
        setMovies(data);
        console.log(data);
        console.log(searchPerformed)
        setSearchPerformed(true);
        console.log(searchPerformed)
      } else {
        console.error('Response error:', await response.text());
      }
    } catch (error) {

      console.error('Fetch error:', error);
    } 
  };
  

  
  const showMovie = (id: string) => {
    router.push(`/user/getMovie/${id}`);
  };

  const searchThriller = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/user/searchThriller`, {
        method: "GET",
      });
      
      console.log(`Response status: ${response.status}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched genre data:', data);
        setMovies(data);
        setSearchPerformed(true);
      } else {
        console.error('Response error:', await response.text());
      }
    } catch (error) {

      console.error('Fetch error:', error);
    } 
  };
  
  const searchMatinee = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/user/searchMatinee`, {
        method: "GET",
      });
      
      console.log(`Response status: ${response.status}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched genre data:', data);
        setMovies(data);
        setSearchPerformed(true);
      } else {
        console.error('Response error:', await response.text());
      }
    } catch (error) {

      console.error('Fetch error:', error);
    } 
  };

  // Toggle the selected language in the array
  const toggleLanguageSelection = (language: string) => {
    setSelectedLanguages(prevSelected => {
      if (prevSelected.includes(language)) {
        // If the language is already selected, remove it
        return prevSelected.filter((lang) => lang !== language);
      } else {
        // If it's not selected, add it
        return [...prevSelected, language];
      }
    });
    if (!searchPerformed) {
      setSearchPerformed(true);
    }
  };
  const filterMovies = () => {
    if (selectedLanguages.length === 0) {
      return movies; // If no language is selected, show all movies
    }
    return movies.filter(movie => selectedLanguages.includes(movie.language));
  };

  const filteredMovies = filterMovies();

  // Filter movies based on selected languages
  const resetFilters = () => {
    setSearchPerformed(true);
    setSelectedLanguages([]);
  };

 


  return (
    <>
    <div className={styles.container}>
    <div className={styles.navbar}>
<div className={styles.logo}>
  <img src='/images/movie-ticket-transparent-5.png' alt='logo'></img>
  <h4>Book Movies</h4>
  
</div>
<div className={styles.searchbar}>
<form onSubmit={searchGenre} className={styles.formContainer}>
          <div>
              <input
                  type="text"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  placeholder="Search genre"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      searchGenre(e); // Trigger the search function
                    }
                  }}
                  required />
                  
          </div>
      </form>
  </div>
  <div className={styles.signin}>
    <button>Sign In</button>
  </div>
</div>
<div className={styles.content}>
<div className={styles.filters}>
  <h2>Filters</h2>
  <div className={styles.filterGroup}>
<h4>Genres</h4>
<button onClick={searchThriller}>Thriller</button>
<h4>Showtimes</h4>
<button onClick={searchMatinee}>1 pm</button>
{/* <button onClick={() => setSearchPerformed(false)} >Reset</button> */}
<button onClick={resetFilters}>Reset</button>

  </div>
  
    
    
  </div>
  <div className={styles.movies}>
  <h2>Movies</h2>
  <div className={styles.searchButtons}>
        {languages.map((language) => (
          <button 
            key={language} 
            onClick={() => toggleLanguageSelection(language)}
            className={`${styles.searchButton} ${selectedLanguages.includes(language) ? styles.selected : ''}`}
          >
            {language}
          </button>
        ))}
      </div>
  <div className={styles.cardContainer}>
            {filteredMovies ? (
                filteredMovies.map((movie) => (
                    <div key={movie._id} className={styles.card}
                     onClick={() => showMovie(movie._id)}
                     >
                       
                        <img 
                            src={`${BASE_URL}${movie.posterUrl}`}
                            alt={movie.title} 
                            className={styles.poster}
                        />
                       
                        <div className={styles.cardContent}>
                            <h3>{movie.title}</h3>
                            <p>{movie.genre}</p>
                            <p> {movie.language}</p>
                            <div className={styles.buttonGroup}>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No movies available.</p>
            )}
        </div> 
  </div>
</div>
    </div>
    
       
        </>
  );
};

export default ShowMovies;
