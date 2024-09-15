"use client";

import React, { useState, useEffect } from "react";

const AddShowForm = () => {
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [movie, setMovie] = useState('');
  const [theatre, setTheatre] = useState('');
  const [showtime, setTime] = useState('');
  const [price, setPrice] = useState(0);
  const [rows, setRows] = useState(0);
  const [seatPerRows, setSeatPerRows] = useState(0);
  

  // Fetch theatres from the backend using fetch
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/showTheatres")
      .then((response) => response.json())
      .then((data) => setTheatres(data))
      .catch((error) => console.error("Error fetching theatres:", error));

    fetch("http://localhost:5000/api/admin/showMovies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));

      const fetchShows = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/admin/showTimes");
          
          console.log(`Response status: ${response.status}`);
          
          if (response.ok) {
            const data = await response.json();
            console.log('Fetched user data:', data);
            setShows(data);
          } else {
            console.error('Response error:', await response.text());
          }
        } catch (error) {
    
          console.error('Fetch error:', error);
        } 
      };
      fetchShows();
      
  }, []);

//   const handleTheatreSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedOptions = Array.from(
//       e.target.selectedOptions,
//       (option) => option.value
//     );
//     setSelectedTheatres(selectedOptions);
//   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      movie,
      theatre,
      showtime,
      price,
      rows,
      seatPerRows,
  };

    try {
      console.log(formData)
      const response = await fetch("http://localhost:5000/api/admin/shows", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      });

      const data = await response.json();
    console.log(data); 

      if (response.ok) {
        alert("Show added successfully");
        setMovie("");
        setTheatre("");
        setTime("");
        setPrice(0);
        setRows(0);
        setSeatPerRows(0);
      } else {
        alert("Failed to add show");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the movie");
    }
  };

  return (
    <><form onSubmit={handleSubmit}>
        <div>
              <label>Select Movie:</label>
              <select
                  value={movie}
                  onChange={(e) => setMovie(e.target.value)}
              >
                <option value="" disabled>Select a movie</option>
                  {movies.map((movie) => (
                      <option key={movie._id} value={movie._id}>
                          {movie.title}
                      </option>
                  ))}
              </select>
          </div>
          <div>
              <label>Select Theatre:</label>
              <select
                  value={theatre}
                  onChange={(e) => setTheatre(e.target.value)}
              >
                <option value="" disabled>Select a theatre</option>
                  {theatres.map((theatre) => (
                      <option key={theatre._id} value={theatre._id}>
                          {theatre.name} - {theatre.location}
                      </option>
                  ))}
              </select>
          </div>
          <div>
              <label>Time:</label>
              <input
                  type="time"
                  value={showtime}
                  onChange={(e) => setTime(e.target.value)}
                  required />
          </div>
          <div>
              <label>Price:</label>
              <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required />
          </div>
          <div>
              <label>Rows:</label>
              <input
                  type="number"
                  value={rows}
                  onChange={(e) => setRows(e.target.value)}
                  required />
          </div>
          <div>
              <label>Seats per row:</label>
              <input
                  type="number"
                  value={seatPerRows}
                  onChange={(e) => setSeatPerRows(e.target.value)}
                  required />
          </div>
          <button type="submit">Add Show</button>
      </form>
      
      <div>
            {shows ? (
                <table>
                    <thead>
                        <tr>
                            <th>Movie</th>
                            <th>Theatre</th>
                            <th>Time</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {shows.map((show) => (
                            <tr key={show._id}>
                                <td>{show.movie.title}</td>
                                <td>{show.theatre.name}</td>
                                <td>{show.showtime}</td>
                                <td>{show.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No shows available.</p>
            )}
        </div>
        </>
  );
};

export default AddShowForm;
