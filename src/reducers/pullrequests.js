import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";

export default (pullrequests = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    // case LIKE:
    //   return posts.map((post) =>
    //     post._id === action.payload._id ? action.payload : post
    //   );
    case CREATE:
      return [...pullrequests, action.payload];
    case UPDATE:
      return pullrequests.map((pullRequest) =>
        pullRequest._id === action.payload._id ? action.payload : pullRequest
      );
    case DELETE:
      return pullrequests.filter((pullrequest) => pullrequest._id !== action.payload);
    default:
      return pullrequests;
  }
};
