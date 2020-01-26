import React from 'react';
import PropTypes from 'prop-types';

import {STEPS} from '../modules/actions';
import StepWidget from './StepWidget';
import IncomesStep from './IncomesStep';
import ApplicationStep from './ApplicationStep';
import SemimanualStep from './SemimanualStep';

import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';
import PaymentApplicationListView from './PaymentApplicationListView';

const PaymentApplicationView = props => {
  const renderStep = () => {
    switch (props.step) {
      case STEPS.INCOMES:
        return <IncomesStep {...props} />;
      case STEPS.APPLICATION:
        return <ApplicationStep {...props} />;
      case STEPS.SEMIMANUAL:
        return <SemimanualStep {...props} />;
      default:
        return '';
    }
  };

  return (
    <div className="tab-body">
      <HasPermission access={USER_PERMISSIONS.PAYMENT_APPLICATION_READ}>
        <StepWidget step={props.step} />
        {renderStep()}
        <PaymentApplicationListView payments={props.payments} getPayments={props.getPayments}/>
      </HasPermission>
    </div>
  );
};

PaymentApplicationView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  step: PropTypes.string.isRequired,
  incomes: PropTypes.array.isRequired,
  income: PropTypes.object.isRequired,
  possibleClients: PropTypes.array.isRequired,
  clientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  contracts: PropTypes.array.isRequired,
  contract: PropTypes.object.isRequired,
  cancelPaymentApplication: PropTypes.func.isRequired,
  getPossibleClients: PropTypes.func.isRequired,
  setIncome: PropTypes.func.isRequired,
  setClientId: PropTypes.func.isRequired,
  getIncomes: PropTypes.func.isRequired,
  showCommunicationsModal: PropTypes.func.isRequired,
  getPayments: PropTypes.func.isRequired,
  payments: PropTypes.array.isRequired,
};

export default PaymentApplicationView;
