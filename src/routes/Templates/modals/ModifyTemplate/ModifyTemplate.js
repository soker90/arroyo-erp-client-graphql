import React, {Fragment, memo, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  Col,
  FormGroup,
  FormControl,
  Panel,
  Row,
  ProgressBar,
} from 'react-bootstrap';
import TextEditor from 'components/TextEditor';

const ModifyTemplate = memo(({show, close, getTemplateById, template, id, updateTemplate, createTemplate, loading, removeTemplate}) => {
    const initialState = {
      shortDescription: '',
      subject: '',
      body: '',
    };

    const [state, setState] = useReducer(
      (state, newState) => ({...state, ...newState}),
      initialState,
    );

    useEffect(() => {
      if (id) getTemplateById(id);
    }, [getTemplateById, id]);

    useEffect(() => {
      id ?
        setState({
          shortDescription: template?.shortDescription,
          subject: template?.subject,
          body: template?.body,
        }) :
        setState(initialState);
      //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, template]);

    /**
     * Function change input
     * @param {string} name
     * @param {string} value
     * @private
     */
    const _handleChange = ({target: {name, value}}) => {
      setState({[name]: value});
    };

    const _handleChangeTextEditor = (event, editor) => {
      setState({body: editor.getData()});
    };

    /**
     * Function for button save
     * @private
     */
    const _handleSubmit = () => id ? updateTemplate(id, {...template, ...state}) : createTemplate(state, close);

    /**
     * Function for button delete
     * @returns {none}
     * @private
     */
    const _handleDelete = () => {
      removeTemplate(id, close);
    };
    /**
     * Render a input element
     * @param {string} id
     * @param {string} label
     * @returns {Col}
     * @private
     */
    const _renderInput = (id, label) =>
      <Col sm={12}>
        <FormGroup>
          <Col sm={5}>{label}</Col>
          <Col sm={7}>
            <FormControl
              type="text"
              name={id}
              value={state[id]}
              onChange={_handleChange}
            />
          </Col>
        </FormGroup>
      </Col>;

    /**
     * Render editor textarea
     * @returns {Col}
     * @private
     */
    const _renderTextArea = () =>
      <Col xs={12}>
        <FormGroup>
          <Col sm={12}>Cuerpo</Col>
          <Col sm={12}>
            <Row sm={20}>
              <TextEditor onChange={_handleChangeTextEditor} value={state.body}/>
            </Row>
          </Col>
        </FormGroup>
      </Col>;

    /**
     * Render progress bar infinite
     * @returns {ProgressBar}
     * @private
     */
    const _renderLoading = () =>
      <ProgressBar bsStyle='danger' active now={100}/>;

    /**
     * Render all inputs of the modal
     * @returns {Fragment}
     * @private
     */
    const _renderInputs = () =>
      <Fragment>
        {_renderInput('shortDescription', 'Descripción')}
        {_renderInput('subject', 'Asunto')}
        {_renderTextArea()}
      </Fragment>;

    return (
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>{id ? 'Editar' : 'Nueva'} Plantilla</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Panel
          >
            {loading ? _renderLoading() : _renderInputs()}
          </Panel>
          <Panel>
            <Button bsStyle="danger" onClick={_handleDelete}>
              Eliminar
            </Button>
          </Panel>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={_handleSubmit}>
            Guardar
          </Button>
          <Button bsStyle="danger" onClick={close}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  },
  )
;

ModifyTemplate.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  getTemplateById: PropTypes.func.isRequired,
  template: PropTypes.object,
  id: PropTypes.number.isRequired,
  updateTemplate: PropTypes.func.isRequired,
  createTemplate: PropTypes.func.isRequired,
  loading: PropTypes.boolean,
  removeTemplate: PropTypes.func.isRequired,
};

export default ModifyTemplate;
