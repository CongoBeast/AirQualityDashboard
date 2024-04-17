import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import Sidebar from "../components/SideBar";

function RateCalculator() {
  const [travelDistance, setTravelDistance] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [rate, setRate] = useState("");

  function calculateMissingVariable(cost, distance, rate) {
    if (cost && rate && !distance) {
      // Calculate distance
      return cost / rate;
    } else if (cost && distance && !rate) {
      // Calculate rate
      return cost / distance;
    } else if (distance && rate && !cost) {
      // Calculate cost
      return distance * rate;
    } else {
      throw new Error(
        "Missing required parameters or invalid combination provided"
      );
    }
  }

  const handleCalculateClick = () => {
    try {
      const calculatedValue = calculateMissingVariable(
        totalCost,
        travelDistance,
        rate
      );
      // Update state with the calculated value based on missing variable
      if (!travelDistance) {
        setTravelDistance(calculatedValue);
      } else if (!rate) {
        setRate(calculatedValue);
      } else {
        setTotalCost(calculatedValue);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleResetClick = () => {
    setTravelDistance("");
    setTotalCost("");
    setRate("");
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
        className="p-4 "
        style={{
          minHeight: "98vh",
          maxHeight: "100vh",
          overflowY: "scroll",
          padding: "2rem",
        }}>
        <h4
          style={{ fontSize: "23px", fontWeight: "500", textAlign: "left" }}
          className="mb-4">
          Cost-Rate Calculator
        </h4>

        <div
          className="d-flex justify-content-center "
          style={{ marginTop: "6rem" }}>
          <Card style={{ width: "50%", padding: "2rem" }}>
            <Card.Body>
              <h5> Enter any 2 variables to determine the missing value</h5>

              <Form.Group className="mb-3">
                <Form.Label>Total Cost (ZAR):</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Cost"
                  value={totalCost}
                  onChange={(e) => setTotalCost(e.target.value)}
                />
              </Form.Group>
              <Form>
                <Form.Group className="mb-3 mt-3">
                  <Form.Label>Total Distance (km):</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Distance"
                    value={travelDistance}
                    onChange={(e) => setTravelDistance(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-5">
                  <Form.Label>Rate (ZAR/km):</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Rate"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                  />
                </Form.Group>

                <div className="d-flex flex-row justify-content-between mb-4 mt-3">
                  <Button
                    variant="primary"
                    onClick={handleCalculateClick}
                    style={{
                      width: "40%",
                      backgroundColor: "#1B2791",
                      border: "none",
                    }}>
                    Calculate
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleResetClick}
                    style={{ width: "40%" }}>
                    Reset
                  </Button>
                </div>
              </Form>
              {travelDistance && totalCost && rate && (
                <Card.Text className="mt-3">
                  Calculated automatically based on provided values.
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default RateCalculator;
