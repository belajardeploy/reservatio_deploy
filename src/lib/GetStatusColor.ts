export const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'menunggu':
        return {
          bg: 'bg-gray-200 ',
          text: 'text-gray-800 ',
        };
      case 'selesai':
        return {
          bg: 'bg-primary-3/10 ',
          text: 'text-primary-1 ',
        };
      case 'terkonfirmasi':
        return {
          bg: 'bg-green-2/12 ',
          text: 'text-green-2 ',
        };
      case 'terverifikasi':
        return {
          bg: 'bg-orange-500/12 ',
          text: 'text-orange-500 ',
        };
      case 'pelanggaran':
        return {
          bg: 'bg-red-3/20 ',
          text: 'text-red-2 ',
        };
      default:
        return {
          bg: 'bg-gray-100 ',
          text: 'text-gray-700 ',
        };
    }
  };