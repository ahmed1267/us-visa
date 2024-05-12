import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Define the document type for the user schema
export type FormDocument = From & Document;
export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}
// Define the user schema
@Schema({
  timestamps: true, // Add timestamps for createdAt and updatedAt
})
export class From {
  @Prop({ required: true })
  passport: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  knownUnderDifferentNames: boolean;

  @Prop()
  anotherSurname: string;

  @Prop()
  nextFirstName: string;

  @Prop({ required: true })
  birthday: {
    day: number;
    month: number;
    year: number;
  };

  @Prop({ required: true })
  birthplaceCity: string;

  @Prop({ required: true })
  countryOfBirth: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  surnameFather: string;

  @Prop({ required: true })
  firstNameFather: string;

  @Prop({ required: true })
  surnameMother: string;

  @Prop({ required: true })
  firstNameMother: string;

  @Prop({ required: true })
  emailAddress: string;

  @Prop({ required: true })
  telephoneNumber: string;

  @Prop()
  mobileNumber: string;

  @Prop({ required: true })
  homeAddressLine1: string;

  @Prop()
  homeAddressHeading2: string;

  @Prop()
  homeAddressHousingNumber: string;

  @Prop({ required: true })
  homeAddressCity: string;

  @Prop({ required: true })
  homeAddressState: string;

  @Prop({ required: true })
  countryMainResidence: string;

  @Prop({ required: true })
  socialMediaProfiles: boolean;

  @Prop({ required: true })
  travelNumber: string;

  @Prop({ required: true })
  nationality: string;

  @Prop()
  nationalIdentificationNumber: string;

  @Prop({ required: true })
  dateOfIssueOfPassport: {
    day: number;
    month: number;
    year: number;
  };

  @Prop({ required: true })
  expirationDateOfPassport: {
    day: number;
    month: number;
    year: number;
  };

  @Prop({ required: true })
  issuedPassportFromAnotherCountry: boolean;

  @Prop()
  exhibitionCountry: string;

  @Prop()
  typeOfDocument: string;

  @Prop()
  documentNumber: string;

  @Prop({ required: true })
  expirationYear: number;

  @Prop({ required: true })
  citizenOfAnotherCountry: boolean;

  @Prop()
  countryOfCitizenship: string;

  @Prop()
  acquisitionOfCitizenship: string;

  @Prop()
  otherCountryOfCitizenship: boolean;

  @Prop()
  otherCountryCitizenFrom: {
    day: number;
    month: number;
    year: number;
  };

  @Prop()
  otherCountryCitizenUpTo: {
    day: number;
    month: number;
    year: number;
  };

  @Prop({ required: true })
  emergencyContact: {
    surname: string;
    name: string;
    telephoneNumber: string;
    email: string;
  };

  @Prop({ required: true })
  transitToUSA: boolean;

  @Prop()
  usContactPerson: string;

  @Prop()
  usContactPersonAddressLine1: string;

  @Prop()
  usContactPersonAddressLine2: string;

  @Prop()
  usContactPersonApartmentNumber: string;

  @Prop()
  usContactPersonCity: string;

  @Prop()
  usContactPersonState: string;

  @Prop()
  usContactPersonPhoneNumber: string;

  @Prop({ required: true })
  currentOrPreviousEmployer: boolean;

  @Prop({ required: true })
  physicalOrMentalIllness: boolean;

  @Prop({ required: true })
  arrestedOrConvicted: boolean;

  @Prop({ required: true })
  violatedDrugLaws: boolean;

  @Prop({ required: true })
  plannedOrParticipatedTerrorism: boolean;

  @Prop({ required: true })
  committedFraud: boolean;

  @Prop({ required: true })
  seekingEmploymentInUS: boolean;

  @Prop({ required: true })
  refusedVisa: boolean;

  @Prop({ required: true })
  overstayedInUS: boolean;

  @Prop({ required: true })
  presentInRestrictedCountries: boolean;

  @Prop({ required: true })
  globalEntryProgramMember: boolean;

  @Prop({ required: true })
  enteringUSWithin72Hours: boolean;

}

// Create the Mongoose schema for the user class
export const FormSchema = SchemaFactory.createForClass(From);
