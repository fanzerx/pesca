import { getAllAchievements } from '../constants/achievements';
import { getAllTitles } from '../constants/titles';
import { captureService } from './captureService';
import { userService } from './userService';

const normalize = (value = '') =>
  value
    .toString()
    .trim()
    .toLocaleLowerCase('pt-BR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const countSpecies = (captures, species) =>
  captures.filter((capture) => normalize(capture.species || capture.fishName).includes(normalize(species))).length;

const captureDate = (capture) => {
  const value = capture.capturedAt || capture.createdAt;
  if (value?.toDate) return value.toDate();
  return value ? new Date(value) : new Date();
};

const hasRequirement = (requirement, stats, captures) => {
  switch (requirement.type) {
    case 'captures':
      return stats.totalCaptures >= requirement.value;
    case 'total_weight':
      return stats.totalWeight >= requirement.value;
    case 'largest_fish':
      return stats.largestFish >= requirement.value;
    case 'species_count':
      return countSpecies(captures, requirement.value) >= requirement.count;
    case 'different_locations':
      return stats.totalLocations >= requirement.value;
    case 'time':
      return captures.some((capture) => {
        const hour = captureDate(capture).getHours();
        if (requirement.value === 'night') return hour >= 20 || hour < 6;
        if (requirement.value === 'early_morning') return hour >= 5 && hour <= 7;
        return false;
      });
    default:
      return false;
  }
};

export const progressionService = {
  refreshUserProgress: async (uid) => {
    const profile = await userService.getUserProfile(uid);
    const captures = await captureService.getUserCaptures(uid);
    const species = new Set(captures.map((capture) => normalize(capture.species || capture.fishName)).filter(Boolean));
    const locations = new Set(captures.map((capture) => normalize(capture.location)).filter(Boolean));
    const totalWeight = captures.reduce((sum, capture) => sum + Number(capture.weight || 0), 0);
    const largestFish = captures.reduce((max, capture) => Math.max(max, Number(capture.weight || 0)), 0);

    const stats = {
      totalCaptures: captures.length,
      totalWeight,
      largestFish,
      totalSpecies: species.size,
      totalLocations: locations.size,
    };

    const unlockedAchievements = getAllAchievements()
      .filter((achievement) => hasRequirement(achievement.requirement, stats, captures))
      .map((achievement) => achievement.id);

    const unlockedTitles = getAllTitles()
      .filter((title) => title.id === 'fishing_beginner' || hasRequirement(title.requirement, stats, captures))
      .map((title) => title.id);

    const equippedTitle = unlockedTitles.includes(profile?.equippedTitle)
      ? profile.equippedTitle
      : unlockedTitles[0] || 'fishing_beginner';

    await userService.updateUserProgress(uid, {
      ...stats,
      unlockedAchievements,
      unlockedTitles,
      equippedTitle,
    });

    return {
      ...stats,
      unlockedAchievements,
      unlockedTitles,
      equippedTitle,
      newAchievements: unlockedAchievements.filter(
        (id) => !(profile?.unlockedAchievements || []).includes(id),
      ),
    };
  },
};
