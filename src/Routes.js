import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout, AdminMain as AdminMainLayout } from './layouts';

import {
    Profile as ProfileView,
    Friends as FriendsView,
    Dashboard as DashboardView,
    Icons as IconsView,
    NotFound as NotFoundView,
    Settings as SettingsView,
    SignIn as SignInView,
    AdminSignIn as AdminSignInView,
    SignUp as SignUpView,
    AdminSignUp as AdminSignUpView,
    AdminDashboard as AdminDashboardView,
    Typography as TypographyView,
    SharePlaylist as SharePlaylistView,
    LB as LB,

    FriendRequest as FriendRequestView,
    SearchResultVideo as SearchResultVideoView

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
                component={AdminDashboardView}
                exact
                layout={AdminMainLayout}
                path="/Admin-Dashboard"
            />

            <RouteWithLayout

                component={ProfileView}
                exact
                layout={MainLayout}
                path="/profile"
            />

            <RouteWithLayout
                component={FriendsView}


                exact
                layout={MainLayout}
                path="/friends"
            />

            <RouteWithLayout


                component={SearchResultVideoView}
                exact
                layout={MainLayout}
                path="/SearchResultVideo"
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
                component={AdminSignInView}
                exact
                layout={MinimalLayout}
                path="/admin-sign-in"
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
