import { Link } from "react-router-dom";
const Login = () => {
    return <div className="container">
        <h1>ĐĂNG NHẬP</h1>
        <form>
            Tên đăng nhập<input type={"text"} placeholder="Please enter"></input>
            Mật khẩu<input type={"password"} placeholder="Please enter"></input>
            <input type={"submit"}></input>
        </form>
        <h3>Quên mật khẩu?</h3>
        <h3>Chưa có tài khoản? Đăng kí <Link to={"/register"}>tại đây</Link></h3>
        <h3>HOẶC</h3>
    </div>
};

export default Login;