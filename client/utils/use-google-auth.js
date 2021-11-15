import {useGoogleLogin} from "react-google-login";
import {useRouter} from "next/router";
import {refreshTokenSetup} from "./use-refreshToken";
import axios from "axios";
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

export function GoogleAuthLogin({text}) {
  const router = useRouter();
  const onSuccess = async (res) => {
    console.log(res);
    localStorage.setItem("name", res.profileObj.name);
    localStorage.setItem("email", res.profileObj.email);
    localStorage.setItem("avatar", res.profileObj.imageUrl);
    refreshTokenSetup(res);
    router.push("/leads");
  };

  const onFailure = (res) => {
    console.log(res);
    console.log("Login failed");
  };

  const {signIn} = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
  });

  return (
    <button onClick={signIn} className="button-google">
      <img src="/google.svg" alt="google login" className="icon" />

      <span className="buttonText">{text}</span>
    </button>
  );
}

export function GoogleAuthLogout() {
  const router = useRouter();

  const onFailure = () => {
    console.log("Handle failure cases");
  };

  // const {signOut} = useGoogleLogout({
  //   clientId,
  //   onLogoutSuccess,
  //   onFailure,
  // });
  const onClickHandler = async (res) => {
    await axios.post("/api/users/signout");
    router.push("/");
  };
  return (
    <span className="buttonText cursor">
      <button
        className="navbar-btn form-signup-btn signup p-signout"
        onClick={onClickHandler}
      >
        Sign Out <i className="fas fa-sign-out-alt"></i>
      </button>
    </span>
  );
}
