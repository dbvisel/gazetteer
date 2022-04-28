import { graphql } from "gatsby";
import WordPage from "../../templates/wordPage";

export default WordPage;

export async function config() {
  const { data } = graphql`
    {
      wordPosts: allNamesJson(
        filter: {
          headWord: { ne: null }
          slug: { ne: null }
          index: { gt: 99 }
        }
      ) {
        nodes {
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
    }
  `;
  const wordPosts = new Set(data.wordPosts.nodes.map((n) => n.slug));
  return ({ params }) => {
    return {
      defer: wordPosts.has(params.slug),
    };
  };
}
