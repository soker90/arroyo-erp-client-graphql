import React, {memo} from 'react';
import {Row, Button} from 'react-bootstrap';
import {Container} from '../Container';
import {WANNA_LOGO} from 'constants/common';
import history from 'redux/history';

/**
 * Navigate to root path
 * @private
 */
const _handleClick = () => {
  history.push('/');
};

const NotFound = memo(() =>
  <div id="auth-container" className="login">
    <div className="auth-container-bg"/>
    <img alt="logo" className="logo-wanna-bottom" src={WANNA_LOGO}/>
    <Container id="auth-row">
      <Container id="auth-cell">
        <Row>
          <div style={{padding: 0}}>
            <div className="text-center arroyo-title"/>
            <div className="jumbotron">
              <h2>ERROR 404 - Página no encontrada</h2>
              <p>¡Oh, no! No encontramos la pàgina que estás buscando.</p>
              <Button onClick={_handleClick} bsStyle="primary">Volver a la página inicial</Button>
            </div>
          </div>
        </Row>
      </Container>
    </Container>
  </div>,
);

export default NotFound;
