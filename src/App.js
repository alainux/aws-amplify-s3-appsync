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
  const [people, setPeople] = React.useState([])

  React.useEffect(() => {
    (async () => {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      setTodos(todoData?.data?.listTodos?.items);


      const data = await API.get('peopleapi', '/people');
      setPeople(data.people);
    })()
  }, [])

  return (
    <div className="App">
      <Heading level={1}>Hello {user.username}</Heading>
      <Button onClick={signOut}>Sign out</Button>

      <div>
        {
          people.map((person, i) => {
            return (
              <div key={i}>
                <h3>{person.name}</h3>
                <p>{person.hair_color}</p>

              </div>
            )
          })
        }
      </div>


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
