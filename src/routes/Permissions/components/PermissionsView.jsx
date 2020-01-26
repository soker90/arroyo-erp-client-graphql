import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem, Row} from 'react-bootstrap';

import InfoPanel from 'components/InfoPanel';
import {Container} from 'components/Container';
import {USER_PERMISSION_LIST} from 'utils/user-permissions';

import '../styles/permissions.scss';

const PermissionsView = memo(function PermissionsView({permissions, user}) {
  const roles = user.roles;

  return (
    <Container className="tab-body">
      <Row>
        <InfoPanel xs={12} static title="Listado de permisos">
          {roles.length &&
            roles.map(role => <p key={role.roleId}>{role.description}</p>)}
          <ListGroup>
            {USER_PERMISSION_LIST.map(permission => {
              const color = permissions.includes(permission) ? 'green' : 'red';
              return (
                <ListGroupItem key={permission}>
                  <div
                    className="bullet"
                    style={{background: color, marginRight: '1rem'}}
                  />
                  {permission}
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </InfoPanel>
      </Row>
    </Container>
  );
});

PermissionsView.propTypes = {
  permissions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default PermissionsView;
