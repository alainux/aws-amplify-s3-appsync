import React from 'react';
import './App.css';
import { withAuthenticator, Heading, Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { API, graphqlOperation, Storage } from 'aws-amplify';


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
  const [fileData, setFileData] = React.useState({
    fileUrl: '',
    file: '',
    filename: ''
  })

  React.useEffect(() => {
    (async () => {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      setTodos(todoData?.data?.listTodos?.items ?? []);


      const data = await API.get('peopleapi', '/people');
      setPeople(data?.people ?? []);
    })()
  }, [])

  const handleChange = e => {
    const file = e.target.files[0];
    setFileData({
      fileUrl: URL.createObjectURL(file),
      file,
      filename: file.name
    })
  }

  const saveFile = () => [
    Storage.put(fileData.filename, fileData.file).then(() => {
      console.log('Successfully saved file');
      setFileData({});
    }).catch(err => {
      console.log('Error uploading file', err);
    })
  ]

  return (
    <div className="App">
      <Heading level={1}>Hello {user.username}</Heading>
      <Button onClick={signOut}>Sign out</Button>
      <input type='file' onChange={handleChange} />
      {fileData?.fileUrl && <img src={fileData.fileUrl} alt='file ' />}
      <button onClick={saveFile}>Save file</button>
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
