import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DetailListItem = ({ icon, title, subtitle }) => {
    return (
        <View style={styles.borderContainer}>
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    {icon && (
                        <Icon
                            name={icon}
                            size={24}
                            style={styles.icon}
                        />
                    )}
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subtitle}>{subtitle}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    borderContainer: {
        paddingLeft: 24,
    },
    wrapper: {
        flexDirection: 'row',
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 24,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        color: '#333',
        marginRight: 20,
    },
    contentContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        color: '#999',
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 4,
    },
    subtitle: {
        color: '#0066FF',
        fontSize: 16,
    },
});

export default DetailListItem;