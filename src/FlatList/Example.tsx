import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';

// New, more detailed data
const VENDOR_DATA = [
  { 
    id: '1', 
    name: 'Shanmukh', 
    location: 'Bangalore, India',
    image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  },
  { 
    id: '2', 
    name: 'Shetty', 
    location: 'Mumbai, India',
    image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  },
  { 
    id: '3', 
    name: 'Kumar', 
    location: 'Delhi, India',
    image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  },
  { 
    id: '4', 
    name: 'Sunku', 
    location: 'Hyderabad, India',
    image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  },
  { 
    id: '5', 
    name: 'Yadav', 
    location: 'Chennai, India',
    image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  },
];

// New interface for the props of the VendorItem component
interface VendorProps {
  name: string;
  location: string;
  image: string;
  onPress: () => void;
}

// Updated Item component to display more content
const VendorItem = ({ name, location, image, onPress }: VendorProps) => (
  <TouchableOpacity onPress={onPress} style={styles.itemCard}>
    <Image source={{ uri: image }} style={styles.itemImage} />
    <View style={styles.textContainer}>
      <Text style={styles.vendorName}>{name}</Text>
      <Text style={styles.vendorLocation}>{location}</Text>
    </View>
  </TouchableOpacity>
);

export const MyFlatList = () => {
  const handlePress = (name: string) => {
    alert(`You selected ${name}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Vendors</Text>
      <FlatList
        data={VENDOR_DATA}
        renderItem={({ item }) => (
          <VendorItem
            name={item.name}
            location={item.location}
            image={item.image}
            onPress={() => handlePress(item.name)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2A80',
    paddingTop: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  listContent: {
    paddingHorizontal: 15,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B38A0',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 30, // Makes the image a circle
    marginRight: 15,
  },
  textContainer: {
    flex: 1, // Allows the text to take up the remaining space
  },
  vendorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  vendorLocation: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
});