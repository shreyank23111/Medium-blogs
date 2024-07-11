import { atom, selector } from 'recoil';

// const getUniqueKey = (key: string) => `${key}_${process.env.NODE_ENV}`;




interface User {
  id: string;
  firstName: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export const authState = atom<AuthState>({
  key: 'authState',
  default:{
    isAuthenticated: !!localStorage.getItem('token'),
    user: null
  } 
});

export const isLoggedInSelector = selector<boolean>({
  key: 'isLoggedInSelector',
  get: ({ get }) => get(authState).isAuthenticated,
});

export const currentUserSelector = selector<User | null>({
  key: "currentUserselector",
  get: ({get}) => get(authState).user
})
