import React, {memo, useEffect, useReducer, useState} from 'react';
import PropTypes from 'prop-types';

import {ContainerTab, ContentTab, DividerTab, HeaderGeneric} from 'components';
import NewAlbaranData from './NewAlbaranData';
import NewAlbaranProductSelect from './NewAlbaranProductSelect';

const NewAlbaran = ({provider, providers, getProviders, products, getProducts}) => {
  const [data, setData] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {});
  // const [state, setState] = useState(initState);

  useEffect(() => {
    getProviders();
    setData({
      date: null,
      provider: provider?._id || '',
    });
  }, []);

  useEffect(() => {
    if (data.provider)
      getProducts(data.provider);
  }, [data.provider]);

  return <ContainerTab>
    <HeaderGeneric title='Nuevo albarán' category='Albaranes'/>
    <DividerTab/>
    <ContentTab>
      <NewAlbaranData {...data} setData={setData} providers={providers}/>
      <NewAlbaranProductSelect products={products}/>
    </ContentTab>
  </ContainerTab>;
};

NewAlbaran.propTypes = {
  provider: PropTypes.object,
  providers: PropTypes.array,
  getProviders: PropTypes.func.isRequired,
  products: PropTypes.array,
  getProducts: PropTypes.func.isRequired,
};

NewAlbaran.displayName = 'NewAlbaran';

export default memo(NewAlbaran);
