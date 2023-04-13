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
  items: [];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  message: string;
  error: null | string;
  payload?: IBookResponse;
}

export interface bookDetailsState {
  currentbook: IBook | null;
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  message: string;
  error: null | string;
}

export interface IBook {
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

export interface IBookResponse {
  kind: string;
  totalItems: number;
  items: IBookItem[];
}

export interface IBookItem {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    imageLinks?: {
      thumbnail: string;
    };
    categories: string;
    authors: string[];

    publishedDate: string;
    industryIdentifiers: [
      {
        type: string;
        identifier: string;
      }
    ];
    readingModes: {
      text: false;
      image: false;
    };
    pageCount: number;
    printType: string;
    maturityRating: string;
    allowAnonLogging: false;
    contentVersion: string;
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
  };
  saleInfo: {
    country: string;
    saleability: string;
    isEbook: boolean;
  };
  accessInfo: {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: {
      isAvailable: boolean;
    };
    pdf: {
      isAvailable: boolean;
    };
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
  };
}

export type AsyncThunkConfig = {
  state: RootState;
};
