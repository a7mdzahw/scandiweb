import Cart from "assets/cart";
import CurrencySelect from "components/currencySelect";
import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { get_categories } from "../../services/queries/categories";
import { withApollo } from "@apollo/client/react/hoc";

import "./navbar.css";
import { connect } from "react-redux";

class Navbar extends Component {
  state = {
    categories: [],
  };

  client = this.props.client;

  componentDidMount() {
    this.client
      .query({ query: get_categories })
      .then(({ data }) => this.setState({ categories: data.categories }));
  }

  render() {
    return (
      <div className="navbar">
        <div className="cat_list">
          {this.state.categories.map((c) => (
            <NavLink to={`/category/${c.name}`} className="list-item">
              {c.name}
            </NavLink>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <CurrencySelect />
          <Link className="cart_link" to="/cart">
            <Cart />
            <div className="count_badge">
              <p>{this.props.itemsCount}</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

const getItemsCount = (items) =>
  items.reduce((acc, { count }) => acc + count, 0);

const mapStateToProps = (state) => ({
  itemsCount: getItemsCount(state.cart.items),
});

export default connect(mapStateToProps)(withApollo(Navbar));
