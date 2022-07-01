import React from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import InventoryForm from "../components/Cashier/InventoryForm";
import OrderCard from "../components/Cashier/OrderCard";
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
      .then((data) => setProducts(data[0]["inventory"]));
  }, []);

  function addOrder(item) {
    setOrder((order) => [...order, item]);
  }
  function deleteOrder(event, id) {
    event.stopPropagation();
    console.log(id);
    console.log(order);
    setOrder((order) =>
      order.filter((order_item) => order_item.productId !== id)
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
  console.log(row_cols);

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

        <button onClick={() => setForm(true)}>Add Item</button>

        {form && <InventoryForm setForm={setForm} addOrder={addOrder} />}
      </div>
    </div>
  );
}
