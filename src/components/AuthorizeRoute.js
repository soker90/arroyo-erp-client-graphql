import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import NotAllowed from './NotAllowed';

export default function HasPermissionWrapper(
  WrappedComponent,
  requiredRoles,
  FallbackComponent
) {
  class HasPermission extends React.PureComponent {
    static propTypes = {
      userRoles: PropTypes.array.isRequired,
    };

    render() {
      const userRoles = this.props.userRoles;
      const hasPermission = userRoles
        .map(({roleId}) => requiredRoles.includes(roleId))
        .some(checks => !!checks);

      if (!hasPermission) {
        if (FallbackComponent) {
          return <FallbackComponent />;
        }
        return <NotAllowed userRoles={userRoles} />;
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = ({auth}) => ({
    userRoles: auth.user.roles,
  });

  return connect(mapStateToProps)(HasPermission);
}
