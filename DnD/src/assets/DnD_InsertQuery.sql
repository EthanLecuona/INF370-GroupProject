INSERT INTO City (CityName) VALUES
('Pretoria'),
('Johannesburg');

INSERT INTO Suburb (Suburb, City_ID) VALUES
('Garsfontein', 1),
('Sandton', 2);

INSERT INTO Street (StreetName, StreetNumber, Suburb_ID) VALUES
('Assopul', 32, 1),
('Grayson',100, 2);

INSERT INTO Address (Postal_Code, Street_ID) VALUES
(1081, 1),
(2196, 2);

INSERT INTO Company (CompanyName, Address_ID) VALUES
('EPI-USE', 1),
('ERP', 2);

INSERT INTO Title (Title) VALUES
('Mr.'),
('Mrs.'),
('Ms.'),
('Dr.'),
('Prof.'),
('Mx.'),
('Prefer not to Say');

INSERT INTO Rating (Rating) VALUES
(0),
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10);

INSERT INTO License_Code (LicenseCode) VALUES
('Code A Motorcycles'),
('Code B Light Vehicles'),
('Code C Heavy Vehicles'),
('Code D Special Vehicles');

--Run before Vehicle Models
INSERT INTO Vehicle_Manufacturer( Manufacturer_Code, Manufacturer_Title) VALUES
( 'AUDI', 'Audi'),
( 'CHEV', 'Chevrolet'),
( 'DATSUN', 'Datsun'),
( 'FIAT', 'FIAT'),
( 'FORD', 'Ford'),
( 'HONDA', 'Honda'),
( 'HYUND', 'Hyundai'),
( 'ISU', 'Isuzu'),
( 'KIA', 'Kia'),
( 'ROV', 'Land Rover'),
( 'MAZDA', 'Mazda'),
( 'MIT', 'Mitsubishi'),
( 'NISSAN', 'Nissan'),
( 'PEUG', 'Peugeot'),
( 'REN', 'Renault'),
( 'SUZUKI', 'Suzuki'),
( 'TOYOTA', 'Toyota'),
( 'VOLKS', 'Volkswagen');
--------------------------------------------------------------------------------------
--Run after Vehicle Manufacturer
INSERT INTO Vehicle_Model ( Manufacturer_ID, Model_Code, Model_Title) VALUES
( 2, 'Util', 'Utility 1.4'),
( 3, 'Go', 'Go+'),
( 4, 'Fio', 'Fiorino Panel Van'),
( 4, 'Duc', 'Ducato CH1 Panel Van'),
( 5, 'Tran', 'Transit Van'),
( 5, 'Tran', 'Transit Custom'),
( 5, 'Ran', 'Ranger Singel Cab'),
( 7, 'H1', 'H1 Van'),
( 7, 'ELA', 'Elantra'),
( 8, 'KB', 'KB250'),
( 4, 'Pi', 'Picanto'),
( 11, 'BT', 'BT50'),
( 11, 'Maz', 'Mazda 3'),
( 12, 'Tri', 'Triton Singel Cab'),
( 13, 'NP', 'NP200'),
( 13, 'NP', 'NP300'),
( 13, 'NV', 'NV200'),
( 13, 'NV', 'NV350'),
( 13, 'NV', 'NV350 Windows'),
( 14, 'PAR', 'Partner'),
( 14, 'PAR', 'Partner L1'),
( 14, 'PEG', 'Panel Van'),
( 15, 'Tra', 'Trafic'),
( 15, 'MAS', 'Master'),
( 16, 'SWIF', 'Swift'),
( 16, 'HIA', 'Hiace'),
( 17, 'Quan', 'Quantum Bus'),
( 17, 'Quan', 'Quantum Panel Van'),
( 17, 'Hil', 'Hilux Singel Cab'),
( 17, 'Cor', 'Corola'),
( 18, 'Cad', 'Caddie'),
( 18, 'Jet', 'Jetta'),
( 18, 'Tran', 'Transporter Panel Van');

INSERT INTO Vehicle_Class (Description)
VALUES ('Panel Van'),('Sudan'),('Hatchback'),('Bakkie'),('Motorcycle'),('Minibus');

INSERT INTO Mechanic(Mechanic_Email, Mechanic_Name)
VALUES ('fouriegeorge134@gmail.com', 'George GM');

INSERT INTO Booking_Type (Description)
VALUES ('Delivery'),('Pickup'),('Transportation');

INSERT INTO Parcel_Type (Description)
VALUES ('Documents'),('Money'),('Contracts');

INSERT INTO Parcel_Priority (Priority)
VALUES ('Urgent'),('Not Urgent');

INSERT INTO Parcel_Confidentiality(Confidentiality)
VALUES ('High'),('Meduim'),('Low');

INSERT INTO Booking_Status(Status)
VALUES ('Placed'),('Completed'),('In Progress');

INSERT INTO Incident_Status(Status)
VALUES (1),(0);

INSERT INTO Driver_Status(Availability)
VALUES (1),(0);

--RUN LAST-------------------------------------------------------------------->
INSERT INTO Vehicle(Activated,Availability,Manufactured_Date,Manufacturer_ID,Model_ID,RegistrationNumber,VehicleClass_ID)
VALUES (1,1,'2022-09-06',2,1,'HL21BLGP',5);

INSERT INTO Settings(Settings_ID, LogoutTimer)
VALUES (1,300);

INSERT INTO Client_Information(ClientUser_ID,Company_ID,Title_ID)
VALUES ('Event',1,1)

