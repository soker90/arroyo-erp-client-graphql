import React, {memo, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {actions} from '../../modules/actions';
import {
  Modal,
  Button,
  Col,
  Form,
  FormGroup,
  FormControl,
} from 'react-bootstrap';

const ModifyPersonalData = memo(props => {
  const _initialState = {
    name: props.client.get('name'),
    lastname: props.client.get('lastname'),
    sex: props.client.get('sex'),
    birthday: props.client.get('birthday'),
  };

  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    _initialState,
  );

  useEffect(() => {
    setState(_initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.client]);

  const _handleChange = event => {
    const {name, value} = event.target;
    setState({[name]: value});
  };

  const _handleSubmit = () => {
    const data = state;
    const {saveClientData, close} = props;
    saveClientData(data, () => {
      close();
    });
  };

  const {close} = props;
  const {name, lastname, sex, birthday} = state;

  return (
    <Modal show={props.show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Modifica Datos Personales</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form horizontal>
          <FormGroup>
            <Col sm={5}>Nombre</Col>
            <Col sm={7}>
              <FormControl
                type="text"
                name="name"
                value={name}
                onChange={_handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={5}>Apellidos</Col>
            <Col sm={7}>
              <FormControl
                type="text"
                name="lastname"
                value={lastname}
                onChange={_handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={5}>Sexo</Col>
            <Col sm={7}>
              <FormControl
                type="text"
                name="sex"
                value={sex}
                onChange={_handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={5}>Fecha de nacimiento</Col>
            <Col sm={7}>
              <FormControl
                type="text"
                name="birthday"
                value={birthday}
                onChange={_handleChange}
              />
            </Col>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="pull-right" bsStyle="danger" onClick={close}>
          Cerrar
        </Button>
        <Button bsStyle="primary" onClick={_handleSubmit}>
          Modificar
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

ModifyPersonalData.propTypes = {
  close: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
  saveClientData: PropTypes.func.isRequired,
};

const mapStateToProps = ({client}) => ({
  client: client.get('client'),
});

const mapDispatchToProps = {...actions};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModifyPersonalData);
