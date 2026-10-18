import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  screen: {backgroundColor: '#f9f9f7', flex: 1},

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e2e3e1',
  },
  backButton: {width: 40, height: 40, alignItems: 'center', justifyContent: 'center'},
  backIcon: {color: '#1a1c1b', fontSize: 24, fontWeight: '700', marginTop: -2},
  titleWrap: {flex: 1, alignItems: 'flex-start', marginHorizontal: 4},
  title: {color: '#1a1c1b', fontSize: 17, fontWeight: '700'},
  ticketCode: {color: '#7b5821', fontSize: 11, fontWeight: '600', marginTop: 1},

  // WebView
  webWrap: {flex: 1, backgroundColor: '#fff'},
  webview: {flex: 1},
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(249,249,247,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#f9f9f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  overlayDesc: {color: '#4b463f', fontSize: 13, lineHeight: 20, textAlign: 'center', marginBottom: 16},
  overlayButton: {backgroundColor: '#000', paddingVertical: 12, paddingHorizontal: 28, borderRadius: 6},
  overlayButtonText: {color: '#fff', fontSize: 14, fontWeight: '700'},
  resultIconSuccess: {color: '#16803c', fontSize: 48, fontWeight: '700', marginBottom: 8},
  resultIconOther: {color: '#7b5821', fontSize: 44, fontWeight: '700', marginBottom: 8},
  resultTitle: {color: '#1a1c1b', fontSize: 18, fontWeight: '700', marginBottom: 4},

  // Footer
  footer: {padding: 12, paddingBottom: 16, backgroundColor: '#fff', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#e2e3e1'},
  footerText: {color: '#4b463f', fontSize: 11, lineHeight: 16, textAlign: 'center'},
});
