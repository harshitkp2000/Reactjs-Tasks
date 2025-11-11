package com.example.E_commerce_b.Repository;

import com.example.E_commerce_b.Entity.Orders;
import com.example.E_commerce_b.Enum.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders,Long> {
    List<Orders> findByStatus(OrderStatus status);
}
