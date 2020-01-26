import {memo} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const HasPermission = memo(function HasPermission({
  access,
  children,
  permissions,
}) {
  if (!permissions.includes(access)) {
    return null;
  }
  return children;
});

HasPermission.propTypes = {
  access: PropTypes.string.isRequired,
  permissions: PropTypes.array.isRequired,
};

HasPermission.displayName = 'HasPermission';

const mapStateToProps = ({permissions}) => ({
  permissions: permissions.userPermissions,
});

export default connect(mapStateToProps)(HasPermission);
