import React, {forwardRef, Fragment, memo} from 'react';

import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  Edit,
  DeleteOutline,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from '@material-ui/icons';
import MaterialTable, {MTableToolbar} from 'material-table';
import {locale} from './locale_es_ES';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import theme from '../../theme';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>),
};

const TableMaterial = memo(({className, options = {}, components = {}, ...rest}) => {
  /**
   * Render custom Toolbar
   * @param props
   * @returns {Fragment}
   * @private
   */
  const _renderToolbar = props =>
    <Fragment>
      <MTableToolbar
        {...props}
        title={
          <Typography component='span' variant='h5'>
            {props.title}
          </Typography>
        }/>
      <Divider/>
    </Fragment>;

  /**
   * Establece el estilo de la fila (seleccionado o no seleccionado)
   * @param {Object} data
   * @param {numeric} index
   * @returns {{backgroundColor: string}}
   * @private
   */
  const _setRowStyle = (data, index) => ({
    backgroundColor:
      index % 2 === 0 ? theme.palette.background.default : '',
  });

  return <div className={className}>
    <MaterialTable
      icons={tableIcons}
      localization={locale}
      options={{
        pageSize: 10,
        rowStyle: _setRowStyle,
        actionsColumnIndex: -1,
        ...options,
      }}
      components={{
        Toolbar: _renderToolbar,
        ...components,
      }}
      {...rest}
    />
  </div>
});

TableMaterial.displayName = 'TableMaterial';
export default TableMaterial;
