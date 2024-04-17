import React from 'react';
import { useQuery } from '@apollo/client';
import { PRODUCTS } from '../_component/graphql/Query';
import { useParams, Link } from "react-router-dom";
import { Box, Container } from '@mui/system';
import ProductCard from '../_component/ProductCard';
import '../_component/css/CategoryPage.css';


const CategoryPage = () => {
    const param = useParams();
    const selectedCategoryId = param.id;

    const { loading, error, data } = useQuery(PRODUCTS, {
        variables: { categoryId: selectedCategoryId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
       <>
            <Container maxWidth='xl' style={{ marginTop: 90, display: 'flex', justifyContent: "center", flexDirection: "column" }}>
                {loading}
                <Container maxWidth='xl' style={{ marginTop: 10, display: "flex", justifyContent: 'center', flexWrap: "wrap", paddingBottom: 20, marginBottom: 30, width: '100%' }}>
                    {data.products.items.map(prod => (
                        <Link to={`/product_id/${prod.sku}`} key={prod.sku}>
                            <ProductCard prod={prod} />
                        </Link>
                    ))}
                </Container>
            </Container >
        </>
    );
};

export default CategoryPage;