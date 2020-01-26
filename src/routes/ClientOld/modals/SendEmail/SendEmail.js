import React, {memo, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import QuillEditor from 'react-quill';
import _ from 'lodash';
import {
  Col,
  Row,
  Form,
  FormGroup,
  Button,
  ControlLabel,
  FormControl,
  Modal,
} from 'react-bootstrap';

import {getEmailTemplates} from 'actions/common/getEmailTemplates';
import {sendEmail} from '../../modules/actions';

const SendEmail = memo(({emailTemplates, getEmailTemplates, close, sendEmail, client, show}) => {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      template: '',
      summary: '',
      text: '',
    },
  );

  const _getTemplateOptions = () => [
    {value: '', text: '-------'},
    ...emailTemplates.toJS().map(t => ({
      value: String(t.emailTemplateId),
      text: t.shortDescription,
    })),
  ];

  useEffect(() => {
    getEmailTemplates();
  }, [getEmailTemplates])

  const _handleChange = event => {
    const {name, value} = event.target;

    setState({[name]: value});
  };

  const _handleChangeTemplate = event => {
    const {value} = event.target;
    const _emailTemplates = emailTemplates.toJS();
    const template = _.find(
      _emailTemplates,
      t => String(t.emailTemplateId) === value,
    );

    if (template) {
      setState({
        template: String(template.emailTemplateId),
        summary: template.subject,
        text: template.body,
      });
    }
  };

  const _sendEmail = () => {
    sendEmail(state);
    close();
  };

  const {template, summary, text} = state;
  const valid = template && summary && text;

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Enviar Email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={12}>
            <Form horizontal>
              <FormGroup>
                <Col sm={3}>
                  <ControlLabel>Para</ControlLabel>
                </Col>
                <Col sm={9}>
                  <FormControl
                    type="text"
                    name="email"
                    value={client.get('email')}
                    disabled
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={3}>
                  <ControlLabel>Plantilla</ControlLabel>
                </Col>
                <Col sm={9}>
                  <FormControl
                    componentClass="select"
                    value={template}
                    name="template"
                    onChange={_handleChangeTemplate}
                  >
                    {_getTemplateOptions().map(template => (
                      <option key={template.text} value={template.value}>
                        {template.text}
                      </option>
                    ))}
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={3}>
                  <ControlLabel>Asunto</ControlLabel>
                </Col>
                <Col sm={9}>
                  <p>{summary}</p>
                  <FormControl
                    type="text"
                    name="summary"
                    defaultValue={summary}
                    onChange={_handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={3}>
                  <ControlLabel>Cuerpo</ControlLabel>
                </Col>
                <Col sm={9}>
                  <QuillEditor
                    theme="snow"
                    value={text}
                    onChange={value =>
                      _handleChange({target: {name: 'text', value}})
                    }
                  />
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="success" disabled={!valid} onClick={_sendEmail}>
          Enviar
        </Button>
        <Button bsStyle="danger" onClick={close}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

SendEmail.propTypes = {
  close: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
  emailTemplates: PropTypes.object.isRequired,
  getEmailTemplates: PropTypes.func.isRequired,
};

const mapStateToProps = ({client, common}) => ({
  client: client.get('client'),
  emailTemplates: common.get('emailTemplates'),
});

const mapDispatchToProps = {sendEmail, getEmailTemplates};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendEmail);
