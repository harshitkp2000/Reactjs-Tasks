package com.example.E_commerce_b.Controllers;

import com.example.E_commerce_b.Entity.Product;
import com.example.E_commerce_b.Service.ProductService;
import com.example.E_commerce_b.Service.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }
    @GetMapping("/category/{id}")
    public ResponseEntity<List<Product>> getProductByCategory(@RequestParam String category,@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductByCategory(category,id));
    }

}
