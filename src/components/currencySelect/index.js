import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrency } from "store/currency";

import "./currencySelect.css";

class CurrencySelect extends Component {
  render() {
    return (
      <select
        className="currency_select"
        onChange={(e) => this.props.setCurrency(e.target.value)}
      >
        <option value="USD">$ USD</option>
        <option value="RUB">₽ RUB</option>
        <option value="JPY">¥ JPY</option>
      </select>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrency: (currency) => dispatch(setCurrency(currency)),
});

export default connect(null, mapDispatchToProps)(CurrencySelect);
