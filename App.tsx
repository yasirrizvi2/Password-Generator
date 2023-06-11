import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Formik } from 'formik';

//Form validation
import * as Yup from 'yup';

const passwordSchema = Yup.object().shape({
passwordLength: Yup.number()
.min(4,"password  should be of min 4 character ")
.max(16,"password  should be of min 16 character ")
.required('length is required')
});


export default function App() {

  const [password, setPassword] = useState('');
  const[isPassGenerated, setIsPassGenerated] = useState(false); 

  const[lowerCase, setLowerCase] = useState(true);
  const[upperCase, setUpperCase] = useState(false);
  const[numbers, setNumbers] = useState(false);
  const[symbols, setSymbols] = useState(false);


  // The password is generated
  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChars
    }
    if (lowerCase) {
      characterList += lowerCaseChars
    }
    if (numbers) {
      characterList += digitChars
    }
    if (symbols) {
      characterList += specialChars
    }

    const passwordResult = createPassword(characterList, passwordLength )

    setPassword(passwordResult)
    setIsPassGenerated(true)
    
  }


//logic for Creating a random password using characters and passwordlength as parameters(input) in the function.
const createPassword = (characters: string, passwordLength: number) => {
  let result ='';
  for(let i=0; i < passwordLength; i++){
    let characterIndex = Math.round(Math.random() * characters.length);
    result += characters.charAt(characterIndex);
  }
  return result;
}

//This reset function resets all the states to initial state.
const resetPasswordState = () => {
  setPassword('')
  setIsPassGenerated(false)
  setLowerCase(true)
  setUpperCase(false)
  setNumbers(false)
  setSymbols(false)
  
  
}


  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}> 
          <View style={styles.formContainer}>
            <Text style={styles.title}> Password  Generator</Text>
            <Formik
       initialValues={{passwordLength: ''}}
       validationSchema={passwordSchema}
       onSubmit={ values => {
        console.log(values);
        generatePasswordString(+values.passwordLength) 
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
        
        <>
        <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.passwordLength && errors.passwordLength && (
              <Text style={styles.errorText}>
                {errors.passwordLength}
              </Text>
            )}
            </View>
               <TextInput
            style={styles.inputStyle}
            value={values.passwordLength}
            onChangeText={handleChange('passwordLength')}
            placeholder="Ex. 8"
            keyboardType='numeric'
            />
          
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include lowercase </Text>
              <BouncyCheckbox
              disableBuiltInState
              isChecked={lowerCase}
              onPress={() => (setLowerCase(!lowerCase))}
              fillColor="#B9345A"
              />
           </View>

        <View style={styles.inputWrapper}> 
        <Text style={styles.heading}>Include uppercase </Text>
              <BouncyCheckbox
              disableBuiltInState
              isChecked={upperCase}
              onPress={() => (setUpperCase(!upperCase))}
              fillColor="#1B98F5"
              />
        </View>

        <View style={styles.inputWrapper}> 
        <Text style={styles.heading}>Include numbers </Text>
              <BouncyCheckbox
              disableBuiltInState
              isChecked={numbers}
              onPress={() => (setNumbers(!numbers))}
              fillColor="#1FAA59"
              />
         </View>

        <View style={styles.inputWrapper}> 
        <Text style={styles.heading}>Include symbols </Text>
              <BouncyCheckbox
              disableBuiltInState
              isChecked={symbols}
              onPress={() => (setSymbols(!symbols))}
              fillColor="#E8BD0D"
              />
        </View>

        <View style={styles.formActions}>
        
          <TouchableOpacity
          disabled={!isValid}
          style={styles.primaryBtn }
          onPress={handleSubmit}
          > 
           <Text style={styles.primaryBtnTxt}>Generate Password</Text>
          </TouchableOpacity >
          
          <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={()=> {
            handleReset();
            resetPasswordState()
          }}
          >
          <Text style={styles.secondaryBtnTxt}>Reset Password</Text>
          </TouchableOpacity>
        </View>
         </>
       )}
            </Formik>
          </View>
          {isPassGenerated ? (
            <View style={[styles.cardElevated, styles.card]}>
              <Text style={styles.subTitle}> Result: </Text>
              <Text style={styles.description}>long press to copy</Text>
              <Text selectable={true}  style={styles.generatedPassword}>{password}</Text>
            </View>
          ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}


// Gives the styles to the UI
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
});