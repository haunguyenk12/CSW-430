import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import ContactListItem from './ContactListITem';
import { saveContacts, getContacts } from './asyncStorageHelper';
import { v4 as uuid } from 'uuid';

const keyExtractor = ({ phone }) => phone;

const mapContacts = (contact) => {
    const { name, picture, phone, cell, email } = contact;
    return {
        id: uuid(),
        name: name.first + ' ' + name.last,
        avatar: picture.large,
        phone,
        cell,
        email,
        favorite: Math.random() < 0.1,
    };
};

const fetchContacts = async () => {
    const data = await fetch("https://randomuser.me/api/?results=50");
    const ContactData = await data.json();
    return ContactData.results.map(mapContacts);
};

const Contacts = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = async () => {
        try {
            setLoading(true);
            let storedContacts = await getContacts();

            if (storedContacts.length === 0) {
                console.log('Fetching contacts from API...');
                storedContacts = await fetchContacts();
                await saveContacts(storedContacts);
                console.log('Saved contacts to AsyncStorage');
            } else {
                console.log('Loaded contacts from AsyncStorage:', storedContacts.length);
            }

            setContacts(storedContacts);
            setError(null);
        } catch (e) {
            console.error('Error loading contacts:', e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const renderContacts = ({ item }) => {
        const { name, avatar, phone } = item;
        return <ContactListItem
            name={name}
            avatar={avatar}
            phone={phone}
            onPress={() => navigation.navigate("ProfileContact", { contact: item })}
        />;
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.message}>Loading contacts...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, styles.centered]}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    if (!contacts || contacts.length === 0) {
        return (
            <View style={[styles.container, styles.centered]}>
                <Text style={styles.message}>No contacts available</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                keyExtractor={keyExtractor}
                renderItem={renderContacts}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontSize: 16,
        marginTop: 10,
        color: '#666',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
});

export default Contacts;