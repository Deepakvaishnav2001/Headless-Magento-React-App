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
