import axios from "axios";

const API = axios.create({ baseURL: "https://server-mly0.onrender.com" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPullRequests = () => API.get("/pullrequests");
export const fetchPullRequest = (id) => API.get(`/pullrequests/${id}`);
export const createPullRequest = (newPost) =>
  API.post("/pullrequests", newPost);
export const updatePullRequest = (id, updatedPullRequest) =>
  API.put(`/pullrequests/${id}`, updatedPullRequest);
export const deletePullRequest = (id) => API.delete(`/pullrequests/${id}`);
export const updateApproval = (pr_id, sign) =>
  API.put(`/pullrequests/${pr_id}/approval`, sign);

export const getReviews = (id) =>
  API.get(`/pullrequests/${id}/comments`);

export const getApprovers = (id) =>
  API.get(`/pullrequests/${id}/approvals`);

export const createReview = (id,data) =>
  API.post(`/pullrequests/${id}/comments`,data);

export const getUserApprovals = (id) => API.get("/pullrequests/approvers");
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
