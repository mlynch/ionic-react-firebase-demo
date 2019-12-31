import React, { useContext, useState, FormEvent, useCallback, useRef, KeyboardEvent } from 'react';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonPage,
  IonButtons,
  IonBackButton,
  IonLoading
} from "@ionic/react";
import { History } from 'history';
import { RouteComponentProps } from 'react-router';

import { AppContext } from '../State';
import { Actions } from '../State';
import { login } from '../user';

interface ItemProps extends RouteComponentProps<{ tab: string }> {
  history: History;
}

interface LoginErrors {
  code: number;
  message: string;
}

const LoginPage = ({ history, match }: ItemProps) => {
  const { dispatch } = useContext(AppContext);

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ formErrors, setFormErrors ] = useState<LoginErrors | null>(null);
  const [ showLoading, setShowLoading ] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setShowLoading(true);

      const user = await login(email, password);

      dispatch({
        type: Actions.LoggedIn,
        user
      });

      history.push('/app/home');

      setShowLoading(false);
    } catch (e) {
      setFormErrors(e);
      setShowLoading(false);
    }
  }

  const goTo = (path: string) => {
    history.push(path, { direction: 'forward' });
  }

  const formRef = useRef<HTMLFormElement>(null);
  const handleEnter = useCallback((e: KeyboardEvent<HTMLIonInputElement>) => {
    /*
    if (e.key === 'Enter' && formRef.current) {
      formRef.current.submit();
    }
    */
  }, []);

  return (
  <IonPage>
    <IonHeader>
      <IonToolbar color="light">
        <IonButtons slot="start">
          <IonBackButton defaultHref={`/`} />
        </IonButtons>
        <IonTitle>Login</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonLoading isOpen={showLoading} message="Logging in..." onDidDismiss={() => setShowLoading(false)}/>
      {formErrors ? (
        <div className="ion-padding" style={{ textAlign: 'center' }}>
          Unable to log in: {formErrors.message}
        </div>
      ) : (null)}
      <form onSubmit={handleSubmit} method="post" ref={formRef} action="">
        <IonList>
          <IonItem>
            <IonLabel position={'fixed'}>Email</IonLabel>
            <IonInput  type="email" value={email} onInput={(e: any) => setEmail(e.currentTarget.value)} onKeyUp={handleEnter} />
          </IonItem>
          <IonItem>
            <IonLabel position={'fixed'}>Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onInput={(e: any) => setPassword(e.currentTarget.value)}
              onKeyUp={handleEnter} />
          </IonItem>
          <IonButton expand="block" type="submit">Log in</IonButton>
        </IonList>
      </form>
      <div className="ion-padding" style={{ textAlign: 'center' }}>
        <a className="create" href="#/" onClick={(e) => { e.preventDefault(); goTo('/signup')}}>Create account instead</a>
        <br />
        <a href="#/" onClick={(e) => { e.preventDefault(); goTo('/reset-password')}}>Forgot your password?</a>
      </div>
    </IonContent>
  </IonPage>
  );
}

export default LoginPage;