import { useEffect, useState } from "react";
import config from "../config";

const Home = () => {
  const [tales, setTales] = useState(0);
  const [genres, setGenres] = useState(0);
  const [authors, setAuthors] = useState(0);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    const fetchDbCount = async () => {
      const response = await fetch(config.apiUrl);
      const data = await response.json();

      setTales(data.tale_count);
      setGenres(data.genre_count);
      setAuthors(data.author_count);
      setUsers(data.user_count);
    };

    fetchDbCount();
  }, []);

  return (
    <div className="home">
      <h1>Home</h1>
      <p>Magandang Araw! Manage Pinoy Tales here.</p>

      <h2>Pinoy Tales has the following record counts:</h2>
      <ul>
        <li>{`Tale count: ${tales}`}</li>
        <li>{`Genre count: ${genres}`}</li>
        <li>{`Author count: ${authors}`}</li>
        <li>{`User count: ${users}`}</li>
      </ul>
    </div>
  );
};

export default Home;
