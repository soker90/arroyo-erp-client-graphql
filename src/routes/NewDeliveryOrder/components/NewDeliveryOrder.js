import React, {memo, useEffect, useReducer, useState} from 'react';
import PropTypes from 'prop-types';

import {ContainerTab, ContentTab, DividerTab, HeaderGeneric} from 'components';
import NewDeliveryOrderData from './NewDeliveryOrderData';
import NewDeliveryOrderProducts from './NewDeliveryOrderProducts';
import {Button} from '@material-ui/core';

const NewDeliveryOrder = ({provider, providers, getProviders, products, getProducts, showDeleteProductModal}) => {
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
    setSelectedProducts([...selectedProducts, {product: '', quantity: 0, code: ''}]);
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

  /**
   * Delete product
   * @param {number} index
   * @private
   */
  const _deleteProduct = index => {
    const _newProducts = selectedProducts.filter((i, idx) => idx !== index);
    setSelectedProducts(_newProducts);
  };

  const _showModalDelete = (id, index) => {
    showDeleteProductModal(id, _deleteProduct.bind(this, index));
  };


  const _handleClickSave = () => {

  };

  return <ContainerTab>
    <HeaderGeneric title='Nuevo albarán' category='Albaranes'/>
    <DividerTab/>
    <ContentTab>
      <NewDeliveryOrderData setData={setData} providers={providers} {...data} />
      <NewDeliveryOrderProducts
        products={products} addProduct={_addProduct}
        selectedProducts={selectedProducts}
        deleteProduct={_deleteProduct}
        updateProduct={_updateProduct}/>
      <Button
        color="primary"
        variant="outlined"
        onClick={_handleClickSave}
      >
        Guardar
      </Button>
    </ContentTab>
  </ContainerTab>;
};

NewDeliveryOrder.propTypes = {
  provider: PropTypes.object,
  providers: PropTypes.array,
  getProviders: PropTypes.func.isRequired,
  products: PropTypes.array,
  getProducts: PropTypes.func.isRequired,
  showDeleteProductModal: PropTypes.func.isRequired,
};

NewDeliveryOrder.displayName = 'NewDeliveryOrder';

export default memo(NewDeliveryOrder);
