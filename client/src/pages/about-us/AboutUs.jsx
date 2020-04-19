import React from "react";
import { Link } from "react-router-dom";

import "./AboutUs.scss";

const AboutUs = (props) => {
  return (
    <section className="about-us">
      <h1>About us</h1>
      <h2>Time 4 Time 1.0 - 2019</h2>
      <p>
        Time 4 Time was born in March 2019 in the context of a{" "}
        <strong>Full-stack Web Development bootcamp</strong> at Ironhack
        Netherlands.
      </p>
      <p>
        It was the final project for the bootcamp, developed by{" "}
        <a href="https://github.com/TiaIvonne" target="_blank">
          Ivonne Y. Mendoza
        </a>
        , who had the original idea, and{" "}
        <a href="https://github.com/lauphern" target="_blank">
          Laura Pascual
        </a>
        .
      </p>
      <p>
        Time 4 Time was developed in a{" "}
        <strong>sprint of one week and a half</strong>. To achieve it, we
        combined <strong>pair programming with individual programming</strong>.
      </p>
      <p>
        We used the <strong>MERN stack</strong> (MongoDB, Express, React.js and
        Node.js).
      </p>
      <p>
        You can{" "}
        <a href="https://www.time4time.org/" target="_blank">
          visit the first demo of Time 4 Time
        </a>{" "}
        or{" "}
        <a href="https://github.com/lauphern/final-project" target="_blank">
          check out the code
        </a>
        .
      </p>
      <h2>Time 4 Time 2.0 - 2020</h2>
      <p>
        In late 2019 I, Laura Pascual, decided to keep working in this project
        as a way to keep learnning. I have done that in my free time while I was
        working, and it is still a work in progress.
      </p>
      <p>Some of the changes I have implemented are:</p>
      <ul>
        <li>
          <span>Redesign</span>: in the first version we were using Bulma. In
          order to improve my CSS code and learn more, I decided to do all the design
          implementation from scratch.
        </li>
        <li>
          <span>Refactor</span>: I have done a folder restructure and removed
          duplicated code and focused on creating reusable components.
        </li>
        <li>
          <span>Cloud storage</span>: something we wanted to implement on the
          first version, but didn't have enough time, was cloud storage for the
          pictures the user uploads. I have done that now with AWS.
        </li>
        <li>
          <span>Database</span>: I migrated the database from MondoDB to
          Firestore (Google Cloud).
        </li>
      </ul>
      <p>
        You can find the repository for this new version of Time 4 Time in <a href="https://github.com/lauphern/time4time-2.0" target="_blank">my
        github profile</a>.
      </p>
      <p>
        Do you have any questions? Please check out our{" "}
        <Link to="/faq">FAQ</Link>.
      </p>
    </section>
  );
};

export default AboutUs;
