import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonPage
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { AppContextProvider } from './State';

import LoginPage from './pages/Login';
import ForgotPasswordPage from './pages/ForgotPassword';
import SignupPage from './pages/Signup';
import Tabs from './Tabs';

const App: React.FC = () => (
  <AppContextProvider>
    <IonApp>
      <IonReactRouter>
        <IonPage>
          <IonRouterOutlet>
            <Route path="/login" component={LoginPage} exact={true} />
            <Route path="/forgot-password" component={ForgotPasswordPage} exact={true} />
            <Route path="/signup" component={SignupPage} exact={true} />
            <Route exact={true} path="/" render={() => <Redirect to="/app/home" />} />
          </IonRouterOutlet>
          <Route path="/app" component={Tabs} />
        </IonPage>
      </IonReactRouter>
    </IonApp>
  </AppContextProvider>
);

export default App;
