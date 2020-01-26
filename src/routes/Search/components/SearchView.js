import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {Divider} from '@material-ui/core';
import {HeaderGeneric} from 'components';
import SearchForm from './SearchForm';
import {USER_PERMISSIONS} from 'utils/user-permissions';
import HasPermission from 'components/HasPermission';
import ResultsTable from './ResultsTable';
import {useStyles} from './SearchView.styles';

const SearchView = memo(({searchClients, clients}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HeaderGeneric category='Atención al cliente' title='Buscar'/>
      <Divider className={classes.divider}/>
      <div className={classes.content}>
        <HasPermission access={USER_PERMISSIONS.SEARCH_CLIENTS_READ}>
          <SearchForm searchClients={searchClients}/>
          <ResultsTable clients={clients}/>
        </HasPermission>
      </div>
    </div>
  );
});

SearchView.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  searchClients: PropTypes.func.isRequired,
  clients: PropTypes.array,
};

SearchView.displayName = 'SearchView';

export default SearchView;
