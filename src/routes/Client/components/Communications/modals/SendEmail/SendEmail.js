import React, {memo, useReducer, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  TextField,
} from '@material-ui/core';
import {useStyles} from './SendEmail.styles';
import TextEditor from 'components/TextEditor';
import {ModalCloseSaveButtons} from 'components/Modals';
import {InputForm, SelectForm} from 'components';

const SendEmail = memo(
  ({
     show, close, sendEmail, client, emailTemplates, getEmailTemplates,
   }) => {
    // const classes = useStyles();

    /**
     * Initial state
     * @type {{birthday: string, sex: string, name: *, lastname: *}}
     * @private
     */
    const _initialState = {
      template: '',
      summary: '',
      text: '',
    };

    const [state, setState] = useReducer(
      (state, newState) => ({...state, ...newState}),
      _initialState,
    );


    useEffect(() => {
      setState(_initialState);
    }, [show]);

    useEffect(() => {
      getEmailTemplates();
    }, []);

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
     * Handle change input
     * @param {String} value
     * @private
     */
    const _handleChangeInput = ({target: {value}}) => {
      setState({summary: value});
    };

    /**
     * Handle submit
     * @private
     */
    const _handleSubmit = () => {
      sendEmail(state, () => {
        close();
      });
    };

    /**
     * Handle change for select
     * @param {String} name
     * @param {String} value
     * @private
     */
    const _handleChangeSelect = ({target: {value}}) => {
      const {subject, body} = emailTemplates[value - 1];
      setState({
        template: value,
        summary: subject,
        text: body,
      });
    };

    /**
     * Render options for select
     * @param {string} item
     * @param {number} index
     * @returns {option}
     * @private
     */
    const _renderSelectOption = ({shortDescription}, index) => {
      return <option
        key={index}
        value={index + 1}
      >
        {shortDescription}
      </option>
    };

    /**
     * Render text editor
     * @returns {*}
     * @private
     */
    const _renderText = () =>
      <Grid
        item
        md={12}
        xs={12}
      >
        <TextEditor onChange={_handleChange} value={state.text}/>
      </Grid>;


    return (
      <ModalCloseSaveButtons title='Enviar correo electrónico' action={_handleSubmit} show={show} close={close}>
        <InputForm
          size={12}
          label='Para'
          value={client.email}
          disabled/>

          <SelectForm
          size={12}
          label='Plantilla'
          onChange={_handleChangeSelect}
          value={state.template}
        >
          <option value={0}>-------</option>
          {emailTemplates.map(_renderSelectOption)}
        </SelectForm>

        <InputForm
          size={12}
          label='Asunto'
          value={state.summary}
          onChange={_handleChangeInput}
          />
        {_renderText()}
      </ModalCloseSaveButtons>
    );
  })
;

SendEmail.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  client: PropTypes.array.isRequired,
  user: PropTypes.array.isRequired,
  setCommunication: PropTypes.func.isRequired,
  getEmailTemplates: PropTypes.func.isRequired,
};

export default SendEmail;
