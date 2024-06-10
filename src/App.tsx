import { useState } from "react";
import "./App.css";

type availableDrinks = "coffee" | "tea" | "milk" | "coke" | "beer";

const prices: Record<availableDrinks, number> = {
  coffee: 480,
  tea: 280,
  milk: 180,
  coke: 190,
  beer: 580,
};

const defaultPrices: Record<availableDrinks, number> = {
  coffee: 0,
  tea: 0,
  milk: 0,
  coke: 0,
  beer: 0,
};

function App() {
  const [orderCount, setOrderCount] = useState(defaultPrices);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleOrder = (drink: availableDrinks) => {
    setOrderCount((prev) => ({
      ...prev,
      [drink]: prev[drink] + 1,
    }));
    setTotalCount((prev) => prev + 1);
    setTotalPrice((prev) => prev + prices[drink]);
  };

  return (
    <div className="app-wrapper">
      <div className="buttons-wrapper">
        {Object.keys(prices).map((drink) => (
          <button
            key={drink}
            id={drink}
            data-testid={drink}
            onClick={() => handleOrder(drink as availableDrinks)}
          >
            {drink.charAt(0).toUpperCase() + drink.slice(1)}{" "}
            {prices[drink as availableDrinks]} yen
            {
              <div
                id={`${drink}-count`}
                data-testid={`${drink}-count`}
                className="badge"
              >
                {orderCount[drink as availableDrinks]}
              </div>
            }
          </button>
        ))}
      </div>
      <div className="totals">
        <p className="title">Your bill</p>
        <div id="count-wrapper">
          Items Ordered: <span id="count">{totalCount}</span>
        </div>
        <div id="price-wrapper">
          Total Price: <span id="price">{totalPrice}</span> yen
        </div>
      </div>
    </div>
  );
}

export default App;
