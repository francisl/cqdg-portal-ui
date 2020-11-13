import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Head from '@ncigdc/components/Head';
import NotFound from '@ncigdc/components/NotFound';
import LoadableWithLoading from '@ncigdc/components/LoadableWithLoading';
import ProjectRoute from '@ncigdc/routes/ProjectRoute';
import FileRoute from '@ncigdc/routes/FileRoute';
import CaseRoute from '@ncigdc/routes/CaseRoute';
import AnnotationRoute from '@ncigdc/routes/AnnotationRoute';
import ComponentsRoute from '@ncigdc/routes/ComponentsRoute';
import GeneRoute from '@ncigdc/routes/GeneRoute';
import AnalysisRoute from '@ncigdc/routes/AnalysisRoute';
import SSMRoute from '@ncigdc/routes/SSMRoute';
import ManageSetsRoute from '@ncigdc/routes/ManageSetsRoute';
import SmartSearchRoute from '@ncigdc/routes/SmartSearchRoute';
import ImageViewerRoute from '@ncigdc/routes/ImageViewerRoute';
import RedirectRoute from '@ncigdc/routes/RedirectRoute';

const HomePage = LoadableWithLoading({
  loader: () => import('@cqdg/pages/home'),
});

export const Routes = () => (
  <Route component={HomePage} exact path="/home" />
);
