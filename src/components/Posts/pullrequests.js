import React, { useState } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Pullrequest from "./pullrequest/pullrequest";
import useStyles from "./styles";

const Pullrequests = ({ openRequests, approvals, setCurrentId }) => {
  const pullrequests = useSelector((state) => state?.pullrequests);
  console.log(pullrequests);
  const classes = useStyles();

  return openRequests ? (
    !pullrequests.length ? (
      <CircularProgress />
    ) : (
      <>
        <h4>My Pull Requests</h4>
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {pullrequests?.map((pullrequest) => (
            <Grid key={pullrequest._id} item xs={12} sm={6} md={6}>
              <Pullrequest
                pullrequest={pullrequest}
                openRequests={openRequests}
                setCurrentId={setCurrentId}
              />
            </Grid>
          ))}
        </Grid>
      </>
    )
  ) : !approvals.length ? (
    <CircularProgress />
  ) : (
    <>
      <h4>My Approval Pull Requests</h4>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {approvals?.map(
          (approval) =>
            approval && (
              <Grid key={approval._id} item xs={12} sm={6} md={6}>
                <Pullrequest
                  pullrequest={approval}
                  openRequests={openRequests}
                  setCurrentId={setCurrentId}
                />
              </Grid>
            )
        )}
      </Grid>
    </>
  );
};

export default Pullrequests;
