import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

const USERS_COLLECTION = 'users';
const RANKING_FIELDS = {
  captures: 'totalCaptures',
  weight: 'totalWeight',
  largest: 'largestFish',
  species: 'totalSpecies',
};

const mapUser = (userDoc) => {
  const data = userDoc.data();
  return {
    id: userDoc.id,
    ...data,
    equippedTitle: data.equippedTitle || data.equipedTitle || 'fishing_beginner',
  };
};

export const userService = {
  createUserProfile: async (uid, userData) => {
    try {
      const userRef = doc(db, USERS_COLLECTION, uid);
      const userProfile = {
        uid,
        email: userData.email || '',
        displayName: userData.displayName || '',
        photoURL: userData.photoURL || '',
        bio: '',
        city: '',
        equippedTitle: 'fishing_beginner',
        totalCaptures: 0,
        totalWeight: 0,
        largestFish: 0,
        totalSpecies: 0,
        totalLocations: 0,
        totalLikes: 0,
        unlockedTitles: ['fishing_beginner'],
        unlockedAchievements: [],
        achievementUnlockedAt: {},
        likes: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await setDoc(userRef, userProfile);
      return userProfile;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getUserProfile: async (uid) => {
    try {
      const userRef = doc(db, USERS_COLLECTION, uid);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) return null;
      const data = userDoc.data();
      return {
        ...data,
        equippedTitle: data.equippedTitle || data.equipedTitle || 'fishing_beginner',
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateUserProfile: async (uid, data) => {
    try {
      const userRef = doc(db, USERS_COLLECTION, uid);
      await updateDoc(userRef, {
        ...data,
        updatedAt: new Date(),
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateUserProgress: async (uid, progress) => {
    try {
      const userRef = doc(db, USERS_COLLECTION, uid);
      await updateDoc(userRef, {
        ...progress,
        updatedAt: new Date(),
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getUserByEmail: async (email) => {
    try {
      const q = query(collection(db, USERS_COLLECTION), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      return querySnapshot.empty ? null : querySnapshot.docs[0].data();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getAllUsers: async () => {
    try {
      const q = query(collection(db, USERS_COLLECTION), orderBy('totalCaptures', 'desc'), limit(100));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(mapUser);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getRanking: async (type = 'captures', pageSize = 100) => {
    try {
      const field = RANKING_FIELDS[type] || RANKING_FIELDS.captures;
      const q = query(collection(db, USERS_COLLECTION), orderBy(field, 'desc'), limit(pageSize));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(mapUser);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateUserStats: async (uid, stats) => {
    try {
      const userRef = doc(db, USERS_COLLECTION, uid);
      await updateDoc(userRef, {
        totalCaptures: stats.totalCaptures || 0,
        totalWeight: stats.totalWeight || 0,
        largestFish: stats.largestFish || 0,
        totalSpecies: stats.totalSpecies || 0,
        totalLocations: stats.totalLocations || 0,
        updatedAt: new Date(),
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  unlockTitle: async (uid, titleId) => {
    try {
      const profile = await userService.getUserProfile(uid);
      const unlockedTitles = profile?.unlockedTitles || [];
      if (!unlockedTitles.includes(titleId)) {
        await userService.updateUserProfile(uid, { unlockedTitles: [...unlockedTitles, titleId] });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },

  equipTitle: async (uid, titleId) => {
    try {
      await userService.updateUserProfile(uid, { equippedTitle: titleId });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  unlockAchievement: async (uid, achievementId) => {
    try {
      const profile = await userService.getUserProfile(uid);
      const unlockedAchievements = profile?.unlockedAchievements || [];
      if (!unlockedAchievements.includes(achievementId)) {
        const achievementUnlockedAt = profile?.achievementUnlockedAt || {};
        await userService.updateUserProfile(uid, {
          unlockedAchievements: [...unlockedAchievements, achievementId],
          achievementUnlockedAt: {
            ...achievementUnlockedAt,
            [achievementId]: achievementUnlockedAt[achievementId] || new Date(),
          },
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },

  addLike: async (uid, captureId) => {
    try {
      const profile = await userService.getUserProfile(uid);
      const likes = profile?.likes || [];
      if (!likes.includes(captureId)) {
        await userService.updateUserProfile(uid, { likes: [...likes, captureId] });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },

  removeLike: async (uid, captureId) => {
    try {
      const profile = await userService.getUserProfile(uid);
      const likes = profile?.likes || [];
      await userService.updateUserProfile(uid, { likes: likes.filter((id) => id !== captureId) });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteUser: async (uid) => {
    try {
      await deleteDoc(doc(db, USERS_COLLECTION, uid));
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
