import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { handleInitialData } from "./actions/shared";
import { connect } from "react-redux";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Home from "./components/Home";
import UserCard from "./components/UserCard";
import NewPoll from "./components/NewPoll";
import Leaderboard from "./components/Leaderboard";
import NoMatch from "./components/NoMatch";

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authUser } = this.props;
    return (
      <Router>
        <div className="App">
          {authUser === null ? (
            <Route
              render={() => (
                <ContentGrid>
                  <Login />
                </ContentGrid>
              )}
            />
          ) : (
            <Fragment>
              <Nav />
              <ContentGrid>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/questions/bad_id" component={NoMatch} />
                  <Route path="/questions/:question_id" component={UserCard} />
                  <Route path="/add" component={NewPoll} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route component={NoMatch} />
                </Switch>
              </ContentGrid>
            </Fragment>
          )}
        </div>
      </Router>
    );
  }
}

const ContentGrid = ({ children }) => (
  <Grid padded="vertically" columns={1} centered>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 550 }}>{children}</Grid.Column>
    </Grid.Row>
  </Grid>
);

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps, { handleInitialData })(App);
