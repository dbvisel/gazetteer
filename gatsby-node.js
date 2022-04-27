const path = require("path");
const wordTemplate = path.resolve(`src/templates/wordPage.js`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        allNamesJson {
          edges {
            node {
              slug
              headWord
              id
            }
            next {
              slug
              headWord
            }
            previous {
              slug
              headWord
            }
          }
        }
      }
    `
  );
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  result.data.allNamesJson.edges.forEach((name) => {
    const path = `/word/${name.node.slug}`;
    if (name.node.headWord) {
      createPage({
        path,
        component: wordTemplate,
        context: {
          id: name.node.id,
          next:
            name.next && name.next.headWord
              ? { slug: name.next.slug, name: name.next.headWord }
              : null,
          previous:
            name.previous && name.previous.headWord
              ? { slug: name.previous.slug, name: name.previous.headWord }
              : null,
        },
      });
    }
  });
};
