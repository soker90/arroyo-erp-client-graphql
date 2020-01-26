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
import {useStyles} from './ModifyContactData.styles';
import {TYPE} from '../../components/ContactDataCard/constants';
import {literals} from './constants';

const ModifyContactData = memo(
  ({
     show, close, client, saveClientData, type,
   }) => {
    const classes = useStyles();

    /**
     * Initial state
     * @type {{birthday: string, sex: string, name: *, lastname: *}}
     * @private
     */
    const _initialState = {
      [TYPE.PRIMARY]: {
        email: client?.email,
        mobile: client?.mobile,
        addressNew: client?.addressNew,
        zipcodeNew: client?.zipcodeNew,
        provinceNew: client?.provinceNew,
        cityNew: client?.cityNew,
      },
      [TYPE.SECONDARY]: {
        email2: client?.email2,
        mobile2: client?.mobile2,
        address: client?.address,
        zipcode: client?.zipcode,
        province: client?.province,
        city: client?.city,
      },
    };

    const [state, setState] = useReducer(
      (state, newState) =>
        (newState?.action === 'reset') ?
          _initialState[type] :
          ({...state, ...newState}),
    );

    useEffect(() => {
      setState({action: 'reset'});
    }, [client, type]);

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
     * @param {String} key
     * @returns {Grid}
     * @private
     */
    const _renderInput = key =>
      <Grid
        item
        md={6}
        xs={12}
      >
        <TextField
          fullWidth
          label={literals[key]}
          name={key}
          onChange={_handleChange}
          value={state[key]}
          defaultValue={state[key]}
          variant="outlined"
        />
      </Grid>
    ;

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

    /**
     * Render all inputs
     * @returns {Grid[]}
     * @private
     */
    const _renderAllInputs = () =>
      state && Object.keys(state).map(
      key => _renderInput(key),
      );

    return (
      <Modal
        onClose={close}
        open={show}
      >
        <Card
          className={classes.root}
        >
          <form>
            <CardHeader title="Modificar datos de contacto"/>
            <Divider/>
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                {_renderAllInputs()}
              </Grid>
            </CardContent>
            <Divider/>
            {_renderButtons()}
          </form>
        </Card>
      </Modal>
    );
  });

ModifyContactData.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  client: PropTypes.object.isRequired,
  saveClientData: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

ModifyContactData.displayName = 'ModifyContactData';

export default ModifyContactData;
