package com.example.E_commerce_b.Service;

import com.example.E_commerce_b.Entity.Product;
import com.example.E_commerce_b.Exception.InvalidIdException;
import com.example.E_commerce_b.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service

public class ProductServiceImpl implements  ProductService{
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new InvalidIdException("Invalid product ID: " + id));
    }

    @Override
    public List<Product> getProductByCategory(String category,Long id) {
        List<Product> suggestedProducts = productRepository.findAll().stream().filter((a) -> (a.getCategory().toLowerCase().equals(category.toLowerCase())) && (id != a.getId())).collect(Collectors.toList());
        return suggestedProducts;
    }


}
