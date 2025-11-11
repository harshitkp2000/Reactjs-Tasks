package com.example.E_commerce_b.Config;

import com.example.E_commerce_b.Entity.PromoCode;
import com.example.E_commerce_b.Repository.PromoCodeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class PromoCodeDataLoader implements CommandLineRunner {

    private final PromoCodeRepository promoCodeRepository;

    public PromoCodeDataLoader(PromoCodeRepository promoCodeRepository) {
        this.promoCodeRepository = promoCodeRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        if (promoCodeRepository.count() == 0) {
            List<PromoCode> promoCodes = List.of(
                    new PromoCode("NEWUSER10", 10, LocalDateTime.now().plusMonths(3)),
                    new PromoCode("SUMMER20", 20, LocalDateTime.now().plusMonths(2)),
                    new PromoCode("WINTER15", 15, LocalDateTime.now().minusMonths(1)), // expired
                    new PromoCode("FESTIVE25", 25, LocalDateTime.now().plusMonths(3).plusDays(10)),
                    new PromoCode("OLDDEAL5", 5, LocalDateTime.now().minusMonths(2)) // expired
            );



            promoCodeRepository.saveAll(promoCodes);

        }
    }
}