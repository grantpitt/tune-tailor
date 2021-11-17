import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

function LoadingAnimation() {
  return (
    <Center>
      <Grid>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Grid>
    </Center>
  );
}

const gridAnimation = keyframes`
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.35;
    }
`;

const Center = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: center;
`;

const Grid = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  & div {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--secondary);
    animation: ${gridAnimation} 1.2s linear infinite;
  }
  & div:nth-of-type(1) {
    top: 8px;
    left: 8px;
    animation-delay: 0s;
  }
  & div:nth-of-type(2) {
    top: 8px;
    left: 32px;
    animation-delay: -0.4s;
  }
  & div:nth-of-type(3) {
    top: 8px;
    left: 56px;
    animation-delay: -0.8s;
  }
  & div:nth-of-type(4) {
    top: 32px;
    left: 8px;
    animation-delay: -0.4s;
  }
  & div:nth-of-type(5) {
    top: 32px;
    left: 32px;
    animation-delay: -0.8s;
  }
  & div:nth-of-type(6) {
    top: 32px;
    left: 56px;
    animation-delay: -1.2s;
  }
  & div:nth-of-type(7) {
    top: 56px;
    left: 8px;
    animation-delay: -0.8s;
  }
  & div:nth-of-type(8) {
    top: 56px;
    left: 32px;
    animation-delay: -1.2s;
  }
  & div:nth-of-type(9) {
    top: 56px;
    left: 56px;
    animation-delay: -1.6s;
  }
`;

export default LoadingAnimation;
