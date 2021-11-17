import styled from "@emotion/styled";
import { Link } from "react-router-dom";

function Header({ username }) {
  return (
    <Main>
      <Title>Tune Tailor</Title>
      <div>
        <HeadingLink to="/feed">Feed</HeadingLink>
        <HeadingLink to="/profile">{username}</HeadingLink>
      </div>
    </Main>
  );
}

const Main = styled.div`
  height: 50px;
  width: 100%;
  background: #faf6f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--primary);
  position: fixed;
  z-index: 99;
`;

const Title = styled.span`
  font-size: 28px;
  margin: 0 1rem;
  font-weight: 700;
  color: var(--secondary);
`;

const HeadingLink = styled(Link)`
  font-size: 22px;
  margin: 0 1rem 0 0.5rem;
  font-weight: 600;
  color: var(--secondary);
  text-decoration: none;
  &:hover {
    cursor: pointer;
    text-decoration: solid underline 3px;
  }
`;

export default Header;
