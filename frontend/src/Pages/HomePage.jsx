import React from "react";
import { API_URL, AUTH_URL } from "../api";
import NewsList from "../components/NewsList";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CreateLink = styled(Link)``;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
`;
const PrimaryButton = styled.button`
  background-color: #ed0909;
  padding: 14px 18px;
  color: #fff;
  border-radius: 6px;
  border: none;
  margin-top: 10px;
  font-size: 18px;
  cursor: pointer;
`;

const SecondaryButton = styled.button`
  background-color: transparent;
  padding: 14px 18px;
  color: #ed0909;
  border-radius: 6px;
  border: 2px solid #ed0909;
  margin-top: 10px;
  font-size: 18px;
  cursor: pointer;
`;
const FormWrapper = styled.div`
  max-width: 400px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 20px;
  border-radius: 6px;
  border: 1px solid #cfcfcf;
  box-sizing: border-box;
`;

const HomePage = () => {
  const [newsData, setNewsData] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (!token) return;

    fetch(`${API_URL}/newsposts`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => setNewsData(data));
  }, [token]);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? "login" : "register";

    const body = isLogin
      ? {
          email: form.email,
          password: form.password,
        }
      : form;
    const response = await fetch(`${AUTH_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } else {
      alert(data.message);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setNewsData([]);
  };

  if (!token) {
    return (
      <FormWrapper>
        <h1>{isLogin ? "Login" : "Register"}</h1>

        <StyledInput
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <StyledInput
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <PrimaryButton onClick={handleSubmit}>
          {isLogin ? "Login" : "Register"}
        </PrimaryButton>

        <SecondaryButton onClick={() => setIsLogin(!isLogin)}>
          Switch to {isLogin ? "Register" : "Login"}
        </SecondaryButton>
      </FormWrapper>
    );
  }

  return (
    <div>
      <Wrapper>
        <h1>Latest News</h1>

        <div style={{ display: "flex", gap: "10px" }}>
          <CreateLink to={"/create-news"}>
            <PrimaryButton>Publish</PrimaryButton>
          </CreateLink>

          <SecondaryButton onClick={handleLogout}>Logout</SecondaryButton>
        </div>
      </Wrapper>

      <NewsList news={newsData} />
    </div>
  );
};

export default HomePage;
