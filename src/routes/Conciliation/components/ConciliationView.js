import React, {memo} from 'react';

import ConciliationTab from './ConciliationTab';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';

export default memo(function ConciliationView() {
  return (
    <HasPermission access={USER_PERMISSIONS.CONCILIATION_READ}>
      <ConciliationTab />
    </HasPermission>
  );
});
