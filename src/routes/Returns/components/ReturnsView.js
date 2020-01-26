import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';

import ReturnsTab from './ReturnsTab';

const ReturnsView = memo(function ReturnsView({returned, getRetorned}) {
  useEffect(() => {
    getRetorned();
  }, [getRetorned]);

  return (
    <div className="tab-body">
      <div className="flex-set">
        <ReturnsTab
          className="flexed-item client-panel"
          returned={returned.toJS()}
        />
      </div>
    </div>
  );
});

ReturnsView.propTypes = {
  returned: PropTypes.object.isRequired,
  getRetorned: PropTypes.func.isRequired,
};

export default ReturnsView;
