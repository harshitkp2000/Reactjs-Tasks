package com.example.E_commerce_b.Entity;

import com.example.E_commerce_b.Enum.OrderStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "orders")
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
    private List<OrderItems> orderItems = new ArrayList<>();

    private Double totalAmount;
    private Double discount;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private String address;

    private LocalDateTime placedTime;
    private LocalDateTime deliveredTime;
}