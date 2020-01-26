import {connect} from 'react-redux';

import RemittanceView from '../components/RemittanceView';
import {actions} from '../modules/remittance';
import {downloadRemittances} from '../../Remittances/modules/remittances';

const mapStateToProps = ({remittance}) => ({
  receipts: remittance.get('receipts').toJS(),
  remittance: remittance.get('remittance').toJS(),
});

const mapDispatchToProps = {...actions, downloadRemittances};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RemittanceView);
