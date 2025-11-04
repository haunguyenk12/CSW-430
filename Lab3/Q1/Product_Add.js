import React, { useState } from 'react';
import { Alert, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Product_Add({ onAdd, setSelected }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [rating, setRating] = useState('');
    const [stock, setStock] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState('');

    const num = (s) => (s === "" ? NaN : Number(s));

    const errors = {
        title: title.trim().length === 0,
        description: description.trim().length === 0,
        price: isNaN(num(price)) || num(price) < 0,
        discount: isNaN(num(discountPercentage)) || num(discountPercentage) < 0 || num(discountPercentage) > 100,
        rating: isNaN(num(rating)) || num(rating) < 0 || num(rating) > 5,
        stock: !Number.isInteger(num(stock)) || num(stock) < 0,
        brand: brand.trim().length === 0,
        category: category.trim().length === 0,
        images: images.trim().length === 0,
    };
    const handleSubmit = async () => {
        try {
            const res = await fetch('https://dummyjson.com/products/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    price: price,
                    discountPercentage: discountPercentage,
                    rating: rating,
                    stock: stock,
                    brand: brand,
                    category: category,
                    images: images,
                })
            });
            const newProduct = await res.json();
            onAdd?.(newProduct);
            console.log(newProduct);
            Alert.alert('Add successful');
        } catch (error) {
            console.error('Error adding product:', error);
            Alert.alert('Error', 'Failed to add product');
        }
    };
    const clear = () => {
        setTitle(''),
            setDescription(''),
            setPrice(''),
            setDiscountPercentage(''),
            setRating(''),
            setStock(''),
            setBrand(''),
            setCategory(''),
            setImages('')
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Text variant="titleMedium" style={{ marginBottom: 10, color: 'blue' }}>
                    Add a Product
                </Text>

                <Text>Title</Text>
                <TextInput mode="outlined" placeholder="Enter title" value={title} onChangeText={setTitle} />


                <Text>Description</Text>
                <TextInput mode="outlined" placeholder="Enter description" value={description} onChangeText={setDescription} multiline />

                <Text>Price</Text>
                <TextInput mode="outlined" placeholder="Enter price" value={price} onChangeText={setPrice} keyboardType="numeric" />

                <Text>Discount Percentage</Text>
                <TextInput mode="outlined" placeholder="Enter discount percentage" value={discountPercentage} onChangeText={setDiscountPercentage} keyboardType="numeric" />

                <Text>Rating</Text>
                <TextInput mode="outlined" placeholder="Enter rating" value={rating} onChangeText={setRating} keyboardType="numeric" />

                <Text>Stock</Text>
                <TextInput mode="outlined" placeholder="Enter stock" value={stock} onChangeText={setStock} keyboardType="numeric" />

                <Text>Brand</Text>
                <TextInput mode="outlined" placeholder="Enter brand" value={brand} onChangeText={setBrand} />

                <Text>Category</Text>
                <TextInput mode="outlined" placeholder="Enter category" value={category} onChangeText={setCategory} />

                <Text>Images</Text>
                <TextInput mode="outlined" placeholder="Enter images URL(s), separated by commas" value={images} onChangeText={setImages} />

                <Button mode="contained" style={{ marginTop: 16 }} onPress={() => { handleSubmit(); clear(); }}>
                    SUBMIT
                </Button>
            </ScrollView>
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
});