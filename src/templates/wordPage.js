import * as React from "react";
import { graphql, Link } from "gatsby";
import Layout from "./../components/Layout";

const slugify = (str) => {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  const to = "aaaaeeeeiiiioooouuuunc------";
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
};

const WordPage = ({ data, pageContext }) => {
  const { previous, next } = pageContext;
  const {
    headWord,
    original,
    rawLat,
    rawLong,
    primary,
    definition,
    others,
    lat,
    long,
  } = data.namesJson;
  const otherList = others ? others.split(";") : [];
  return (
    <Layout>
      <article>
        <h2>{headWord || original}</h2>
        <ul>
          {definition ? (
            <li>
              <strong>Definition:</strong> {definition}
            </li>
          ) : null}
          {otherList.length ? (
            <li>
              <strong>Other:</strong>{" "}
              {otherList.map((x) => (
                <Link
                  key={x}
                  to={`/word/${slugify(x)}/`}
                  style={{ marginRight: "1em" }}
                >
                  {x.trim()}
                </Link>
              ))}
            </li>
          ) : null}
          {rawLat && rawLong ? (
            <React.Fragment>
              <li>
                <strong>Latitude: </strong> {rawLat} · {lat}
              </li>
              <li>
                <strong>Longitude: </strong> {rawLong} · {long}
              </li>
            </React.Fragment>
          ) : null}
          <li>
            <strong>Original:</strong> {original}
          </li>
          <li>
            <strong>Primary/secondary: </strong>{" "}
            {primary ? "primary" : "secondary"}
          </li>
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
      others
      definition
      lat
      long
    }
  }
`;

export default WordPage;
