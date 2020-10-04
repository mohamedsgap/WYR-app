import React from "react";
import { Container, Header } from "semantic-ui-react";

export default function NoMatch() {
  return (
    <Container textAlign="center">
      <Header as="h3">No Match 404 Error</Header>
      <p>Nothing to see here. Please use the menu to try again.</p>
    </Container>
  );
}
