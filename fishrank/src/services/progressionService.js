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

const toDate = (value) => {
  if (value?.toDate) return value.toDate();
  return value ? new Date(value) : null;
};

const isSameMonthDay = (date, month, day) => date.getMonth() + 1 === month && date.getDate() === day;

const hasLocation = (captures, values = []) =>
  captures.some((capture) => values.some((value) => normalize(capture.location).includes(normalize(value))));

const hasPersonalRecordBreak = (captures) => {
  const orderedCaptures = [...captures]
    .map((capture) => ({ ...capture, recordDate: captureDate(capture) }))
    .sort((a, b) => a.recordDate - b.recordDate);
  let bestWeight = 0;

  return orderedCaptures.some((capture) => {
    const weight = Number(capture.weight || 0);
    const brokeRecord = bestWeight > 0 && weight > bestWeight;
    bestWeight = Math.max(bestWeight, weight);
    return brokeRecord;
  });
};

const hasConsecutiveCaptureDays = (captures, requiredDays) => {
  const days = [...new Set(captures.map((capture) => captureDate(capture).toISOString().slice(0, 10)))].sort();
  let streak = 0;
  let previousTime = null;

  return days.some((day) => {
    const currentTime = new Date(`${day}T00:00:00`).getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    streak = previousTime && currentTime - previousTime === oneDay ? streak + 1 : 1;
    previousTime = currentTime;
    return streak >= requiredDays;
  });
};

const hasRequirement = (requirement, stats, captures, profile) => {
  switch (requirement.type) {
    case 'profile_exists':
      return Boolean(profile);
    case 'captures':
      return stats.totalCaptures >= requirement.value;
    case 'total_weight':
      return stats.totalWeight >= requirement.value;
    case 'largest_fish':
      return stats.largestFish >= requirement.value;
    case 'largest_length':
      return stats.largestLength >= requirement.value;
    case 'species_count':
      return countSpecies(captures, requirement.value) >= requirement.count;
    case 'total_species':
      return stats.totalSpecies >= requirement.value;
    case 'different_locations':
      return stats.totalLocations >= requirement.value;
    case 'location_contains':
      return hasLocation(captures, requirement.values);
    case 'total_likes':
      return stats.totalLikes >= requirement.value;
    case 'account_age_days': {
      const createdAt = toDate(profile?.createdAt);
      if (!createdAt) return false;
      return Date.now() - createdAt.getTime() >= requirement.value * 24 * 60 * 60 * 1000;
    }
    case 'date_month_day':
      return captures.some((capture) => isSameMonthDay(captureDate(capture), requirement.month, requirement.day));
    case 'personal_record_break':
      return hasPersonalRecordBreak(captures);
    case 'consecutive_capture_days':
      return hasConsecutiveCaptureDays(captures, requirement.value);
    case 'time':
      return captures.some((capture) => {
        const hour = captureDate(capture).getHours();
        if (requirement.value === 'night') return hour >= 20 || hour < 6;
        if (requirement.value === 'early_morning') return hour >= 5 && hour <= 7;
        if (requirement.value === 'sunset') return hour >= 17 && hour <= 19;
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
    const largestLength = captures.reduce((max, capture) => Math.max(max, Number(capture.length || 0)), 0);
    const totalLikes = captures.reduce((sum, capture) => sum + Number(capture.likes || 0), 0);

    const stats = {
      totalCaptures: captures.length,
      totalWeight,
      largestFish,
      largestLength,
      totalSpecies: species.size,
      totalLocations: locations.size,
      totalLikes,
    };

    const previousAchievements = profile?.unlockedAchievements || [];
    const previousTitles = profile?.unlockedTitles || [];

    const unlockedAchievements = getAllAchievements()
      .filter((achievement) => (
        hasRequirement(achievement.requirement, stats, captures, profile)
        || (achievement.requirement.type === 'manual' && previousAchievements.includes(achievement.id))
      ))
      .map((achievement) => achievement.id);

    const previousAchievementDates = profile?.achievementUnlockedAt || {};
    const unlockedAt = new Date();
    const achievementUnlockedAt = unlockedAchievements.reduce(
      (dates, achievementId) => ({
        ...dates,
        [achievementId]: previousAchievementDates[achievementId] || unlockedAt,
      }),
      {},
    );

    const unlockedTitles = getAllTitles()
      .filter((title) => (
        title.id === 'fishing_beginner'
        || hasRequirement(title.requirement, stats, captures, profile)
        || (title.requirement.type === 'manual' && previousTitles.includes(title.id))
      ))
      .map((title) => title.id);

    const equippedTitle = unlockedTitles.includes(profile?.equippedTitle)
      ? profile.equippedTitle
      : unlockedTitles[0] || 'fishing_beginner';

    await userService.updateUserProgress(uid, {
      ...stats,
      unlockedAchievements,
      achievementUnlockedAt,
      unlockedTitles,
      equippedTitle,
    });

    return {
      ...stats,
      unlockedAchievements,
      achievementUnlockedAt,
      unlockedTitles,
      equippedTitle,
      newAchievements: unlockedAchievements.filter(
        (id) => !(profile?.unlockedAchievements || []).includes(id),
      ),
    };
  },
};
