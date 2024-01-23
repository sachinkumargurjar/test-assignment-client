import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes.js";
import * as api from "../api/index.js";

export const fetchPullRequests = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPullRequests();
     console.log(data);
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPullRequest = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPullRequest(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePullRequest = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePullRequest(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePullRequest = (id) => async (dispatch) => {
  try {
    await await api.deletePullRequest(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
