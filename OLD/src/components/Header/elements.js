import styled from "styled-components";

export const HeaderDiv = styled.header`
  background-color: var(--white);
  display: flex;
  height: var(--headerHeight);
  padding: var(--insidePadding);
  border-radius: var(--borderRadius);
  align-items: center;
  margin-bottom: var(--insidePadding);
  & h1 {
    margin: 0;
    & a {
      text-decoration: none;
    }
  }
`;
