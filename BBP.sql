-- Drop and create the database
DROP DATABASE IF EXISTS BBP;
CREATE DATABASE BBP;
USE BBP;

-- Create Users table
CREATE TABLE Users (
    user_id VARCHAR(10) NOT NULL,
    username VARCHAR(20) NOT NULL,
    password NVARCHAR(255) NOT NULL,
    first_name NVARCHAR(50),
    last_name NVARCHAR(50),
    email NVARCHAR(50),
    phone VARCHAR(10),
    avatar_link NVARCHAR(100),
    role VARCHAR(10),
    PRIMARY KEY (user_id)
);

-- Create TableType table
CREATE TABLE TableType (
    table_type_id VARCHAR(10) NOT NULL,
    type_name NVARCHAR(50) NOT NULL,
    type_description NVARCHAR(255),
    PRIMARY KEY (table_type_id)
);

-- Create Booking table
CREATE TABLE Booking (
    booking_id VARCHAR(10) NOT NULL,
    customer_id VARCHAR(10) NOT NULL,
    club_id VARCHAR(10) NOT NULL,
    club_staff_id VARCHAR(10) NOT NULL,
    booking_status_id VARCHAR(10) NOT NULL,
    book_date DATETIME,
    PRIMARY KEY (booking_id)
);

-- Create Price table
CREATE TABLE Price (
    table_type_id VARCHAR(10) NOT NULL,
    club_id VARCHAR(10) NOT NULL,
    slot_id VARCHAR(10) NOT NULL,
    price INT,
    PRIMARY KEY (table_type_id, club_id, slot_id)
);

-- Create District table
CREATE TABLE District (
    district_id VARCHAR(10) NOT NULL,
    district_name NVARCHAR(50) NOT NULL,
    PRIMARY KEY (district_id)
);

-- Create Club table
CREATE TABLE Club (
    club_id VARCHAR(10) NOT NULL,
    club_name NVARCHAR(50) NOT NULL,
    address NVARCHAR(100) NOT NULL,
    district_id VARCHAR(10) NOT NULL,
    fanpage_link NVARCHAR(50),
    avatar_link NVARCHAR(50) NOT NULL,
    open_time TIME,
    close_time TIME,
    email VARCHAR(30),
    phone VARCHAR(10),
    PRIMARY KEY (club_id)
);

-- Create ClubStaff table
CREATE TABLE ClubStaff (
    staff_id VARCHAR(10) NOT NULL,
    club_id VARCHAR(10) NOT NULL,
    PRIMARY KEY (staff_id, club_id),
);

-- Create Review table
CREATE TABLE Review (
    review_id VARCHAR(10) NOT NULL,
    booking_id VARCHAR(10) NOT NULL,
    star INT NOT NULL,
    comment NVARCHAR(255),
    PRIMARY KEY (review_id)
);

-- Create BookingDetailStatus table
CREATE TABLE BookingStatus (
    booking_status_id VARCHAR(10) NOT NULL,
    status NVARCHAR(20) NOT NULL,
    PRIMARY KEY (booking_status_id)
);

-- Create Table (Table is a reserved keyword, so we use square brackets)
CREATE TABLE [Table] (
    table_id VARCHAR(10) NOT NULL,
    table_type_id VARCHAR(10) NOT NULL,
    club_id VARCHAR(10) NOT NULL,
    is_available BIT,
    PRIMARY KEY (table_id)
);

-- Create BookingDetail table
CREATE TABLE BookingDetail (
    booking_detail_id VARCHAR(10) NOT NULL,
    booking_id VARCHAR(10) NOT NULL,
    slot_id VARCHAR(10) NOT NULL,
    table_id VARCHAR(10) NOT NULL,
    price INT,
    status_id VARCHAR(10) NOT NULL,
    book_date DATE,
    PRIMARY KEY (booking_detail_id)
);

-- Create Slot table
CREATE TABLE Slot (
    slot_id VARCHAR(10) NOT NULL,
    start_time INT,
    end_time INT,
    PRIMARY KEY (slot_id)
);

-------------------------------------------------------------------------------------------------------------------------

-- Define foreign keys
-- Review FK
ALTER TABLE Review
ADD CONSTRAINT FK_Review_BookingId FOREIGN KEY (booking_id) REFERENCES Booking(booking_id);

-- BookingDetail FK
ALTER TABLE BookingDetail
ADD CONSTRAINT FK_BookingDetail_BookingId FOREIGN KEY (booking_id) REFERENCES Booking(booking_id);

ALTER TABLE BookingDetail
ADD CONSTRAINT FK_BookingDetail_SlotId FOREIGN KEY (slot_id) REFERENCES Slot(slot_id);

ALTER TABLE BookingDetail
ADD CONSTRAINT FK_BookingDetail_TableId FOREIGN KEY (table_id) REFERENCES [Table](table_id);

-- Table FK
ALTER TABLE [Table]
ADD CONSTRAINT FK_Table_TableTypeId FOREIGN KEY (table_type_id) REFERENCES TableType(table_type_id);

ALTER TABLE [Table]
ADD CONSTRAINT FK_Table_ClubId FOREIGN KEY (club_id) REFERENCES Club(club_id);

-- Club FK
ALTER TABLE Club
ADD CONSTRAINT FK_Club_DistrictId FOREIGN KEY (district_id) REFERENCES District(district_id);

-- Price FK
ALTER TABLE Price
ADD CONSTRAINT FK_Price_TableTypeId FOREIGN KEY (table_type_id) REFERENCES TableType(table_type_id);

ALTER TABLE Price
ADD CONSTRAINT FK_Price_ClubId FOREIGN KEY (club_id) REFERENCES Club(club_id);

ALTER TABLE Price
ADD CONSTRAINT FK_Price_SlotId FOREIGN KEY (slot_id) REFERENCES Slot(slot_id);

-- ClubStaff FK
ALTER TABLE ClubStaff
ADD CONSTRAINT FK_ClubStaff_ClubId FOREIGN KEY (club_id) REFERENCES Club(club_id);

ALTER TABLE ClubStaff
ADD CONSTRAINT FK_ClubStaff_UserId FOREIGN KEY (staff_id) REFERENCES Users(user_id);


-------------------------------------------------------------------------------------------------------------------------

-- Sample Data Inserts

-- District Table
INSERT INTO District (district_id, district_name)
VALUES
('1', 'Downtown'),
('2', 'Suburb');

-- Users Table
INSERT INTO Users (user_id, username, password, first_name, last_name, email, phone, avatar_link, role)
VALUES
('1', 'john_doe', 'password123', 'John', 'Doe', 'john.doe@email.com', '1234567890', 'avatar1.jpg', 'customer'),
('2', 'jane_smith', 'pass456', 'Jane', 'Smith', 'jane.smith@email.com', '9876543210', 'avatar2.jpg', 'customer'),
('3', 'admin_user', 'adminpass', 'Admin', 'User', 'admin.user@email.com', '5555555555', 'admin_avatar.jpg', 'admin'),
('4', 'A1_staff', 'staff1', 'staff', 'Staff1', 'staff1.user@email.com', '5555555555', 'staff1_avatar.jpg', 'staff'),
('5', 'B2_staff', 'staff2', 'staff', 'Staff2', 'staff2.user@email.com', '5555555555', 'staff2_avatar.jpg', 'staff');

-- TableType Table
INSERT INTO TableType (table_type_id, type_name, type_description)
VALUES
('1', 'Regular', 'Standard table'),
('2', 'VIP', 'VIP table with special features');

-- Club Table
INSERT INTO Club (club_id, club_name, address, district_id, fanpage_link, avatar_link, open_time, close_time, email, phone)
VALUES
('A1', 'Club A', '123 Main St, Downtown', '1', 'facebook.com/clubA', 'clubA_avatar.jpg', '18:00:00', '02:00:00', 'clubA@email.com', '1112223333'),
('B2', 'Club B', '456 Elm St, Suburb', '2', 'facebook.com/clubB', 'clubB_avatar.jpg', '19:00:00', '03:00:00', 'clubB@email.com', '4445556666');

-- Booking Table
INSERT INTO Booking (booking_id, customer_id, club_id, club_staff_id, booking_status_id, book_date)
VALUES
('101', '1', 'A1', '3', '1', '2023-10-19 14:30:00'),
('102', '2', 'B2', '3', '1', '2023-10-20 20:00:00'),
('103', '1', 'B2', '3', '2', '2023-10-22 18:15:00');

-- Slot Table
INSERT INTO Slot (slot_id, start_time, end_time)
VALUES
('1', 18, 21),
('2', 21, 24);

-- Price Table
INSERT INTO Price (table_type_id, club_id, slot_id, price)
VALUES
('1', 'A1', '1', 50),
('1', 'A1', '2', 60),
('2', 'A1', '1', 100),
('1', 'B2', '1', 45),
('2', 'B2', '1', 90);

-- Review Table
INSERT INTO Review (review_id, booking_id, star, comment)
VALUES
('201', '101', 4, 'Great experience!'),
('202', '102', 5, 'Amazing club!'),
('203', '101', 3, 'Service could be better');

-- BookingStatus Table
INSERT INTO BookingStatus (booking_status_id, status)
VALUES
('1', 'Confirmed'),
('2', 'Cancelled'),
('3', 'Pending');

-- Table (Table is a reserved keyword, so we use square brackets) Table
INSERT INTO [Table] (table_id, table_type_id, club_id, is_available)
VALUES
('T1', '1', 'A1', 1),
('T2', '1', 'A1', 0),
('T3', '2', 'A1', 1),
('T4', '1', 'B2', 1);

-- BookingDetail Table
INSERT INTO BookingDetail (booking_detail_id, booking_id, slot_id, table_id, price, status_id, book_date)
VALUES
('301', '101', '1', 'T1', 50, '1', '2023-10-19'),
('302', '102', '2', 'T2', 60, '1', '2023-10-20'),
('303', '103', '1', 'T3', 100, '1', '2023-10-22'),
('304', '103', '2', 'T4', 45, '1', '2023-10-22');

-- ClubStaff Table
INSERT INTO ClubStaff (staff_id, club_id)
VALUES
('4', 'A1'),
('4', 'B2');
