import * as React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { InlineList } from "../components/Layout/elements";

const IndexPage = () => {
  const data = [];
  return (
    <Layout>
      <article>
        <h2>Index</h2>
        <p>
          See just{" "}
          <Link href={`/locations`}>
            <a>locations with coordinates</a>
          </Link>
          .
        </p>
        <h3>Everything:</h3>
        <InlineList>
          {data.map((x, index) => (
            <li key={index}>
              <Link href={`/word/${x.slug}/`}>
                <a>{x.headWord}</a>
              </Link>
            </li>
          ))}
        </InlineList>
      </article>
    </Layout>
  );
};

export default IndexPage;
