import { postService } from './postService';

export const feedService = {
  getFeed: (options) => postService.getFeed(options),
  getPosts: (pageSize) => postService.getPosts(pageSize),
  getUserPosts: (uid, options) => postService.getUserPosts(uid, options),
  listenToFeed: (callback, onError, pageSize) => postService.listenToPosts(callback, onError, pageSize),
  listenToUserPosts: (uid, callback, onError, pageSize) =>
    postService.listenToUserPosts(uid, callback, onError, pageSize),
};
