export interface AuthorsInterface {
  id?: number;
  lastName: string;
  firstName: string;
}

export interface CourseInterface {
  id: number;
  name: string;
  creationDate: number;
  duration: number;
  description: string;
  isTopRated: boolean;
  liked: boolean;
  authors: AuthorsInterface[];
}
