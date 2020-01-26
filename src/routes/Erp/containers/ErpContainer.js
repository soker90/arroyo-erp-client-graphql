import {connect} from 'react-redux';

import {actions} from '../modules/erp';
import ErpView from '../components/ErpView';

const mapStateToProps = ({common}) => ({
  erpTypes: common.get('erpTypes'),
});

const mapDispatchToProps = {...actions}

export default connect(mapStateToProps, mapDispatchToProps)(ErpView)