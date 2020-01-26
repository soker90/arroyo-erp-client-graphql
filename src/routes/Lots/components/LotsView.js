import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import LotsTab from './LotsTab';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';

const LotsView = memo(function LotsView({searchLots, lots}) {
  useEffect(() => {
    searchLots({});
  }, [searchLots]);

  return (
    <HasPermission access={USER_PERMISSIONS.LOTS_READ}>
      <LotsTab searchLots={searchLots} lots={lots} />;
    </HasPermission>
  );
});

LotsView.propTypes = {
  lots: PropTypes.object.isRequired,
  searchLots: PropTypes.func.isRequired,
};

export default LotsView;
