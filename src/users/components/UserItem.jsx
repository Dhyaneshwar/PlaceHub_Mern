import React from "react";
import "./UserItem.css";
import Avatar from "../../shared/components/UIElements/Avatar";
import { Link } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";

const UserItem = (props) => {
  const { key, id, name, image, placeCount } = props;

  return (
    <li className="user-item" key={key} id={id}>
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar image={image} alt={name} />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {placeCount} Place{placeCount > 1 && "s"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
