import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { CUSTOMER_DATA_QUERY } from '../_component/graphql/Query.jsx';

const MyAccount = () => {  
    const { loading, error, data } = useQuery(CUSTOMER_DATA_QUERY, {
        context: {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    });

    // Use the data from the GraphQL query
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
  
    const { customer } = data;
  
    return (
      <div>
        <h2>Customer Information</h2>
        <p>Name: {customer.firstname} {customer.lastname}</p>
        <p>Email: {customer.email}</p>
        <h3>Addresses</h3>
        {customer.addresses.map((address, index) => (
          <div key={index}>
            <p>
              {address.firstname} {address.lastname}
              <br />
              {address.street}
              <br />
              {address.city}, {address.region.region} {address.postcode}
              <br />
              {address.country.full_name} ({address.country.code})
              <br />
              Phone: {address.telephone}
            </p>
          </div>
        ))}
      </div>
    );
  };
  
export default MyAccount;