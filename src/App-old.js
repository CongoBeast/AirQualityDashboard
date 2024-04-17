import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import FinalMassTicket from "./components/FinalMassTicket";

import OrderDetail from "./components/OrderDetails";
import Invoice from "./screens/Invoice";
import InvoiceDataProvider from "./contextProviders/invoiceContextProvider";
import RateCalculator from "./screens/Calculator";
import Drivers from "./screens/Drivers";
import Trucks from "./screens/Trucks";
import AppMap from "./map/index";
import AnalyticsScreen from "./screens/Analytics";
import { DataTypeProvider } from "./contextProviders/dataTypeContext";
import {
  SensorDataProvider,
  useSensorData,
} from "./contextProviders/sensorDataContext";
import Stations from "./screens/Stations";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <InvoiceDataProvider>
          <DataTypeProvider>
            <SensorDataProvider>
              <Routes>
                <Route path="/" element={<Stations />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/test" element={<AppMap />} />

                <Route path="/analytics" element={<AnalyticsScreen />} />
                <Route path="/stations" element={<Stations />} />
                <Route path="/trucks" element={<AppMap />} />
              </Routes>
            </SensorDataProvider>
          </DataTypeProvider>
        </InvoiceDataProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
