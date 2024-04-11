import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { PRODUCTS } from '../_component/graphql/Query';
import { useParams, Link } from "react-router-dom";



const CategoryPage = () => {
    const param = useParams();
    const selectedCategoryId = param.id;

    const { loading, error, data } = useQuery(PRODUCTS, {
        variables: { categoryId: selectedCategoryId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {data.products.items.map((item) => (
                <li key={item.sku}>{item.name}</li>
            ))}{/* 
      <ul>
        {data.category.children.map((category) => (
          <li key={category.id} 
          onMouseEnter={() => handleCategoryEnter(category.id)}
          onMouseLeave={handleCategoryLeave}
          >
            &gt; <Link to={`cat/${category.id}`}> {category.name} </Link>
            {hoveredCategoryId === category.id && (
              <ul>
                {category.children.map((subcategory) => (
                  <li key={subcategory.id} > &gt; <Link to={`cat/${subcategory.id}`}> {subcategory.name} </Link></li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul> */}
        </div>
    );
};

export default CategoryPage;