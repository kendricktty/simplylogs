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

  const ordersList = order.map((order_item) => (
    <OrderCard
      price={productOrders[order_item.productId - 1].price}
      supplier={productOrders[order_item.productId - 1].supplier}
      name={productOrders[order_item.productId - 1].productName}
      quantity={order_item.quantity}
      key={order_item.productId}
      id={order_item.productId}
    />
  ));

  console.log(ordersList);

  return (
    <div className="dashboard container-fluid">
      <SideNav />
      <div className="salesMain">
        <Header pageName="Cashier" />
        <div className="container mt-5">
          <div className="row ">
            <div className="col-md-6">
              <div className="content">
                <span>Item</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="content">
                <span>Item</span>
              </div>
            </div>
          </div>
        </div>
        <button onClick={() => setForm(true)}>Add Item</button>
        {ordersList}

        {form && <InventoryForm setForm={setForm} addOrder={addOrder} />}
      </div>
    </div>
  );
}
