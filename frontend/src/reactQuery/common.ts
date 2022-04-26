// Enrollment
interface IPost {
  title: string;
  content: string;
}

export function write({ title, content }: IPost) {
  return fetch("http://localhost:4000/board/write", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });
}

// PostComment
interface IComment {
  postId?: string;
  input: string;
}

export function comment({ postId, input }: IComment) {
  return fetch(`http://localhost:4000/menus/devs/post/${postId}/comment`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input }),
  });
}

// CommentLists
export function getCommentLists(postId?: string) {
  return fetch(`http://localhost:4000/menus/devs/post/${postId}/commentLists`, {
    credentials: "include",
  }).then(async (response) => ({
    status: response.status,
    commentLists: (await response.json()) || null,
  }));
}
