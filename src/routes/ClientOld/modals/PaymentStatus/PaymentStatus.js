import React, {memo, useEffect, useReducer} from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Button,
  Col,
  Form,
  FormGroup,
  FormControl,
  Panel,
  ControlLabel,
} from "react-bootstrap";
import DataContent from "components/DataContent";

import moment from "moment";
import {recoveryStatus} from "utils/constants";

const contactListOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const PrescriberDetailsModal = memo(
  ({recovery, clientId, show, close, saveRecoveryData, className}) => {
    const [state, setState] = useReducer(
      (state, newState) => ({...state, ...newState}),
      {
        unpaidStatus: recovery?.unpaidStatus,
        promiseDate: recovery.promiseDate,
        nextProcess: recovery.nextProcess,
        judicial: recovery.judicial,
        messagesNumber: recovery.messagesNumber || 0,
      }
    );

    useEffect(() => {
      setState(recovery);
    }, [recovery, clientId]);

    const handleChange = ({target: {name, value}}) => {
      if (name === "judicial") {
        setState({judicial: !state.judicial});
        return;
      }
      if (name === "nextProcess") {
        setState({nextProcess: value});
        return;
      }
      if (name === "messagesNumber") {
        setState({messagesNumber: Number(value)});
        return;
      }
      setState({[name]: value});
    };

    const handleSubmit = () => {
      const data = state;

      data.nextProcess = Number(moment(data.nextProcess).format("x"));
      data.promiseDate = Number(moment(data.promiseDate).format("x"));

      saveRecoveryData(data, () => {
        setState({});
        close();
      });
    };

    return (
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Situación de pagos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Panel header="Modificar los campos" className={className}>
            <Col xs={6}>
              <div className="nera_data">
                <form>
                  <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Estatus de impagado</ControlLabel>
                    <FormControl
                      componentClass="select"
                      name="unpaidStatus"
                      placeholder="Selecciona un estado"
                      onChange={handleChange}
                      defaultValue={recovery.unpaidStatus}
                    >
                      {recoveryStatus.map(item => (
                        <option key={item.key} value={item.key}>
                          {item.value}
                        </option>
                      ))}
                    </FormControl>
                  </FormGroup>
                </form>
                <form>
                  <FormGroup controlId="contactoControlSelect">
                    <ControlLabel>Contacto</ControlLabel>
                    <FormControl
                      componentClass="select"
                      name="messagesNumber"
                      placeholder="Selecciona de la lista"
                      onChange={handleChange}
                      defaultValue={recovery.messagesNumber}
                    >
                      {contactListOptions.map(item => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </FormControl>
                  </FormGroup>
                </form>
                <hr />
                <DataContent title="Enviado a judicial">
                  <input
                    type="checkbox"
                    name="judicial"
                    disabled={recovery.judicial}
                    value={state.judicial || ""}
                    onChange={handleChange}
                    checked={state.judicial}
                  />
                </DataContent>
              </div>
            </Col>

            <Col xs={6}>
              <div className="nera_data">
                <DataContent title="Fecha de promesa">
                  <Form inline style={{padding: 0}}>
                    <FormGroup>
                      <FormControl
                        bsSize="sm"
                        type="date"
                        name="promiseDate"
                        value={moment(state.promiseDate).format("YYYY-MM-DD")}
                        onChange={e =>
                          handleChange({
                            target: {
                              name: "promiseDate",
                              value: e.target.value,
                            },
                          })
                        }
                      />
                    </FormGroup>
                  </Form>
                </DataContent>

                <DataContent title="Próxima gestión">
                  <Form inline style={{padding: 0}}>
                    <FormGroup>
                      <FormControl
                        bsSize="sm"
                        type="date"
                        name="nextProcess"
                        value={moment(state.nextProcess).format("YYYY-MM-DD")}
                        onChange={e =>
                          handleChange({
                            target: {
                              name: "nextProcess",
                              value: e.target.value,
                            },
                          })
                        }
                      />
                    </FormGroup>
                  </Form>
                </DataContent>
              </div>
            </Col>
          </Panel>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={() => handleSubmit()}>
            Guardar
          </Button>
          <Button bsStyle="danger" onClick={close}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
);

PrescriberDetailsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  saveRecoveryData: PropTypes.func.isRequired,
  recovery: PropTypes.object.isRequired,
  clientId: PropTypes.number,
};

export default PrescriberDetailsModal;
