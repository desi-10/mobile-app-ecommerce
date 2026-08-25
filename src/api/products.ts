import { apiClient } from "./client";
import type {
  ApiResponse,
  CreateProductDto,
  GetProductsResponse,
  Product,
  UpdateProductDto,
} from "../types/product";

export async function getProducts(params?: { 
  page?: number; 
  limit?: number;
  q?: string;
  category?: string;
  onDiscount?: boolean;
  status?: string;
  sort?: string;
  rating?: number;
}) {
  const query = { ...params } as Record<string, any>;
  
  if (Array.isArray(query.categories)) {
    query.categories = query.categories.join(',');
  }

  const res = await apiClient.get("/products", { params: query });
  return res.data;
}

export async function getProductById(id: string) {
  const res = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
  return res.data;
}

export async function createProduct(payload: FormData) {
  const res = await apiClient.post<ApiResponse<Product>>("/products", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function updateProduct(id: string, payload: UpdateProductDto | FormData) {
  const isFormData = payload instanceof FormData;
  const res = await apiClient.patch<ApiResponse<Product>>(
    `/products/${id}`,
    payload,
    {
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" },
    }
  );
  return res.data;
}

export async function deleteProduct(id: string) {
  const res = await apiClient.delete<ApiResponse<{ id: string }>>(
    `/products/${id}`,
  );
  return res.data;
}
