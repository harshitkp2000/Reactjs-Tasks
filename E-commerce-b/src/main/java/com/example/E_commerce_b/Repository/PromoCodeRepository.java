package com.example.E_commerce_b.Repository;

import com.example.E_commerce_b.Entity.PromoCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PromoCodeRepository extends JpaRepository<PromoCode,String>{

}
