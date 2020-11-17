/* eslint-disable react/prefer-stateless-function */

import React from 'react';

import GoInboxIcon from 'react-icons/lib/go/inbox';
import GoDatabaseIcon from 'react-icons/lib/fa/file-text';
import UserLock from 'react-icons/lib/fa/lock';
import Button from '@ferlab-ui/core/buttons/button';
import t from '@cqdg/locales/intl';
import Link from '@ferlab-ui/core/buttons/link';

import {
  compose,
  setDisplayName,
  withState,
} from 'recompose';

import withRouter from '@ncigdc/utils/withRouter';
import { withTheme } from '@ncigdc/theme';

import './Header.css';

const Header = ({
  location,
  push,
}) => {
  return (
    <header id="header" role="banner">
      <img alt={t('global.cqdg')} className="logo" onClick={() => push('/home')} src="img/logo.svg" />
      <div className="nav">
        <Button active={location.pathname === '/files'} onClick={() => push('/files')} type="navigation">
          <GoDatabaseIcon />
          {t('nav.file.repo')}
        </Button>
        <Button active={location.pathname === '/studies'} onClick={() => push('/studies')} type="navigation">
          <GoInboxIcon />
          {t('nav.studies')}
        </Button>
      </div>
      <div className="actions">
        <Link className="big" defaultIcon={false} href="/">
          <UserLock className="big" />
          {t('global.login')}
        </Link>
        <div className="separator" />
        <Link href="https://docs.qa.cqdg.ferlab.bio/">{t('global.documentation')}</Link>
        <Link href="https://cqdg.ca/en.html">{t('nav.website')}</Link>
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
)(Header);
