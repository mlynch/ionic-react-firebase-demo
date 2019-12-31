import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { useEffect } from 'react';
import { History } from 'history';
import { authGuard } from '../Routing';
import { AppContext } from '../State';
import { RouteComponentProps } from 'react-router';

interface ItemProps extends RouteComponentProps<{ tab: string }> {
  history: History;
}

const Home = ({ history, match }: ItemProps) => {
  const { dispatch } = React.useContext(AppContext);

  useEffect(() => {
    authGuard (dispatch, match, history);
  }, [dispatch, history, match]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Home;
