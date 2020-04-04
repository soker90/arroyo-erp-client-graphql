import React, {memo} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {
  Typography,
  Button,
} from '@material-ui/core';
import {useStyles} from './NotFound.styles';
import Error404Image from '../../assets/error404.svg';

const NotFound = () => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
    >
      <Typography
        align="center"
        variant='h1'
      >
        Error 404: Página no encontrada
      </Typography>
      <Typography
        align="center"
        variant="subtitle2"
      >
        ¡Oh, no! No encontramos la pàgina que estás buscando
      </Typography>
      <div className={classes.imageContainer}>
        <img
          alt="image_error"
          className={classes.image}
          src={Error404Image}
        />
      </div>
      <div className={classes.buttonContainer}>
        <Button
          color="primary"
          component={RouterLink}
          to="/"
          variant="outlined"
        >
          Volver a la página inicial
        </Button>
      </div>
    </div>
  );
};

NotFound.displayName = 'NotFound';

export default memo(NotFound);