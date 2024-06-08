
USE [DnD]
GO
/****** Object:  Table [dbo].[Log]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AuditLogType](
	[AuditLogType_ID] [int] IDENTITY(1,1) NOT NULL,
	[Description] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[AuditLogType_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AuditLog](
	[Log_ID] [int] IDENTITY(1,1) NOT NULL,
	[User_ID] [varchar](max) NOT NULL,
	[AuditLogType_ID] [int] NOT NULL,
	[TimeStamp] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Log_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Address]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Address](
	[Address_ID] [int] IDENTITY(1,1) NOT NULL,
	[Street_ID] [int] NOT NULL,
	[Postal_Code] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Address_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Booking]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Booking](
	[Booking_ID] [int] IDENTITY(1,1) NOT NULL,
	[BookingStatus_ID] [int] NOT NULL,
  	[BookingType_ID] [int] NOT NULL,
	[QRCode] [varchar](max) NOT NULL,
  	[Canceled] [bit] NOT NULL,
	[CEC_ID] [int] NOT NULL,
	[SenderUser_ID] [varChar](max) NOT NULL,
	[Fined] [bit] NOT NULL
PRIMARY KEY CLUSTERED 
(
	[Booking_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Booking]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Booking_Cancellation](
	[BookingCancel_ID] [int] IDENTITY(1,1) NOT NULL,
	[Booking_ID] [int] NOT NULL,
	[CancelledDate] [datetime] NULL,
	[CancelledDescription] [Varchar](200) NOT NULL Default 'Not Cancelled',
PRIMARY KEY CLUSTERED 
(
	[BookingCancel_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Booking_Status]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Booking_Status](
	[BookingStatus_ID] [int] IDENTITY(1,1) NOT NULL,
	[Status] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[BookingStatus_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Booking_Type]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Booking_Type](
	[BookingType_ID] [int] IDENTITY(1,1) NOT NULL,
	[Description] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[BookingType_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[City]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[City](
	[City_ID] [int] IDENTITY(1,1) NOT NULL,
	[CityName] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[City_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Client_Information]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Client_Information](
	[ClientUser_ID] [varChar](max) NOT NULL,
	[Title_ID] [int] NOT NULL,
	[Company_ID] [int] NOT NULL,
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Client_Employee_Connection]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Client_Employee_Connection](
	[CEC_ID] [int] IDENTITY(1,1) NOT NULL,
	[ClientUser_ID] [varChar](max) NOT NULL,
  [User_ID] [varChar](max) NOT NULL
PRIMARY KEY CLUSTERED 
(
	[CEC_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comment]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comment](
	[Comment_ID] [int] IDENTITY(1,1) NOT NULL,
	[Comment] [varchar](250) NOT NULL,
	[Date] [datetime] NOT NULL,
	[Booking_ID] [int] NOT NULL,
  [SenderUser_ID] [varchar](max) NOT NULL
PRIMARY KEY CLUSTERED 
(
	[Comment_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Company]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Company](
	[Company_ID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyName] [varchar](50) NULL,
	[Address_ID] [int] NOT NULL,
  [Activated] [bit] NOT NULL
PRIMARY KEY CLUSTERED 
(
	[Company_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Date_Time_Driver_Vehicle]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Date_Time_Driver_Vehicle](
	[DateTimeDriver_ID] [int] IDENTITY(1,1) NOT NULL,
	[ScheduleTime_ID] [int] NOT NULL,
	[ScheduleDate_ID] [int] NOT NULL,
	[DriverUser_ID] [varChar] (max) NOT NULL,
	[DriverStatus_ID] [int] NOT NULL,
	[Booking_ID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[DateTimeDriver_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Driver_Information]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Driver_Information](
	[DriverUser_ID] [varChar] (max) NOT NULL,
	[DriverRating_ID] [int] NOT NULL,
	[License_ID] [int] NOT NULL,
  [Registration_ID] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Driver_Rating]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Driver_Rating](
	[DriverRating_ID] [int] IDENTITY(1,1) NOT NULL,
	[Rating_ID] [int] NOT NULL,
	[DriverUser_ID] [varChar](max) NOT NULL,
	[Date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[DriverRating_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Driver_Status]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Driver_Status](
	[DriverStatus_ID] [int] IDENTITY(1,1) NOT NULL,
	[Availability] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[DriverStatus_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Event]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Event](
	[Event_ID] [int] IDENTITY(1,1) NOT NULL,
	[Description] [varchar](200) NOT NULL,
	[NumberOfEmployees] [int] NOT NULL,
	[Location] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Event_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Event]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Event_Booking](
	[Event_Booking] [int] IDENTITY(1,1) NOT NULL,
	[Event_ID] [int] NOT NULL,
	[Booking_ID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Event_Booking] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Fuel_Price]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Fuel_Price](
	[FuelPrice_ID] [int] IDENTITY(1,1) NOT NULL,
	[DriverUser_ID] [varchar] (MAX) NOT NULL,
	[Litres] [float] NOT NULL,
	[Price] [float] NOT NULL,
	[TimeStamp] [datetime] NULL,
	[TirePressure] [bit] NULL
PRIMARY KEY CLUSTERED 
(
	[FuelPrice_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Incident]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Incident](
	[Incident_ID] [int] IDENTITY(1,1) NOT NULL,
	[Location] [varchar](50) NULL,
	[Date] [datetime] NULL,
	[Description] [varchar](50) NULL,
	[IncidentStatus_ID] [int] NOT NULL,
	[DriverUser_ID] [varChar](max) NOT NULL
PRIMARY KEY CLUSTERED 
(
	[Incident_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Incident_Status]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Incident_Status](
	[IncidentStatus_ID] [int] IDENTITY(1,1) NOT NULL,
	[Status] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[IncidentStatus_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Incident_Status]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Inspection](
	[Inspection_ID] [int] IDENTITY(1,1) NOT NULL,
	[Start_Date] [datetime] NOT NULL,
	[PreCar_Inspection] [varChar](max) NOT NULL,
	[PreCar_Odometer] [int] NOT NULL,
	[PreCar_Tyres] [bit] NOT NULL,
	[PreCar_Notes] [varChar](200) NULL,
	[End_Date] [datetime] NULL,
	[PostCar_Inspection] [varChar](max) NULL,
	[PostCar_Odometer] [int] NULL,
	[PostCar_Tyres] [bit] NULL,
	[PostCar_Notes] [varChar](200) NULL,
  [DriverUser_ID] [varChar](900) NOT NULL
PRIMARY KEY CLUSTERED 
(
	[Inspection_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[License]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[License](
	[License_ID] [int] IDENTITY(1,1) NOT NULL,
	[LicenseCode_ID] [int] NOT NULL,
	[Description] [varchar](50) NULL,
	[License_Number] [int] NULL,
	[Expiration_Date] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[License_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[License_Code]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[License_Code](
	[LicenseCode_ID] [int] IDENTITY (1,1) NOT NULL,
  [LicenseCode] [varChar] (50) NOT NULL,
  PRIMARY KEY CLUSTERED 
(
	[LicenseCode_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Maintenance]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Maintenance](
	[Maintenance_ID] [int] IDENTITY(1,1) NOT NULL,
	[RecordedKM] [float] NULL,
	[Date] [datetime] NULL,
	[Registration_ID] [int] NOT NULL,
  [Mechanic_ID] [int] NOT NULL,
  [Confirmed] [bit] NOT NULL
PRIMARY KEY CLUSTERED 
(
	[Maintenance_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Mechanic]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Mechanic](
	[Mechanic_ID] [int] IDENTITY(1,1) NOT NULL,
	[Mechanic_Name] [VarChar](50) NULL,
	[Mechanic_Email] [VarChar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Mechanic_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Parcel]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Parcel](
	[Parcel_ID] [int] IDENTITY(1,1) NOT NULL,
	[ParcelCon_ID] [int] NOT NULL,
	[ParcelPriority_ID] [int] NOT NULL,
	[ParcelType_ID] [int] NOT NULL,
  [Booking_ID] [int] NOT NULL
PRIMARY KEY CLUSTERED 
(
	[Parcel_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Parcel_Confidentiality]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Parcel_Confidentiality](
	[ParcelCon_ID] [int] IDENTITY(1,1) NOT NULL,
	[Confidentiality] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[ParcelCon_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Parcel_Priority]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Parcel_Priority](
	[ParcelPriority_ID] [int] IDENTITY(1,1) NOT NULL,
	[Priority] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[ParcelPriority_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Parcel_Type]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Parcel_Type](
	[ParcelType_ID] [int] IDENTITY(1,1) NOT NULL,
	[Description] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[ParcelType_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Project]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Project](
	[Project_ID] [int] IDENTITY(1,1) NOT NULL,
	[Description] [varchar](50) NULL,
	[Company_ID] [int] NOT NULL,
	[ProjectName] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[Project_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rating]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rating](
	[Rating_ID] [int] IDENTITY(1,1) NOT NULL,
	[Rating] [float] NULL,
PRIMARY KEY CLUSTERED 
(
	[Rating_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Schedule_Date]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Date](
	[ScheduleDate_ID] [int] IDENTITY(1,1) NOT NULL,
	[Date] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[ScheduleDate_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Schedule_Time]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Time](
	[ScheduleTime_ID] [int] IDENTITY(1,1) NOT NULL,
	[Time] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ScheduleTime_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Street]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Settings](
	[Settings_ID] [int] IDENTITY(1,1) NOT NULL,
	[LogoutTimer] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Settings_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Street]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Street](
	[Street_ID] [int] IDENTITY(1,1) NOT NULL,
	[StreetName] [varchar](50) NULL,
	[Suburb_ID] [int] NOT NULL,
	[StreetNumber] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Street_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Suburb]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Suburb](
	[Suburb_ID] [int] IDENTITY(1,1) NOT NULL,
	[City_ID] [int] NOT NULL,
	[Suburb] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Suburb_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Title]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Title](
	[Title_ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Title_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tracking]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tracking](
	[Tracking_ID] [int] IDENTITY(1,1) NOT NULL,
	[Distance] [float] NULL,
	[Start_Location] [varchar](200) NULL,
	[End_Location] [varchar](200) NULL,
	[Booking_ID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Tracking_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vehicle]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vehicle](
	[Registration_ID] [int] IDENTITY(1,1) NOT NULL,
	[VehicleClass_ID] [int] NOT NULL,
	[Manufacturer_ID] [int] NOT NULL,
  [Model_ID] [int] NOT NULL,
	[Activated] [bit] NOT NULL,
	[Availability] [bit] NOT NULL,
	[Manufactured_Date] [nvarchar](max) NULL,
	[RegistrationNumber] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[Registration_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vehicle_Class]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vehicle_Class](
	[VehicleClass_ID] [int] IDENTITY(1,1) NOT NULL,
	[Description] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[VehicleClass_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vehicle_Manufacturer]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vehicle_Manufacturer](
	[Manufacturer_ID] [int] IDENTITY(1,1) NOT NULL,
	[Manufacturer_Code] [varchar](50) NULL,
	[Manufacturer_Title] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Manufacturer_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vehicle_Model]    Script Date: 14/07/2022 12:10:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vehicle_Model](
	[Model_ID] [int] IDENTITY(1,1) NOT NULL,
	[Manufacturer_ID] [int] NOT NULL,
	[Model_Code] [varchar](50) NULL,
	[Model_Title] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Model_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Vehicle] ADD  DEFAULT (CONVERT([bit],(0))) FOR [Activated]
GO
ALTER TABLE [dbo].[Vehicle] ADD  DEFAULT (CONVERT([bit],(1))) FOR [Availability]
GO
ALTER TABLE [dbo].[Company] ADD  DEFAULT (CONVERT([bit],(1))) FOR [Activated]
GO
ALTER TABLE [dbo].[Booking] ADD  DEFAULT (CONVERT([bit],(0))) FOR [Fined]
GO

ALTER TABLE [dbo].[AuditLog]  WITH CHECK ADD FOREIGN KEY([AuditLogType_ID])
REFERENCES [dbo].[AuditLogType] ([AuditLogType_ID])
GO

ALTER TABLE [dbo].[Address]  WITH CHECK ADD FOREIGN KEY([Street_ID])
REFERENCES [dbo].[Street] ([Street_ID])
GO

ALTER TABLE [dbo].[Booking]  WITH CHECK ADD FOREIGN KEY([BookingType_ID])
REFERENCES [dbo].[Booking_Type] ([BookingType_ID])
GO
ALTER TABLE [dbo].[Booking]  WITH CHECK ADD FOREIGN KEY([BookingStatus_ID])
REFERENCES [dbo].[Booking_Status] ([BookingStatus_ID])

GO
ALTER TABLE [dbo].[Booking]  WITH CHECK ADD FOREIGN KEY([CEC_ID])
REFERENCES [dbo].[Client_Employee_Connection] ([CEC_ID])
GO
ALTER TABLE [dbo].[Booking_Cancellation]  WITH CHECK ADD FOREIGN KEY([Booking_ID])
REFERENCES [dbo].[Booking] ([Booking_ID])
GO

ALTER TABLE [dbo].[Client_Information]  WITH CHECK ADD FOREIGN KEY([Company_ID])
REFERENCES [dbo].[Company] ([Company_ID])
GO
ALTER TABLE [dbo].[Client_Information]  WITH CHECK ADD FOREIGN KEY([Title_ID])
REFERENCES [dbo].[Title] ([Title_ID])
GO

ALTER TABLE [dbo].[Comment]  WITH CHECK ADD FOREIGN KEY([Booking_ID])
REFERENCES [dbo].[Booking] ([Booking_ID])
GO

ALTER TABLE [dbo].[Company]  WITH CHECK ADD FOREIGN KEY([Address_ID])
REFERENCES [dbo].[Address] ([Address_ID])
GO

ALTER TABLE [dbo].[Date_Time_Driver_Vehicle]  WITH CHECK ADD FOREIGN KEY([Booking_ID])
REFERENCES [dbo].[Booking] ([Booking_ID])
GO
ALTER TABLE [dbo].[Date_Time_Driver_Vehicle]  WITH CHECK ADD FOREIGN KEY([DriverStatus_ID])
REFERENCES [dbo].[Driver_Status] ([DriverStatus_ID])
GO
ALTER TABLE [dbo].[Date_Time_Driver_Vehicle]  WITH CHECK ADD FOREIGN KEY([ScheduleTime_ID])
REFERENCES [dbo].[Time] ([ScheduleTime_ID])
GO
ALTER TABLE [dbo].[Date_Time_Driver_Vehicle]  WITH CHECK ADD FOREIGN KEY([ScheduleDate_ID])
REFERENCES [dbo].[Date] ([ScheduleDate_ID])
GO


ALTER TABLE [dbo].[Driver_Information]  WITH CHECK ADD FOREIGN KEY([License_ID])
REFERENCES [dbo].[License] ([License_ID])
GO
ALTER TABLE [dbo].[Driver_Information]  WITH CHECK ADD FOREIGN KEY([DriverRating_ID])
REFERENCES [dbo].[Driver_Rating] ([DriverRating_ID])
GO
ALTER TABLE [dbo].[Driver_Information]  WITH CHECK ADD FOREIGN KEY([Registration_ID])
REFERENCES [dbo].[Vehicle] ([Registration_ID])
GO

ALTER TABLE [dbo].[Driver_Rating]  WITH CHECK ADD FOREIGN KEY([Rating_ID])
REFERENCES [dbo].[Rating] ([Rating_ID])
GO

ALTER TABLE [dbo].[Event_Booking]  WITH CHECK ADD FOREIGN KEY([Event_ID])
REFERENCES [dbo].[Event] ([Event_ID])
GO
ALTER TABLE [dbo].[Event_Booking]  WITH CHECK ADD FOREIGN KEY([Booking_ID])
REFERENCES [dbo].[Booking] ([Booking_ID])
GO

ALTER TABLE [dbo].[Incident]  WITH CHECK ADD FOREIGN KEY([IncidentStatus_ID])
REFERENCES [dbo].[Incident_Status] ([IncidentStatus_ID])
GO


ALTER TABLE [dbo].[License]  WITH CHECK ADD FOREIGN KEY([LicenseCode_ID])
REFERENCES [dbo].[License_Code] ([LicenseCode_ID])
GO

ALTER TABLE [dbo].[Maintenance]  WITH CHECK ADD FOREIGN KEY([Registration_ID])
REFERENCES [dbo].[Vehicle] ([Registration_ID])
GO
ALTER TABLE [dbo].[Maintenance]  WITH CHECK ADD FOREIGN KEY([Mechanic_ID])
REFERENCES [dbo].[Mechanic] ([Mechanic_ID])
GO

ALTER TABLE [dbo].[Parcel]  WITH CHECK ADD FOREIGN KEY([ParcelCon_ID])
REFERENCES [dbo].[Parcel_Confidentiality] ([ParcelCon_ID])
GO
ALTER TABLE [dbo].[Parcel]  WITH CHECK ADD FOREIGN KEY([ParcelPriority_ID])
REFERENCES [dbo].[Parcel_Priority] ([ParcelPriority_ID])
GO
ALTER TABLE [dbo].[Parcel]  WITH CHECK ADD FOREIGN KEY([ParcelType_ID])
REFERENCES [dbo].[Parcel_Type] ([ParcelType_ID])
GO
ALTER TABLE [dbo].[Parcel]  WITH CHECK ADD FOREIGN KEY([Booking_ID])
REFERENCES [dbo].[Booking] ([Booking_ID])
GO

ALTER TABLE [dbo].[Project]  WITH CHECK ADD FOREIGN KEY([Company_ID])
REFERENCES [dbo].[Company] ([Company_ID])
GO

ALTER TABLE [dbo].[Street]  WITH CHECK ADD FOREIGN KEY([Suburb_ID])
REFERENCES [dbo].[Suburb] ([Suburb_ID])
GO

ALTER TABLE [dbo].[Suburb]  WITH CHECK ADD FOREIGN KEY([City_ID])
REFERENCES [dbo].[City] ([City_ID])
GO

ALTER TABLE [dbo].[Tracking]  WITH CHECK ADD FOREIGN KEY([Booking_ID])
REFERENCES [dbo].[Booking] ([Booking_ID])
GO

ALTER TABLE [dbo].[Vehicle]  WITH CHECK ADD FOREIGN KEY([VehicleClass_ID])
REFERENCES [dbo].[Vehicle_Class] ([VehicleClass_ID])
GO
ALTER TABLE [dbo].[Vehicle]  WITH CHECK ADD FOREIGN KEY([Manufacturer_ID])
REFERENCES [dbo].[Vehicle_Manufacturer] ([Manufacturer_ID])
GO
ALTER TABLE [dbo].[Vehicle]  WITH CHECK ADD FOREIGN KEY([Model_ID])
REFERENCES [dbo].[Vehicle_Model] ([Model_ID])
GO

ALTER TABLE [dbo].[Vehicle_Model]  WITH CHECK ADD FOREIGN KEY([Manufacturer_ID])
REFERENCES [dbo].[Vehicle_Manufacturer] ([Manufacturer_ID])
GO

USE [master]
GO
ALTER DATABASE [DnD] SET  READ_WRITE 
GO
