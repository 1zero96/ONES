import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../api/firebase";

export default function Signup() {
  // 이름, 이메일, 비밀번호, 비밀번호 확인 상태저장
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // 오류 메세지 상태저장
  const [nameMessage, setNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  // 유효성 검사 상태저장
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(email, password, name)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 유효성 검사하기!
  const onChangeName = useCallback((e) => {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNameMessage("2글자 이상 5글자 미만으로 입력해주세요.");
      setIsName(false);
    } else {
      setNameMessage("올바른 이름 형식 입니다.");
      setIsName(true);
    }
  }, []);

  const onChangeEmail = useCallback((e) => {
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);
    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식이 틀렸습니다! 다시 확인해주세요.");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 이메일 형식 입니다.");
      setIsEmail(true);
    }
  }, []);

  const onChangePassword = useCallback((e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("숫자, 영문자, 특수문자 조합으로 8자리 이상 입력해주세요!");
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호입니다 😊");
      setIsPassword(true);
    }
  }, []);

  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);
      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage("비밀번호가 일치합니다.");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호가 일치하지 않습니다! 다시 확인해주세요.");
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );

  return (
    <section className="w-full dark:bg-black dark:text-gray-600">
      <form className="flex flex-col h-screen w-full px-6 justify-center items-center text-center mx-auto" onSubmit={handleSubmit}>
        <h2 className="font-bold text-4xl text-lightGrey">CREATE ACCOUNT</h2>
        <div className="pt-8 w-full">
          <input
            type="text"
            className="px-4 py-2 rounded-md border-none w-full max-w-screen-xl bg-inputColor"
            placeholder="이름"
            value={name}
            onChange={onChangeName}
          />
          <p>{name.length > 0 && <span className={`${isName ? "success text-lightGrey" : "error text-red-400"}`}>{nameMessage}</span>}</p>
        </div>
        <div className="pt-4 w-full">
          <input
            type="email"
            className="px-4 py-2 rounded-md border-none w-full max-w-screen-xl bg-inputColor"
            placeholder="이메일"
            value={email}
            onChange={onChangeEmail}
          />
          <p>{email.length > 0 && <span className={`message ${isEmail ? "success text-lightGrey" : "error text-red-400"}`}>{emailMessage}</span>}</p>
        </div>
        <div className="pt-4 w-full">
          <input
            type="password"
            className="px-4 py-2 rounded-md border-none w-full max-w-screen-xl bg-inputColor"
            placeholder="비밀번호"
            value={password}
            onChange={onChangePassword}
          />
          <p>{password.length > 0 && <span className={`message ${isPassword ? "success text-lightGrey" : "error text-red-400"}`}>{passwordMessage}</span>}</p>
        </div>
        <div className="pt-4 w-full">
          <input
            type="password"
            className="px-4 py-2 rounded-md border-none w-full max-w-screen-xl bg-inputColor"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
          />
          <p>
            {passwordConfirm.length > 0 && (
              <span className={`message ${isPasswordConfirm ? "success text-lightGrey" : "error text-red-400"}`}>{passwordConfirmMessage}</span>
            )}
          </p>
        </div>
        <div className="pt-8 flex justify-center w-full">
          <button
            type="submit"
            className="px-4 py-3 rounded-lg w-3/4 bg-lightNavy text-white hover:brightness-110 disabled:opacity-75 disabled:bg-slate-300 disabled:hover:brightness-100"
            disabled={!(isName && isEmail && isPassword && isPasswordConfirm)}
          >
            Sign Up
          </button>
        </div>
        <div className="mt-3">
          <div className="flex">
            <div className="mr-2">Already have an account?</div>
            <Link to="/login">
              <div className="font-bold text-lightGrey">Log in</div>
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}
