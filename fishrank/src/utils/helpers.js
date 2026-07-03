// Funções utilitárias gerais
export const formatDate = (date) => {
  if (!date) return '';
  if (typeof date === 'object' && date.toDate) {
    return new Intl.DateTimeFormat('pt-BR').format(date.toDate());
  }
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
};

export const formatDateWithTime = (date) => {
  if (!date) return '';
  if (typeof date === 'object' && date.toDate) {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date.toDate());
  }
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

export const formatRelativeTime = (date) => {
  if (!date) return 'Agora mesmo';
  const parsedDate = date?.toDate ? date.toDate() : new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return 'Agora mesmo';

  const diffMs = Date.now() - parsedDate.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return 'Agora mesmo';
  if (diffMinutes === 1) return '1 minuto atras';
  if (diffMinutes < 60) return `${diffMinutes} minutos atras`;
  if (diffHours === 1) return '1 hora atras';
  if (diffHours < 24) return `${diffHours} horas atras`;
  if (diffDays === 1) return 'Ontem';
  return `${diffDays} dias atras`;
};

export const formatWeight = (weight) => {
  if (!weight) return '0 kg';
  return `${parseFloat(weight).toFixed(2)} kg`;
};

export const formatLength = (length) => {
  if (!length) return '0 cm';
  return `${parseFloat(length).toFixed(2)} cm`;
};

export const truncateText = (text, length = 50) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat('pt-BR').format(num);
};

export const calculateRanking = (users) => {
  return users.sort((a, b) => {
    return (b.totalCaptures || 0) - (a.totalCaptures || 0);
  });
};

export const getTimeOfDay = (hour) => {
  if (hour >= 5 && hour < 7) return 'early_morning';
  if (hour >= 20 || hour < 5) return 'night';
  return 'day';
};

export const calculateAge = (birthDate) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
