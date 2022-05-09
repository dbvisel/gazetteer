import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
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

const containerStyle = {
  width: "100%",
  height: "800px",
  flexGrow: "1",
};

const center = {
  lat: 0,
  lng: 114,
};

const zoom = 4;

const LocationPage = ({ data }) => {
  const router = useRouter();

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY}
    >
      <Layout>
        <article>
          <h2>Locations</h2>
          <p>(Clicking on coordinates opens Google Maps in a new tab.)</p>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
          >
            {data.map((x, index) => (
              <Marker
                key={index}
                position={{ lat: x.lat, lng: x.long }}
                title={x.headWord}
                onClick={(e) => {
                  router.push(`/word/${x.slug}/`);
                }}
              />
            ))}
          </GoogleMap>
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
    </LoadScript>
  );
};

export default LocationPage;
