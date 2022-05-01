import * as React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { InlineList } from "../components/Layout/elements";
import data from "./../data/names.json";

export async function getStaticProps() {
  const filteredData = data
    .filter((x) => x.headWord && x.lat && x.long)
    .sort((a, b) => a.index - b.index);

  return {
    props: {
      data: filteredData,
    },
  };
}

const LocationPage = ({ data }) => {
  return (
    <Layout>
      <article>
        <h2>Locations</h2>
        <p>(Clicking on coordinates opens Google Maps in a new tab.)</p>
        <InlineList>
          {data.map((x, index) => (
            <li key={index}>
              <Link href={`/word/${x.slug}/`}>
                <a>{x.headWord}</a>
              </Link>{" "}
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
