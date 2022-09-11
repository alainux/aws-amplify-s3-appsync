import React from 'react';
import './App.css';
import { withAuthenticator, Heading, Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { API, graphqlOperation } from 'aws-amplify';


const listTodos = `
  query {
    listTodos {
      items {
        id name description completed
      }
    }
  }
`

function App({ signOut, user }) {

  const [todos, setTodos] = React.useState([])

  React.useEffect(() => {
    (async () => {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      setTodos(todoData?.data?.listTodos?.items);
    })()
  }, [])

  return (
    <div className="App">
      <Heading level={1}>Hello {user.username}</Heading>
      <Button onClick={signOut}>Sign out</Button>

      <div>
        {
          todos.map(todo => {
            return (
              <div key={todo.id}>
                <h3>{todo.name}</h3>
                <p>{todo.description}</p>

              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default withAuthenticator(App, {

});
