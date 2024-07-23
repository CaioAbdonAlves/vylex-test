export interface FindTotalViewsAndLastMovie {
  _id: number;
  total: number;
  id: number;
  title: string;
}

export interface FindInfosByTheme {
  _id: number;
  count: number;
  themeId: number;
  themeName: string;
}

export interface Report {
  userId: number | string;
  totalFilmsWatched: number;
  mostWatchedTheme: {
    themeId: string | number;
    themeName: string;
    totalFilmsWatched: number;
  };
  lastFilmeWatched: {
    movieId: number | string;

    movieName: string;
  };
}
