import { RootState } from 'store/store';

export interface MainBooksState {
  startPagination: number;
  totalItems: number;
  inputValue: string;
  varietyOfCategories: string[];
  sortBy: string[];
  showBtn: boolean;
  categoryValue: string;
  sortValue: string;
  showFilteredCategory: IBookItem[];
  showBooks: IBookItem[];
  items: string[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  message: string;
  error: null | string;
  payload?: IBookResponse;
}

export interface IUser {
  email: string;
  password: string;
  token: string;
  id: string;
}

export interface FavoritesBooks {
  favouritesBooks: IBookItem[];
  items: string[];
}

export interface BookDetailsState {
  currentbook: IBookItem | null;
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  message: string;
  error: null | string;
}
export interface IBookResponse {
  kind: string;
  totalItems: number;
  items: IBookItem[];
}

export interface IBookItem {
  id: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    categories: string[];
    authors: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
}

export type AsyncThunkConfig = {
  state: RootState;
};
