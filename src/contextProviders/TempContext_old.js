// TempContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const TempContext = createContext();

const TempProvider = ({ children }) => {
  const [temperatureData, setTemperatureData] = useState([]);

  console.log("stuff")

  useEffect(() => {
    // Fetch temperature data from your backend API using Axios
    console.log("things here")

    const fetchTemperatureData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/sensors/temperature"
        );
        setTemperatureData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching temperature data:", error);
      }
    };

    fetchTemperatureData();
  }, []);

  return (
    <TempContext.Provider value={{ temperatureData }}>
      {children}
    </TempContext.Provider>
  );
};

export { TempContext, TempProvider };
