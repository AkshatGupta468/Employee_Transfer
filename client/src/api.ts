import { BACKEND_BASE_URL } from "@env";
import axios from "axios";
import { getToken, saveToken } from "./utils/TokenHandler";
import { getError } from "./utils/ErrorClassifier";

interface APIResponse{
    error:boolean;
    message:string;
};

export async function saveProfileAPI(name:string,location:string|undefined,preferredLocation:string[]|undefined):Promise<APIResponse>{
    await getToken()
    console.log(token)
    return await axios.patch(`${BACKEND_BASE_URL}/profile`,{
        name: name,
        location: location,
        preferredLocations:preferredLocation,
    },{headers:{Authorization:`Bearer ${token}`}})
    .then(response=>{
        console.log(response.data);
        console.log('sent data');
        const myuser:User={
            _id:response.data.data.user._id,
            name:response.data.data.user.name,
            email:response.data.data.user.email,
            location:response.data.data.user.location,
            preferredLocations:response.data.data.user.preferredLocations,
            photo:response.data.data.user.hasOwnProperty("photo")?response.data.data.user.photo:''
        }
        currentUser=myuser
        console.log(myuser)
        return {error:false,message:'Profile created successfully'};})
    .catch((error)=>{
        let errorData=error.response.data.errors;
        let {name,message}=getError(errorData)
        console.log('ERROR! : ',message)
        return {error:true,message:message};
    })
}

export async function createId(email:string,password:string,confirmPassword:string):Promise<APIResponse>{
    return axios.post(`${BACKEND_BASE_URL}/signup`, {
        email: email,
        password: password,
        passwordConfirm: confirmPassword
    })
        .then(response => {
            console.log(email, password, confirmPassword);
            console.log(response.data);
            saveToken(response.data.token);
            return { error: false, message: 'Sign Up successful' };
        })
        .catch((error) => {
            let errorData = error.response.data.errors;
            let { name, message } = getError(errorData);
            return { error: true, message: message };
        });
}

export async function forgotPassword(email:string):Promise<APIResponse>{
    return axios.post(`${BACKEND_BASE_URL}/forgotPassword`,{email})
    .then(response=>{
        console.log(response.data);
        return {error:false,message:'Mail sent successfully'}
    }).catch((error)=>{
        let message:string
        let errorData=error.response.data.errors;
        if(errorData.hasOwnProperty("email")){
            message=errorData.email.message
        }else{
            message='Unknown Error'
        }
        console.log(message)
        return {error:true,message:message}
    })
}

export async function signIn(email:string,password:string):Promise<APIResponse>{
    return axios.post(`${BACKEND_BASE_URL}/login`,{email,password})
        .then(async response=>{
            console.log(response.data.data);
            token=response.data.token
            saveToken(response.data.token)
            if(!(response.data.data.user.hasOwnProperty("name"))||!(response.data.data.user.hasOwnProperty("location"))||!(response.data.data.user.hasOwnProperty("preferredLocations"))){
                console.log("GO to profile form screen")
                return {error:false,message:'1'};
            }else{
                const myuser:User={
                    _id:response.data.data.user._id,
                    name:response.data.data.user.name,
                    email:response.data.data.user.email,
                    location:response.data.data.user.location,
                    preferredLocations:response.data.data.user.preferredLocations,
                    photo:response.data.data.user.hasOwnProperty("photo")?response.data.data.user.photo:''
                }
                currentUser=myuser
                console.log("go within app")
                return {error:false,message:'2'};
            }
        }).catch((error)=>{
            return {error:true,message:getError(error.response.data.errors).message};
        })
}

export async function updatePassword(oldPassword:string,newPassword:string,confirmationPassword:string):Promise<APIResponse>{
    // how does update password actually update
    let token=await getToken();
    return axios.patch(`${BACKEND_BASE_URL}/updatePassword`,{
        password:oldPassword,
        passwordConfirm:newPassword
    },{headers:{Authorization:`Bearer ${token}`}})
        .then(response=>{
            console.log(response.data)
            return {error:false,message:'Password Changed Successfully'}
        }).catch((error)=>{
            let errorData=error.response.data;
            let {name,message}=getError(errorData);
            return {error:true,message:message}
        })
}

export async function updatePhoto(base64:string):Promise<APIResponse>{
    let token=await getToken();
    return await axios.patch(`${BACKEND_BASE_URL}/profile`,{photo:base64},{headers:{Authorization:`Bearer ${token}`}}).
    then(async response=>{
        return {error:false,message:'Image uploaded successfully'}             
    })
    .catch(error=>{
        return {error:true,message:'Could not upload'}
    })
}

export async function updateProfile(patchData:{}):Promise<APIResponse>{
    let token=await getToken();
    return await axios.patch(`${BACKEND_BASE_URL}/profile`,patchData,{headers:{Authorization:`Bearer ${token}`}})
    .then(async response=>{
        console.log(response.data)
        return {error:false,message:'Profile updated successfully'}
    }).catch((error)=>{
        let errorData=error.response.data;
        let {name,message}=getError(errorData);
        return {error:true,message:message}
    })
}