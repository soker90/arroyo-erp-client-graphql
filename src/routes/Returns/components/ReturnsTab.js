import React, {memo} from 'react';
import PropTypes from 'prop-types';

import {Row, Col} from 'react-bootstrap';

import Table from './ReturnsTable';

const ReturnsTab = memo(function ReturnsTab({returned}) {
  return (
    <div>
      <Row>
        <Col xs={12}>
          <Table header="Devueltos" returned={returned} />
        </Col>
      </Row>
    </div>
  );
});

ReturnsTab.propTypes = {
  className: PropTypes.string.isRequired,
  returned: PropTypes.array.isRequired,
};

export default ReturnsTab;
