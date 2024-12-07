import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerToggleButton } from '@react-navigation/drawer';
import ProfileScreen from '../screens/profile-screen';
import { useState } from 'react';
import { Modal, Pressable, Text, View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

const Drawer = createDrawerNavigator();

export default function DrawerStack() {
    return (
        <Drawer.Navigator initialRouteName="Profile" screenOptions={{headerLeft: ()=>null, headerRight: () => <DrawerToggleButton />}} drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
    );
}

function CustomDrawerContent(props: any) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
      <DrawerContentScrollView {...props}>
       <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Are you sure?</Text>
              <View style={{ flexDirection:"row" }}>
              <Pressable
                style={[styles.button, styles.buttonConfirm]}
                onPress={() => auth().signOut()}>
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
    <DrawerItemList {...props} />
        <DrawerItem
          label="Sign Out"
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </DrawerContentScrollView>
    );
  };

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonConfirm: {
      backgroundColor: '#10ac84',
      marginRight: 10
    },
    buttonClose: {
      backgroundColor: '#dedede',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });