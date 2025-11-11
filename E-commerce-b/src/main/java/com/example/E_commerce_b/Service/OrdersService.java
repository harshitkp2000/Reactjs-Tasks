package com.example.E_commerce_b.Service;

import com.example.E_commerce_b.Entity.Orders;

import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface OrdersService {
 Orders placeOrder( Orders order);
 List<Orders> getAllOrders();
    Orders getOrderById(Long id);
    Orders cancelOrder(Long id);
}
