-- Drop and create the database
DROP DATABASE IF EXISTS BBP;
CREATE DATABASE BBP;
USE BBP;

-- Create Users table  
CREATE TABLE Users (
  userId INT NOT NULL,
  username VARCHAR(255) NOT NULL, 
  password NVARCHAR(255) NOT NULL,
  firstName NVARCHAR(255),
  lastName NVARCHAR(255),
  email NVARCHAR(255),
  phone VARCHAR(255),
  avatarLink NVARCHAR(255),
  role VARCHAR(255),
  PRIMARY KEY (userId)
);

-- Create TableType table
CREATE TABLE TableType (
  tableTypeId INT NOT NULL,
  typeName NVARCHAR(255) NOT NULL,
  typeDescription NVARCHAR(255),
  PRIMARY KEY (tableTypeId)
);

-- Create Booking table
CREATE TABLE Booking (
  bookingId INT NOT NULL,
  customerId INT NOT NULL,
  clubId INT NOT NULL,
  clubStaffId INT NOT NULL,
  bookingStatusId INT NOT NULL,
  reviewId INT NOT NULL,
  bookDate DATETIME,
  PRIMARY KEY (bookingId)
);

-- Create Price table  
CREATE TABLE Price (
  tableTypeId INT NOT NULL,
  clubId INT NOT NULL,
  slotId INT NOT NULL,
  price INT,
  PRIMARY KEY (tableTypeId, clubId, slotId)
);

-- Create District table
CREATE TABLE District (
  districtId INT NOT NULL,
  districtName NVARCHAR(255) NOT NULL,
  PRIMARY KEY (districtId)
);

-- Create Club table
CREATE TABLE Club (
  clubId INT NOT NULL,
  clubName NVARCHAR(255) NOT NULL,
  address NVARCHAR(255) NOT NULL,
  districtId INT NOT NULL,
  fanpageLink NVARCHAR(255),
  avatarLink NVARCHAR(255) NOT NULL,
  openTime INT,
  closeTime INT,
  email VARCHAR(255),
  phone VARCHAR(255),
  status bit,
  PRIMARY KEY (clubId)
);

-- Create ClubStaff table
CREATE TABLE ClubStaff (
  staffId INT NOT NULL,
  clubId INT NOT NULL,
  PRIMARY KEY (staffId, clubId)
);

-- Create Review table
CREATE TABLE Review (
  reviewId INT NOT NULL,
  star INT NOT NULL,
  comment NVARCHAR(255),
  PRIMARY KEY (reviewId) 
);

-- Create BookingStatus table
CREATE TABLE BookingStatus (
  bookingStatusId INT NOT NULL,
  status NVARCHAR(255) NOT NULL,
  PRIMARY KEY (bookingStatusId)
);

-- Create Table (Table is a reserved keyword) Table  
CREATE TABLE [Table] (
  tableId INT NOT NULL,
  tableTypeId INT NOT NULL,
  clubId INT NOT NULL,
  isAvailable BIT,
  PRIMARY KEY (tableId)
);

-- Create BookingDetail table
CREATE TABLE BookingDetail (
  bookingDetailId INT NOT NULL,
  bookingId INT NOT NULL,
  slotId INT NOT NULL,  
  tableId INT NOT NULL,
  price INT,
  bookDate DATE,
  PRIMARY KEY (bookingDetailId)
);

-- Create Slot table
CREATE TABLE Slot (
  slotId INT NOT NULL,
  startTime INT,
  endTime INT,
  PRIMARY KEY (slotId)
);


-- Define foreign keys

-- Booking
ALTER TABLE Booking
ADD CONSTRAINT FK_Booking_BookingStatusId FOREIGN KEY (bookingStatusId) REFERENCES BookingStatus(bookingStatusId);

ALTER TABLE Booking  
ADD CONSTRAINT FK_Booking_ClubId FOREIGN KEY (clubId) REFERENCES Club(clubId);

ALTER TABLE Booking
ADD CONSTRAINT FK_Booking_ReviewId FOREIGN KEY (reviewId) REFERENCES Review(reviewId);

-- BookingDetail FK
ALTER TABLE BookingDetail
ADD CONSTRAINT FK_BookingDetail_BookingId FOREIGN KEY (bookingId) REFERENCES Booking(bookingId);

ALTER TABLE BookingDetail
ADD CONSTRAINT FK_BookingDetail_SlotId FOREIGN KEY (slotId) REFERENCES Slot(slotId);

ALTER TABLE BookingDetail
ADD CONSTRAINT FK_BookingDetail_TableId FOREIGN KEY (tableId) REFERENCES [Table](tableId);

-- Table FK
ALTER TABLE [Table]  
ADD CONSTRAINT FK_Table_TableTypeId FOREIGN KEY (tableTypeId) REFERENCES TableType(tableTypeId);

ALTER TABLE [Table]
ADD CONSTRAINT FK_Table_ClubId FOREIGN KEY (clubId) REFERENCES Club(clubId);

-- Club FK
ALTER TABLE Club
ADD CONSTRAINT FK_Club_DistrictId FOREIGN KEY (districtId) REFERENCES District(districtId);

-- Price FK
ALTER TABLE Price
ADD CONSTRAINT FK_Price_TableTypeId FOREIGN KEY (tableTypeId) REFERENCES TableType(tableTypeId);

ALTER TABLE Price
ADD CONSTRAINT FK_Price_ClubId FOREIGN KEY (clubId) REFERENCES Club(clubId);

ALTER TABLE Price
ADD CONSTRAINT FK_Price_SlotId FOREIGN KEY (slotId) REFERENCES Slot(slotId);

-- ClubStaff FK
ALTER TABLE ClubStaff
ADD CONSTRAINT FK_ClubStaff_ClubId FOREIGN KEY (clubId) REFERENCES Club(clubId);

ALTER TABLE ClubStaff
ADD CONSTRAINT FK_ClubStaff_UserId FOREIGN KEY (staffId) REFERENCES Users(userId);


-- Sample Data Inserts

-- District Table
INSERT INTO District (districtId, districtName)  
VALUES
(1, 'Downtown'),
(2, 'Suburb');

-- Users Table
INSERT INTO Users (userId, username, password, firstName, lastName, email, phone, avatarLink, role)
VALUES
(1, 'john_doe', 'password123', 'John', 'Doe', 'john.doe@email.com', '1234567890', 'avatar1.jpg', 'customer'),
(2, 'jane_smith', 'pass456', 'Jane', 'Smith', 'jane.smith@email.com', '9876543210', 'avatar2.jpg', 'customer'), 
(3, 'admin_user', 'adminpass', 'Admin', 'User', 'admin.user@email.com', '5555555555', 'admin_avatar.jpg', 'admin'),
(4, 'A1_staff', 'staff1', 'staff', 'Staff1', 'staff1.user@email.com', '5555555555', 'staff1_avatar.jpg', 'staff'),
(5, 'B2_staff', 'staff2', 'staff', 'Staff2', 'staff2.user@email.com', '5555555555', 'staff2_avatar.jpg', 'staff');

-- TableType Table  
INSERT INTO TableType (tableTypeId, typeName, typeDescription)
VALUES
(1, 'Regular', 'Standard table'),  
(2, 'VIP', 'VIP table with special features');

-- Club Table
INSERT INTO Club (clubId, clubName, address, districtId, fanpageLink, avatarLink, openTime, closeTime, email, phone, status)
VALUES
(1, 'Club A', '123 Main St, Downtown', 1, 'facebook.com/clubA', 'clubA_avatar.jpg', '18', '02', 'clubA@email.com', '1112223333', 1),
(2, 'Club B', '456 Elm St, Suburb', 2, 'facebook.com/clubB', 'clubB_avatar.jpg', '19', '03', 'clubB@email.com', '4445556666', 1);

-- BookingStatus Table  
INSERT INTO BookingStatus (bookingStatusId, status)  
VALUES
(1, 'Confirmed'),
(2, 'Cancelled'),
(3, 'Pending');

-- Booking Table
INSERT INTO Booking (bookingId, customerId, clubId, clubStaffId, bookingStatusId, reviewId, bookDate)
VALUES
(101, 1, 1, 3, 1, 201, '2023-10-19 14:30:00'),
(102, 2, 2, 3, 1, 202, '2023-10-20 20:00:00'),
(103, 1, 2, 3, 2, 203, '2023-10-22 18:15:00');

-- Slot Table
INSERT INTO Slot (slotId, startTime, endTime)
VALUES  
(1, 18, 21),
(2, 21, 24);

-- Price Table 
INSERT INTO Price (tableTypeId, clubId, slotId, price)
VALUES
(1, 1, 1, 50),  
(1, 1, 2, 60),
(2, 1, 1, 100),
(1, 2, 1, 45),
(2, 2, 1, 90);

-- Review Table

INSERT INTO Review (reviewId, star, comment)  
VALUES
(201, 4, 'Great experience!'),
(202, 5, 'Amazing club!'), 
(203, 3, 'Service could be better');

-- Table (Table is a reserved keyword) Table

INSERT INTO [Table] (tableId, tableTypeId, clubId, isAvailable)
VALUES
(1, 1, 1, 1),  
(2, 1, 1, 0),
(3, 2, 1, 1),
(4, 1, 2, 1); 

-- BookingDetail Table 

INSERT INTO BookingDetail (bookingDetailId, bookingId, slotId, tableId, price, statusId, bookDate)
VALUES
(301, 101, 1, 1, 50, 1, '2023-10-19'),
(302, 102, 2, 2, 60, 1, '2023-10-20'),  
(303, 103, 1, 3, 100, 1, '2023-10-22'),
(304, 103, 2, 4, 45, 1, '2023-10-22');

-- ClubStaff Table
INSERT INTO ClubStaff (staffId, clubId)  
VALUES
(4, 1),
(4, 2);