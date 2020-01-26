import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';
import {ButtonToolbar, Button} from 'react-bootstrap';

import WalletTab from './WalletTab';

const WalletView = memo(function WalletView({
  recoveries,
  recoverFilter,
  getRecoveries,
  updateRecoveries,
  isLoading,
  getRecoveriesUnread,
  unread,
}) {
  useEffect(() => {
    getRecoveries();
    getRecoveriesUnread();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRecoveries]);

  const handleUpdateRecoveries = () => {
    updateRecoveries();
  };

  return (
    <HasPermission access={USER_PERMISSIONS.WALLET_READ}>
      <div className="tab-body">
        <ButtonToolbar style={{margin: '1rem 0'}}>
          <Button
            disabled={isLoading}
            onClick={handleUpdateRecoveries}
            bsStyle="success"
          >
            Actualizar listado de recobros
          </Button>
        </ButtonToolbar>
        <WalletTab
          className="flexed-item client-panel"
          recoveries={recoveries.toJS()}
          recoverFilter={recoverFilter.toJS()}
          unread={unread.toJS()}
        />
      </div>
    </HasPermission>
  );
});

WalletView.propTypes = {
  recoveries: PropTypes.object.isRequired,
  getRecoveries: PropTypes.func.isRequired,
  updateRecoveries: PropTypes.func.isRequired,
  recoverFilter: PropTypes.object.isRequired,
  getRecoveriesUnread: PropTypes.func.isRequired,
  unread: PropTypes.object.isRequired,
};

export default WalletView;
