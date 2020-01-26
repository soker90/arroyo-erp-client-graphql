import {actions} from '../../../modules/actions';
import {connect} from 'react-redux';
import DNICotitularView from '../components/DNICotitularView';

const mapStateToProps = ({client}) => ({
  coDniImages: client.get('coDniImages').toJSON(),
});

const mapDispatchToProps = {...actions};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DNICotitularView);
