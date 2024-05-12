import { IsNotEmpty, IsBoolean, IsEmail, IsEnum } from 'class-validator';
import { Gender } from '../schemas/form_schema'
export class CreateFormDto {
  @IsNotEmpty()
  passport: string;

  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  knownUnderDifferentNames: boolean;

  anotherSurname: string;

  nextFirstName: string;

  @IsNotEmpty()
  birthday: {
    day: number;
    month: number;
    year: number;
  };

  @IsNotEmpty()
  birthplaceCity: string;

  @IsNotEmpty()
  countryOfBirth: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  surnameFather: string;

  @IsNotEmpty()
  firstNameFather: string;

  @IsNotEmpty()
  surnameMother: string;

  @IsNotEmpty()
  firstNameMother: string;

  @IsEmail()
  @IsNotEmpty()
  emailAddress: string;

  @IsNotEmpty()
  telephoneNumber: string;

  mobileNumber: string;

  @IsNotEmpty()
  homeAddressLine1: string;

  homeAddressHeading2: string;

  homeAddressHousingNumber: string;

  @IsNotEmpty()
  homeAddressCity: string;

  @IsNotEmpty()
  homeAddressState: string;

  @IsNotEmpty()
  countryMainResidence: string;

  @IsNotEmpty()
  socialMediaProfiles: boolean;

  @IsNotEmpty()
  travelNumber: string;

  @IsNotEmpty()
  nationality: string;

  nationalIdentificationNumber: string;

  @IsNotEmpty()
  dateOfIssueOfPassport: {
    day: number;
    month: number;
    year: number;
  };

  @IsNotEmpty()
  expirationDateOfPassport: {
    day: number;
    month: number;
    year: number;
  };

  @IsNotEmpty()
  issuedPassportFromAnotherCountry: boolean;

  exhibitionCountry: string;

  typeOfDocument: string;

  documentNumber: string;

  @IsNotEmpty()
  expirationYear: number;

  @IsNotEmpty()
  citizenOfAnotherCountry: boolean;

  countryOfCitizenship: string;

  acquisitionOfCitizenship: string;

  otherCountryOfCitizenship: boolean;

  otherCountryCitizenFrom: {
    day: number;
    month: number;
    year: number;
  };

  otherCountryCitizenUpTo: {
    day: number;
    month: number;
    year: number;
  };

  @IsNotEmpty()
  emergencyContact: {
    surname: string;
    name: string;
    telephoneNumber: string;
  }
    @IsEmail()
    email: string;
  

  @IsNotEmpty()
  transitToUSA: boolean;

  usContactPerson: string;

  usContactPersonAddressLine1: string;

  usContactPersonAddressLine2: string;

  usContactPersonApartmentNumber: string;

  usContactPersonCity: string;

  usContactPersonState: string;

  usContactPersonPhoneNumber: string;

  @IsNotEmpty()
  currentOrPreviousEmployer: boolean;

  @IsNotEmpty()
  physicalOrMentalIllness: boolean;

  @IsNotEmpty()
  arrestedOrConvicted: boolean;

  @IsNotEmpty()
  violatedDrugLaws: boolean;

  @IsNotEmpty()
  plannedOrParticipatedTerrorism: boolean;

  @IsNotEmpty()
  committedFraud: boolean;

  @IsNotEmpty()
  seekingEmploymentInUS: boolean;

  @IsNotEmpty()
  refusedVisa: boolean;

  @IsNotEmpty()
  overstayedInUS: boolean;

  @IsNotEmpty()
  presentInRestrictedCountries: boolean;

  @IsNotEmpty()
  globalEntryProgramMember: boolean;

  @IsNotEmpty()
  enteringUSWithin72Hours: boolean;
}
