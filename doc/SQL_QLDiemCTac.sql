use master
go
if exists(select *from sysdatabases where name='QL_CTAC_GIANGVIEN')
drop database QL_CTAC_GIANGVIEN
go



create database QL_CTAC_GIANGVIEN
go
use QL_CTAC_GIANGVIEN
go

-- loại công việc
create table sys_loai_cong_viec(
id  int IDENTITY (1, 1)  primary key,
ten_loai_cong_viec nvarchar(128),
--người tạo
create_by nvarchar(128),
--thời gian tạo
create_date datetime,
--người cập nhập
update_by nvarchar(128),
--ngày cập nhập
update_date datetime,
--1 đang sử dụng 2 ngưng sử dụng
status_del int,
note nvarchar(128)
)
go
-- công việc
create table sys_cong_viec(
id nvarchar(128)  primary key,
ten_cong_viec nvarchar(128),
id_loai_cong_viec  int,
gio_bat_dau datetime,
gio_ket_thuc datetime,
--người tạo
create_by nvarchar(128),
--thời gian tạo
create_date datetime,
--người cập nhập
update_by nvarchar(128),
--ngày cập nhập
update_date datetime,
--1 đang sử dụng 2 ngưng sử dụng
status_del int,
--1 sắp diễn ra 2 đã kết thúc 3 đang diễn ra
trang_thai int,
note nvarchar(128),
CONSTRAINT fk_sys_loai_cong_viec FOREIGN KEY(id_loai_cong_viec) REFERENCES sys_loai_cong_viec(id)
)
go
-- chức vụ
create table sys_chuc_vu(
id int IDENTITY (1, 1)  primary key,
ten_chuc_vu nvarchar(128),
--người tạo
create_by nvarchar(128),
--thời gian tạo
create_date datetime,
--người cập nhập
update_by nvarchar(128),
--ngày cập nhập
update_date datetime,
--1 đang sử dụng 2 ngưng sử dụng
status_del int,
note nvarchar(128)

)
go
-- bộ môn
create table sys_bo_mon(
id int IDENTITY (1, 1)  primary key,
ten_bo_mon nvarchar(128),
--người tạo
create_by nvarchar(128),
--thời gian tạo
create_date datetime,
--người cập nhập
update_by nvarchar(128),
--ngày cập nhập
update_date datetime,
--1 đang sử dụng 2 ngưng sử dụng
status_del int,
note nvarchar(128)

)
go
-- khoa 
-- ví dụ : khoa công nghệ thông tin
create table sys_khoa(
id  int IDENTITY (1, 1)  primary key,
ten_khoa nvarchar(128),
--người tạo
create_by nvarchar(128),
--thời gian tạo
create_date datetime,
--người cập nhập
update_by nvarchar(128),
--ngày cập nhập
update_date datetime,
--1 đang sử dụng 2 ngưng sử dụng
status_del int,
note nvarchar(128)

)
go
-- các hoạt động
create table sys_hoat_dong(
id  int IDENTITY (1, 1)  primary key,
ten_hoat_dong nvarchar(128),
--người tạo
create_by nvarchar(128),
--thời gian tạo
create_date datetime,
--người cập nhập
update_by nvarchar(128),
--ngày cập nhập
update_date datetime,
--1 đang sử dụng 2 ngưng sử dụng
status_del int,
note nvarchar(128)

)
go
-- giảng viên
create table sys_giang_vien(
id  nvarchar(128)  primary key,
id_chuc_vu int,
id_khoa int,
ten_giang_vien nvarchar(128),
ma_giang_vien nvarchar(128),
sdt nvarchar(128),
email nvarchar(128),
dia_chi nvarchar(500),
ngay_sinh  datetime ,
username nvarchar(128),
pass_word nvarchar(128),
--người tạo
create_by nvarchar(128),
--thời gian tạo
create_date datetime,
--người cập nhập
update_by nvarchar(128),
--ngày cập nhập
update_date datetime,

--1 đang sử dụng 2 ngưng sử dụng
status_del int,
note nvarchar(128),

CONSTRAINT fk_sys_chuc_vu FOREIGN KEY(id_chuc_vu) REFERENCES sys_chuc_vu(id),
CONSTRAINT fk_sys_khoa FOREIGN KEY(id_khoa) REFERENCES sys_khoa(id),

)
go
--Cập nhật  các giảng viên 
create table sys_cap_nhat_tt_giang_vien(
id inT IDENTITY(1,1)  primary key,
id_giang_vien nvarchar(128),
ten_giang_vien nvarchar(128),
sdt nvarchar(128),
email nvarchar(128),
dia_chi nvarchar(500),
ngay_sinh  datetime ,
--người tạo
create_by nvarchar(128),
--thời gian tạo
create_date datetime,
--người cập nhập
update_by nvarchar(128),
--ngày cập nhập
update_date datetime,
--1 đang sử dụng 2 ngưng sử dụng
status_del int,
--1 đã hoàn thành 2 chưa hoàn thành
trang_thai int,
note nvarchar(128),

CONSTRAINT fk_sys_giang_vien1 FOREIGN KEY(id_giang_vien) REFERENCES sys_giang_vien(id),

)
go
-- các hoạt động mà giảng viên đó tham gia
create table sys_hoat_dong_giang_vien(
id   nvarchar(128)  primary key,
id_giang_vien nvarchar(128),
id_hoat_dong int,
--người tạo
create_by nvarchar(128),
--thời gian tạo
create_date datetime,
--người cập nhập
update_by nvarchar(128),
--ngày cập nhập
update_date datetime,
--1 đang sử dụng 2 ngưng sử dụng
status_del int,
note nvarchar(128),
CONSTRAINT fk_sys_giang_vien2 FOREIGN KEY(id_giang_vien) REFERENCES sys_giang_vien(id),
CONSTRAINT fk_sys_hoat_dong FOREIGN KEY(id_hoat_dong) REFERENCES sys_hoat_dong(id),

)
go
-- các bộ môn mà giảng viên đang dạy
create table sys_bo_mon_giang_vien(
id   int IDENTITY (1, 1)  primary key,
id_giang_vien nvarchar(128),
id_bo_mon int,
--người tạo
create_by nvarchar(128),
--thời gian tạo
create_date datetime,
--người cập nhập
update_by nvarchar(128),
--ngày cập nhập
update_date datetime,
--1 đang sử dụng 2 ngưng sử dụng
status_del int,
note nvarchar(128),

CONSTRAINT fk_sys_bo_mon FOREIGN KEY(id_bo_mon) REFERENCES sys_bo_mon(id),
CONSTRAINT fk_sys_giang_vien3 FOREIGN KEY(id_giang_vien) REFERENCES sys_giang_vien(id),


)
go

-- công việc ngoài giờ của giảng viên
create table sys_cong_viec_giang_vien(
id  nvarchar(128)  primary key,
id_giang_vien nvarchar(128),
id_cong_viec nvarchar(128) ,
--số giờ bằng số giờ bắt đầu trừ số giờ kết thúc
so_gio int,
--người tạo
create_by nvarchar(128),
--thời gian tạo
create_date datetime,
--người cập nhập
update_by nvarchar(128),
--ngày cập nhập
update_date datetime,
--1 đang sử dụng 2 ngưng sử dụng
status_del int,
note nvarchar(128),

CONSTRAINT fk_sys_giang_vien4 FOREIGN KEY(id_giang_vien) REFERENCES sys_giang_vien(id),
CONSTRAINT fk_sys_cong_viec FOREIGN KEY(id_cong_viec) REFERENCES sys_cong_viec(id)

)
go
-- kỳ trực khoa
--ví dụ : kì 10_2022 => tháng 10 năm 2022 với thời gian bắt đầu là từ ngày 1/10/2022 đến thời gian kết thúc là 31/10/2022
create table sys_ky_truc_khoa(
id  int IDENTITY (1, 1)  primary key,
ten_ky nvarchar(128),
thoi_gian_bat_dau datetime,
thoi_gian_ket_thuc datetime,
--người tạo
create_by nvarchar(128),
--thời gian tạo
create_date datetime,
--người cập nhập
update_by nvarchar(128),
--ngày cập nhập
update_date datetime,
--1 đang sử dụng 2 ngưng sử dụng
status_del int,
note nvarchar(128),

)
go

-- phòng trực
-- ví dụ khoa công nghệ thông tin ở phòng B101 với tên phòng là khoa công nghệ thông tin
create table sys_phong_truc(
id int IDENTITY(1,1)  primary key,
ten_phong_truc nvarchar(128),
so_phong nvarchar(128),
--người tạo
create_by nvarchar(128),
--thời gian tạo
create_date datetime,
--người cập nhập
update_by nvarchar(128),
--ngày cập nhập
update_date datetime,
--1 đang sử dụng 2 ngưng sử dụng
status_del int,
note nvarchar(128),

)
go
--lấy danh sách các giảng viên được phân công trực khoa
create table sys_giang_vien_truc_khoa(
id inT IDENTITY(1,1)  primary key,
id_giang_vien nvarchar(128),
id_phong_truc int,
id_ky_truc int,
--người tạo
create_by nvarchar(128),
--thời gian tạo
create_date datetime,
--người cập nhập
update_by nvarchar(128),
--ngày cập nhập
update_date datetime,
--1 đang sử dụng 2 ngưng sử dụng
status_del int,
--1 đã hoàn thành 2 chưa hoàn thành
trang_thai int,
note nvarchar(128),

CONSTRAINT fk_sys_giang_vien5 FOREIGN KEY(id_giang_vien) REFERENCES sys_giang_vien(id),
CONSTRAINT fk_sys_phong_truc FOREIGN KEY(id_phong_truc) REFERENCES sys_phong_truc(id),
CONSTRAINT fk_sys_ky_truc_khoa FOREIGN KEY(id_ky_truc) REFERENCES sys_ky_truc_khoa(id),

)
go


--Thong bao thong tin
create table sys_thong_bao(
id inT IDENTITY(1,1)  primary key,
id_giang_vien nvarchar(128),
id_ref nvarchar(128),
id_type int,
--người tạo
create_by nvarchar(128),
--thời gian tạo
create_date datetime,
--người cập nhập
update_by nvarchar(128),
--ngày cập nhập
update_date datetime,
--1 đã hoàn thành 2 chưa hoàn thành
trang_thai int,
--1 đang sử dụng 2 ngưng sử dụng
status_del int,
note nvarchar(128),

)
go