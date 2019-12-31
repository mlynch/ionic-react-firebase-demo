import React, { useContext, useCallback, useEffect } from 'react';

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton
} from '@ionic/react';
import { History } from 'history';
import { RouteComponentProps } from 'react-router';

import { logout } from '../user';
import { AppContext, Actions } from '../State';
import { authGuard } from '../Routing';

interface ItemProps extends RouteComponentProps<{ tab: string }> {
  history: History;
}

const Settings = ({ history, match }: ItemProps) => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    authGuard(dispatch, match, history);
  }, [dispatch, history, match]);

  const doLogout = useCallback(async () => {
    await logout();
    dispatch({
      type: Actions.LoggedOut
    });
    history.push('/login');
  }, [dispatch, history]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem onClick={doLogout}>
            <IonLabel>
              <IonButton expand="block" color="danger">Log out</IonButton>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
