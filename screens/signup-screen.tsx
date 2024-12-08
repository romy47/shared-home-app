import { Text, View, TextInput, TouchableOpacity, StyleSheet, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import {
    GoogleSignin,
    isErrorWithCode,
    isSuccessResponse,
    statusCodes,
    GoogleSigninButton
  } from '@react-native-google-signin/google-signin';
  
async function onAppleButtonPress() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // As per the FAQ of react-native-apple-authentication, the name should come first in the following array.
      // See: https://github.com/invertase/react-native-apple-authentication#faqs
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
  
    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }
  
    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
  
    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);
}
// import statusCodes along with GoogleSignin

  // Somewhere in your code
async function onGoogleButtonPress() {
    try {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const signInResult = await GoogleSignin.signIn();

        // Try the new style of google-sign in result, from v13+ of that module
        let idToken = signInResult.data?.idToken;
        // if (!idToken) {
        //     // if you are using older versions of google-signin, try old style result
        //     idToken = signInResult.idToken;
        // }
        if (!idToken) {
            throw new Error('No ID token found');
        }

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    } catch (error) {
        if (isErrorWithCode(error)) {
        switch (error.code) {
            case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
            case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
            default:
            // some other error happened
        }
        } else {
        // an error that's not related to google sign in occurred
        }
    }
};
  
  
export default function SignupScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    GoogleSignin.configure({
        webClientId: '459808310970-j4kklrta39an8t8kvjb4ijli5e07rfvp.apps.googleusercontent.com',
    });

    const navigation = useNavigation();
    const handleSignUp = () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        console.log('Email:', email);
        console.log('Password:', password);

        return auth().createUserWithEmailAndPassword(email, password).then((res) => {
            console.log("successful: user created", res);
            console.log("Sending varrification enail");
            res.user.sendEmailVerification().then((res2)=>{
                console.log("email verification sent to user: ", res2);
              }).catch((err2)=> {
                console.log("error email verification: ", err2);
              }).then(()=>{
                auth().signOut()
              });
        }).catch((err) => {
            console.log(err);
        })
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Text style={styles.title}>Sign Up</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#888"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="#888"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.linkContainer}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.linkText}>Already have an account? Sign In</Text>
                    </TouchableOpacity>
                    <GoogleSigninButton
                        size={GoogleSigninButton.Size.Wide}
                        onPress={onGoogleButtonPress}
                    />
                    <AppleButton
                        buttonStyle={AppleButton.Style.BLACK}
                        buttonType={AppleButton.Type.SIGN_IN}
                        style={{
                            width: 160,
                            height: 45,
                        }}
                        onPress={() => onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))}
                    />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#28a745',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    linkContainer: {
        marginTop: 10,
    },
    linkText: {
        color: '#007BFF',
        fontSize: 16,
    },
});