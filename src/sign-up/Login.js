import autobind from "autobind-decorator";
import * as React from "react";
import {TextInput} from "react-native";

import SignUpContainer from "./SignUpContainer";
import firebase from "firebase";
import {TextField, Firebase} from "../components";
import type {NavigationProps} from "../components/Types";

type LoginState = {
    loading: boolean
};

export default class Login extends React.Component<NavigationProps<*>, LoginState> {

    state: LoginState = {
        loading: false
    };

    @autobind
    async login(): Promise<void> {
      try{
        let { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('602498550137033', {
            permissions: ['public_profile']
        });
        if (type === 'success') {
        // Build Firebase credential with the Facebook access token.
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        console.log(credential);
        // Sign in with credential from the Facebook user.
        firebase.auth().signInWithCredential(credential).catch((error) => {
          // Handle Errors here.
          alert(error);
        });
  }
      }catch(e){
        alert(e)
      }
    }
    render(): React.Node {
        const {navigation} = this.props;
        const {loading} = this.state;
        return (
            <SignUpContainer
                title="Login"
                subtitle="Get Started"
                nextLabel="Login with Facebook"
                next={this.login}
                first
                {...{ navigation, loading }}
            >
            </SignUpContainer>
        );
    }
}
