import logo from './logo.svg';
import './App.css';
import { withAuthenticator, Heading, Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App({ signOut, user }) {
  return (
    <div className="App">
      <Heading level={1}>Hello {user.username}</Heading>
      <Button onClick={signOut}>Sign out</Button>
    </div>
  );
}

export default withAuthenticator(App, {

});
