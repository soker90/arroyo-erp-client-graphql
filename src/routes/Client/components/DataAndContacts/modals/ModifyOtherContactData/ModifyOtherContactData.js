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
import {useStyles} from './ModifyOtherContactData.styles';
import {literals} from './constants';

const ModifyOtherContactData = memo(
  props => {
    const classes = useStyles();

    /**
     * Initial state
     * @type {{birthday: string, sex: string, name: *, lastname: *}}
     * @private
     */
    const _initialState = {
      email: props?.email || '',
      phone: props?.phone || '',
      address: props?.address || '',
      zipcode: props?.zipcode || '',
      province: props?.province || '',
      city: props?.city || '',
      comments: props?.city || '',
    };

    const [state, setState] = useReducer(
      (state, newState) => ({...state, ...newState}),
      _initialState,
    );

    useEffect(() => {
      setState(_initialState);
    }, [props]);

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
      props.setClientContactInfo({
        ...state,
        clientId: props.clientId,
        clientContactInfoId: props.clientContactInfoId,
      }, () => {
        props.close();
      });
    };


    if (!props.show) {
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
        <Button onClick={props.close}>
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
        onClose={props.close}
        open={props.show}
      >
        <Card
          className={classes.root}
        >
          <form>
            <CardHeader title="Modificar datos de contacto complementarios"/>
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
  })
;

ModifyOtherContactData.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  clientId: PropTypes.number.isRequired,
  saveClientData: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  email: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  zipcode: PropTypes.string,
  province: PropTypes.string,
  city: PropTypes.string,
  comments: PropTypes.string,
};

ModifyOtherContactData.displayName = 'ModifyOtherContactData';

export default ModifyOtherContactData;
