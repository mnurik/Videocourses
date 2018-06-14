import { UserInterface } from './user-interface';

export class UserClass implements UserInterface {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
  ) {}
}
