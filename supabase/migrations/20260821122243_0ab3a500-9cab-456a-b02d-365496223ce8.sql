
-- Add initial demo cars to the stock table so the user sees data immediately
INSERT INTO public.cars (brand, model, spec, image_url, description)
VALUES 
('Mercedes-Benz', 'S 580 4MATIC', '2024 · Новый · Германия', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop', 'Максимальная комплектация, пакет AMG Line, панорамная крыша, Burmester 4D.'),
('BMW', 'X7 M60i', '2024 · Новый · ОАЭ', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop', 'Спортивный кроссовер в цвете Frozen Black. Полный пакет ассистентов, 6 мест.'),
('Porsche', 'Cayenne Coupé GTS', '2023 · 5,000 км · Германия', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop', 'Идеальное состояние, один владелец. Спортивная выхлопная система, пакет Sport Design.');
