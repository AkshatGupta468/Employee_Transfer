import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getToken(){
        console.log('Getting Token...')
        try {
            const value = await AsyncStorage.getItem('TOKEN')
            return value||null;
        } catch (error) {
            console.log('Failed to retrieve token');
            console.log(error);
        }
}

export function saveToken(token:string){
    try{
        AsyncStorage.setItem('TOKEN',token);
    }catch(error){
        console.log('Failed to store token');
        console.log(error);
    }
}

export function removeToken(){
    try{
        AsyncStorage.removeItem('TOKEN');
    }catch(error){
        console.log('Failed to remove token');
        console.log(error);
    }
}