import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider, Button,
} from '@material-ui/core';
import {useStyles} from './ModalGeneric.styles';


const ModalGeneric =
  ({show, close, title, children, actions}) => {
    const classes = useStyles();

    if (!show) {
      return null;
    }

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
        <Card className={classes.root}>
          <form>
            <CardHeader title={title}/>
            <Divider/>
            <CardContent>
              {children}
            </CardContent>
            <Divider/>
            <CardActions className={classes.actions}>
              {actions?.map(_renderButton)}
            </CardActions>
          </form>
        </Card>
      </Modal>
    );
  };

ModalGeneric.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  actions: PropTypes.array,
};

ModalGeneric.displayName = 'ModalGeneric';

export default memo(ModalGeneric);
