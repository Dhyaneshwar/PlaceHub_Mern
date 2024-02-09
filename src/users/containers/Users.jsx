import React from "react";
import UserList from "../components/UsersList";

const USERS = [
  {
    id: "u1",
    name: "Aaaa",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxkVcY8qefZQ3hVW53Bfj_evcqB2pvtpjPbOz2C2FTQs7W80IFpB4kO56LA4xbBI4ima8&usqp=CAU",
    places: 2,
  },
  {
    id: "u2",
    name: "Bbbbb",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxkVcY8qefZQ3hVW53Bfj_evcqB2pvtpjPbOz2C2FTQs7W80IFpB4kO56LA4xbBI4ima8&usqp=CAU",
    places: 1,
  },
  {
    id: "u3",
    name: "Ccccc",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxkVcY8qefZQ3hVW53Bfj_evcqB2pvtpjPbOz2C2FTQs7W80IFpB4kO56LA4xbBI4ima8&usqp=CAU",
    places: 4,
  },
];
function Users() {
  return <UserList items={USERS} />;
}

export default Users;
