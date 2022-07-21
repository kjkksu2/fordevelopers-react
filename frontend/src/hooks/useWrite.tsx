import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { regexUrl } from "../helpers/functions";
import { corsUrl } from "../recoil/common";

interface IWrite {
  title: string;
  content: string;
  erasedImage: string[];
  formRef: React.RefObject<HTMLFormElement>;
}

const useWrite = (data: IWrite) => {
  const { title, content, erasedImage, formRef } = data;
  const { pathname, search } = useLocation<string>();
  const backendUrl = useRecoilValue<string>(corsUrl);

  const category = regexUrl(search, "category");
  const id = regexUrl(search, "id");

  return async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title === "") return alert("제목을 적어주세요.");

    if (content === "") return alert("내용을 적어주세요.");

    if (pathname.includes("update")) {
      await fetch(
        `${backendUrl}/api/board/image/delete?category=${category}&id=${id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ erasedImage }),
        }
      );
    }

    formRef.current?.submit();
  };
};

export default useWrite;
