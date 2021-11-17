import Login from "../components/Login";
import styled from "@emotion/styled";

function Home() {
  return (
    <Main>
      <H1>Welcome to Tune Tailor</H1>
      <P>
        Find a tune perfectly tailored to today's outfit.
      </P>
      <Login />
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  margin: 0;
  color: #2c3e50;
  background: var(--primary)
`;

const H1 = styled.h1`
  font-weight: 700;
  width: fit-content;
  max-width: 754px;
  text-align: center;
  font-size: 104px;
  line-height: 104px;
  padding-bottom: 4px;
  letter-spacing: -0.04em;
  margin: 0;
  color: var(--secondary);
`;

const P = styled.p`
  max-width: 425px;
  padding-bottom: 12px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: var(--black);
`;

export default Home;
