import { User } from '../models/user';

export interface IAppStates {
  readonly authState: IAuthState;
}

export interface IBaseState {
  data: any;
  error: any;
  isWaiting: boolean;
}

export interface IAuthState extends IBaseState {
  data: User;
}
