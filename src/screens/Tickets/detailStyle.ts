import {StyleSheet} from 'react-native';

const ink = '#1a1c1b';
const muted = '#777770';
const gold = '#7b5821';

export const detailStyles = StyleSheet.create({
  page: {flex: 1, backgroundColor: '#f9f9f7'},
  content: {paddingHorizontal: 16, paddingTop: 16, paddingBottom: 28},
  backButton: {alignSelf: 'flex-start', paddingVertical: 8, marginBottom: 12},
  backText: {color: gold, fontSize: 13, fontWeight: '700'},
  eyebrow: {color: gold, fontSize: 10, fontWeight: '800', letterSpacing: 1.4, marginBottom: 7},
  title: {color: ink, fontSize: 27, fontWeight: '800', marginBottom: 16},
  statusCard: {backgroundColor: '#f2eadc', borderRadius: 12, padding: 15, marginBottom: 13},
  statusLabel: {color: gold, fontSize: 9, fontWeight: '800', letterSpacing: 1},
  statusValue: {color: ink, fontSize: 15, fontWeight: '800', marginTop: 5},
  panel: {backgroundColor: '#fff', borderRadius: 13, borderWidth: 1, borderColor: '#eeece8', padding: 15, marginBottom: 12},
  panelTitle: {color: ink, fontSize: 16, fontWeight: '800', marginBottom: 7},
  detailRow: {flexDirection: 'row', gap: 9, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f0eeea'},
  detailIcon: {color: gold, fontSize: 20, lineHeight: 20},
  detailCopy: {flex: 1},
  detailLabel: {color: muted, fontSize: 9, fontWeight: '800', letterSpacing: 0.6, marginBottom: 3},
  detailValue: {color: ink, fontSize: 13, fontWeight: '700', lineHeight: 19},
  detailSecondary: {color: muted, fontSize: 11, marginTop: 2},
  codeBox: {backgroundColor: '#f7f5f1', borderRadius: 9, padding: 12, marginTop: 13},
  codeLabel: {color: muted, fontSize: 9, fontWeight: '800', letterSpacing: 0.7},
  codeValue: {color: gold, fontSize: 16, fontWeight: '800', marginTop: 4, letterSpacing: 0.5},
  totalRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10},
  total: {color: gold, fontSize: 18, fontWeight: '800'},
  paymentMethod: {color: '#39704b', backgroundColor: '#eaf4ec', overflow: 'hidden', borderRadius: 8, padding: 10, fontSize: 11, fontWeight: '700'},
  expiry: {color: muted, fontSize: 11, lineHeight: 17, marginTop: 9},
  muted: {color: muted, fontSize: 12, lineHeight: 18},
  loading: {alignItems: 'center', paddingVertical: 32, gap: 10},
  errorCard: {backgroundColor: '#fae9e7', borderRadius: 10, padding: 12, alignItems: 'center'},
  errorText: {color: '#a12b22', fontSize: 12, textAlign: 'center'},
  retry: {color: gold, fontSize: 12, fontWeight: '800', marginTop: 10},
});
