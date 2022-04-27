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
              id
            }
          }
        }
      }
    `
  );
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  // Create pages for each markdown file.
  result.data.allNamesJson.edges.forEach(({ node }) => {
    const path = `/word/${node.slug}`;
    createPage({
      path,
      component: wordTemplate,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        id: node.id,
      },
    });
  });
};
