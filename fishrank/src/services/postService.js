import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../firebase/config';

const POSTS_COLLECTION = 'posts';
const COMMENTS_COLLECTION = 'comments';
const DELETE_BATCH_SIZE = 450;

const mapPost = (postDoc) => ({
  id: postDoc.id,
  ...postDoc.data(),
});

export const postService = {
  createPost: async (postData) => {
    try {
      const postsRef = collection(db, POSTS_COLLECTION);
      const newPost = {
        uid: postData.uid,
        displayName: postData.displayName || '',
        photoURL: postData.photoURL || '',
        equippedTitle: postData.equippedTitle || 'fishing_beginner',
        species: postData.species || '',
        weight: Number(postData.weight || 0),
        length: Number(postData.length || 0),
        location: postData.location || '',
        city: postData.city || '',
        state: postData.state || '',
        description: postData.description || '',
        imageURL: postData.imageURL || postData.photoURLCapture || '',
        captureId: postData.captureId || '',
        createdAt: postData.createdAt || serverTimestamp(),
        updatedAt: serverTimestamp(),
        commentsCount: Number(postData.commentsCount || 0),
      };
      const docRef = await addDoc(postsRef, newPost);
      return { id: docRef.id, ...newPost };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getPostById: async (postId) => {
    try {
      const postRef = doc(db, POSTS_COLLECTION, postId);
      const postDoc = await getDoc(postRef);
      return postDoc.exists() ? mapPost(postDoc) : null;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getPosts: async (pageSize = 50) => {
    try {
      const q = query(collection(db, POSTS_COLLECTION), orderBy('createdAt', 'desc'), limit(pageSize));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(mapPost);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getUserPosts: async (uid) => {
    try {
      const q = query(collection(db, POSTS_COLLECTION), where('uid', '==', uid), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(mapPost);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  listenToPosts: (callback, onError, pageSize = 100) => {
    const q = query(collection(db, POSTS_COLLECTION), orderBy('createdAt', 'desc'), limit(pageSize));
    return onSnapshot(
      q,
      (snapshot) => callback(snapshot.docs.map(mapPost)),
      (error) => onError?.(error)
    );
  },

  listenToUserPosts: (uid, callback, onError) => {
    const q = query(collection(db, POSTS_COLLECTION), where('uid', '==', uid), orderBy('createdAt', 'desc'));
    return onSnapshot(
      q,
      (snapshot) => callback(snapshot.docs.map(mapPost)),
      (error) => onError?.(error)
    );
  },

  updatePost: async (postId, data) => {
    try {
      const postRef = doc(db, POSTS_COLLECTION, postId);
      await updateDoc(postRef, {
        description: data.description || '',
        location: data.location || '',
        city: data.city || '',
        state: data.state || '',
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deletePost: async (postId) => {
    try {
      const commentsQuery = query(collection(db, COMMENTS_COLLECTION), where('postId', '==', postId));
      const commentsSnapshot = await getDocs(commentsQuery);

      for (let index = 0; index < commentsSnapshot.docs.length; index += DELETE_BATCH_SIZE) {
        const batch = writeBatch(db);
        commentsSnapshot.docs.slice(index, index + DELETE_BATCH_SIZE).forEach((commentDoc) => {
          batch.delete(commentDoc.ref);
        });
        await batch.commit();
      }

      await deleteDoc(doc(db, POSTS_COLLECTION, postId));
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
