import React, { useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
// import { colors, colorsWithOpacity } from '@/constants/ColorScheme';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { BottomSheetModal, BottomSheetView, } from '@gorhom/bottom-sheet';

// import IconButton from '@/components/ui/IconButton';
import CustomButton from '@/components/ui/Button';

interface ModalProps {
  visibility: boolean,
  successOnClose: () => void,
  content?: React.ReactNode,
  buttonTitle: string;
}

export default function SuccessModal({ visibility, successOnClose, content, buttonTitle }: ModalProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (visibility && bottomSheetRef.current) {
      bottomSheetRef.current.present();
    } else if (!visibility && bottomSheetRef.current) {
      bottomSheetRef.current.dismiss();
    }
  }, [visibility]);

  // const handleDismissModal = useCallback(() => {
  //   bottomSheetRef.current?.dismiss();
  // }, [])

  const handlerGoLogin = () => {
    router.push('/(auth)/signin');
    StatusBar.setBackgroundColor('rgba(253, 254, 255, 0)', true);
    successOnClose();
  }

  return (
    // <Modal
    //   transparent={true}
    //   animationType='slide'
    //   visible={visibility}
    //   onRequestClose={() => {
    //       successOnClose();
    //       StatusBar.setBackgroundColor('rgba(253, 254, 255, 0)', true)
    //     }
    //   }
    //   onShow={() =>
    //     StatusBar.setBackgroundColor(colorsWithOpacity(colors.dark, 0.30), true)
    //   }
    //   // onDismiss={() => 
    //   //   StatusBar.setBackgroundColor('rgba(253, 254, 255, 0)', true)
    //   //   // StatusBar.setBackgroundColor(colorsWithOpacity(colors.light, 0), true)
    //   // }
    // >
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={['90%']}
      backgroundStyle={{ backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background, }}
      onDismiss={successOnClose}
      stackBehavior='replace'
      backdropComponent={({ style }) => (
        <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]} />
      )}
    >
      <BottomSheetView style={{ flex: 1, }}>
        {/* <View style={styles.overlay}> */}
          <ThemedView style={styles.modalContainer}>
            {/* <View style={styles.modalContent}> */}
              {/* <IconButton
                iconName='arrow-back'
                iconSize={25}
                onPress={() => {
                    successOnClose();
                    StatusBar.setBackgroundColor('rgba(253, 254, 255, 0)', true);
                  }
                }
                iconButtonStyle={styles.iconButton}
              /> */}

              {content ? (
                <View style={styles.textContainer}>
                  {content}
                </View>
              ) : null}

            {/* </View> */}
          </ThemedView>

          <ThemedView style={styles.buttonContainer}>
            <CustomButton
              title={buttonTitle}
              type='primary'
              onPress={handlerGoLogin}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
          </ThemedView>
        {/* </View> */}
      </BottomSheetView>
    </BottomSheetModal>
    // </Modal>
  )
}

const styles = StyleSheet.create({
  // overlay: {
  //   flex: 1,
  //   // backgroundColor: colorsWithOpacity(colors.dark, 0.30),
  // },
  modalContainer: {
   // backgroundColor: 'white',
    flex: 1,
    width: '100%',
    // borderTopEndRadius: 10,
    // borderTopStartRadius: 10,
    // marginTop: 50,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    // borderWidth: 2,

    // Embossed effect
    // shadowColor: colors.black,
    // shadowOffset: { width: 4, height: 4 }, // Offset to bottom-right for depth
    // shadowOpacity: 0.5, // Soft shadow
    // shadowRadius: 15,
    // elevation: 10, // For Android
  },
  // modalContent: {
  //   flex: 1,
  //   marginBottom: 0,
  // },

  // iconButton:{
  //   marginBottom: 10, 
  //   width: 35, 
  //   height: 33 
  // },

  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },

  buttonContainer: {
    padding: 20,
    // backgroundColor: colors.white,
  },
  button: {
    borderRadius: 100,
    padding: 10,
    borderWidth: 1,
  },
  buttonText: {
    height: 24,
    fontFamily: 'popins-semibold',
    fontSize: 16,
    textAlign: 'center',
  },
});