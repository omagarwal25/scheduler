export function getColor(credit: string, selected: boolean) {
  if (selected) {
    switch (credit) {
      case 'English':
        return 'hover:from-yellow-50 hover:to-yellow-200 from-yellow-200 to-yellow-400';
      case 'Math':
        return 'hover:from-blue-50 hover:to-blue-200 from-blue-200 to-blue-400';
      case 'Science':
        return 'hover:from-red-50 hover:to-red-200 from-red-200 to-red-400';
      case 'Technology':
        return 'hover:from-green-50 hover:to-green-200 from-green-200 to-green-400';
      case 'World Language':
        return 'hover:from-indigo-50 hover:to-indigo-200 from-indigo-200 to-indigo-400';
      case 'Social Studies':
        return 'hover:from-pink-50 hover:to-pink-200 from-pink-200 to-pink-400';
      case 'Art':
        return 'hover:from-purple-50 hover:to-purple-200 from-purple-200 to-purple-400';
      case 'Extra':
        return 'hover:from-gray-50 hover:to-gray-200 from-gray-200 to-gray-400';
      case 'All':
        return 'hover:from-black-50 hover:to-black-200 from-black-200 to-black-400';
      case 'PE':
        return 'hover:to-gray-100 hover:from-gray-100 to-gray-300 from-white focus:to-gray-300 focus:from-white';
      default:
        return 'white';
    }
  } else {
    switch (credit) {
      case 'English':
        return 'from-yellow-50 to-yellow-200 hover:from-yellow-200 hover:to-yellow-400';
      case 'Math':
        return 'from-blue-50 to-blue-200 hover:from-blue-200 hover:to-blue-400';
      case 'Science':
        return 'from-red-50 to-red-200 hover:from-red-200 hover:to-red-400';
      case 'Technology':
        return 'from-green-50 to-green-200 hover:from-green-200 hover:to-green-400';
      case 'World Language':
        return 'from-indigo-50 to-indigo-200 hover:from-indigo-200 hover:to-indigo-400';
      case 'Social Studies':
        return 'from-pink-50 to-pink-200 hover:from-pink-200 hover:to-pink-400';
      case 'Art':
        return 'from-purple-50 to-purple-200 hover:from-purple-200 hover:to-purple-400';
      case 'Extra':
        return 'from-gray-50 to-gray-200 hover:from-gray-200 hover:to-gray-400';
      case 'All':
        return 'from-black-50 to-black-200 hover:from-black-200 hover:to-black-400';
      case 'PE':
        return 'hover:to-gray-100 hover:from-gray-100 to-gray-300 from-white';
      default:
        return 'white';
    }
  }
}
