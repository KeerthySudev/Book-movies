
export const searchMatinee = async (e) => {
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

 export const searchThriller = async (e, setMovies, setSearchPerformed) => {
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