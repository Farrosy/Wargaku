import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import {styles} from './style';

// Halaman finish redirect Midtrans mengarah ke dashboard web.
// WebView menangkap redirect itu: blok navigasi ke URL tersebut, lalu tampilkan hasil di app.
const FINISH_HOST = 'kelompok1-wad.onrender.com';

export type PaymentResultStatus = 'success' | 'failed';

function queryParam(url: string, key: string): string | null {
  const idx = url.indexOf('?');
  if (idx === -1) { return null; }
  const query = url.slice(idx + 1).split('#')[0];
  for (const part of query.split('&')) {
    const [k, v = ''] = part.split('=');
    if (decodeURIComponent(k) === key) { return decodeURIComponent(v); }
  }
  return null;
}

// Hanya capture/settlement yang dianggap sukses. Sisanya (pending, expire,
// cancel, deny, refund, atau parameter tak jelas) diperlakukan GAGAL.
function statusFromUrl(url: string): PaymentResultStatus {
  const transaction = (queryParam(url, 'transaction_status') || '').toLowerCase();
  if (transaction === 'capture' || transaction === 'settlement') { return 'success'; }
  return 'failed';
}

function isFinishRedirect(url: string): boolean {
  return url.includes(FINISH_HOST);
}

export function PaymentScreen({url, ticketCode, onDone, onResult}: {
  url: string;
  ticketCode?: string;
  onDone: () => void;
  onResult?: (status: PaymentResultStatus, ticketCode?: string) => void;
}) {
  const [webUri, setWebUri] = useState(url);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState(false);
  const [result, setResult] = useState<PaymentResultStatus | null>(null);
  const handledRef = React.useRef(false);

  useEffect(() => { handledRef.current = false; }, [url]);

  const handleFinishRedirect = (target: string) => {
    if (handledRef.current) { return; }
    handledRef.current = true;
    const status = statusFromUrl(target);
    setWebUri('about:blank');
    setResult(status);
    onResult?.(status, ticketCode);
  };

  const retry = () => {
    setError(false);
    setBusy(true);
    setWebUri(`${url}${url.includes('?') ? '&' : '?'}reload=${Date.now()}`);
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onDone} activeOpacity={0.7}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>Konfirmasi Pembayaran</Text>
          {ticketCode ? <Text style={styles.ticketCode}>Tiket: {ticketCode}</Text> : null}
        </View>
      </View>

      {/* WebView Midtrans / payment gateway */}
      <View style={styles.webWrap}>
        <WebView
          source={{uri: webUri}}
          onNavigationStateChange={state => {
            if (isFinishRedirect(state.url)) { handleFinishRedirect(state.url); }
            setBusy(state.loading);
          }}
          onShouldStartLoadWithRequest={req => {
            if (isFinishRedirect(req.url)) { handleFinishRedirect(req.url); return false; }
            return true;
          }}
          onLoadEnd={() => setBusy(false)}
          onHttpError={() => setError(true)}
          onError={() => setError(true)}
          startInLoadingState
          scalesPageToFit
          style={styles.webview}
        />
        {busy && !error && !result && <View style={styles.loadingOverlay}><ActivityIndicator color="#7b5821" size="large" /></View>}
        {error && !result && (
          <View style={styles.overlay}>
            <Text style={styles.resultTitle}>Gagal memuat halaman pembayaran</Text>
            <Text style={styles.overlayDesc}>Periksa koneksi internet Anda, lalu coba lagi.</Text>
            <TouchableOpacity style={styles.overlayButton} onPress={retry} activeOpacity={0.85}>
              <Text style={styles.overlayButtonText}>Coba Lagi</Text>
            </TouchableOpacity>
          </View>
        )}
        {result && (
          <View style={styles.overlay}>
            <Text style={result === 'success' ? styles.resultIconSuccess : styles.resultIconOther}>
              {result === 'success' ? '✓' : '✕'}
            </Text>
            <Text style={styles.resultTitle}>
              {result === 'success' ? 'Pembayaran Berhasil!' : 'Pembayaran Gagal'}
            </Text>
            <Text style={styles.overlayDesc}>
              {result === 'success'
                ? 'Pembayaran kamu terkonfirmasi. Tiket kedatangan sudah aktif.'
                : 'Transaksi tidak selesai. Silakan buat pesanan tiket kembali.'}
            </Text>
            <TouchableOpacity style={styles.overlayButton} onPress={onDone} activeOpacity={0.85}>
              <Text style={styles.overlayButtonText}>
                {result === 'success' ? 'Lihat Tiket Saya' : 'Pesan Tiket Lagi'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Setelah sistem Midtrans mendeteksi pembayaran lunas, tiket Anda otomatis aktif di menu “Tiket Saya”.
        </Text>
      </View>
    </View>
  );
}
