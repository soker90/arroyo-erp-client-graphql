import GlobalPermissionsView from '../components/GlobalPermissionsView';
import {connect} from 'react-redux';
import {actions} from 'reducers/users';
import {actions as permissionActions} from 'reducers/permissions';
import {addNotification} from 'reducers/notifications';

const mapStateToProps = ({users, permissions, loadingBar}) => ({
  isLoading: !!loadingBar.default,
  roles: users.get('roles'),
  rolePermissions: permissions.rolePermissions,
});

const mapDispatchToProps = {...actions, ...permissionActions, addNotification};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalPermissionsView);
