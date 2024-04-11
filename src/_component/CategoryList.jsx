import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { CATEGORIES_QUERY } from './graphql/Query';
import { Link } from "react-router-dom";



const CategoryList = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(2);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);

  const { loading, error, data } = useQuery(CATEGORIES_QUERY, {
    variables: { categoryId: selectedCategoryId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  const handleCategoryEnter = (categoryId) => {
    setHoveredCategoryId(categoryId);
  };

  const handleCategoryLeave = () => {
    setHoveredCategoryId(null);
  };

  return (
    <div>
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
      </ul>
    </div>
  );
};

export default CategoryList;