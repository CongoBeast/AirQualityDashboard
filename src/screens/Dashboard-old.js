import React, { useEffect, useRef, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "../components/SideBar";
import { Card, Container, Image } from "react-bootstrap";
import StatsCard from "../components/statsCard";
import IconBadge from "../components/iconBadge";
import { DLRdata } from "../dummyData/DLRDummy";
import DailyLoadingReport from "../components/DailyLoadingReport";
import { Ring } from "../components/statsring";
import { GiDustCloud } from "react-icons/gi";
import { MdOutlineAir } from "react-icons/md";
import ChartCard from "../components/chartCard.js";
import dummyDataLunch from "../dummyDataLunch.js";
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import AppMap from "../map/index.js";
import { Dropdown } from "react-bootstrap";
import sensorData from "../dummyData/SensorData.js";
import { getData, requestData } from "../components/realData.js";
import { sendData } from "../components/getRealData.js";
import { useNavigate } from "react-router-dom";
import { useSensorData } from "../contextProviders/sensorDataContext.js";

function Dashboard() {
  const {
    data,
    selectedSensor,
    selectedPeriod,
    setSelectedSensor,
    setSelectedPeriod,
    fetchData,
  } = useSensorData();
  const navigate = useNavigate();
  const [temp, setTemp] = useState(0);
  const [hum, setHum] = useState(0);
  const [sVoc, setVoc] = useState(0);
  const [sNox, setNox] = useState(0);
  const [sPm1p0, setPm1p0] = useState(0);
  const [sPm2p5, setPm2p5] = useState(0);
  useEffect(() => {
    fetchData();
    if (
      data !== null &&
      data.Temperature !== null &&
      data.Temperature.datasets !== null
    ) {
      console.log(data);
      // console.log(data.VOC.datasets[0].data[2].y);
      
      setNox(data.Nox.datasets[0].data[2].y);
      setVoc(data.Voc.datasets[0].data[2].y);
      setTemp(data.Temperature.datasets[0].data[2].y);
      setHum(data.Humidity.datasets[0].data[2].y);
      setPm1p0(data.Pm1p0.datasets[0].data[2].y);
      setPm2p5(data.Pm2p5.datasets[0].data[2].y);
      handleCardClick();
    }
  }, [selectedSensor, selectedPeriod]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedSensor, selectedPeriod]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCardClick();
    }, 2000);

    if (
      data !== null &&
      data.Temperature !== null &&
      data.Temperature.datasets !== null
    ) {
      console.log(data.Temperature.datasets[0].data[2].y);
      setTemp(data.Temperature.datasets[0].data[2].y);
      setHum(data.Humidity.datasets[0].data[2].y);
    }

    return () => clearTimeout(timer);
  }, [selectedSensor, selectedPeriod]);

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 1,
      },
    },
    maintainAspectRatio: false,
  };

  var noxValue = sNox;
  var pm1Value = sPm1p0;
  var pm2Value = sPm2p5;

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    handleCardClick();
  };

  const handleSensorSelect = (sensorId) => {
    setSelectedSensor(sensorId);
    // onSelectSensor(sensorId);
  };

  const handleCardClick = () => {
    // After setting the selectedType, navigate to the analytics page
    navigate("/dashboard");
  };

  const getStationNameBySensorId = (sensorId) => {
    // Loop through each sensor data object
    for (const sensor of sensorData) {
      // Check if the current sensor's ID matches the provided sensorId
      if (sensor["Sensor ID"] === sensorId) {
        // If there's a match, return the station name
        return sensor["Station Name"];
      }
    }
  
    // If no match is found, return undefined
    return undefined;
  };

  return (
    <div
      className="d-flex flex-row"
      style={{
        minHeight: "100vh",
        maxHeight: "100vh",
        background: "#f2f2f2",
        overflowY: "hidden",
      }}>
      <Sidebar />
      <Container
        fluid
        className="p-4"
        style={{
          maxHeight: "100vh",
          overflowY: "scroll",
        }}>
        <div className="d-flex flex-row justify-content-between">
          <Dropdown onSelect={(eventKey) => handleSensorSelect(eventKey)}>
            <Dropdown.Toggle
              id="dropdown-basic"
              style={{
                background: "#2068F3",
                border: "none",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}>
              {  getStationNameBySensorId(selectedSensor)   || "Select Sensor" }
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ maxHeight: "80vh", overflowY: "scroll" }}>
              {sensorData.map((sensor, index) => (
                <Dropdown.Item key={index} eventKey={ sensor["Sensor ID"]}>
                  {sensor["Station Name"]}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown onSelect={(eventKey) => handlePeriodSelect(eventKey)}>
            <Dropdown.Toggle
              id="dropdown-basic"
              style={{
                background: "#2068F3",
                border: "none",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}>
              {selectedPeriod}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="Today">Today</Dropdown.Item>
              <Dropdown.Item eventKey="LastDay">Last Day</Dropdown.Item>
              <Dropdown.Item eventKey="7Days">7 Days</Dropdown.Item>
              <Dropdown.Item eventKey="30Days">30 Days</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Row>
          <Col md={8}>
            <Card
              className="mt-1 p-2"
              style={{
                border: "none",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                width: "98%",
              }}>
              <Row>
                <h6
                  style={{
                    color: "#666",
                    fontWeight: "bold",
                    fontSize: "10px",
                    fontFamily: "Helvetica Neue",
                    textAlign: "left",
                  }}>
                  NEAR YOU
                </h6>

                <Row>
                  <Col md={3}>
                    {" "}
                    <div style={{ cursor: "pointer" }}>
                      <StatsCard
                        title="NOX"
                        value={noxValue} // REPLACE WITH LIVE DATA
                        wrappedComponent={
                          <IconBadge
                            icon={<MdOutlineAir />}
                            backgroundColor="rgba(255, 216, 0, 0.3)"
                            color="#990033"
                            iconSize={16}
                          />
                        }
                      />
                    </div>
                  </Col>

                  <Col md={3}>
                    {" "}
                    <StatsCard
                      title="VOC"
                      value={sVoc}
                      wrappedComponent={
                        <IconBadge
                          icon={<GiDustCloud />}
                          backgroundColor="rgba(0, 0, 255, 0.3)"
                          color="#00f"
                          iconSize={15}
                        />
                      }
                    />
                  </Col>
                  <Col md={3}>
                    {" "}
                    <StatsCard
                      title="PM 1.0"
                      value={`${sPm1p0}`}
                      wrappedComponent={
                        <IconBadge
                          icon={<MdOutlineAir />}
                          backgroundColor="rgba(0, 255, 0, 0.3)"
                          color="#08A045"
                          iconSize={19}
                        />
                      }
                    />
                  </Col>
                  <Col md={3}>
                    {" "}
                    <StatsCard
                      title="PM 2.5"
                      value={`${sPm2p5}`}
                      wrappedComponent={
                        <IconBadge
                          icon={<MdOutlineAir />}
                          backgroundColor="rgba(255, 87, 51, 0.5)"
                          color="#F00"
                          iconSize={15}
                        />
                      }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-1" style={{ height: "370px" }}>
                    <AppMap selSensor={selectedSensor} />
                  </Col>
                </Row>
              </Row>
            </Card>
          </Col>
          <Col sm={4}>
            <Row style={{ paddingRight: "0.8rem" }}>
              <Card
                className="mt-1 "
                style={{
                  border: "none",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                }}>
                <h6
                  style={{
                    color: "#666",
                    fontWeight: "bold",
                    fontSize: "10px",
                    fontFamily: "Helvetica Neue",
                    textAlign: "left",
                  }}></h6>

                {data ? (
                  <ChartCard
                    data={data.Pm4p0}
                    options={chartOptions}
                    title="PM4.0 (μg/m³)"
                  />
                ) : null}
              </Card>
            </Row>
            <Row style={{ paddingRight: "0.8rem" }}>
              <Card
                className="mt-2 "
                style={{
                  border: "none",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  paddingBottom: "0.2rem",
                }}>
                {data ? (
                  <ChartCard
                    data={data.Pm10p0}
                    options={chartOptions}
                    title="PM10.0 (μg/m³)"
                  />
                ) : null}
              </Card>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card
              className="mt-2 "
              style={{
                border: "none",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                paddingBottom: "0.2rem",
              }}>
              {data ? (
                <ChartCard
                  data={data.Pm1p0}
                  options={chartOptions}
                  title="PM1.0 (μg/m³)"
                />
              ) : null}
            </Card>
          </Col>
          <Col md={6}>
            <Card
              className="mt-2 "
              style={{
                border: "none",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                paddingBottom: "0.2rem",
              }}>
              {data ? (
                <ChartCard
                  data={data.Pm2p5}
                  options={chartOptions}
                  title="PM2.5 (μg/m³)"
                />
              ) : null}
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Card
              className="mt-2 "
              style={{
                border: "none",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                paddingBottom: "0.2rem",
              }}>
              {data ? (
                <ChartCard
                  data={data.Temperature}
                  options={chartOptions}
                  title="Temperature (°C)"
                />
              ) : null}
            </Card>
          </Col>
          <Col md={6}>
            <Card
              className="mt-2 "
              style={{
                border: "none",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                paddingBottom: "0.2rem",
              }}>
              {data ? (
                <ChartCard
                  data={data.Humidity}
                  options={chartOptions}
                  title="Humidity (%)"
                />
              ) : null}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
