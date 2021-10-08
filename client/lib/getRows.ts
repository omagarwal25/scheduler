import { CoursesSize } from '../lib/CoursesSize';

export function getRows(rows: CoursesSize) {
  switch (rows) {
    case CoursesSize.large:
      return 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5';
    case CoursesSize.medium:
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
    default:
      return 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1';
  }
}
