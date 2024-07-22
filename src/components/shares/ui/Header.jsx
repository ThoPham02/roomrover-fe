import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

import logo from "../../../assets/images/logo.png";
import defaultAvatar from "../../../assets/images/default_avatar.png";
import { AUTH_PATHS } from '../../../features/auth/constants';
import useAuthStore from '../../../features/auth/context';
import { getProfileApi } from '../../../features/auth';

function Header() {
  const { token, user, profile, clearAuth } = useAuthStore();

  if (token && !profile) {
    getProfileApi((res) => {
      if (res.result.code === 0) {
        // setProfile(res.profile);
      } else {
        console.error(res);
      }
    });
  }

  const handleLogout = () => {
    // clearAuth();
    localStorage.removeItem('token');
    clearAuth();
    window.location.reload();
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
            <Dropdown.Item >Tài khoản</Dropdown.Item>
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
