# NERA 5.1

- production Build Status: [![build status](https://gitlab.fintonic.com/wanna-projects/nera-frontend/badges/production/build.svg)](https://gitlab.fintonic.com/wanna-projects/nera-frontend/commits/production)

- dev Build Status:    [![build status](https://gitlab.fintonic.com/wanna-projects/nera-frontend/badges/dev/build.svg)](https://gitlab.fintonic.com/wanna-projects/nera-frontend/commits/dev)

## Descripción

Es la parte frontal del backoffice de wanna para España.
Es un proyecto desarrollado en `React`. (v.16.9.0) y gestiona el **state** de la aplicación mediante `redux` (v.4.0.4).

Debe servirse como **SPA** redirigiendo las peticiones a `index.html` para que el router de react `react-routes-dom` (v.5.0.0) se haga cargo de la gestión de las **URLS**.

Provee acceso a la información a través de conexiones seguras bajo **VPN** al personal del equipo.

## Docker

La imagen base que ultiliza este proyecto es [base-node-npm:8](https://gitlab.fintonic.com/fintonic-ops/docker/base-node-npm/blob/master/Dockerfile.8) Build Status:[![build status](https://gitlab.fintonic.com/fintonic-ops/docker/base-node-npm/badges/master/build.svg)](https://gitlab.fintonic.com/fintonic-ops/docker/base-node-npm/commits/master)

## Testing

Para realizar la ejecución de tests:

`npm test`

NOTA: Actualmente no está teniendo el cuenta el analisis de coverage al ejecutar el pipeline ya que no cumple los minimos y el job falla.

## Puesta en marcha

### Config - Variables de entorno

Se declaran en el `package.json` del proyecto y van precedidas por el flag `NERA_`

- NERA_API_HOST
- ARROYO_ROUTER_BASE_PATH
- NODE_ENV

### Instalar dependencias

`npm install`

### Ejecución en local con DB Local

*NOTA: *Necesita tener backend levantado en local*

Podria servirse del fichero `.jar` que despliega backend para levantar un servidor local si fuera necesario en algún remoto caso.

`npm start`

Se levanta un servidor con datos mockeados y la transpilación de los ficheros.
Se sirve en <http://localhost:3000>

### Ejecución en local contra PRE

Para levantar el servidor conectando con la base de datos de PRE ejecutar:

`npm run start:pre`

Se sirve en <http://localhost:3000>

### Ejecución en local contra PRE (HTTPS)

Para levantar el servidor bajo HTTPS con la base de datos de PRE ejecutar:

`npm run start:pres`

Para evitar los errores de certificado y seguridad lanzamos una nueva instancia de Chrome con el siguiente comando:

```shell
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --user-data-dir=/tmp/foo --ignore-certificate-errors --unsafely-treat-insecure-origin-as-secure=https://localhost:3000
```

Se sirve en <https://localhost:3000> (HTTPS)

### Ejecución en local contra PROD

Para levantar el servidor conectando con la base de datos de producción

`npm run start:prod`

Se sirve en <http://localhost:3000>

## Despliegues Legacy

### Despliegue en Pre-producción

Se construyen los estáticos con el comando `npm run build:pre` que tiene de target la carpeta `dist`.

`./deploy-pre.sh +ruta_a_fichero.pem +nombre_rama`

Se sirve en <http://10.0.75.162>

### Despliegue en Producción

Se construyen los estáticos con el comando `npm run build:prod` que tiene de target la carpeta `dist`.

`./deploy-pro.sh +ruta_a_fichero.pem +nombre_rama`

Se sirve en <https://backoffice.wanna.es> (HTTPS)

### logging

El fichero `activity.log` recoge la información de los despliegues cuando se ejecutan los scripts `deploy-pre.sh` y `deploy-pro.sh`.

```shell
Desplegando nueva version en PRE -> nera_2019-07-04_170835
Desplegando rama feat/refactor ->
```


# Examples

## How to create a new view

  - Create a Route folder into `src/routes` with this structure
```
└───routes
│   │
│   └───Route
│        └───components
│             └───RouteView.jsx
│        └───containers
│             └───RouteContainer.js
│        └───modals
│             └───RouteModal.jsx
│             └───index.js
│        └───modules
│             └───routename.js
│        └───styles
│             └───routename.js
│             └───routename.scss // css | js | scss | sass, etc
│        │   index.js
```

### Component View

View is an standar React component class or function
```js

import React, { Component } from 'react'

export default class componentName extends Component {
  render() {
    return (
      <div>
        Hello World!!
      </div>
    )
  }
}
```

### Container
Container is meant to be responsible to inject Redux, Material or any other prop from outside.

```js
import {connect} from 'react-redux';

import ReunificationView from '../components/ReunificationView';
import {actions as reuActions} from '../modules/reunification';
import {showModal} from 'reducers/modal';
import {addNotification} from 'reducers/notifications';

const mapStateToProps = ({reunification, loadingBar}) => ({ // Receiver (state)
  isLoading: !!loadingBar.default,
  reunificationData: reunification.reunificationData,
  loansTotalAmount: reunification.loansTotalAmount,
});

const mapDispatchToProps = {
  addNotification,
  ...reuActions,
  showModalEditReuLoan: (loanDetails, reunificationId, statusCod) =>
    showModal({
      modalType: 'EDIT_REUNIFICATION_LOAN',
      modalProps: {...loanDetails, reunificationId, statusCod},
    }),
};

export default connect(mapStateToProps, mapDispatchToProps)(ReunificationView);


```

### Modals
Modals are handled by redux, there is a reducer responsible to show or hide any of the app modals

__index.js__

```js
import RouteModal from './RouteModal';

export default {
  UNIQUE_NAME_TO_CALL_THIS_MODAL: RouteModal,
}
```

RouteModal.jsx
```js
...

return (
    <Modal show={this.props.show} onHide={this.props.close}>
      <Modal.Header closeButton>
        <Modal.Title>TITLE</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        // Any JSX, like children
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="primary" onClick={handleClick}>
          Si, Estoy Seguro/a
        </Button>
        <Button bsStyle="danger" onClick={this.props.close}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
```


### Modules
This file is responsible to handle actions from redux and to have the state of the route

```js
 import createReducer from 'redux/create-reducer';
import Immutable from 'immutable';
import {GET_RECOVERIES} from 'action-types';
import axios from 'axios';

export const getRefinanceContract = () => async (dispatch) => {
  dispatch({type: GET_RECOVERIES.REQUEST});

  try {
    const URL = 'recovery/getRefinanceContract'
    const response = await axios(URL);

    dispatch({type: GET_RECOVERIES.SUCCESS, payload: {
      level: 'success',  // success | warning | info | error
      title: 'Título', // {string} not mandatory
      message: 'Mensaje', // {string} mandatory
      action: {
        label: 'BUTTON TEXT',
        callback: () => {
          // whatever code to be executed after button click
        },
      },
      autoDismiss: 10 // Number in seconds
      dismissible: true|false // Boolean
    }});
    dispatch({type: GET_RECOVERIES.SET, payload: response.data});
  } catch (error) {
    console.log(error);
    dispatch({type: GET_RECOVERIES.FAILURE, error});
  }
};

export const actions = {
  getRefinanceContract,
};

const INITIAL_STATE = Immutable.fromJS({
  refinanceds: [],
});

const ACTION_HANDLERS = {
  [GET_RECOVERIES.SET]: (state, {payload}) =>
    state.set('refinanceds', Immutable.fromJS(payload)),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
```

### Styles
To set all styles for route or components, usually used to set Material overrides, Styled-components or just any kind of css file.

```js
import styled from 'styled-components';

export const ComponentStyled = styled.div`
  color: black;
  place: ojet ;)
`;

```
