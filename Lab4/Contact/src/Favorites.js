import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, ActivityIndicator } from 'react-native';
import ContactThumbnail from './ContactThum';
import { getContacts } from './asyncStorageHelper';
import { useFocusEffect } from '@react-navigation/native';

const keyExtractor = ({ phone }) => phone;

const Favorites = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            loadContacts();
        }, [])
    );

    const loadContacts = async () => {
        try {
            setLoading(true);
            const storedContacts = await getContacts();
            setContacts(storedContacts);
        } catch (error) {
            console.error('Error loading contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderFavoriteThumbnail = ({ item }) => {
        const { avatar } = item;
        return (
            <ContactThumbnail
                avatar={avatar}
                onPress={() => navigation.navigate('ProfileContact', { contact: item })}
                showPhone={false}
            />
        );
    };

    const favorites = contacts.filter((contact) => contact.favorite);

    if (loading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }

    if (favorites.length === 0) {
        return (
            <View style={[styles.container, styles.centered]}>
                <Text style={styles.emptyText}>No favorites yet</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                keyExtractor={keyExtractor}
                numColumns={3}
                contentContainerStyle={styles.list}
                renderItem={renderFavoriteThumbnail}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        justifyContent: 'center',
        flex: 1,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: 'gray',
    },
});

export default Favorites;