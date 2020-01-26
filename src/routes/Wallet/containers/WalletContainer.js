import {connect} from 'react-redux';

import WalletView from '../components/WalletView';

import {actions} from '../modules/wallet';
import {updateRecoveries} from '../../ClientOld/modules/actions';
import {getRecoveriesUnread} from '../modules/getRecoveriesUnreaded';

const mapStateToProps = ({loadingBar, wallet, common}) => ({
  isLoading: !!loadingBar.default,
  recoveries: wallet.get('recoveries'),
  recoverFilter: common.get('recoverFilter'),
  unread: wallet.get('unread'),
});

const mapDispatchToProps = {...actions, updateRecoveries, getRecoveriesUnread};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletView);
