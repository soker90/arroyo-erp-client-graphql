import React, {memo, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {actions} from '../../modules/actions';
import {pick} from 'lodash';
import {
  Form,
  FormGroup,
  Modal,
  Col,
  Button,
  Panel,
  FormControl,
} from 'react-bootstrap';

const allowedFields = [
  'email',
  'phone',
  'address',
  'zipcode',
  'province',
  'city',
  'comments',
  'clientContactInfoId',
];

const ModifyOtherContactData = memo(props => {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    pick(props, allowedFields),
  );

  useEffect(() => {
    setState(props);
  }, [props]);

  const _handleChange = event => {
    const {name, value} = event.target;

    setState({[name]: value});
  };

  const _handleSubmit = () => {
    const {setClientContactInfo, close, clientId} = props;
    const data = Object.assign({}, state, {clientId});

    if (clientId) {
      setClientContactInfo(data);
      close();
    }
  };

  const _renderInput = (id, label, type = 'text') =>
    <FormGroup>
      <Col sm={5}>{label}</Col>
      <Col sm={7}>
        <FormControl
          type={type}
          name={id}
          value={state[id] || ''}
          onChange={_handleChange}
        />
      </Col>
    </FormGroup>;

  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>Modifica los datos de contacto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form horizontal>
          <Panel header="Detalle de contacto" className={props.className}>
            <Col sm={12}>
              {_renderInput('email', 'Email')}
              {_renderInput('phone', 'Teléfono')}
              {_renderInput('address', 'Dirección')}
              {_renderInput('zipcode', 'Código Postal')}
              {_renderInput('province', 'Provincia')}
              {_renderInput('city', 'Ciudad')}
              {_renderInput('comments', 'Comentarios')}
              <Button
                className="pull-right"
                bsStyle="primary"
                onClick={_handleSubmit}
              >
                Actualizar
              </Button>
            </Col>
          </Panel>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="danger" onClick={props.close}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

ModifyOtherContactData.propTypes = {
  close: PropTypes.func.isRequired,
  clientId: PropTypes.number.isRequired,
  email: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  zipcode: PropTypes.string,
  province: PropTypes.string,
  city: PropTypes.string,
  comments: PropTypes.string,
  setClientContactInfo: PropTypes.func.isRequired,
  clientContactInfoId: PropTypes.number.isRequired,
};

const mapStateToProps = ({client}) => ({
  clientId: client.getIn(['client', 'clientId']),
});

const mapDispatchToProps = {...actions};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModifyOtherContactData);
