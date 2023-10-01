import AsyncStorage from '@react-native-async-storage/async-storage';
import User from './Datatypes';
import React,{useState} from 'react';

const delimiter:string='#$'
const UserParams:User={
    name:'NAME',
    location:'LOCATION',
    preferredLocations:['PREFERREDLOCATIONS'],
    photo:'PHOTO',
    email:'EMAIL',
    _id:'ID',
}

function separateAndSaveToArray(inputString: string|null): string[] {
    if(inputString===null)return [];
    const substrings = inputString.split(delimiter).map(substring => substring.trim());
    return substrings;
}

export async function getUserData(){
    console.log('Getting User...')
    try {
        let id=await AsyncStorage.getItem(UserParams._id)
        let name=await AsyncStorage.getItem(UserParams.name);
        let email=await AsyncStorage.getItem(UserParams.email);
        let location=await AsyncStorage.getItem(UserParams.location);
        let preferredLocationsString=await AsyncStorage.getItem(UserParams.preferredLocations[0]);
        let photo=await AsyncStorage.getItem(UserParams.photo);
        let user:User={
            _id:id===null?'':id,
            name:name===null?'':name,
            email:email===null?'':email,
            location:location===null?'':location,
            photo:photo===null?'':photo,
            preferredLocations:separateAndSaveToArray(preferredLocationsString)
        }
        return user;
    } catch (error) {
        console.log('Failed to retrieve user');
        console.log(error);
    }
}

export async function saveUserData(user:User){
    try{
        AsyncStorage.multiSet([['NAME',user.name],
        ['LOCATION',user.location],
        ['PHOTO',user.photo],
        ['EMAIL',user.email],
        ['PREFERREDLOCATIONS',user.preferredLocations.join(delimiter)]])
    }catch(error){
        console.log('Failed to store User');
        console.log(error);
    }
}

export async function removeUserData(){
    try{
        AsyncStorage.multiRemove(['NAME','LOCATION','PHOTO','EMAIL','PREFERREDLOCATIONS']);
    }catch(error){
        console.log('Failed to remove user');
        console.log(error);
    }
}

export async function saveUserName(name:string){
    try{
        AsyncStorage.setItem(UserParams.name,name)
    }catch(error){
        console.log('Failed to store name');
        console.log(error);
    }
}

export async function saveUserPhoto(photo:string){
    try{
        AsyncStorage.setItem(UserParams.photo,photo)
    }catch(error){
        console.log('Failed to store photo');
        console.log(error);
    }
}

export async function saveUserLocation(location:string){
    try{
        AsyncStorage.setItem(UserParams.location,location)
    }catch(error){
        console.log('Failed to store location');
        console.log(error);
    }
}

export async function saveUserPreferredLocations(locations:string[]){
    try{
        AsyncStorage.setItem(UserParams.preferredLocations[0],locations.join(delimiter))
    }catch(error){
        console.log('Failed to store preferred locations');
        console.log(error);
    }
}