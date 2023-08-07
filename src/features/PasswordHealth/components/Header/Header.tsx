import { useNavigate } from 'react-router-dom';

import { useUserContext } from 'context/UserContext';
import { Routes } from 'constants/routes';

import './header-style.scss';

export const Header = () => {
  const { logout, user } = useUserContext();
  const navigate = useNavigate();

  const handleLogoutClick = () =>
    logout(() => {
      navigate(Routes.Login);
    });

  return (
    <div className="header">
      <div className="user-section">
        <button onClick={handleLogoutClick}>{`Logout ${user.username}`}</button>
      </div>
      <span>Kamile app</span>
    </div>
  );
};
