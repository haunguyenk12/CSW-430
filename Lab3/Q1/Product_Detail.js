import React, { useState, useEffect } from 'react';
import { Alert, View, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, Button, Card, FlatList } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Product_Detail({ productId, setSelected }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const filePath = 'https://dummyjson.com/products/' + productId;
        fetch(filePath)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, [productId]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>


            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Loading...</Text>
                </View>
            ) : product ? (
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
                    <Card style={styles.card}>
                        <Card.Cover source={{ uri: product.thumbnail || product.images?.[0] }} />
                        <Card.Content style={{ paddingTop: 10 }}>
                            <Text variant="titleMedium" style={{ marginBottom: 6 }}>
                                Title: {product.title}
                            </Text>
                            <Text numberOfLines={8} style={styles.gray}>Description: {product.description}</Text>
                            <Text>Price: ${product.price}</Text>
                            <Text>Discount: {product.discountPercentage}%</Text>
                            <Text>Rating: {product.rating} stars</Text>
                            <Text>Stock: {product.stock} units</Text>
                            <Text>Brand: {product.brand}</Text>
                            <Text>Category: {product.category}</Text>
                        </Card.Content>
                    </Card>
                </ScrollView>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Product not found</Text>
                </View>
            )}

            <View style={styles.navbar}>
                <TouchableOpacity style={styles.navItem} onPress={() => setSelected('Products')}>
                    <Ionicons name="grid-outline" size={22} color={'#888'} />
                    <Text style={styles.label}>Products</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => setSelected('Add')}>
                    <Ionicons name="add-circle-outline" size={22} color={'#888'} />
                    <Text style={styles.label}>Add</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => setSelected('Search')}>
                    <Ionicons name="search-outline" size={22} color={'#888'} />
                    <Text style={styles.label}>Search</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => setSelected('Detail')}>
                    <Ionicons name="newspaper-outline" size={22} color={'#4F46E5'} />
                    <Text style={[styles.label, { color: '#4F46E5', fontWeight: '600' }]}>Detail</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingVertical: 8,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
    },
    label: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    activeLabel: {
        color: '#4F46E5',
        fontWeight: '600',
    },
    sectionTitle: {
        backgroundColor: '#f3f4f6',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        color: '#111827',
        fontWeight: '600',
    },
    card: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        overflow: 'hidden',
    },
    gray: {
        color: '#555',
    }
});