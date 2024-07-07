import { atom, selector } from 'recoil';

export const authState = atom<boolean>({
  key: 'authState',
  default: !!localStorage.getItem('token'), // Initialize based on token presence
});

export const isLoggedInSelector = selector<boolean>({
  key: 'isLoggedInSelector',
  get: ({ get }) => get(authState),
});
