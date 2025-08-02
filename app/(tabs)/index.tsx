import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [numbers, setNumbers] = useState(['', '', '', '', '']);
  const [operation, setOperation] = useState<'avg' | 'max' | null>(null);
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const parsedNumbers = numbers.map(n => parseFloat(n)).filter(n => !isNaN(n));
    if (parsedNumbers.length !== 5 || !operation) {
      setResult(null);
      return;
    }

    if (operation === 'avg') {
      const avg = parsedNumbers.reduce((a, b) => a + b, 0) / 5;
      setResult(avg);
    } else if (operation === 'max') {
      const max = Math.max(...parsedNumbers);
      setResult(max);
    }
  };

  return (
    <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.wrapper}>
          <ScrollView contentContainerStyle={styles.inner}>
            <Text style={styles.title}>Kalkulator Nilai</Text>
            <Text style={styles.subtitle}>Masukkan 5 angka:</Text>
            {numbers.map((value, index) => (
              <TextInput
                key={index}
                style={styles.input}
                keyboardType="numeric"
                placeholder={`Angka ${index + 1}`}
                placeholderTextColor="#ccc"
                value={value}
                onChangeText={(text) => {
                  const updated = [...numbers];
                  updated[index] = text;
                  setNumbers(updated);
                }}
              />
            ))}

            <Text style={styles.subtitle}>Pilih Operasi:</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={[styles.radioButton, operation === 'avg' && styles.radioSelected]}
                onPress={() => setOperation('avg')}
              >
                <Ionicons name="radio-button-on" size={20} color={operation === 'avg' ? 'white' : '#ccc'} />
                <Text style={styles.radioText}> A. Rata-rata</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.radioButton, operation === 'max' && styles.radioSelected]}
                onPress={() => setOperation('max')}
              >
                <Ionicons name="radio-button-on" size={20} color={operation === 'max' ? 'white' : '#ccc'} />
                <Text style={styles.radioText}>B. Nilai Terbesar</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleCalculate}>
              <Text style={styles.buttonText}>Hitung</Text>
            </TouchableOpacity>

            {result !== null && (
              <View style={styles.resultBox}>
                <Text style={styles.resultText}>Hasil: {result}</Text>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  inner: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginVertical: 10,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    color: 'white',
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  radioSelected: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  radioText: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#ffffff33',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  resultBox: {
    padding: 15,
    backgroundColor: '#ffffff22',
    borderRadius: 10,
  },
  resultText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
