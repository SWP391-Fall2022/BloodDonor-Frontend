
import { React, Component } from "react";
import ReactQuill from "react-quill";
import { Form } from "antd";
import 'react-quill/dist/quill.snow.css';

const normFile = (e) => {
  return e;
};


export default class Editor extends Component {

  constructor(props) {
    super(props);
    this.state = { editorHtml: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ editorHtml: e });
  }

  render() {
    return (
      <>
        <CustomToolbar />

        <Form.Item getValueFromEvent={normFile} className="create-campaign-form-item" name="description" >
          <ReactQuill
            onChange={this.handleChange}
            placeholder="Nhập thông tin chi tiết của chiến dịch"
            modules={Editor.modules}
            formats={Editor.formats}
            theme={"snow"}
            value={this.state.editorHtml || ""}
          />
        </Form.Item>
      </>
    )
  }
}

const CustomToolbar = () => (
  <>
    <div><p style={{ fontWeight: "700" }}>Nội dung chiến dịch</p></div>
    <div id="toolbar" className="toolbar ql-toolbar ql-snow">
      <select className="ql-size" defaultValue={""} onChange={e => e.persist()}>
        <option value="small" />
        <option value="" />
        <option value="large" />
        <option value="huge" />


      </select>

      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <select className="ql-color" defaultValue={""}>
        <option value="" />

        <option value="#e60000" style={{ backgroundColor: "rgb(230, 0, 0)" }} />

        <option value="#ff9900" style={{ backgroundColor: "rgb(255, 153, 0)" }} />

        <option value="#ffff00" style={{ backgroundColor: "rgb(255, 255, 0)" }} />

        <option value="#008a00" style={{ backgroundColor: "rgb(0, 138, 0)" }} />

        <option value="#0066cc" style={{ backgroundColor: "rgb(0, 102, 204)" }} />

        <option value="#9933ff" style={{ backgroundColor: "rgb(153, 51, 255)" }} />
        <option value="#888888" style={{ backgroundColor: "rgb(136, 136, 136)" }} />

        <option value="#a10000" style={{ backgroundColor: "rgb(161, 0, 0)" }} />

        <option value="#b26b00" style={{ backgroundColor: "rgb(178, 107, 0)" }} />

        <option value="#b2b200" style={{ backgroundColor: "rgb(178, 178, 0)" }} />

        <option value="#006100" style={{ backgroundColor: "rgb(0, 97, 0)" }} />
        <option value="#0047b2" style={{ backgroundColor: " rgb(0, 71, 178)" }} />

        <option value="#6b24b2" style={{ backgroundColor: "rgb(107, 36, 178)" }} />


      </select>



      <button className="ql-list" value="ordered" type="button">    </button>

      <button className="ql-list" value="bullet" type="button">    </button>

      <button className="ql-link">
      </button>

      <button className="ql-image">
      </button>


    </div>
  </>
);



Editor.modules = {
  toolbar: {
    container: "#toolbar",

  },
  clipboard: {
    matchVisual: false,
  }
};


Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color"
];
