import React from "react";
// import { PageFooter } from "../../components/Footer/PageFooter";
// import { Navbar } from "../../components/navbar";
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
      {/* <Navbar /> */}
      <div id="homepage">
        something
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
