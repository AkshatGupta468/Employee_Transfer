import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../interfaces/app_interfaces';
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

function separateAndSaveToArray(inputString: String|null): String[] {
    if(inputString===null)return [];
    inputString=inputString.toString()
    const substrings = inputString.split(delimiter).map(substring => substring.trim());
    return substrings;
}

export async function  getUserData():Promise<User|undefined>{
    try {
        const userString =await AsyncStorage.getItem('user')
        if(userString)
            return JSON.parse(userString)
    } catch (error) {
        console.log('Failed to retrieve user');
        console.log(error);
    }
}
export async function clearUserData(){
    try {
        await AsyncStorage.clear()
    } catch (error) {
        console.log('Failed to retrieve user');
        console.log(error);
    }
}
export async function saveUserData(user:User){
    try{
        AsyncStorage.setItem('user',JSON.stringify(user))
    }catch(error){
        console.log('Failed to store User');
        console.log(error);
    }
}

export async function removeUserData(){
    try{
        AsyncStorage.removeItem('user')
    }catch(error){
        console.log('Failed to remove user');
        console.log(error);
    }
}

export async function saveUserName(name:string){
    try{
        const user=await getUserData();
        if(user){
            user.name=name;
            await saveUserData(user)
        }
    }catch(error){
        console.log('Failed to store name');
        console.log(error);
    }
}

export async function saveUserPhoto(photo:string){
    try{
        const user=await getUserData();
        if(user){
            user.photo=photo;
            await saveUserData(user)
        }
    }catch(error){
        console.log('Failed to store photo');
        console.log(error);
    }
}

export async function saveUserLocation(location:string){
    try{
        const user=await getUserData();
        if(user){
            user.location=location;
            await saveUserData(user)
        }
    }catch(error){
        console.log('Failed to store location');
        console.log(error);
    }
}

export async function saveUserPreferredLocations(locations:string[]){
    try{
        const user=await getUserData();
        if(user){
            user.preferredLocations=locations
            await saveUserData(user)
        }
    }catch(error){
        console.log('Failed to store preferred locations');
        console.log(error);
    }
}