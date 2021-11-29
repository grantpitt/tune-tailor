import styled from "@emotion/styled";
import React from "react";

function AudioProgress({ playing, currentTime, duration }) {

  const progressRatio = currentTime / duration;

  return (
    <Bar>
      <Status
        progressRatio={progressRatio}
        playing={playing ? 1 : 0}
      />
    </Bar>
  );
}

const Bar = styled.div`
  position: relative;
  width: 100%;
`;

const Status = styled.div`
  width: ${(props) => props.progressRatio * 100}%;
  height: 0;
  left: 0;
  top: 0;
  display: flex;
  position: absolute;
  max-width: 100%;
  background-color: var(--secondary);
  transition: width 0.2s linear, height 0.2s ease;

  /* height: ${(props) => props.playing ? "10px" : 0}; */
  ${(props) => props.playing && `
    height: 10px;
    box-shadow: rgba(0, 0, 0, 0.125) 0px 1px 4px;
  `}
`;

export default AudioProgress;
