import React, {memo} from 'react';
import {Row} from 'react-bootstrap';

import Transfers from './boxes/Transfers';
import PendingRemittances from './boxes/PendingRemittances';
// TODO LEN-1961 uncommnet if needed
// import UnpaidReceipts from './boxes/UnpaidReceipts';

import InfoPanel from 'components/InfoPanel';

const ConPending = memo(function ConPending() {
  return (
    <InfoPanel title="Pendientes de conciliar" static>
      <Row>
        <PendingRemittances />
      </Row>
      <hr />
      <Row>
        <Transfers />
        {/* <UnpaidReceipts /> */}
      </Row>
    </InfoPanel>
  );
});

export default ConPending;
