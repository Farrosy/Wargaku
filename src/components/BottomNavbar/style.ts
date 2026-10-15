import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#ffffff',
    borderTopColor: '#e7e4df',
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 12,
  },
  tab: {alignItems: 'center', flex: 1, justifyContent: 'center', minHeight: 48},
  icon: {color: '#88847e', fontSize: 21, height: 25},
  label: {color: '#77736d', fontSize: 11, fontWeight: '500'},
  active: {color: '#8b6b43', fontWeight: '700'},
});
