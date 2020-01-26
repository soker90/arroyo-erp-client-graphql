import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  Button,
} from '@material-ui/core';
import {useStyles} from './ModalBase.styles';


const ModalBase = memo(
  ({show, close, title, children, action}) => {
    const classes = useStyles();

    if (!show) {
      return null;
    }

    /**
     * Render all buttons
     * @returns {CardActions}
     * @private
     */
    const _renderButtons = () =>
      <CardActions className={classes.actions}>
        <Button onClick={close}  className={classes.buttonCancel}>
          Cancelar
        </Button>
        <Button onClick={action} className={classes.buttonAccept}>
          Aceptar
        </Button>
      </CardActions>;


    return (
      <Modal
        onClose={close}
        open={show}
      >
        <Card
          className={classes.root}
        >
          <form>
            <CardHeader title={title}/>
            <Divider/>
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                {children}
              </Grid>
            </CardContent>
            <Divider/>
            {_renderButtons()}
          </form>
        </Card>
      </Modal>
    );
  })
;

ModalBase.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
};

ModalBase.displayName = 'ModalBase';

export default ModalBase;
