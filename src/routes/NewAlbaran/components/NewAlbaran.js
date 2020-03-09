import React, {memo, useEffect, useState} from 'react';

import {ContainerTab, ContentTab, DividerTab, HeaderGeneric} from 'components';
import NewAlbaranData from './NewAlbaranData';

const NewAlbaran = ({provider, providers, getProviders}) => {
  const [data, setData] = useState({});

  useEffect(() => {
    getProviders();
    setData({
      date: null,
      provider: provider?._id || ' ',
    });
  }, []);

  return <ContainerTab>
    <HeaderGeneric title='Nuevo albarán' category='Albaranes'/>
    <DividerTab/>
    <ContentTab>
      <NewAlbaranData {...data} setData={setData} providers={providers}/>
    </ContentTab>
  </ContainerTab>;
};

NewAlbaran.propTypes = {};

NewAlbaran.displayName = 'NewAlbaran';

export default memo(NewAlbaran);
