import React, {memo, useEffect, useReducer} from 'react';
import {
  Panel,
  FormGroup,
  ButtonToolbar,
  Button,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import DataContent from 'components/DataContent';
import FA from 'react-fontawesome';
import {isEmptyObject} from 'utils';

const fields = {
  name: 'Nombre',
  lastname: 'Apellidos',
  email: 'Correo electrónico',
  dni: 'DNI',
};

const UserDetails = memo(({selectedUser, roleList,isLoading, handleEditUser, addNotification, resetPassword}) =>{
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      ...selectedUser,
      editField: '',
      editRole: false,
      roleIds: [],
    }
  );

  useEffect(() => {
    setState(selectedUser);
    if(selectedUser?.roles?.length > 0) {
      setState({roleIds: selectedUser.roles.map(r => r.roleId)})
    }
  }, [selectedUser]);

  const _editableInput = name => {
    const {[name]: value} = state;
    return (
      <FormGroup validationState={!value ? 'error' : 'success'}>
        <FormControl
          type="text"
          name={name}
          value={value}
          onChange={_handleChange}
        />
      </FormGroup>
    );
  };

  const _handleChangeRole = event => {
    const {value} = event.target;
    const roleIds = [...state.roleIds];

    if (!roleIds.includes(value)) {
      setState({roleIds: roleIds.concat(value)});
    } else {
      setState({roleIds: roleIds.filter(r => r !== value)});
    }
  };

  const  _handleChange = event => {
    const {name, value} = event.target;

    setState({[name]: value});
  };

  const _handleSubmit = () => {
    const {roleIds} = state;

    setState({roles: roleList.filter(r => roleIds.includes(r.roleId))});

    handleEditUser(state);
    setState({editField: '', editRole: false});
  };

  const _handleResetPassword = () => {
    addNotification({
      level: 'warning',
      title: '¡ATENCIÓN!',
      message:
        'Ésta acción cambia la contraseña del usuario por una nueva y se la envía a su email.',
      action: {
        label: 'CAMBIAR Y ENVIAR CONTRASEÑA',
        callback: () => {
          resetPassword(state.login);
        },
      },
      autoDismiss: 0,
      dismissible: true,
    });
  };

  const _renderFooter = () => {
    if (state.editField || state.editRole) {
      return (
        <ButtonToolbar>
          <Button bsStyle="success" onClick={_handleSubmit}>
            Guardar cambios
          </Button>
          <Button
            bsStyle="danger"
            onClick={() => setState({editField: '', editRole: false})}
          >
            cancelar
          </Button>
        </ButtonToolbar>
      );
    }
    return (
      <ButtonToolbar>
        <Button
          id="tooltip-top"
          disabled={isLoading}
          bsStyle="success"
          onClick={_handleResetPassword}
        >
          Resetear contraseña
        </Button>
      </ButtonToolbar>
    );
  };

    if (!isEmptyObject(selectedUser)) {
      return (
        <Panel footer={_renderFooter()} header="Detalle de usuario">
          {Object.keys(fields).map(field => (
            <DataContent
              key={field}
              title={fields[field]}
              onClick={() => setState({editField: field})}
            >
              {state.editField === field
                ? _editableInput(field)
                : state[field]}{' '}
              {state.editField === '' && <FA name="edit" />}
            </DataContent>
          ))}
          <h4 onClick={() => setState({editRole: true})}>
            Roles <FA name="edit" />
          </h4>
          {state.editRole && (
            <FormGroup>
              <ControlLabel>Role</ControlLabel>
              <FormControl
                multiple
                id="roles-select"
                componentClass="select"
                name="roles"
                value={state.roleIds}
                onChange={_handleChangeRole}
              >
                {roleList.map(item => (
                  <option key={item.roleId} value={item.roleId}>
                    {item.description}
                  </option>
                ))}
              </FormControl>
            </FormGroup>
          )}
          {state.roles &&
            state.roles.length &&
            state.roles.map(role => (
              <DataContent key={role.roleId} title="Role">
                <span>{role.description} </span>
              </DataContent>
            ))}
        </Panel>
      );
    }
    return null;
});

export default UserDetails;