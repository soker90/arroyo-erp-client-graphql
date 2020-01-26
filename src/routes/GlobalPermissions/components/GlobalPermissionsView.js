import React, {memo, useReducer, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  ListGroup,
  ListGroupItem,
  Row,
  Checkbox,
  FormControl,
  FormGroup,
  Button,
} from 'react-bootstrap';

import InfoPanel from 'components/InfoPanel';
import {Container} from 'components/Container';
import {USER_PERMISSIONS, USER_PERMISSION_LIST} from 'utils/user-permissions';
import HasPermission from 'components/HasPermission';

const GlobalPermissionsView = memo(function GlobalPermissionsView({
  roles,
  rolePermissions,
  getRoles,
  getRolePermissions,
  updatePermissions,
  isLoading,
  addNotification,
}) {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {}
  );
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  useEffect(() => {
    const permissions = {};
    USER_PERMISSION_LIST.forEach(permission => {
      permissions[permission] = rolePermissions.includes(permission);
    });

    setState(permissions);
  }, [rolePermissions]);

  const handleSelectRole = async event => {
    const {value} = event.target;
    setSelectedRole(value);
    getRolePermissions(value);
  };

  const handleChangePermission = (permission, checked) => {
    setState({[permission]: checked});
  };

  const handleUpdatePermission = () => {
    addNotification({
      level: 'warning',
      title: '¡ATENCIÓN!',
      message: `Se van a actualizar los permisos del rol (${selectedRole})`,
      action: {
        label: 'ACTUALIZAR PERMISOS',
        callback: () => {
          const updatedList = Object.keys(state).filter(
            key => state[key] === true
          );
          updatePermissions(updatedList, selectedRole);
        },
      },
      autoDismiss: 0,
      dismissible: true,
    });
  };

  return (
    <Container className="tab-body">
      <Row>
        <InfoPanel xs={12} static title="Listado de permisos">
          <FormGroup>
            <FormControl componentClass="select" onChange={handleSelectRole}>
              <option value="">Selecciona un rol</option>
              {roles.map(role => (
                <option key={role.roleId} value={role.roleId}>
                  {role.description}
                </option>
              ))}
            </FormControl>
          </FormGroup>
          {selectedRole && (
            <ListGroup>
              {USER_PERMISSION_LIST.map(permission => {
                return (
                  <ListGroupItem key={permission}>
                    <div className="permission-group-list">
                      <div>{permission}</div>
                      <div>
                        <HasPermission access={USER_PERMISSIONS.USERS_EDIT}>
                          <Checkbox
                            id="permissions-handler"
                            checked={state[permission] || false}
                            onChange={e =>
                              handleChangePermission(
                                permission,
                                e.target.checked
                              )
                            }
                          />
                        </HasPermission>
                      </div>
                    </div>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          )}
          {selectedRole && (
            <Button
              bsStyle="primary"
              disabled={isLoading}
              onClick={handleUpdatePermission}
            >
              Actualizar
            </Button>
          )}
        </InfoPanel>
      </Row>
    </Container>
  );
});

GlobalPermissionsView.propTypes = {
  roles: PropTypes.array.isRequired,
  getRoles: PropTypes.func.isRequired,
  rolePermissions: PropTypes.object.isRequired,
  getRolePermissions: PropTypes.func.isRequired,
  updatePermissions: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default GlobalPermissionsView;
