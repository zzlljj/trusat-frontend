import React, { useState } from "react";
import axios from "axios";
import {
  createWallet,
  retrieveNonce,
  signMessage,
  retrieveJwt
} from "../../auth/helpers";
import { NavLink } from "react-router-dom";
import { useAuthState, useAuthDispatch } from "../../auth/auth-context";
import { useUserDispatch } from "../../user/user-context";

export default function MultipleObservationForm() {
  const [pastedIODs, setPastedIODs] = useState(``);
  const authDispatch = useAuthDispatch();
  const { jwt } = useAuthState();
  const userDispatch = useUserDispatch();

  const getBurnerJwt = async () => {
    authDispatch({ type: "AUTHENTICATING", payload: true });

    const wallet = createWallet();

    const nonce = await retrieveNonce(wallet.signingKey.address);

    const signedMessage = await signMessage({ nonce, wallet });

    const jwt = await retrieveJwt({
      address: wallet.signingKey.address,
      signedMessage: signedMessage
    });
    authDispatch({ type: "SET_BURNER", payload: wallet });
    authDispatch({ type: "SET_AUTH_TYPE", payload: "burner" });
    authDispatch({ type: "SET_JWT", payload: jwt });
    authDispatch({ type: "AUTHENTICATING", payload: false });

    userDispatch({
      type: "SET_USER_ADDRESS",
      payload: wallet.signingKey.address
    });
    // add private key and jwt to local storage
    const privateKey = wallet.signingKey.privateKey;
    localStorage.setItem("trusat-private-key", privateKey);
    localStorage.setItem("trusat-jwt", jwt);

    return jwt;
  };

  const handleSubmit = async () => {
    let submissionJwt = "";

    if (!jwt) {
      submissionJwt = await getBurnerJwt();
    } else {
      submissionJwt = jwt;
    }

    const arrayOfIODs = pastedIODs.split("\n");

    axios
      .post(
        `https://api.consensys.space:8080/submitObservation`,
        JSON.stringify({ jwt: submissionJwt, multiple: arrayOfIODs })
      )
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));

    setPastedIODs("");
  };

  return (
    <form
      className="multiple-observation-form"
      onSubmit={event => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <textarea
        required
        className="multiple-observation-form__textarea"
        // TODO - better placeholder text, and placeholder IODs that aren't user specific.
        placeholder={`Paste your observations in this field, one observation per line like so:
          
28537 05 004A   4353 G 20190324193958688 56 75 0850592+471197 16 S
28537 05 004A   4353 G 20190324193959728 56 75 0852089+468562 16 S
28537 05 004A   4353 G 20190324194001008 56 75 0853326+465278 16 S
28537 05 004A   4353 G 20190324194001888 56 75 0854298+463051 16 S
28537 05 004A   4353 G 20190324194037131 56 75 0926071+373796 16 S
28537 05 004A   4353 G 20190324194038691 56 75 0927158+369915 16 S`}
        value={pastedIODs}
        onChange={event => setPastedIODs(event.target.value)}
        rows="10"
        cols="80"
      />
      <div className="multiple-observation-form__button-wrapper">
        <NavLink className="app__nav-link" to="/catalog/priorities">
          <span className="app__black-button--small multiple-observation-form__cancel-button">
            CANCEL
          </span>
        </NavLink>
        &nbsp;
        <button type="submit" className="app__white-button--small">
          SUBMIT
        </button>
      </div>
    </form>
  );
}

// IODs
// 28537 05 004A   4353 G 20190324193958688 56 75 0850592+471197 16 S
// 28537 05 004A   4353 G 20190324193959728 56 75 0852089+468562 16 S
// 28537 05 004A   4353 G 20190324194001008 56 75 0853326+465278 16 S
// 28537 05 004A   4353 G 20190324194001888 56 75 0854298+463051 16 S
// 28537 05 004A   4353 G 20190324194037131 56 75 0926071+373796 16 S
// 28537 05 004A   4353 G 20190324194038691 56 75 0927158+369915 16 S
