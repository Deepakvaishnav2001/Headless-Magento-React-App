// graphql.js

import { gql } from '@apollo/client';

export const PRODUCTS = gql`
query GetProducts($categoryId: String!){
  products(
    filter: {category_id: {eq: $categoryId}},
    sort: {name: ASC},
    pageSize: 12,
    currentPage: 1
  ) {
    total_count
    items {
      name
      sku
      image {
        url
        label
      }
      price_range {
        minimum_price {
          regular_price {
            value
            currency
          }
          final_price {
            value
            currency
          }
          discount {
            amount_off
            percent_off
          }
        }
        maximum_price {
          regular_price {
            value
            currency
          }
          final_price {
            value
            currency
          }
          discount {
            amount_off
            percent_off
          }
        }
      }
    }
  }
}
`;

export const CATEGORIES_QUERY = gql`
query GetCategories($categoryId: Int!) {
  category(id: $categoryId) {
    id
    name
    children {
      id
      name
      children {
        id
        name
      }
    }
  }
}
`;

export const CUSTOMER_DATA_QUERY = gql`
  {
    customer {
      firstname
      middlename
      lastname
      suffix
      prefix
      gender
      date_of_birth
      taxvat
      created_at
      default_shipping
      default_billing
      email
      is_subscribed
      addresses {
        firstname
        lastname
        street
        city
        region {
          region_code
          region
        }
        postcode
        vat_id
        country_code
        telephone
        company
      }
    }
  }
`;


export const AUTHENTICATE_CUSTOMER = gql`
  {
    customer {
      email
    }
  }
`;

export const GET_PRODUCT_BY_SKU_QUERY = gql`
query getProductBySku($sku: String!) {
  products(filter: { sku: { eq: $sku } }) {
    items {
      id
      sku
      name
      description {
        html
      }
      short_description {
        html
      }
      image {
        url
        label
      }
      media_gallery_entries {
        id
        file
        label
      }
      price_range {
        minimum_price {
          final_price {
            value
            currency
          }
          regular_price {
            value
            currency
          }
        }
      }
      categories {
        id
        name
        breadcrumbs {
          category_name
          category_id
        }
      }
      ... on ConfigurableProduct {
        configurable_options {
          id
          label
          values {
            value_index
            label
            swatch_data {
              value
              ... on ImageSwatchData {
                thumbnail
              }
            }
          }
        }
        variants {
          product {
            id
            sku
            name
            price_range {
              minimum_price {
                final_price {
                  value
                  currency
                }
                regular_price {
                  value
                  currency
                }
              }
            }
            media_gallery_entries {
              id
              file
              label
            }
          }
        }
      }
    }
  }
}
`;