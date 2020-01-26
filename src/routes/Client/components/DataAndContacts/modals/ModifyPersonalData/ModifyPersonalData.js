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
  TextField,
  Button,
} from '@material-ui/core';
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import deLocale from 'date-fns/locale/es';
import {useStyles} from './ModifyPersonalData.styles';

const ModifyPersonalData = memo(
  ({
     show, close, client, saveClientData,
   }) => {
    const classes = useStyles();

    /**
     * Initial state
     * @type {{birthday: string, sex: string, name: *, lastname: *}}
     * @private
     */
    const _initialState = {
      name: client?.name,
      lastname: client?.lastname,
      sex: client?.sex,
      birthday: client?.birthday,
    };

    const [state, setState] = useReducer(
      (state, newState) => ({...state, ...newState}),
      _initialState,
    );

    useEffect(() => {
      setState(_initialState);
    }, [client]);

    /**
     * Handle change inputs
     * @param {String} name
     * @param {String} value
     * @private
     */
    const _handleChange = ({target: {name, value}}) => {
      setState({[name]: value});
    };

    /**
     * Handle submit
     * @private
     */
    const _handleSubmit = () => {
      saveClientData(state, () => {
        close();
      });
    };


    if (!show) {
      return null;
    }

    /**
     * Render input
     * @param {String} label
     * @param {String} name
     * @returns {Grid}
     * @private
     */
    const _renderInput = (label, name) =>
      <Grid
        item
        md={6}
        xs={12}
      >
        <TextField
          fullWidth
          label={label}
          name={name}
          onChange={_handleChange}
          value={state[name]}
          defaultValue={state[name]}
          variant="outlined"
        />
      </Grid>;

    /**
     * Handle change picker
     * @param {String} date
     * @private
     */
    const _handleChangePicker = date => {
      setState({birthday: date});
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


    return (
      <Modal
        onClose={close}
        open={show}
      >
        <Card
          className={classes.root}
        >
          <form>
            <CardHeader title="Editar datos personales"/>
            <Divider/>
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                {_renderInput('Nombre', 'name')}
                {_renderInput('Apellidos', 'lastname')}
                {_renderInput('Sexo', 'sex')}
                <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
                  <DatePicker
                    className={classes.datepicker}
                    label="Fecha de nacimiento"
                    value={state?.birthday}
                    onAccept={_handleChangePicker}
                    onChange={() => {
                    }}
                    animateYearScrolling
                    disableFuture
                    format="yyyy-MM-dd"
                    inputVariant="outlined"
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </CardContent>
            <Divider/>
            {_renderButtons()}
          </form>
        </Card>
      </Modal>
    );
  });

ModifyPersonalData.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
};

export default ModifyPersonalData;
