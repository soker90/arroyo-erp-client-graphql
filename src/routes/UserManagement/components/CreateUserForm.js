import React, {useState, useReducer} from 'react';
import PropTypes from 'prop-types';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';
import {isEmpty} from 'lodash';
import {
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  ButtonToolbar,
  Button,
  Panel,
} from 'react-bootstrap';

const inputState = {
  login: '',
  name: '',
  email: '',
  lastname: '',
  dni: '',
};

const selectState = {
  roleIds: [],
};

function CreateUserForm({createUser, roles, addNotification}) {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {...inputState, ...selectState}
  );
  const [userRoles, setUserRoles] = useState([]);

  const resetState = () => {
    setState({...inputState, ...selectState});
    setUserRoles([]);
  };

  const handleChange = event => {
    setState({[event.target.name]: event.target.value});
  };

  const handleChangeRole = event => {
    let roleExists;
    const {value} = event.target;
    const [selectedRole] = roles.filter(role => role.roleId === value);

    if (!isEmpty(userRoles)) {
      roleExists = userRoles.some(role => role.roleId === value);
    }

    if (!roleExists) {
      setUserRoles([...userRoles, selectedRole]);
      setState({roleIds: [...state.roleIds, value]});
      return;
    }

    const updatesUserRoles = userRoles.filter(role => role.roleId !== value);
    const updatedRoleIds = state.roleIds.filter(role => role !== value);

    setState({roleIds: updatedRoleIds});
    setUserRoles(updatesUserRoles);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const isFormFulfilled = Object.keys(inputState).every(
      key => state[key] !== ''
    );
    const selectFilled = userRoles.length > 0;

    if (!isFormFulfilled || !selectFilled) {
      addNotification({
        level: 'info',
        title: 'Formulario',
        message: 'Revisa todos los campos antes de enviar.',
      });
      return;
    }

    createUser({...state, roles: userRoles});
    resetState();
  };

  const renderSearchFooter = () => {
    return (
      <ButtonToolbar>
        <Button type="submit" bsStyle="primary">
          Crear Nuevo Usuario
        </Button>
      </ButtonToolbar>
    );
  };

  const renderForm = () => {
    return (
      <Form inline onSubmit={handleSubmit} className="search-client-form">
        <Panel header="Crear Usuario" footer={renderSearchFooter()}>
          {renderFormInput('login', 'Login')}
          {renderFormInput('name', 'Nombre')}
          {renderFormInput('email', 'Correo Electrónico')}
          {renderFormInput('lastname', 'Apellidos')}
          {renderFormInput('dni', 'DNI')}
          <FormGroup
            controlId="roles-select"
            validationState={state.roleIds.length === 0 ? 'error' : 'success'}
          >
            <ControlLabel>Role</ControlLabel>
            <FormControl
              multiple
              id="roles-select"
              componentClass="select"
              name="roles"
              value={state.roleIds}
              onChange={handleChangeRole}
            >
              {roles.map(item => (
                <option key={item.roleId} value={item.roleId}>
                  {item.description}
                </option>
              ))}
            </FormControl>
          </FormGroup>
          <div style={{margin: '1rem 0'}}>
            {userRoles.length > 0 && (
              <h4>
                Rol{userRoles.length > 1 && 'es'} seleccionado
                {userRoles.length > 1 && 's'}
              </h4>
            )}
            <ul>
              {userRoles.length > 0 &&
                userRoles.map(role => (
                  <li key={role.roleId}>
                    Role: {role.description} ({role.roleId})
                  </li>
                ))}
            </ul>
          </div>
        </Panel>
      </Form>
    );
  };

  const renderFormInput = (name, label) => {
    return (
      <FormGroup
        controlId={name}
        validationState={!state[name] ? 'error' : 'success'}
      >
        <ControlLabel>{label}</ControlLabel>
        <FormControl
          type="text"
          name={name}
          value={state[name] || ''}
          onChange={handleChange}
        />
      </FormGroup>
    );
  };

  return (
    <HasPermission access={USER_PERMISSIONS.USERS_EDIT}>
      {renderForm()}
    </HasPermission>
  );
}

CreateUserForm.propTypes = {
  createUser: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired,
  addNotification: PropTypes.func.isRequired,
};

export default CreateUserForm;
