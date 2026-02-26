import React, { useState } from "react";

const allProducts = [
  { id: 1, name: "Aloe Vera", price: 200, image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80", description: "Aloe Vera is a succulent plant species known for its medicinal properties. Perfect for indoors, easy to care for, and improves air quality." },
  { id: 2, name: "Snake Plant", price: 300, image: "https://asset.bloomnation.com/c_pad,d_vendor:global:catalog:product:image.png,f_auto,fl_preserve_transparency,q_auto,w_1400/v1635896810/vendor/5297/catalog/product/2/0/20200304122155_file_5e5ef4a3ccb60_5e5ef7b7cd5fa_61816b752ae6b.jpg", description: "The Snake Plant is a hardy indoor plant that purifies the air and thrives even with minimal sunlight. Low maintenance and great for homes or offices." },
  { id: 3, name: "Money Plant", price: 150, image: "https://bloomscape.com/wp-content/uploads/2022/10/bloomscape_money-tree-forest_md_care-product-scaled.jpg?ver=955352", description: "Money Plant is considered lucky and believed to bring prosperity. Easy to grow indoors and requires moderate watering." },
  { id: 4, name: "Spider Plant", price: 250, type: "Indoor", image: "https://indorenursery.com/wp-content/uploads/2022/05/013A1622.jpg", description: "Easy to grow, great for hanging pots." },
  { id: 5, name: "Peace Lily", price: 350, type: "Flowering", image: "https://bloomscape.com/wp-content/uploads/2022/02/bloomscape_peace-lily_10in_care-product1-scaled.jpg?ver=675645", description: "Elegant white blooms, low-maintenance." },
  { id: 6, name: "Fiddle Leaf Fig", price: 500, type: "Indoor", image: "https://bloomscape.com/wp-content/uploads/2025/04/VENICE_neon_praper_plant_XXL_charcoal_0567_V1-scaled-e1762793817365.jpg?ver=1096209", description: "Popular indoor tree, bright indirect light." },
  { id: 7, name: "Orchid", price: 400, type: "Flowering", image: "https://bloomscape.com/wp-content/uploads/2022/04/bloomscape_orchid-purple_group_Cropped-853x1024.jpg?ver=763210", description: "Delicate and exotic flowering plant." },
  { id: 8, name: "Bonsai Tree", price: 800, type: "Indoor", image: "https://t3.ftcdn.net/jpg/03/73/51/74/240_F_373517453_YljqQTvys4CJ8uTKTEuHk89IXc0kSTDr.jpg", description: "Miniature tree for elegant decor." },
  { id: 9, name: "Lavender", price: 250, type: "Outdoor", image: "https://t3.ftcdn.net/jpg/06/51/71/60/240_F_651716019_DM1VPFgrZc3WNwkZgUvxXuh1rOw9FmK5.jpg", description: "Fragrant flowering plant, outdoors." },
  { id: 10, name: "Cactus", price: 180, type: "Succulent", image:"https://t4.ftcdn.net/jpg/08/64/87/23/240_F_864872309_gjijAznznbHs88blOgGbzHPDx6bXAbRc.jpg", description: "Drought-tolerant, low-maintenance cactus." },
  { id: 11, name: "Philodendron", price: 350, type: "Indoor", image: "https://bloomscape.com/wp-content/uploads/2025/07/bloomscape_philodendron-heartleaf_clay_0621-scaled-grey.jpg?ver=1100137", description: "Lush green leaves, easy-care." },
  { id: 12, name: "Rubber Plant", price: 450, type: "Indoor", image: "https://t3.ftcdn.net/jpg/18/86/01/06/240_F_1886010654_OFiamBncMk48YRlfwIH7sYh02CuZDMXT.jpg", description: "Large glossy leaves, indoor favorite." },
];

function ProductList({ cartItems, addToCart, increaseQty, decreaseQty }) {
  const [filterType, setFilterType] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = allProducts.filter(
    p =>
      (filterType === "All" || p.type === filterType) &&
      p.price <= maxPrice &&
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getQty = id => (cartItems || []).find(item => item.id === id)?.qty || 0;

  return (
    <div className="product-container">
      <h2>Our Plants</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search plants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <label>
          Type:
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option>All</option>
            <option>Indoor</option>
            <option>Outdoor</option>
            <option>Succulent</option>
            <option>Flowering</option>
          </select>
        </label>
        <label>
          Max Price: ₹
          <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} min={0} step={50} />
        </label>
      </div>

      <div className="product-grid-vertical">
        {filteredProducts.map(p => (
          <div key={p.id} className="product-card" onClick={() => setSelectedProduct(p)}>
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            {getQty(p.id) === 0 ? (
              <button onClick={(e) => { e.stopPropagation(); addToCart(p); }}>Add to Cart</button>
            ) : (
              <div className="qty-controls" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => decreaseQty(p.id)}>-</button>
                <span>{getQty(p.id)}</span>
                <button onClick={() => increaseQty(p.id)}>+</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p>Price: ₹{selectedProduct.price}</p>

            {getQty(selectedProduct.id) === 0 ? (
              <button className="add-cart" onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
            ) : (
              <div className="qty-controls">
                <button onClick={() => decreaseQty(selectedProduct.id)}>-</button>
                <span>{getQty(selectedProduct.id)}</span>
                <button onClick={() => increaseQty(selectedProduct.id)}>+</button>
              </div>
            )}

            <button className="close-modal" onClick={() => setSelectedProduct(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;