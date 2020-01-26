import {actions} from '../../../modules/actions';
import {connect} from 'react-redux';
import DNITitularView from '../components/DNITitularView';

const mapStateToProps = ({client}) => ({
  dniImages: client.get('dniImages').toJSON(),
});

const mapDispatchToProps = {...actions};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DNITitularView);
