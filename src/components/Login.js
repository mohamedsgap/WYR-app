import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  Segment,
  Grid,
  Header,
  Image,
  Form,
  Loader,
  Dimmer,
} from "semantic-ui-react";
import { setAuthUser } from "../actions/authUser";
import img from "../images/avatars/avatars.png";
export default function Login() {
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true);
  };

  return (
    <Fragment>
      <Segment.Group>
        <LoginHeader />
        <LoginGridLayout
          image={<BrandImage />}
          form={<LoginForm onLoading={handleLoading} />}
          loading={loading}
        />
      </Segment.Group>
      <footer className="footer">
        <a href="https://www.freepik.com/vectors/business">
          Business vector created by freepik - www.freepik.com
        </a>
        <br></br>
        Made with{" "}
        <span role="img" aria-label="heart">
          ♥️
        </span>{" "}
        by <a href="https://github.com/mohamedsgap">Mohamed Abdel Nasser</a>
      </footer>
    </Fragment>
  );
}

const LoginHeader = () => (
  <Header as="h4" block attached="top" textAlign="center">
    <Header.Content>Welcome to the Would You Rather App!</Header.Content>
    <Header.Subheader>Please sign in to continue</Header.Subheader>
  </Header>
);

const LoginGridLayout = ({ image, form, loading }) => (
  <div>
    <Grid padded textAlign="center">
      <Grid.Row className="login">
        <Grid.Column width={16}>
          {loading === true && (
            <Dimmer active inverted>
              <Loader inverted content="Loading" />
            </Dimmer>
          )}
          {image}
          <br />
          {form}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

const BrandImage = () => <Image src={img} size="medium" centered />;

function LoginForm(props) {
  LoginForm.propTypes = {
    onLoading: PropTypes.func.isRequired,
  };

  const [value, setValue] = useState("");
  const onChange = (e, { value }) => {
    setValue(value);
  };

  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { onLoading } = props;

    const authUser = value;

    new Promise((res, rej) => {
      onLoading();
      setTimeout(() => res(), 500);
    }).then(() => dispatch(setAuthUser(authUser)));
  };

  const generateDropdownData = () => {
    const users = Object.values(allUsers);

    return users.map((user) => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatarURL },
    }));
  };

  const disabled = value === "" ? true : false;

  return (
    <Form onSubmit={handleSubmit}>
      <Header as="h2" color="green">
        Sign In
      </Header>
      <Form.Dropdown
        placeholder="Select a Friend"
        fluid
        selection
        scrolling
        options={generateDropdownData()}
        value={value}
        onChange={onChange}
        required
      />
      <Form.Button content="Login" positive disabled={disabled} fluid />
    </Form>
  );
}
