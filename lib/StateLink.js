import { withClientState } from 'apollo-link-state'

const local = withClientState({
  Query: {
    // provide an initial state
    navState: () => [],
  },
  Mutation: {
    // update values in the store on mutations
    addTodo: (_, { message, title }, { cache }) => {
      const current = cache.readQuery({ query, variables })
      const data = {
        todos: current.todos.concat([
          { message, title, __typename: 'Todo' }
        ])
      }
      cache.writeQuery({ query, variables, data })
      return null
    }
  },
})


// use the local link to create an Apollo Client instance

// usage with query
const query = gql`
  query todos {
    todos @client {
      message
      title
    }
  }
`
const initial = await client.query({ query })
// { data: { todos: [] } }

const mutation = gql`
  mutation addTodo($message: String, $title: String){
    addTodo(message: $message, title: $title) @client
  }
`

// add a todo
client.mutate({
  mutation,
  variables: {
    title: 'hello world',
    message: 'oh what a world this is'
  }
})

const initial = await client.query({ query })
/*
{
  data: {
    todos: [
      { title: 'hello world', message: 'oh what a world this is' }
    ]
  }
}
*/
