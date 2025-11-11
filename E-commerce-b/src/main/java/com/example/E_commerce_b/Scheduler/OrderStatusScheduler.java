package com.example.E_commerce_b.Scheduler;

import com.example.E_commerce_b.Entity.Orders;
import com.example.E_commerce_b.Enum.OrderStatus;
import com.example.E_commerce_b.Repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class OrderStatusScheduler {

    private final OrdersRepository ordersRepository;
    @Autowired
    public OrderStatusScheduler(OrdersRepository ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

    // Runs every minute
    @Scheduled(fixedRate = 60000)
    public void updateDeliveredOrders() {
        List<Orders> pendingOrders = ordersRepository.findByStatus(OrderStatus.PENDING);

        for (Orders order : pendingOrders) {
            if (order.getDeliveredTime().isBefore(LocalDateTime.now())) {
                order.setStatus(OrderStatus.DELIVERED);
                ordersRepository.save(order);
                System.out.println("Order #" + order.getOrderId() + " marked as DELIVERED");
            }
        }
    }
}
