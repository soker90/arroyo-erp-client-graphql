import {connect} from 'react-redux';
import {showModal} from 'reducers/modal';
import {getCoDniImages} from '../../../modules/actions';
import CoBorrowerData from './CoBorrowerData';

const mapStateToProps = ({client}) => ({
  contract: client.get('contract'),
});

const mapDispatchToProps = {
  showModalViewDni: () => showModal({modalType: 'VIEW_DNI_COTITULAR'}),
  getCoDniImages: getCoDniImages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoBorrowerData);
