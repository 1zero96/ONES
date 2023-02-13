import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../api/firebase";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import Button from "./ui/Button";

export default function Board() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async () => {
    const postsCollectionRef = collection(db, "posts");
    const data = await getDocs(query(postsCollectionRef, orderBy("createdAt", "desc")));
    setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <>
      <div className="w-screen max-w-5xl overflow-x-auto h-screen	flex justify-center flex-col px-5 mx-auto">
        <div className="text-center border-b border-gray-600 py-3">
          <p className="font-bold text-3xl">NOTICE</p>
          <span>공지사항 게시판 입니다.</span>
        </div>
        <table className="min-w-full divide-y-2 divide-gray-200 text-sm text-center">
          <thead>
            <tr>
              <th className="whitespace-nowrap w-3 px-1 py-2 font-semibold text-md text-gray-900 dark:text-white">번호</th>
              <th className="whitespace-nowrap w-30 px-1 py-2  font-semibold text-md text-gray-900 dark:text-white">게시글 제목</th>
              <th className="whitespace-nowrap w-1 px-1 py-2  font-semibold text-md text-gray-900 dark:text-white">작성자</th>
              <th className="whitespace-nowrap w-1 px-1 py-2 font-semibold text-md text-gray-900 dark:text-white">날짜</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-500">
            {posts.map((post, index) => (
              <tr key={post.id} className="odd:bg-gray-200 dark:odd:bg-gray-600">
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{posts.length - index}</td>
                <td
                  className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white cursor-pointer"
                  onClick={() => {
                    navigate(`/notice/${post.id}`, { state: { post } });
                  }}
                >
                  {post.title}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{post.write}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{post.createdAt.toDate().toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-3">
          <Link to="/write">
            <Button text="게시글작성" />
          </Link>
        </div>
      </div>
    </>
  );
}
