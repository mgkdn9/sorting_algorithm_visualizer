import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../LoadingOverlay";

import { signUp, signIn } from "../../api/auth";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const SignUp = (props) => {
  const container = {
    marginTop: "100px",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSignUp = (event) => {
    event.preventDefault();
    props.setLoading(true);
    setError("");

    const { setUser } = props;

    const credentials = { email, password, passwordConfirmation };

    signUp(credentials)
      .then(() => signIn(credentials))
      .then((res) => {
        setUser(res.data.user);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
      })
      .then(() => navigate("/"))
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          setError("Passwords must match and not be empty");
        } else {
          setError("Something went wrong. Please try again.");
        }
        console.error("Error signing up: ", error);
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
      })
      .finally(() => props.setLoading(false));
  };

  return (
    <div style={container} className="row">
      <LoadingOverlay
        visible={props.loading}
        text="Signing you up. This might take a minute..."
      />
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Sign Up</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={onSignUp}>
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
          <Form.Group controlId="passwordConfirmation">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              required
              name="passwordConfirmation"
              value={passwordConfirmation}
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
