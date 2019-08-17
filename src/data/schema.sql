SET foreign_key_checks = 0;
DROP TABLE IF EXISTS `File`;
CREATE TABLE IF NOT EXISTS `File` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `creatorID` int(11) NOT NULL,
  `s3BucketName` varchar(50) NOT NULL,
  `pathToObject` varchar(200) NOT NULL,
  `userProvidedFilename` varchar(200) NOT NULL,
  `dateCreated` DATE NOT NULL,
  `uploadStatus` BOOLEAN,
  FOREIGN KEY (creatorID) REFERENCES User(ID),
  PRIMARY KEY (`ID`),
  UNIQUE(`s3BucketName`, `pathToObject`)
);

DROP TABLE IF EXISTS `User`;
CREATE TABLE IF NOT EXISTS `User` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL UNIQUE,
  `email` varchar(200) NOT NULL UNIQUE,
  `cryptedPassword` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
);

DROP TABLE IF EXISTS `Users_to_Files`;
CREATE TABLE IF NOT EXISTS `Users_to_Files` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `fileID` int(11) NOT NULL,
  `inTrashStatus` BOOLEAN,
  FOREIGN KEY (userID) REFERENCES User(ID),
  FOREIGN KEY (fileID) REFERENCES File(ID),
  UNIQUE(`userID`, `fileID`),
  PRIMARY KEY (`ID`)
);
SET foreign_key_checks = 1;
