import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { putImages, regexUrl } from "../helpers/functions";
import usePost from "../hooks/usePost";
import useWrite from "../hooks/useWrite";
import { article, IArticle } from "../recoil/article";
import { corsUrl } from "../recoil/common";

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
  display: flex;
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

const Write = () => {
  const backendUrl = useRecoilValue<string>(corsUrl);
  const [post, _] = useRecoilState<IArticle>(article);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { pathname, search: queryString } = useLocation<string>();

  const formRef = useRef<HTMLFormElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const liRef = useRef<HTMLLIElement>(null);

  const [erasedImage, setErasedImage] = useState<string[]>([]);

  const category = String(regexUrl(queryString, "category"));
  const id = String(regexUrl(queryString, "id"));

  usePost({ category, id, setTitle, setContent });

  const changeTitle = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setTitle(value);
  };
  const changeContent = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setContent(value);
  };
  const cancelButton = () => {
    window.location.href = `/board${queryString}&page=1`;
  };

  const onWriteSubmit = useWrite({ title, content, erasedImage, formRef }); // 일반 함수로 바꾸기

  const clickedBackendImage = (event: React.MouseEvent<HTMLLIElement>) => {
    if (window.confirm("삭제하시겠습니까?")) {
      const clickedTarget = event.target as HTMLImageElement;
      const clickedImage = clickedTarget.parentElement as Element;
      const children = clickedImage.children[0] as HTMLImageElement;
      const currentSrc = children.currentSrc;

      setErasedImage((prev) => [...prev, currentSrc.split("images/")[1]]);

      clickedImage.remove();
    }
  };

  return (
    <Form
      onSubmit={onWriteSubmit} // 여기서 write, update에 따라 불러오는 함수가 달라지도록
      action={`${backendUrl}/play${pathname + queryString}`}
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
            onInput={(event) => putImages({ event, ulRef, inputRef })}
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
          <Image ref={ulRef}>
            {post.images?.map((element, idx) => (
              <li key={idx} ref={liRef} onClick={clickedBackendImage}>
                <img
                  src={backendUrl + element}
                  className="previewImage"
                  alt="previewImage"
                />
              </li>
            ))}
          </Image>
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
};

export default Write;
