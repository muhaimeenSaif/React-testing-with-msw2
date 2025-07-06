import { useEffect, useState } from "react";
import _ from 'lodash';

function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigateToUserSearch = () => {
    window.location.href = "/search";
  };

  if (loading) return (
      <div className="loading-container"><p>Loading...</p></div>
  );
  
  if (error) return (
      <div className="error-container"><p>Error: {error}</p></div>
  );

  return (
    <>{data && (
      <div className="data-display">
        <h2>{(data as any).title}</h2>
        <p>{(data as any).body}</p>
      </div>
    )}
    <div className="button-container">
      <button 
        className="search-button" 
        onClick={navigateToUserSearch}
      >
        Go To User Search
      </button>
    </div>
    </>
  );
}

export default Home;