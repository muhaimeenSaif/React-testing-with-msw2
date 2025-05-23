import './App.css';
import React, { useEffect, useState } from "react";
import  _ from 'lodash';

function App() {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>API Data</h1>
      {data && (
        <div>
          <h2>{(data as any).title}</h2>
          <p>{(data as any).body}</p>
        </div>
      )}
    </div>
  );
}

export default App;
