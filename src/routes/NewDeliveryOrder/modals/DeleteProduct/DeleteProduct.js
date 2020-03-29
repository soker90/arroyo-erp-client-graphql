import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {ConfirmModal} from 'components';

const DeleteProduct = (
  {
    show, close, product, onClickDelete,
  }) => {

  if (!show) {
    return null;
  }

  return (
    <ConfirmModal
      close={close}
      show={show}
      title='Eliminar producto'
      action={onClickDelete}
      labelAction='Eliminar'
      description={`¿Seguro que quieres eliminar el producto ${product}?`}
    />
  );
};

DeleteProduct.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  product: PropTypes.string.isRequired,
};

DeleteProduct.displayName = 'DeleteProduct';

export default memo(DeleteProduct);
