import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
function Register() {
  // api register
  const api = "http://localhost:3001/register";

  // các giá  trị
  const [registerName, SetRegisterName] = useState("");
  const [registerEmail, SetRegisterEmail] = useState("");
  const [registerPassword, SetRegisterPassword] = useState("");
  const [registerPassword2nd, SetRegisterPassword2nd] = useState("");
  // báo lỗi
  const [registerNameErr, SetRegisterNameErr] = useState("");
  const [registerEmailErr, SetRegisterEmailErr] = useState("");
  const [registerPasswordErr, SetRegisterPasswordErr] = useState("");
  const [registerPassword2ndErr, SetRegisterPassword2ndErr] = useState("");
  // email tồn tại
  const [emailExists, SetEmailExists] = useState(false);
  // đóng đăng kí thành công
  const registerSucces = document.querySelector(".wrap-register-success");

  useEffect(() => {
    if (registerEmail === "") return;
    fetch(api)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Đã xảy ra lỗi !!1");
        }
        return res.json();
      })
      .then((data) => {
        const dataEmail = data.map((data) => data.email);
        if (dataEmail.includes(registerEmail)) {
          SetEmailExists(true);
          SetRegisterEmailErr("Email đã tồn tại, vui lòng nhập email khác");
        } else {
          SetEmailExists(false);
          SetRegisterEmailErr("");
        }
      })
      .catch((e) => {
        console.log("Đã gặp lỗi:", e);
      });
  }, [registerEmail]);

  function handleSubmit(e) {
    e.preventDefault();
    //kiểm tra các điều kiện
    // --- Name
    if (registerName.length < 5 || registerName.length > 30) {
      SetRegisterNameErr("Tên phải từ 5 đến 30 ký tự.");
      return;
    } else if (!isNaN(registerName.charAt(0))) {
      SetRegisterNameErr("Tên không được bắt dầu bằng số");
      return;
    } else {
      SetRegisterNameErr("");
    }
    // --- Email
    if (!/^\S+@\S+\.\S+$/.test(registerEmail)) {
      SetRegisterEmailErr("Email không hợp lệ.");
      return;
    } else if (registerEmail.length < 6 || registerEmail.length > 30) {
      SetRegisterEmailErr("Email phải từ 6 đến 30 ký tự.");
      return;
    } else if (!isNaN(registerEmail.charAt(0))) {
      SetRegisterEmailErr("Tên Email không được bắt bằng số");
      return;
    } else if (emailExists) {
      return;
    } else {
      SetRegisterEmailErr("");
    }

    // password
    if (registerPassword.length < 8 || registerPassword.length > 20) {
      SetRegisterPasswordErr("Mật phải từ 8 đến 20 ký tự.");
      return;
    } else if (
      !/[A-Z]/.test(registerPassword) ||
      !/\d/.test(registerPassword)
    ) {
      SetRegisterPasswordErr(
        "Mật khẩu phải bao gồm ít nhất 1 kí tự in hoa và số"
      );
      return;
    } else {
      SetRegisterPasswordErr("");
    }
    //  password khác nhau
    if (registerPassword !== registerPassword2nd) {
      SetRegisterPassword2ndErr("Mật khẩu không trùng khớp");
      return;
    } else {
      SetRegisterPassword2ndErr("");
    }

    // thực hiện thêm dữ liệu
    if (
      registerEmailErr === "" &&
      registerNameErr === "" &&
      registerPasswordErr === "" &&
      registerPassword2ndErr === "" &&
      !emailExists
    ) {
      console.log("thành công");
      const registerForm = {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      };
      fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "applation/json",
        },
        body: JSON.stringify(registerForm),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Đã xảy ra lỗi rồi !!!");
          }
          SetRegisterEmail("");
          SetRegisterName("");
          SetRegisterPassword("");
          SetRegisterPassword2nd("");
          registerSucces.style.display = "flex"
        })
        .catch((e) => console.error("Đã xảy ra lỗi rồi"));
    }
  }
  return (
    <div style={{ marginTop: "20px" }}>
      <form id="register-form" onSubmit={(e) => handleSubmit(e)}>
        {/* <!-- Name input --> */}

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form2Example1">
            Tên của bạn
          </label>
          <input
            name="register-name"
            type="text"
            id="register-name"
            className="form-control"
            value={registerName}
            onChange={(e) => SetRegisterName(e.target.value)}
          />
          <span className="err">{registerNameErr}</span>
        </div>

        {/* <!-- Email input --> */}

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form2Example1">
            Email của bạn
          </label>
          <input
            name="register-email"
            type="email"
            id="register-email"
            className="form-control"
            value={registerEmail}
            onChange={(e) => SetRegisterEmail(e.target.value)}
          />
          <span className="err">{registerEmailErr}</span>
        </div>

        {/* <!-- Password input --> */}

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form2Example2">
            Mật khẩu
          </label>
          <input
            name="register-password"
            type="password"
            id="register-password"
            className="form-control"
            value={registerPassword}
            onChange={(e) => SetRegisterPassword(e.target.value)}
          />
          <span className="err">{registerPasswordErr}</span>
        </div>

        {/* <!-- Password 2nd input --> */}

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form2Example2">
            Nhập lại mật khẩu
          </label>
          <input
            name="register-password2nd"
            type="password"
            id="register-password2nd"
            className="form-control"
            value={registerPassword2nd}
            onChange={(e) => SetRegisterPassword2nd(e.target.value)}
          />
          <span className="err">{registerPassword2ndErr}</span>
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

            <a href="#!">Quên mật khẩu</a>
          </div>
        </div>

        {/* <!-- Submit button --> */}

        <input
          type="submit"
          className="btn btn-primary btn-block mb-4"
          value="Đăng kí"
        />
        {/* <!-- Register buttons --> */}

        <div className="text-center">
          <p>
            <Link to={"/login"}>Đăng nhập</Link>
          </p>
        </div>
      </form>

      {/* module đăng kí tài khoản thành công */}
      <div className="wrap-register-success">
        <div className="register-success">
          {/* close */}
          <button onClick={()=>registerSucces.style.display = "none"} className="register-success__close">
            <FontAwesomeIcon
              className="register-success__close-icon"
              icon={faClose}
            ></FontAwesomeIcon>
          </button>
          <FontAwesomeIcon
            className="register-success__icon"
            icon={faCircleCheck}
          ></FontAwesomeIcon>
          <h2 className="register-success__title">
            Đăng kí tài khoản thành công
          </h2>
          <p className="register-success__decs">
            Hãy bắt đầu đăng nhập tài khoản mới của bạn nhé
          </p>
          <Link
            className="button-login btn btn-primary btn-block"
            to={"/login"}
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Register;
