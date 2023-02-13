import { Link, useLocation, useNavigate } from "react-router-dom";
import { postDelete } from "../api/firebase";
import Button from "../components/ui/Button";
import { useAuthContext } from "../context/AuthContext";

export default function NoticeDetail() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const {
    state: { post },
  } = useLocation();

  const HandleDelete = () => {
    postDelete(post.id);
    navigate("/notice");
  };
  return (
    <section className="w-screen dark:bg-black dark:text-white">
      <div className="p-10 w-full max-w-5xl h-screen mx-auto">
        <p className="text-2xl font-semibold  border-b border-gray-400">NOTICE</p>
        <div className="pt-5 pb-3">
          <h2 className="font-semibold">{post.title}</h2>
          <p>
            <span className='after:content-["ㅣ"] after:text-gray-400'>작성자 : {post.write}</span>
            <span>날짜 : {post.createdAt.toDate().toLocaleDateString()}</span>
          </p>
        </div>
        <div className="border-y border-gray-300 py-5 px-5" dangerouslySetInnerHTML={{ __html: post.content }}></div>

        <div className="flex justify-end py-3 px-5">
          {user && user.isAdmin && (
            <button
              onClick={() => {
                navigate(`/edit`, { state: { post } });
              }}
              className="bg-lightGrey text-white py-2 px-4 rounded-sm hover:brightness-110 text-xs"
            >
              수정
            </button>
          )}
          {user && user.isAdmin && (
            <button onClick={HandleDelete} className="bg-lightGrey text-white py-2 px-4 rounded-sm hover:brightness-110 text-xs mx-1">
              삭제
            </button>
          )}
          <Link to="/notice">
            <Button text="목록" />
          </Link>
        </div>
      </div>
    </section>
  );
}
