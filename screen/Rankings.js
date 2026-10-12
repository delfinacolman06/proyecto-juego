import React from 'react';

import {Text,StyleSheet,ScrollView,StatusBar,View} from 'react-native';

const jugadores = [
  { id: '1', avatar: '👩🏻', nombre: 'miusuario', km: '12000km', puesto: '01', color: '#F8D9A0' },
  { id: '2', avatar: '👨🏻', nombre: 'usuario 1', km: '11000km', puesto: '02', color: '#79C8F2' },
  { id: '3', avatar: '👩🏽', nombre: 'usuario 2', km: '1000km', puesto: '03', color: '#FFB900' },
  { id: '4', avatar: '👨🏼', nombre: 'usuario 3', km: '900km', puesto: '04', color: '#F8E5CF' },
  { id: '5', avatar: '👩🏻', nombre: 'usuario 4', km: '800km', puesto: '05', color: '#FFC928' },
  { id: '6', avatar: '👧🏻', nombre: 'usuario 5', km: '700km', puesto: '06', color: '#F5D57B' },
  { id: '7', avatar: '🧑🏻', nombre: 'usuario 6', km: '600km', puesto: '07', color: '#9BD9F6' },
  { id: '8', avatar: '👩🏼', nombre: 'usuario 7', km: '500km', puesto: '08', color: '#F7C7D2' }
];

const primero=jugadores[0];

export default function Rankings() {

    return (
        <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Título */}
        <View style={styles.header}>
          <Text style={styles.flag}>🏁</Text>
          <Text style={styles.title}>RANKING</Text>
          <Text style={styles.flag}>🏁</Text>
        </View>

        {/* Primer puesto destacado */}
        <View style={styles.firstPlace}>
          <View
            style={[
              styles.avatar,
              { backgroundColor: primero.color },
            ]}
          >
            <Text style={styles.avatarText}>{primero.avatar}</Text>
          </View>

          <Text style={styles.firstName} numberOfLines={1}>
            {primero.nombre}
          </Text>

          <View style={styles.firstDivider} />

          <Text style={styles.firstKm}>{primero.km}</Text>

          <View style={styles.firstDivider} />

          <Text style={styles.firstPosition}>{primero.puesto}</Text>
        </View>

        {/* Lista de participantes */}
        <View style={styles.rankingList}>
          {jugadores.map((jugador, index) => (
            <View key={jugador.id} style={styles.row}>
              <View
                style={[
                  styles.avatar,
                  { backgroundColor: jugador.color },
                ]}
              >
                <Text style={styles.avatarText}>
                  {jugador.avatar}
                </Text>
              </View>

              <Text style={styles.name} numberOfLines={1}>
                {jugador.nombre}
              </Text>

              <View style={styles.divider} />

              <Text style={styles.km}>{jugador.km}</Text>

              <View style={styles.divider} />

              <Text style={styles.position}>
                {jugador.puesto}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
       backgroundColor: 'transparent',
  },

  scrollContent: {
    paddingHorizontal: 11,
    paddingBottom: 20,
  },

  header: {
    height: 76,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  flag: {
    fontSize: 39,
  },

  title: {
    color: '#f9f9f9',
    fontSize: 35,
    fontWeight: '900',
    letterSpacing: 0.3,
  },

  firstPlace: {
    height: 109,
    backgroundColor: '#35B2F8',
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
    marginBottom: 18,
  },

  avatar: {
    width: 43,
    height: 43,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  },

  avatarText: {
    fontSize: 31,
    textAlign: 'center',
  },

  firstName: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
    marginLeft: 10,
    flex: 1,
  },

  firstDivider: {
    width: 2,
    height: 57,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 7,
  },

  firstKm: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  firstPosition: {
    color: '#FFFFFF',
    fontSize: 52,
    fontWeight: '900',
    marginLeft: -1,
  },

  rankingList: {
    backgroundColor: '#075493',
    borderRadius: 16,
    paddingHorizontal: 17,
    paddingVertical: 5,
  },

  row: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
  },

  name: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 10,
    flex: 1,
  },

  divider: {
    width: 2,
    height: 40,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 7,
  },

  km: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'left',
    minWidth: 81,
  },

  position: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    width: 55,
    textAlign: 'right',
  },
});