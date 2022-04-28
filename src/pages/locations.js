import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import { InlineList } from "../components/Layout/elements";

const LocationPage = () => {
  const data = useStaticQuery(graphql`
    {
      allNamesJson(
        filter: {
          headWord: { ne: null }
          lat: { ne: null }
          long: { ne: null }
        }
        sort: { fields: index }
      ) {
        nodes {
          headWord
          slug
          lat
          long
        }
      }
    }
  `).allNamesJson.nodes;
  return (
    <Layout>
      <article>
        <h2>Locations</h2>
        <InlineList>
          {data.map((x, index) => (
            <li key={index}>
              <Link to={`/word/${x.slug}/`}>{x.headWord}</Link>{" "}
              <a
                href={`https://www.google.com/maps?q=${x.lat},${x.long}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--black)" }}
              >
                ({x.lat}, {x.long})
              </a>
            </li>
          ))}
        </InlineList>
      </article>
    </Layout>
  );
};

export default LocationPage;
