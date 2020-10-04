import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Header, Button, Form, Radio } from "semantic-ui-react";
import { handleSaveQuestionAnswer } from "../actions/users";

export default function PollQuestion(props) {
  PollQuestion.propTypes = {
    authUser: PropTypes.string.isRequired,
    handleSaveQuestionAnswer: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired,
  };

  const [value, setValue] = useState("");

  const handleChange = (e, { value }) => setValue(value);
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  const { question } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value !== "") {
      dispatch(handleSaveQuestionAnswer(authUser, question.id, value));
    }
  };

  const disabled = value === "" ? true : false;

  return (
    <Fragment>
      <Header as="h4">Would you rather</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <Radio
            label={question.optionOne.text}
            name="radioGroup"
            value="optionOne"
            checked={value === "optionOne"}
            onChange={handleChange}
          />
          <br />
          <Radio
            label={question.optionTwo.text}
            name="radioGroup"
            value="optionTwo"
            checked={value === "optionTwo"}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Button
            color="green"
            size="tiny"
            fluid
            positive
            disabled={disabled}
            content="Submit"
          />
        </Form.Field>
      </Form>
    </Fragment>
  );
}
