import React, {memo, useReducer} from 'react';
import PropTypes from 'prop-types';
import format from 'components/util/dataFormat';

import {
  Form,
  FormGroup,
  Col,
  Button,
  Row,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import {disabledStates, receiptStatus as optionsStatus} from 'utils/constants';
import moment from 'moment';
import {STATUS_CODES_DATE_REQUIRED} from '../../constants';

const ModifyReceipt = memo(
  ({
     show,
     close,
     receipt,
     updateReceipt,
     addNotification,
   }) => {
    const [state, setState] = useReducer(
      (state, newState) => ({...state, ...newState}),
      {
        maturityDate: receipt.maturityDate,
        receiptAmount: receipt.receiptAmount,
        pendingCapital: receipt.pendingCapital,
        amortisation: receipt.amortisation,
        interestAmount: receipt.interestAmount,
        expenses: receipt.expenses,
        paymentDate: receipt.paymentDate,
        lastChangeDate: receipt.lastChangeDate,
        paymentNumber: receipt.paymentNumber,
        comments: receipt.comments,
        arrearsFee: receipt.arrearsFee,
        statusCod: receipt.statusCod,
        delayInterest: receipt.delayInterest,
        receiptId: receipt.receiptId,
      },
    );

    const _handleChange = ({target: {name, value}}) => {
      setState({[name]: value});
    };

    const _handleSubmit = () => {
      const {maturityDate, paymentDate} = state;

      try {
        const validPaymentDate = moment(paymentDate).year() === moment().year();

        const model = {
          amortisation: state.amortisation,
          interestAmount: state.interestAmount,
          arrearsFee: state.arrearsFee,
          expenses: state.expenses,
          receiptId: state.receiptId,
          maturityDate: moment(maturityDate).format('YYYY-MM-DD'),
          paymentDate: paymentDate ? moment(paymentDate).format('YYYY-MM-DD') : null,
          pendingCapital: state.pendingCapital,
          delayInterest: state.delayInterest,
          comments: state.comments,
          receiptStatus: {
            statusCod: state.statusCod,
          },
        };

        if (!STATUS_CODES_DATE_REQUIRED.includes(state.statusCod) || validPaymentDate) {

          updateReceipt(model, () => {
            close();
          });
        } else {
          addNotification({
            level: 'warning',
            title: 'Modificación de recibo',
            message:
              'La fecha de Pago parece no ser correcta, debe ser la misma que el año en curso.',
          });
        }
      } catch (err) {
        addNotification({
          level: 'error',
          title: 'Titulo',
          err,
        });
      }
    };

    const {
      paymentNumber,
      maturityDate,
      amortisation,
      interestAmount,
      expenses,
      arrearsFee,
      paymentDate,
      statusCod,
      receiptAmount,
      pendingCapital,
      lastChangeDate,
      comments,
      delayInterest,
    } = state;

    const disabled = disabledStates.includes(statusCod);

    const receiptAmountValue = [
      amortisation,
      interestAmount,
      arrearsFee,
      expenses,
      delayInterest,
    ]
      .reduce((acc, curr) => acc + Number(curr), 0)
      .toFixed(2);

    return (
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar recibo {}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={12}>
                <FormGroup>
                  <ControlLabel>Número de pago</ControlLabel>
                  <FormControl
                    className="text-right"
                    type="number"
                    name="paymentNumber"
                    defaultValue={paymentNumber}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel>Fecha de vencimiento</ControlLabel>
                  <FormControl
                    className="text-right"
                    type="date"
                    name="maturityDate"
                    defaultValue={maturityDate}
                    onChange={_handleChange}
                    disabled={disabled}
                  />
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel>Amortización</ControlLabel>
                  <FormControl
                    className="text-right"
                    type="number"
                    name="amortisation"
                    defaultValue={amortisation}
                    onChange={_handleChange}
                    disabled={disabled}
                  />
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel>Intereses</ControlLabel>
                  <FormControl
                    className="text-right"
                    type="number"
                    name="interestAmount"
                    defaultValue={interestAmount}
                    onChange={_handleChange}
                    disabled={disabled}
                  />
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel>Gastos</ControlLabel>
                  <FormControl
                    className="text-right"
                    type="number"
                    name="expenses"
                    defaultValue={expenses}
                    onChange={_handleChange}
                    disabled={disabled}
                  />
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel>Comisión de demora</ControlLabel>
                  <FormControl
                    className="text-right"
                    type="number"
                    name="arrearsFee"
                    defaultValue={arrearsFee || 0}
                    onChange={_handleChange}
                    disabled={disabled}
                  />
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel>
                    Importe total ({Number(receiptAmount).toFixed(2)} €)
                  </ControlLabel>
                  <FormControl
                    className="text-right"
                    type="number"
                    name="receiptAmount"
                    defaultValue={receiptAmountValue}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel>Fecha de abono</ControlLabel>
                  <FormControl
                    className="text-right"
                    type="date"
                    name="paymentDate"
                    defaultValue={paymentDate || ''}
                    onChange={_handleChange}
                    disabled={disabled}
                  />
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel>Estado</ControlLabel>
                  <FormControl
                    componentClass="select"
                    name="statusCod"
                    defaultValue={statusCod}
                    disabled={disabled}
                    onChange={_handleChange}
                  >
                    {optionsStatus.map(({text, value}) => (
                      <option key={text} value={value}>
                        {text}
                      </option>
                    ))}
                  </FormControl>
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel>Capital pendiente</ControlLabel>
                  <FormControl
                    className="text-right"
                    type="number"
                    name="pendingCapital"
                    defaultValue={pendingCapital}
                    onChange={_handleChange}
                    disabled={disabled}
                  />
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel>Último cambio</ControlLabel>
                  <FormControl
                    className="text-right"
                    type="text"
                    name="lastChangeDate"
                    defaultValue={format.date(lastChangeDate)}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel>Intereses de demora</ControlLabel>
                  <FormControl
                    className="text-right"
                    type="number"
                    name="delayInterest"
                    defaultValue={delayInterest || 0}
                    onChange={_handleChange}
                    disabled={disabled}
                  />
                </FormGroup>
              </Col>
              <Col xs={12}>
                <FormGroup>
                  <ControlLabel>Observaciones</ControlLabel>
                  <textarea
                    className="form-control"
                    name="comments"
                    defaultValue={comments}
                    onChange={_handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="danger" onClick={close}>
            Cerrar
          </Button>
          <Button bsStyle="primary" onClick={_handleSubmit}>
            Modificar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  });

ModifyReceipt.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  receipt: PropTypes.object.isRequired,
  updateReceipt: PropTypes.func.isRequired,
};

export default ModifyReceipt;
