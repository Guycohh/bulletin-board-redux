import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
const initialState = {
  posts: [],
  status: 'idle', // 'idle' || 'loading' || 'succeeded' || 'failed'
  error: null,
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    /**
     It takes the current state (state) and an action (action), 
     and it modifies the state by pushing the payload of the action into the array.
      The payload is assumed to be a post object.
     */
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const exsistingPost = state.posts.find((post) => post.id === postId);
      if (exsistingPost) {
        exsistingPost.reactions[reaction]++;
      }
    },
  },
});
/**
 * This exports a selector function named selectAllPosts that takes the
 *  entire Redux state as an argument and returns the 'posts' slice of the state.
 * Selectors are used to extract specific pieces of information from the Redux store.
 * @param {*} state
 * @returns state.posts
 */

export const selectAllPosts = (state) => state.posts.posts;

export const { postAdded, reactionAdded } = postSlice.actions;

export default postSlice.reducer;
