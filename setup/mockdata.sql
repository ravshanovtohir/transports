insert into branches (branche_name, branche_address) values
('Toshkent', 'Chilonzor 19 kvartal'),
('Farg''ona', 'Qo''qon shaxri'),
('Namangan', 'Pop shaxri')
;

insert into staffs (staff_name, staff_password, staff_birth_date, staff_is_root, branche_id) values
('Diyor ROOT', '00d42ecf79030ed5f742c39f4dad62758958ca4ebee19087f158b8e7afe417bc', '03.08.2004', true, 1),
('Jakhongir', '066222555a21281d74e6748bc3346b324cc186e0b516dac147220a56b26d1b4a', '05.08.2002', false, 2),
('Burkhon', '2d7131d579fe6bba15bf6ec86efedf6c5dff3adeb53cceb11286589c6288220b', '03.08.1998', false, 3)
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

insert into permissions_staffs(staff_create, staff_read, staff_update, staff_delete, branch_id, staff_id) values 
(true, true, true, true, 1, 1),
(false, false, false, false, 2, 2),
(false, true, false, false, 3, 3);