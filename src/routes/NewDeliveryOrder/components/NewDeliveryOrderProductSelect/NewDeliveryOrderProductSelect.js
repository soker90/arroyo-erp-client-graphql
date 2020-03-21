import React, {memo, useState} from 'react';
import PropTypes from 'prop-types';

import {Grid} from '@material-ui/core';
import {InputForm, SelectForm} from 'components/Forms';
import {useStyles} from '../NewDeliveryOrderProducts/NewDeliveryOrderProducts.styles';

const NewDeliveryOrderProductSelect = ({products, addProduct}) => {
  const classes = useStyles();
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [code, setCode] = useState('');

  /**
   * Handle change select
   * @param {String} value
   * @private
   */
  const _handleSelect = ({target: {value}}) => {
    setProduct(value);
  };

  /**
   * Handle change code
   * @param {string} value
   * @private
   */
  const _handleCode = ({target: {value}}) => {
    const selected = products.find(product => product.code === value);
    setCode(value);
    setProduct(selected?._id || '');
  };

  /**
   * Handle event change quantity
   * @param {String} value
   * @private
   */
  const _handleChangeQuantity = ({target: {value}}) => {
    setQuantity(value);
  };

  return <Grid spacing={3} container>
    <InputForm label='Código' value={code} onChange={_handleCode} size={4}/>
    <SelectForm
      label='Selecciona un producto'
      value={product}
      name='provider'
      onChange={_handleSelect}
      disabled={!products?.length}
      size={4}
    >
      <option value="">--------</option>
      {products?.map(item => (
        <option key={item.code} value={item._id}>
          {item.name}
        </option>
      ))}
    </SelectForm>
    <InputForm label='Peso / Cantidad' value={quantity} onChange={_handleChangeQuantity} size={4}/>
  </Grid>
};

NewDeliveryOrderProductSelect.propTypes = {
  products: PropTypes.array,
  addProduct: PropTypes.func.isRequired,
};

NewDeliveryOrderProductSelect.displayName = 'NewDeliveryOrderProductSelect';

export default memo(NewDeliveryOrderProductSelect);
