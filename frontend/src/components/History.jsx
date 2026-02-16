import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";

const History = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getHistory() {
      try {
        const response = await fetch(
          "process.env.REACT_APP_BASE_API_URL/history",

          {
            method: "GET",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();

        if (response.ok) {
          setHistory(result.data);
        } else {
          throw Error("Unable to fetch history");
        }
      } catch (err) {
        setError(err.message);
      }
    }

    getHistory();
  }, []);

  return (
    <div>
      <ul>
        {history.map((data) => (
          <li key={data._id} className="history-list">
            {data.arithmeticFunction} = {data.result}
          </li>
        ))}
      </ul>
      {error && (
        <Alert severity="error" onClick={() => setError(null)}>
          {error}
        </Alert>
      )}
    </div>
  );
};

export default History;
