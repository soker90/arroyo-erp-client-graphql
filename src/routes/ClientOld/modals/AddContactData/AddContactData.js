import React, {memo, useReducer} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {setClientContactInfo} from 'routes/ClientOld/modules/actions';

import {
  Modal,
  Col,
  Button,
  Panel,
  Form,
  FormGroup,
  FormControl,
} from 'react-bootstrap';

const AddContactData = memo(function AddContactData({
  close,
  show,
  className,
  clientId,
  setClientContactInfo,
}) {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {}
  );

  const handleChange = event => {
    event.preventDefault();
    const {name, value} = event.target;

    setState({[name]: value});
  };

  const handleSubmit = () => {
    const data = Object.assign({}, state, {clientId});

    if (clientId) {
      setClientContactInfo(data);
      setState({});
      close();
    }
  };

  const renderFormItem = (type, name, title) => (
    <FormGroup>
      <Col sm={5}>{title}</Col>
      <Col sm={7}>
        <FormControl type={type} name={name} onChange={handleChange} />
      </Col>
    </FormGroup>
  );

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Datos de contacto adicionales</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form horizontal>
          <Panel header="Añade un contacto" className={className}>
            <Col sm={12}>
              {renderFormItem('text', 'email', 'Email')}
              {renderFormItem('text', 'phone', 'Teléfono')}
              {renderFormItem('text', 'address', 'Dirección')}
              {renderFormItem('number', 'zipcode', 'Código Postal')}
              {renderFormItem('text', 'province', 'Provincia')}
              {renderFormItem('text', 'city', 'Ciudad')}
              {renderFormItem('text', 'comments', 'Comentarios')}
              <Button
                className="pull-right"
                bsStyle="primary"
                onClick={handleSubmit}
              >
                Añadir Nuevo Contacto
              </Button>
            </Col>
          </Panel>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="danger" onClick={close}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

AddContactData.propTypes = {
  close: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
  clientId: PropTypes.number.isRequired,
  setClientContactInfo: PropTypes.func.isRequired,
};

const mapStateToProps = ({client}) => ({
  client: client.get('client'),
  clientId: client.getIn(['client', 'clientId']),
});

export default connect(
  mapStateToProps,
  {setClientContactInfo}
)(AddContactData);
