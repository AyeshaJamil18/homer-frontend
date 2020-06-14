import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
    Account as AccountView,
    Dashboard as DashboardView,
    DocumentView as DocumentView,
    Editor as EditorView,
    Icons as IconsView,
    MyDocumentList as MyDocumentListView,
    NotFound as NotFoundView,
    PublicDocuments as PublicDocumentsView,
    Settings as SettingsView,
    SharedDocuments as SharedDocumentsView,
    SignIn as SignInView,
    SignUp as SignUpView,
    Typography as TypographyView
} from './views';

const Routes = () => {
    return (
        <Switch>
            <Redirect
                exact
                from="/"
                to="/dashboard"
            />
            <RouteWithLayout
                component={DashboardView}
                exact
                layout={MainLayout}
                path="/dashboard"
            />
            <RouteWithLayout
                component={MyDocumentListView}
                exact
                layout={MainLayout}
                path="/myDocuments"
            />
            <RouteWithLayout
                component={SharedDocumentsView}
                exact
                layout={MainLayout}
                path="/documentsSharedWithMe"
            />
            <RouteWithLayout
                component={PublicDocumentsView}
                exact
                layout={MainLayout}
                path="/sharedPublic"
            />
            <RouteWithLayout
                component={TypographyView}
                exact
                layout={MainLayout}
                path="/typography"
            />
            <RouteWithLayout
                component={IconsView}
                exact
                layout={MainLayout}
                path="/icons"
            />
            <RouteWithLayout
                component={AccountView}
                exact
                layout={MainLayout}
                path="/account"
            />
            <RouteWithLayout
                component={SettingsView}
                exact
                layout={MainLayout}
                path="/settings"
            />
            <RouteWithLayout
                component={EditorView}
                exact
                layout={MainLayout}
                path="/editor"
            />
            <RouteWithLayout
                component={DocumentView}
                exact
                layout={MainLayout}
                path="/document/:id"
            />
            <RouteWithLayout
                component={SignUpView}
                exact
                layout={MinimalLayout}
                path="/sign-up"
            />
            <RouteWithLayout
                component={SignInView}
                exact
                layout={MinimalLayout}
                path="/sign-in"
            />
            <RouteWithLayout
                component={NotFoundView}
                exact
                layout={MinimalLayout}
                path="/not-found"
            />
            <Redirect to="/not-found"/>
        </Switch>
    );
};

export default Routes;
