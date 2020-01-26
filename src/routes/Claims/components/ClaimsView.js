import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';

import ClaimsTab from './ClaimsTab';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';

const JudicialView = memo(function JudicialView({claims, getRecoveries}) {
  useEffect(() => {
    getRecoveries();
  }, [getRecoveries]);

  return (
    <div>
      <HasPermission access={USER_PERMISSIONS.JUDICIAL_READ}>
        <div className="tab-body">
          <div className="flex-set">
            <ClaimsTab
              className="flexed-item client-panel"
              claims={claims.toJS()}
            />
          </div>
        </div>
      </HasPermission>
    </div>
  );
});

JudicialView.propTypes = {
  /** Immutable list of claims */
  claims: PropTypes.object.isRequired,
  /** Method to get all recoveries */
  getRecoveries: PropTypes.func.isRequired,
};

export default JudicialView;
