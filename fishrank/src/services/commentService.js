import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/config';

const COMMENTS_COLLECTION = 'comments';
const POSTS_COLLECTION = 'posts';

const mapComment = (commentDoc) => ({
  id: commentDoc.id,
  ...commentDoc.data(),
});

const postCommentsQuery = (postId) =>
  query(collection(db, COMMENTS_COLLECTION), where('postId', '==', postId), orderBy('createdAt', 'asc'));

export const commentService = {
  createComment: async (commentData) => {
    try {
      const commentsRef = collection(db, COMMENTS_COLLECTION);
      const newComment = {
        postId: commentData.postId,
        uid: commentData.uid,
        displayName: commentData.displayName || '',
        photoURL: commentData.photoURL || '',
        equippedTitle: commentData.equippedTitle || 'fishing_beginner',
        text: commentData.text || '',
        createdAt: serverTimestamp(),
      };
      const docRef = await addDoc(commentsRef, newComment);
      await updateDoc(doc(db, POSTS_COLLECTION, commentData.postId), {
        commentsCount: increment(1),
      });
      return { id: docRef.id, ...newComment };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getPostComments: async (postId) => {
    try {
      const snapshot = await getDocs(postCommentsQuery(postId));
      return snapshot.docs.map(mapComment);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getComments: async (postId) => commentService.getPostComments(postId),

  listenToPostComments: (postId, callback, onError) => {
    return onSnapshot(
      postCommentsQuery(postId),
      (snapshot) => callback(snapshot.docs.map(mapComment)),
      (error) => onError?.(error)
    );
  },

  updateComment: async (commentId, data) => {
    try {
      await updateDoc(doc(db, COMMENTS_COLLECTION, commentId), data);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteComment: async (commentId, postId) => {
    try {
      await deleteDoc(doc(db, COMMENTS_COLLECTION, commentId));
      if (postId) {
        await updateDoc(doc(db, POSTS_COLLECTION, postId), {
          commentsCount: increment(-1),
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
