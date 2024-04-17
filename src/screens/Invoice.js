import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import Sidebar from "../components/SideBar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { InvoiceDataContext } from "../contextProviders/invoiceContextProvider";

const Invoice = () => {
  const handleSaveAsPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const reportContent = document.getElementById("invoice");

    html2canvas(reportContent).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Calculate dimensions to maintain aspect ratio
      const aspectRatio = canvas.width / canvas.height;
      const maxWidth = 190; // Adjust as needed
      const maxHeight = 277; // Adjust as needed

      let width = maxWidth;
      let height = maxWidth / aspectRatio;

      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }

      pdf.addImage(imgData, "PNG", 10, 10, width, height);
      pdf.save("invoice.pdf");
    });
  };

  const { invoiceData } = useContext(InvoiceDataContext);

  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender((prevState) => !prevState);
  }, [invoiceData]);

  // Calculate totals based on invoice data
  const totalDiscount = `R${invoiceData.tableItems
    .reduce(
      (total, item) =>
        total + (item.discount * item.price * item.quantity) / 100,
      0
    )
    .toFixed(2)}`;

  const totalExclusive = `R${invoiceData.tableItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2)}`;

  const totalVAT = `R${invoiceData.tableItems
    .reduce(
      (total, item) =>
        total +
        ((item.price * item.quantity -
          (item.discount * item.price * item.quantity) / 100) *
          item.vat.percentage) /
          100,
      0
    )
    .toFixed(2)}`;

  const subTotal = `R${(
    parseFloat(totalExclusive.slice(1)) + parseFloat(totalVAT.slice(1))
  ).toFixed(2)}`;

  // Calculate Grand Total and Balance based on invoice data
  const grandTotal = `R${(
    parseFloat(
      invoiceData.tableItems.reduce(
        (total, item) =>
          total +
          item.price * item.quantity -
          (item.discount * item.price * item.quantity) / 100,
        0
      )
    ) +
    parseFloat(
      invoiceData.tableItems.reduce(
        (totalVAT, item) =>
          totalVAT +
          ((item.price * item.quantity -
            (item.discount * item.price * item.quantity) / 100) *
            item.vat.percentage) /
            100,
        0
      )
    )
  ).toFixed(2)}`;

  const balance = grandTotal;

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
        <Row className="d-flex justify-content-center mt-2">
          <Col md={9}>
            <div style={{ textAlign: "right" }}>
              <button
                onClick={handleSaveAsPDF}
                style={{
                  backgroundColor: "#1B2791",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  border: "none",
                }}>
                Download Invoice
              </button>
            </div>
            <Card className="mt-3">
              <CardBody
                style={{
                  minHeight: "98vh",
                  maxHeight: "100vh",
                  overflowY: "scroll",
                  padding: "2rem",
                }}
                id="invoice">
                <div style={{ textAlign: "left", color: "gray" }}>
                  <h4> INVOICE</h4>
                </div>

                <Row className="mt-3">
                  <Col md={3} style={{ textAlign: "left", fontSize: "14PX" }}>
                    <div>Ref NUMBER:</div>
                    <div>DATE:</div>
                    <div>DUE DATE:</div>
                    {/* <div>OVERALL DISCOUNT%</div> */}
                  </Col>

                  <Col md={3} style={{ textAlign: "left", fontSize: "14PX" }}>
                    <div>{invoiceData.invoiceDetails.refNumber}</div>
                    <div>{invoiceData.invoiceDetails.date}</div>
                    <div>{invoiceData.invoiceDetails.dueDate}</div>
                    {/* <div>{invoiceData.invoiceDetails.discount.toFixed(2)}%</div> */}
                  </Col>

                  <Col md={6} style={{ textAlign: "right" }}>
                    <img
                      src="/logo.jpg"
                      alt="Company logo"
                      width="200px"
                      style={{ marginTop: "-2.5rem" }}
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col md={6} style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "12px", fontWeight: "bold" }}>
                      FROM
                    </div>
                    <div style={{ fontWeight: "bold", color: "gray" }}>
                      CRESCOSA PTY LTD
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "gray",
                      }}>
                      {" "}
                      VAT NO: 4050305079
                    </div>
                  </Col>

                  <Col md={6} style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "12px", fontWeight: "bold" }}>
                      TO
                    </div>
                    <div style={{ fontWeight: "bold", color: "gray" }}>
                      {invoiceData.companyInfo.to.name.toUpperCase()}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "gray",
                      }}>
                      {" "}
                      {`CUSTOMER VAT NO:  ${invoiceData.companyInfo.to.vatNumber}`}
                    </div>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col md={3}>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "gray",
                        textAlign: "left",
                      }}>
                      {" "}
                      POSTAL ADDRESS
                    </div>
                  </Col>
                  <Col md={3}>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "gray",
                        textAlign: "left",
                      }}>
                      {" "}
                      PHYSICAL ADDRESS
                    </div>
                  </Col>

                  <Col md={3}>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "gray",
                        textAlign: "left",
                      }}>
                      {" "}
                      POSTAL ADDRESS
                    </div>
                  </Col>
                  <Col md={3}>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "gray",
                        textAlign: "left",
                      }}>
                      {" "}
                      PHYSICAL ADDRESS
                    </div>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col md={3} style={{ textAlign: "left", fontSize: "13px" }}>
                    <div>7 Langa Crescent</div>
                    <div>Shop Number 4</div>
                    <div>Emalahleni</div>
                    <div>Witbank</div>
                    <div>1035</div>
                  </Col>

                  <Col md={3} style={{ textAlign: "left", fontSize: "13px" }}>
                    <div>7 Langa Crescent</div>
                    <div>Shop Number 4</div>
                    <div>Emalahleni</div>
                    <div>Witbank</div>
                    <div>1035</div>
                  </Col>

                  <Col md={3} style={{ textAlign: "left", fontSize: "13px" }}>
                    <div>{invoiceData.companyInfo.to.name}</div>
                    <div>{invoiceData.companyInfo.to.address}</div>
                    <div>{invoiceData.companyInfo.to.city}</div>
                    <div>{invoiceData.companyInfo.to.postalCode}</div>
                  </Col>

                  <Col
                    md={3}
                    style={{
                      textAlign: "left",
                      fontSize: "13px",
                      paddingBottom: "2rem",
                    }}>
                    <div>{invoiceData.companyInfo.to.name}</div>
                    <div>{invoiceData.companyInfo.to.address}</div>
                    <div>{invoiceData.companyInfo.to.city}</div>
                    <div>{invoiceData.companyInfo.to.postalCode}</div>
                  </Col>
                </Row>
                <hr />
                <Table className="mb-5">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Excl. Price</th>
                      <th>Disc %</th>
                      <th>VAT%</th>
                      <th>Excl. Total</th>
                      <th>Incl. Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.tableItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.description}</td>
                        <td>{item.quantity}</td>
                        <td>R{item.price.toFixed(2)}</td>
                        <td>{item.discount}%</td>
                        <td>{item.vat.percentage}%</td>
                        {/* Calculate and display Excl. Total and Incl. Total */}
                        <td>R{(item.quantity * item.price).toFixed(2)}</td>
                        <td>
                          R
                          {(
                            item.quantity *
                            item.price *
                            (1 + item.vat.percentage / 100)
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <Row className="mt-5">
                  <Col
                    md={8}
                    style={{
                      textAlign: "left",
                      fontSize: "13px",
                      color: "gray",
                      fontWeight: "600",
                      marginTop: "4rem",
                    }}>
                    <div>Bank: FNB Bank</div>
                    <div>Account Name: Crescosa Group (PTY) Ltd</div>
                    <div>Account Number: 62914015195</div>
                    <div>Branch Code: 251742</div>
                    <div>Branch: Lakeside Mall</div>
                  </Col>

                  <Col
                    md={2}
                    style={{
                      textAlign: "left",
                      fontSize: "13px",
                      color: "gray",
                      fontWeight: "600",
                      marginTop: "4rem",
                    }}>
                    <div>Total Discount:</div>
                    <div>Total Exclusive:</div>
                    <div> Total VAT:</div>
                    <div>Sub Total:</div>
                  </Col>

                  <Col
                    md={2}
                    style={{
                      textAlign: "left",
                      fontSize: "13px",
                      color: "gray",
                      fontWeight: "600",
                      marginTop: "4rem",
                    }}>
                    <div>{totalDiscount}</div>
                    <div>{totalExclusive}</div>
                    <div>{totalVAT}</div>
                    <div>{subTotal}</div>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col md={8}></Col>
                  <Col
                    md={2}
                    style={{
                      textAlign: "left",
                      fontSize: "13px",
                      color: "gray",
                      fontWeight: "600",
                    }}>
                    Grand Total
                  </Col>
                  <Col
                    md={2}
                    style={{
                      textAlign: "left",
                      fontSize: "13px",
                      color: "gray",
                      fontWeight: "600",
                    }}>
                    {grandTotal}
                    <div
                      style={{
                        textAlign: "left",
                        fontSize: "13px",
                        color: "black",
                        fontWeight: "700",
                      }}>
                      BALANCE
                    </div>
                    <div
                      style={{
                        textAlign: "left",
                        fontSize: "14px",
                        color: "gray",
                        fontWeight: "700",
                      }}>
                      {balance}
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Invoice;
