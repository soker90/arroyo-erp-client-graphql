import React, {memo, useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {
  Form,
  FormGroup,
  Col,
  Button,
  Row,
  ControlLabel,
  FormControl,
  Modal,
  InputGroup,
} from 'react-bootstrap';
import InputGroupAddon from 'react-bootstrap/es/InputGroupAddon';
import Loading from 'components/Loading';

const PaymentTPVReceipt = memo(({close, show, sendPaymentTPV, receiptId, getAmountTPV, amountTPV, pendingPayment}) => {
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');
  const [defaultAmount, setDefaultAmount] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAmountTPV(receiptId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiptId]);

  useEffect(() => {
    setDefaultAmount(amountTPV);
    setAmount(amountTPV);
    setLoading(false);
  }, [amountTPV]);

  useEffect(() => {
    pendingPayment === false && close();
  }, [pendingPayment, close]);

  /**
   * Handle Change for inputs
   * @param {string} value
   * @param {function} set
   * @private
   */
  const _changeInput = ({target: {value}}, set) => {
    set(value);
  };

  /**
   * Send payment to action's petition
   * @private
   */
  const _sendPaymentToTPV = () => {
    sendPaymentTPV({receiptId, amount, comment});
  };

  /**
   * Render input with data
   * @param {string} literal
   * @param {Object} options
   * @returns {Col}
   * @private
   */
  const _renderInput = (literal, options) =>
    <Col xs={6}>
      <FormGroup>
        <ControlLabel>{literal}</ControlLabel>
        <InputGroup>
          <FormControl
            className='text-right'
            {...options}
          />
          <InputGroupAddon>€</InputGroupAddon>
        </InputGroup>
      </FormGroup>
    </Col>;

  const _renderInputComment = () =>
    <Col xs={12}>
      <FormGroup>
        <ControlLabel>Comentario</ControlLabel>
        <FormControl
          className='text-right'
          type='text'
          onChange={ev => {
            _changeInput(ev, setComment)
          }}
          defaultValue={comment}
        />
      </FormGroup>
    </Col>;

  if (loading)
    return <Loading/>;

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>TPV</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            {_renderInput(
              'Importe deuda viva vencida',
              {defaultValue: defaultAmount, type: 'number', disabled: true}
              )}
            {_renderInput(
              'Importe que paga',
              {defaultValue: amount, onChange: ev => {
                _changeInput(ev, setAmount)
              }}
              )}
            {_renderInputComment()}
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="danger" onClick={close}>
          Cerrar
        </Button>
        <Button bsStyle="primary" onClick={_sendPaymentToTPV}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

PaymentTPVReceipt.propTypes = {
  close: PropTypes.func.isRequired,
  sendPaymentTPV: PropTypes.func.isRequired,
  amountTPV: PropTypes.number,
  pendingPayment: PropTypes.bool,
  getAmountTPV: PropTypes.func.isRequired,
  receiptId: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
};

export default PaymentTPVReceipt;
