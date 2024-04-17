import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import ordersData from "../dummyData/OrdersDummy";
import {
  Row,
  Col,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { MdOutlineLocalShipping, MdOutlineBalance } from "react-icons/md";
import {
  TbFileInvoice,
  TbBuildingFactory,
  TbCurrentLocation,
} from "react-icons/tb";
import { GiCoalWagon } from "react-icons/gi";
import { IoReturnDownBack } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import Sidebar from "./SideBar";
import { InvoiceDataContext } from "../contextProviders/invoiceContextProvider";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";

const OrderDetail = () => {
  const { orderNumber } = useParams();
  const [orderNo, setOrderNo] = useState("");
  const [totalMassDelivered, setTotalMassDelivered] = useState(0);
  const [remainingMass, setRemainingMass] = useState(0);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/orders/${orderNumber}`
        );
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    if (orderNumber) {
      fetchOrder();
    }
  }, [orderNumber]);

  useEffect(() => {
    setOrderNo(orderNumber);
  }, [orderNumber]);

  useEffect(() => {
    // Recalculate total mass delivered whenever the order or its deliveries change
    if (order && order.deliveries) {
      const total = order.deliveries.reduce(
        (total, delivery) => total + (delivery.netMass || 0),
        0
      );
      setTotalMassDelivered(total);
    } else {
      setTotalMassDelivered(0);
    }
  }, [order]);

  useEffect(() => {
    // Calculate remaining mass whenever totalMassDelivered changes
    const remaining = order ? order.totalMass - totalMassDelivered : 0;
    setRemainingMass(remaining);
  }, [totalMassDelivered, order]);

  //EVERYTHING TO DO WITH INVOICE
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    companyInfo: {
      to: {
        name: "",
        address: "",
        city: "",
        postalCode: 0,
        vatNumber: "",
      },
    },
    invoiceDetails: {
      refNumber: "",
      date: "",
      dueDate: "",
      orderNumber: orderNumber,
    },
    tableItems: [
      {
        description: "",
        quantity: 0,
        price: 0,
        discount: 0,
        vat: {
          percentage: 15,
        },
      },
    ],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to your server with formData
      await axios.post("http://localhost:3000/invoices", formData);

      // Reset form after successful submission
      setFormData({
        companyInfo: {
          to: {
            name: "",
            address: "",
            city: "",
            postalCode: 0,
            vatNumber: "",
          },
        },
        invoiceDetails: {
          refNumber: "",
          date: "",
          dueDate: "",
          orderNumber: orderNumber,
        },
        tableItems: [
          {
            description: "",
            quantity: 0,
            price: 0,
            discount: 0,
            vat: {
              percentage: 0,
            },
          },
        ],
      });

      console.log("Invoice data submitted successfully!");
    } catch (error) {
      console.error("Error submitting invoice data:", error);
    }
    handleClose();
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newFormData = { ...formData };

    if (name.startsWith("companyInfo")) {
      const [_, field] = name.split("companyInfo.to.");
      newFormData.companyInfo.to[field] = value;
    } else if (name.startsWith("invoiceDetails")) {
      const [_, field] = name.split("invoiceDetails.");
      newFormData.invoiceDetails[field] = value;
    } else if (name.startsWith("tableItems")) {
      const [fieldName, itemIndex, field] = name.split(".");
      const item = { ...newFormData[fieldName][itemIndex] };
      item[field] = value;
      newFormData[fieldName][itemIndex] = item;
    } else {
      newFormData[name] = value;
    }

    setFormData(newFormData);
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div
      className="d-flex flex-row"
      style={{ minHeight: "100vh", maxHeight: "100vh", background: "#f2f2f2" }}>
      <Sidebar />
      <Container fluid className="p-4">
        <h4
          style={{ fontSize: "23px", fontWeight: "500", textAlign: "left" }}
          className="mb-4">
          Order Details
        </h4>

        <div className="d-flex flex-row justify-content-between">
          <div style={{ textAlign: "left" }}>
            <Link
              to="/orders"
              style={{ textDecoration: "none", textAlign: "left" }}>
              <div className="back-button">
                <IoReturnDownBack /> <span> Back</span>
              </div>
            </Link>
          </div>

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
              Generate Invoice
            </button>
          </div>
        </div>

        <Col md={12}>
          <Card className="p-2 mt-3" style={{ border: "none", height: "80vh" }}>
            <Card.Body>
              <Row>
                {order && (
                  <>
                    <Col xs={6}>
                      <h3
                        style={{
                          fontSize: "20px",
                          fontWeight: "500",
                          textAlign: "left",
                        }}>
                        Order Information
                      </h3>
                      <ListGroup style={{ textAlign: "left" }}>
                        <ListGroupItem>
                          <TbFileInvoice color="#1B2791" /> Order Number:{" "}
                          {order.orderNumber}
                        </ListGroupItem>
                        <ListGroupItem>
                          <TbBuildingFactory color="#1B2791" />{" "}
                          Supplier/Customer: {order.supplierCustomer}
                        </ListGroupItem>
                        <ListGroupItem>
                          <TbCurrentLocation color="#1B2791" /> Origin:{" "}
                          {order.origin}
                        </ListGroupItem>
                        <ListGroupItem>
                          <FaMapLocationDot color="#1B2791" /> Destination:{" "}
                          {order.destination}
                        </ListGroupItem>
                      </ListGroup>
                    </Col>
                    <Col xs={6}>
                      <h3
                        style={{
                          fontSize: "20px",
                          fontWeight: "500",
                          textAlign: "left",
                        }}>
                        Delivery Information
                      </h3>
                      <ListGroup style={{ textAlign: "left" }}>
                        <ListGroupItem>
                          <MdOutlineBalance color="#1B2791" /> Total Mass to be
                          Delivered: {order.totalMass} kg
                        </ListGroupItem>
                        <ListGroupItem>
                          <GiCoalWagon color="#1B2791" /> Total Mass Delivered:{" "}
                          {totalMassDelivered} kg
                        </ListGroupItem>
                        <ListGroupItem>
                          <MdOutlineBalance color="#1B2791" /> Remaining Mass:{" "}
                          {remainingMass} kg
                        </ListGroupItem>
                        <ListGroupItem>
                          <MdOutlineLocalShipping color="#1B2791" /> Number of
                          Deliveries Done: {order.deliveries.length}
                        </ListGroupItem>
                      </ListGroup>
                    </Col>
                  </>
                )}
              </Row>

              <div className="mt-5 d-flex flex-row justify-content-between">
                <h4
                  style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    textAlign: "left",
                  }}>
                  Deliveries
                </h4>
                <div style={{ textAlign: "right" }}>
                  <button
                    onClick={handleShow}
                    style={{
                      backgroundColor: "transparent",
                      padding: "8px 12px",
                      borderRadius: "5px",
                      border: "1px solid #1B2791",
                      color: "#1B2791",
                      cursor: "pointer",
                    }}>
                    <AiOutlinePlus /> Create Delivery
                  </button>
                </div>
              </div>
              <hr />
              <Table hover>
                <thead>
                  <tr>
                    <th>
                      <Form.Check type="checkbox" />
                    </th>
                    <th style={{ textAlign: "left" }}>Date and Time</th>
                    <th style={{ textAlign: "left" }}>Driver</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Nett Mass</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {order && order.deliveries.length > 0 ? (
                    order.deliveries.map((delivery, index) => (
                      <tr key={index}>
                        <td>
                          <Form.Check type="checkbox" />
                        </td>
                        <td style={{ textAlign: "left" }}>
                          {delivery.dateTime}
                        </td>
                        <td style={{ textAlign: "left" }}>{delivery.driver}</td>
                        <td>{delivery.origin}</td>
                        <td>{delivery.destination}</td>
                        <td>{delivery.netMass} kg</td>
                        <td>
                          {delivery.status ? (
                            <span
                              className={`status-pill ${delivery.status.toLowerCase()}`}>
                              {delivery.status}
                            </span>
                          ) : (
                            <span className="status-pill unknown">Unknown</span>
                          )}
                        </td>
                        <td>
                          <Link
                            to={`/`}
                            style={{
                              textDecoration: "none", // Removes underline
                              color: "#1B2791",
                            }}>
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ textAlign: "center" }}>
                        No deliveries available
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

              <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Invoice Information</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: "2rem" }}>
                  <div>
                    <Form onSubmit={handleSubmit}>
                      {/* Company Info */}
                      <h4>Company Information</h4>
                      <hr />
                      <Form.Group controlId="formCompanyName" className="mb-3">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter company name"
                          name="companyInfo.to.name"
                          value={formData.companyInfo.to.name}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group
                        controlId="formCompanyAddress"
                        className="mb-3">
                        <Form.Label>Company Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter company address"
                          name="companyInfo.to.address"
                          value={formData.companyInfo.to.address}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group controlId="formCompanyCity" className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter city"
                          name="companyInfo.to.city"
                          value={formData.companyInfo.to.city}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group
                        controlId="formCompanyPostalCode"
                        className="mb-3">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter postal code"
                          name="companyInfo.to.postalCode"
                          value={formData.companyInfo.to.postalCode}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group
                        controlId="formCompanyVatNumber"
                        className="mb-3">
                        <Form.Label>VAT Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter VAT number"
                          name="companyInfo.to.vatNumber"
                          value={formData.companyInfo.to.vatNumber}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      {/* Add other company info fields similarly */}

                      {/* Invoice Details */}
                      <h4 className="mt-5">Invoice Details</h4>
                      <hr />
                      <Form.Group controlId="formRefNumber" className="mb-3">
                        <Form.Label>Reference Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter reference number"
                          name="invoiceDetails.refNumber"
                          value={formData.invoiceDetails.refNumber}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group controlId="formDate" className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="invoiceDetails.date"
                          value={formData.invoiceDetails.date}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group controlId="formDueDate" className="mb-3">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="invoiceDetails.dueDate"
                          value={formData.invoiceDetails.dueDate}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group controlId="formDiscount" className="mb-3">
                        <Form.Label>Order Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="invoiceDetails.orderNumber"
                          value={orderNo}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <h4 className="mt-5">Service Details</h4>
                      <hr />
                      {formData.tableItems.map((item, index) => (
                        <div key={index}>
                          <Form.Group
                            controlId={`formDescription${index}`}
                            className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter description"
                              name={`tableItems.${index}.description`}
                              value={item.description}
                              onChange={(e) => handleChange(e, index)}
                            />
                          </Form.Group>
                          <Form.Group
                            controlId={`formQuantity${index}`}
                            className="mb-3">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Enter quantity"
                              name={`tableItems.${index}.quantity`}
                              value={item.quantity}
                              onChange={(e) => handleChange(e, index)}
                            />
                          </Form.Group>
                          <Form.Group
                            controlId={`formPrice${index}`}
                            className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Enter price"
                              name={`tableItems.${index}.price`}
                              value={item.price}
                              onChange={(e) => handleChange(e, index)}
                            />
                          </Form.Group>
                          <Form.Group
                            controlId={`formDiscount${index}`}
                            className="mb-3">
                            <Form.Label>Discount</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Enter discount"
                              name={`tableItems.${index}.discount`}
                              value={item.discount}
                              onChange={(e) => handleChange(e, index)}
                            />
                          </Form.Group>
                        </div>
                      ))}

                      <Button
                        variant="primary"
                        type="submit"
                        className="mt-3"
                        style={{
                          backgroundColor: "#1B2791",
                          borderColor: "#1B2791",
                          width: "100%",
                        }}>
                        Submit
                      </Button>
                    </Form>
                  </div>
                </Modal.Body>
              </Modal>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </div>
  );
};

export default OrderDetail;
