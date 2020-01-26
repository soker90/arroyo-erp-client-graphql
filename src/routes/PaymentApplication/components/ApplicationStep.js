import React, {memo, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  Button,
  ListGroup,
  ListGroupItem,
  InputGroup,
  Panel,
} from 'react-bootstrap';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import FA from 'react-fontawesome';
import dataFormat from 'components/util/dataFormat';
import ContractPanel from './ContractsPanel';

const ApplicationStep = memo(props => {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      clientId: props.clientId || '',
      condonationAmmount: '',
    },
  );

  const _selectPossibleClient = row => {
    const clientId = row.clientId;
    if (!/^(\s*|\d+)$/.test(clientId)) {
      return;
    }

    _setClientId(clientId);
  };

  const _possibleClientsTableProps = {
    striped: true,
    hover: true,
    condensed: true,
    trClassName: 'cursor-pointer',
    height: 200,
    selectRow: {
      mode: 'radio',
      clickToSelect: true,
      className: 'row-selected',
      onSelect: _selectPossibleClient,
    },
  };

  useEffect(() => {
    setState({clientId: props.clientId})
  }, [props.clientId]);

  useEffect(() => {
    if (props.possibleClients.length === 0) {
      props.getPossibleClients(props.income.incomeId);
    }
    //eslint-disable-next-line
  }, [props.getPossibleClients]);

  const _setClientId = clientId => {
    setState({clientId});
    props.getContracts(clientId);
  };

  const _renderPossibleClients = () => {
    const tableProps = {
      ..._possibleClientsTableProps,
      data: props.possibleClients,
    };

    if (props.clientId) {
      tableProps.selectRow.selected = [props.clientId];
    }

    return (
      <BootstrapTable {...tableProps}>
        <TableHeaderColumn dataField="dni">DNI</TableHeaderColumn>
        <TableHeaderColumn dataField="name">Nombre</TableHeaderColumn>
        <TableHeaderColumn dataField="lastname">Ape. 1</TableHeaderColumn>
        <TableHeaderColumn dataField="secondLastname">Ape. 2</TableHeaderColumn>
        <TableHeaderColumn dataField="clientId" isKey dataAlign="right">
          ID Cliente
        </TableHeaderColumn>
      </BootstrapTable>
    );
  };

  const _handleChangeCondonationAmmount = event => {
    const condonationAmmount = event.target.value;
    if (!/^(\s*|\d+)$/.test(condonationAmmount)) {
      return;
    }
    setState({condonationAmmount});
  };

  const _handleChangeClientId = event => {
    const clientId = event.target.value;
    if (!/^(\s*|\d+)$/.test(clientId)) {
      return;
    }
    setState({clientId});
  };

  const _handleBlurClientId = () => {
    props.setClientId(state.clientId);
  };

  const _handleSubmitSearchClient = event => {
    event.preventDefault();
    props.getContracts(state.clientId);
  };

  const _handleApplyPayment = () => {
    props.showConfirmationModal(
      props.income.importe,
      Number(state.clientId),
      props.applyPayment,
    );
  };

  const _renderIncomeInfo = () => {
    const {income} = props;
    return (
      <div>
        <h4>Información</h4>
        <ListGroup className="list-group-separated-items">
          <ListGroupItem>
            <span>Nombre</span>
            <span>{income.pagador || '(vacío)'}</span>
          </ListGroupItem>
          <ListGroupItem>
            <span>Referencia</span>
            <span>{income.comentario || '(vacío)'}</span>
          </ListGroupItem>
          <ListGroupItem>
            <span>Importe</span>
            <span>{dataFormat.euro(income.importe || '(vacío)')}</span>
          </ListGroupItem>
          <ListGroupItem>
            <span>Condonación</span>
            <span>
              <input
                type="number"
                className="text-right"
                style={{maxWidth: '100px', textAlign: 'right'}}
                name="condonationAmmount"
                placeholder="Importe"
                onChange={_handleChangeCondonationAmmount}
                value={state.condonationAmmount || 0}
              />{' '}
              €
            </span>
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  };

  const _renderIncomeForm = () => {
    const {contract, income, isLoading} = props;
    const disabledCommunicatons =
      isLoading || !state.clientId || !props.clientId;
    const disabledApplication =
      isLoading ||
      !state.clientId ||
      !contract ||
      !income;

    const disabledSearchButton = isLoading || !state.clientId;

    return (
      <div className="flex-set client-application-payment-form">
        <Button
          onClick={props.showCommunicationsModal}
          disabled={disabledCommunicatons}
          className="flexed-item"
          bsStyle="primary"
        >
          Ver comunicaciones
        </Button>

        <form className="flexed-item" onSubmit={_handleSubmitSearchClient}>
          <InputGroup>
            <FormControl
              required
              name="clientId"
              placeholder="ID Cliente"
              onBlur={_handleBlurClientId}
              onChange={_handleChangeClientId}
              value={state.clientId || ''}
            />
            <InputGroup.Button>
              <Button
                type="submit"
                disabled={disabledSearchButton}
                bsStyle="primary"
              >
                <FA name="search"/>
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </form>

        <Button
          disabled={disabledApplication}
          onClick={_handleApplyPayment}
          className="flexed-item"
          bsStyle="success"
        >
          Aplicar
        </Button>
      </div>
    );
  };

  const _renderContracts = () => {
    const showContracts = props.contracts.length > 1;
    // const showContracts = true;
    return (
      showContracts && (
        <ContractPanel
          contracts={props.contracts}
          setContract={props.setContract}
        />
      )
    );
  };

  const _renderInfo = () => {
    const info = [];
    if (props.possibleClients.length > 0) {
      info.push(`${props.possibleClients.length} clientes posibles`);
    }

    if (props.clientId) {
      info.push(`cliente ${props.clientId} seleccionado`);
    }

    if (props.contracts.length > 0) {
      info.push(
        `${props.contracts.length} contrato${
          props.contracts.length === 1 ? '' : 's'
        }`,
      );
    }

    if (props.contract.length) {
      info.push(
        `contrato ${props.contract.contractId} seleccionado`,
      );
    }

    return <i>{info.join(', ')}</i>;
  };

  const {income} = props;
  const incomePanelHeader = `Ingreso ${income.incomeId || '(vacío)'}`;

  return (
    <div>
      <div className="flex-set">
        <Panel
          className="flexed-item application-panel"
          header={incomePanelHeader}
        >
          {_renderIncomeInfo()}
          {_renderIncomeForm()}
        </Panel>
        <Panel
          className="flexed-item application-panel"
          header="Clientes posibles"
        >
          {_renderPossibleClients()}
        </Panel>
      </div>
      {_renderContracts()}
      <div className="flex-set">
        <Button
          onClick={props.cancelPaymentApplication}
          bsStyle="danger"
        >
          Cancelar
        </Button>
      </div>
      <div className="flex-set">{_renderInfo()}</div>
    </div>
  );
});

ApplicationStep.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  income: PropTypes.object.isRequired,
  possibleClients: PropTypes.array.isRequired,
  contracts: PropTypes.array.isRequired,
  contract: PropTypes.object.isRequired,
  cancelPaymentApplication: PropTypes.func.isRequired,
  getPossibleClients: PropTypes.func.isRequired,
  getContracts: PropTypes.func.isRequired,
  setContract: PropTypes.func.isRequired,
  showCommunicationsModal: PropTypes.func.isRequired,
  showConfirmationModal: PropTypes.func.isRequired,
  setClientId: PropTypes.func.isRequired,
  clientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  applyPayment: PropTypes.func.isRequired,
};

export default ApplicationStep;
