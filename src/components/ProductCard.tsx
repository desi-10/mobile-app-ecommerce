import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import type { Product } from "../types/product";

export function ProductCard({ product }: { product: Product }) {
  const imageUrl = product.image || product.images?.[0]?.url || "https://via.placeholder.com/150";

  return (
    <Link href={`/product/${product.id}`} asChild>
      <TouchableOpacity style={styles.card}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>{product.name}</Text>
          <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price || product.variants?.[0]?.price || 0}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 12,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    color: '#1f2937',
  },
  description: {
    color: '#6b7280',
    fontSize: 14,
    marginTop: 4,
  },
  priceContainer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2563eb',
  },
});
