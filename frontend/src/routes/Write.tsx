import React, { useEffect, useRef, useState } from "react";
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

const Box = styled.section`
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
      /* display: none; */
    }
  }

  .second-row {
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
    padding: 15px;
  }
`;

const Title = styled.input`
  width: 100%;
  font-size: 20px;
  padding: 10px;
  outline: none;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
`;

const Content = styled.textarea`
  width: 100%;
  height: 500px;
  font-size: 20px;
  outline: none;
  border: none;
  overflow-y: auto;
  resize: none;
  padding-right: 10px;

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
  display: none;
  border-top: 2px solid #e3e3e3;
  padding-top: 15px;
  flex-wrap: wrap;
  gap: 10px;

  li {
    cursor: pointer;
    width: 100px;
    height: 100px;
    border: 1px solid #e3e3e3;

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
  const [fileArray, setFileArray] = useState<File[]>([]);
  const ulRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  function removeImage(event: Event) {
    if (window.confirm("삭제하시겠습니까?")) {
      const target = event.target as HTMLImageElement;
      const parentElement = target.parentElement as Element;
      const src = target.src as string;

      const current = inputRef.current as HTMLInputElement;
      const files = current.files as FileList;

      for (const i of Array.from(files)) {
        const reader = new FileReader();
        reader.readAsDataURL(i);
        reader.addEventListener("loadend", (event) => {
          const target = event.target as FileReader;
          const result = target.result as string;
        });
      }

      parentElement.remove();
    }
  }

  function onInput(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    for (const i of Array.from(files)) {
      const reader = new FileReader();
      reader.readAsDataURL(i);
      reader.addEventListener("loadend", (event) => {
        const target = event.target as FileReader;
        const result = target.result as string;

        const li = document.createElement("li");
        const img = document.createElement("img");
        img.setAttribute("src", result);
        img.setAttribute("class", "previewImage");
        img.onclick = (event) => removeImage(event);
        li.appendChild(img);

        const current = ulRef.current as HTMLUListElement;
        let style = current.style as CSSStyleDeclaration;
        current.appendChild(li);
        style.setProperty("display", "flex");
      });
    }
  }

  // useEffect(() => {
  //   const current = inputRef.current as HTMLInputElement;
  //   let files = current.files as FileList;

  //   const dt = new DataTransfer();

  //   // dt.items.add(fileArray[0]);
  //   console.log(fileArray);

  //   // console.log(files);
  //   // console.log(fileArray);
  // }, [fileArray]);

  return (
    <Form
      onSubmit={handleSubmit(onValid)}
      method="POST"
      encType="multipart/form-data"
    >
      <Box>
        <div className="first-row">
          <label htmlFor="photo">사진 첨부</label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            onInput={onInput}
            multiple
            ref={inputRef}
          />
          <Title placeholder="제목" spellCheck={false} />
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
          <Image ref={ulRef}></Image>
        </div>
      </Box>
      <Submit type="submit" value="등록하기" />
    </Form>
  );
}

export default Write;
