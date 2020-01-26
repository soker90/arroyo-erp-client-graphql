import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';

import ReunificationsList from '../containers/ReunificationsListContainer';

const ReunificationsView = memo(
  ({
     getReunifications,
   }) => {
    useEffect(() => {
      getReunifications();
    }, [getReunifications]);

    return (
      <HasPermission access={USER_PERMISSIONS.REUNIFICATIONS_READ}>
        <div className="tab-body">
          <div className="flex-set">
            <ReunificationsList/>
          </div>
        </div>
      </HasPermission>
    );
  });

ReunificationsView.propTypes = {
  getReunifications: PropTypes.func.isRequired,
};

export default ReunificationsView;
