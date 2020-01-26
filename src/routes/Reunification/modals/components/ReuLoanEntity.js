import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {Col, Row, ControlLabel, FormControl} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';

const ReuLoanEntity = ({
  entityName,
  entitySelect,
  handleChange,
  entitiesList,
  disabled,
}) => {
  return (
    <Row>
      <Col xs={6}>
        <FormGroup controlId="entitySelectControl">
          <ControlLabel>Selecciona una Entidad</ControlLabel>
          <FormControl
            disabled={entityName || disabled}
            componentClass="select"
            name="entitySelect"
            onChange={handleChange}
          >
            <option value="manual">Introducir una nueva</option>
            {entitiesList &&
              entitiesList.length &&
              entitiesList.map(item => (
                <option key={item.reunificationBankEntityId} value={item.name}>
                  {item.name}
                </option>
              ))}
          </FormControl>
        </FormGroup>
      </Col>
      <Col xs={6}>
        <FormGroup
          controlId="entityInputControl"
          validationState={entityName ? 'success' : 'error'}
        >
          <ControlLabel>Introduce una Entidad</ControlLabel>
          <FormControl
            componentClass="input"
            name="entityName"
            placeholder="...que no exista en la lista."
            onChange={handleChange}
            defaultValue={entityName}
            disabled={entitySelect !== 'manual' || disabled}
          />
        </FormGroup>
      </Col>
    </Row>
  );
};

ReuLoanEntity.propTypes = {
  entityName: PropTypes.string.isRequired,
  entitySelect: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  entitiesList: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default memo(ReuLoanEntity);
