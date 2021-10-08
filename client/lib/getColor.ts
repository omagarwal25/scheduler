export function getColor(credit: string, selected: boolean) {
  if (selected) {
    switch (credit) {
      case 'English':
        return 'bg-yellow-300 hover:bg-yellow-400';
      case 'Math':
        return 'bg-blue-300 hover:bg-blue-400';
      case 'Science':
        return 'bg-red-300 hover:bg-red-400';
      case 'Technology':
        return 'bg-green-300 hover:bg-green-400';
      case 'World Language':
        return 'bg-indigo-300 hover:bg-indigo-400';
      case 'Social Studies':
        return 'bg-pink-300 hover:bg-pink-400';
      case 'Art':
        return 'bg-purple-300 hover:bg-purple-400';
      case 'Extra':
        return 'bg-gray-600 hover:bg-gray-700 text-white';
      case 'All':
        return 'bg-black-300 hover:bg-black-400';
      case 'PE':
        return 'bg-gray-300 hover:bg-gray-400';
      default:
        return 'white';
    }
  } else {
    switch (credit) {
      case 'English':
        return 'bg-yellow-100 hover:bg-yellow-200';
      case 'Math':
        return 'bg-blue-100 hover:bg-blue-200';
      case 'Science':
        return 'bg-red-100 hover:bg-red-200';
      case 'Technology':
        return 'bg-green-100 hover:bg-green-200';
      case 'World Language':
        return 'bg-indigo-100 hover:bg-indigo-200';
      case 'Social Studies':
        return 'bg-pink-100 hover:bg-pink-200';
      case 'Art':
        return 'bg-purple-100 hover:bg-purple-200';
      case 'Extra':
        return 'bg-gray-400 hover:bg-gray-600 text-white';
      case 'All':
        return 'bg-black-100 hover:bg-black-200';
      case 'PE':
        return 'bg-gray-100 hover:bg-gray-200';
      default:
        return 'white';
    }
  }
}
