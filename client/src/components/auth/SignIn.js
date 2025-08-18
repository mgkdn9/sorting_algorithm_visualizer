import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../LoadingOverlay";

import { signIn } from "../../api/auth";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const SignIn = (props) => {
  const container = {
    marginTop: "100px",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSignIn = (event) => {
    event.preventDefault();
    props.setLoading(true);
    setError("");
    const { setUser } = props;

    const credentials = { email, password };

    signIn(credentials)
      .then((res) => {
        setUser(res.data.user);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
      })
      .then(() => navigate("/"))
      .catch((error) => {
        // Check for backend error message
        if (error.response && error.response.status === 401) {
          setError("Invalid email or password");
        } else {
          setError("Something went wrong. Please try again.");
        }
        console.error("Sign-in failed:", error);
        setEmail("");
        setPassword("");
      })
      .finally(() => props.setLoading(false));
  };

  return (
    <div style={container} className="row">
      <LoadingOverlay
        visible={props.loading}
        text="Logging you in. This might take a minute..."
      />
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Sign In</h3>
        <Form onSubmit={onSignIn}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              name="password"
              value={password}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          {error && <Alert variant="danger">{error}</Alert>}
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
