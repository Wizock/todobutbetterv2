import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import token from "../tokenFetcher";
const axios = require("axios");

function GetUser() {
  const [userid, setUserid] = useState(0);
  const [username, setUsername] = useState(0);
  const [email, setEmail] = useState(0);
  const history = useHistory();

  axios({
    method: "GET",
    url: "/auth/get_user",
    mode: "cors",
    cache: "force-cache",
    credentials: "same-origin",
    "Access-Control-Allow-Origin": "*",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    setUserid(JSON.stringify(response.data.id));
    setUsername(JSON.stringify(response.data.username));
    setEmail(JSON.stringify(response.data.email));
  });
  return (
    <div>
      {token && token !== "" && token !== undefined ? (
        <div>
          <h1>user's id {userid}</h1>
          <h1>users username {username}</h1>
          <h1>users email {email}</h1>
        </div>
      ) : (
        history.push("/login")
      )}
    </div>
  );
}

export default GetUser;
