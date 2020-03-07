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
import {useStyles} from './EditProduct.styles';

const EditProduct = (
  {
    show, close, product,
  }) => {
  const classes = useStyles();

  /**
   * Initial state
   * @type {{birthday: string, sex: string, name: *, lastname: *}}
   * @private
   */
  const _initialState = {
    name: product?.name || '',
  };

  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    _initialState,
  );

  useEffect(() => {
    setState(_initialState);
  }, [product]);

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
    /* saveClientData(state, () => {
      close();
    }); */
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
          <CardHeader title={`${product ? 'Editar' : 'Nuevo'} producto`}/>
          <Divider/>
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              {_renderInput('Nombre', 'name')}
            </Grid>
          </CardContent>
          <Divider/>
          {_renderButtons()}
        </form>
      </Card>
    </Modal>
  );
};

EditProduct.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  product: PropTypes.shape({
    name: PropTypes.string,
  }),
};

EditProduct.displayName = 'EditProduct';

export default memo(EditProduct);
