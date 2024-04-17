import React from "react";
import { Row, Col, Container, Card, CardBody } from "react-bootstrap";
import Sidebar from "./SideBar";

const FinalMassTicket = ({ ticketInfo }) => {
  // Your component logic here
  return (
    <div
      className="d-flex flex-row"
      style={{ minHeight: "100vh", maxHeight: "100vh", background: "#f2f2f2" }}>
      <Sidebar />
      <Container fluid className="p-4">
        <Row>
          <Col>
            <h3 style={{ textAlign: "left" }}>Proof Of Delivery</h3>

            <Card className="mt-3">
              <CardBody style={{ padding: "2rem" }}>
                <div style={{ fontWeight: "bold", textAlign: "left" }}>
                  Mkhondo Feuls and Projects [PTY] LTD
                </div>
                <Row className="mt-3">
                  <Col md={3} style={{ textAlign: "left" }}>
                    <div>70 HT Grootlaagte</div>
                    <div>Dirkiesdorp</div>
                    <div>2380</div>
                    <div>Tel No.</div>
                  </Col>

                  <Col
                    md={6}
                    style={{ fontWeight: "bold", textAlign: "center" }}>
                    <div> Final Mass Ticket - Original</div>
                  </Col>

                  <Col md={3} style={{ textAlign: "right" }}>
                    <div> Digital Copy</div>
                    <div>24/04/2023 </div>
                  </Col>
                </Row>

                <Row
                  className="mt-3"
                  style={{
                    border: "2px solid black",
                    borderRadius: "2px",
                    padding: "20px",
                    paddingLeft: "10px",
                  }}>
                  <Col md={8}>
                    <div style={{ textAlign: "left", fontWeight: "bold" }}>
                      Reg No. ND404-229 ND242-851 ND241-431{" "}
                    </div>
                  </Col>

                  <Col md={4}>
                    <span style={{ textAlign: "right", fontWeight: "bold" }}>
                      {" "}
                      Transaction No. 1967
                    </span>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col md={3} style={{ textAlign: "left", fontSize: "14px" }}>
                    <div style={{ fontWeight: "bold" }}>Reference No.</div>
                    <div>Origin</div>
                    <div>Destination</div>
                    <div>Supplier/Customer</div>
                    <div style={{ fontWeight: "bold" }}>Product</div>
                    <div>Transporter</div>
                    <div>Transaction Type</div>
                    <div>Comment</div>
                  </Col>

                  <Col md={6} style={{ textAlign: "left", fontSize: "14px" }}>
                    <div style={{ fontWeight: "bold" }}>MKC0025CP006</div>
                    <div>MKHONDO COLLIERY</div>
                    <div>BPO/RAINNIE RD</div>
                    <div>COAL POWER</div>
                    <div style={{ fontWeight: "bold" }}>4800</div>
                    <div>AIT</div>
                    <div>DESPATCH</div>
                    <div>MKC78</div>
                  </Col>
                </Row>

                <Row
                  className="mt-3"
                  style={{
                    border: "2px solid black",
                    borderRadius: "2px",
                    padding: "20px",
                    paddingLeft: "10px",
                  }}>
                  <Col
                    md={3}
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}>
                    <div>1st Weigh </div>
                    <div>2nd Weigh </div>
                    <div>Nett Mass </div>
                  </Col>

                  <Col
                    md={3}
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}>
                    <div>21850 Kg </div>
                    <div>55300 Kg </div>
                    <div>33450 Kg </div>
                  </Col>

                  <Col
                    md={3}
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}>
                    <div>Sizwe </div>
                    <div>Sizwe </div>
                  </Col>

                  <Col
                    md={3}
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}>
                    <div>24/04/2023 08:46:07 </div>
                    <div>24/04/2023 08:58:15 </div>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col md={6} style={{ textAlign: "left", fontSize: "14px" }}>
                    <div>Driver Signature</div>
                    <div> DICKSON DAKURA</div>
                    <hr style={{ marginTop: "4rem", width: "80%" }}></hr>
                  </Col>
                  <Col md={6} style={{ textAlign: "left", fontSize: "14px" }}>
                    <div>Operator Signature</div>
                    <br />
                    <hr style={{ marginTop: "4rem", width: "80%" }}></hr>
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

export default FinalMassTicket;
