import React, {memo, useEffect, useReducer, useState} from 'react';
import PropTypes from 'prop-types';

import {ContainerTab, ContentTab, DividerTab, HeaderGeneric} from 'components';
import NewDeliveryOrderData from './NewDeliveryOrderData';
import NewDeliveryOrderProducts from './NewDeliveryOrderProducts';

const NewDeliveryOrder = ({provider, providers, getProviders, products, getProducts}) => {
  const [data, setData] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      date: null,
      provider: provider?._id || '',
    });
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    getProviders();
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

  /**
   * Actualiza los datos del producto seleccionado en es estado
   * @param {number} index
   * @param {object} dataProduct
   * @private
   */
  const _updateProduct = (index, dataProduct) => {
    const _selectedProducts = selectedProducts.slice();
    _selectedProducts[index] = dataProduct;
    setSelectedProducts(_selectedProducts);
  };

  return <ContainerTab>
    <HeaderGeneric title='Nuevo albarán' category='Albaranes'/>
    <DividerTab/>
    <ContentTab>
      <NewDeliveryOrderData setData={setData} providers={providers} {...data} />
      <NewDeliveryOrderProducts
        products={products} addProduct={_addProduct} selectedProducts={selectedProducts}
        updateProduct={_updateProduct}/>
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
