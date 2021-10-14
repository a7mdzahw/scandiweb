import { gql } from "@apollo/client";

export const get_products = gql`
  query GetCategory($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        id
        name
        inStock
        gallery
        prices {
          currency
          amount
        }
      }
    }
  }
`;

export const get_product = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      brand
      gallery
      prices {
        amount
        currency
      }
      attributes {
        name
        type
        items {
          displayValue
          value
        }
      }
      description
    }
  }
`;
