import React from "react";
import ReactDOM from "react-dom";
import { gql, useMutation, useQuery } from "@apollo/client";

import withApollo from "./apollo";

const GREETINGS = gql`
  query GREETINGS {
    greetings
  }
`;

const ADD_GREETING = gql`
  mutation ADD_GREETING($greeting: String!) {
    addGreeting(greeting: $greeting)
  }
`;

const CLEAR_GREETINGS = gql`
  mutation CLEAR_GREETINGS {
    clearGreetings
  }
`;

const ListGreetings = () => {
  const { data, error, loading } = useQuery(GREETINGS);

  if (error) return <p>Oh, no! An error... {error.message}</p>;
  if (loading) return <p>Please wait for the greetings...</p>;
  return (
    <ol style={{ color: "blue" }}>
      {data.greetings.map((greeting, idx) => (
        <li key={idx}>{greeting}</li>
      ))}
    </ol>
  );
};

const LatestGreeting = () => {
  const { data, error, loading } = useQuery(GREETINGS);

  if (error) return <p> Oh, no! An error... {error.message}</p>;
  if (loading) return <p>Please wait for the greeting...</p>;
  return <div style={{ color: "green" }}>{data.greetings.slice(-1)}</div>;
};

const AddGreeting = () => {
  const [greeting, setGreeting] = React.useState("");
  const [addGreeting, { error, loading }] = useMutation(ADD_GREETING, {
    refetchQueries: [{ query: GREETINGS }]
  });

  if (error) return <p>Oh, no! An error... {error.message}</p>;
  if (loading) return <p>Adding your greeting...</p>;
  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        const data = await addGreeting({ variables: { greeting } });
        console.log(data);
        setGreeting("");
      }}
    >
      <input
        name="greeting"
        value={greeting}
        onChange={e => setGreeting(e.target.value)}
      />
      <button type="submit">add greeting</button>
    </form>
  );
};

const ClearGreetings = () => {
  const [clearGreetings, { error, loading }] = useMutation(CLEAR_GREETINGS, {
    refetchQueries: [{ query: GREETINGS }]
  });

  if (error) return <p>Oh, no! An error... {error.message}</p>;
  if (loading) return <p>Clearing greetings...</p>;
  return (
    <button
      onClick={async e => {
        e.preventDefault();
        const data = await clearGreetings({
          refetchQueries: [{ query: GREETINGS }]
        });
        console.log(data);
      }}
    >
      Clear greetings
    </button>
  );
};

const App = withApollo(
  <div id="app">
    <AddGreeting />
    <ClearGreetings />
    <LatestGreeting />
    <ListGreetings />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
