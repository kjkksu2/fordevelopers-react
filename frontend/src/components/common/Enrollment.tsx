import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { corsUrl } from "../../recoil/atom";

const Form = styled.form`
  width: 100%;
  margin: 150px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.input`
  width: 500px;
  font-size: 20px;
  padding: 10px;
`;

const Content = styled.textarea`
  width: 500px;
  height: 600px;
  font-size: 20px;
  padding: 10px;
  resize: none;
`;

const Submit = styled.input`
  width: 500px;
  padding: 10px;
  cursor: pointer;
`;

function Enrollment() {
  const backendUrl = useRecoilValue(corsUrl);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch(`${backendUrl}/menus/devs/enrollment`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.status === 200) {
      window.location.href = "/devs";
    }
  }

  function handleTitle(event: React.FormEvent<HTMLInputElement>) {
    const {
      currentTarget: { value },
    } = event;

    setTitle(value);
  }

  function handleContent(event: React.FormEvent<HTMLTextAreaElement>) {
    const {
      currentTarget: { value },
    } = event;

    setContent(value);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Title onInput={handleTitle} placeholder="제목을 입력하세요." />
      <Content onInput={handleContent} placeholder="내용을 입력하세요." />
      <Submit type="submit" value="등록하기" />
    </Form>
  );
}

export default Enrollment;
