import React, {memo, useReducer, useEffect} from 'react';
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
  TextField,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import deLocale from 'date-fns/locale/es';
import {useStyles} from './PaymentStatusModal.styles';
import {RECOVERY_STATUS, generateArrayNumber} from 'utils';
import moment from 'moment';

const PaymentStatusModal = memo(
  ({
     show, close, saveRecoveryData, recovery, clientId,
   }) => {
    const classes = useStyles();

    /**
     * Initial state
     * @type {{judicial: null, messagesNumber: number, promiseDate: number, unpaidStatus: string, nextProcess: number}}
     * @private
     */
    const _initialState = {
      unpaidStatus: recovery?.unpaidStatus,
      promiseDate: recovery.promiseDate,
      nextProcess: recovery.nextProcess,
      judicial: recovery.judicial,
      messagesNumber: recovery.messagesNumber || 0,
    };

    const [state, setState] = useReducer(
      (state, newState) => ({...state, ...newState}),
      _initialState,
    );

    useEffect(() => {
      setState(_initialState);
    }, [recovery, clientId]);

    /**
     * Handle change for select
     * @param {String} name
     * @param {String} value
     * @private
     */
    const _handleChangeSelect = ({target: {name, value}}) => {
      setState({[name]: value});
    };

    /**
     * Handle submit
     * @private
     */
    const _handleSubmit = () => {
      const data = state;

      data.nextProcess = Number(moment(data.nextProcess).format('x'));
      data.promiseDate = Number(moment(data.promiseDate).format('x'));

      saveRecoveryData(data, () => {
        close();
      });
    };

    if (!show) {
      return null;
    }

    /**
     * Handle change picker
     * @param {String} date
     * @param {String} name
     * @private
     */
    const _handleChangePicker = (date, name) => {
      setState({[name]: date});
    };

    /**
     * Handle check for judicial send
     * @private
     */
    const _handleChangeSwitch = () => {
      setState({judicial: !state.judicial});
    };

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

    const _renderSelect = (label, name, items) => (
      <Grid
        item
        md={6}
        xs={12}
      >
        <TextField
          fullWidth
          label={label}
          name={name}
          onChange={_handleChangeSelect}
          select
          SelectProps={{native: true}}
          value={state[name]}
          variant="outlined"
        >
          {items.map(row => (
            <option
              key={row[0] || row}
              value={row[0] || row}
            >
              {row[1] || row}
            </option>
          ))}
        </TextField>
      </Grid>);

    const _renderDataPicker = (label, name) =>
      <Grid
        item
        md={6}
        xs={12}
      >
        <DatePicker
          className={classes.datepicker}
          label={label}
          value={state[name]}
          onAccept={date => _handleChangePicker(date, name)}
          onChange={() => {
          }}
          animateYearScrolling
          format="dd/MM/yyyy"
          inputVariant="outlined"
        />
      </Grid>;

    const _renderCheckBox = () =>
      <Grid
        item
        md={6}
        xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={state.judicial}
              color="secondary"
              name="isPublic"
              onChange={_handleChangeSwitch}
            />
          }
          label="Enviado a judicial"
        />
      </Grid>;

    return (
      <Modal
        onClose={close}
        open={show}
      >
        <Card
          className={classes.root}
        >
          <form>
            <CardHeader title="Situación de pago"/>
            <Divider/>
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                {_renderSelect('Estado de impagado', 'unpaidStatus', Object.entries(RECOVERY_STATUS))}
                <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
                  {_renderDataPicker('Fecha de promesa', 'promiseDate')}
                  {_renderSelect('Contacto', 'messagesNumber', generateArrayNumber(10))}
                  {_renderDataPicker('Próxima gestión', 'nextProcess')}
                </MuiPickersUtilsProvider>
                {_renderCheckBox()}
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

PaymentStatusModal.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  saveRecoveryData: PropTypes.func.isRequired,
};

export default PaymentStatusModal;
