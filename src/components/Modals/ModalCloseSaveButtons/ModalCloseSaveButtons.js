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
import {useStyles} from './ModalCloseSaveButtons.styles';


const ModalCloseSaveButtons = memo(
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
        <Button onClick={close}>
          Cerrar
        </Button>
        <Button
          color="primary"
          onClick={action}
          variant="contained"
        >
          Guardar
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

ModalCloseSaveButtons.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
};

ModalCloseSaveButtons.displayName = 'ModalCloseSaveButtons';

export default ModalCloseSaveButtons;
