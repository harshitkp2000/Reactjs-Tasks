package com.example.E_commerce_b.Entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "order_items")
public class OrderItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;
    private String image;
    private String category;
    private Long productId;
    private String title;
    private Double price;
    private Integer quantity;
}
