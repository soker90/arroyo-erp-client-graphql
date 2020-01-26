import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Grid} from '@material-ui/core';

import PersonalDataCard from './components/PersonalDataCard';
import ContactDataCard from './components/ContactDataCard/ContactDataCard';
import {TYPE} from './components/ContactDataCard/constants';
import OtherContactCard from './components/OtherContactCard';
import {USER_PERMISSIONS} from 'utils/user-permissions';
import HasPermission from 'components/HasPermission';
import PrescriberDataCard from './components/PrescriberDataCard';

const DataAndContacts = ({
                           className, client, clientId, getContactInfo, contactInfo, getDNIImages,
                           contract: {coBorrower, motivo}, prescriber, showModalPersonalData, showModalDNITitular,
                           getCoDniImages, showModalModifyContactData, showModalModifyOtherContactData,
                           showModalPrescriberDetails, ...rest
                         }) => {
  useEffect(() => {
    clientId && getContactInfo(clientId);
    // eslint-disable-next-line
  }, [clientId]);

  return (
    <div
      {...rest}
      className={className}
    >
      <Grid
        container
        spacing={3}
      >
        <HasPermission access={USER_PERMISSIONS.PERSONAL_DATA_READ}>
          <PersonalDataCard
            {...client}
            showModalPersonalData={showModalPersonalData}
            showModalDNI={showModalDNITitular}
            getDNIImages={getDNIImages}
          />
          {coBorrower && <PersonalDataCard
            name={coBorrower?.name}
            lastname={coBorrower?.surName}
            clientId={coBorrower?.entityId}
            dni={coBorrower?.dni}
            birthday={coBorrower?.birthday}
            sex={coBorrower?.sex}
            cotitular={true}
            showModalDNI={showModalDNITitular}
            getDNIImages={getCoDniImages}
            clientIdOrigin={clientId}
          />}
        </HasPermission>
        <HasPermission access={USER_PERMISSIONS.CONTACT_DATA_READ}>
          <ContactDataCard
            email={client.email}
            mobile={client.mobile}
            address={client.addressNew}
            zipCode={client.zipcodeNew}
            province={client.provinceNew}
            city={client.cityNew}
            countryResidence={client.countryResidence}
            countryBirth={client.countryBirth}
            type={TYPE.PRIMARY}
            showModalModifyContactData={showModalModifyContactData}
          />
          <ContactDataCard
            email={client.email2}
            mobile={client.mobile2}
            address={client.address}
            zipCode={client.zipcode}
            province={client.province}
            city={client.city}
            type={TYPE.SECONDARY}
            showModalModifyContactData={showModalModifyContactData}
          />
        </HasPermission>
        {prescriber?.active &&
        <PrescriberDataCard reason={motivo} prescriber={prescriber}
                            showModalPrescriberDetails={showModalPrescriberDetails}/>
        }
        <HasPermission access={USER_PERMISSIONS.OTHER_CONTACT_DATA_READ}>
          {contactInfo?.map(
            (contract, index) => <OtherContactCard
              {...contract} index={index + 1}
              showModalModifyOtherContactData={showModalModifyOtherContactData}/>,
          )}
        </HasPermission>
      </Grid>
    </div>
  );
};

DataAndContacts.propTypes = {
  className: PropTypes.string,
  client: PropTypes.object.isRequired,
  contactInfo: PropTypes.array.isRequired,
  clientId: PropTypes.number,
  getContactInfo: PropTypes.func.isRequired,
  contract: PropTypes.object,
  prescriber: PropTypes.object,
  showModalPersonalData: PropTypes.object.isRequired,
  getDNIImages: PropTypes.func.isRequired,
  getCoDniImages: PropTypes.func,
  showModalModifyContactData: PropTypes.func.isRequired,
  showModalModifyOtherContactData: PropTypes.func.isRequired,
};

export default DataAndContacts;
