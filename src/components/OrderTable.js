import React from "react";
import { Table, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrdersTable = ({ orders }) => {
  const handleActionClick = (orderId) => {
    // Add your action logic here when the button is clicked
    console.log(`Action clicked for order ID: ${orderId}`);
  };

  return (
    <Table hover>
      <thead>
        <tr>
          <th>
            <Form.Check type="checkbox" />
          </th>
          <th>Order Number</th>
          <th>Supplier/Customer</th>
          <th>Origin</th>
          <th>Destination</th>
          <th>Product</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={index}>
            <td>
              <Form.Check type="checkbox" />
            </td>
            <td>{order.orderNumber}</td>
            <td>{order.supplierCustomer}</td>
            <td>{order.origin}</td>
            <td>{order.destination}</td>
            <td>{order.product}</td>

            <td>
              {order.status ? (
                <span className={`status-pill ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              ) : (
                <span className="status-pill unknown">Unknown</span>
              )}
            </td>

            <td>
              <Link
                to={`/orderDetails/${order.orderNumber}`}
                style={{
                  textDecoration: "none", // Removes underline
                  color: "inherit", // Uses the parent text color
                }}>
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OrdersTable;
