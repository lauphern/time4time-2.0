import React from "react";
import { Link } from "react-router-dom";

const AboutUs = props => {
  return (
    <>
      <p>About us page</p>
      <Link to="/faq">FAQ</Link>
    </>
  );
};

export default AboutUs;
