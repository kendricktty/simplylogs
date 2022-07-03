import React from "react";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Modal,
} from "react-bootstrap";
import styles from "../../styles/cashier.module.css";
import { Col, Divider, Row, Table } from "antd";
import "antd/dist/antd.css";
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export default function Invoice(props) {
  const invoiceOrders = props.order.map((order_item) => {
    return {
      ...order_item,
      price: props.product[order_item.productId - 1].price,
      supplier: props.product[order_item.productId - 1].supplier,
      name: props.product[order_item.productId - 1].productName,
      total: formatter.format(order_item.quantity * props.product[order_item.productId - 1].price)
    };
  });

  var totalPrice = 0;

  invoiceOrders.map((order) => {
    totalPrice += order.price * order.quantity;
  });

  const printRef = React.createRef();

  const handleClose = () => props.setShowEditProduct(false);
  return (
    <Modal size="lg" show={props.showEditProduct} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Invoice</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div ref={printRef} className={styles.invoice}>
          <div style={{ padding: 20 }}>
            <Row>
              <Col>
                <Divider>Invoice</Divider>
              </Col>
            </Row>

            <Row gutter={24} style={{ marginTop: 32 }}>
              <Col span={8}>
                <h3>Inventory Applicaiton</h3>
                <div>81 Victoria St, Singapore 188065</div>
                <div>Singapore Managament University</div>
                <div></div>
                <div>Singapore - 188065</div>
              </Col>
              <Col span={8} offset={8}>
                <table>
                  <tr>
                    <th>Invoice # :</th>
                    <td>1</td>
                  </tr>
                  <tr>
                    <th>Invoice Date :</th>
                    <td>04-07-2022</td>
                  </tr>
                  <tr>
                    <th>Due Date :</th>
                    <td>04-07-2022</td>
                  </tr>
                </table>
              </Col>
            </Row>

            <Row style={{ marginTop: 48 }}>
              <div>
                Bill To: <strong>Lazada</strong>
              </div>
              <div>51 Bras Basah Rd,</div>
              <div>Singapore - 189554</div>
            </Row>

            <Row style={{ marginTop: 48 }}>
              <Table dataSource={invoiceOrders} pagination={false}>
                <Table.Column title="ID" dataIndex="productId" />
                <Table.Column title="Quantity" dataIndex="quantity" />
                <Table.Column title="Supplier" dataIndex="supplier" />
                <Table.Column title="Name" dataIndex="name" />
                <Table.Column title="Price" dataIndex="price" />
                <Table.Column title="Total" dataIndex="total"/>
              </Table>
            </Row>

            <Row style={{ marginTop: 48 }}>
              <Col span={8} offset={16}>
                <table>
                  <tr>
                    <th>Gross Total :</th>
                    <td>{formatter.format(totalPrice)}</td>
                  </tr>
                  <tr>
                    <th>GST @7% :</th>
                    <td>{formatter.format(totalPrice * 0.07)}</td>
                  </tr>
                  <tr>
                    <th>Nett Total :</th>
                    <td>{formatter.format(totalPrice * 1.07)}</td>
                  </tr>
                </table>
              </Col>
            </Row>

            <Row style={{ marginTop: 48, textAlign: "center" }}>notes</Row>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => props.handleDownloadPdf(printRef)}
        >
          Download PDF
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
