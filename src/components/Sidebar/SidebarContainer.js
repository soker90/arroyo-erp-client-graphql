import {connect} from 'react-redux';
import Sidebar from './Sidebar';
import {logout} from 'actions/auth';

const mapStateToProps = ({auth, permissions, router}) => ({
  name: auth.user.name,
  lastname: auth.user.lastname,
  email: auth.user.email,
  permissions: permissions.userPermissions,
  roles: auth.user.roles,
  router,
});

const mapDispatchToProps = {logout};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
