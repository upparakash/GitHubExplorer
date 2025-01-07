import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useFavorites } from '../context/FavoritesContext';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // state for error message
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const searchRepositories = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null); // Reset error state on new search
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${query}`
      );
      if (response.data.items.length === 0) {
        setError('No repositories found for this query.');
      } else {
        setRepositories(response.data.items);
      }
    } catch (error) {
      if (error.message === 'Network Error') {
        setError('No internet connection. Please try again later.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (repository) =>
    favorites.some((fav) => fav.id === repository.id);

  const toggleFavorite = (repository) => {
    if (isFavorite(repository)) {
      removeFavorite(repository.id);
    } else {
      addFavorite(repository);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.repoCard}
      onPress={() => navigation.navigate('Details', { repository: item })}
    >
      <Image source={{ uri: item.owner.avatar_url }} style={styles.avatar} />
      <View style={styles.repoInfo}>
        <Text style={styles.repoName}>{item.name}</Text>
        <Text style={styles.repoDescription}>
          {item.description || 'No description available'}
        </Text>
        <Text>⭐ {item.stargazers_count} | 🍴 {item.forks_count}</Text>
        <Button
          title={isFavorite(item) ? 'Remove from Favorites' : 'Add to Favorites'}
          onPress={() => toggleFavorite(item)}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search GitHub Repositories</Text>
      <TextInput
        style={styles.input}
        placeholder="Search Repositories"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={searchRepositories} disabled={loading} />
      
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}
      
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={repositories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 },
  list: { marginTop: 10 },
  repoCard: { flexDirection: 'row', padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 5 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  repoInfo: { flex: 1 },
  repoName: { fontSize: 16, fontWeight: 'bold' },
  repoDescription: { fontSize: 14, color: '#555', marginBottom: 5 },
  loader: { marginTop: 20 },
  errorText: { color: 'red', marginTop: 10, fontSize: 16 },
});

export default SearchScreen;
