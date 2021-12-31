import Login from "../components/Login";
import styled from "@emotion/styled";

function Home() {
  return (
    <Main>
      <H1>
        Welcome to <br /> Tune Tailor
      </H1>
      <P>Find a tune perfectly tailored to today's outfit.</P>
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
  background: var(--primary);
  padding: 1rem;
  box-sizing: border-box;
`;

const H1 = styled.h1`
  font-weight: 700;
  width: fit-content;
  text-align: center;
  font-size: 6.5rem;
  line-height: 6.5rem;
  padding-bottom: 0.125rem;
  letter-spacing: -0.04em;
  margin: 0;
  color: var(--secondary);

  @media only screen and (max-width: 600px) {
    font-size: 3.8rem;
    line-height: 3.8rem;
  }
`;

const P = styled.p`
  padding-bottom: 12px;
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  color: var(--white);
  @media only screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;

export default Home;
