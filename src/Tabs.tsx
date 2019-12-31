import React from 'react';

import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';

import { Route, Redirect, RouteComponentProps } from 'react-router';

import { home, search, cog } from 'ionicons/icons';
import Home from './pages/Home';
import Search from './pages/Search';
import Settings from './pages/Settings';

interface ItemProps extends RouteComponentProps<{ tab: string }> {
}

const Tabs = ({ history, match }: ItemProps) => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/app/home" component={Home} exact={true} />
        <Route path="/app/search" component={Search} exact={true} />
        <Route path="/app/settings" component={Settings} />
        <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/app/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="search" href="/app/search">
          <IonIcon icon={search} />
          <IonLabel>Search</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/app/settings">
          <IonIcon icon={cog} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default Tabs;