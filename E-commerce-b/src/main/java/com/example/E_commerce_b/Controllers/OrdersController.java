package com.example.E_commerce_b.Controllers;

import com.example.E_commerce_b.Entity.Orders;
import com.example.E_commerce_b.Exception.InvalidIdException;
import com.example.E_commerce_b.Service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrdersController {
    @Autowired
    private OrdersService ordersService;

    @PostMapping("/place")
    public ResponseEntity<Orders> placeOrder(@RequestBody Orders order) {
        return ResponseEntity.ok(ordersService.placeOrder(order));
    }


    @GetMapping
    public ResponseEntity<List<Orders>> getAllOrders() {
        return ResponseEntity.ok(ordersService.getAllOrders());
    }


    @GetMapping("/{id}")
    public ResponseEntity<Orders> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(ordersService.getOrderById(id))    ;
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelOrder(@PathVariable Long id) {
        try {
            Orders cancelledOrder = ordersService.cancelOrder(id);
            System.out.println("Inside cancelOrder controller for ID: " + id);
            return ResponseEntity.ok(cancelledOrder);
        } catch (InvalidIdException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Something went wrong");
        }
    }
}
