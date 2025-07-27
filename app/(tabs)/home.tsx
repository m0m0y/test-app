import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from "@/store/useAuthStore";
import { useCourseState } from "@/store/useCourseStore";
import { CustomColors, ColorsWithOpacity } from "@/constants/ColorScheme";

export default function HomeScreen() {  
  const router = useRouter();
  const onLogout = useAuthStore((state) => state.onLogout);
  const userInfo = useAuthStore((state) => state.userInfo);

  const fetchCourse = useCourseState((state) => state.fetchCourse);
  const courses = useCourseState((state) => state.courses);

  useEffect(() => {
    fetchCourse();
  }, []);

  const handleSignOut = async () => {
    const result = await onLogout();
    router.replace("/(auth)/signin");
    
    // Check if the onLogout catch an error
    // if(result.error) {
    //   console.log('Logout message: ' + result.message);
    // }
  };

  const handleMoreCourse = (val: any) => {
    console.log(val);
  }

  const data = Array.from({ length: 5 }, (_, i) => `Item ${i + 1}`);

  // //  For testing 
  // useEffect(() => {
  //   // Simulate invalid token for testing
  //   useAuthStore.getState().authToken = { accessToken: null, authenticated: false };
  //   console.log("Invalid token set in auth store for testing");
  // }, []);
  
  // useEffect(() => {
  //   if (!authState?.authenticated) {
  //     router.replace("/(auth)/signin");
  //   }
  // }, [authState]);

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  // if(!authToken?.authenticated) {
  //   router.replace("/(tabs)/home");
  // }

  return (
    <SafeAreaView>
      <ScrollView fadingEdgeLength={50} endFillColor='#f9f9f9'>
        <View style={styles.container}> 

          <Button title="Sign Out" onPress={handleSignOut} />

          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeTitle}>Welcome to SK LMS { '\n' } {userInfo?.username} 🫰🏿</Text>
          
            <View style={styles.row}>
              <View style={{ width: '60%', }}>
                <Text style={styles.welcomeMessage}>
                  Grow your skill by dedicating time each day to deliberate practice and learning new techniques.
                </Text>
              </View>

              <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', }}>
                <Image
                  source={require('../../assets/images/illustration-john-light.png')}
                  style={styles.illustration}
                />
              </View>
            </View>
          </View>


          <View style={{ marginVertical: 12, marginHorizontal: 24, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
              <Text style={{ fontSize: 18, fontFamily: 'popins-bold', }}>My Course (4)</Text>

              <TouchableOpacity onPress={() => handleMoreCourse('test')}>
                <Text style={{ fontSize: 14, fontFamily: 'popins-regular', color: CustomColors.primary, }}>View more</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginVertical: 12 }}>

              {/* <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
              >
                {[...Array(5)].map((_, index) => (
                  <View key={index} style={styles.item}>
                    <Text style={styles.text}>Item {index + 1}</Text>
                  </View>
                ))}
              </ScrollView> */}

              <FlatList
                horizontal
                data={data}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <Text style={styles.text}>{item}</Text>
                  </View>
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ }}
              />
            </View>

            <View>
              <Text>Test</Text>
              {courses.map((course) => (
                <Text key={course.id}>{course.course_title} - {course.category.cat_title}</Text>
              ))}
            </View>

          </View>


        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },

  welcomeCard: {
    justifyContent: 'center',
    backgroundColor: CustomColors.white,
    padding: 17,
    marginVertical: 12,
    marginHorizontal: 24,
    borderRadius: 10,
    overflow: 'hidden',

    elevation: 5,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // borderWidth: 1,
  },
  welcomeTitle: {
    fontFamily: 'popins-bold', 
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    height: 'auto',
    paddingVertical: 5,
  },
  welcomeMessage: {
    fontFamily: 'popins-regular', 
    lineHeight: 20,
  },
  illustration: {
    width: '150%',
    aspectRatio: 1,
    resizeMode: 'contain',
    position: 'absolute',
    left: -18,
    // alignSelf: 'center',
    // height: undefined,
    // top: -145,
    // borderWidth: 1,
  },

  scrollContainer: {
    paddingRight: 10,
  },
  item: {
    width: 150,
    height: 100,
    backgroundColor: '#4682B4',
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },


})