import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { History } from 'history';
import React, { useEffect } from 'react';
import { authGuard } from '../Routing';
import { RouteComponentProps } from 'react-router';
import { AppContext } from '../State';

interface ItemProps extends RouteComponentProps<{ tab: string }> {
  history: History;
}

const Search = ({ history, match }: ItemProps) => {
  const { dispatch } = React.useContext(AppContext);

  useEffect(() => {
    authGuard(dispatch, match, history);
  }, [dispatch, history, match]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Search;
