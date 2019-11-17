import React from "react";
import {View} from "react-native";
import {AccessToken, LoginManager} from "react-native-fbsdk";
import Icon from "react-native-vector-icons/FontAwesome";

import {useLoginWithFacebookMutation} from "../hooks/mutations";
import {colors} from "../theme";

interface LoginWithFacebookButton {
  onFinishLogin: () => void;
}

const LoginWithFacebookButton: React.FC<LoginWithFacebookButton> = ({
  onFinishLogin,
}) => {
  const [mutate, loading] = useLoginWithFacebookMutation();

  const loginWithFacebook = async () => {
    const result = await LoginManager.logInWithPermissions([
      "email",
      "public_profile",
    ]);

    if (!result) {
      alert("An error occurred, please try again later");
    }

    if (!result.isCancelled) {
      const {accessToken} = await AccessToken.getCurrentAccessToken();
      const {data} = await mutate(accessToken);
      if (data && data.loginWithFacebook) {
        onFinishLogin();
      } else {
        alert("Ooops... something went wrong...");
      }
    }
  };

  return (
    <View style={{marginVertical: 12}}>
      <Icon.Button
        name="facebook"
        backgroundColor={colors.facebook}
        onPress={loginWithFacebook}
        disabled={loading}>
        Continue with Facebook
      </Icon.Button>
    </View>
  );
};

export default LoginWithFacebookButton;
