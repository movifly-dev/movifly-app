import { SafeAreaView, ScrollView, Text, View } from "react-native";

function LoginView() {
  // ================================================================

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.loginView}>
          <Text>LOGIN</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default LoginView;

const styles = {
  loginView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
};
