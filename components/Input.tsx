import { NextPage } from "next";
import { UseFormRegisterReturn } from "react-hook-form/dist/types";
import tw from "twin.macro";

type InputProps = {
  type: string;
  id: string;
  register: UseFormRegisterReturn;
};

const Wrapper = tw.div`
	flex space-x-2 justify-end p-2 text-2xl
`;
const Input = tw.input`
	px-2 max-w-min
`;
const Label = tw.label`
	text-lg font-bold
`;
const changeCharFromString =
  (str: string, index: number) => (changeChar: (char: string) => string) => {
    const arr = str.split("");
    arr[index] = changeChar(arr[index]);
    return arr.join("");
  };
const InputComp = ({ type, id, register }: InputProps) => {
  const { name } = register;
  const changeFirstChar = changeCharFromString(name, 0);
  return (
    <Wrapper>
      <Label htmlFor={id}>
        {changeFirstChar((char: string) => char.toUpperCase())}:
      </Label>
      <Input {...{ type, id, ...register }} />
    </Wrapper>
  );
};

export default InputComp;
