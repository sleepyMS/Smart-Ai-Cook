import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Inboard = () => {
  const { num } = useParams();
  //const postList = dummy.boards.filter(board => board.id === id)
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .post(`http://localhost:8080/recipe/getByNum/${num}`, {})
          .then((response) => {
            console.log(response.data.data);
            setPosts(response.data.data);
          });
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      } finally {
      }
    };

    fetchData(); // fetchData 함수 호출
  }, []);

  return (
    <div>
      <h1 className="header_logo">
        <a href="/">
          <span>MOTIV</span>
        </a>
      </h1>
      <div>{posts.que}</div>
      <Link to={`/questionboard`}>
        <h2>게시판 이동</h2>
      </Link>
    </div>
  );
};

export default Inboard;
