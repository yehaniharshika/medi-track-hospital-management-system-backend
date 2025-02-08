

CREATE DATABASE MediTrack;

USE MediTrack;

CREATE TABLE Department (

                          CustomerID INT AUTO_INCREMENT PRIMARY KEY,

                          Name VARCHAR(100) NOT NULL,

                          Address VARCHAR(255) NOT NULL,

                          Email VARCHAR(100) UNIQUE NOT NULL

);



-- Table for items

CREATE TABLE Item (

                      ItemID INT AUTO_INCREMENT PRIMARY KEY,

                      Name VARCHAR(100) NOT NULL,

                      Quantity INT NOT NULL,

                      Price DECIMAL(10, 2) NOT NULL

);



-- Table for orders

CREATE TABLE `Order` (

                         OrderID INT AUTO_INCREMENT PRIMARY KEY,

                         CustomerID INT NOT NULL,

                         OrderDate DATETIME DEFAULT CURRENT_TIMESTAMP,

                         FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE

);



-- Table for order details

CREATE TABLE OrderDetails (

                              OrderDetailsID INT AUTO_INCREMENT PRIMARY KEY,

                              OrderID INT NOT NULL,

                              ItemID INT NOT NULL,

                              Quantity INT NOT NULL,

                              Price DECIMAL(10, 2) NOT NULL,

                              FOREIGN KEY (OrderID) REFERENCES `Order`(OrderID) ON DELETE CASCADE,

                              FOREIGN KEY (ItemID) REFERENCES Item(ItemID) ON DELETE CASCADE

);

