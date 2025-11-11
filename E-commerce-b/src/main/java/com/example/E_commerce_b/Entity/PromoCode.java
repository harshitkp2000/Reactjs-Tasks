package com.example.E_commerce_b.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@Table(name = "promocode")
public class PromoCode {
    @Id
    private String promocode;
    private int discountPercentage;
    private LocalDateTime validityDate;
    protected PromoCode() {}

}
