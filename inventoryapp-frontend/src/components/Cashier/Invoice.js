import React from "react";
import styles from "../../styles/cashier.module.css";
import { Col, Divider, Row, Table } from "antd";
import "antd/dist/antd.css";

const Invoice = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className={styles.invoice}>
      <div style={{ padding: 20 }}>
        <Row>
          <Col>
            <Divider>Invoice</Divider>
          </Col>
        </Row>

        <Row gutter={24} style={{ marginTop: 32 }}>
          <Col span={8}>
            <h3>Eco Haya</h3>
            <div>#944/945, 4th Cross, 9th Main,</div>
            <div>Vijaya Bank Layout,</div>
            <div>Bannerghatta Road,</div>
            <div>Bangalore - 560076</div>
          </Col>
          <Col span={8} offset={8}>
            <table>
              <tr>
                <th>Invoice # :</th>
                <td>1</td>
              </tr>
              <tr>
                <th>Invoice Date :</th>
                <td>10-01-2018</td>
              </tr>
              <tr>
                <th>Due Date :</th>
                <td>10-01-2018</td>
              </tr>
            </table>
          </Col>
        </Row>

        <Row style={{ marginTop: 48 }}>
          <div>
            Bill To: <strong>Strides Shasun Ltd</strong>
          </div>
          <div>Bannerghatt Road,</div>
          <div>Bangalore - 560076</div>
        </Row>

        <Row style={{ marginTop: 48 }}>
          <Table
            dataSource={[
              {
                id: 1,
                name: "Accommodation (Single Occupancy)",
                description: "Accommodation",
                price: 1599,
                quantity: 1,
              },
            ]}
            pagination={false}
          >
            <Table.Column title="Items" dataIndex="name" />
            <Table.Column title="Description" dataIndex="description" />
            <Table.Column title="Quantity" dataIndex="quantity" />
            <Table.Column title="Price" dataIndex="price" />
            <Table.Column title="Line Total" />
          </Table>
        </Row>

        <Row style={{ marginTop: 48 }}>
          <Col span={8} offset={16}>
            <table>
              <tr>
                <th>Gross Total :</th>
                <td>Rs. 1599</td>
              </tr>
              <tr>
                <th>IGST @6% :</th>
                <td>Rs. 95.94</td>
              </tr>
              <tr>
                <th>CGST @6% :</th>
                <td>Rs. 95.94</td>
              </tr>
              <tr>
                <th>Nett Total :</th>
                <td>Rs. 1790.88</td>
              </tr>
            </table>
          </Col>
        </Row>

        <Row style={{ marginTop: 48, textAlign: "center" }}>notes</Row>

        <Row style={{ marginTop: 48, textAlign: "center" }}>Footer</Row>
      </div>
    </div>
  );
});
export default Invoice;
