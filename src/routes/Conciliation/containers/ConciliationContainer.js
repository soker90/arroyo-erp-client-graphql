import {connect} from 'react-redux';
import ConciliationView from '../components/ConciliationView';
import {showModal} from '../../../reducers/modal';

const mapStateToProps = ({loadingBar}) => ({
  isLoading: !!loadingBar.default,
});

const mapDispatchToProps = {
  showErrorControlModal: ops =>
    showModal({
      modalType: 'ERROR_CONTROL_MODAL',
      modalProps: {registeredOps: ops},
    }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConciliationView);
