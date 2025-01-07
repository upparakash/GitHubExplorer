import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { repository } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: repository.owner.avatar_url }} style={styles.avatar} />
      <Text style={styles.name}>{repository.name}</Text>
      <Text style={styles.username}>by {repository.owner.login}</Text>
      <Text style={styles.language}>Language: {repository.language || 'N/A'}</Text>
      <Text style={styles.description}>{repository.description || 'No description available'}</Text>
      <Text style={styles.stats}>⭐ Stars: {repository.stargazers_count}</Text>
      <Text style={styles.stats}>🍴 Forks: {repository.forks_count}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  username: { fontSize: 16, color: '#555', marginBottom: 20 },
  language: { fontSize: 16, color: '#555', marginBottom: 10 },
  description: { fontSize: 14, textAlign: 'center', marginBottom: 10 },
  stats: { fontSize: 16, marginBottom: 5 },
});

export default DetailsScreen;
