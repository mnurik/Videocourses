export interface AuthorsInterface {
  id?: number;
  lastName: string;
  firstName: string;
}

export interface CourseInterface {
  id: number;
  name: string;
  creationDate: string;
  duration: number;
  description: string;
  isTopRated: boolean;
  liked: boolean;
  authors: AuthorsInterface[];
}
