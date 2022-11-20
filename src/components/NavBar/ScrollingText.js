import React, { Component } from "react";
import scrollingtext from "./scrollingtext.css";

export default class ScrollingText extends Component {
  render() {
    return (
      <div id="mainmodal">
        <div className="modalconent">
          <marquee className="marquee" behavior="scroll" direction="left" pauseOnHover="true">
            <div>
              ......"Hiến máu hôm nay - Sức khỏe ngày mai" ...... ___ ...... "Hiến giọt máu đào - Trao đời sự sống"...... ___ ......"Mỗi giọt máu cho đi, một cuộc đời ở lại"......
            </div>
          </marquee>
        </div>
      </div>
    );
  }
}
