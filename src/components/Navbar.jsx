import React from "react";

const Navbar = ({ setPage, cartCount }) => {
  return (
    <div className="navbar">
      <div className="nav-left">
        <h2
          className="nav-logo"
          onClick={() => setPage("landing")}
          style={{ cursor: "pointer" }}
        >
          Paradise Nursery
        </h2>
      </div>

      <div className="nav-right">
        <button
          className="nav-button"
          onClick={() => setPage("products")}
        >
          Shop
        </button>

        <button
          className="nav-button cart-button"
          onClick={() => setPage("cart")}
        >
          Cart ({cartCount})
        </button>
      </div>
    </div>
  );
};

export default Navbar;