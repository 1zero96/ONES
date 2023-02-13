import React, { useState, useRef, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { postUpdate } from "../api/firebase";
import QuillEditor from "./QuillEditor";
import Button from "./ui/Button";
import { useAuthContext } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function BoardWrite() {
  const {
    state: { post },
  } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const quillRef = useRef(); //

  const handleSubmit = async () => {
    const description = quillRef.current.getEditor().getText();
    if (description.trim() === "") {
      alert("내용을 입력해주세요.");
      return;
    }
    if (post) {
      await postUpdate(post.id, user.displayName, title, htmlContent);
      navigate(`/notice/${post.id}`, { state: { post: { content: htmlContent, createdAt: post.createdAt, title: title, write: user.displayName } } });
    } else {
      await postUpdate(post.id, user.displayName, title, htmlContent);
    }
  };

  useEffect(() => {
    if (!post) {
      return;
    }
    setTitle(post.title);
    setHtmlContent(post.content);
  }, [post]);

  return (
    <div className="max-w-7xl">
      <p className="pb-3 pt-5 text-2xl font-medium text-lightNavy p-10">BOARD WRITE</p>
      <div className="px-10">
        <input className="w-full" type="text" placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <QuillEditor quillRef={quillRef} htmlContent={htmlContent} setHtmlContent={setHtmlContent} />
      <div className="flex justify-end w-full px-10 ">
        <div className="mr-1">
          <Button text={"작성하기"} onClick={handleSubmit} />
        </div>
        <div>
          <Link to="/notice">
            <Button text={"취소"} />
          </Link>
        </div>
      </div>
    </div>
  );
}
