import { StyleSheet } from 'react-native';
import { colors } from '@/constants/ColorScheme';

const indexStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#30334E',
  },
  imgContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLogo: {
    top: -40,
    resizeMode: 'contain',
    width: '78%',
    position: 'absolute',
  },

  contentContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },

  textContent: {
    // borderWidth: 1,
    marginVertical: 8,
  },
  textTitle: {
    fontFamily: 'popins-bold',
    fontSize: 32,
    // lineHeight: 32,
  },
  textDescription: {
    fontFamily: 'popins-regular',
    fontSize: 16,
    fontWeight: '400',
  },


  buttonContainer: {
    // borderWidth: 1,
    marginVertical: 5,
  },
  button: {
    borderRadius: 100,
    padding: 10,
    borderWidth: 1,
  },
  // buttonText: {
  //   height: 24,
  //   fontFamily: 'popins-regular',
  //   fontSize: 16,
  //   textAlign: 'center',
  // },

  privacyContainer: {
    // borderWidth: 1,
    marginVertical: 5,
  },
  privacyContent: {
    fontFamily: 'popins-regular',
    fontSize: 16,
  },
  textHighlight: {
    color: colors.primary, 
    fontFamily: 'popins-bold',
    textDecorationLine: 'underline',
  },


  copyRightContainer: {
    // borderWidth: 1,
    marginVertical: 5,
  },
  copyRightText: {
    fontFamily: 'popins-regular',
    fontSize: 14,
    textAlign: 'center',
  }
});
  
export default indexStyles;