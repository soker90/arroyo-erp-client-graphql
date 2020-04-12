import React, {memo, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import {Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Modal} from '@material-ui/core';
import {useStyles} from './EditProduct.styles';
import {InputForm} from 'components';
import {stringToNumber} from 'utils';

const EditProduct = (
  {
    show, close, product, createProduct, provider, editProduct,
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
      _id: product._id,
    }),
    amount: product?.amount || '',
    iva: product?.iva || '',
    re: product?.re || '',
  };

  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    _initialState,
  );

  useEffect(() => {
    setState(_initialState);
  }, [show]);

  if (!show) {
    return null;
  }

  /**
   * Handle change inputs
   * Convert to number for field necessary
   * @param {String} name
   * @param {String} value
   * @private
   */
  const _handleChange = ({target: {name, value}}) => {
    if (['amount', 'iva', 're'].includes(name))
      setState({[name]: stringToNumber(value)});
    else
      setState({[name]: value});
  };

  /**
   * Handle submit
   * @private
   */
  const _handleSubmit = () => {
    const submitAction = product ? editProduct : createProduct;
    submitAction(state, close);
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
      defaultValue={state[name]}
      variant="outlined"
      {...others}
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
              {_renderInput('Precio', 'amount')}
              {_renderInput('IVA', 'iva')}
              {_renderInput('R.E.', 're')}
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
    updateDate: PropTypes.string,
  }),
};

EditProduct.displayName = 'EditProduct';

export default memo(EditProduct);
