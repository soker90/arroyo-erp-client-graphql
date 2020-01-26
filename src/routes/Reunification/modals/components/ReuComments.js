import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';

const ReuComments = ({transferDescription, handleChange, disabled}) => {
  return (
    <Row>
      <Col xs={12}>
        <FormGroup controlId="transferDescription">
          <ControlLabel>Descripción</ControlLabel>
          <FormControl
            disabled={disabled}
            as="textarea"
            name="transferDescription"
            placeholder="Introduce una descripción de la transferencia"
            onChange={handleChange}
            defaultValue={transferDescription}
          />
        </FormGroup>
      </Col>
    </Row>
  );
};

ReuComments.propTypes = {
  transferDescription: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default ReuComments;
