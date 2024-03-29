import * as React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { HeaderDiv } from "./elements";

const Header = ({ siteTitle }) => (
  <HeaderDiv>
    <h1>
      <Link href="/">
        <a>{siteTitle}</a>
      </Link>
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
