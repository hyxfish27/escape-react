import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"; // 到單一頁面

// 定義 Article function 後，做預設匯出
function Article(){
    // useState 會回傳一個包含兩個值的 array，
    // 第一個值是 state、第二個值是用來更新 state 的函式。每當 state 值改變，就會觸發 re-render
    // 觸發 setArticles，就會更新 articles
    const [articles, setArticles] = useState([]);
    
    // axios 取得文章
    const getArticles = () => {
        const url = `${process.env.REACT_APP_URL}api/react/articles`
        axios
        .get(url)
        .then((response) => {
            setArticles(response.data.articles)
        })
        .catch((error) => {
            alert(error.response.data.message)
        })
    }
    // useEffect 有兩個參數，第一個參數是 Effect function，
    // 第二個則是 depandancy array。 
    // 根據不同 depandancy 決定何時要執行 Effect function，
    // depandancy array 為空則執行一次
    useEffect(() => {
      getArticles();
    }, [])
    // return() 裡面放 html 結構
    return(
        <div className="container">
      <div className="card">
        <div className="card-header bg-white">
          <h5 className="">產品列表</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-nowrap">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">文章名稱</th>
                <th scope="col">描述</th>
                <th scope="col">內容</th>
                <th scope="col">作者</th>
                <th scope="col">標籤</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>

              {
                articles.map((article, index) => {
                  return <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{article.title}</td>
                    <td>{article.description}</td>
                    <td>{article.content}</td>
                    <td>{article.author}</td>
                    <td>
                        <span className="text-white bg-info p-1 rounded-pill" >{article.tag}</span>
                    </td>
                    <td>
                      <Link to={article.id} className="btn btn-sm btn-neutral">查看</Link>
                    </td>
                  </tr>
                })
              }

            </tbody>
          </table>
        </div>
        <div className="card-footer bg-white py-3 text-end">
          <span className="text-muted text-sm ">總共{articles.length}筆資料</span>
        </div>
      </div>
    </div>
    )
}

export default Article;