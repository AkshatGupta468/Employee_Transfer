import AsyncStorage from '@react-native-async-storage/async-storage';
export async function getToken(){
    console.log('Getting Token...')
    token = await AsyncStorage.getItem('TOKEN')
    return token;
}

export async function saveToken(token:string){
    try{
        AsyncStorage.setItem('TOKEN',token);
    }catch(error){
        console.log('Failed to store token');
        console.log(error);
    }
}

export async function removeToken(){
    try{
        AsyncStorage.removeItem('TOKEN');
    }catch(error){
        console.log('Failed to remove token');
        console.log(error);
    }
}