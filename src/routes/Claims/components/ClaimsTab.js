import React from 'react';
import PropTypes from 'prop-types';

import {Row, Col} from 'react-bootstrap';
import ClaimsTable from './ClaimsTable';

const ClaimsTab = ({claims}) => (
  <div>
    <Row>
      <Col xs={12}>
        <ClaimsTable claims={claims} />
      </Col>
    </Row>
  </div>
);

ClaimsTab.propTypes = {
  claims: PropTypes.array.isRequired,
};

export default ClaimsTab;
