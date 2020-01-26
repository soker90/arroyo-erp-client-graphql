import {connect} from 'react-redux';
import {actions} from '../modules/import-client';
import ImportClientView from '../components/ImportClientView';

const mapStateToProps = ({importClient, loadingBar}) => {
  const _payloadErrors = importClient.get('payloadErrors');

  return {
    payloadErrors: _payloadErrors ? _payloadErrors.toJS() : _payloadErrors,
    isLoading: !!loadingBar.default,
  };
};

const mapDispatchToProps = {...actions};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportClientView);
