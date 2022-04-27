import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Layout from "../components/Layout";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      allNamesJson(
        filter: { headWord: { ne: null } }
        sort: { fields: index }
      ) {
        nodes {
          headWord
          slug
        }
      }
    }
  `).allNamesJson.nodes;
  return (
    <Layout>
      <h2>Index</h2>
      <ul>
        {data.map((x, index) => (
          <li key={index}>
            <Link to={`/word/${x.slug}/`}>{x.headWord}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default IndexPage;
