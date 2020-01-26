import PermissionsView from '../components/PermissionsView';
import {connect} from 'react-redux';

import {getUserPermission} from 'reducers/permissions';

const mapStateToProps = ({permissions, auth}) => ({
  permissions: permissions.userPermissions,
  user: auth.user,
});

const mapDispatchToProps = {getUserPermission};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PermissionsView);
