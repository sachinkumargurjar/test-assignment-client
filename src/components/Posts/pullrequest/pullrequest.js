import React from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import { useDispatch } from "react-redux";
import moment from "moment";
import { updateApproval } from "../../../api";

import { deletePullRequest } from "../../../actions/pullrequests";

import useStyles from "./styles";

const Pullrequest = ({ pullrequest, setCurrentId, openRequests }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  console.log(pullrequest);

  const handleViewComments = () => {
    history.push(`/comments/${pullrequest._id}`);
  };
  const handleApprove = async () => { 
    try {
      const data = {
        updateType:'Approve'
      } 
      const res = await updateApproval(pullrequest._id,data)
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    try {
      const data = {
        updateType:'Reject'
     } 
      const res = await updateApproval(pullrequest._id,data)
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className={classes.card}>
      <div className={classes.overlay}>
        {/* <Typography variant="h6">{pullrequest?.title}</Typography> */}
        {/* <Typography variant="body2">
          {moment(pullrequest?.createdAt).fromNow()}
        </Typography> */}
      </div>
      {openRequests === true && (
        // (user?.result?.googleId === pullrequest?.creator ||
        // user?.result?._id === pullrequest?.creator)
        <div className={classes.overlay2}>
          <Button
            onClick={() => setCurrentId(pullrequest._id)}
            style={{ color: "black" }}
            size="small"
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {pullrequest.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {pullrequest?.description}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        {/* (user?.result?.googleId === pullrequest?.creator || user?.result?._id
        === pullrequest?.creator) */}
        {openRequests===true && (
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(deletePullRequest(pullrequest?._id))}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
        <Button size="small" onClick={handleViewComments}>
          View Reviews
        </Button>
        {openRequests === false && pullrequest.status === 'Pending' && (
          <>
            <Button size="small" color="primary" onClick={handleApprove}>
              Approve
            </Button>
            <Button size="small" color="secondary" onClick={handleReject}>
              Reject
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default Pullrequest;
