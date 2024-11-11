import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';

// Array de produtos para listar
const initialProducts = [
  { id: '1', name: 'Produto 1', quantity: 0 },
  { id: '2', name: 'Produto 2', quantity: 0 },
  { id: '3', name: 'Produto 3', quantity: 0 },
  { id: '4', name: 'Produto 4', quantity: 0 },
];

export default function App() {
  const [products, setProducts] = useState(initialProducts);

  // Função para alterar a quantidade do produto
  const updateQuantity = (id, change) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id
          ? { ...product, quantity: Math.max(0, product.quantity + change) }
          : product
      )
    );
  };

  // Função para renderizar cada item da FlatList
  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productName}>{item.name}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Função para exibir o "Carrinho de Compras" no console
  const showCart = () => {
    console.log("Carrinho de Compras:", products);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderProduct}
      />
      <Button title="Ver Carrinho" onPress={showCart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop:40,
    backgroundColor: '#fff',
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  productName: {
    fontSize: 18,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ddd',
    padding: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
  },
  quantity: {
    fontSize: 18,
  },
});
