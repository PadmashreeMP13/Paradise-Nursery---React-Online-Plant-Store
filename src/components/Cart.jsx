import React from "react";

function Cart({ cartItems, setCartItems, setPage }) {
  const increaseQty = (id) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    setCartItems(updated);
  };

  const decreaseQty = (id) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item
    );
    setCartItems(updated);
  };

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <div className="qty-controls">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.qty || 1}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>
            </div>
          ))}

          {/* Total Amount */}
          <h3 style={{ textAlign: "right", marginTop: "15px" }}>
            Total: ₹{totalAmount}
          </h3>

          <button onClick={() => setPage("checkout")}>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
}

export default Cart;