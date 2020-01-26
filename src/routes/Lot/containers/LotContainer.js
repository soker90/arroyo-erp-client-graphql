import {connect} from 'react-redux';

import LotView from '../components/LotView';
import {actions as lotActions} from '../modules/lot';
import {downloadLots, downloadLotMovements} from '../../Lots/modules/lots';

const mapStateToProps = ({lot}) => ({
  lot: lot.get('lot').toJS(),
  transfers: lot.get('transfers').toJS(),
});

const mapDispatchToProps = {...lotActions, downloadLots, downloadLotMovements};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LotView);
