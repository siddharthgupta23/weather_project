import React from "react";

import axios from "axios";
import { useState, useEffect } from "react";

function fetchDataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");
  const apiKey ='Your API KEY';

  const fetchData = async () => {
    if (!city) return;

    setLoading(true);
    setError(null);

    try {
   

      const URL =
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

      const response = await axios.get(URL);
      setData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   if (city) {
  //     fetchData();
  //   }
  // }, [city]);

  return (
    <div>
     
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter the city name"
      />
<button onClick={fetchData}>Get Weather</button>
      {loading &&<p>Loading...</p>}
      {error &&<p>Error:{error}</p>}
      {data &&(
        <div>

          <h2>weather in{data.location.name}</h2>
          <p>{data.current.temp_c}</p>
          <p>{data.current.condition.text}</p>
        </div>
      )}
    </div>
  );
}
export default fetchDataComponent;
