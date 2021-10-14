import React, { Component } from "react";
import { withApollo } from "@apollo/client/react/hoc";
import { get_product } from "services/queries/products";

import "./productDetail.css";
import { connect } from "react-redux";
import { addItem } from "store/cart";

class ProductDetail extends Component {
  state = {
    product: {},
    currency: "USD",
  };

  getProduct = () => {
    this.props.client
      .query({
        query: get_product,
        variables: { id: this.props.match.params.id },
      })
      .then(({ data }) => this.setState({ product: data.product }));
  };

  componentDidMount() {
    this.getProduct();
  }

  render() {
    const { product } = this.state;
    const price =
      product.prices?.find((price) => price.currency === this.props.currency) ||
      {};
    return (
      <div className="product_detail">
        <img src={product.gallery} alt={product.id} />
        <div className="detail">
          <h3>{product.brand}</h3>
          <h4>{product.name}</h4>
          <div className="price">
            <p>Price:</p>
            <p>
              {price.currency} {price.amount}
            </p>
          </div>
          <button onClick={() => this.props.addItem(product)}>
            ADD TO CART
          </button>
          <div
            className="desc"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ currency: state.currency });
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(ProductDetail));
