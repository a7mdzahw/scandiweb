import { withApollo } from "@apollo/client/react/hoc";
import React, { Component } from "react";
import { get_products } from "services/queries/products";
import { withRouter } from "react-router-dom";

import "./products.css";
import { connect } from "react-redux";

class Products extends Component {
  state = {
    currency: "USD",
    category: {},
    products: [],
    error: null,
    loading: true,
  };

  getProducts = () => {
    this.setState({ loading: true });
    this.props.client
      .query({
        query: get_products,
        variables: { input: { title: this.props.match.params.name } },
      })
      .then(({ data }) => {
        this.setState({
          products: data.category.products,
          category: data.category,
        });
      })
      .catch((error) => this.setState({ error: error.message }))
      .finally(() => this.setState({ loading: false }));
  };

  componentDidUpdate(prevProps) {
    const isChanged =
      prevProps.match.params.name !== this.props.match.params.name;
    if (isChanged) this.getProducts();
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    if (this.state.loading) return "loading...";
    if (this.state.error) return <div>error</div>;
    return (
      <div class="products_page">
        <h2>{this.state.category.name}</h2>
        <div className="products">
          {this.state.products.map((p) => {
            const price = p.prices.find(
              (price) => price.currency === this.props.currency
            );
            return (
              <div
                className="card"
                onClick={() => this.props.history.push(`/product/${p.id}`)}
              >
                <img src={p.gallery} alt="" />
                <h4>{p.name}</h4>
                <span>
                  {price.currency} {price.amount}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency,
});

export default connect(mapStateToProps)(withRouter(withApollo(Products)));
