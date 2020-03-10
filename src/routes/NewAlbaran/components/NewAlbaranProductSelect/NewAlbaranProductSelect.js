import React, {memo, useState} from 'react';
import PropTypes from 'prop-types';

import {Card, CardContent, CardHeader, Grid, Divider} from '@material-ui/core';
import {InputForm, SelectForm} from 'components/Forms';
import {useStyles} from './NewAlbaranProductSelect.styles';

const NewAlbaranProductSelect = ({products, addProduct}) => {
  const classes = useStyles();
  const [selectedProduct, setSelectedProduct] = useState(' ');
  const [quantity, setQuantity] = useState(0);

  /**
   * Handle change select
   * @param {String} value
   * @private
   */
  const _handleSelect = ({target: {value}}) => {
    setSelectedProduct(value);
  };

  /**
   * Handle event change quantity
   * @param {String} value
   * @private
   */
  const _handleChangeQuantity = ({target: {value}}) => {
    setQuantity(value);
  };


  return <Card className={classes.root}>
    <CardHeader title='Añadir producto al albarán'/>
    <Divider/>
    <CardContent>
      <Grid spacing={3} container>
        <SelectForm
          label='Selecciona un producto'
          value={selectedProduct}
          name='provider'
          onChange={_handleSelect}
          disabled={!products?.length}
        >
          <option value="">--------</option>
          {products?.map(item => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </SelectForm>
        <InputForm label='Peso / Cantidad' value={quantity} onChange={_handleChangeQuantity}/>
      </Grid>
    </CardContent>
  </Card>
};

NewAlbaranProductSelect.propTypes = {
  products: PropTypes.array,
  addProduct: PropTypes.func.isRequired,
};

NewAlbaranProductSelect.displayName = 'NewAlbaranProductSelect';

export default memo(NewAlbaranProductSelect);
