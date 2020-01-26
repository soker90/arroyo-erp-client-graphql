import React, {memo} from 'react';
import {Row, Col} from 'react-bootstrap';
import {Container} from 'components/Container';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';

import Conciliation from './Conciliation';
import ConPending from './ConPending';
import AppPending from './AppPending';

const ConciliationTab = memo(() =>
  <Container className="tab-body">
    <HasPermission access={USER_PERMISSIONS.CONCILIATION_EDIT}>
      <Row>
        <Col xs={12}>
          <Conciliation/>
        </Col>
      </Row>
    </HasPermission>
    <Row>
      <Col xs={12}>
        <ConPending/>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <AppPending/>
      </Col>
    </Row>
  </Container>,
);

export default ConciliationTab;
