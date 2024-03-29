import React, {Fragment, memo} from 'react';
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


const ModalBase =
  ({show, close, title, children, action, actions}) => {
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
      <Fragment>
        <Button onClick={close} className={classes.buttonCancel}>
          {action ? 'Cancelar' : 'Cerrar'}
        </Button>
        {action && <Button onClick={action} className={classes.buttonAccept}>
          Aceptar
        </Button>}
      </Fragment>
    ;

    /**
     *
     * @param  value
     * @param rest
     * @param {number} index
     * @returns {Button}
     * @private
     */
    const _renderButton = ({value, ...rest}, index) =>
      <Button key={index} {...rest}>
        {value}
      </Button>;


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
            <CardActions className={classes.actions}>
              {actions?.map(_renderButton) || _renderButtons()}
            </CardActions>
          </form>
        </Card>
      </Modal>
    );
  };

ModalBase.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  action: PropTypes.func,
  actions: PropTypes.array,
};

ModalBase.displayName = 'ModalBase';

export default memo(ModalBase);
