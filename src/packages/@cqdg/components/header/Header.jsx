/* eslint-disable react/prefer-stateless-function */

import React from 'react';

import GoInboxIcon from 'react-icons/lib/go/inbox';
import GoDatabaseIcon from 'react-icons/lib/fa/file-text';
import UserLock from 'react-icons/lib/fa/lock';
import Button from '@ferlab-ui/core/buttons/button';
import t from '@cqdg/locales/intl';

import {
  compose,
  setDisplayName,
  withState,
} from 'recompose';

import withRouter from '@ncigdc/utils/withRouter';
import { withTheme } from '@ncigdc/theme';

import './Header.css';

const Header = (
  isCollapsed,
  setIsCollapsed
) => {
  return (
    <header id="header" role="banner">
      <img alt={t('global.cqdg')} className="logo" src="img/logo.svg" onClick={() => window.location = '/home'}/>
      <div className="nav">
        <Button mode="focus" onClick={() => window.location = '/repository'}>
          <GoDatabaseIcon />
          {t('nav.file.repo')}
        </Button>
        <Button>
          <GoInboxIcon />
          {t('nav.studies')}
        </Button>
      </div>
      <div className="actions">
        <Button defaultIcon={false} type="link">
          <UserLock />
          {t('global.login')}
        </Button>
        <div className="separator" />
        <Button type="link">Documentation</Button>
        <Button href="https://cqdg.ca/en.html">Site Web</Button>
        <Button shape="circle">EN</Button>
      </div>
    </header>
  );
};

export default compose(
  setDisplayName('Header'),
  withState('isCollapsed', 'setIsCollapsed', true),
  withState('isInSearchMode', 'setIsInSearchMode', false),
  withState('navigation', 'setNavigation', 'mail'),
  withRouter,
  withTheme,
  /* withHandlers({
    handleApiError: ({ dispatch }) => ({ status, user }) => {
      if (user && status === 401) {
        dispatch(removeNotification('LOGIN'));
        dispatch(setModal(<SessionExpiredModal />));
        dispatch(forceLogout());
      }
    },
  }),
  lifecycle({
    componentDidMount(): void {
      if (this.props.error) {
        this.props.handleApiError({
          ...this.props.error,
          user: this.props.user,
        });
      }
    },
    componentWillMount() {
      if (!this.props.user) {
        this.props.dispatch(removeNotification('LOGIN'));
      }
    },
    componentWillReceiveProps({
      error: nextError,
      user: nextUser,
    }: Object): void {
      const {
        error,
      } = this.props;
      if (nextError !== error) {
        this.props.handleApiError({
          ...nextError,
          user: nextUser,
        });
      }
    },
    shouldComponentUpdate({
      error: nextError,
      isCollapsed: nextIsCollapsed,
      isInSearchMode: nextIsInSearchMode,
      location: nextLocation,
      notifications: nextNotifications,
      user: nextUser,
    }) {
      const {
        error,
        isCollapsed,
        isInSearchMode,
        location,
        notifications,
        user,
      } = this.props;

      return !(
        nextError === error &&
        nextIsCollapsed === isCollapsed &&
        nextIsInSearchMode === isInSearchMode &&
        isEqual(nextNotifications, notifications) &&
        isEqual(nextLocation, location) &&
        nextUser === user
      );
    },
  }), */
)(Header);
