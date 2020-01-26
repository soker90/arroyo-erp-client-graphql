import {connect} from 'react-redux';
import {actions} from '../modules/search';
import SearchView from '../components/SearchView';

const mapStateToProps = ({search, loadingBar}) => ({
  clients: search.get('clients'),
  isLoading: !!loadingBar.default,
});

const mapDispatchToProps = {...actions};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchView);
