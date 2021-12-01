const PrintUsers = ({ data, UserCards }) => {
  return (
    <>
      {data?.items?.map((user) => (
        <UserCards
          id={user.login}
          key={user.id}
          name={user.name}
          url={user.url}
          avatar={user.avatar_url}
        />
      ))}
    </>
  );
};
export default PrintUsers;
