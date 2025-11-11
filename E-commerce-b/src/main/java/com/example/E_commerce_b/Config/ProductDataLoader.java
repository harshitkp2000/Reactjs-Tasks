package com.example.E_commerce_b.Config;

import com.example.E_commerce_b.Entity.Product;
import com.example.E_commerce_b.Repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductDataLoader implements CommandLineRunner {

    private final ProductRepository productRepository;

    public ProductDataLoader(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        if (productRepository.count() == 0) {
            List<Product> products = List.of(
                    new Product("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                            "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches)...",
                            109.95, 120, 3.9,
                            "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
                            "men's clothing", 50),

                    new Product( "Mens Casual Premium Slim Fit T-Shirts ",
                            "Slim-fitting style, contrast raglan long sleeve, three-button henley placket...",
                            22.3, 259, 4.1,
                            "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
                            "men's clothing", 40),

                    new Product( "Mens Cotton Jacket",
                            "Great outerwear jackets for Spring/Autumn/Winter...",
                            55.99, 500, 4.7,
                            "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
                            "men's clothing", 30),

                    new Product( "Mens Casual Slim Fit",
                            "The color could be slightly different between on the screen and in practice...",
                            15.99, 430, 2.1,
                            "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png",
                            "men's clothing", 25),

                    new Product( "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
                            "From our Legends Collection, the Naga was inspired by the mythical water dragon...",
                            695.0, 400, 4.6,
                            "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
                            "jewelery", 15),

                    new Product( "Solid Gold Petite Micropave ",
                            "Satisfaction Guaranteed. Return or exchange any order within 30 days.",
                            168.0, 70, 3.9,
                            "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png",
                            "jewelery", 20),

                    new Product( "White Gold Plated Princess",
                            "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her.",
                            9.99, 400, 3.0,
                            "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png",
                            "jewelery", 40),

                    new Product( "Pierced Owl Rose Gold Plated Stainless Steel Double",
                            "Rose Gold Plated Double Flared Tunnel Plug Earrings.",
                            10.99, 100, 1.9,
                            "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png",
                            "jewelery", 35),

                    new Product( "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
                            "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance...",
                            64.0, 203, 3.3,
                            "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png",
                            "electronics", 60),

                    new Product( "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
                            "Easy upgrade for faster boot up, shutdown, application load and response...",
                            109.0, 470, 2.9,
                            "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png",
                            "electronics", 80),

                    new Product( "Silicon Power 256GB SSD 3D NAND A55",
                            "3D NAND flash are applied to deliver high transfer speeds...",
                            109.0, 319, 4.8,
                            "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png",
                            "electronics", 55),

                    new Product( "WD 4TB Gaming Drive Works with Playstation 4",
                            "Expand your PS4 gaming experience, Play anywhere Fast and easy setup...",
                            114.0, 400, 4.8,
                            "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png",
                            "electronics", 90),

                    new Product( "Acer SB220Q bi 21.5 inches Full HD",
                            "21.5 inches Full HD (1920 x 1080) widescreen IPS display...",
                            599.0, 250, 2.9,
                            "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png",
                            "electronics", 20),

                    new Product( "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor",
                            "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR...",
                            999.99, 140, 2.2,
                            "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_t.png",
                            "electronics", 10),

                    new Product( "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
                            "Note: The Jacket is US standard size, Please choose size as your usual wear.",
                            56.99, 235, 2.6,
                            "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png",
                            "women's clothing", 40),

                    new Product( "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
                            "100% POLYURETHANE(shell) 100% POLYESTER(lining)...",
                            29.95, 340, 2.9,
                            "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png",
                            "women's clothing", 50),

                    new Product( "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
                            "Lightweight perfect for trip or casual wear...",
                            39.99, 679, 3.8,
                            "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png",
                            "women's clothing", 65),

                    new Product( "MBJ Women's Solid Short Sleeve Boat Neck V ",
                            "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach...",
                            9.85, 130, 4.7,
                            "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png",
                            "women's clothing", 70),

                    new Product( "Opna Women's Short Sleeve Moisture",
                            "100% Polyester, Machine wash, Pre Shrunk for a Great Fit...",
                            7.95, 146, 4.5,
                            "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_t.png",
                            "women's clothing", 35),

                    new Product( "DANVOUY Womens T Shirt Casual Cotton Short",
                            "95%Cotton,5%Spandex, Casual Short Sleeve V-Neck Fashion Tees...",
                            12.99, 145, 3.6,
                            "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png",
                            "women's clothing", 30)
            );




            productRepository.saveAll(products);
            System.out.println("✅ Inserted " + products.size() + " products into database.");
        }
    }
}