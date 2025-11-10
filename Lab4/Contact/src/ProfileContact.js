import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ContactThum from './ContactThum';
import DetailListItem from './DetailListItem';
import { IconButton } from 'react-native-paper';
import { updateContact } from './asyncStorageHelper';

const ProfileContact = ({ route, navigation }) => {
    const { contact } = route.params;
    const { id, avatar, name, email, phone, cell } = contact;
    const [favorite, setFavorite] = useState(contact.favorite);

    const toggleFavorite = async () => {
        const newFavorite = !favorite;
        setFavorite(newFavorite);

        const updatedContact = { ...contact, favorite: newFavorite };
        const success = await updateContact(updatedContact);

        if (success) {
            console.log('Contact updated successfully');
        } else {
            setFavorite(!newFavorite);
            console.error('Failed to update contact');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.avatarSection}>
                <ContactThum avatar={avatar} name={name} phone={phone} />
            </View>
            <View style={styles.detailsSection}>
                <DetailListItem icon="mail" title="Email" subtitle={email} />
                <DetailListItem icon="phone" title="Work" subtitle={phone} />
                <DetailListItem icon="smartphone" title="Personal" subtitle={cell} />
                <View style={styles.favoriteSection}>
                    <IconButton
                        icon={favorite ? "star-check" : "star-check-outline"}
                        iconColor="#663399"
                        size={20}
                        onPress={toggleFavorite}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
    detailsSection: {
        flex: 1,
        backgroundColor: 'white',
    },
    favoriteSection: {
        alignItems: 'center',
    },
});

export default ProfileContact;