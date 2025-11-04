import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Product_Add from './Product_Add';
import Product_Search from './Product_Search';
import Product_Detail from './Product_Detail';
export default function Product() {
    const [data, setData] = useState([])
    const filePath = 'https://dummyjson.com/products/';
    const [selected, setSelected] = useState('Products');
    const [selectedProduct, setSelectedProduct] = useState(null);
    useEffect(() => {

        fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((d) => {
                setData(d.products);

            })
            .catch((error) => {
                console.error('Error fetching data:', error);

            });
    }, []);
    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <View style={styles.row}>
                    <Image
                        source={{ uri: item.thumbnail }}
                        style={styles.thumb}
                    />


                    <View style={styles.info}>
                        <Text variant="titleMedium" style={styles.title}>
                            {item.title}
                        </Text>
                        <Text numberOfLines={8} style={styles.line}>Description: {item.description}</Text>
                        <Text>Price: ${item.price}</Text>
                        <Text style={styles.discount}>Discount: {item.discountPercentage}% off</Text>
                        <Text>Rating: {item.rating}</Text>
                        <Text>Stock: {item.stock}</Text>
                        <Text>Brand: {item.brand}</Text>
                        <Text>Category: {item.category}</Text>
                        <View style={styles.actions}>
                            <Button mode="contained" compact onPress={() => {
                                setSelectedProduct(item);
                                setSelected('Detail');
                            }}>DETAIL</Button>
                            <Button mode="contained" compact onPress={() => {/* ... */ }}>ADD</Button>
                            <Button mode="contained" compact onPress={() => {/* ... */ }}>DELETE</Button>
                        </View>
                    </View>


                </View>
            </Card.Content>
        </Card>
    );
    const handleAdd = (newProduct) => {
        setData(prev => [newProduct, ...prev]);
        setSelected('Products');
    }

    if (selected === 'Add') {
        return <Product_Add onAdd={handleAdd} setSelected={setSelected} />;
    } else if (selected === 'Search') {
        return <Product_Search setSelected={setSelected} />;
    } else if (selected === 'Detail') {
        if (selectedProduct) {
            return <Product_Detail productId={selectedProduct.id} setSelected={setSelected} />;
        }

        setSelected('Products');
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            {data.length > 0 ? (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ padding: 10 }}
                />
            ) : (
                <View style={styles.center}>
                    <Text>Loading...</Text>
                </View>
            )}
            <View style={styles.navbar}>
                <TouchableOpacity style={styles.navItem} onPress={() => setSelected('Products')}>
                    <Ionicons name="grid-outline" size={22} color={selected === 'Products' ? '#4F46E5' : '#888'} />
                    <Text style={[styles.label, selected === 'Products' && styles.activeLabel]}>Products</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => setSelected('Add')}>
                    <Ionicons name="add-circle-outline" size={22} color={selected === 'Add' ? '#4F46E5' : '#888'} />
                    <Text style={[styles.label, selected === 'Add' && styles.activeLabel]}>Add</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => setSelected('Search')}>
                    <Ionicons name="search-outline" size={22} color={selected === 'Search' ? '#4F46E5' : '#888'} />
                    <Text style={[styles.label, selected === 'Search' && styles.activeLabel]}>Search</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => setSelected('Detail')}>
                    <Ionicons name="newspaper-outline" size={22} color={selected === 'Detail' ? '#4F46E5' : '#888'} />
                    <Text style={[styles.label, selected === 'Detail' && styles.activeLabel]}>Detail</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    card: { marginVertical: 8, backgroundColor: '#fafafa', borderRadius: 12, },
    row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
    thumb: { width: 90, height: 90, borderRadius: 8, resizeMode: 'cover' },
    info: { flex: 1, minWidth: 0, maxWidth: '100%', flexShrink: 1 },
    title: { marginBottom: 4, flexShrink: 1 },
    clamp: { color: '#555', lineHeight: 18, flexShrink: 1 },
    line: { flexShrink: 1 },
    discount: { color: 'green', marginTop: 2 },
    actions: { flexDirection: 'row', gap: 8, marginTop: 10 },
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
});
