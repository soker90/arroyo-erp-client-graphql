import React, {PureComponent} from 'react';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';

export default class ReloadsView extends PureComponent {
  render() {
    return (
      <HasPermission access={USER_PERMISSIONS.RELOADS_READ}>
        <div>ReloadsView</div>;
      </HasPermission>
    );
  }
}
