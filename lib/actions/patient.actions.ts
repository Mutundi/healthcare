'use server';

import {ID, Query} from 'node-appwrite';
import { InputFile } from 'node-appwrite/file'


import {
    BUCKET_ID,
    DATABASE_ID,
    ENDPOINT,
    PATIENT_COLLECTION_ID,
    PROJECT_ID,
    databases,
    storage,
    users,
} from '../appwrite.config';
import { parseStringify } from '../utils';

//CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
    try {
        //Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
        const newuser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        );

        return parseStringify(newuser);
    } catch (error: any) {
        //check existing user
        if (error && error?.code === 409) {
            const existingUser = await users.list([
                Query.equal('email', [user.email]),
            ]);
            return existingUser.users[0];
        }

        console.log("An error occured while creating a new user:", error);
    }
};

//GET USER
export const getUser = async (userId: string) => {
    try {

        const user = await users.get(userId);

        return parseStringify(user);

    } catch (error) {

        console.log('An error occurred while retrieving the user details:', error)

    }
};

//REGISTER PATIENT
export const registerPatient = async ({
    identificationDocument,
    ...patient
}: RegisterUserParams) => {

    try {
        // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
        let file;
    if (identificationDocument) {

        const blobFile = identificationDocument?.get('blobFile');
        const fileName = identificationDocument?.get('fileName');


        // console.log('blobFile type:', typeof blobFile);
        // console.log('Is Buffer:', Buffer.isBuffer(blobFile));
        // console.log('Is Blob:', blobFile instanceof Blob);
        // console.log('fileName:', fileName);

        const inputFile = 
            identificationDocument &&
            InputFile.fromBuffer(
                blobFile as Blob,
                fileName as string
            );

        // const inputFile = new InputFile(
        //     identificationDocument?.get("blobFile") as Blob,
        //     identificationDocument?.get("fileName") as string
        //   );

            file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }
    
    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await databases.createDocument(
        DATABASE_ID!,
        PATIENT_COLLECTION_ID!,
        ID.unique(),
        {
            identificationDocumentId: file?.$id || null,
            identificationDocumentUrl: file?.$id 
            ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
            : null,
            ...patient,
        }
    );
   
    return parseStringify(newPatient);
    } catch (error) {
        console.log('An error occurred while creating a new patient:', error)
    }
    
};

//GET PATIENT
export const getPatient = async (userId: string) => {
    try {
      const allPatients = await databases.listDocuments(
        DATABASE_ID!,
        PATIENT_COLLECTION_ID!
      );
      
    //   console.log('All patients:', allPatients.documents);
      
      const matchingPatients = allPatients.documents.filter(
        patient => patient.userId === userId
      );
      
    //   console.log('Matching patients:', matchingPatients);
      
      if (matchingPatients.length === 0) {
        console.log('No patient found for userId:', userId);
        return null;
      }
      
      return parseStringify(matchingPatients[0]);
    } catch (error) {
      console.log('An error occurred while retrieving patient details:', error);
      return null;
    }
  };