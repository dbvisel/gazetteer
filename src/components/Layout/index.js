import * as React from "react";
import PropTypes from "prop-types";
import Header from "../Header";
import { Wrapper } from "./elements";

const Layout = ({ children, title }) => {
  return (
    <React.Fragment>
      <Header siteTitle={title ? `Gazetteer: ${title}` : "Gazetteer"} />
      <Wrapper>
        <main>{children}</main>
        <footer>© {new Date().getFullYear()}, footer goes here.</footer>
      </Wrapper>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
