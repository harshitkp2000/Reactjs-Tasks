package com.example.E_commerce_b.Repository;

import com.example.E_commerce_b.Entity.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemsRepository extends JpaRepository<OrderItems, Long> {
}
