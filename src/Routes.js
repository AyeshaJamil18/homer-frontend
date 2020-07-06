import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
    Personal as PersonalView,
    AddFriend as AddFriendView,
    Dashboard as DashboardView,
    Icons as IconsView,
    NotFound as NotFoundView,
    Settings as SettingsView,
    SignIn as SignInView,
    SignUp as SignUpView,
    AdminSignUp as AdminSignUpView,
    Typography as TypographyView,
    SharePlaylist as SharePlaylistView,
    LB as LB,
    ViewFriend as ViewFriendsView,


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

                component={PersonalView}
                exact
                layout={MainLayout}
                path="/PersonalView"
            />

            <RouteWithLayout

                component={AddFriendView}
                exact
                layout={MainLayout}
                path="/AddFriend"
            />

            <RouteWithLayout

                component={ViewFriendsView}
                exact
                layout={MainLayout}
                path="/ViewFriend"
            />

            <RouteWithLayout

                component={SettingsView}
                exact
                layout={MainLayout}
                path="/SettingsView"
            />
            <RouteWithLayout
                component={SharePlaylistView}
                exact
                layout={MainLayout}
                path="/SharePlaylist"
            />
            <RouteWithLayout
                component={LB}
                exact
                layout={MainLayout}
                path="/LB"
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
                component={SettingsView}
                exact
                layout={MainLayout}
                path="/settings"
            />
            <RouteWithLayout
                component={SignUpView}
                exact
                layout={MinimalLayout}
                path="/sign-up"
            />
            <RouteWithLayout
                component={AdminSignUpView}
                exact
                layout={MinimalLayout}
                path="/admin-sign-up"
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
