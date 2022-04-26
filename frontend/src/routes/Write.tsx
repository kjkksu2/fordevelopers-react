import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { write } from "../reactQuery/common";
import { corsUrl } from "../recoil/atom";

const Form = styled.form`
  width: 700px;
  margin: 150px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;

  .first-row {
    display: grid;
    grid-template-columns: 0.15fr 0.85fr;
    gap: 30px;
    margin-bottom: 30px;

    label {
      cursor: pointer;
      border-radius: 10px;
      background-color: ${(props) => props.theme.bgColors.lighter};
      color: white;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #photo {
      display: none;
    }
  }
`;

const Title = styled.input`
  width: 100%;
  font-size: 20px;
  padding: 10px;
  outline: none;
  border-radius: 10px;
`;

const Content = styled.textarea`
  width: 100%;
  height: 500px;
  font-size: 20px;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
  background-color: white;
  outline: none;
  border: none;
  overflow-y: auto;
  resize: none;

  &::-webkit-scrollbar {
    width: 13px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.scrollColors.lighter};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.scrollColors.main};

    &:hover {
      background-color: ${(props) => props.theme.scrollColors.darker};
    }
  }
`;

const Image = styled.ul`
  background-color: white;
  display: flex;

  li {
    width: 100px;
    height: 100px;

    .previewImage {
      width: 100%;
      height: 100%;
    }
  }
`;

const Submit = styled.input`
  width: 500px;
  padding: 10px;
  cursor: pointer;
`;

interface IWrite {
  title: string;
  content: string;
}

function Write() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IWrite>();
  const backendUrl = useRecoilValue(corsUrl);
  const { search: queryString } = useLocation<string>();
  const ulRef = useRef<HTMLUListElement>(null);

  async function onValid({ title, content }: IWrite) {
    const response = await fetch(
      `${backendUrl}/play/board/write${queryString}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      }
    );

    if (response.status === 200) {
      window.location.href = `/board${queryString}&page=1`;
    }
  }

  function onInput(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("loadend", (event) => {
      const target = event.target as FileReader;
      const result = target.result as string;

      const li = document.createElement("li");
      const img = document.createElement("img");
      img.src = result;
      img.className = "previewImage";
      li.appendChild(img);

      ulRef.current?.appendChild(li);
    });
  }

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Text>
        <div className="first-row">
          <label htmlFor="photo">사진 첨부</label>
          <input id="photo" type="file" accept="image/*" onInput={onInput} />
          <Title
            {...register("title", { required: "제목을 입력해주세요." })}
            placeholder="제목"
            spellCheck={false}
          />
          {/* <span>{errors.title?.message}</span> */}
        </div>
        <div className="second-row">
          <Content spellCheck={false} placeholder="내용을 입력하세요." />
          {/* <Content
            {...register("content", {
              minLength: { value: 10, message: "10자 이상 적어주세요." },
            })}
            placeholder="내용을 입력하세요."
            spellCheck={false}
            contentEditable={true}
          /> */}
          {/* <span>{errors.content?.message}</span> */}
        </div>
      </Text>
      <Image ref={ulRef}></Image>
      {/* second-row와 하나로 묶어야 함 */}
      <Submit type="submit" value="등록하기" />
    </Form>
  );
}

export default Write;
