import React, { useState } from "react";

function Checkout({ cartItems, setCartItems, setPage }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handlePlaceOrder = () => {
    if (!name || !address || !phone) {
      alert("Please fill all fields!");
      return;
    }
    alert("Order placed successfully! 🎉");
    setCartItems([]);
    setPage("landing");
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <label>Address:</label>
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} />
        <label>Phone:</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;