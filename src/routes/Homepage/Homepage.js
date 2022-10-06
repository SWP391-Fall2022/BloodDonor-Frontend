import React from "react";
import { Navbar } from "../../components/NavBar/navbar";
import Achievements from "./Achievements/Achievement";
import Advice from "./Advice/Advice";
import Benefits from "./Benefits/Benefits";
import Campaign from "./Campaign/Campaign";
import Cover from "./Cover/Cover";
import News from "./News/News";
import QAndA from "./QAndA/QAndA";
import Standard from "./Standard/Standard";
const Homepage = () => {
  return (
    <div>
      <Navbar />
      <div id="homepage">
        <Cover />
        <Benefits />
        <Campaign />
        <Standard/>
        <Advice />
        <News />
        <Achievements />
        <QAndA />
      </div>
      {/* <PageFooter /> */}
    </div>
  );
};

export default Homepage;
