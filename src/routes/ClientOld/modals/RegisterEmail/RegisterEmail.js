import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setCommunication} from '../../modules/actions';
import moment from 'moment';

import {
  Col,
  Row,
  Form,
  FormGroup,
  Modal,
  Button,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';

import DateTimeField from 'react-datepicker';
import QuillEditor from 'react-quill';

import {subjects, directionTypes} from './data';

class RegisterEmail extends PureComponent {
  static propTypes = {
    close: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    setCommunication: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      comunicationTypeDescription: 'Email',
      dateComunication: parseInt(moment().format('x'), 10),
      summary: '',
      text: '',
      directionType: 'I',
      answer: true,
      isEmailSent: null,
    };
  }

  handleChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  };

  setCommunication = () => {
    const {close, setCommunication} = this.props;
    setCommunication(this.state);
    close();
  };

  render() {
    const {close, auth} = this.props;
    const client = this.props.client.toJS();
    const {dateComunication, summary, text, directionType} = this.state;
    const valid = summary && text;

    return (
      <Modal show={this.props.show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Registro de Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12}>
              <Form horizontal>
                <Row>
                  <Col sm={6}>
                    <FormGroup>
                      <Col sm={4}>
                        <ControlLabel>Cliente</ControlLabel>
                      </Col>
                      <Col sm={8}>
                        <FormControl
                          type="text"
                          name="regcall.name"
                          value={`${client.name} ${client.lastname}`}
                          disabled
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col sm={4}>
                        <ControlLabel>Móvil</ControlLabel>
                      </Col>
                      <Col sm={8}>
                        <FormControl
                          type="text"
                          name="regcall.phone1"
                          value={client.mobile}
                          disabled
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col sm={4}>
                        <ControlLabel>DNI</ControlLabel>
                      </Col>
                      <Col sm={8}>
                        <FormControl
                          type="text"
                          name="regcall.dni"
                          value={client.dni}
                          disabled
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col sm={4}>
                        <ControlLabel>Dirección</ControlLabel>
                      </Col>
                      <Col sm={8}>
                        <FormControl
                          componentClass="select"
                          value={directionType}
                          name="directionType"
                          onChange={event => this.handleChange(event)}
                        >
                          {directionTypes.map(directionType => (
                            <option
                              key={directionType.text}
                              value={directionType.value}
                            >
                              {directionType.text}
                            </option>
                          ))}
                        </FormControl>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col sm={6}>
                    <FormGroup>
                      <Col sm={4}>
                        <ControlLabel>Gestor</ControlLabel>
                      </Col>
                      <Col sm={8}>
                        <FormControl
                          type="text"
                          name="regcall.gestor"
                          value={auth.getIn(['user', 'login'])}
                          disabled
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col sm={4}>
                        <ControlLabel>Email</ControlLabel>
                      </Col>
                      <Col sm={8}>
                        <FormControl
                          type="text"
                          name="regcall.email2"
                          value={auth.getIn(['user', 'email'])}
                          disabled
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col sm={4}>
                        <ControlLabel>Fecha</ControlLabel>
                      </Col>
                      <Col sm={8}>
                        <DateTimeField
                          selected={dateComunication}
                          onChange={value =>
                            this.handleChange({
                              target: {
                                name: 'dateComunication',
                                value: parseInt(moment(value).format('x'), 10),
                              },
                            })
                          }
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <FormGroup>
                      <Col sm={3}>
                        <ControlLabel>Asunto</ControlLabel>
                      </Col>
                      <Col sm={9}>
                        <FormControl
                          componentClass="select"
                          value={summary}
                          onChange={event => this.handleChange(event)}
                          name="summary"
                        >
                          {subjects.map(subject => (
                            <option key={subject.text} value={subject.value}>
                              {subject.text}
                            </option>
                          ))}
                        </FormControl>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col sm={12}>
                    <FormGroup>
                      <Col sm={3}>
                        <ControlLabel>Comentario</ControlLabel>
                      </Col>
                      <Col sm={9}>
                        <QuillEditor
                          theme="snow"
                          value={text}
                          onChange={value =>
                            this.handleChange({target: {name: 'text', value}})
                          }
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle="success"
            disabled={!valid}
            onClick={this.setCommunication}
          >
            Guardar
          </Button>
          <Button bsStyle="danger" onClick={close}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = ({client, auth}) => ({
  client: client.get('client'),
  auth,
});

const mapDispatchToProps = {setCommunication};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterEmail);
