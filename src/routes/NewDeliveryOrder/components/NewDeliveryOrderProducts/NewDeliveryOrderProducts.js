import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {Card, CardContent, CardHeader, Divider, IconButton, Tooltip} from '@material-ui/core';

import NewDeliveryOrderProductSelect from '../NewDeliveryOrderProductSelect';
import {useStyles} from './NewDeliveryOrderProducts.styles';
import AddIcon from '@material-ui/icons/Add';

const NewDeliveryOrderProducts = ({products, selectedProducts, addProduct}) => {
  const classes = useStyles();
  /**
   * Handle change input
   * @param {String} name
   * @param {String} value
   * @private
   */
  const _handleChange = ({target: {name, value}}) => {
    //setData({[name]: value});
  };

  /**
   * Handle change date
   * @param {Date} value
   * @private
   */
  const _handleChangeDate = value => {
    // setData({date: value});
  };

  const _renderAddButton = () =>
    <Tooltip title="Añadir producto">
      <IconButton size="small" className={classes.button} onClick={addProduct}>
        <AddIcon/>
      </IconButton>
    </Tooltip>;

  const _renderRow = () => <NewDeliveryOrderProductSelect products={products}/>;

  return <Card className={classes.root}>
    <CardHeader title='Productos' action={_renderAddButton()}/>
    <Divider/>
    <CardContent>
      {selectedProducts.map(_renderRow)}
    </CardContent>
  </Card>;
};

NewDeliveryOrderProducts.propTypes = {
  date: PropTypes.instanceOf(Date),
  setData: PropTypes.func.isRequired,
  selectedProducts: PropTypes.array.isRequired,
  addProduct: PropTypes.func.isRequired,
};

NewDeliveryOrderProducts.defaultProps = {
  date: new Date(),
};

NewDeliveryOrderProducts.displayName = 'NewDeliveryOrderProducts';

export default memo(NewDeliveryOrderProducts);
