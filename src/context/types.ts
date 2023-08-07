import { UserDTO } from "../../types";


export interface SignInParams {
  username: string;
  password: string;
  onSuccess: () => void;
  onError: () => void;
}

export interface IUserContext {
  updateUser: () => void;
  deleteData: () => void;
  errorMessage: string;
  isLoading: boolean;
  user: UserDTO;
  userToken: string | null;
  logout: (callback: () => void) => void;
  signIn: (params: SignInParams) => void;
}
