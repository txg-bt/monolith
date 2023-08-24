/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Button, Flex } from "rebass";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants";
import { FormLabel, Input } from "@mui/material";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");

  const isButtonDisabled = !password || !email || !username || !repeatPassword;

  async function Register() {
    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/users/register`, {
        email,
        password,
        username,
      });

      const { data } = response;

      localStorage.setItem("userToken", data.token);
      localStorage.setItem("username", data.username);

      navigate("/");
    } catch (error) {
      alert(error.response.data);
    }
  }

  return (
    <Flex
      height="100vh"
      width="100%"
      alignItems={"center"}
      paddingLeft="10%"
      backgroundColor={"purple"}
    >
      <Flex
        height="80%"
        width="600px"
        backgroundColor={"lightgrey"}
        padding="24px"
        flexDirection={"column"}
      >
        <Flex fontSize={"36px"} paddingBottom="16px">
          Register
        </Flex>

        <Flex width="100%" flexDirection={"column"} paddingTop={"32px"}>
          <FormLabel>Username</FormLabel>
          <Input
            onChange={({ target }) => setUsername(target.value)}
            type="text"
            value={username}
          ></Input>
        </Flex>

        <Flex width="100%" flexDirection={"column"} paddingTop={"32px"}>
          <FormLabel>Email</FormLabel>
          <Input
            onChange={({ target }) => setEmail(target.value)}
            type="email"
            value={email}
          ></Input>
        </Flex>
        <Flex width="100%" flexDirection={"column"} paddingTop={"32px"}>
          <FormLabel>Password</FormLabel>
          <Input
            onChange={({ target }) => setPassword(target.value)}
            type="password"
            value={password}
          ></Input>
        </Flex>
        <Flex
          width="100%"
          flexDirection={"column"}
          paddingTop={"32px"}
          marginBottom={"32px"}
        >
          <FormLabel>Repeat Password</FormLabel>
          <Input
            onChange={({ target }) => setRepeatPassword(target.value)}
            type="password"
            value={repeatPassword}
          ></Input>
        </Flex>

        <Flex paddingBottom={"16px"}>
          <Link to="/login">Already have an account? Login</Link>
        </Flex>

        <Button
          backgroundColor={isButtonDisabled ? "grey" : "blue"}
          color="white"
          padding="20px 24px"
          onClick={Register}
          disabled={isButtonDisabled}
        >
          Register
        </Button>
      </Flex>
    </Flex>
  );
}

Register.propTypes = {};

Register.defaultProps = {};

export default Register;
