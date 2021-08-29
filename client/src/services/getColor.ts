export function getColor(credit: string) {
  switch (credit) {
    case 'English':
      return 'yellow';
    case 'Math':
      return 'blue';
    case 'Science':
      return 'red';
    case 'Technology':
      return 'green';
    case 'World Language':
      return 'indigo';
    case 'Social Studies':
      return 'pink';
    case 'Art':
      return 'purple';
    case 'Extra':
      return 'gray';
    case 'All':
      return 'black';
    default:
      return 'white';
  }
}
