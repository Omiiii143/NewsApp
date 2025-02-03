import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./app.css"
const API_URL = "https://newsapi.org/v2/top-headlines?country=us&apiKey=cff8ee4d8ace410ea4563991df5aa5d8";
console.log(API_URL)

const sampleNews = [
  {
    title: "Breaking News: Market Hits Record Highs",
    description: "The stock market has reached an all-time high as investors celebrate strong economic data.",
    url: "https://example.com/market-highs",
    urlToImage: "https://www.hindustantimes.com/ht-img/img/2024/08/30/550x309/FIRSTCRY-INDIA-IPO-0_1716452785301_1724991024987.JPG"
  },
 
];

const Home = ({ markAsRead, readArticles }) => {
  const [articles, setArticles] = useState(sampleNews);
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) =>{setArticles([...sampleNews, ...data.articles])
         console.log(data)})
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  return (
    <div className="cards">
      <h1>Latest News</h1>
      {articles.map((article, index) => (
        <div key={index} className={readArticles.includes(article.title) ? "card read" : "card"}>
          
          <div className="image"><img src={article.urlToImage} alt={article.title} /></div> 
          <div className="newsDetails">
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
            <button onClick={() => markAsRead(article.title)}>Mark as Read</button>
          </div>
         
        </div>
      ))}
    </div>
  );
};

const History = ({ readArticles }) => (
  <div>
    <h1>Reading History</h1>
    {readArticles.length > 0 ? (
      <ul>
        {readArticles.map((title, index) => (
          <li key={index}>{title} </li>
        ))}
      </ul>
    ) : (
      <p>No articles read yet.</p>
    )}
  </div>
);

const App = () => {
  const [readArticles, setReadArticles] = useState(() => {
    return JSON.parse(localStorage.getItem("readArticles")) || [];
  });

  useEffect(() => {
    localStorage.setItem("readArticles", JSON.stringify(readArticles));
  }, [readArticles]);

  const markAsRead = (title) => {
    if (!readArticles.includes(title)) {
      setReadArticles([...readArticles, title]);
    }
  };

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/history">Reading History</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home markAsRead={markAsRead} readArticles={readArticles} />} />
        <Route path="/history" element={<History readArticles={readArticles} />} />
      </Routes>
    </Router>
  );
};

export default App;
