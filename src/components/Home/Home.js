import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import Axios from "axios";

import { fetchPullRequests } from "../../actions/pullrequests";
import Posts from "../Posts/pullrequests";
import Form from "../Form/Form";

import {getUserApprovals} from "../../api/index";

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const [approvals, setapprovals] = useState();
  const [openRequests, setOpenRequests] = useState(true);
  const dispatch = useDispatch();
  // const API = Axios.create({ baseURL: "http://localhost:5000" });

  useEffect(() => {
    dispatch(fetchPullRequests());
  }, [currentId, dispatch]);

  useEffect(async () => {
    const approvalsList = [];
    (await getUserApprovals()).data.forEach((el) => {
      approvalsList.push(el.pullRequestId);
    })
    setapprovals(approvalsList);
    console.log(approvalsList);
  }, []);

  return (
    <Grow in>
      <Container>
        <Button
          variant="contained"
          onClick={() => setOpenRequests(!openRequests)}
        >
          Change Pull Requests
        </Button>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts
              setCurrentId={setCurrentId}
              approvals={approvals}
              openRequests={openRequests}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
