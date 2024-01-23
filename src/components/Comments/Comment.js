import React, { useState, useEffect } from "react";
import "./CommentsAndReviewers.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { getReviews, fetchPullRequest, createReview, getApprovers } from "../../api";


const initialComments = [
  {
    commenter: "John Doe",
    comments: ["Great post!", "Well done!"],
    status: "pending",
  },
  {
    commenter: "Alice Smith",
    comments: ["Nice work!", "Keep it up!"],
    status: "pending",
  },
  {
    commenter: "Bob Johnson",
    comments: ["I learned a lot."],
    status: "pending",
  },
];

const initialReviewers = [
  { reviewer: "Jane Doe", status: "approved" },
  { reviewer: "Charlie Brown", status: "rejected" },
  { reviewer: "Eve Johnson", status: "pending" },
];

const Comment = () => {
  const history = useHistory();
  const [pullrequest,setPullrequest] = useState({});
  // const classes = useStyles();
  const [reviews, setReviews] = useState([]);
  const [approvers, setApprovers] = useState([]);
  const [newComment, setNewComment] = useState("");

  const { id } = useParams();

  useEffect( async () => {
    // console.log(id);
    try {
      const respo = await getReviews(id);
      const approversData = await getApprovers(id);
      console.log(approversData);
      setReviews(respo.data);
      setApprovers(approversData.data);
      console.log(approvers);
      setPullrequest(await fetchPullRequest(id));
    } catch (error) {
      console.log(error);
    }
  }, []);

  // useEffect( () => {

  // }, [reviews]);

  const addComment = async() => {
    console.log(id);
    try {
      const data = {
        comment : newComment
      }
      await createReview(id,data);
      // setReviews([...reviews,])
      // console.log(res);
    } catch (error) {
      console.log(error);
    }

    try {
      const res = await getReviews(id);
      setReviews(res.data);
      const approversData = await getApprovers(id);
      setApprovers(approversData.data);
      console.log(approversData.data);
      console.log(approvers);
    } catch (error) {
      console.log(error);
    }
    setNewComment("");
  };
  const goBack = () => {
    history.push(`/`);
  };

  return (
    <>
      <Button
        onClick={goBack}
        variant="contained"
        color="primary"
        style={{
          marginBottom: "20px",
          backgroundColor: "#ff5733",
          color: "#fff",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Back
      </Button>
      <div className="comments-and-reviewers-container">
        <div className="section comments-section">
          <h2>Comments</h2>
          {reviews?.map((review) => (
            <div >
               <p>{review.comment}</p>
            </div>
          ))}

          <div>
            <h3>Add a Comment</h3>
            <input
              type="text"
              placeholder="Your Comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={addComment}>Add Comment</button>
          </div>
        </div>

        <div className="section reviewers-section">
          <h2>Reviewers</h2>
          {approvers?.map((reviewerData, index) => (
            <div key={index}>
              <h3>{reviewerData?.approverId?.username}</h3>
              <p>Status: {reviewerData?.status}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comment;
