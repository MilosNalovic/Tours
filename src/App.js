import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project";
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState("");

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };
  // const fetchTours = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(url);
  //     const tours = await response.json();
  //     setLoading(false);
  //     setTours(tours);
  //     console.log(tours);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };
  ///The code bellow is fetching data with axios
  const fetchTours = async () => {
    try {
      const response = await axios(url);
      const { data } = response;
      setLoading(false);
      setTours(data);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
    console.log(tours);
  };
  useEffect(() => {
    fetchTours();
  }, []);
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No tours left</h2>
          <button className="btn" onClick={fetchTours}>
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
