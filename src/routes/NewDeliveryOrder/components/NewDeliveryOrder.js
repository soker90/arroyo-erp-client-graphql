import React, {memo, useEffect, useReducer, useState} from 'react';
import PropTypes from 'prop-types';

import {ContainerTab, ContentTab, DividerTab, HeaderGeneric} from 'components';
import NewDeliveryOrderData from './NewDeliveryOrderData';
import NewDeliveryOrderProducts from './NewDeliveryOrderProducts';

const NewDeliveryOrder = ({provider, providers, getProviders, products, getProducts}) => {
  const [data, setData] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {});
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    getProviders();
    setData({
      date: null,
      provider: provider?._id || '',
    });
  }, []);

  useEffect(() => {
    if (data.provider)
      getProducts(data.provider);
  }, [data.provider]);

  /**
   * Add product to selected product
   * @private
   */
  const _addProduct = () => {
    setSelectedProducts([...selectedProducts, {product: '', quantity: 0}]);
  };

  return <ContainerTab>
    <HeaderGeneric title='Nuevo albarán' category='Albaranes'/>
    <DividerTab/>
    <ContentTab>
      <NewDeliveryOrderData {...data} setData={setData} providers={providers}/>
      <NewDeliveryOrderProducts products={products} addProduct={_addProduct} selectedProducts={selectedProducts}/>
    </ContentTab>
  </ContainerTab>;
};

NewDeliveryOrder.propTypes = {
  provider: PropTypes.object,
  providers: PropTypes.array,
  getProviders: PropTypes.func.isRequired,
  products: PropTypes.array,
  getProducts: PropTypes.func.isRequired,
};

NewDeliveryOrder.displayName = 'NewDeliveryOrder';

export default memo(NewDeliveryOrder);
