drop database BBP
Create database BBP
use BBP

create table Users(
	UserId varchar(10) not null,
	Username varchar(20) not null,
	Password nvarchar(255) not null,
	FirstName nvarchar(50),
	LastName nvarchar(50),
	Email nvarchar(50),
	Phone varchar(10),
	AvatarLink nvarchar(100),
	Role varchar(10)
)
alter table Users
	add constraint PK_User_UserId primary key (UserId)

create table TableType(
	TableTypeId varchar(10) not null,
	TypeName nvarchar(50) not null,
	TypeDescription nvarchar(255),
)
alter table TableType
	add constraint PK_TableType_TableTypeId primary key (TableTypeId)

create table Booking(
	BookingId varchar(10) not null,
	CustomerId varchar(10) not null,
	ClubId varchar(10) not null,
	ClubStaffId varchar(10) not null,
	BookDate datetime,
)
alter table Booking
	add constraint PK_Booking_BookingId primary key (BookingId)

create table Price(
	TableTypeId varchar(10) not null,
	ClubId varchar(10) not null,
	SlotId varchar(10) not null,
	Price int,
)
alter table Price
	add constraint PK_Price_BookingId_ClubId_SlotId primary key (TableTypeId, ClubId, SlotId)

create table District(
	DistrictId varchar(10) not null,
	DistrictName nvarchar(50) not null,
)
alter table District
	add constraint PK_District_DistrictId primary key (DistrictId)

create table Club(
	ClubId varchar(10) not null,
	Clubname nvarchar(50) not null,
	Address nvarchar(100) not null,
	DistrictId varchar(10) not null,
	FanpageLink nvarchar(50),
	AvatarLink nvarchar(50) not null,
	OpenTime time,
	CloseTime time,
	Email varchar(30),
	Phone varchar(10),
)
alter table Club
	add constraint PK_Club_ClubId primary key (ClubId)

create table Review(
	ReviewId varchar(10) not null,
	BookingId varchar(10) not null,
	Star int not null,
	Comment nvarchar(255),
)
alter table Review
	add constraint PK_Review_ReviewId primary key (ReviewId)

create table BookingDetailStatus(
	BookingDetailStatusId varchar(10) not null,
	Status nvarchar(20) not null,
)
alter table BookingDetailStatus
	add constraint PK_BookingDetailStatus_BookingDetailStatusId primary key (BookingDetailStatusId)

create table Voucher(
	VoucherId varchar(20) not null,
	VoucherValue float not null,
	Description nvarchar(255) not null,
	StartTime datetime not null,
	EndTime datetime not null,
)
alter table Voucher
	add constraint PK_Voucher_VoucherId primary key (VoucherId)
-----------------------------------------------------------------------
create table [Table](
	TableId varchar(10) not null,
	TableTypeId varchar(10) not null,
	ClubId varchar(10) not null,
	isAvailable	bit
	--CONSTRAINT FK_TableType FOREIGN KEY (TableTypeId) REFERENCES TableType(TableTypeId),
	--CONSTRAINT FK_Club FOREIGN KEY (ClubId) REFERENCES Club(ClubId),
)
alter table [Table]
	add constraint PK_Table_TableId primary key (TableId)

create table BookingDetail(
	BookingDetailId varchar(10) not null,
	BookingId varchar(10) not null,
	SlotId varchar(10) not null,
	TableId varchar(10) not null,
	BookingDetailStatusId varchar(10) not null,
	VoucherId varchar(20) not null,
	Price int,
	StatusId varchar(10) not null,
	BookDate date
	--CONSTRAINT PK_BookingDetail PRIMARY KEY (BookingDetailId)
	--CONSTRAINT FK_Booking FOREIGN KEY (BookingId) REFERENCES Booking(BookingId)
)
alter table BookingDetail
	add constraint PK_BookingDetail_BookingDetailId primary key (BookingDetailId)

create table Slot (
	SlotId varchar(10) not null,
	StartTime time,
	EndTime time,
)
alter table Slot
	add constraint PK_Slot_SlotId primary key (SlotId)

---ForeignKey
	--Review FK
alter table Review
	add constraint FK_Review_BookingDetailId foreign key (BookingId) references Booking(BookingId)


	--BookingDetail FK
alter table BookingDetail
	add constraint FK_BookingDetail_BookingId foreign key (BookingId) references Booking(BookingId)

alter table BookingDetail
	add constraint FK_BookingDetail_SlotId foreign key (SlotId) references Slot(SlotId)

alter table BookingDetail
	add constraint FK_BookingDetail_TableId foreign key (TableId) references [Table](TableId)

alter table BookingDetail
	add constraint FK_BookingDetail_BookingDetailStatusId foreign key (BookingDetailStatusId) references BookingDetailStatus(BookingDetailStatusId)

alter table BookingDetail
	add constraint FK_BookingDetail_VoucherId foreign key (VoucherId) references Voucher(VoucherId)

	--Table FK
alter table [Table]
	add constraint FK_Table_TableTypeId foreign key (TableTypeId) references TableType(TableTypeId)

alter table [Table]
	add constraint FK_Table_ClubId foreign key (ClubId) references Club(ClubId)

	--Booking FK
alter table Booking
	add constraint FK_Booking_CustomerId foreign key (CustomerId) references Users(UserId)

alter table Booking
	add constraint FK_Booking_ClubId foreign key (ClubId) references Club(ClubId)

alter table Booking
	add constraint FK_Booking_ClubStaffId foreign key (ClubStaffId) references Users(UserId)

	--Club FK
alter table Club
	add constraint FK_Club_DistrictId foreign key (DistrictId) references District(DistrictId)

	--Price FK
alter table Price
	add constraint FK_Price_TableTypeId foreign key (TableTypeId) references TableType(TableTypeId)

alter table Price
	add constraint FK_Price_ClubId foreign key (ClubId) references Club(ClubId)

alter table Price
	add constraint FK_Price_SlotId foreign key (SlotId) references Slot(SlotId)