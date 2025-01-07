import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';

const FavoritesScreen = () => {
  const { favorites, removeFavorite } = useFavorites();

  const renderItem = ({ item }) => (
    <View style={styles.repoCard}>
      <Image source={{ uri: item.owner.avatar_url }} style={styles.avatar} />
      <View style={styles.repoInfo}>
        <Text style={styles.repoName}>{item.name}</Text>
        <Text>{item.description || 'No description available'}</Text>
        <Text>⭐ {item.stargazers_count} | 🍴 {item.forks_count}</Text>
        <Button
          title="Remove from Favorites"
          onPress={() => removeFavorite(item.id)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite Repositories</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  repoCard: { flexDirection: 'row', padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 5 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  repoInfo: { flex: 1 },
  repoName: { fontSize: 16, fontWeight: 'bold' },
});

export default FavoritesScreen;
