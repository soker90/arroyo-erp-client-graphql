import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Button} from 'react-bootstrap';
import FA from 'react-fontawesome';

const ReuValidationButtons = ({
  status,
  createReunificationLoan,
  validateStatusChange,
  rejectStatusChange,
  desistStatusChange,
}) => {
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const disabled = ['reu_val', 'reu_ref', 'reu_des'].includes(status);
    setValid(disabled);
  }, [status]);

  return (
    <Row>
      <Col xs={9}>
        <Button
          size="lg"
          bsStyle="success"
          onClick={validateStatusChange}
          disabled={valid}
        >
          Validar
        </Button>
        <Button
          disabled={valid}
          size="xs"
          bsStyle="danger"
          onClick={rejectStatusChange.bind(null, 'risk')}
        >
          Rechazar
        </Button>
        <Button
          disabled={valid}
          size="lg"
          bsStyle="warning"
          onClick={desistStatusChange}
        >
          Desistir
        </Button>
      </Col>
      <Col xs={3}>
        <div style={{float: 'right'}}>
          <Button
            disabled={valid}
            bsStyle="success"
            onClick={createReunificationLoan}
          >
            <FA name="plus" /> Añadir Préstamo
          </Button>
        </div>
      </Col>
    </Row>
  );
};

ReuValidationButtons.propTypes = {
  status: PropTypes.string.isRequired,
  createReunificationLoan: PropTypes.func.isRequired,
  validateStatusChange: PropTypes.func.isRequired,
  rejectStatusChange: PropTypes.func.isRequired,
  desistStatusChange: PropTypes.func.isRequired,
};

export default ReuValidationButtons;
