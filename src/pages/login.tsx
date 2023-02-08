import { GoogleLogin } from "react-google-login";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";

import { Flex, Heading } from "@chakra-ui/react";

const axiosApiCall = (url, method, body = {}) => {
  axios({
    method,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    data: body,
  });
};

const Login = ({ title }: { title: string }) => {
  const router = useRouter();
  const onSuccess = (response) => {
    const accessToken = response.accessToken;
    axiosApiCall("oauth/google", "post", { accessToken }).then((res) => {
      const { user, token } = res.data;
      Cookie.set("token", token, { expires: 1 });
      router.push("/");
    });
  };
  const onFailure = (error) => {
    console.log("error", error);
  };
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
      bgClip="text"
    >
      <Heading fontSize="6vw">{title}</Heading>
      <br /> <br />
      <GoogleLogin
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        buttonText="Sign up with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </Flex>
  );
};

Login.defaultProps = {
  title: "Login",
};

export default Login;
