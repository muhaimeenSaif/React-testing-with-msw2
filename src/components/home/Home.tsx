import { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        if (!response.ok) throw new Error(`Error: ${response.status}`);
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

  if (loading) return <div className="loading-container"><p>Loading...</p></div>;
  if (error) return <div className="error-container"><p>Error: {error}</p></div>;

  return (
    <>
      {data && (
        <div className="data-display">
          <h2>{data.title}</h2>
          <p>{data.body}</p>
        </div>
      )}

      <div className="button-container">
        <button className="search-button" onClick={() => window.location.href = "/search"}>
          Go To User Search
        </button>
      </div>
    </>
  );
}

export default Home;
