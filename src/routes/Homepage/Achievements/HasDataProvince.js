import { NumbersSharp } from "@mui/icons-material";
const HasDataProvince = ({ data, number }) => {
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
                  src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-vector%2Fstylized-simple-outline-map-vietnam-icon-blue-sketch-map-vietnam-vector-illustration_18657929.htm&psig=AOvVaw1f5rxdIvw33J9aK3DPQwoD&ust=1668082078063000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCPisj4-IofsCFQAAAAAdAAAAABAF"
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
export default HasDataProvince;


