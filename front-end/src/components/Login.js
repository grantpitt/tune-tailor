import styled from "@emotion/styled";
import GreenSpotifyLogo from "../assets/Spotify-Logo.png";

function Login() {
  return (
    <Link href="http://localhost:3001/api/spotify/auth">
      <AuthBtn>
        <SpotifyLogo src={GreenSpotifyLogo} alt="Spotify Logo" />
        <div>Login with Spotify</div>
      </AuthBtn>
    </Link>
  );
}

const SpotifyLogo = styled.img`
  width: 55px;
  height: 55px;
  margin: 0 18px 0 0;
`;

const AuthBtn = styled.div`
  padding: 12px;
  color: var(--white);
  background: var(--black);
  font-weight: 600;
  font-size: 28px;
  width: fit-content;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background: var(--black-hover);
  }
`;

const Link = styled.a`
  text-decoration: none;
`;

export default Login;
