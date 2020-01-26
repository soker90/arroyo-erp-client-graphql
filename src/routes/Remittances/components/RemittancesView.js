import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';

import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';

import RemittancesTab from './RemittancesTab';

const Remittances = memo(function Remittances({
  remittances,
  searchRemittances,
  showRemittancesModal,
}) {
  useEffect(() => {
    searchRemittances({});
  }, [searchRemittances]);

  return (
    <HasPermission access={USER_PERMISSIONS.REMITTANCES_READ}>
      <RemittancesTab
        remittances={remittances}
        searchRemittances={searchRemittances}
        showRemittancesModal={showRemittancesModal}
      />
    </HasPermission>
  );
});

Remittances.propTypes = {
  remittances: PropTypes.object.isRequired,
  searchRemittances: PropTypes.func.isRequired,
  showRemittancesModal: PropTypes.func.isRequired,
};

export default Remittances;
