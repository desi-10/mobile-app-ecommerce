import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGetProduct } from "../../src/hooks/use-product";
import { ShoppingCart } from "lucide-react-native";

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, error } = useGetProduct(id!);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error || !data?.data) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Product not found.</Text>
      </View>
    );
  }

  const product = data.data;
  const imageUrl = product.image || product.images?.[0]?.url || "https://via.placeholder.com/400";
  const price = product.price || product.variants?.[0]?.price || 0;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      
      <View style={styles.content}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${price}</Text>
        
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <ShoppingCart color="white" size={20} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  errorText: {
    color: '#ef4444',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: 320,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginTop: 8,
  },
  descriptionContainer: {
    marginTop: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  descriptionText: {
    color: '#4b5563',
    marginTop: 8,
    lineHeight: 24,
  },
  footer: {
    padding: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 8,
  },
});
