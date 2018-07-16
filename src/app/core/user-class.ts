import { UserInterface } from './user-interface';

export class UserClass implements UserInterface {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public username: string,
    public password: string,
  ) { }
}
