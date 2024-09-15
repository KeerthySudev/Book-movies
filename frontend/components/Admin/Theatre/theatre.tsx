'use client'

import React, { useState, useEffect } from 'react';

const TheatreForm = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [seatingCapacity, setSeatingCapacity] = useState(0);
    const [theatres, setTheatres] = useState([]);

      // Fetch theatres from the backend using fetch
  useEffect(() => {

      const fetchTheatres = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/admin/showTheatres");
          
          console.log(`Response status: ${response.status}`);
          
          if (response.ok) {
            const data = await response.json();
            console.log('Fetched user data:', data);
            setTheatres(data);
          } else {
            console.error('Response error:', await response.text());
          }
        } catch (error) {
    
          console.error('Fetch error:', error);
        } 
      };
      fetchTheatres();
      
  }, []); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const theatreData = {
            name,
            location,
            seatingCapacity,
        };

        try {
            const response = await fetch('http://localhost:5000/api/admin/theatres', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(theatreData),
            });

            if (response.ok) {
                alert('Theatre created successfully');
                setName('');
                setLocation('');
                setSeatingCapacity(0);
            } else {
                alert('Failed to create theatre');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the theatre');
        }
    };

    return (
        <><form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Theatre Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required />
            </div>
            <div>
                <label htmlFor="location">Location:</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required />
            </div>
            <div>
                <label htmlFor="seatingCapacity">Seating Capacity:</label>
                <input
                    type="number"
                    id="seatingCapacity"
                    value={seatingCapacity}
                    onChange={(e) => setSeatingCapacity(Number(e.target.value))}
                    required />
            </div>
            <button type="submit">Create Theatre</button>
        </form><div>
                {theatres ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Seating capacity</th>
                            </tr>
                        </thead>
                        <tbody>

                            {theatres.map((theatre) => (
                                <tr key={theatre._id}>
                                    <td>{theatre.name}</td>
                                    <td>{theatre.location}</td>
                                    <td>{theatre.seatingCapacity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No theatres available.</p>
                )}
            </div></>
    );
};

export default TheatreForm;
