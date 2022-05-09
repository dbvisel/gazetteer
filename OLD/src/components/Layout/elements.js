import styled from "styled-components";

export const Wrapper = styled.div`
  & article {
    background-color: var(--white);
    padding: var(--insidePadding);
    border-radius: var(--borderRadius);
    & h2 {
      margin-top: 0;
    }
  }

  & nav {
    margin-top: var(--insidePadding);
    background-color: var(--white);
    padding: var(--insidePadding);
    border-radius: var(--borderRadius);
    display: flex;
    justify-content: space-between;
    & a {
      text-decoration: none;
      background-color: var(--linkColor);
      color: var(--white);
      padding: 8px 12px;
      border-radius: var(--borderRadius);
      font-weight: bold;
      transition: 0.5s;
      user-select: none;
      &:hover {
        opacity: 0.75;
      }
    }
    @media (max-width: 768px) {
      flex-wrap: wrap;
    }
  }

  & footer {
    background-color: var(--white);
    margin-top: var(--insidePadding);
    padding: var(--insidePadding);
    border-radius: var(--borderRadius);
  }
`;

export const InlineList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  & li {
    margin: 0;
    padding: 0;
    display: inline-block;
    margin-right: 1em;
    & a {
      text-decoration: none;
    }
  }
`;
