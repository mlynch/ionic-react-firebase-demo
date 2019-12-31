import { hasExistingSession, getUser } from './user';

import { Actions } from './State';

export const authGuard = async (dispatch: any, match: any, history: any) => {
  if (!await hasExistingSession()) {
    history.replace('/login');
    return;
  }

  const fullUser = await getUser();

  dispatch({
    type: Actions.SetUser,
    user: fullUser
  });
}