import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import qs from "qs";
import "./App.css";

function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    handleFetch({ _limit: 10 });
  }, []);

  function handleFetch(params) {
    const strParams = qs.stringify(params);
    let url = "https://jsonplaceholder.typicode.com/comments";

    if (strParams) {
      url = url + "/?" + strParams;
    }

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setComments(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="pane">
      <InfiniteScroll
        pageStart={0}
        loadMore={() => handleFetch({ _limit: comments.length + 10 })}
        hasMore={true || false}
        useWindow={false}
        loader={
          <div key="loading" className="loader">
            Loading ...
          </div>
        }
      >
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {comments.map((x) => (
              <tr key={x.id}>
                <td>{x.id}</td>
                <td>{x.name}</td>
                <td>{x.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
}

export default App;
