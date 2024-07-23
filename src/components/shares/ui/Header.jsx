import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import logo from "../../../assets/images/logo.png";
import defaultAvatar from "../../../assets/images/default_avatar.png";
import { AUTH_PATHS } from '../../../features/auth/constants';
import { clearUser } from '../../../features/auth';

function Header() {
  const token = localStorage.getItem('token');
  const profile = useSelector(state => state.authStore.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearUser());

    navigate("/")
  }

  return (
    <div className="header">
      <div>
        <img src={logo} alt="logo" className="header-logo" />
      </div>
      <div>
        <h1 className="header-title">Nhà Trọ <br />HUMG</h1>
      </div>
      {token ? <div className="header-user">
        <div className="header-user-avatar">
          <img src={profile?.avatarUrl ? profile.avatarUrl : defaultAvatar} alt="avatar" />
        </div>
        <Dropdown autoClose="outside">
          <Dropdown.Toggle id="dropdown-basic" className='header-user-name border-0' variant="outline-light">
            {profile?.fullName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item >
              Thông tin cá nhân
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div> : <div className="header-user">
        <Link to={AUTH_PATHS.LOG_IN} className='header-login-btn'>
          <div >Đăng nhập</div>
        </Link>
      </div>}

    </div>
  );
}

export default Header;
