import { Text, View, TextInput, TouchableOpacity, StyleSheet, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { firebaseAuth } from "./../services/auth/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';

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

export default function SignupScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigation = useNavigation();
    const handleSignUp = () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        console.log('Email:', email);
        console.log('Password:', password);

        createUserWithEmailAndPassword(firebaseAuth, email, password).then((res: any) => {
            console.log("successful", res.user);
            navigation.navigate('Login');
        }).catch((err: any) => {
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