import { NumbersSharp } from "@mui/icons-material";
const HasData = ({ data, number }) => {
  return (
    <>
      {data.length < number ? (
        <>
          <div className="achievement-chart">
            <img
              src="https://icons.veryicon.com/png/o/internet--web/industrial-icon/empty-18.png"
              className="achievement-avatar"
              alt="chart"
            ></img>
            <div className="achievement-name">Chưa có dữ liệu</div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="achievement-chart">
            <img
              src={data[number - 1].avatar}
              className="achievement-avatar"
              alt="chart"
            ></img>
            <div className="achievement-name">{data[number - 1].name}</div>
          </div>
        </>
      )}
    </>
  );
}
export default HasData;


