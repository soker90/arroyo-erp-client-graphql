import React from 'react';
import PropTypes from 'prop-types';

import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';

import ReceiptsTab from './ReceiptsTab';

const ReceiptsView = React.memo(function ReceiptsView({
  receipts,
  searchReceipts,
}) {
  return (
    <HasPermission access={USER_PERMISSIONS.RECEIPTS_READ}>
      <ReceiptsTab receipts={receipts} searchReceipts={searchReceipts} />;
    </HasPermission>
  );
});

ReceiptsView.propTypes = {
  receipts: PropTypes.object.isRequired,
  searchReceipts: PropTypes.func.isRequired,
};

export default ReceiptsView;
