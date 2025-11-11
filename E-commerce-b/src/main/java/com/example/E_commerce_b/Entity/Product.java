package com.example.E_commerce_b.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Generated;

@Entity
@Data
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private Double price;
    private Integer count;
    private Double rate;
    private String image;
    private String category;
    private Integer stock;

    protected Product() {}

    public Product(String s, String s1, double v, int i, double v1, String url, String s2, int i1) {
        this.title = s;
        this.description = s1;
        this.price = v;
        this.count = i1;
        this.rate = v1;
        this.image = url;
        this.category = s2;
        this.stock = i1;

    }
}
