import React from "react";
import CountUp from "react-countup";

const CountUpExample = () => {
  return (
    <h1>
      <CountUp start={0} end={10000} duration={2000} /> 
    </h1>
  );
};

export default CountUpExample;
