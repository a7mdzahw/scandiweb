import Cart from "assets/cart";
import CurrencySelect from "components/currencySelect";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { get_categories } from "../../services/queries/categories";
import { withApollo } from "@apollo/client/react/hoc";

import "./navbar.css";

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
          <Cart />
        </div>
      </div>
    );
  }
}

export default withApollo(Navbar);
