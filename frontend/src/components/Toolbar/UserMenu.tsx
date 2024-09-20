import React from 'react';
import {User} from '../../types';
import {useAppDispatch} from '../../app/hook';
import {logout} from '../../store/usersThunks';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle btn btn-success" data-bs-toggle="dropdown">
        Hello, {user.username}
      </button>
      <ul className="dropdown-menu">
        <li>
          <hr className="dropdown-divider"/>
        </li>
        <li>
          <button className="dropdown-item" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;