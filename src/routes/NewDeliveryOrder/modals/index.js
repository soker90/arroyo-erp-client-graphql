import EditProvider from './EditProvider';
import {SHOW_EDIT_PRODUCT, SHOW_EDIT_PROVIDER} from './types';
import EditProduct from './DeleteProduct';

export default {
  [SHOW_EDIT_PROVIDER]: EditProvider,
  [SHOW_EDIT_PRODUCT]: EditProduct,
};
