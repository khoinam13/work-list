import { Link } from "react-router-dom";
function Footer() {
  return (
    <div>
      <footer className="bg-body-tertiary text-center text-lg-start">
        <div
          className="text-center p-3"
          style={{backgroundColor: "rgba(0, 0, 0, 0.05)", marginTop: "20px"}}
        >
          <span>© 2024 Copyright:</span> <Link className="text-body" to={"https://facebook.com/nobi.nam.908"}>Đặng Nam PD11322</Link>
        </div>
      </footer>
    </div>
  );
}
export default Footer;
