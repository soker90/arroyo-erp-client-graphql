import UserManagementView from '../components/UserManagementView';
import {connect} from 'react-redux';
import {actions} from 'reducers/users';
import {addNotification} from 'reducers/notifications';

const mapStateToProps = ({users, loadingBar}) => ({
  users: users.get('users'),
  roles: users.get('roles'),
  isLoading: !!loadingBar.default,
});

const mapDispatchToProps = {...actions, addNotification};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagementView);
