package com.example.E_commerce_b.Service;

import com.example.E_commerce_b.Entity.Orders;
import com.example.E_commerce_b.Enum.OrderStatus;
import com.example.E_commerce_b.Exception.InvalidIdException;
import com.example.E_commerce_b.Repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrdersServiceImpl implements OrdersService {
    @Autowired
    private OrdersRepository ordersRepository;

    @Override
    public Orders placeOrder(Orders order) {
        order.setPlacedTime(LocalDateTime.now());
        order.setDeliveredTime(order.getPlacedTime().plusMinutes(1));
        order.setStatus(OrderStatus.PENDING);

        return ordersRepository.save(order);
    }

    @Override
    public List<Orders> getAllOrders() {
        return ordersRepository.findAll();
    }

    @Override
    public Orders getOrderById(Long id) {
        return ordersRepository.findById(id)
                .orElseThrow(() -> new InvalidIdException("Order with ID " + id + " not found"));
    }

    @Override
    public Orders cancelOrder(Long id) {
        Orders order = ordersRepository.findById(id)
                .orElseThrow(() -> new InvalidIdException("Order with ID " + id + " not found"));

        if (order.getStatus() == OrderStatus.DELIVERED) {
            throw new IllegalStateException("Delivered orders cannot be cancelled");
        }

        order.setStatus(OrderStatus.CANCELLED);
        return ordersRepository.save(order);
    }

}
