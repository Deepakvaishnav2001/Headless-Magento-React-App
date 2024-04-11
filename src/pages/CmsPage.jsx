import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link, useParams } from "react-router-dom";


const CMS_PAGE_QUERY = gql`
  query GetCmsPage($CMS_PAGE_QUERY: String!) {
    cmsPage(identifier: $CMS_PAGE_QUERY) {
      title
      url_key
      content_heading
      content
      page_layout
      meta_title
      meta_keywords
      meta_description
    }
  }
`;

const CmsPage = () => {
    console.log(useParams());
    const [cmsPage, setCmsPage] = useState('home');

    const { loading, error, data } = useQuery(CMS_PAGE_QUERY, {
        variables: { CMS_PAGE_QUERY: cmsPage },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <div>
                {data.cmsPage.content}
        </div>
    );
};

export default CmsPage;