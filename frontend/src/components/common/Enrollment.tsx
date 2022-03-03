import React, { useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { enrollment } from "../../reactQuery/common";

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
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const mutation = useMutation(enrollment);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // 응답까지 받는 방법
    const response = await mutation.mutateAsync({ title, content });

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
