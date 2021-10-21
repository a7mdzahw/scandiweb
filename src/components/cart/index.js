import Counter from "components/counter";
import React, { Component } from "react";
import { connect } from "react-redux";
import emptyCartIco from "assets/empty-cart.png";
import "./cart.css";

class Cart extends Component {
  render() {
    const { items } = this.props;
    return (
      <div className="cart">
        <h2>Cart</h2>
        <div className="items">
          {items.map((item) => {
            const price = item.prices.find(
              (price) => price.currency === this.props.currency
            );
            return (
              <div className="item">
                <div className="right">
                  <h3>{item.brand}</h3>
                  <h4>{item.name}</h4>
                  <p>
                    {price.currency} {price.amount}
                  </p>
                </div>
                <div className="left">
                  <Counter itemId={item.id} count={item.count} />
                  <img src={item.gallery} alt={item.name} />
                </div>
              </div>
            );
          })}
        </div>
        {items.length > 0 ? (
          <button className="check_button">checkout</button>
        ) : (
          <div className="empty_cart">
            <img width="100px" src={emptyCartIco} alt="empty_cart_icon" />
            <p>Cart is Empty</p>
            <button onClick={() => this.props.history.push("/")}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency,
  items: state.cart.items,
});

export default connect(mapStateToProps)(Cart);
