import {connect} from 'react-redux';

import ModifyReceiptView from './ModifyReceiptView';
import {updateReceipt} from '../../modules/receipt';
import {addNotification} from 'reducers/notifications';

const mapDispatchToProps = {updateReceipt, addNotification};

export default connect(
  null,
  mapDispatchToProps
)(ModifyReceiptView);
