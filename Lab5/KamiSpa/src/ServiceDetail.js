import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getAllServices, login, getService, deleteService } from "./api";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function ServiceDetail({ navigation, route }) {
    const { serviceId } = route.params;
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServiceDetail();
    }, []);
    const fetchServiceDetail = async () => {
        try {
            setLoading(true);
            const data = await getService(serviceId);
            setService(data);
        } catch (error) {
            Alert.alert("Lỗi", "Không thể tải chi tiết dịch vụ");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    const handleDelete = async () => {
        Alert.alert(
            "Warning",
            "Are you sure you want to remove this service? This operation cannot be returned",
            [
                {
                    text: "CANCEL",
                    style: "cancel"
                },
                {
                    text: "DELETE",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteService(serviceId);
                            Alert.alert("Thành công", "Đã xóa dịch vụ");
                            navigation.goBack();
                        } catch (error) {
                            Alert.alert("Lỗi", "Không thể xóa dịch vụ");
                        }
                    }
                }
            ]
        );
    };
    return (
        <SafeAreaView>
            <View>
                <View style={styles.header}>
                    <Icon name="arrow-back" size={24} color="#fff" onPress={() => navigation.goBack()} />
                    <Text style={styles.headerTitle}>Service Detail</Text>
                    <Menu>
                        <MenuTrigger>
                            <Icon name="menu" size={24} color="#fff" />
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={() => navigation.navigate('EditService', { serviceId })} text='Update' />
                            <MenuOption onSelect={handleDelete} text='Delete' />
                        </MenuOptions>
                    </Menu>
                </View>
                <View style={styles.serviceDetailItemContainer}>
                    <Text style={styles.serviceDetailItem}>
                        Service name: <Text style={styles.serviceDetailItemInner}>{service.name}</Text>
                    </Text>
                    <Text style={styles.serviceDetailItem}>
                        Service price: <Text style={styles.serviceDetailItemInner}>{service.price} đ</Text>
                    </Text>
                    <Text style={styles.serviceDetailItem}>
                        Creator: Hau
                    </Text>
                    <Text style={styles.serviceDetailItem}>
                        Time created: <Text style={styles.serviceDetailItemInner}>{service.createdAt}</Text>
                    </Text>
                    <Text style={styles.serviceDetailItem}>
                        Final update: <Text style={styles.serviceDetailItemInner}>{service.updatedAt}</Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        alignItems: "center",
        backgroundColor: "#d63250ff",

    },
    serviceDetailItemContainer: {
        padding: 10,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 25,
        fontWeight: "bold",
    },
    serviceDetailItem: {
        fontWeight: 'bold',
    },
    serviceDetailItemInner: {
        fontWeight: 'normal',
    },
});    