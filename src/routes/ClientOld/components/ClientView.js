import React, {lazy, PureComponent, Suspense} from 'react';
import PropTypes from 'prop-types';

import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';

import './ClientView.scss';
import Loading from 'components/Loading';

const PersonalData = lazy(() => import('./boxes/PersonalData'));
const CoBorrowerData = lazy(() => import('./boxes/CoBorrowerData'));
const PrescriberData = lazy(() => import('./boxes/PrescriberData'));
const ContactData = lazy(() => import('./boxes/ContactData'));
const OtherContacts = lazy(() => import('./boxes/OtherContacts'));
const Retailer = lazy(() => import('./boxes/Retailer'));
const Contracts = lazy(() => import('./boxes/Contracts'));
const Communications = lazy(() => import('./boxes/Communications'));
const PaymentStatus = lazy(() => import('./boxes/PaymentStatus'));
const Refinanced = lazy(() => import('./boxes/Refinanced'));

class ClientView extends PureComponent {
  static propTypes = {
    params: PropTypes.object,
    activeTab: PropTypes.object.isRequired,
    resetState: PropTypes.func.isRequired,
  };

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const {
      match: {
        params: {clientId},
      },
      activeTab: {id: tabId},
    } = this.props;

    return (
      <div>
        <Suspense fallback={<Loading />}>
          <div className="tab-body">
            <Refinanced />
            <div className="flex-set">
              <HasPermission access={USER_PERMISSIONS.PERSONAL_DATA_READ}>
                <PersonalData
                  tabId={tabId}
                  clientId={clientId}
                  className="flexed-item client-panel"
                />
                <CoBorrowerData className="flexed-item client-panel" />
              </HasPermission>
              <HasPermission access={USER_PERMISSIONS.PERSONAL_DATA_READ}>
                <PrescriberData className="flexed-item client-panel" />
              </HasPermission>
              <HasPermission access={USER_PERMISSIONS.RETAILER_DETAILS_READ}>
                <Retailer className="flexed-item client-panel" />
              </HasPermission>
              <HasPermission access={USER_PERMISSIONS.CONTACT_DATA_READ}>
                <ContactData className="flexed-item client-panel" />
              </HasPermission>
              <HasPermission access={USER_PERMISSIONS.OTHER_CONTACT_DATA_READ}>
                <OtherContacts
                  clientId={clientId}
                  className="flexed-item client-panel"
                />
              </HasPermission>
            </div>
            <HasPermission access={USER_PERMISSIONS.PAYMENT_SITUATION_READ}>
              <PaymentStatus />
            </HasPermission>
            <HasPermission
              access={USER_PERMISSIONS.COMMUNICATIONS_HISTORY_READ}
            >
              <Communications clientId={clientId} />
            </HasPermission>
            <HasPermission access={USER_PERMISSIONS.CONTRACTS_READ}>
              <Contracts clientId={clientId} />
            </HasPermission>
          </div>
        </Suspense>
      </div>
    );
  }
}

export default ClientView;
