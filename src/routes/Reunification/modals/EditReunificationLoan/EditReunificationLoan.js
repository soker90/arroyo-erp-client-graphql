import React, {memo, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import {Modal, Button, Panel} from 'react-bootstrap';

import ReuLoanEntity from '../components/ReuLoanEntity';
import ReuLoanIBAN from '../components/ReuLoanIBAN';
import ReuLoanCerts from '../components/ReuLoanCerts';
import ReuLoanAmounts from '../components/ReuLoanAmounts';
import ReuComments from '../components/ReuComments';
import {
  validateLoanForm,
  parseIBAN,
} from '../../modules/reunification';
import {CERT_FILE_TEMPLATE} from '../../modules/constants';
import {handleDownloadCert} from '../../modules/reunification';

const EditLoanModal = memo(props => {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      entitySelect: 'manual',
      entityName: props.entityName,
      amount: props.amount,
      iban: {
        0: props.iban.slice(0, 4) || '',
        1: props.iban.slice(4, 8) || '',
        2: props.iban.slice(8, 12) || '',
        3: props.iban.slice(12, 14) || '',
        4: props.iban.slice(14, 24) || '',
      },
      debtCert: props.debtCert,
      debtFile: props.debtFile,
      reunificationEntityId: props.reunificationEntityId,
      paymentLetter: props.paymentLetter,
      paymentCert: props.paymentCert,
      transferDescription: props.transferDescription || '',
      ibanFullfilled: false,
      isIBANValid: true,
      statusCod: props.statusCod,
    },
  );

  useEffect(() => {
    props.getEntitiesList();
    // eslint-disable-next-line
  }, [props.getEntitiesList]);

  useEffect(() => {
    setState({
      entityName: props.entityName,
      entitySelect: 'manual',
      amount: props.amount,
      iban: {
        0: props.iban.slice(0, 4) || props.iban[0] || '',
        1: props.iban.slice(4, 8) || props.iban[1] || '',
        2: props.iban.slice(8, 12) || props.iban[2] || '',
        3: props.iban.slice(12, 14) || props.iban[3] || '',
        4: props.iban.slice(14, 24) || props.iban[4] || '',
      },
      debtCert: props.debtCert,
      debtFile: props.debtFile,
      reunificationEntityId: props.reunificationEntityId,
      paymentLetter: props.paymentLetter,
      paymentCert: props.paymentCert,
      transferDescription: props.transferDescription || '',
      statusCod: props.statusCod,
    })
  }, [props]);


  /* Send data to back in order to update it */
  const _updateReunificationLoanData = data => {
    const {updateReunificationLoanData, close} = props;

    if (props.reunificationId) {
      data.reunificationId = props.reunificationId;
      updateReunificationLoanData(data, close);
    }
  };

  const _handleSubmit = () => {
    const loan = state;
    const {addNotification} = props;

    if (!loan.amount) {
      addNotification({
        level: 'warning',
        title: 'IMPORTE',
        message: 'Tienes que introducir un importe',
      });
      return;
    }
    if (!loan.entityName && loan.entitySelect === 'manual') {
      addNotification({
        level: 'warning',
        title: 'ENTIDAD BANCARIA',
        message: 'Tienes que seleccionar una entidad',
      });
      return;
    }
    if (loan.entitySelect !== 'manual') {
      loan.entityName = loan.entitySelect;
    }

    if (loan.debtCert) {
      if (loan.isIBANValid) {
        Object.assign(loan, {iban: parseIBAN(state.iban)});
        _updateReunificationLoanData(loan);
        close();
        return;
      } else {
        addNotification({
          level: 'warning',
          title: 'IBAN',
          message: 'Revisa el IBAN antes de continuar',
        });
        return;
      }
    }
    Object.assign(loan, {iban: parseIBAN(state.iban)});
    _updateReunificationLoanData(loan);
    close();
  };

  const _handleDelete = () => {
    const {deleteReunificationLoan, reunificationId, close} = props;
    const {reunificationEntityId} = state;
    const confirmDelete = confirm(
      'Estás a punto de eliminar el préstamo, ésta acción no es recuperable, ¿ estás seguro/a ?',
    );

    if (confirmDelete) {
      deleteReunificationLoan(reunificationId, reunificationEntityId);
    }
    close();
  };

  const _handleChange = ({target: {name, value}}) => {
    setState({[name]: value});
  };

  const _setIBANFullfilled = () => {
    if (
      state.iban[0].length === 4 &&
      state.iban[1].length === 4 &&
      state.iban[2].length === 4 &&
      state.iban[3].length === 2 &&
      state.iban[4].length === 10
    ) {
      validateLoanForm(state, validIBAN => {
        if (validIBAN) {
          props.addNotification({
            level: 'success',
            title: 'IBAN',
            message: 'El IBAN introducido parece válido',
          });
          setState({isIBANValid: true});
        } else {
          props.addNotification({
            level: 'error',
            title: 'IBAN',
            message: 'El IBAN introducido parece que no es válido',
          });
          setState({isIBANValid: false});
        }
      });
    } else {
      setState({isIBANValid: false});
    }
  };

  const _handleIBANChange = (value, item) => {
    setState({iban: {...state.iban, [item]: value}}, () => {
      _setIBANFullfilled();
    });
  };

  const _handleCertsChange = ({target: {name, files}}) => {
    setState({[name]: true});

    props.uploadCertFile(
      props.reunificationId,
      state.reunificationEntityId,
      CERT_FILE_TEMPLATE[name],
      files[0],
    );
  };

  const _handleDownloadCert = type => {
    const {debtFile, paymentCert, reunificationEntityId} = props;
    if (type === 'debtCert' && debtFile) {
      handleDownloadCert(type, debtFile, reunificationEntityId);
      return;
    } else if (type === 'paymentLetter' && paymentCert) {
      handleDownloadCert(type, paymentCert, reunificationEntityId);
    }
  };

  const {close, show, entitiesList} = props;
  const {
    entityName,
    entitySelect,
    iban,
    amount,
    debtCert,
    debtFile,
    reunificationEntityId,
    isIBANValid,
    paymentLetter,
    paymentCert,
    statusCod,
    transferDescription,
  } = state;

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>
          Modificando préstamo: {reunificationEntityId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Panel header="Prestamo" className={props.className}>
          <ReuLoanEntity
            disabled={statusCod === 'reu_val'}
            entityName={entityName}
            entitySelect={entitySelect}
            handleChange={_handleChange}
            entitiesList={entitiesList}
          />
          <hr/>
          <ReuLoanAmounts
            disabled={statusCod === 'reu_val'}
            amount={amount}
            handleChange={_handleChange}
          />
          <hr/>
          <ReuLoanIBAN
            disabled={statusCod === 'reu_val'}
            handleChange={_handleIBANChange}
            iban={iban}
            debtCert={debtCert}
            isIBANValid={isIBANValid}
          />
          <hr/>
          <ReuLoanCerts
            handleChange={_handleCertsChange}
            handleDownloadCert={_handleDownloadCert}
            debtCert={debtCert}
            debtFile={debtFile}
            paymentLetter={paymentLetter}
            paymentCert={paymentCert}
          />
          <hr/>
          <ReuComments
            disabled={statusCod === 'reu_val'}
            handleChange={_handleChange}
            transferDescription={transferDescription}
          />
        </Panel>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={statusCod === 'reu_val'}
          bsStyle="warning"
          onClick={_handleDelete}
        >
          Eliminar
        </Button>
        <Button
          disabled={statusCod === 'reu_val'}
          bsStyle="primary"
          onClick={_handleSubmit}
        >
          Guardar
        </Button>
        <Button bsStyle="danger" onClick={close}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

EditLoanModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  createReunificationLoan: PropTypes.func.isRequired,
  updateReunificationLoanData: PropTypes.func.isRequired,
  deleteReunificationLoan: PropTypes.func.isRequired,
  getEntitiesList: PropTypes.func.isRequired,
  uploadCertFile: PropTypes.func.isRequired,
  reunificationId: PropTypes.number.isRequired,
  entityName: PropTypes.string,
  amount: PropTypes.number,
  iban: PropTypes.string,
  debtCert: PropTypes.bool,
  debtFile: PropTypes.string,
  paymentLetter: PropTypes.bool,
  paymentCert: PropTypes.string,
  transferDescription: PropTypes.string,
  reunificationEntityId: PropTypes.number.isRequired,
};

export default EditLoanModal;
