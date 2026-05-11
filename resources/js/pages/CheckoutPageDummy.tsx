import React from 'react';

const CheckoutPageDummy = () => {
  const handlePlaceOrder = () => {
    // Logic to place the order will be implemented here
    console.log('Placing order...');
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default CheckoutPageDummy;
