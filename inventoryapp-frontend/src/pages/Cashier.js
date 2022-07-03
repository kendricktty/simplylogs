import React from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import InventoryForm from "../components/Cashier/InventoryForm";
import OrderCard from "../components/Cashier/OrderCard";
import styles from "../styles/cashier.module.css";
import Invoice from "../components/Cashier/Invoice";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";


export default function Cashier() {
  // Initialize the products to be empty at first
  const [products, setProducts] = React.useState({});
  //
  const [form, setForm] = React.useState(false);
  // This is the total number of items that the users hopes to purchase.
  const [order, setOrder] = React.useState([]);
  const [showEditProduct, setShowEditProduct] = React.useState(false);
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



  const handleDownloadPdf = async (printRef) => {
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

        <button className={styles.generateInvoice} onClick={() => setShowEditProduct(true)}>
          Generate Invoice
        </button>
        {form && <InventoryForm setForm={setForm} addOrder={addOrder} />}
      </div>
      {/* This is the code for the invoice template*/}

      <Invoice 
      setShowEditProduct={setShowEditProduct}
      showEditProduct={showEditProduct}
      handleDownloadPdf={handleDownloadPdf}
      />
    </div>
  );
}
