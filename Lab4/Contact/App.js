import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import Contacts from './src/Contact';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileContact from './src/ProfileContact';
import Favorites from './src/Favorites';
import CustomDrawer from './src/CustomDrawer';

const Stack = createStackNavigator();

const App = () => {
    const [currentRoute, setCurrentRoute] = React.useState('Contacts');

    return (
        <NavigationContainer
            onStateChange={(state) => {
                if (state) {
                    const route = state.routes[state.index];
                    setCurrentRoute(route.name);
                }
            }}
        >
            <Stack.Navigator
                initialRouteName="Contacts"
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Contacts">
                    {({ navigation }) => (
                        <CustomDrawer navigation={navigation} currentRoute={currentRoute}>
                            <Contacts navigation={navigation} />
                        </CustomDrawer>
                    )}
                </Stack.Screen>
                <Stack.Screen name="Favorites">
                    {({ navigation }) => (
                        <CustomDrawer navigation={navigation} currentRoute={currentRoute}>
                            <Favorites navigation={navigation} />
                        </CustomDrawer>
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name="ProfileContact"
                    component={ProfileContact}
                    options={{
                        headerShown: true,
                        title: "Profile contact"
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;