export function getError(errorData:any){
    let message='UNKNOWN ERROR!';
    let name='UNKNOWN';
    console.log(errorData)
    if(errorData.hasOwnProperty("name")){
        message=errorData.name.message
        name=errorData.name.name
    }else if(errorData.hasOwnProperty("phone_number")){
        message=errorData.phone_number.message
        name=errorData.phone_number.name
    }else if(errorData.hasOwnProperty("email")){
        message=errorData.email.message
        name=errorData.email.name
    }else if(errorData.hasOwnProperty("password")){
        message=errorData.password.message
        name=errorData.napasswordme.name
    }else if(errorData.hasOwnProperty("passwordConfirm")){
        message=errorData.passwordConfirm.message
        name=errorData.passwordConfirm.name
    }else if(errorData.hasOwnProperty("location")){
        message=errorData.location.message
        name=errorData.location.name
    }else if(errorData.hasOwnProperty("misc")){
        message=errorData.misc.message
        name=errorData.misc.name
    }
    else{
        message="UNKNOWN ERROR!"
    }
    return {name,message};
}