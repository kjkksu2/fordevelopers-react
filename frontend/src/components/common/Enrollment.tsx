import { useForm } from "react-hook-form";
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

interface IEnrollment {
  title: string;
  content: string;
}

function Enrollment() {
  const mutation = useMutation(enrollment);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEnrollment>();

  async function onValid({ title, content }: IEnrollment) {
    const response = await mutation.mutateAsync({ title, content });

    if (response.status === 200) {
      window.location.href = "/devs";
    }
  }

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Title
        {...register("title", { required: "제목을 입력해주세요." })}
        placeholder="제목"
        spellCheck={false}
      />
      <span>{errors.title?.message}</span>

      <Content
        {...register("content", {
          minLength: { value: 10, message: "10자 이상 적어주세요." },
        })}
        placeholder="내용을 입력하세요."
        spellCheck={false}
      />
      <span>{errors.content?.message}</span>

      <Submit type="submit" value="등록하기" />
    </Form>
  );
}

export default Enrollment;
