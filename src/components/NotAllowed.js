import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {Alert, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import FA from 'react-fontawesome';

const pmEmail = 'jjimenez@fintonic.com';

const sendAccessRequest = () => {
  window.open(`mailto:${pmEmail}`, '_self');
};

const NotAllowed = memo(({userRoles}) =>
  (userRoles) ?
    <div className="tab-body">
      <Alert bsStyle="danger">
        <FA name="lock" size="4x"/>
        <h4>Acceso Denegado</h4>
        <p>
          Parece que no dispones del permiso requerido para acceder a esta
          sección. Si crees que se trata de un error, por favor, solicita
          acceso.
        </p>
        <p>
          <Button onClick={sendAccessRequest} bsStyle="danger">
            Solicitar acceso
          </Button>
        </p>
      </Alert>
      <ListGroup>
        Has accedido como:
        {userRoles.map(({description}) => (
          <ListGroupItem key={description}>{description}</ListGroupItem>
        ))}
      </ListGroup>
    </div> :
    null,
);

NotAllowed.propTypes = {
  requiredRoles: PropTypes.array,
};

export default NotAllowed;
