import React from 'react';
import PropTypes from 'prop-types';

import {USER_PERMISSIONS} from 'utils/user-permissions';
import HasPermission from 'components/HasPermission';
import PaymentBox from './components/PaymentBox/PaymentBox';
import PaymentCardWrapper from './components/PaymentCardWrapper';
import {RECOVERY_STATUS} from 'utils';
import {getDebtDaysLiteral, getLastCommunication} from 'routes/Client/utils';
import dataFormat from 'components/util/dataFormat';

const PaymentStatus = ({className, recovery, communications, isRefinanced, hasInsurance, ...rest}) => {
  const messagesNumber = localStorage.getItem('messagesNumber');
  return (
    <HasPermission access={USER_PERMISSIONS.PAYMENT_SITUATION_READ}>
      <div
        {...rest}
        className={className}
      >
        <PaymentCardWrapper>
          <PaymentBox label='Refinanciado' ok={isRefinanced}/>
          <PaymentBox label='Estado de impago' value={RECOVERY_STATUS[recovery.unpaidStatus]}/>
          <PaymentBox label='Próxima gestión' value={dataFormat.date(recovery.nextProcess)}/>
        </PaymentCardWrapper>

        <PaymentCardWrapper>
          <PaymentBox label='Enviado a Judicial' ok={recovery?.judicial}/>
          <PaymentBox label='Fecha de promesa' value={dataFormat.date(recovery.promiseDate)}/>
          <PaymentBox label='Última gestión' value={getLastCommunication(communications)}/>
        </PaymentCardWrapper>

        <PaymentCardWrapper>
          <PaymentBox label='Tiene seguro' ok={hasInsurance}/>
          <PaymentBox label='Vencido hace' value={getDebtDaysLiteral(recovery)}/>
          <PaymentBox label='Recado' value={messagesNumber || 0}/>
        </PaymentCardWrapper>
      </div>

    </HasPermission>
  );
};

PaymentStatus.propTypes = {
  className: PropTypes.string,
  recovery: PropTypes.object.isRequired,
  communications: PropTypes.any,
  isRefinanced: PropTypes.bool,
  hasInsurance: PropTypes.bool.isRequired,
};

export default PaymentStatus;
