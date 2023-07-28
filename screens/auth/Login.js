import { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Stack, TextInput, IconButton, Box, Button } from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../contexts/AuthContext';

function LoginView() {
  const { loginUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ================================================================

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      await loginUser(username, password);
    } catch (error) {
      throw new Error('Erro ao logar::', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1}}>
        <View style={styles.loginView}>
          <Box style={styles.loginBoxIcon}>
            <Icon name="account-circle" size={60}/>
          </Box>
          <Stack spacing={5}>
            <TextInput
              label="Email"
              leading={props => <Icon name="account" {...props} />}
              onChangeText={setUsername}
              value={username}
              autoCapitalize='none'
            />
            <TextInput
              label="Senha"
              leading={props => <Icon name="lock" {...props} />}
              trailing={props => (
                <IconButton
                  icon={props => <Icon name={showPassword ? 'eye' : 'eye-off'} {...props} />}
                  {...props}
                  onPress={togglePasswordVisibility}
                />
              )}
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!showPassword}
              autoCapitalize='none'
            />
            <Button
              title={loading ? 'Entrando...' : 'Entrar'}
              titleStyle={{ fontSize: 16 }}
              contentContainerStyle={{ height: 50 }}
              color="#222"
              disabled={username.length <= 3 || password.length < 6}
              onPress={handleLogin}
            />
          </Stack>
          <Text>{password} - {username}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default LoginView;

const styles = {
  loginView: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  loginBoxIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20
  },
};
