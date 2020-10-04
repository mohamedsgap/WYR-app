import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Header, Button } from "semantic-ui-react";
import { colors } from "../utils/helpers";

export default function PollTeaser(props) {
  PollTeaser.propTypes = {
    question: PropTypes.object.isRequired,
    unanswered: PropTypes.bool.isRequired,
  };

  const [viewPoll, setViewPoll] = useState(false);

  const handleClick = (e) => {
    setViewPoll((viewPoll) => !viewPoll);
  };

  const { question, unanswered } = props;
  const buttonColor = unanswered === true ? colors.green : colors.blue;
  const buttonContent = unanswered === true ? "Answer Poll" : "Results";

  if (viewPoll === true) {
    return <Redirect push to={`/questions/${question.id}`} />;
  }
  return (
    <Fragment>
      <Header as="h5" textAlign="left">
        Would you rather
      </Header>
      <p style={{ textAlign: "center" }}>
        {question.optionOne.text}
        <br />
        or...
      </p>
      <Button
        color={buttonColor.name}
        size="tiny"
        fluid
        onClick={handleClick}
        content={buttonContent}
      />
    </Fragment>
  );
}
