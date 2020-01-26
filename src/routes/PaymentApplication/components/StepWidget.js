import React from 'react';
import PropTypes from 'prop-types';

import {STEPS_LABELS} from '../modules/actions';

const StepWidget = ({step}) => (
  <div className="step-widget">
    {Object.keys(STEPS_LABELS).map((STEP, index) => {
      let className = 'step-container';
      if (step === STEP) {
        className += ' active';
      }
      return (
        <h3 className={className} key={STEP}>
          {`${index + 1}. ${STEPS_LABELS[STEP]}`}
        </h3>
      );
    })}
  </div>
);

StepWidget.propTypes = {
  step: PropTypes.string.isRequired,
};

export default StepWidget;
