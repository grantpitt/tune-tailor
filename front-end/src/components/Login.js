import styled from "@emotion/styled";
import GreenSpotifyLogo from "../assets/black-spotify-logo.png";

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
  width: 45px;
  height: 45px;
  margin: 0 18px 0 0;
  filter: brightness(0) invert(1);
`;

const AuthBtn = styled.div`
  padding: 12px;
  color: var(--white);
  background: var(--black);
  font-weight: 600;
  font-size: 24px;
  width: fit-content;
  border-radius: 14px;
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
