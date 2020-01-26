import React, {memo} from 'react';

import InfoPanel from 'components/InfoPanel';
import {Row} from 'react-bootstrap';
import ApplyPending from './boxes/ApplyPending';
import TPVPending from './boxes/TpvPending';


const AppPending = memo(() =>
    <InfoPanel title="Pendientes de aplicar" static>
      <Row>
        <ApplyPending />
      </Row>
      <hr />
      <Row>
        <TPVPending />
      </Row>
    </InfoPanel>
  );

AppPending.displayName= 'AppPending';

export default AppPending;