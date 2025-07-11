import { useEffect, useState } from "react";
import _ from 'lodash';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

type Shelf = {
  id: string;
  content: string;
};

function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [shelves, setShelves] = useState<Shelf[]>([
    { id: "shelf-1", content: "Shelf 1" },
    { id: "shelf-2", content: "Shelf 2" },
    { id: "shelf-3", content: "Shelf 3" },
    { id: "shelf-4", content: "Shelf 4" },
  ]);

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

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(shelves);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setShelves(reordered);
  };

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

      <div className="cabinet-container">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="cabinet">
            {(provided) => (
              <div
                className="cabinet"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {shelves.map((shelf, index) => (
                  <Draggable key={shelf.id} draggableId={shelf.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`shelf ${snapshot.isDragging ? "dragging" : ""}`}
                      >
                        {shelf.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="button-container">
        <button className="search-button" onClick={() => window.location.href = "/search"}>
          Go To User Search
        </button>
      </div>
    </>
  );
}

export default Home;
