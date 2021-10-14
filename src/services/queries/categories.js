import { gql } from "@apollo/client";

export const get_categories = gql`
  query Query {
    categories {
      name
    }
  }
`;
