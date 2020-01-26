import React, {memo, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  TextField,
  Button,
} from '@material-ui/core';
import {useStyles} from './ChangeIBAN.styles';
import IBAN from 'iban';

const ChangeIBAN = memo(
  ({
     show, close, currentIban, changeIBAN,
   }) => {
    const classes = useStyles();

    const [newIban, setNewIban] = useState('');
    const [valid, setValid] = useState(false);


    useEffect(() => {
      setValid(IBAN.isValid(newIban));
    }, [newIban]);

    useEffect(() => {
      setNewIban('');
    }, [currentIban]);

    const ibanFormatted = IBAN.printFormat(
      String(currentIban).replace(/\*/g, 'X'),
      ' ');


    /**
     * Handle set new iban
     * @param {String} value
     * @private
     */
    const _handleChange = ({target: {value}}) => {
      setNewIban(value);
    };

    /**
     * Handle submit
     * @private
     */
    const _handleSubmit = () => {
      if (valid) {
        changeIBAN(newIban, () => {
          close();
        })
      }
    };

    if (!show) {
      return null;
    }

    /**
     * Render input
     * @private
     * @param {Object} options
     */
    const _renderInput = options =>
      <Grid
        item
        md={12}
        xs={12}
      >
        <TextField
          fullWidth
          variant="outlined"
          {...options}
        />
      </Grid>;

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
          onClick={_handleSubmit}
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
            <CardHeader title="Cambiar IBAN"/>
            <Divider/>
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                {_renderInput({label: 'IBAN actual', value: ibanFormatted, disabled: true})}
                {_renderInput({label: 'IBAN nuevo', value: newIban, onChange: _handleChange, error: !valid})}
              </Grid>
            </CardContent>
            <Divider/>
            {_renderButtons()}
          </form>
        </Card>
      </Modal>
    );
  });

ChangeIBAN.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  currentIban: PropTypes.string,
  changeIBAN: PropTypes.func.isRequired,
};

export default ChangeIBAN;