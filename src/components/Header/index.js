import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { HeaderDiv } from "./elements";

const Header = ({ siteTitle }) => (
  <HeaderDiv>
    <h1>
      <Link to="/">{siteTitle}</Link>
    </h1>
  </HeaderDiv>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
