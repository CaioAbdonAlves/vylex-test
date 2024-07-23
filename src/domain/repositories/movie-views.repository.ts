import { MovieViews } from '../schemas/movie-views.schema';

export interface MoviesViewsRepository {
  create(plan: MovieViews): Promise<MovieViews>;
  findOne(filter: any): Promise<MovieViews | null>;
  deleteOne(filter: any): Promise<any>;
}
