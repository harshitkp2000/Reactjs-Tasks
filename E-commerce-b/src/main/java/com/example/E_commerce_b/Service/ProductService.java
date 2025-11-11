package com.example.E_commerce_b.Service;

import com.example.E_commerce_b.Entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Product getProductById(Long id);
    List<Product> getProductByCategory(String name,Long id);
}