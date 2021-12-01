import "./styles.css";
import { useState, useEffect } from "react";
import Pagination from "./Component/Pagination";
import PrintUsers from "./Component/PrintUsers";
const UserCards = ({ avatar, name, url, id }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        padding: "1rem",
        border: "1px solid black",
        margin: "20px"
      }}
    >
      <img src={avatar} alt={id} width="50" />
      <div>{name}</div>
      <div>{url}</div>
    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const perPage = 5;

  // var someVal = data.items.length;
  // console.log(someVal)
  var totalPage = Math.ceil(data.total_count / 30);

  const changePageTo = (page) => {
    if (page <= 1) {
      setPage(1);
      return;
    }
    setPage(page);
  };
  // console.log(data);
  // const filteredData = data.filter((_,i)=>{
  //     return (
  //       i >= (page-1)*perPage && i < (page*perPage)
  //   )})
  // console.log(data.items.length);
  const getUsers = ({ query = "masai", page = "1" }) => {
    return fetch(`https://api.github.com/search/users?q=${query}&page=${page}`)
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div className="App">
      {loading ? (
        <h3>...loading</h3>
      ) : (
        <PrintUsers data={filteredData} UserCards={UserCards} />
        //  <>
        //   {
        //   {data?.items?.map((user) => (
        //     <UserCards
        //       id={user.login}
        //       key={user.id}
        //       name={user.name}
        //       url={user.url}
        //       avatar={user.avatar_url}
        //     />
        //   ))}
        // </> */
        // }
      )}
      <Pagination
        total={totalPage}
        currentPage={page}
        onClickCallback={(page) => changePageTo(page)}
      />
    </div>
  );
}
