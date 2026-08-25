import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useGetProducts } from "../../src/hooks/use-product";
import { ProductCard } from "../../src/components/ProductCard";

export default function Shop() {
  // In a real app, this would have filters, categories, etc.
  const { data, isLoading } = useGetProducts({ limit: 50 });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Products</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={data?.data?.products || []}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }: { item: any }) => <ProductCard product={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
