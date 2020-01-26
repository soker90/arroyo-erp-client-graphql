import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row, FormControl, ControlLabel, FormGroup} from 'react-bootstrap';

import inputStyle from '../../styles/reunification';

const ReuLoanAmount = ({amount, handleChange, disabled}) => {
  return (
    <Row>
      <Col xs={6}>
        <FormGroup
          controlId="reuLoanAmount"
          validationState={amount ? 'success' : 'error'}
        >
          <ControlLabel>Importe en €</ControlLabel>
          <FormControl
            disabled={disabled}
            id="reuLoanAmount"
            type="number"
            bsSize="sm"
            name="amount"
            value={amount === 0 ? '' : amount}
            onChange={handleChange}
            style={inputStyle}
          />
        </FormGroup>
      </Col>
    </Row>
  );
};

ReuLoanAmount.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default ReuLoanAmount;
