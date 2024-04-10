import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
function Login({ onLogin }) {
  const api = "http://localhost:3001/user";
  const [loginEmail, setLoginEmai] = useState("");
  const [loginPassword, SetLoginPassword] = useState("");

  //  ERR
  const [loginEmailErr, SetEmailErr] = useState("");
  const [loginPasswordErr, SetPasswordErr] = useState("");

  // NAV
  const navigate = useNavigate()

  // nếu có thay đổi
  useEffect(() => {
    if (loginPassword === "" && loginEmail === "") return;
    fetch(api)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Đã gặp lỗi");
        }
        return res.json();
      })
      .then((datas) => {
        const dataUser = datas.map((data) => data.email);
        if (dataUser.includes(loginEmail)) {
          SetEmailErr("");
          //  xử lí mật khẩu
          const user = datas.find((data) => data.email === loginEmail);
          // lấy được mật khẩu đúng của tài khoản này
          const userPassword = user.password;
          if (loginPassword === userPassword) {
            // lưu trữ người dùng
            SetPasswordErr("");
          } else {
            SetPasswordErr("Mật khẩu không đúng");
          }
        } else {
          SetEmailErr("Tài khoản không đúng");
        }
      });
  }, [loginPassword, loginEmail]);
  function hanndleSubmit(e) {
    e.preventDefault();
    if(loginEmailErr === "" && loginPasswordErr ===""){
        onLogin(loginEmail)
        setLoginEmai('')
        SetLoginPassword('')
        navigate('/')
    }
    else{
      return;
    }
    

  }
  return (
    <div style={{ marginTop: "20px" }}>
      <form onSubmit={(e) => hanndleSubmit(e)}>
        {/* <!-- Email input --> */}

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="login-email">
            Nhập Email
          </label>
          <input
            name="login-email"
            type="email"
            id="login-email"
            className="form-control"
            value={loginEmail}
            onChange={(e) => setLoginEmai(e.target.value)}
          />
          <span className="err">{loginEmailErr}</span>
        </div>

        {/* <!-- Password input --> */}

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="login-password">
            Mật khẩu của bạn
          </label>
          <input
            name="login-password"
            type="password"
            id="login-password"
            className="form-control"
            value={loginPassword}
            onChange={(e) => SetLoginPassword(e.target.value)}
          />
          <span className="err">{loginPasswordErr}</span>
        </div>

        {/* <!-- 2 column grid layout for inline styling --> */}

        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            {/* <!-- Checkbox --> */}

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="form2Example31"
              />
              <label className="form-check-label" htmlFor="form2Example31">
                {" "}
                Remember me{" "}
              </label>
            </div>
          </div>

          <div className="col">
            {/* <!-- Simple link --> */}

            <a href="#!">Quên mật khẩu?</a>
          </div>
        </div>

        {/* <!-- Submit button --> */}

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Đăng nhập
        </button>

        {/* <!-- Register buttons --> */}

        <div className="text-center">
          <p>
            Chưa có tài khoản? <Link to={"/register"}>Đăng kí</Link>
          </p>
          <p>Đăng nhập với: </p>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <FaFacebook />
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <FaGoogle />
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <FaTwitter />
          </button>
        </div>
      </form>
    </div>
  );
}
export default Login;
