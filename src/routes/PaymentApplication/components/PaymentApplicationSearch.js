import React, {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  Button,
  ControlLabel,
} from 'react-bootstrap';
import InfoPanel from 'components/InfoPanel';


const PaymentApplicationSearch = memo(({getPayments}) => {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  /**
   * Handle function for change inputs
   * @param {string} value
   * @param {function} set
   * @private
   */
  const _handleChange = ({target: {value}}, set) => {
    set(value);
  };

  /**
   * Handle button function
   * @param {Event} event
   * @private
   */
  const _handleSubmit = event => {
    event.preventDefault();
    let params;
    if (amount || from || to)
      params = {amount, to, from};
    getPayments(params);
  };

  /**
   * Handle function for clear form
   * @private
   */
  const _clearForm = () => {
    setAmount('');
    setFrom('');
    setTo('');
    getPayments();
  };

  /**
   * Render input function
   * @param {string} id
   * @param {string} label
   * @param {string} value
   * @param {function} handleFuntion
   * @param type
   * @returns {FormGroup}
   * @private
   */
  const _renderInput = (id, label, value, handleFuntion, type = 'text') =>
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      <FormControl
        type={type}
        name={id}
        value={value}
        onChange={event => _handleChange(event, handleFuntion)}
      />
    </FormGroup>;

  return (
    <InfoPanel xs={12} static title="Consulta de Aplicaciones de pago">
      <Form inline className="search-form" onSubmit={_handleSubmit}>
        {_renderInput('amount', 'Cantidad', amount, setAmount)}
        {_renderInput('from', 'Desde', from, setFrom, 'date')}
        {_renderInput('to', 'Hasta', to, setTo, 'date')}
        <Row>
          <Col xs={12}>
            <FormGroup>
              <label className="control-label">&nbsp;</label>
              <Button bsStyle="primary" type="submit">
                Buscar
              </Button>
              <Button
                bsStyle="danger"
                type="reset"
                onClick={_clearForm}
              >
                Limpiar
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </InfoPanel>
  );
});

PaymentApplicationSearch.propTypes = {
  getPayments: PropTypes.func.isRequired,
};

export default PaymentApplicationSearch;
