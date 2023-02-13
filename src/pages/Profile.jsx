import React, { useEffect, useState } from "react";
import { uploadImage } from "../api/uploader";
import { pwUpdate, userProfile, userUpdate } from "../api/firebase";
import Swal from "sweetalert2";

export default function Profile() {
  useEffect(() => {
    userProfile();
    setEmail(localStorage.getItem("email"));
    setPhoto(localStorage.getItem("photo"));
    setName(localStorage.getItem("name"));
  }, []);

  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file !== undefined) {
      uploadImage(file)
        .then((url) => {
          userUpdate(name, url);
          setPhoto(url);
          localStorage.setItem("name", name);
          localStorage.setItem("photo", url);
          localStorage.setItem("email", email);
        })
        .finally(() => {
          Swal.fire("프로필 업데이트 완료", "", "success") //
            .then((res) => window.location.reload());
        });
    } else {
      userUpdate(name, photo);
      pwUpdate(password);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      Swal.fire("프로필 업데이트 완료", "", "success") //
        .then((res) => window.location.reload());
    }
  };

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      console.log(file);
    }
  };
  return (
    <section className="w-full px-2 py-48 sm:px-0  max-w-3xl">
      <h2 className="text-xl font-bold text-lightNavy text-start w-full pb-2 mb-10 border-lightGrey border-b">Profile EDIT</h2>
      <div className="relative flex flex-col bg-dm-light text-dm rounded-lg overflow-hidden shadow-md">
        <div className="content flex flex-col sm:flex-row">
          <div className="image-container flex flex-col items-center p-8">
            <div className="image-button flex flex-col justify-center items-center w-min cursor-pointer hover:text-gray-500">
              <div className="avatar relative h-28 w-28 sm:h-40 sm:w-40 rounded-full overflow-hidden shadow-medium ring-gray-400 ring-1 ">
                <div className="w-full h-full overflow-hidden rounded-full shadow-2xl bg-gradient-to-b from-gray-500 to-gray-600 p-px">
                  <div className="avatar overflow-hidden rounded-full bg-gray-700 w-full h-full">
                    <div className="flex items-end justify-center w-full h-full">
                      {file && <img className=" fill-gray-300 m-auto" src={URL.createObjectURL(file)} alt="profile" />}
                      {!file && <img className=" fill-gray-300  m-auto" src={photo} alt="profile" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <label htmlFor="update-image" className="uppercase text-center pt-2 whitespace-nowrap hover:text-red-400 cursor-pointer">
              사진 업데이트
            </label>
          </div>
          <form id="user-details" className="info-container w-full p-6" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row justify-between w-full">
              <div className="flex flex-col flex-1 sm:mr-2 justify-center items-start mb-8 sm:mb-0">
                <label htmlFor="name" className="mb-1">
                  이름
                </label>
                <input
                  type="text"
                  className="px-2 w-full border-b text-black rounded"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col flex-1 justify-center items-start w-full mb-8 sm:mb-0">
                <label htmlFor="password" className="mb-1">
                  비밀번호
                </label>
                <input
                  type="password"
                  className="px-2 w-full appearance-none border-b text-black rounded"
                  id="password"
                  value={password}
                  autoComplete="currentPassword"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col flex-1 justify-center items-start w-full mt-0 sm:mt-8">
              <label htmlFor="email" className="mb-1">
                이메일
              </label>
              <input
                type="email"
                className="px-2 w-full focus:outline-none active:outline-none border-b bg-gray-300 text-black border-gray-400 rounded"
                id="email"
                readOnly
                value={email}
              />
            </div>
            <input type="file" name="file" className="hidden" id="update-image" accept="image/*" onChange={handleChange} />
          </form>
        </div>
        <div className="flex flex-row justify-end bg-dm-dark px-6 py-4">
          <button type="submit" className="bg-lightNavy text-white py-2 px-4 rounded-sm hover:brightness-110 text-xse capitalize" form="user-details">
            변경사항 저장
          </button>
        </div>
      </div>
    </section>
  );
}
