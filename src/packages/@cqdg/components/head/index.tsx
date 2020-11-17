import React from 'react';

// @ts-ignore
import { Helmet } from 'react-helmet';
import t from '@cqdg/locales/intl';

enum Pages {
  home,
  files,
  studies,
  connexion,
}

type PageNameType = {
  [key in Pages]: string;
}

const PageTranslation: PageNameType = {
  [Pages.home]: 'nav.home',
  [Pages.files]: 'nav.file.repo',
  [Pages.studies]: 'nav.studies',
  [Pages.connexion]: 'nav.connexion',
};

interface IHeadProps {
  path: string;
}

const Head = ({ path }: IHeadProps) => (
  <Helmet>
    <meta
      content={t('global.app.description')}
      name="description"
      />
    <title>{t(PageTranslation[Pages[path]]) || t('nav.home')}</title>
    <link href="/favicon.ico" rel="icon" />
  </Helmet>
);

export default Head;
