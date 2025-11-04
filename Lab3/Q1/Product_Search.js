import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, Button, Card } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Product_Search({ setSelected }) {
    const [data, setData] = useState([]);
    const [value, setValue] = useState('');
    let filePath = 'https://dummyjson.com/products';

    const searchProduct = () => {
        if (value !== '')
            filePath = 'https://dummyjson.com/products/search?q=' + value;
        fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((d) => {
                setData(d.products)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);

            });
    };
    const renderItem = ({ item }) => (
        <View style={{ marginBottom: 14 }}>
            <Text style={styles.sectionTitle}>Product Detail</Text>
            <Card style={styles.card}>
                <Card.Cover source={{ uri: item.thumbnail || item.images?.[0] }} />
                <Card.Content style={{ paddingTop: 10 }}>
                    <Text variant="titleMedium" style={{ marginBottom: 6 }}>
                        Title: {item.title}
                    </Text>
                    <Text numberOfLines={3} style={styles.gray}>Description: {item.description}</Text>
                    <Text>Price: ${item.price}</Text>
                    <Text>Discount: {item.discountPercentage}%</Text>
                    <Text>Rating: {item.rating} stars</Text>
                    <Text>Stock: {item.stock} units</Text>
                    <Text>Brand: {item.brand}</Text>
                    <Text>Category: {item.category}</Text>
                </Card.Content>
            </Card>
        </View>
    );
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ padding: 12 }}>
                <Text variant="titleSmall" style={{ marginBottom: 6 }}>Search Products</Text>
                <TextInput
                    mode="outlined"
                    placeholder="Enter product name..."
                    value={value}
                    onChangeText={setValue}
                    style={{ marginBottom: 8 }}
                />
                <Button mode="contained" onPress={searchProduct}>
                    SEARCH
                </Button>
            </View>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ padding: 12, paddingBottom: 80 }}
                ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 10 }}>No results</Text>}
            />
            <View style={styles.navbar}>
                <TouchableOpacity style={styles.navItem} onPress={() => setSelected('Products')}>
                    <Ionicons name="grid-outline" size={22} />
                    <Text style={[styles.label]}>Products</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => setSelected('Add')}>
                    <Ionicons name="add-circle-outline" size={22} />
                    <Text style={[styles.label]}>Add</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => setSelected('Search')}>
                    <Ionicons name="search-outline" size={22} />
                    <Text style={[styles.label]}>Search</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => setSelected('Detail')}>
                    <Ionicons name="newspaper-outline" size={22} />
                    <Text style={[styles.label]}>Detail</Text>
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