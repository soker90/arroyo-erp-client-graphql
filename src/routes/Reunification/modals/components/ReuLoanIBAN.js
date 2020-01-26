import React from 'react';
import PropTypes from 'prop-types';

import {Col, Row, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

import inputStyle from '../../styles/reunification';

const ReuLoanIBAN = ({debtCert, iban, handleChange, isIBANValid, disabled}) => {
  return (
    <Row>
      {!debtCert ? (
        <p className="text-center">
          Para introducir el IBAN es necesario un certificado de CC
        </p>
      ) : (
        <FormGroup
          disabled={disabled}
          controlId="ibanControlSelect"
          validationState={isIBANValid ? 'success' : 'error'}
        >
          <Col xs={2}>
            <ControlLabel>IBAN</ControlLabel>
            <FormControl
              disabled={disabled}
              type="text"
              size="sm"
              required
              name="iban.0"
              value={iban[0]}
              onChange={event => handleChange(event.target.value, 0)}
              style={inputStyle}
              maxLength="4"
            />
          </Col>
          <Col xs={2}>
            <ControlLabel>Entidad</ControlLabel>
            <FormControl
              disabled={disabled}
              type="text"
              size="sm"
              required
              name="iban.1"
              value={iban[1]}
              onChange={event => handleChange(event.target.value, 1)}
              style={inputStyle}
              maxLength="4"
            />
          </Col>
          <Col xs={2}>
            <ControlLabel>Sucursal</ControlLabel>
            <FormControl
              disabled={disabled}
              type="text"
              size="sm"
              required
              name="iban.2"
              value={iban[2]}
              onChange={event => handleChange(event.target.value, 2)}
              style={inputStyle}
              maxLength="4"
            />
          </Col>
          <Col xs={2}>
            <ControlLabel>DC</ControlLabel>
            <FormControl
              disabled={disabled}
              type="text"
              size="sm"
              required
              name="iban.3"
              value={iban[3]}
              onChange={event => handleChange(event.target.value, 3)}
              style={inputStyle}
              maxLength="2"
            />
          </Col>
          <Col xs={4}>
            <ControlLabel>Número de cuenta</ControlLabel>
            <FormControl
              disabled={disabled}
              type="text"
              size="sm"
              required
              name="iban.4"
              value={iban[4]}
              onChange={event => handleChange(event.target.value, 4)}
              style={inputStyle}
              maxLength="10"
            />
          </Col>
        </FormGroup>
      )}
    </Row>
  );
};

ReuLoanIBAN.propTypes = {
  handleChange: PropTypes.func.isRequired,
  iban: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default ReuLoanIBAN;
