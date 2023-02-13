import React, { useState } from "react";
import { signIn, resetPassword } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthContext();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    signIn(email, password);
  };

  const handlePassword = async () => {
    const { value: getName } = await Swal.fire({
      title: "비밀번호 찾기",
      text: "가입한 이메일 주소를 입력하세요",
      input: "text",
      inputPlaceholder: "이메일 주소 입력..",
    });
    // 이후 처리되는 내용.
    if (getName) {
      resetPassword(getName);
    } else {
      Swal.fire("", "이메일을 입력해주세요!", "warning");
    }
  };
  return (
    <section className="w-full dark:bg-black dark:text-white">
      <form className="flex flex-col h-screen w-full px-6 justify-center items-center text-center max-w-screen-xl mx-auto" onSubmit={onSubmit}>
        <h2 className="font-bold text-4xl text-lightGrey">LOGIN</h2>
        <div className="pt-4 w-full">
          <input
            name="email"
            type="email"
            className="px-4 py-2 rounded-md border-none w-full max-w-screen-xl bg-inputColor"
            placeholder="Email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="pt-4 w-full">
          <input
            name="password"
            type="password"
            className="px-4 py-2 rounded-md border-none w-full max-w-screen-xl bg-inputColor"
            placeholder="Password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className="mt-2 flex w-full pr-5">
          <div className="text-sm font-semibold ml-auto text-lightGrey">
            <button type="button" onClick={handlePassword}>
              forgot password?
            </button>
          </div>
        </div>
        <div className="pt-8 flex justify-center w-full">
          <button type="submit" className="px-4 py-3 rounded-lg w-3/4 bg-lightNavy text-white">
            Log in
          </button>
        </div>
        <div className="mt-4">
          <div className="flex">
            <div className="mr-2">Don't have an account yet?</div>
            <div className="font-bold text-lightGrey">
              <Link to="/signup">Register</Link>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex">
            <button className="pr-2" onClick={login}>
              <FcGoogle size="30" />
            </button>
            <button className="pl-2">
              <MdFacebook size="30" />
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
