import { userService } from './userService';

export const rankingService = {
  getRanking: async (type = 'captures', pageSize = 100) => {
    const users = await userService.getRanking(type, pageSize);

    if (type === 'medals') {
      return [...users].sort((a, b) => (b.unlockedAchievements || []).length - (a.unlockedAchievements || []).length);
    }

    return users;
  },
};
