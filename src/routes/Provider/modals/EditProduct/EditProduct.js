import React, {memo, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import {Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Modal} from '@material-ui/core';
import {useStyles} from './EditProduct.styles';
import {DatePickerForm, InputForm} from 'components';

const EditProduct = (
  {
    show, close, product, createProduct, provider,
  }) => {
  const classes = useStyles();

  /**
   * Initial state
   * @type {{code: (*|string), name: (*|string)}}
   * @private
   */
  const _initialState = {
    name: product?.name || '',
    code: product?.code || '',
    provider,
    ...(product && {
      updateDate: product?.updateDate || null,
      amount: product?.amount || 0.0,
    }),
  };

  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    _initialState,
  );

  useEffect(() => {
    setState(_initialState);
  }, []);

  if (!show) {
    return null;
  }

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
   * Handle change date
   * @param {Date} value
   * @param {String} name
   * @private
   */
  const _handleChangeDate = (value, name) => {
    setState({[name]: value});
  };

  /**
   * Handle submit
   * @private
   */
  const _handleSubmit = () => {
    if (product) {

    } else {
      createProduct(state, close);
    }
  };

  /**
   * Render input
   * @param {String} label
   * @param {String} name
   * @param {Object} others
   * @returns {Grid}
   * @private
   */
  const _renderInput = (label, name, others = {}) =>
    <InputForm
      label={label}
      name={name}
      onChange={_handleChange}
      value={state[name]}
      variant="outlined"
      {...others}
    />;

  /**
   * Render date picker
   * @param {string} name
   * @param {string} label
   * @return {DatePickerForm}
   * @private
   */
  const _renderDatePicker = (name, label) =>
    <DatePickerForm
      value={state[name]}
      onChange={value => _handleChangeDate(value, name)}
      label={label}
    />;

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
              {_renderInput('Código', 'code')}
              {_renderInput('Nombre', 'name')}
              {
                product &&
                <>
                  {_renderInput('Precio', 'amount', {
                    type: 'number',
                  })}
                  {_renderDatePicker('updateDate', 'Fecha de actualización')}
                </>
              }
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
    code: PropTypes.string,
    amount: PropTypes.number,
    updateDate: PropTypes.instanceOf(Date),
  }),
};

EditProduct.displayName = 'EditProduct';

export default memo(EditProduct);
