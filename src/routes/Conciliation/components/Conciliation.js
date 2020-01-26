import React, {memo, useReducer, useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import {Col, Row, Button} from 'react-bootstrap';

import InfoPanel from 'components/InfoPanel';

import {
  uploadConciliation,
  applyConciliation,
  showErrorControlModal,
} from '../modules/conciliation';

const defaultState = {
  file: null,
  fileName: 'Seleccionar fichero',
  isConciliationLoading: false,
  isSelectButtonEnabled: true,
  isApplyButtonEnabled: false,
  isCancelButtonEnabled: false,
  fileSummary: null,
};

const Conciliation = memo(({uploadConciliation, applyConciliation, showErrorControlModal, registeredOps, fileSummary}) => {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    defaultState,
  );

  const _inputRef = useRef();

  const _getFlag = pending => {
    let status = null;
    if (pending) status = pending.length === 0;
    switch (status) {
      case true:
        return (
          <i
            style={{color: '#5cb85c'}}
            className="rubix-icon fontello icon-fontello-circle"
          />
        );
      case false:
        return (
          <i
            style={{color: '#d9534f'}}
            className="rubix-icon fontello icon-fontello-circle"
          />
        );
      default:
        return (
          <i
            style={{color: '#444'}}
            className="rubix-icon fontello icon-fontello-circle"
          />
        );
    }
  };

  const _inputFileOnChange = event => {
    if (event.currentTarget.files.length > 0) {
      uploadConciliation(event.currentTarget.files[0]);
      setState({
        file: event.currentTarget.files[0],
        fileName: event.currentTarget.files[0].name,
        isApplyButtonEnabled: event.currentTarget.files.length > 0,
        isCancelButtonEnabled: event.currentTarget.files.length > 0,
      });
    }
  };

  const _applyConciliation = () => {
    if (state.file) {
      applyConciliation(state.file);
      setState(defaultState);
    }
  };

  /* Por algun motivo está sin usar 22/10/19
  const _cancelConciliation = () => {
    setState({...defaultState});
  }; */

  const _openModalErrors = () => {
    showErrorControlModal(registeredOps);
  };


  const _getDate = () => fileSummary.startDate
    ? `${
      fileSummary.startDate
        ? moment(fileSummary.startDate).format('DD/MM')
        : '--/--'
    } a ${
      fileSummary.endDate
        ? moment(fileSummary.endDate).format('DD/MM')
        : '--/--'
    }`
    : '--/-- a --/--';

  return (
    <InfoPanel title="Conciliar" static>
      <Row>
        <Col xs={2}>
          <form encType="multipart/form-data">
            <div
              className="fileUpload btn btn-primary"
              disabled={!state.isSelectButtonEnabled}
            >
              <span>{state.fileName}</span>
              <input
                type="file"
                className="upload"
                name="input"
                required
                // accept=".xml,.dat,.n43,." No funciona en chrome
                ref={_inputRef}
                disabled={!state.isSelectButtonEnabled}
                onChange={_inputFileOnChange}
              />
            </div>
          </form>
        </Col>

        <Col xs={6}>
          <label>Resumen del fichero a conciliar</label>
          <table className="ntable">
            <thead>
            <tr>
              <th colSpan="2">Tipo Fichero</th>
              <th colSpan="2">Operaciones a conciliar</th>
              <th colSpan="2">Operaciones a aplicar</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Norma</td>
              <td className="text-right text-bold">{fileSummary.type}</td>
              <td className="ntable-left-border">Transferencias</td>
              <td className="text-right text-bold">
                {fileSummary.transferNumber}
              </td>
              <td className="ntable-left-border">Ingresos</td>
              <td className="text-right text-bold">
                {fileSummary.incomes}
              </td>
            </tr>
            <tr>
              <td>Cuenta</td>
              <td
                className="text-right text-bold"
                style={
                  fileSummary.account === 6067
                    ? {backgroundColor: 'red', color: 'white'}
                    : {}
                }
                data-tip
                data-for="accountData"
              >
                {fileSummary.account ? fileSummary.account : '--'}
              </td>
              <td className="ntable-left-border">Remesas</td>
              <td className="text-right text-bold">
                {fileSummary.remittanceNumber}
              </td>
              <td className="ntable-left-border">Comisiones</td>
              <td className="text-right text-bold">
                {fileSummary.comissions}
              </td>
            </tr>
            <tr>
              <td>Fecha</td>
              <td className="text-right text-bold">{_getDate()}</td>
              <td className="ntable-left-border">Recibos impagados</td>
              <td className="text-right text-bold">
                {fileSummary.unpaidNumber}
              </td>
              <td className="ntable-left-border"/>
              <td className="text-right text-bold"/>
            </tr>
            </tbody>
          </table>
          <ReactTooltip id="accountData" effect="solid" place="right">
            <h5>Cuentas</h5>
            <ul>
              <li>6067 - KO</li>
              <li>8649 - Préstamos</li>
              <li>5458 - Acreditia</li>
            </ul>
          </ReactTooltip>
          <Button
            bsStyle="primary"
            className="pull-right"
            disabled={!state.isApplyButtonEnabled}
            onClick={_applyConciliation}
          >
            Conciliar
          </Button>
        </Col>

        {registeredOps && !state.isConciliationLoading && (
          <Col xs={4}>
            <label>Mensaje: {registeredOps.response}</label>
            <table className="ntable">
              <thead>
              <tr>
                <th colSpan="3">Operaciones conciliadas</th>
                <th colSpan="3">Operaciones aplicadas</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Transferencias</td>
                <td className="text-right text-bold">
                  {registeredOps.transfers
                    ? registeredOps.transfers.count
                    : 0}
                </td>
                <td className="text-center">
                  {_getFlag(
                    registeredOps.transfers
                      ? registeredOps.transfers.pending
                      : [],
                  )}
                </td>
                <td className="ntable-left-border">Ingresos</td>
                <td className="text-right text-bold">
                  {registeredOps.incomes ? registeredOps.incomes.count : 0}
                </td>
                <td className="text-center">
                  {_getFlag(
                    registeredOps.incomes
                      ? registeredOps.incomes.pending
                      : [],
                  )}
                </td>
              </tr>
              <tr>
                <td>Remesas</td>
                <td className="text-right text-bold">
                  {registeredOps.remittances
                    ? registeredOps.remittances.count
                    : 0}
                </td>
                <td className="text-center">
                  {_getFlag(
                    registeredOps.remittances
                      ? registeredOps.remittances.pending
                      : [],
                  )}
                </td>
                <td className="ntable-left-border">Comisiones</td>
                <td className="text-right text-bold">
                  {registeredOps.commisions
                    ? registeredOps.commisions.count
                    : 0}
                </td>
                <td className="text-center">
                  {_getFlag(
                    registeredOps.commisions
                      ? registeredOps.commisions.pending
                      : [],
                  )}
                </td>
              </tr>
              <tr>
                <td>Recibos impagados</td>
                <td className="text-right text-bold">
                  {registeredOps.unpaids ? registeredOps.unpaids.count : 0}
                </td>
                <td className="text-center">
                  {_getFlag(
                    registeredOps.unpaids
                      ? registeredOps.unpaids.pending
                      : [],
                  )}
                </td>
                <td className="ntable-left-border"/>
                <td className="text-right text-bold"/>
                <td className="text-center"/>
              </tr>
              </tbody>
            </table>
            <Button
              bsStyle="danger"
              className="pull-right"
              disabled
              onClick={_openModalErrors}
            >
              Control de errores
            </Button>
          </Col>
        )}
      </Row>
    </InfoPanel>
  );
});

Conciliation.propTypes = {
  uploadConciliation: PropTypes.func.isRequired,
  applyConciliation: PropTypes.func.isRequired,
  showErrorControlModal: PropTypes.func.isRequired,
  fileSummary: PropTypes.object,
  registeredOps: PropTypes.object,
};

const mapStateToProps = ({conciliation}) => ({
  fileSummary: conciliation?.fileSummary,
  registeredOps: conciliation.registeredOps,
});

const mapDispatchToProps = {
  uploadConciliation,
  applyConciliation,
  showErrorControlModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Conciliation);
