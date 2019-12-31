import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList
} from '@ionic/react';
import React, { useContext, useEffect } from 'react';
import { History } from 'history';
import { authGuard } from '../Routing';
import { AppContext, Actions } from '../State';
import { RouteComponentProps } from 'react-router';
import { loadThings } from '../db';

interface ItemProps extends RouteComponentProps<{ tab: string }> {
  history: History;
}

const Home = ({ history, match }: ItemProps) => {
  const { state, dispatch } = useContext(AppContext);

  const things = state.things;

  useEffect(() => {
    authGuard (dispatch, match, history);
  }, [dispatch, history, match]);

  useEffect(() => {
    async function loadData() {
      const things = await loadThings();

      dispatch({
        type: Actions.SetThings,
        things
      })
    }
    loadData();
  }, [dispatch]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {things.map((item: any) => (
            <IonItem key={item.id}>{item.name}</IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
