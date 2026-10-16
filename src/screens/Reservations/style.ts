import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#f9f9f7' },
  scrollArea: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 110, marginTop: 10 },
  
  flexOne: { flex: 1 },
  alignRight: { alignItems: 'flex-end' },
  roundedImage: { borderRadius: 8 },

  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  stepText: { fontSize: 12, fontWeight: '600', color: '#4b463f', letterSpacing: 1 },
  stepTitle: { fontSize: 13, fontWeight: '700', color: '#7b5821' },
  progressBarBg: { height: 4, backgroundColor: '#e2e3e1', borderRadius: 2, marginBottom: 20 },
  progressBarFill: { width: '50%', height: '100%', backgroundColor: '#000', borderRadius: 2 },

  atmosphereCard: { height: 128, width: '100%', marginBottom: 20, justifyContent: 'flex-end' },
  atmosphereOverlay: { backgroundColor: 'rgba(0,0,0,0.4)', padding: 12, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 },
  atmosphereText: { color: '#fff', fontSize: 13, fontWeight: '600', letterSpacing: 0.5 },

  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 24, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  cardLabel: { fontSize: 11, fontWeight: '700', color: '#85847c', letterSpacing: 1, marginBottom: 8 },
  serviceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  serviceTitle: { fontSize: 18, fontWeight: '700', color: '#1a1c1b' },
  serviceSub: { fontSize: 13, color: '#7b5821', marginTop: 4, fontWeight: '500' },
  servicePrice: { fontSize: 18, fontWeight: '800', color: '#000' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1a1c1b' },
  sectionSubtitle: { fontSize: 13, color: '#4b463f', marginTop: 2 },
  badgeCount: { backgroundColor: '#e2e3e1', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  badgeCountText: { fontSize: 12, fontWeight: '600', color: '#4b463f' },

  horizontalScroll: { overflow: 'visible', marginBottom: 24 },
  
  barberCard: { width: 220, backgroundColor: '#fff', borderRadius: 8, padding: 12, marginRight: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  barberTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  barberImg: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#e2e3e1', marginRight: 12 },
  barberName: { fontSize: 15, fontWeight: '700', color: '#1a1c1b' },
  barberRole: { fontSize: 12, color: '#4b463f' },
  barberBottom: { backgroundColor: '#f4f4f2', padding: 10, borderRadius: 6, marginHorizontal: -4, marginBottom: -4 },
  barberBottomText: { fontSize: 12, color: '#4b463f', marginBottom: 2 },

  barberCardActive: { backgroundColor: '#000' },
  barberNameActive: { fontSize: 15, fontWeight: '700', color: '#fff' },
  barberRoleActive: { fontSize: 12, color: '#ffddb3' },
  barberBottomActive: { backgroundColor: '#2f3130', padding: 10, borderRadius: 6, marginHorizontal: -4, marginBottom: -4 },
  barberBottomTextActive: { fontSize: 12, color: '#cbc5c0', marginBottom: 2 },

  // --- TAMBAHAN STYLE BARU UNTUK TANGGAL, JAM, DAN CATATAN ---
  dateGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  dateTile: { alignItems: 'center', paddingVertical: 10, paddingHorizontal: 4, borderRadius: 6, backgroundColor: '#fff', width: '15%', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  dateTileActive: { backgroundColor: '#000' },
  dateDay: { fontSize: 11, fontWeight: '600', color: '#85847c', textTransform: 'uppercase' },
  dateDayActive: { color: 'rgba(255,255,255,0.8)' },
  dateNumber: { fontSize: 18, fontWeight: '700', marginVertical: 2, color: '#1a1c1b' },
  dateNumberActive: { color: '#fff' },
  dateIndicator: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#7b5821', marginTop: 4 },
  dateLabelActive: { fontSize: 10, color: '#ffddb3', fontWeight: '600' },

  timeSessionLabel: { fontSize: 11, fontWeight: '600', color: '#85847c', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, marginTop: 16 },
  timeGrid3: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 8 },
  timeGrid4: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 8 },
  timeSlot3: { backgroundColor: '#fff', paddingVertical: 12, borderRadius: 6, alignItems: 'center', marginBottom: 8, width: '31%', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  timeSlot4: { backgroundColor: '#fff', paddingVertical: 12, borderRadius: 6, alignItems: 'center', marginBottom: 8, width: '23%', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  timeSlotActive: { backgroundColor: '#000' },
  timeSlotDisabled: { backgroundColor: '#e8e8e6', opacity: 0.6 },
  timeText: { fontSize: 16, fontWeight: '600', color: '#1a1c1b' },
  timeTextActive: { color: '#fff', fontWeight: '700' },
  timeTextDisabled: { color: '#85847c', textDecorationLine: 'line-through' },
  timeStatus: { fontSize: 10, color: '#7b5821', marginTop: 2, fontWeight: '600' },
  timeStatusActive: { color: '#ffddb3' },
  timeStatusDisabled: { color: '#85847c' },

  notesContainer: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  notesLabel: { fontSize: 16, fontWeight: '700', color: '#1a1c1b', marginBottom: 4 },
  notesSub: { fontSize: 12, color: '#4b463f', marginBottom: 10 },
  notesInput: { backgroundColor: '#f4f4f2', borderRadius: 4, padding: 12, fontSize: 14, color: '#1a1c1b', height: 80, textAlignVertical: 'top' },
  notesFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  notesFooterText: { fontSize: 11, color: '#7b5821', fontWeight: '600' },
  notesCharCount: { fontSize: 11, color: '#85847c' },

  guaranteeCard: { backgroundColor: '#f4f4f2', padding: 12, borderRadius: 8, flexDirection: 'row', alignItems: 'flex-start', marginBottom: 24 },
  guaranteeTitle: { fontSize: 13, fontWeight: '700', color: '#1a1c1b', marginBottom: 2 },
  guaranteeDesc: { fontSize: 12, color: '#4b463f', lineHeight: 18 },

  bottomCard: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 16, borderTopRightRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 15 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  totalPrice: { fontSize: 20, fontWeight: '800', color: '#000', marginTop: 4 },
  perPerson: { fontSize: 13, fontWeight: '500', color: '#85847c' },
  badgeTime: { backgroundColor: 'rgba(123, 88, 33, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 6 },
  badgeTimeText: { fontSize: 11, fontWeight: '700', color: '#7b5821' },
  kapsterText: { fontSize: 12, color: '#4b463f', fontWeight: '500' },
  button: { backgroundColor: '#000', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
  footerNote: { textAlign: 'center', fontSize: 11, color: '#85847c' }
});