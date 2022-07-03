import React from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import InventoryForm from "../components/Cashier/InventoryForm";
import OrderCard from "../components/Cashier/OrderCard";
import styles from "../styles/cashier.module.css";
import Invoice from "../components/Cashier/Invoice";
import html2canvas from "html2canvas";
import { Col, Divider, Row, Table } from "antd";
import "antd/dist/antd.css";
import { jsPDF } from "jspdf";

export default function Cashier() {
  // Initialize the products to be empty at first
  const [products, setProducts] = React.useState({});
  //
  const [form, setForm] = React.useState(false);
  // This is the total number of items that the users hopes to purchase.
  const [order, setOrder] = React.useState([]);
  const productOrders = products;

  // Load the product when the page is rendered at first
  React.useEffect(() => {
    fetch("http://localhost:8001/inventory")
      .then((res) => res.json())
      .then((data) => setProducts(data["inventory"]));
  }, []);

  function addOrder(item) {
    setOrder((order) => [...order, item]);
  }
  function deleteOrder(event, id) {
    event.stopPropagation();
    setOrder((order) =>
      order.filter((order_item) => order_item.productId !== id)
    );
  }
  function updateCount(event, id, status) {
    event.stopPropagation();
    setOrder(
      order.map((order_item) => {
        if (order_item.productId === id) {
          if (status === "-") {
            return {
              ...order_item,
              quantity: order_item.quantity - 1,
            };
          } else {
            return {
              ...order_item,
              quantity: order_item.quantity + 1,
            };
          }
        } else {
          return order_item;
        }
      })
    );
  }

  const ordersList = order.map((order_item) => (
    <OrderCard
      price={productOrders[order_item.productId - 1].price}
      supplier={productOrders[order_item.productId - 1].supplier}
      name={productOrders[order_item.productId - 1].productName}
      quantity={order_item.quantity}
      key={order_item.productId}
      id={order_item.productId}
      deleteOrder={deleteOrder}
      updateCount={updateCount}
    />
  ));
  function sliceOrderList(ordersList) {
    const newArray = [];
    var startIndex = 0;
    while (startIndex < ordersList.length) {
      newArray.push(ordersList.slice(startIndex, startIndex + 2));
      startIndex += 2;
    }
    return newArray;
  }

  const row_cols = sliceOrderList(ordersList);

  const printRef = React.createRef();

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    console.log(element);
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  };

  return (
    <div className="dashboard container-fluid">
      <SideNav />
      <div className="salesMain">
        <Header pageName="Cashier" />
        <div className="container mt-5">
          {row_cols.map((x) => (
            <div className="row gx-2 gy-4">{x}</div>
          ))}
        </div>
        <button className={styles.addItem} onClick={() => setForm(true)}>
          Add Item
        </button>

        <button className={styles.generateInvoice} onClick={handleDownloadPdf}>
          Generate Invoice
        </button>
        {form && <InventoryForm setForm={setForm} addOrder={addOrder} />}
      </div>
      {/* This is the code for the invoice template*/}
      <div ref={printRef} className={styles.invoice}>
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
    </div>
  );
}
