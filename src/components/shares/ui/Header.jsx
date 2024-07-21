import logo from "../../../assets/images/logo.png";

function Header() {
  return (
    <div className="header">
      <div>
        <img src={logo} alt="logo" className="header-logo"/>
      </div>
      <div>
        <h1 className="header-title">Nhà Trọ <br/>HUMG</h1>
      </div>
    </div>
  );
}

export default Header;
