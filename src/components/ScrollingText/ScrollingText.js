import React, { Component } from "react";
import scrollingtext from "../ScrollingText/scrollingtext.css";

export default class ScrollingText extends Component {
  render() {
    return (
      <div id="mainmodal">
        <div class="modalconent">
          <marquee class="marquee" behavior="scroll" direction="left">
            <div>
              ......"Đổi mới phong cách, thái độ phục vụ của cán bộ y tế hướng
              tới sự hài lòng của người bệnh" ....... ___ ...... "An toàn thực
              phầm - Hạnh phúc của mọi người" ......
            </div>
          </marquee>
        </div>
      </div>
    );
  }
}
