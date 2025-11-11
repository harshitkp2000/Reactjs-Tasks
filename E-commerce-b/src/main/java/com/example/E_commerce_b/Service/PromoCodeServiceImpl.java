package com.example.E_commerce_b.Service;

import com.example.E_commerce_b.Entity.PromoCode;
import com.example.E_commerce_b.Exception.PromoCodeExpiredException;
import com.example.E_commerce_b.Exception.PromoCodeNotFoundException;
import com.example.E_commerce_b.Repository.PromoCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PromoCodeServiceImpl implements PromoCodeService {
    @Autowired
    private PromoCodeRepository promoCodeRepository;

    @Override
    public PromoCode getPromoCodes(String promo) {
        PromoCode promoCode = promoCodeRepository.findById(promo)
                .orElseThrow(() -> new PromoCodeNotFoundException("Invalid promo code: " + promo));

        if (promoCode.getValidityDate().isBefore(LocalDateTime.now())) {
            throw new PromoCodeExpiredException("Promo code expired: " + promo);
        }

        return promoCode;
    }

    }

