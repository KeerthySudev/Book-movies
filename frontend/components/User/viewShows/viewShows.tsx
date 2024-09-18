
"use client";

import styles from './viewShows.module.css';
import React, { useState, useEffect } from "react";
import { useParams } from 'next/navigation'; 
import { useRouter } from 'next/navigation';

const ViewShows = () => {
  const [shows, setShows] = useState([]);
  const router = useRouter();
  const params = useParams();
  const { id } = params;


  // Fetch theatres from the backend using fetch
  useEffect(() => {

      const fetchShows = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/user/getShows?id=${encodeURIComponent(id)}`);
          
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
  const handleButtonClick = (id: string) => {
    router.push(`/user/seatings/${id}`);
  };


  return (
    <>
      
      <div>
            
            {shows ? (
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Theatre</th>
              <th className={styles.th}>Time</th>
              <th className={styles.th}>Price</th>
            </tr>
          </thead>
          <tbody>
            {shows.map((show) => (
              <tr key={show._id} className={styles.tbodyRow}>
                <td className={styles.tbodyCell}>{show.theatre.name}</td>
                <td className={styles.tbodyCell}>
                  <button className={styles.button} onClick={() => handleButtonClick(show._id)}>
                    {show.showtime}
                  </button>
                </td>
                <td className={styles.tbodyCell}>{show.price}</td>
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

export default ViewShows;
