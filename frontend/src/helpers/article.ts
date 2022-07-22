import { IPagination } from "../recoil/common";

interface IGetUrl {
  backendUrl: string;
  keyword: string;
  category: string;
  currentPage: number;
}

export const getUrl = (url: IGetUrl) => {
  const { backendUrl, keyword, category, currentPage } = url;

  if (keyword !== "undefined") {
    return `${backendUrl}/play/board/search?keyword=${keyword}&category=${category}&page=${currentPage}`;
  }

  return `${backendUrl}/play/board?category=${category}&page=${currentPage}`;
};

export const regexUrl = (search: string, type: string) => {
  let regex = null;

  switch (type) {
    case "keyword":
      return search.split("keyword=")[1]?.split("&category")[0];
    case "page":
      regex = /page=[0-9]+/g;
      return search.match(regex)?.join("").split("=")[1];
    case "category":
      regex = /category=[a-z]+/g;
      return search.match(regex)?.join("").split("=")[1];
    case "id":
      regex = /id=[0-9a-f]{24}/g;
      return search.match(regex)?.join("").split("=")[1];
  }
};

export const initializedButtons = (data: IPagination) => {
  const paginatedButtons: number[] = [];
  const { articlesPerPage, maxShownButtons, numberOfArticles, currentPage } =
    data;

  let multiple = 0;
  while (maxShownButtons * multiple < currentPage) {
    multiple++;
  }

  const totalBtn = Math.ceil(numberOfArticles / articlesPerPage);
  const startBtn = 1 + maxShownButtons * (multiple - 1);
  const endBtn =
    totalBtn < startBtn + maxShownButtons - 1
      ? totalBtn
      : startBtn + maxShownButtons - 1;

  for (let i = startBtn; i <= endBtn; i++) {
    paginatedButtons.push(i);
  }

  return { totalBtn, startBtn, endBtn, paginatedButtons };
};

interface IRemoveImages {
  event: MouseEvent;
  inputRef: React.RefObject<HTMLInputElement>;
  files: File[];
}

export const removeImage = (data: IRemoveImages) => {
  const { event, inputRef, files } = data;

  if (window.confirm("삭제하시겠습니까?")) {
    const clickedTarget = event.target as HTMLImageElement;
    const clickedImage = clickedTarget.parentElement as Element;

    const inputList = (event.composedPath()[2] as Element).children;
    const target = event.composedPath()[1];
    const targetIndex = Array.from(inputList).findIndex(
      (element) => element === target
    );

    const inputCurrent = inputRef.current as HTMLInputElement;

    for (let i = 0; i < files.length; i++) {
      if (i === targetIndex) {
        files.splice(i, 1);
        break;
      }
    }

    const dt = new DataTransfer();
    files.forEach((element) => dt.items.add(element));
    inputCurrent.files = dt.files;

    clickedImage.remove(); // remove를 먼저하면 inputList가 바뀐다.
  }
};

interface IUseImages {
  event: React.FormEvent<HTMLInputElement>;
  ulRef: React.RefObject<HTMLUListElement>;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const putImages = (data: IUseImages) => {
  const { event, ulRef, inputRef } = data;
  const target = event.target as HTMLInputElement;
  const files = Array.from(target.files as FileList);

  for (const a of files) {
    const reader = new FileReader();
    reader.readAsDataURL(a);
    reader.addEventListener("loadend", (event) => {
      const target = event.target as FileReader;
      const result = target.result as string;

      const li = document.createElement("li");
      const img = document.createElement("img");
      img.setAttribute("src", result);
      img.setAttribute("class", "previewImage");
      img.onclick = (event) => removeImage({ event, inputRef, files });
      li.appendChild(img);

      const ulCurrent = ulRef.current as HTMLUListElement;
      ulCurrent.appendChild(li);
    });
  }
};

interface IEraseImage {
  event: React.MouseEvent<HTMLLIElement>;
  setErasedImage: React.Dispatch<React.SetStateAction<string[]>>;
}

export const eraseImage = (data: IEraseImage) => {
  const { event, setErasedImage } = data;

  if (window.confirm("삭제하시겠습니까?")) {
    const clickedTarget = event.target as HTMLImageElement;
    const clickedImage = clickedTarget.parentElement as Element;
    const children = clickedImage.children[0] as HTMLImageElement;
    const currentSrc = children.currentSrc;

    setErasedImage((prev) => [...prev, currentSrc.split("images/")[1]]);

    clickedImage.remove();
  }
};
