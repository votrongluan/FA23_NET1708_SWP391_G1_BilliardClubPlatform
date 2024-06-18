-- Drop and create the database
USE master
GO
DROP DATABASE IF EXISTS BBP;
GO
CREATE DATABASE BBP;
GO
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
  clubStaffId INT,
  bookingStatusId INT,
  reviewId INT,
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
  avatarLink NVARCHAR(255),
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
INSERT INTO District (districtId, districtName) VALUES
(1, N'Quận 1'),
(2, N'Quận 2'),
(3, N'Quận 3'),
(4, N'Quận 4'),
(5, N'Quận 5'),
(6, N'Quận 6'),
(7, N'Quận 7'),
(8, N'Quận 8'),
(9, N'Quận 9'),
(10, N'Quận 10'),
(11, N'Quận 11'),
(12, N'Quận 12'),
(13, N'Quận Thủ Đức'),
(14, N'Quận Gò Vấp'),
(15, N'Quận Bình Thạnh'),
(16, N'Quận Tân Bình'),
(17, N'Quận Tân Phú'),
(18, N'Quận Phú Nhuận'),
(19, N'Quận Bình Tân'),
(20, N'Huyện Củ Chi'),
(21, N'Huyện Hóc Môn'),
(22, N'Huyện Bình Chánh'),
(23, N'Huyện Nhà Bè'),
(24, N'Huyện Cần Giờ');

-- Club Table
INSERT INTO Club (clubId, clubName, address, districtId, fanpageLink, avatarLink, openTime, closeTime, email, phone, status) VALUES
(1, 'Club One', '123 Main St', 1, 'http://facebook.com/clubone', 'https://i.pinimg.com/1200x/84/f4/67/84f467993859242836f891a68c83fcc6.jpg', 6, 18, 'contact@clubone.com', '0901234561', 1),
(2, 'Club Two', '456 Elm St', 2, 'http://facebook.com/clubtwo', 'https://i.pinimg.com/1200x/29/ba/3f/29ba3f0b0c06ff9a977c3a5856cf2de6.jpg', 6, 18, 'info@clubtwo.com', '0901234562', 1),
(3, 'Club Three', '789 Oak St', 3, 'http://facebook.com/clubthree', 'https://i.pinimg.com/1200x/27/3d/2b/273d2b292dd983015f667a395564b2e6.jpg', 6, 18, 'hello@clubthree.com', '0901234563', 1),
(4, 'Club Four', '101 Pine St', 4, 'http://facebook.com/clubfour', 'https://i.pinimg.com/1200x/70/62/f9/7062f9ab63d3cc541a3d04e57f930c42.jpg', 6, 18, 'contact@clubfour.com', '0901234564', 1),
(5, 'Club Five', '202 Maple St', 5, 'http://facebook.com/clubfive', 'https://i.pinimg.com/1200x/92/11/23/92112392b2c2f16f7ff18853838dd7f2.jpg', 6, 18, 'info@clubfive.com', '0901234565', 1),
(6, 'Club Six', '303 Cedar St', 6, 'http://facebook.com/clubsix', 'https://i.pinimg.com/1200x/a2/44/20/a244201973b5e306e8ac2a80e7781cff.jpg', 6, 18, 'hello@clubsix.com', '0901234566', 1),
(7, 'Club Seven', '404 Birch St', 7, 'http://facebook.com/clubseven', 'https://i.pinimg.com/1200x/c3/0d/4b/c30d4bf8bb595e3817520d103b5f945d.jpg', 6, 18, 'contact@clubseven.com', '0901234567', 1),
(8, 'Club Eight', '505 Spruce St', 8, 'http://facebook.com/clubeight', 'https://i.pinimg.com/1200x/12/a8/be/12a8befb672322694f9f3248cb7acff5.jpg', 6, 18, 'info@clubeight.com', '0901234568', 1),
(9, 'Club Nine', '606 Willow St', 9, 'http://facebook.com/clubnine', 'https://i.pinimg.com/1200x/2b/22/34/2b2234a26ec5df0c0746132711066b6b.jpg', 6, 18, 'hello@clubnine.com', '0901234569', 1),
(10, 'Club Ten', '707 Aspen St', 10, 'http://facebook.com/clubten', 'https://i.pinimg.com/1200x/28/d6/64/28d66447e4abafcbfc0bdf70e03c13e2.jpg', 6, 18, 'contact@clubten.com', '0901234570', 1),
(11, 'Club Eleven', '808 Walnut St', 11, 'http://facebook.com/clubeleven', 'https://i.pinimg.com/1200x/c7/fd/5f/c7fd5f779cda806530f9c8bbab645d8b.jpg', 6, 18, 'info@clubeleven.com', '0901234571', 1),
(12, 'Club Twelve', '909 Chestnut St', 12, 'http://facebook.com/clubtwelve', 'https://i.pinimg.com/1200x/10/b9/55/10b9553f2fb4d8c76656bc9dd199922b.jpg', 6, 18, 'hello@clubtwelve.com', '0901234572', 1),
(13, 'Club Thirteen', '1010 Hickory St', 13, 'http://facebook.com/clubthirteen', 'https://i.pinimg.com/1200x/bb/f7/5e/bbf75e704a0404a798e6cc814aa43f71.jpg', 6, 18, 'contact@clubthirteen.com', '0901234573', 1),
(14, 'Club Fourteen', '1111 Sycamore St', 14, 'http://facebook.com/clubfourteen', 'https://i.pinimg.com/1200x/34/72/96/347296a4f3267371242fe171e9b2f380.jpg', 6, 18, 'info@clubfourteen.com', '0901234574', 1),
(15, 'Club Fifteen', '1212 Poplar St', 15, 'http://facebook.com/clubfifteen', 'https://i.pinimg.com/1200x/34/72/96/347296a4f3267371242fe171e9b2f380.jpg', 6, 18, 'hello@clubfifteen.com', '0901234575', 1),
(16, 'Club Sixteen', '1313 Fir St', 16, 'http://facebook.com/clubsixteen', 'https://i.pinimg.com/1200x/34/72/96/347296a4f3267371242fe171e9b2f380.jpg', 6, 18, 'contact@clubsixteen.com', '0901234576', 1),
(17, 'Club Seventeen', '1414 Redwood St', 17, 'http://facebook.com/clubseventeen', 'https://i.pinimg.com/1200x/34/72/96/347296a4f3267371242fe171e9b2f380.jpg', 6, 18, 'info@clubseventeen.com', '0901234577', 1),
(18, 'Club Eighteen', '1515 Cypress St', 18, 'http://facebook.com/clubeighteen', 'https://i.pinimg.com/1200x/c5/cf/45/c5cf457d7fd8e5018f90f8bb041899de.jpg', 6, 18, 'hello@clubeighteen.com', '0901234578', 1),
(19, 'Club Nineteen', '1616 Pine St', 19, 'http://facebook.com/clubnineteen', 'https://i.pinimg.com/1200x/c5/cf/45/c5cf457d7fd8e5018f90f8bb041899de.jpg', 6, 18, 'contact@clubnineteen.com', '0901234579', 1),
(20, 'Club Twenty', '1717 Oak St', 20, 'http://facebook.com/clubtwenty', 'https://i.pinimg.com/1200x/c5/cf/45/c5cf457d7fd8e5018f90f8bb041899de.jpg', 6, 18, 'info@clubtwenty.com', '0901234580', 1);


-- Users Table
INSERT INTO Users (userId, username, password, firstName, lastName, email, phone, avatarLink, role)
VALUES
(1, 'admin', '$2a$10$S/IUEe7mUGZnD2pdIrohIu0IPPfHPux3I2AHxeO9CtZEBdlovvYnm', 'Admin', 'User', 'admin_user@gmail.com', '5555555555', 'admin_avatar.jpg', '2');

-- TableType Table  
INSERT INTO TableType (tableTypeId, typeName, typeDescription)
VALUES
(1, N'Phăng', N'Bàn loại phăng'),  
(2, N'Lỗ', N'Bàn loại lỗ');

-- BookingStatus Table  
INSERT INTO BookingStatus (bookingStatusId, status)  
VALUES
(1, N'Đã thanh toán'),
(2, N'Chưa thanh toán');

-- Slot Table
INSERT INTO Slot (slotId, startTime, endTime)
VALUES  
(1, 9, 10),
(2, 10, 11),
(3, 11, 12),
(4, 12, 13),
(5, 13, 14),
(6, 14, 15),
(7, 15, 16),
(8, 16, 17),
(9, 17, 18),
(10, 18, 19),
(11, 19, 20),
(12, 20, 21);