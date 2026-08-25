import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useGetProducts } from "../../src/hooks/use-product";
import { ProductCard } from "../../src/components/ProductCard";

export default function Home() {
  const { data, isLoading, error } = useGetProducts({ limit: 10 });

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error loading products.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured Products</Text>
      <FlatList
        data={data?.data?.products || []}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }: { item: any }) => <ProductCard product={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  errorText: {
    color: '#ef4444',
  },
});
