import React, {memo, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import {FormGroup, FormControl, ControlLabel, Row} from 'react-bootstrap';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';
import {Container} from 'components/Container';
import InfoPanel from 'components/InfoPanel';
import MailingList from './MailingList';

const MailingView = memo(({getRecoveries, getEmailTemplates, recoveries, sendEmailList, emailTemplates}) => {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      minDays: 0,
      maxDays: 0,
      templateId: '',
      status: '',
      filteredList: null,
      isSending: false,
    },
  );

  useEffect(() => {
    getRecoveries();
    getEmailTemplates();
  }, [getEmailTemplates, getRecoveries]);

  useEffect(() => {
    _handleUpdate();
    // eslint-disable-next-line
  }, [state.minDays, state.maxDays, state.status, state.templateId]);

  const _handleChange = ({target: {name, value}}) => {
    setState({[name]: value});
  };

  const _handleUpdate = () => {
    const recoveryList = recoveries.toJS();
    const {minDays, maxDays, status, templateId} = state;

    if (minDays !== 0 && maxDays !== 0 && status !== '' && templateId !== '') {
      const filteredList = recoveryList.filter(
        ({debtDays, unpaidStatus}) =>
          debtDays >= minDays && debtDays <= maxDays && unpaidStatus === status,
      );

      setState({filteredList, isSending: false});
    }
  };

  const _handleSubmit = () => {
    const {templateId, filteredList} = state;
    const recoveryIds = filteredList.map(item => item.recoveryId);

    sendEmailList(recoveryIds, templateId);
    setState({isSending: true});
  };

  const availableTemplates = emailTemplates.filter(template =>
    template.shortDescription.includes('MASIVO'),
  );

  return (
    <Container className="tab-body">
      <Row>
        <InfoPanel xs={12} static title="Envío de emails">
          <HasPermission access={USER_PERMISSIONS.EMAIL_READ}>
            <div className="flex-set">
              <div>
                {!state.filteredList && (
                  <h4>Completa todos los campos para iniciar la búsqueda</h4>
                )}
                <FormGroup
                  controlId="minDays"
                  validationState={
                    state.minDays === 0 || state.maxDays === 0 ? 'error' : 'success'
                  }
                >
                  <ControlLabel>Rango de Días</ControlLabel>
                  <FormControl
                    autoFocus
                    type="number"
                    componentClass="input"
                    name="minDays"
                    placeholder="Desde"
                    className="flexed-item"
                    onChange={_handleChange}
                  />
                </FormGroup>
                <FormGroup
                  controlId="maxDays"
                  validationState={!state.minDays || !state.maxDays ? 'error' : 'success'}
                >
                  <FormControl
                    type="number"
                    componentClass="input"
                    name="maxDays"
                    placeholder="Hasta"
                    className="flexed-item"
                    onChange={_handleChange}
                  />
                </FormGroup>
                <FormGroup
                  controlId="templateId"
                  validationState={!state.templateId ? 'error' : 'success'}
                >
                  <ControlLabel>Plantilla de Email</ControlLabel>
                  <FormControl
                    componentClass="select"
                    name="templateId"
                    placeholder="Selecciona una plantilla"
                    className="flexed-item"
                    onChange={_handleChange}
                  >
                    <option value="">Selecciona una plantilla</option>
                    {availableTemplates.map(
                      ({emailTemplateId, shortDescription}) => (
                        <option key={emailTemplateId} value={emailTemplateId}>
                          {shortDescription}
                        </option>
                      ),
                    )}
                  </FormControl>
                </FormGroup>
                <FormGroup
                  controlId="status"
                  validationState={!state.status ? 'error' : 'success'}
                >
                  <ControlLabel>Estado</ControlLabel>
                  <FormControl
                    componentClass="select"
                    placeholder="Selecciona un status"
                    className="flexed-item"
                    name="status"
                    onChange={_handleChange}
                  >
                    <option value="">Selecciona un status</option>
                    <option value="promise">Promesa</option>
                    <option value="no-promise">No Promesa</option>
                    <option value="payment">Pago</option>
                    <option value="indirect">Indirecto</option>
                  </FormControl>
                </FormGroup>
              </div>
            </div>
            {state.filteredList && (
              <MailingList
                handleSubmit={_handleSubmit}
                filteredList={state.filteredList}
                isSending={state.isSending}
              />
            )}
          </HasPermission>
        </InfoPanel>
      </Row>
    </Container>
  );
});

MailingView.propTypes = {
  recoveries: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  emailTemplates: PropTypes.object.isRequired,
  getRecoveries: PropTypes.func.isRequired,
  sendEmailList: PropTypes.func.isRequired,
};

export default MailingView;
