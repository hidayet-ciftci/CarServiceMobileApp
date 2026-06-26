Drop table "Customers";

Create table "Customers" (
	"Id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
	"FirstName" varchar(50) NOT NULL,
	"LastName" varchar(50) NOT NULL,
	"PhoneNumber" varchar(15) UNIQUE CHECK(Length("PhoneNumber") > 5),
	"Email" varchar(50) NOT NULL UNIQUE,
	"Address" varchar(250),
	"CreatedTime" Timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

Create table "Vehicles" (
	"Id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
	"CustomerId" INT NOT NULL REFERENCES "Customers"("Id"),
	"Plate" varchar(50) NOT NULL UNIQUE,
	"Brand" varchar(13) NOT NULL,
	"Color" varchar(50) NOT NULL,
	"VIN_Number" varchar(250) NOT NULL UNIQUE,
	"CreatedTime" Timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

Create table "Users" (
	"Id" SERIAL NOT NULL UNIQUE PRIMARY KEY,
	"FirstName" varchar(50) NOT NULL,
	"LastName" varchar(50) NOT NULL,
	"Email" varchar(50) NOT NULL UNIQUE,
	"PasswordHash" varchar(250) NOT NULL,
	"PhoneNumber" varchar(15) NOT NULL UNIQUE,
	"Status" BOOL NOT NULL DEFAULT '1',
	"CreatedTime" Timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- 1 -> Admin -> Hepsi
-- 2 -> Tamirci -> ServiceRecord
-- 3 -> Musteri temsilcisi -> Customer ve Vehicle

Create Table "ServiceRecords" (
	"Id" SERIAL NOT NULL UNIQUE PRIMARY KEY,
	"VehicleId" INT NOT NULL REFERENCES "Vehicles"("Id"),
	"UserId" INT NOT NULL REFERENCES "Users"("Id"),
	"Description" varchar(250) DEFAULT '',
	"State" varchar(25) NOT NULL CHECK("State" IN('Tamamlandi','Devam Ediyor','Yeni Basladi')),
	"PlannedEndDate" Timestamp DEFAULT Current_TIMESTAMP + INTERVAL '3 DAY',
	"EndDate" Timestamp,
	"Price" Decimal(8,2) default 0,
	"CreatedTime" Timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- enum yerine yeni tablo
Create Table "OperationClaims" (
	"Id" SERIAL NOT NULL UNIQUE PRIMARY KEY,
	"Name" varchar(25) NOT NULL UNIQUE
);

Create Table "UserOperationClaims" (
	"Id" SERIAL NOT NULL UNIQUE PRIMARY KEY,
	"UserId" INT NOT NULL UNIQUE REFERENCES "Users"("Id"),
	"OperationClaimId" INT NOT NULL REFERENCES "OperationClaims"("Id")
);

INSERT INTO "Customers" ("FirstName","LastName","PhoneNumber","Email","Address") 
	VALUES ('alib','velic','+905416112234','customer124@email.com','Ankara Turkiye');

INSERT INTO "Vehicles" ("CustomerId","Plate","Brand","Color","VIN_Number") 
	VALUES (2,'34AB723','Mercedes','Siyah','12AB453İ');

INSERT INTO "Users" ("FirstName","LastName","Email","PasswordHash","PhoneNumber") 
	VALUES ('admin','admin','user3@email.com','123456789','+90541111122345');

INSERT INTO "ServiceRecords" (
	"VehicleId","UserId","Description",
	"State","Price") 
		VALUES (3,24,'Vites2 sorunu var','Yeni Basladi',101);
		
INSERT INTO "OperationClaims" ("Name") VALUES ('Admin') , ('Worker') , ('Manager');

INSERT INTO "UserOperationClaims" ("UserId","OperationClaimId") VALUES (4,1);

ALTER TABLE "Users" ADD COLUMN "RefreshToken" VARCHAR(255);
ALTER TABLE "Users" ADD COLUMN "RefreshTokenExpiry" TIMESTAMP;

select * from "Vehicles";
select * from "Customers";
Select * from "Users";
Select * from "ServiceRecords";
Select * FROM "UserOperationClaims";
Select * from "OperationClaims";

Delete FROM "Vehicles" WHERE "CustomerId" = 2;

Select 
c."FirstName"|| ' ' ||c."LastName" as "FullName",
c."PhoneNumber", 
c."Email",
c."Address",
v."Plate",
v."Brand",
v."Color",
v."VIN_Number",
(select u."FirstName" || ' ' || u."LastName" as "FullName" from "Users" u where u."Id" = sr."UserId"),
sr."Description",
sr."State",
sr."Price",
sr."PlannedEndDate",
sr."EndDate",
sr."CreatedTime"
from "Customers" c 
join "Vehicles" v 
on c."Id" = v."CustomerId" 
join "ServiceRecords" sr
on sr."VehicleId" = v."Id";


CREATE VIEW "vw_service_detail" AS
Select 
c."FirstName"|| ' ' ||c."LastName" as "FullName",
c."PhoneNumber", 
c."Email",
c."Address",
v."Plate",
v."Brand",
v."Color",
v."VIN_Number",
(select u."FirstName" || ' ' || u."LastName" as "employer_Name" from "Users" u where u."Id" = sr."UserId"),
sr."Description",
sr."State",
sr."Price",
sr."PlannedEndDate",
sr."EndDate",
sr."CreatedTime"
from "Customers" c 
join "Vehicles" v 
on c."Id" = v."CustomerId" 
join "ServiceRecords" sr
on sr."VehicleId" = v."Id";

SELECT * FROM "vw_service_detail";

DROP VIEW "vw_service_detail";

ALTER VIEW "vw_OrderSummary"
AS
SELECT
    o.Id AS OrderId,
    c.FullName,
    c.Email,
    o.OrderDate,
    o.TotalAmount,
    o.Status
FROM Orders o
INNER JOIN Customers c ON o.CustomerId = c.Id;

ALTER TABLE "Vehicles"
ALTER COLUMN "CreatedTime"
TYPE timestamptz
USING "Creat"


--DROP TABLE "OperationClaims";