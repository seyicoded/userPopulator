import {useState, useEffect, useRef} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Provider, TextInput, Button } from 'react-native-paper'
import axios from 'axios';

const defaultImage = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdesignshack.net%2Fwp-content%2Fuploads%2Fplaceholder-image.png&f=1&nofb=1";
export default function App() {
  const [image1, setImage1] = useState<any>(null);
  const [image2, setImage2] = useState<any>(null);
  const [image3, setImage3] = useState<any>(null);
  const [logger, setLogger] = useState<[]|any>([]);
  const [counter, setCounter] = useState<any>('');
  const loggerRef: any = useRef([])
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      return (result);
    }
    return null;
  };

  const pushToLogger = (string: string)=>{
    loggerRef.current = [...loggerRef.current, ...[string]];
    setLogger(loggerRef.current)
  }

  const randomNumber = async (length: number)=>{
    return Math.floor(Math.random() * length);
  }

  const logic = async (presentNumber: number)=>{
    const data1 = {
      email: `teste${await randomNumber(1000)}ma${await randomNumber(1000)}il${await randomNumber(1000)}@gmail.com`,
      first_name: "John",
      last_name: "John",
      phone: `081234567${await randomNumber(9)}${await randomNumber(9)}`,
      password: "Tester123$",
      dob: "1975-03-25",
      gender: "male",
      newsletter: 0
    }

    try{
      const res = await axios.post('https://reason1.herokuapp.com/v1/sign-up', data1);

      const token = (res.data).token;

      const res1 = await axios.post('https://reason1.herokuapp.com/v1/profile/post-reg-intension', {
        intension: "marriage"
      }, {
        headers: {
          Authorization: "Bearer "+token
        }
      });

      let localUri1 = image1.uri;
      let filename1 = localUri1.split('/').pop();

      let match1 = /\.(\w+)$/.exec(filename1);
      let type1 = match1 ? `image/${match1[1]}` : `image`;

      let formData1: any = new FormData();
      formData1.append('media', { name: localUri1, type: type1, uri: localUri1 })

      const res2 = await axios.post('https://reason1.herokuapp.com/v1/profile/upload-main-media', formData1, {
        headers: {
          'Authorization': "Bearer "+token,
          'Content-Type': 'multipart/form-data'
        }
      });

      let localUri2 = image2.uri;
      let filename2 = localUri2.split('/').pop();

      let match2 = /\.(\w+)$/.exec(filename2);
      let type2 = match2 ? `image/${match2[1]}` : `image`;
      
      let formData2: any = new FormData();
      formData2.append('media', { name: localUri2, type: type2, uri: localUri2 })

      const res3 = await axios.post('https://reason1.herokuapp.com/v1/profile/upload-other-media', formData2, {
        headers: {
          'Authorization': "Bearer "+token,
          'Content-Type': 'multipart/form-data'
        }
      });

      let localUri3 = image3.uri;
      let filename3 = localUri3.split('/').pop();

      let match3 = /\.(\w+)$/.exec(filename3);
      let type3 = match3 ? `image/${match3[1]}` : `image`;

      let formData3: any = new FormData();
      formData3.append('media', { name: localUri3, type: type3, uri: localUri3 })

      const res4 = await axios.post('https://reason1.herokuapp.com/v1/profile/upload-other-media', formData3, {
        headers: {
          'Authorization': "Bearer "+token,
          'Content-Type': 'multipart/form-data'
        }
      });

      pushToLogger(`${data1.email}:: ${(res1.data.status)? 'created':'not created'}`);


    }catch(e: any){
      console.log(e)
      pushToLogger(e.toString());
      console.log(e.response)
    }
    

    // code to create single complete user

    // code to push to logger
    // pushToLogger(data1.email.toString());

    if(presentNumber < parseInt(counter)){
      presentNumber++;
      setTimeout(()=>{
        (async()=>{
          await logic(presentNumber)
        })()
      }, 500)
    }

  }

  const startAction = async ()=>{
    let count = 0;
    await logic(count)
  }

  // console.log(logger)

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Select Images then Click upload to populate</Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <TouchableOpacity
              onPress={()=>{
                (async()=>{
                  const res = await pickImage();
                  if(res == null){
                    return
                  }

                  setImage1(res)
                })()
              }}
              style={{ width: '30%', }}>
              <Image source={{ uri: image1?.uri || defaultImage }} style={{ width: '100%', height: 100 }} />
              <Text>mainly </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=>{
                (async()=>{
                  const res = await pickImage();
                  if(res == null){
                    return
                  }

                  setImage2(res)
                })()
              }}
              style={{ width: '30%', }}>
              <Image source={{ uri: image2?.uri || defaultImage }} style={{ width: '100%', height: 100 }} />
              <Text>minor </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=>{
                (async()=>{
                  const res = await pickImage();
                  if(res == null){
                    return
                  }

                  setImage3(res)
                })()
              }}
              style={{ width: '30%', }}>
              <Image source={{ uri: image3?.uri || defaultImage }} style={{ width: '100%', height: 100 }} />
              <Text>minor </Text>
            </TouchableOpacity>
            
          </View>

          <View>
            <TextInput value={counter} onChangeText={(txt)=>setCounter(txt) } mode='outlined' placeholder='enter number of loop' style={{ backgroundColor: 'white' }} />
          </View>
          <Text>Would simple create user multiple times</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button onPress={()=>{
              startAction()
            }}>GENERATE USERS</Button>
            
            <Button onPress={()=>{
              loggerRef.current = [];
              setLogger([])
            }}>CLEAR LOG</Button>
          </View>

          <Text style={{ marginTop: 15, marginBottom: 4 }}>Log</Text>
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: 4, padding: 8 }}>
            <Text style={{ color: 'white' }}>{logger.reverse().join('\n\n')}</Text>
          </View>

        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  title: {
    fontWeight: '700',
    fontSize: 14,
    paddingVertical: 10
  }
});
