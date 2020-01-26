import React, {lazy, Suspense, useEffect, useState, memo} from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab, Divider} from '@material-ui/core';
import {HeaderClient} from 'components';
import Loading from 'components/Loading';
import {useStyles} from './ClientView.styles';
import {getImageClient} from '../utils';
import {TABS} from '../constants';
import {getTabList} from '../utils/getTabList';

const DataAndContacts = lazy(() => import('./DataAndContacts'));
const PaymentStatus = lazy(() => import('./PaymentStatus'));
const Communications = lazy(() => import('./Communications'));
const Contracts = lazy(() => import('./Contracts'));

const ClientView = memo(
  ({
     match: {params: {clientId}},
     resetState,
     activeTab: {id: tabId},
     getClientData,
     fullname,
     prescriber,
     getPrescriber,
     getClientContracts,
     contract: {contractId, origin},
     getRecoveryByClient,
     recovery,
     getClientCommunications,
     ...rest
   }) => {
    const classes = useStyles();
    const [tab, setTab] = useState(TABS.PERSONAL_DATA);

    useEffect(() => resetState(), []);

    useEffect(() => {
      if (clientId && tabId) {
        getClientData(clientId, tabId);
        getClientContracts(clientId);
        getRecoveryByClient(clientId);
        getClientCommunications(clientId);
      }
    }, [clientId, tabId]);

    useEffect(() => {
      if (contractId) getPrescriber(contractId);
    }, [contractId]);

    /**
     * Event onChange tabs
     * @param {Object} event
     * @param {String} value
     * @private
     */
    const _handleTabsChange = (event, value) => {
      setTab(value);
    };

    const _components = {
      [TABS.PERSONAL_DATA]: DataAndContacts,
      [TABS.PAYMENTS]: PaymentStatus,
      [TABS.COMMUNICATIONS]: Communications,
      [TABS.CONTRACTS]: Contracts,
    };

    const TabComponent = _components[tab];


    /**
     * Render all tabs
     * @returns {Tabs}
     * @private
     */
    const _renderTabs = () =>
      <Tabs
        onChange={_handleTabsChange}
        scrollButtons="auto"
        value={tab}
        variant="scrollable"
      >
        {getTabList(recovery).map(tab => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>;


    return (
      <div
        className={classes.root}
      >
        <Suspense fallback={<Loading/>}>
          <HeaderClient
            title={fullname} category={`Id de Cliente - ${clientId}`}
            logo={getImageClient(prescriber, origin)}
            selectedTab={tab}
            clientId={clientId}
            {...rest}
          />
          <div className={classes.inner}>
            {_renderTabs()}
            <Divider className={classes.divider}/>
            <div className={classes.content}>
              <Suspense fallback={<Loading/>}>
                <TabComponent/>
              </Suspense>
            </div>
          </div>
        </Suspense>
      </div>
    );
  });

ClientView.propTypes = {
  resetState: PropTypes.func.isRequired,
  activeTab: PropTypes.object.isRequired,
  getClientData: PropTypes.func.isRequired,
  fullname: PropTypes.string,
  match: PropTypes.object.isRequired,
  getPrescriber: PropTypes.func.isRequired,
  prescriber: PropTypes.object,
  getClientContracts: PropTypes.func.isRequired,
  contract: PropTypes.object.isRequired,
  getRecoveryByClient: PropTypes.func.isRequired,
  recovery: PropTypes.object,
  getClientCommunications: PropTypes.func.isRequired,
  showModalModifyOtherContactData: PropTypes.func.isRequired,
  showModalPaymentStatus: PropTypes.func.isRequired,
  showModalSendPassword: PropTypes.func.isRequired,
  showModalSendJudicial: PropTypes.func.isRequired,
};

export default ClientView;
