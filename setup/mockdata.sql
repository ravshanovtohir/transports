insert into branches (branche_name, branche_address) values
('Toshkent', 'Chilonzor 19 kvartal'),
('Farg''ona', 'Qo''qon shaxri'),
('Namangan', 'Pop shaxri')
;


insert into staffs (staff_name, staff_password, staff_birth_date, staff_is_root, branche_id) values
('Diyor ROOT', 'diyor1', '03.08.2004', true, 1),
('Jakhongir', 'jakhongir1', '05.08.2002', false, 2),
('Burkhon', 'burkhon1', '03.08.1998', false, 3)
;


insert into transports (transport_name, transport_model, transport_color, transport_img, branche_id, staff_id) values
('Chevrolet', 'Nexia 3', 'White', 'nexia.jpg', 1, 1),
('Chevrolet', 'Gentra', 'Black', 'genrta.jpg', 1, 1),
('Chevrolet', 'Cobalt', 'Black', 'cobalt.jpg', 2, 2),
('Chevrolet', 'Spark', 'red', 'spark.jpg', 3, 3)
;

insert into permissions_transports (transport_create, transport_read, transport_delete, transport_update, branche_id, staff_id) values
(true, true, true, true, 1, 1),
(false, false, false, false, 1, 2),
(true, true, false, false, 3, 3)
;

insert into permissions_branches (branche_create, branche_read, branche_delete, branche_update, branche_id, staff_id) values
(true, true, true, true, 1, 1),
(false, false, false, false, 1, 2),
(false, true, false, false, 3, 3)
;