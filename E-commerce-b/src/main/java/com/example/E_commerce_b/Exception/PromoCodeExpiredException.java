package com.example.E_commerce_b.Exception;

public class PromoCodeExpiredException extends RuntimeException {
    public PromoCodeExpiredException(String message) {
        super(message);
    }
}
