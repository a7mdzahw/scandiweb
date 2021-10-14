import React, { Component } from "react";
import { connect } from "react-redux";
import { decrementItem, incrementItem } from "store/cart";

import "./counter.css";

class Counter extends Component {
  render() {
    const { itemId } = this.props;
    return (
      <div className="counter">
        <button onClick={() => this.props.incrementItem(itemId)}>+</button>
        <p>{this.props.count}</p>
        <button onClick={() => this.props.decrementItem(itemId)}>-</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  incrementItem: (id) => dispatch(incrementItem(id)),
  decrementItem: (id) => dispatch(decrementItem(id)),
});

export default connect(null, mapDispatchToProps)(Counter);
