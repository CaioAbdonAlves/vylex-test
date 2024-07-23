import {
  PaginationFilter,
  PaginationType,
} from 'src/application/interfaces/pagination.interface';
import { Theme } from '../schemas/theme.schema';

export interface ThemeFilters extends PaginationFilter {
  name?: string;
}
export interface ThemeRepository {
  createMany(themes: Theme[]): Promise<Theme[]>;
  find(filters?: ThemeFilters): Promise<PaginationType<Theme>>;
}
