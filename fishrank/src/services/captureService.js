import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/config';

const CAPTURES_COLLECTION = 'captures';

const mapCapture = (captureDoc) => ({
  id: captureDoc.id,
  ...captureDoc.data(),
});

export const captureService = {
  createCapture: async (uid, captureData) => {
    try {
      const capturesRef = collection(db, CAPTURES_COLLECTION);
      const newCapture = {
        uid,
        ...captureData,
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const docRef = await addDoc(capturesRef, newCapture);
      return { id: docRef.id, ...newCapture };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getCaptureById: async (captureId) => {
    try {
      const captureRef = doc(db, CAPTURES_COLLECTION, captureId);
      const captureDoc = await getDoc(captureRef);
      return captureDoc.exists() ? mapCapture(captureDoc) : null;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getUserCaptures: async (uid) => {
    try {
      const q = query(collection(db, CAPTURES_COLLECTION), where('uid', '==', uid), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(mapCapture);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getLatestCaptures: async (pageSize = 10) => {
    try {
      const q = query(collection(db, CAPTURES_COLLECTION), orderBy('createdAt', 'desc'), limit(pageSize));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(mapCapture);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getPaginatedCaptures: async (pageSize = 10, lastDoc = null) => {
    try {
      const q = lastDoc
        ? query(collection(db, CAPTURES_COLLECTION), orderBy('createdAt', 'desc'), startAfter(lastDoc), limit(pageSize))
        : query(collection(db, CAPTURES_COLLECTION), orderBy('createdAt', 'desc'), limit(pageSize));
      const querySnapshot = await getDocs(q);

      return {
        captures: querySnapshot.docs.map(mapCapture),
        lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1] || null,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateCapture: async (captureId, data) => {
    try {
      const captureRef = doc(db, CAPTURES_COLLECTION, captureId);
      await updateDoc(captureRef, {
        ...data,
        updatedAt: new Date(),
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteCapture: async (captureId) => {
    try {
      await deleteDoc(doc(db, CAPTURES_COLLECTION, captureId));
    } catch (error) {
      throw new Error(error.message);
    }
  },

  incrementLikes: async (captureId) => {
    try {
      const captureRef = doc(db, CAPTURES_COLLECTION, captureId);
      const captureDoc = await getDoc(captureRef);
      const currentLikes = captureDoc.data().likes || 0;

      await updateDoc(captureRef, {
        likes: currentLikes + 1,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  decrementLikes: async (captureId) => {
    try {
      const captureRef = doc(db, CAPTURES_COLLECTION, captureId);
      const captureDoc = await getDoc(captureRef);
      const currentLikes = captureDoc.data().likes || 0;

      if (currentLikes > 0) {
        await updateDoc(captureRef, {
          likes: currentLikes - 1,
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getCapturesBySpecies: async (species) => {
    try {
      const q = query(collection(db, CAPTURES_COLLECTION), where('species', '==', species), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(mapCapture);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
