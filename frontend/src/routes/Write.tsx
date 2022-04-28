import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
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
    gap: 20px;
    margin-bottom: 20px;

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

  .second-row {
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
    padding: 15px;
    margin-bottom: 20px;
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

const Options = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  button {
    padding: 10px 20px;
    border-radius: 10px;
    border: none;
    outline: none;
    cursor: pointer;
    margin-left: 10px;
    font-size: 20px;
    color: white;

    &[type="submit"] {
      background-color: ${(props) => props.theme.bgColors.main};
    }
    &[type="button"] {
      background-color: ${(props) => props.theme.scrollColors.darker};
    }
  }
`;

function Write() {
  const backendUrl = useRecoilValue(corsUrl);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { search: queryString } = useLocation<string>();
  const formRef = useRef<HTMLFormElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  let imageFileList: File[] = [];

  function removeImage(event: MouseEvent) {
    if (window.confirm("삭제하시겠습니까?")) {
      const clickedTarget = event.target as HTMLImageElement;
      const clickedImage = clickedTarget.parentElement as Element;

      const inputList = (event.composedPath()[2] as Element).children;
      const target = event.composedPath()[1];
      const targetIndex = Array.from(inputList).findIndex(
        (element) => element === target
      );

      const current = inputRef.current as HTMLInputElement;

      for (let i = 0; i < imageFileList.length; i++) {
        i === targetIndex && imageFileList.splice(i, 1);
      }

      const dt = new DataTransfer();
      imageFileList.forEach((element) => dt.items.add(element));
      current.files = dt.files;

      clickedImage.remove(); // remove를 먼저하면 inputList가 바뀐다.
    }
  }

  function onInput(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    const current = inputRef.current as HTMLInputElement;

    const dt = new DataTransfer();
    Array.from(files).forEach((element) => imageFileList.push(element));
    imageFileList.forEach((element) => dt.items.add(element));
    current.files = dt.files;

    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
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

  function changeTitle(event: React.FormEvent<HTMLInputElement>) {
    const {
      currentTarget: { value },
    } = event;

    setTitle(value);
  }
  function changeContent(event: React.FormEvent<HTMLTextAreaElement>) {
    const {
      currentTarget: { value },
    } = event;

    setContent(value);
  }

  function cancelButton() {
    window.location.href = `/board${queryString}&page=1`;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (title === "") return alert("제목을 적어주세요.");

    if (content === "") return alert("내용을 적어주세요.");

    formRef.current?.submit();
  }

  return (
    <Form
      onSubmit={onSubmit}
      action={`${backendUrl}/play/board/write${queryString}`}
      method="POST"
      encType="multipart/form-data"
      ref={formRef}
    >
      <Box>
        <div className="first-row">
          <label htmlFor="photo">사진 첨부</label>
          <input
            name="imageFile"
            id="photo"
            type="file"
            accept="image/*"
            onInput={onInput}
            multiple
            ref={inputRef}
          />
          <Title
            name="title"
            placeholder="제목"
            spellCheck={false}
            onChange={changeTitle}
            value={title}
          />
        </div>
        <div className="second-row">
          <Content
            name="content"
            spellCheck={false}
            placeholder="내용을 입력하세요."
            onChange={changeContent}
            value={content}
          />
          <Image ref={ulRef}></Image>
        </div>
      </Box>
      <Options>
        <button type="button" onClick={cancelButton}>
          취소
        </button>
        <button type="submit">등록</button>
      </Options>
    </Form>
  );
}

export default Write;