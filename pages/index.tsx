import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import tw from "twin.macro";
import InputComp from "../components/Input";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const Wrapper = tw.div`p-4 mx-auto max-w-lg flex flex-col items-center justify-center bg-gray-200 my-auto`;
const H1 = tw.h1`text-4xl font-bold my-10`;
const Form = tw.form`flex flex-col space-y-2 py-4`;
const FormBtn = tw.button` w-1/2 flex justify-center text-xl font-bold py-2  rounded-md bg-blue-400`;
const ErrorMsg = tw.p`text-red-500 text-xl flex justify-center`;
const SuccessMsg = tw.p`text-green-500 text-xl flex justify-center border-2 border-gray-600 p-2 rounded-lg shadow-md`;

const isEmpty = (obj: object) => Object.keys(obj).length === 0;

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormInputs>();
  const [isSubmit, setIsSubmit] = useState(false);

  const onSubmit = (data: FormInputs) => !isEmpty(data) && setIsSubmit(true);
  const onSuccessClick = () => setIsSubmit(false);
  const { email, name, password } = errors;

  useEffect(() => {
    isSubmitSuccessful && reset({ name: "", email: "", password: "" });

    return () => {
      reset();
    };
  }, [reset, isSubmitSuccessful]);
  return (
    <Wrapper>
      <H1>Form Validation</H1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputComp
          id='name'
          type='text'
          register={register("name", {
            required: "Please Write down your name",
          })}
        />
        <ErrorMsg>{name ? name.message : null}</ErrorMsg>
        <InputComp
          id='email'
          type='email'
          register={register("email", {
            required: "Please Write down your email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@naver\.com$/i,
              message: "Only naver.com email is allowed",
            },
          })}
        />
        <ErrorMsg>{email ? email.message : null}</ErrorMsg>
        <InputComp
          id='password'
          type='password'
          register={register("password", {
            required: "Please Write down password",
            minLength: {
              value: 10,
              message: "Password has to be more than 10 chars.",
            },
          })}
        />
        <ErrorMsg>{password ? password.message : null}</ErrorMsg>
        <FormBtn type='submit'>Log In</FormBtn>
      </Form>
      {isSubmit ? (
        <SuccessMsg onClick={onSuccessClick}>Thank you</SuccessMsg>
      ) : null}
    </Wrapper>
  );
};

export default Home;
