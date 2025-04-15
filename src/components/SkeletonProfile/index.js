import React from 'react';
import { View, StyleSheet } from 'react-native';

const SkeletonProfile = () => {
  return (
    <View style={styles.skeletonContainer}>
      {/* Header: Avatar + Info */}
      <View style={styles.skeletonHeader}>
        {/* Avatar con progreso */}
        <View style={styles.skeletonAvatarContainer}>
          <View style={styles.skeletonAvatar} />
        </View>

        {/* Info: Nombre, Email, Ubicación */}
        <View style={styles.skeletonInfo}>
          <View style={styles.skeletonTextGroup}>
            <View style={styles.skeletonLine} />
            <View style={[styles.skeletonLine, styles.shortLine]} />
          </View>

          <View style={styles.skeletonTextGroup}>
            <View style={styles.skeletonEditButton} />
            <View style={styles.skeletonTitle} />
            <View style={[styles.skeletonLine, styles.mediumLine]} />
          </View>
        </View>
      </View>

      {/* Habilidades */}
      <View style={styles.skeletonTextGroup}>
      <View style={styles.skeletonEditButton} />
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonAbilities}>
          {[...Array(8)].map((_, index) => (
            <View key={index} style={styles.skeletonSkill} />
          ))}
        </View>
      </View>

      {/* Descripción */}
      <View style={styles.skeletonTextGroup}>
      <View style={styles.skeletonEditButton} />
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonDescription} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    padding: 25,
    marginTop:"2%"
  },
  // Header: Avatar + Info
  skeletonHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  skeletonAvatarContainer: {
    marginRight: 15,
  },
  skeletonAvatar: {
    width: 95,
    height: 95,
    borderRadius: 50,
    backgroundColor: '#ddd',
  },
  skeletonProgress: {
    position: 'absolute',
    bottom: -5,
    left: '50%',
    width: 40,
    height: 20,
    backgroundColor: '#ddd',
    borderRadius: 10,
    transform: [{ translateX: -20 }],
  },
  skeletonInfo: {
    flex: 1,
  },
  // Textos
  skeletonTextGroup: {
    marginBottom: 15,
    marginTop:2
  },
  skeletonLine: {
    width: '100%',
    height: 15,
    backgroundColor: '#ddd',
    marginBottom: 5,
    borderRadius: 5,
  },
  shortLine: {
    width: '60%',
  },
  mediumLine: {
    width: '75%',
  },
  skeletonTitle: {
    width: 100,
    height: 15,
    backgroundColor: '#ddd',
    marginBottom: 5,
    borderRadius: 5,
  },
  // Botón de editar
  skeletonEditButton: {
    width: 50,
    height: 20,
    backgroundColor: '#ddd',
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
  // Habilidades
  skeletonAbilities: {
    flexDirection: 'row',
    justifyContent:'center',
    flexWrap: 'wrap',
    marginTop: 5
  },
  skeletonSkill: {
    width: 80,
    height: 30,
    backgroundColor: '#ddd',
    borderRadius: 15,
    marginRight: 2, // Espacio horizontal
    marginBottom: 2, // Espacio vertical
  },
  skeletonMoreButton: {
    width: 60,
    height: 30,
    backgroundColor: '#ddd',
    borderRadius: 15,
  },
  // Descripción
  skeletonDescription: {
    width: '100%',
    height: 90,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginTop:5
  },
});

export default SkeletonProfile;
