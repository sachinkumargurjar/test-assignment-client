import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import Autocomplete from "@mui/material/Autocomplete";
// import TextField from '@mui/material/TextField';
import Stack from "@mui/material/Stack";
// import TextField from "@mui/material/TextField";

import {
  createPullRequest,
  updatePullRequest,
} from "../../actions/pullrequests";
import useStyles from "./styles";

const StatusEnum = Object.freeze({
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
});

const Form = ({ currentId, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [pullRequestData, setPullRequestData] = useState({
    title: "",
    description: "",
    approvalType: "",
    requesterId: user?.result?._id,
    approvers: [],
    status: StatusEnum.PENDING,
  });
  const [approver, setApprover] = useState("");
  const pullrequest = useSelector((state) =>
    currentId
      ? state.pullrequests.find((message) => message._id === currentId)
      : null
  );

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (pullrequest) setPullRequestData(pullrequest);
  }, [pullrequest]);

  const clear = () => {
    setCurrentId(0);
    setPullRequestData({
      title: "",
      description: "",
      approvalType:"",
      requesterId: user?.result?._id,
      approvers: [],
      status: StatusEnum.PENDING,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(pullRequestData);

    if (currentId === 0) {
      dispatch(
        createPullRequest({ ...pullRequestData, name: user?.result?.name })
      );
      clear();
    } else {
      dispatch(
        updatePullRequest(currentId, {
          ...pullRequestData,
          name: user?.result?.name,
        })
      );
      clear();
    }
  };

  if (!user?.result?.username) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create and approve pull request.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId
            ? `Editing "${pullrequest?.title}"`
            : "Creating a Pull Request"}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={pullRequestData.title}
          onChange={(e) =>
            setPullRequestData({ ...pullRequestData, title: e.target.value })
          }
        />
        <div>
          <label htmlFor="selection">Select a Pull Request Type:</label>
          <select
            id="selection"
            value={pullRequestData.approvalType}
            onChange={(e) =>
              setPullRequestData({ ...pullRequestData, approvalType: e.target.value })
            }
           >
            <option value="">Select an option</option>
            <option value="Parallel">Parallel</option>
            <option value="Sequential">Sequential</option>
          </select>
        </div>
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          multiline
          rows={2}
          value={pullRequestData.description}
          onChange={(e) =>
            setPullRequestData({
              ...pullRequestData,
              description: e.target.value,
            })
          }
        />
        <TextField
          name="Approvers"
          variant="outlined"
          label="Approvers"
          fullWidth
          multiline
          rows={2}
          value={approver}
          // value={e.target.value}
          onChange={(e) =>
            // setPullRequestData({
            //   ...pullRequestData,
            //   approvers: [...pullRequestData.approvers, e.target.value],
            // })
            setApprover(e.target.value)
          }
        />
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          onClick={(e) => {
            setPullRequestData({
              ...pullRequestData,
              approvers: [...pullRequestData.approvers, approver],
            });
            setApprover("");
          }}
          fullWidth
        >
          Add
        </Button>
        {pullRequestData.approvers.map((el) => {
          return (
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="primary"
              size="large"
              onClick={(e) => {
                setPullRequestData({
                  ...pullRequestData,
                  approvers: pullRequestData.approvers.filter((a) => a !== el),
                });
              }}
              fullWidth
            >
              {el}
            </Button>
          );
        })}
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
