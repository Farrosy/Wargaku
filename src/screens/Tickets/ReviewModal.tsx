// Popup beri review (star 1-5 + komentar opsional) untuk booking yang sudah Selesai.
// POST /reviews: satu booking hanya bisa direview sekali (server balas 409 bila duplikat).
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, Modal, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {createReview} from '../../services/auth';

const ink = '#1a1c1b';
const muted = '#777770';
const gold = '#7b5821';

export type ReviewableBooking = {id: number; service_name: string; barber_name: string};

const styles = StyleSheet.create({
  modalOverlay: {flex: 1, backgroundColor: 'rgba(20, 18, 12, 0.55)', justifyContent: 'center', paddingHorizontal: 24},
  modalBox: {backgroundColor: '#ffffff', borderRadius: 16, padding: 20},
  eyebrow: {color: gold, fontSize: 10, fontWeight: '800', letterSpacing: 1.4},
  modalTitle: {color: ink, fontSize: 17, fontWeight: '800', marginTop: 4},
  modalSubtitle: {color: muted, fontSize: 12, marginTop: 3},
  starRow: {flexDirection: 'row', justifyContent: 'center', gap: 6, paddingVertical: 12},
  star: {fontSize: 34, color: '#e3ded4'},
  starActive: {color: gold},
  ratingHint: {color: muted, fontSize: 11, textAlign: 'center', marginBottom: 10},
  commentInput: {backgroundColor: '#f7f5f1', borderWidth: 1, borderColor: '#eeece8', borderRadius: 9, padding: 12, minHeight: 88, textAlignVertical: 'top', color: ink, fontSize: 13, lineHeight: 19},
  submitError: {color: '#a12b22', fontSize: 12, marginTop: 8},
  modalActions: {flexDirection: 'row', gap: 10, marginTop: 14},
  cancelButton: {flex: 1, borderWidth: 1, borderColor: '#e3ded4', borderRadius: 10, paddingVertical: 11, alignItems: 'center'},
  cancelText: {color: muted, fontWeight: '800', fontSize: 13},
  submitButton: {flex: 1, backgroundColor: gold, borderRadius: 10, paddingVertical: 11, alignItems: 'center'},
  submitDisabled: {opacity: 0.5},
  submitText: {color: '#ffffff', fontWeight: '800', fontSize: 13},
});

export function ReviewModal({visible, token, booking, onClose, onSubmitted}: {
  visible: boolean;
  token: string;
  booking?: ReviewableBooking | null;
  onClose: () => void;
  onSubmitted?: (bookingId: number) => void;
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Reset isi form setiap kali popup dibuka.
  useEffect(() => {
    if (visible) {setRating(0); setComment(''); setSubmitError('');}
  }, [visible]);

  const submitReview = async () => {
    if (!booking || submitting || rating < 1) { return; }
    setSubmitting(true);
    setSubmitError('');
    try {
      await createReview(token, {booking_id: booking.id, rating, comment: comment.trim() || undefined});
      onClose();
      Alert.alert('Terima kasih!', 'Review Anda berhasil dikirim.');
      onSubmitted?.(booking.id);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Gagal mengirim review.');
    } finally {
      setSubmitting(false);
    }
  };

  return <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
    <View style={styles.modalOverlay}>
      <View style={styles.modalBox}>
        <Text style={styles.eyebrow}>REVIEW RESERVASI</Text>
        <Text style={styles.modalTitle}>Bagaimana layanan kami?</Text>
        <Text style={styles.modalSubtitle}>{booking?.service_name} · {booking?.barber_name}</Text>
        <View style={styles.starRow}>
          {[1, 2, 3, 4, 5].map(star => (
            <Pressable key={star} accessibilityRole="button" accessibilityState={{selected: star <= rating}} hitSlop={8} onPress={() => setRating(star)}>
              <Text style={[styles.star, star <= rating && styles.starActive]}>★</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.ratingHint}>{rating >= 1 ? `${rating} dari 5` : 'Ketuk bintang untuk memberi nilai'}</Text>
        <TextInput style={styles.commentInput} multiline value={comment} onChangeText={setComment} placeholder="Tulis pengalaman Anda (opsional)" maxLength={500} />
        {!!submitError && <Text style={styles.submitError}>{submitError}</Text>}
        <View style={styles.modalActions}>
          <Pressable accessibilityRole="button" onPress={onClose} style={styles.cancelButton}><Text style={styles.cancelText}>Batal</Text></Pressable>
          <Pressable accessibilityRole="button" disabled={submitting || rating < 1} onPress={submitReview} style={[styles.submitButton, (submitting || rating < 1) && styles.submitDisabled]}>
            {submitting ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.submitText}>Kirim Review</Text>}
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>;
}
