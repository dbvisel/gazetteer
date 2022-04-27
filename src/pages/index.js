import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import { InlineList } from "../components/Layout/elements";

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
      <article>
        <h2>Index</h2>
        <InlineList>
          {data.map((x, index) => (
            <li key={index}>
              <Link to={`/word/${x.slug}/`}>{x.headWord}</Link>
            </li>
          ))}
        </InlineList>
      </article>
    </Layout>
  );
};

export default IndexPage;
