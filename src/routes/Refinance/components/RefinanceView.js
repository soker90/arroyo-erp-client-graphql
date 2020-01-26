import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';

import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';

import RefinanceTab from './RefinanceTab';

const RefinanceView = memo(function RefinanceView({
  refinanceds,
  recoverFilter,
  getRefinanceContract,
}) {
  useEffect(() => {
    getRefinanceContract();
  }, [getRefinanceContract]);
  return (
    <div>
      <HasPermission access={USER_PERMISSIONS.REFINANCE_READ}>
        <div className="tab-body">
          <div className="flex-set">
            <RefinanceTab
              className="flexed-item client-panel"
              refinanceds={refinanceds.toJS()}
              recoverFilter={recoverFilter.toJS()}
            />
          </div>
        </div>
      </HasPermission>
    </div>
  );
});

RefinanceView.propTypes = {
  getRefinanceContract: PropTypes.func.isRequired,
  refinanceds: PropTypes.object.isRequired,
  recoverFilter: PropTypes.object.isRequired,
};

export default RefinanceView;
