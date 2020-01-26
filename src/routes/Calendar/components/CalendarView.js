import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';

import CalendarTab from './CalendarTab';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';

const CalendarView = memo(function CalendarView({
  getRecoveries,
  recoverFilter,
  recoveries,
}) {
  useEffect(() => {
    getRecoveries();
  }, [getRecoveries]);

  return (
    <div>
      <HasPermission access={USER_PERMISSIONS.CALENDAR_READ}>
        <div className="tab-body">
          <div className="">
            <div className="flex-set">
              <CalendarTab
                recoveries={recoveries.toJS()}
                recoverFilter={recoverFilter.toJS()}
              />
            </div>
          </div>
        </div>
      </HasPermission>
    </div>
  );
});

CalendarView.propTypes = {
  recoveries: PropTypes.object.isRequired,
  getRecoveries: PropTypes.func.isRequired,
  recoverFilter: PropTypes.object.isRequired,
};

export default CalendarView;
