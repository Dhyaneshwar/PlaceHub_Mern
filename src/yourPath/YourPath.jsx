import React from "react";
import { connect } from "react-redux";
import { yourAction } from "../redux/actions/yourAction";
import {
  getYourReducerBye,
  getYourReducerHello,
} from "../redux/selectors/yourSelector";
import "./YourPath.css";
import styled from "styled-components";

function YourPath({ helloVal, byeVal, yourAct }) {
  const onClickHandler = () => {
    console.log("button clicked");
    console.log("Hello -", helloVal);
    console.log("Bye -", byeVal);
    yourAct();
  };

  return (
    <div className="YourPath_Container">
      <h1>Testing the Redux and Sagas</h1>
      <StyledButton className="LinkButton" onClick={onClickHandler}>
        Click me to test sagas
      </StyledButton>
      <StyledSpan>Hello - {helloVal.toString()}</StyledSpan>
      <StyledSpan>Bye - {byeVal.toString()}</StyledSpan>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    helloVal: getYourReducerHello(state),
    byeVal: getYourReducerBye(state),
  };
};

const mapDispatchToProps = {
  yourAct: yourAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(YourPath);

const StyledButton = styled.button`
  border-radius: 3px;
  border: 2px solid #bf4f74;
  padding: 0.25rem 1rem;
  font-size: 2rem;
  margin: 2rem 0;
`;

const StyledSpan = styled.span`
  margin: 1rem;
`;
