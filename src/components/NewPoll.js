import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Segment,
  Header,
  Grid,
  Divider,
  Form,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { handleSaveQuestion } from "../actions/questions";

export default function NewPoll() {
  NewPoll.propTypes = {
    authUser: PropTypes.string.isRequired,
    handleSaveQuestion: PropTypes.func.isRequired,
  };

  const [validSubmit, setValidSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");

  const handleChangeOption1 = (e) => {
    setOption1(e.target.value);
  };
  const handleChangeOption2 = (e) => {
    setOption2(e.target.value);
  };

  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    new Promise((res, rej) => {
      setIsLoading(true);
      dispatch(handleSaveQuestion(option1, option2, authUser));
      setTimeout(() => res("success"), 1000);
    }).then(() => {
      setOption1("");
      setOption2("");
      setValidSubmit(true);
    });
  };

  const disabled = option1 === "" || option2 === "";

  if (validSubmit === true) {
    return <Redirect to="/" />;
  }

  return (
    <Segment.Group>
      <Header as="h3" textAlign="left" block attached="top">
        Create a New Poll
      </Header>
      <Grid padded>
        <Grid.Column>
          {isLoading && (
            <Dimmer active inverted>
              <Loader content="Updating" />
            </Dimmer>
          )}
          <p>Complete the question:</p>
          <p>
            <strong>Would you rather...</strong>
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              id="option1"
              placeholder="Enter option one..."
              value={option1}
              onChange={handleChangeOption1}
              required
            />
            <Divider horizontal>Or</Divider>
            <Form.Input
              id="option2"
              placeholder="Enter option two..."
              value={option2}
              onChange={handleChangeOption2}
              required
            />
            <Form.Button positive size="tiny" fluid disabled={disabled}>
              Submit
            </Form.Button>
          </Form>
        </Grid.Column>
      </Grid>
    </Segment.Group>
  );
}
