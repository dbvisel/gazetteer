import * as React from "react";
import Link from "next/link";
import Layout from "./../../components/Layout";
import data from "../../data/names.json";

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

export const getStaticPaths = async () => {
  const slugs = data.map((x) => x.slug);
  // console.log(slugs);
  return {
    paths: slugs.map((x) => {
      return { params: { slug: x } };
    }),
    fallback: false, // fallback is set to false because we already know the slugs ahead of time
  };
};

export const getStaticProps = async ({ params }) => {
  const thisWord = data.find((x) => x.slug === params.slug);
  const previous = data.find((x) => x.index === params.index - 1);
  const next = data.find((x) => x.index === params.index + 1);
  return {
    props: {
      previous: previous ? previous.slug : null,
      next: next ? next.slug : null,
      word: thisWord,
    },
  };
};

const WordPage = ({ previous, next, word }) => {
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
  } = word;

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
                <Link key={x} href={`/word/${slugify(x)}/`}>
                  <a style={{ marginRight: "1em" }}>{x.trim()}</a>
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
        {rawLat && rawLong ? (
          <iframe
            title={headWord}
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY}&q=${lat},${long}`}
            style={{
              width: "100%",
              height: 800,
              boder: "none",
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : null}
        {data && data.namesJson ? (
          <div>
            <h3>The data:</h3>
            <p>{JSON.stringify(data.namesJson)}</p>
          </div>
        ) : null}
      </article>
      <nav>
        {previous ? (
          <Link href={`/word/${previous.slug}`}>
            <a>{previous.name}←</a>
          </Link>
        ) : null}
        {next ? (
          <Link href={`/word/${next.slug}`}>
            <a>→{next.name}</a>
          </Link>
        ) : null}
      </nav>
    </Layout>
  );
};

export default WordPage;
