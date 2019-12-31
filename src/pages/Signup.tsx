import React, { useContext, useState, FormEvent } from 'react';
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
import { Actions, AppContext } from '../State';
import { History } from 'history';
import { RouteComponentProps } from 'react-router';
import { signup } from '../user';

interface ItemProps extends RouteComponentProps<{ tab: string }> {
  history: History;
}

interface SignupErrors {
  code: number;
  message: string;
}

const SignupPage = ({ history, match }: ItemProps) => {
  const { dispatch } = useContext(AppContext);

  const [ email, setEmail ] = useState('');
  const [ name, setName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ formErrors, setFormErrors ] = useState<SignupErrors | null>(null);
  const [ showLoading, setShowLoading ] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setShowLoading(true);

      const user = await signup({ name, email, password });

      setShowLoading(false);

      dispatch({
        type: Actions.LoggedIn,
        user
      });

      history.push('/app/home');
    } catch (e) {
      setFormErrors(e);
      setShowLoading(false);
    }
  }

  const goTo = (path: string) => {
    history.push(path, { direction: 'forward' });
  }

  return (
  <IonPage>
    <IonHeader>
      <IonToolbar color="light">
        <IonButtons slot="start">
          <IonBackButton defaultHref={`/`} />
        </IonButtons>
        <IonTitle>Create Account</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonLoading isOpen={showLoading} message="Creating account..." onDidDismiss={() => setShowLoading(false)}/>
      <div className="ion-padding" style={{ textAlign: 'center' }}>
        <p>
          Welcome, please create an account
        </p>
      </div>
      {formErrors ? (
        <div style={{ textAlign: 'center' }}>
          Unable to create account: {formErrors.message}
        </div>
      ) : (null)}
      <form onSubmit={e => handleSubmit(e)} action="post">
        <IonList>
          <IonItem>
            <IonLabel position={'fixed'}>Name</IonLabel>
            <IonInput name="name" type="text" value={name} onInput={(e: any) => setName(e.currentTarget.value)} />
          </IonItem>
          <IonItem>
            <IonLabel position={'fixed'}>Email</IonLabel>
            <IonInput name="email" type="email" value={email} onInput={(e: any) => setEmail(e.currentTarget.value)} />
          </IonItem>
          <IonItem>
            <IonLabel position={'fixed'}>Password</IonLabel>
            <IonInput name="password" type="password" value={password} onInput={(e: any) => setPassword(e.currentTarget.value)} />
          </IonItem>

          <IonButton color="primary" expand="block" type="submit">Create Account</IonButton>
        </IonList>
      </form>
      <div className="ion-padding" style={{ textAlign: 'center' }}>
        <a href="#/" onClick={(e) => { e.preventDefault(); goTo('/login')}}>Already have an account? Log in</a>
      </div>
    </IonContent>
  </IonPage>
  );
}

export default SignupPage;