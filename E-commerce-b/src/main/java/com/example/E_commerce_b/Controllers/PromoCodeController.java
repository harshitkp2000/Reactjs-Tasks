package com.example.E_commerce_b.Controllers;

import com.example.E_commerce_b.Entity.PromoCode;
import com.example.E_commerce_b.Service.PromoCodeService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/promocode")
public class PromoCodeController {

    @Autowired
    private PromoCodeService promoCodeService;

    @GetMapping("/{promo}")
    public ResponseEntity<PromoCode> getPromoCodes(@PathVariable String promo){
        return ResponseEntity.ok(promoCodeService.getPromoCodes(promo));
    }
}
