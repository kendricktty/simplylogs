import React from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import InventoryForm from "../components/Cashier/InventoryForm";
import OrderCard from "../components/Cashier/OrderCard";
import styles from "../styles/cashier.module.css";
import Invoice from "../components/Cashier/Invoice";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Alert } from "react-bootstrap";
import axios from '../axios/axios'

export default function Cashier(props) {
  // Initialize the products to be empty at first
  const [products, setProducts] = React.useState({});
  //
  const [form, setForm] = React.useState(false);
  // This is the total number of items that the users hopes to purchase.
  const [order, setOrder] = React.useState([]);
  const [showInvoice, setShowInvoice] = React.useState({ invoiceNo: 0, showInvoice: false});
  const [error, setError] = React.useState("");
  const productOrders = products;
  
  // Load the product when the page is rendered at first
  // React.useEffect(() => {
  //   fetch("http://localhost:8001/inventory")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data["inventory"]));
  // }, []);


  React.useEffect(() => {
    async function fetchData() {
      const res = await axios.get('/inventory')
      setProducts(res.data.inventory)
    }
    fetchData()
  }, [])


  function addOrder(item) {
    let addedBefore = false;
    let notInProduct = true;
    for (let i = 0; i < order.length; i++) {
      if (order[i] != null) {
        if (order[i].productId == item.productId) {
          addedBefore = true;
          setError("The Item has been added to the Basket previously");
          setTimeout(()=>setError(null), 5000)
          break;
        }
      }
    }
    for (let i = 0; i < products.length; i++) {
      if (item.productId == products[i].productId) {
        notInProduct = false;
        break;
      }
    }
    if (notInProduct) {
      setError("The Item is not in the Company's Product List");
      setTimeout(()=>setError(null), 5000)
    }

    if (!addedBefore && !notInProduct) {
      setOrder((order) => [...order, item]);
      setError("");
    }
  }
  function deleteOrder(event, id) {
    event.stopPropagation();
    setOrder((order) =>
      order.filter((order_item) => {
        if (order_item != null) {
          if (order_item.productId !== id) {
            return true;
          } else {
            return false;
          }
        }
      })
    );
  }
  function updateCount(event, id, status) {
    event.stopPropagation();
    setOrder(
      order.map((order_item) => {
        if (order_item.productId === id) {
          if (status === "-" && order_item.quantity > 1) {
            return {
              ...order_item,
              quantity: order_item.quantity - 1,
            };
          } else if (status === "-" && order_item.quantity == 1) {
            return order_item
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

  const ordersList = order.map((order_item) => {
    if (order_item != null) {
      return (
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
      );
    }
  });
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

  //handle logout
  function handleLogout() {
    localStorage.clear()
    props.setUser(null)
  }


  //handle place order
  async function placeOrder() {
    
    if(order.length === 0) {
      setError('No item in basket, cannot place order')
      setTimeout(()=>setError(null), 5000)
      return
    }
    try {
      const orderData = {}
      const res2 = await axios.get('/order')
      orderData.invoiceNo = res2.data.orderCount + 1
      setShowInvoice((prevState) => { return {... prevState, invoiceNo : orderData.invoiceNo}})
      orderData.products = []

      order.map((order_item) => {
        const product = {}
        if (order_item != null) {
          product.productName = productOrders[order_item.productId - 1].productName;
          product.productRef = productOrders[order_item.productId - 1]._id;
          product.productId = productOrders[order_item.productId - 1].productId;
          product.supplier = productOrders[order_item.productId - 1].supplier;
          product.quantity = order_item.quantity;
          product.price = productOrders[order_item.productId - 1].price;
          product.category = productOrders[order_item.productId - 1].category;
        }
        orderData.products.push(product)
      })

      console.log(orderData);
      await axios.post('/order', orderData)
      setShowInvoice((prevState) => { return {... prevState, showInvoice : true}})
    } catch (error) {
      setError(error.response.data.msg);
      setTimeout(()=>setError(null), 5000);
    }
    
  }

  async function getInvoiceNo() {
    const res2 = await axios.get('/order');
    const invoiceNo = res2.data.orderCount + 1;
    return invoiceNo;
  }

  return (
    <div className="dashboard container-fluid">
      
      <SideNav handleLogout={handleLogout}/>

      <div className="salesMain">
      
        <Header pageName="Cashier" logo="fa-solid fa-cart-shopping"/>
        {error && (
          <Alert variant="danger" className={styles.alertDanger}>
            {error}
          </Alert>
        )}
        <div className="container mt-5">
          {row_cols.map((x) => (
            <div className="row gx-2 gy-4">{x}</div>
          ))}
        </div>
        <button className={styles.addItem} onClick={() => setForm(true)}>
          Add Item
        </button>

        <button
          className={styles.generateInvoice}
          onClick={() => placeOrder()}
        >
          Place Order
        </button>
        {form && <InventoryForm setForm={setForm} addOrder={addOrder} />}
      </div>
      {/* This is the code for the invoice template*/}

      <Invoice
        setShowInvoice={setShowInvoice}
        showInvoice={showInvoice.showInvoice}
        handleDownloadPdf={handleDownloadPdf}
        order={order}
        product={productOrders}
        invoiceNo={showInvoice.invoiceNo}
      />
    </div>
  );
}
