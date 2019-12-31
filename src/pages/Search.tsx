import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  useIonViewDidEnter
} from '@ionic/react';
import { History } from 'history';
import React, { useEffect, useContext, useRef, useState } from 'react';
import { authGuard } from '../Routing';
import { RouteComponentProps } from 'react-router';
import { AppContext } from '../State';

interface ItemProps extends RouteComponentProps<{ tab: string }> {
  history: History;
}

const Search = ({ history, match }: ItemProps) => {
  const { dispatch } = useContext(AppContext);

  const searchRef = useRef<HTMLIonSearchbarElement>(null);

  // We likely have a search query here
  const [ query, setQuery ] = useState('');

  useEffect(() => {
    authGuard(dispatch, match, history);
  }, [dispatch, history, match]);

  useIonViewDidEnter(() => {
    const ref = searchRef.current;
    ref && ref.setFocus && ref.setFocus();
  });

  useEffect(() => {
    async function search() {
      // Do the search here every time the query changes
      console.log('Searching');
    }
    search();
  }, [query]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
                ref={searchRef}
                placeholder="Enter query"
                value={query}
                onIonChange={(e: any) => setQuery(e.target.value)}/>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Search;
