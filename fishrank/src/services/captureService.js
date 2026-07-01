import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { db } from "../firebase/config";

const CAPTURES_COLLECTION = 'captures';

export const captureService = {
  // Criar nova captura
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

  // Obter captura por ID
  getCaptureById: async (captureId) => {
    try {
      const captureRef = doc(db, CAPTURES_COLLECTION, captureId);
      const captureDoc = await getDoc(captureRef);
      if (captureDoc.exists()) {
        return { id: captureDoc.id, ...captureDoc.data() };
      }
      return null;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Obter capturas do usuário
  getUserCaptures: async (uid) => {
    try {
      const q = query(
        collection(db, CAPTURES_COLLECTION),
        where('uid', '==', uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Obter ultimas capturas (para home)
  getLatestCaptures: async (pageSize = 10) => {
    try {
      const q = query(
        collection(db, CAPTURES_COLLECTION),
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Paginar capturas
  getPaginatedCaptures: async (pageSize = 10, lastDoc = null) => {
    try {
      let q;
      if (lastDoc) {
        q = query(
          collection(db, CAPTURES_COLLECTION),
          orderBy('createdAt', 'desc'),
          startAfter(lastDoc),
          limit(pageSize)
        );
      } else {
        q = query(
          collection(db, CAPTURES_COLLECTION),
          orderBy('createdAt', 'desc'),
          limit(pageSize)
        );
      }
      const querySnapshot = await getDocs(q);
      const captures = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      return {
        captures,
        lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1] || null,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Atualizar captura
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

  // Deletar captura
  deleteCapture: async (captureId) => {
    try {
      const captureRef = doc(db, CAPTURES_COLLECTION, captureId);
      await deleteDoc(captureRef);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Incrementar likes
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

  // Decrementar likes
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

  // Obter capturas por espécie
  getCapturesBySpecies: async (species) => {
    try {
      const q = query(
        collection(db, CAPTURES_COLLECTION),
        where('species', '==', species),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Obter capturas por localização
  getCapturesByLocation: async (location) => {
    try {
      const q = query(
        collection(db, CAPTURES_COLLECTION),
        where('location', '==', location),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Obter maior peixe de um usuário
  getLargestFishByUser: async (uid) => {
    try {
      const q = query(
        collection(db, CAPTURES_COLLECTION),
        where('uid', '==', uid),
        orderBy('weight', 'desc'),
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return {
          id: querySnapshot.docs[0].id,
          ...querySnapshot.docs[0].data(),
        };
      }
      return null;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
