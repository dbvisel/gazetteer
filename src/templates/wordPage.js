import * as React from "react";
import { graphql, Link } from "gatsby";
import Layout from "./../components/Layout";

const WordPage = ({ data, pageContext }) => {
  const { previous, next } = pageContext;
  const { headWord, original, rest, rawLat, rawLong, primary } = data.namesJson;
  return (
    <Layout>
      <article>
        <h2>{headWord || original}</h2>
        <ul>
          <li>
            <strong>Original:</strong> {original}
          </li>
          <li>
            <strong>Primary/secondary: </strong>{" "}
            {primary ? "primary" : "secondary"}
          </li>
          {rawLat && rawLong ? (
            <React.Fragment>
              <li>
                <strong>Latitude: </strong> {rawLat}
              </li>
              <li>
                <strong>Longitude: </strong> {rawLong}
              </li>
              <li>
                <strong>Rest: </strong> {rest}
              </li>
            </React.Fragment>
          ) : null}
        </ul>
        <h3>The data:</h3>
        <p>{JSON.stringify(data.namesJson)}</p>
      </article>
      <nav>
        {previous ? (
          <Link to={`/word/${previous.slug}`}>{previous.name}←</Link>
        ) : null}
        {next ? <Link to={`/word/${next.slug}`}>→{next.name}</Link> : null}
      </nav>
    </Layout>
  );
};

export const query = graphql`
  query WordPageQuery($id: String!) {
    namesJson(id: { eq: $id }) {
      id
      original
      slug
      rest
      index
      headWord
      rawLat
      rawLong
      primary
    }
  }
`;

export default WordPage;
