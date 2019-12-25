import React from "react";
import ReactDOM from "react-dom";
import { gql, useMutation, useQuery } from "@apollo/client";

import withApollo from "./apollo";

const ITEMS = gql`
  query ITEMS {
    items
  }
`;

const PUSH_ITEM = gql`
  mutation PUSH_ITEM($item: String!) {
    pushItem(item: $item)
  }
`;

const POP_ITEM = gql`
  mutation POP_ITEM {
    popItem
  }
`;

const ListItems = () => {
  const { data, error, loading } = useQuery(ITEMS);

  if (error) return <p>Oh, no! An error... {error.message}</p>;
  if (loading) return <p>Please wait for the items...</p>;
  return (
    <ol style={{ color: "blue" }}>
      {data.items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ol>
  );
};

const LatestItem = () => {
  const { data, error, loading } = useQuery(ITEMS);

  if (error) return <p> Oh, no! An error... {error.message}</p>;
  if (loading) return <p>Please wait for the item...</p>;
  return <div style={{ color: "green" }}>{data.items.slice(-1)}</div>;
};

const AddItem = () => {
  const [item, setItem] = React.useState("");
  const [addItem, { error, loading }] = useMutation(PUSH_ITEM, {
    refetchQueries: [{ query: ITEMS }]
  });

  if (error) return <p>Oh, no! An error... {error.message}</p>;
  if (loading) return <p>Adding your item...</p>;
  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        const data = await addItem({ variables: { item } });
        console.log(data);
        setItem("");
      }}
    >
      <input name="item" value={item} onChange={e => setItem(e.target.value)} />
      <button type="submit">add item</button>
    </form>
  );
};

const ClearItems = () => {
  const [clearItems, { error, loading }] = useMutation(POP_ITEM);

  if (error) return <p>Oh, no! An error... {error.message}</p>;
  if (loading) return <p>Clearing items...</p>;
  return (
    <button
      onClick={async e => {
        e.preventDefault();
        const data = await clearItems({ refetchQueries: [{ query: ITEMS }] });
        console.log(data);
      }}
    >
      Clear items
    </button>
  );
};

const App = withApollo(
  <div id="app">
    <AddItem />
    <ClearItems />
    <LatestItem />
    <ListItems />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
