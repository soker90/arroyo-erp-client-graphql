import React, {memo, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {actions} from '../../modules/actions';
import {
  Modal,
  Button,
  Form,
  FormGroup,
  Col,
  FormControl,
} from 'react-bootstrap';
import IBAN from 'iban';

const ChangeIBANModal = memo(function ChangeIBANModal({
  show,
  close,
  currentIban,
  changeIBAN,
}) {
  const [iban, setIban] = useState('');
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(IBAN.isValid(iban));
  }, [iban]);

  const handleSubmit = () => {
    if (valid) {
      changeIBAN(iban);
      close();
    }
  };

  const ibanValue = IBAN.printFormat(
    String(currentIban).replace(/\*/g, 'X'),
    ' '
  );
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Cambiar IBAN</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form horizontal>
          <FormGroup>
            <Col sm={5}>IBAN actual</Col>
            <Col sm={7}>
              <FormControl
                type="text"
                name="currentIban"
                value={ibanValue}
                disabled
              />
            </Col>
          </FormGroup>
          <FormGroup validationState={valid ? 'success' : 'error'}>
            <Col sm={5}>IBAN nuevo</Col>
            <Col sm={7}>
              <FormControl
                autoFocus
                type="text"
                name="iban"
                maxLength={29}
                value={IBAN.printFormat(iban, ' ')}
                onChange={event => setIban(event.target.value)}
              />
            </Col>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="danger" onClick={close}>
          Cerrar
        </Button>
        <Button
          bsStyle="primary"
          onClick={() => handleSubmit()}
          disabled={!valid}
        >
          Modificar IBAN
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

ChangeIBANModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  currentIban: PropTypes.string.isRequired,
  changeIBAN: PropTypes.func.isRequired,
};

const mapStateToProps = ({client}) => ({
  currentIban: client.getIn(['contract', 'chargeAccount']),
});

const mapDispatchToProps = {...actions};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeIBANModal);
