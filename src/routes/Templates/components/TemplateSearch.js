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


const TemplatesSearch = memo(({getTemplates}) => {
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');

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
    if (description || subject)
      params = {description, subject}
    getTemplates(params);
  };

  /**
   * Handle function for clear form
   * @private
   */
  const _clearForm = () => {
    setDescription('');
    setSubject('');
    getTemplates();
  };

  /**
   * Render input function
   * @param {string} id
   * @param {string} label
   * @param {string} value
   * @param {function} handleFuntion
   * @param {boolean} autofocus
   * @returns {FormGroup}
   * @private
   */
  const _renderInput = (id, label, value, handleFuntion, autofocus = false) =>
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      <FormControl
        autoFocus={autofocus}
        type="text"
        name={id}
        value={value}
        onChange={event => _handleChange(event, handleFuntion)}
      />
    </FormGroup>;

  return (
    <InfoPanel xs={12} static title="Consulta de Plantillas de Correo Electrónico">
      <Form inline className="search-form" onSubmit={_handleSubmit}>
        {_renderInput('description', 'Description', description, setDescription, true)}
        {_renderInput('subject', 'Asunto', subject, setSubject)}
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

TemplatesSearch.propTypes = {
  searchTemplate: PropTypes.func,
};

export default TemplatesSearch;
