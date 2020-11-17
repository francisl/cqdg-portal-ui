/* @flow */

import React from 'react';
import Relay from 'react-relay/classic';
import PortalContainer from '@ncigdc/components/PortalContainer';

// import '@ncigdc/theme/global.css';
import './style/themes/default/main.css';
import './style/themes/default/colors.css';

const PortalQuery = {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Root {
        File { hits { total } }
      }
    `,
  },
};

const Portal = Relay.createContainer(PortalContainer, PortalQuery);

export default Portal;
