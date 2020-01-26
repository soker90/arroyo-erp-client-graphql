import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import moment from 'moment';

import AmortizationContracts from './AmortizationContracts';
import format from 'components/util/dataFormat';

import './AmortizationsView.scss';

const ProcessPanel = ({title, children}) => (
  <div className="process-panel">
    <div className="process-panel-title">{title}</div>
    <div className="process-panel-body">{children}</div>
  </div>
);

ProcessPanel.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

class AmortizationsView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '',
      calculDate: '',
      newContractAmount: 0,
      operationType: '',
    };

    this.baseState = {...this.state};
  }

  resetState = () => {
    this.setState(this.baseState);
    this.props.resetStore();
  };

  handleSearchContracts = event => {
    event.preventDefault();
    this.props.getContracts(this.state.clientId);
  };

  handleGetActiveDebt = event => {
    event.preventDefault();
    const {contract, getAliveDebt} = this.props;
    const {calculDate} = this.state;

    getAliveDebt(
      {
        contractId: contract.get('contractId'),
        calculDate,
      },
      () => {
        this.setState({
          newContractAmount: 0,
          operationType: '',
        });
      }
    );
  };

  handleGetActiveDebtOperation = event => {
    event.preventDefault();
    const {contract, amortizationTypes} = this.props;
    const {calculDate, operationType, newContractAmount} = this.state;

    const data = {
      contractId: contract.get('contractId'),
      calculDate,
      operationType,
    };

    if (operationType === amortizationTypes.get('Consolidacion')) {
      data.newContractAmount = Number(newContractAmount);
    }

    this.props.getAliveDebt(data, () => {
      this.resetState();
    });
  };

  handleChange = event => {
    const {name, value} = event.target;

    this.setState({[name]: value});
  };

  handleChangeCalculDate = event => {
    const {name, value} = event.target;
    const date = moment(value, 'YYYY-MM-DD');
    const now = moment(Date.now()).startOf('day');

    if (date.valueOf() < now.valueOf()) {
      this.props.addNotification({
        level: 'warning',
        title: 'Fecha de cálculo',
        message: 'La fecha no puede ser anterior al día de hoy.',
      });
      return;
    }

    this.setState({[name]: value});
  };

  renderFormInput(name, label, inputProps) {
    return (
      <FormGroup controlId={name} className="form-input-short">
        <ControlLabel>{label}</ControlLabel>
        <FormControl
          autoFocus
          type="text"
          name={name}
          value={this.state[name]}
          onChange={this.handleChange}
          inputRef={ref => {
            this[`${name}FormControl`] = ref;
          }}
          {...inputProps}
        />
      </FormGroup>
    );
  }

  onRowSelect = row => {
    this.props.setContract(row);
  };

  isDebtOperationValid() {
    const {amortizationTypes, position} = this.props;
    const {operationType, newContractAmount} = this.state;

    if (operationType === amortizationTypes.get('Amortizacion')) {
      return true;
    }

    if (operationType === amortizationTypes.get('Refinanciacion')) {
      return true;
    }

    if (
      operationType === amortizationTypes.get('Consolidacion') &&
      newContractAmount
    ) {
      const transferAmount =
        Number(newContractAmount) - (position.get('aliveDebt') || 0);

      if (transferAmount > 0) {
        return true;
      }
    }

    return false;
  }

  render() {
    const {
      contract,
      isLoading,
      position,
      amortizationTypes,
      contracts,
      contractStatus,
    } = this.props;
    const {clientId, calculDate, operationType, newContractAmount} = this.state;

    const transferAmount = (
      Number(newContractAmount) - (position.get('aliveDebt') || 0)
    ).toFixed(2);

    const isDateDisabled = !contract.get('contractId') || isLoading;
    const isOperationTypeDisabled = !position.get('aliveDebt') || isLoading;

    return (
      <div className="tab-body">
        <ProcessPanel title="Amortizaciones y consolidaciones">
          <div className="flex-set flex--align-content-around">
            <form onSubmit={this.handleSearchContracts} className="flexed-item">
              {this.renderFormInput('clientId', 'Client ID', {
                required: true,
                autoComplete: 'off',
              })}
              <Button
                disabled={isLoading || !clientId}
                type="submit"
                bsStyle="success"
              >
                Buscar
              </Button>
              <Button bsStyle="primary" onClick={this.resetState}>
                Limpiar
              </Button>
            </form>

            <form onSubmit={this.handleGetActiveDebt} className="flexed-item">
              <FormGroup controlId="calculDate" className="form-input-short">
                <ControlLabel>Fecha de cálculo</ControlLabel>
                <FormControl
                  type="date"
                  name="calculDate"
                  value={calculDate}
                  onChange={this.handleChangeCalculDate}
                  disabled={isDateDisabled}
                />
              </FormGroup>
              <Button
                disabled={isLoading || !calculDate}
                type="submit"
                bsStyle="success"
              >
                Calcular deuda viva
              </Button>
              {position.get('aliveDebt') && (
                <div className="aliveDebtContainer">
                  <div className="left">
                    <h5>Deuda viva:</h5>
                    <p>Capital:</p>
                    <p>Interés ordinario:</p>
                    <p>Interés demora:</p>
                    <p>Comisión impago:</p>
                  </div>
                  <div className="right">
                    <h5>{format.euro(position.get('aliveDebt'))}</h5>
                    <p>{format.euro(position.get('totalAmortisation'))}</p>
                    <p>
                      {format.euro(
                        position.get('totalInterest') -
                          position.get('delayInterest')
                      )}
                    </p>
                    <p>{format.euro(position.get('delayInterest'))}</p>
                    <p>{format.euro(position.get('totalArrearsFee'))}</p>
                  </div>
                </div>
              )}
            </form>

            <form
              onSubmit={this.handleGetActiveDebtOperation}
              className="flexed-item"
            >
              <FormGroup controlId="operationType" className="form-input-short">
                <ControlLabel>Operación</ControlLabel>
                <FormControl
                  componentClass="select"
                  name="operationType"
                  value={operationType}
                  onChange={this.handleChange}
                  disabled={isOperationTypeDisabled}
                >
                  <option value="" />
                  {amortizationTypes.valueSeq().map(item => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </FormControl>
              </FormGroup>
              {operationType === amortizationTypes.get('Consolidacion') && (
                <div>
                  {this.renderFormInput('newContractAmount', 'Importe nuevo', {
                    required: true,
                    type: 'number',
                    className: 'text-right',
                    disabled: isLoading,
                  })}
                  {this.renderFormInput('xxxx', 'Importe a transferir', {
                    type: 'number',
                    className: 'text-right',
                    value: transferAmount,
                    disabled: true,
                  })}
                </div>
              )}
              <Button
                disabled={isLoading || !this.isDebtOperationValid()}
                type="submit"
                bsStyle="success"
              >
                Enviar
              </Button>
            </form>
          </div>

          <div className="flex-set flex--align-content-around">
            <AmortizationContracts
              onRowSelect={this.onRowSelect}
              contractStatus={contractStatus}
              contracts={contracts}
              contract={contract}
            />
          </div>
        </ProcessPanel>
      </div>
    );
  }
}

AmortizationsView.propTypes = {
  setContract: PropTypes.func.isRequired,
  getContracts: PropTypes.func.isRequired,
  getAliveDebt: PropTypes.func.isRequired,
  resetStore: PropTypes.func.isRequired,
  clientId: PropTypes.string,
  contracts: PropTypes.object.isRequired,
  contract: PropTypes.object.isRequired,
  position: PropTypes.object.isRequired,
  contractStatus: PropTypes.object.isRequired,
  amortizationTypes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  addNotification: PropTypes.func.isRequired,
};

export default AmortizationsView;
