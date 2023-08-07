import { UserDTO } from "../types";


export const users: (UserDTO & { password: string })[] = [
  {
    id: '00001',
    username: 'admin',
    email: 'user@organization.com',
    password: 'admin',
  },

];
