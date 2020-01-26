import React, {memo, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';

import CreateUserForm from './CreateUserForm';
import UserList from './UserList';
import UserDetails from './UserDetails';

import '../styles/searchUsers.scss';

const UserManagementView = memo(
  ({
     getUsers, getRoles, editUser, resetPassword,
     users, createUser, roles, addNotification, isLoading,
   }) => {
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
      getUsers();
      getRoles();
    }, [getUsers, getRoles]);


    const _handleSelectUser = selectedUserValue => {
      setSelectedUser(selectedUserValue);
    };

    const _handleEditUser = user => {
      editUser(user);
    };

    const _handleResetPassword = login => {
      resetPassword(login);
    };

    return (
      <div className="tab-body">
        <HasPermission access={USER_PERMISSIONS.USERS_EDIT}>
          <CreateUserForm
            addNotification={addNotification}
            roles={roles}
            createUser={createUser}
          />
        </HasPermission>
        <UserList handleSelectUser={_handleSelectUser} users={users}/>
        <UserDetails
          handleEditUser={_handleEditUser}
          resetPassword={_handleResetPassword}
          roleList={roles}
          selectedUser={selectedUser}
          isLoading={isLoading}
          addNotification={addNotification}
        />
      </div>
    );
  });

UserManagementView.propTypes = {
  getUsers: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  addNotification: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default UserManagementView;
