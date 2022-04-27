import * as React from "react";
import { graphql } from "gatsby";
import Layout from "./../components/Layout";

const WordPage = ({ data }) => {
  const thisWord = data.namesJson;
  // console.log(thisWord);
  return (
    <Layout>
      <h1>{thisWord.headWord || thisWord.original}</h1>
      <p>{JSON.stringify(thisWord)}</p>
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
    }
  }
`;

export default WordPage;
