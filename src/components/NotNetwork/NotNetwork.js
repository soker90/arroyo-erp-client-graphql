import React, {memo} from 'react';
import {
  Typography,
  Button,
} from '@material-ui/core';
import {useStyles} from './NotNetwork.styles';
import ErrorGeneric from '../../assets/error.svg';

const NotNetwork = () => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
    >
      <Typography
        align="center"
        variant='h1'
      >
        Sin conexión
      </Typography>
      <Typography
        align="center"
        variant="subtitle2"
        className={classes.subtitle}
      >
        ¡Oh, no! No podemos conectar con NERA.
      </Typography>
      <Typography
        align="center"
        variant="subtitle2"
      >
        1. Comprueba tu conexion a Internet.
      </Typography>
      <Typography
        align="center"
        variant="subtitle2"
      >
        2. Comprueba la conexion a la VPN.
      </Typography>
      <Typography
        align="center"
        variant="subtitle2"
      >
        3. Pulsa Ctrl + shift + R para refrescar.
      </Typography>
      <Typography
        align="center"
        variant="subtitle2"
      >
        4. Pregunta a Backend.
      </Typography>
      <div className={classes.imageContainer}>
        <img
          alt="image_error"
          className={classes.image}
          src={ErrorGeneric}
        />
      </div>
      <div className={classes.buttonContainer}>
        <Button
          color="primary"
          onClick={() => window.location.reload()}
          variant="outlined"
        >
          Refrescar
        </Button>
      </div>
    </div>
  );
};

NotNetwork.displayName = 'NotFound';

export default memo(NotNetwork);