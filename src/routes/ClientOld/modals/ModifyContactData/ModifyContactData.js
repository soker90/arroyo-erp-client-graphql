import React, {memo, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';

import {
  Modal,
  Col,
  Button,
  Panel,
  Form,
  FormGroup,
  FormControl,
} from 'react-bootstrap';

const ModifyContactData = memo(({client, saveClientData, close, tabKey, show, className}) => {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      ...client,
    },
  );
  useEffect(() => {
    setState(client);
  }, [client])


  const _handleChange = ({target: {name, value}}) => {
    setState({[name]: value});
  };

  const _handleSubmit = () => {
    saveClientData(state, () => {
      close();
    });
  };
  const {
    email,
    mobile,
    address,
    zipcode,
    province,
    city,
    email2,
    mobile2,
    addressNew,
    zipcodeNew,
    provinceNew,
    cityNew,
  } = state;

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Modifica los datos de contacto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form horizontal>
          {tabKey === 1 && (
            <Panel
              header="Contacto Principal"
              className={className}
            >
              <Col sm={12}>
                <FormGroup>
                  <Col sm={5}>Email</Col>
                  <Col sm={7}>
                    <FormControl
                      type="text"
                      name="email"
                      value={email || ''}
                      onChange={_handleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col sm={5}>Móvil</Col>
                  <Col sm={7}>
                    <FormControl
                      type="text"
                      name="mobile"
                      value={mobile || ''}
                      onChange={_handleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col sm={5}>Dirección</Col>
                  <Col sm={7}>
                    <FormControl
                      type="text"
                      name="address"
                      value={address || ''}
                      onChange={_handleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col sm={5}>Cód.postal</Col>
                  <Col sm={7}>
                    <FormControl
                      type="text"
                      name="zipcode"
                      value={zipcode || ''}
                      onChange={_handleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col sm={5}>Provincia</Col>
                  <Col sm={7}>
                    <FormControl
                      type="text"
                      name="province"
                      value={province || ''}
                      onChange={_handleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col sm={5}>Ciudad</Col>ModifyPersonalData
                  <Col sm={7}>
                    <FormControl
                      type="text"
                      name="city"
                      value={city || ''}
                      onChange={_handleChange}
                    />
                  </Col>
                </FormGroup>
              </Col>
            </Panel>
          )}
          {tabKey === 2 && (
            <Panel
              header="Contacto Secundario"
              className={className}
            >
              <Col sm={12}>
                <FormGroup>
                  <Col sm={5}>Email</Col>
                  <Col sm={7}>
                    <FormControl
                      type="text"
                      name="email2"
                      value={email2}
                      onChange={_handleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col sm={5}>Móvil</Col>
                  <Col sm={7}>
                    <FormControl
                      type="text"
                      name="mobile2"
                      value={mobile2}
                      onChange={_handleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col sm={5}>Dirección</Col>
                  <Col sm={7}>
                    <FormControl
                      type="text"
                      name="addressNew"
                      value={addressNew}
                      onChange={_handleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col sm={5}>Cód.postal</Col>
                  <Col sm={7}>
                    <FormControl
                      type="text"
                      name="zipcodeNew"
                      value={zipcodeNew}
                      onChange={_handleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col sm={5}>Provincia</Col>
                  <Col sm={7}>
                    <FormControl
                      type="text"
                      name="provinceNew"
                      value={provinceNew}
                      onChange={_handleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col sm={5}>Ciudad</Col>
                  <Col sm={7}>
                    <FormControl
                      type="text"
                      name="cityNew"
                      value={cityNew}
                      onChange={_handleChange}
                    />
                  </Col>
                </FormGroup>
              </Col>
            </Panel>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="pull-right"
          bsStyle="primary"
          onClick={_handleSubmit}
        >
          Modificar
        </Button>
        <Button bsStyle="danger" onClick={close}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

ModifyContactData.propTypes = {
  close: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
  saveClientData: PropTypes.func.isRequired,
  tabKey: PropTypes.number.isRequired,
};

export default ModifyContactData;
