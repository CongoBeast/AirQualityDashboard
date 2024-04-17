import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Sidebar from "../components/SideBar";
import { Button, Card, Col, Container, Form, Modal } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

const Trucks = () => {
  const [trucks, setTrucks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    fetchTrucks();
  }, []);

  const fetchTrucks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/trucks/all");
      setTrucks(response.data.trucks);
    } catch (error) {
      console.error("Error fetching trucks:", error);
    }
  };

  const initialFormData = {
    truckNumber: "",
    registrationNumber: "",
    serviceHistory: [],
    breakdownHistory: [],
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/trucks/", formData);
      setFormData(initialFormData);
      fetchTrucks();
      handleClose();
    } catch (error) {
      console.error("Error adding truck:", error);
    }
  };

  return (
    <div
      className="d-flex flex-row"
      style={{ minHeight: "100vh", background: "#f2f2f2" }}>
      <Sidebar />
      <Container fluid className="p-4">
        <div className="mb-4 d-flex flex-row justify-content-between">
          <h4
            style={{ fontSize: "23px", fontWeight: "500", textAlign: "left" }}>
            Trucks
          </h4>
          <div style={{ textAlign: "right" }}>
            <button
              onClick={handleShow}
              style={{
                backgroundColor: "#1B2791",
                color: "white",
                padding: "5px 10px",
                borderRadius: "5px",
                border: "none",
              }}>
              <AiOutlinePlus /> Add Truck
            </button>
          </div>
        </div>

        <Col md={12}>
          <Card className="p-2" style={{ border: "none", height: "85vh" }}>
            <Card.Body>
              <Table hover>
                <thead>
                  <tr style={{ textAlign: "left" }}>
                    <th>Truck Number</th>
                    <th>Registration Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {trucks.map((truck, index) => (
                    <tr key={index} style={{ textAlign: "left" }}>
                      <td>{truck.truckNumber}</td>
                      <td>{truck.registrationNumber}</td>
                      <td>
                        <Link
                          to={`/truckDetails/${truck._id}`}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                          }}>
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Container>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Truck</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="truckNumber" className="mb-3">
              <Form.Label>Truck Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter truck number"
                name="truckNumber"
                value={formData.truckNumber}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="registrationNumber" className="mb-3">
              <Form.Label>Registration Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter registration number"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="mb-3">
              <Button
                variant="primary"
                type="submit"
                style={{
                  backgroundColor: "#1B2791",
                  borderColor: "#1B2791",
                  width: "100%",
                }}>
                Add Truck
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Trucks;
