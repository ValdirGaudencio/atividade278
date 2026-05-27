import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';

export default function App() {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');

  const validateInput = (text: string) => {
   
    let cleaned = text.replace(',', '.');
    
    cleaned = cleaned.replace(/[^0-9.-]/g, '');
    
    if (cleaned.indexOf('-') > 0) {
      cleaned = cleaned.replace('-', '');
    }
    
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      cleaned = parts[0] + '.' + parts.slice(1).join('');
    }
    
    return cleaned;
  };

  const handleCelsiusChange = (text: string) => {
    const validatedText = validateInput(text);
    setCelsius(validatedText);

    if (validatedText === '' || validatedText === '-' || validatedText === '.') {
      setFahrenheit('');
      return;
    }

    const tempC = parseFloat(validatedText);
    if (!isNaN(tempC)) {
      const tempF = (tempC * 1.8) + 32;
      setFahrenheit(tempF.toFixed(2).replace('.00', ''));
    }
  };

  const handleFahrenheitChange = (text: string) => {
    const validatedText = validateInput(text);
    setFahrenheit(validatedText);

    if (validatedText === '' || validatedText === '-' || validatedText === '.') {
      setCelsius('');
      return;
    }

    const tempF = parseFloat(validatedText);
    if (!isNaN(tempF)) {
      const tempC = (tempF - 32) / 1.8;
      setCelsius(tempC.toFixed(2).replace('.00', ''));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Conversor de Temperatura</Text>
      </View>

      <View style={styles.card}>
        {/* Campo Celsius */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Graus Celsius (°C)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ex: 25"
            value={celsius}
            onChangeText={handleCelsiusChange}
          />
        </View>

        <View style={styles.divider}>
          <Text style={styles.dividerText}>⇄</Text>
        </View>

        {/* Campo Fahrenheit */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Graus Fahrenheit (°F)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ex: 77"
            value={fahrenheit}
            onChangeText={handleFahrenheitChange}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  card: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#edf2f7',
    borderWidth: 1,
    borderColor: '#cbd5e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    color: '#2d3748',
  },
  divider: {
    alignItems: 'center',
    marginVertical: 8,
  },
  dividerText: {
    fontSize: 24,
    color: '#a0aec0',
  },
});