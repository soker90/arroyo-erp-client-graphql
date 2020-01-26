import React, {memo, useReducer, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
} from '@material-ui/core';
import {directionTypes, subjects, communicationTypes} from './constants';
import {ModalCloseSaveButtons, InputForm, SelectForm, DatePickerForm, TextEditor} from 'components';
import {useStyles} from './RegisterCommunication.styles';

const RegisterCommunication = memo(
  ({
     show, close, client, user, setCommunication,
   }) => {
    const classes = useStyles();

    /**
     * Initial state
     * @type {{birthday: string, sex: string, name: *, lastname: *}}
     * @private
     */
    const _initialState = {
      dateComunication: new Date(),
      comunicationTypeDescription: 'Email',
      summary: '',
      text: '',
      directionType: 'I',
      answer: true,
      isEmailSent: null,
      clientId: client.clientId,
    };

    const [state, setState] = useReducer(
      (state, newState) => ({...state, ...newState}),
      _initialState,
    );

    useEffect(() => {
      setState(_initialState);
    }, [show]);

    /**
     * Handle change texteditor
     * @param {Object} event
     * @param {Object} editor
     * @private
     */
    const _handleChange = (event, editor) => {
      setState({text: editor.getData()});
    };

    /**
     * Handle submit
     * @private
     */
    const _handleSubmit = () => {
      setCommunication(state, () => {
        close();
      });
    };

    /**
     * Render input
     * @param literal
     * @param value
     * @returns {InputForm}
     * @private
     */
    const _renderInput = (literal, value) =>
      <InputForm label={literal}
                 value={value}
                 disabled/>;

    /**
     * Render date picker
     * @returns {Grid}
     * @private
     */
    const _renderDatePicker = () =>
      <DatePickerForm
        label="Fecha"
        value={state.date}
        onAccept={_handleChangePicker}
        disableFuture
      />;

    /**
     * Handle change picker
     * @param {String} date
     * @private
     */
    const _handleChangePicker = date => {
      setState({date});
    };

    /**
     * Handle change for select
     * @param {String} name
     * @param {String} value
     * @private
     */
    const _handleChangeSelect = ({target: {name, value}}) => {
      setState({[name]: value});
    };

    const _renderSelectOption = row => {
      let key, value;
      if (typeof row === 'string')
        key = row;
      else
        [key, value] = row;

      return <option
        key={key}
        value={key}
      >
        {value || key}
      </option>
    };

    /**
     * Render select component
     * @param {string} label
     * @param {string} name
     * @param {array} items
     * @param {number} size
     * @returns {SelectForm}
     * @private
     */
    const _renderSelect = (label, name, items, size = 4) => (
      <SelectForm
        label={label}
        name={name}
        onChange={_handleChangeSelect}
        value={state[name]}
      >
        {items.map(_renderSelectOption)}
      </SelectForm>
    );

    /**
     * Render all inputs
     * @returns {Grid[]}
     * @private
     */
    const _renderAllInputs = () => <>
      {_renderInput('Cliente', `${client.name} ${client.lastname}`)}
      {_renderInput('Móvil', client.mobile)}
      {_renderInput('DNI', client.dni)}
      {_renderInput('Gestor', user.login)}
      {_renderInput('Correo electrónico', user.email)}
    </>;

    const _renderText = () =>
      <Grid
        item
        md={12}
        xs={12}
      >
        <TextEditor onChange={_handleChange} value={state.text}/>
      </Grid>;


    return (
      <ModalCloseSaveButtons title='Registrar comunicación' action={_handleSubmit} show={show} close={close}>
        {_renderAllInputs()}
        {_renderDatePicker()}
        {_renderSelect('Dirección', 'directionType', directionTypes)}
        {_renderSelect('Tipo', 'comunicationTypeDescription', communicationTypes)}
        {_renderSelect('Asunto', 'summary', subjects, 12)}
        {_renderText()}
      </ModalCloseSaveButtons>
    );
  })
;

RegisterCommunication.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  client: PropTypes.array.isRequired,
  user: PropTypes.array.isRequired,
  setCommunication: PropTypes.func.isRequired,
};

export default RegisterCommunication;
