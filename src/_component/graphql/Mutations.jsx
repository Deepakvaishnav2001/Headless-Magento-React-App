import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
        token
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!, $firstname: String!, $lastname: String!) {
    createCustomer(
    input: {
      firstname: $firstname
      lastname: $lastname
      email: $email, password: $password
      is_subscribed: true
    }){
        customer{
          firstname
          lastname
          email
        }
    }
  }
`;


export const UPDATE_CUSTOMER_MUTATION = gql`
mutation updateCustomer(
  $firstname: String!
  $lastname: String!
) {
  updateCustomer(
    input: {
      firstname: $firstname
      lastname: $lastname
    }
  ) {
    customer {
      firstname
      lastname
      }
    }
}
`;

export const DELETE_CUSTOMER_MUTATION = gql`
  mutation deleteCustomer($email: String!, $password: String!) {
    deleteCustomer(input: { email: $email, password: $password }) {
      customer {
        firstname
        lastname
        email
      }
    }
  }
`;