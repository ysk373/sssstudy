---
title: デジタルフィルタ設計入門｜FIRとIIRの違いから実装まで完全ガイド2025
slug: digital-filter-design
description: デジタルフィルタの基礎から実践まで徹底解説。FIRとIIRの違い、設計手法、Pythonによる実装例、リアルタイム処理への応用を網羅した実践的ガイド。
published_date: 2025-01-23
author: SSSSブログ編集部
category: 信号処理
tags: [デジタルフィルタ, FIR, IIR, DSP, Python, SciPy, 信号処理, フィルタ設計]
keywords: デジタルフィルタ, FIR, IIR, フィルタ設計, DSP, ローパスフィルタ, ハイパスフィルタ, バンドパスフィルタ, Python
image: /images/thumbnails/digital-filter-design.png
features:
  - FIRとIIRフィルタの違い
  - フィルタ設計の基本手法
  - Pythonによる実装例
  - リアルタイム処理への応用
---

# デジタルフィルタ設計入門：FIRとIIRの違いから実装まで

デジタルフィルタは、信号処理における最も基本的かつ重要な技術の一つです。ノイズ除去、周波数成分の選択的抽出、信号の平滑化など、様々な用途に使われています。

本記事では、デジタルフィルタの基礎から設計手法、Pythonによる実装、リアルタイム処理まで、実践的に解説します。

## デジタルフィルタとは

---

デジタルフィルタは、デジタル信号から特定の周波数成分を抽出または除去する演算処理です。

### フィルタの種類（周波数特性による分類）

---

1. **ローパスフィルタ（LPF）**: 低周波成分を通過、高周波成分を減衰
2. **ハイパスフィルタ（HPF）**: 高周波成分を通過、低周波成分を減衰
3. **バンドパスフィルタ（BPF）**: 特定の周波数帯域を通過
4. **バンドストップフィルタ（BSF）**: 特定の周波数帯域を減衰（ノッチフィルタ）

### アナログフィルタとの違い

---

| 特性 | アナログフィルタ | デジタルフィルタ |
|-----|---------------|----------------|
| 実装 | 抵抗、コンデンサ、オペアンプ | プログラム（DSP、FPGA） |
| 精度 | 部品のばらつきあり | 高精度 |
| 再現性 | 部品ごとに変動 | 完全に再現可能 |
| 調整 | 物理的な調整が必要 | パラメータ変更のみ |
| コスト | 部品コスト | 計算コスト |

## FIRフィルタとIIRフィルタ

---

デジタルフィルタには、大きく分けて2種類あります。

### FIR（Finite Impulse Response）フィルタ

---

**特徴**: 有限長のインパルス応答

```python
# FIRフィルタの差分方程式
y[n] = b[0]*x[n] + b[1]*x[n-1] + b[2]*x[n-2] + ... + b[M]*x[n-M]
```

**利点**:
- 常に安定（発散しない）
- 線形位相特性（遅延が一定）
- 設計が比較的簡単

**欠点**:
- タップ数が多くなりがち（計算コスト高）
- 急峻な周波数特性を実現するのが困難

### IIR（Infinite Impulse Response）フィルタ

---

**特徴**: 無限長のインパルス応答、フィードバック構造

```python
# IIRフィルタの差分方程式
y[n] = b[0]*x[n] + b[1]*x[n-1] + ... + b[M]*x[n-M]
       - a[1]*y[n-1] - a[2]*y[n-2] - ... - a[N]*y[n-N]
```

**利点**:
- 少ないタップ数で急峻な特性（計算コスト低）
- アナログフィルタと同等の特性を実現可能

**欠点**:
- 設計パラメータによっては不安定になる
- 非線形位相（周波数により遅延が変化）

### どちらを選ぶべきか

---

| 用途 | 推奨フィルタ | 理由 |
|-----|-------------|------|
| 音声処理 | FIR | 線形位相が重要 |
| リアルタイム信号処理 | IIR | 低遅延・低計算コスト |
| 通信システム | FIR | 安定性重視 |
| パワーエレクトロニクス | IIR | 急峻な特性が必要 |

## Pythonによるフィルタ設計と実装

---

### 1. FIRフィルタの設計

---

#### 窓関数法

```python
import numpy as np
import scipy.signal as signal
import matplotlib.pyplot as plt

# サンプリング周波数
fs = 1000  # Hz

# ローパスフィルタの設計（カットオフ: 100Hz、タップ数: 101）
numtaps = 101
cutoff = 100  # Hz

# FIRフィルタ係数を計算
fir_coeff = signal.firwin(numtaps, cutoff, fs=fs)

# 周波数応答を計算
w, h = signal.freqz(fir_coeff, worN=8000, fs=fs)

# プロット
plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.plot(fir_coeff)
plt.title('FIR Filter Coefficients')
plt.xlabel('Tap number')
plt.ylabel('Coefficient value')
plt.grid(True)

plt.subplot(1, 2, 2)
plt.plot(w, 20 * np.log10(abs(h)))
plt.title('Frequency Response')
plt.xlabel('Frequency [Hz]')
plt.ylabel('Amplitude [dB]')
plt.grid(True)
plt.ylim(-100, 5)

plt.tight_layout()
plt.show()
```

#### 各種ウィンドウ関数の比較

```python
# 異なるウィンドウ関数でフィルタを設計
windows = ['hamming', 'hann', 'blackman', 'kaiser']

plt.figure(figsize=(12, 6))

for i, win in enumerate(windows):
	# フィルタ設計
	if win == 'kaiser':
		fir = signal.firwin(numtaps, cutoff, fs=fs, window=(win, 8))
	else:
		fir = signal.firwin(numtaps, cutoff, fs=fs, window=win)

	# 周波数応答
	w, h = signal.freqz(fir, worN=8000, fs=fs)

	# プロット
	plt.subplot(2, 2, i+1)
	plt.plot(w, 20 * np.log10(abs(h)))
	plt.title(f'{win.capitalize()} Window')
	plt.xlabel('Frequency [Hz]')
	plt.ylabel('Amplitude [dB]')
	plt.grid(True)
	plt.ylim(-100, 5)

plt.tight_layout()
plt.show()
```

### 2. IIRフィルタの設計

---

#### バターワースフィルタ

```python
# ローパスフィルタの設計（4次バターワース、カットオフ: 100Hz）
order = 4
cutoff = 100  # Hz

# IIRフィルタ係数を計算
b, a = signal.butter(order, cutoff, btype='low', fs=fs)

# 周波数応答
w, h = signal.freqz(b, a, worN=8000, fs=fs)

# 極と零点の配置
z, p, k = signal.butter(order, cutoff, btype='low', fs=fs, output='zpk')

# プロット
fig, axes = plt.subplots(1, 3, figsize=(15, 4))

# 周波数応答
axes[0].plot(w, 20 * np.log10(abs(h)))
axes[0].set_title('Frequency Response')
axes[0].set_xlabel('Frequency [Hz]')
axes[0].set_ylabel('Amplitude [dB]')
axes[0].grid(True)

# 位相応答
axes[1].plot(w, np.angle(h))
axes[1].set_title('Phase Response')
axes[1].set_xlabel('Frequency [Hz]')
axes[1].set_ylabel('Phase [radians]')
axes[1].grid(True)

# 極零点配置
axes[2].scatter(np.real(z), np.imag(z), marker='o', s=50, label='Zeros')
axes[2].scatter(np.real(p), np.imag(p), marker='x', s=50, label='Poles')
circle = plt.Circle((0, 0), 1, fill=False, linestyle='--')
axes[2].add_patch(circle)
axes[2].set_title('Pole-Zero Plot')
axes[2].set_xlabel('Real')
axes[2].set_ylabel('Imaginary')
axes[2].legend()
axes[2].grid(True)
axes[2].axis('equal')

plt.tight_layout()
plt.show()
```

#### 各種IIRフィルタの比較

```python
# バターワース、チェビシェフ、楕円フィルタの比較
filter_types = [
	('butter', 'Butterworth'),
	('cheby1', 'Chebyshev Type I'),
	('cheby2', 'Chebyshev Type II'),
	('ellip', 'Elliptic')
]

plt.figure(figsize=(12, 8))

for i, (ftype, fname) in enumerate(filter_types):
	# フィルタ設計
	if ftype == 'butter':
		b, a = signal.butter(order, cutoff, btype='low', fs=fs)
	elif ftype == 'cheby1':
		b, a = signal.cheby1(order, 1, cutoff, btype='low', fs=fs)
	elif ftype == 'cheby2':
		b, a = signal.cheby2(order, 40, cutoff, btype='low', fs=fs)
	else:  # ellip
		b, a = signal.ellip(order, 1, 40, cutoff, btype='low', fs=fs)

	# 周波数応答
	w, h = signal.freqz(b, a, worN=8000, fs=fs)

	# プロット
	plt.subplot(2, 2, i+1)
	plt.plot(w, 20 * np.log10(abs(h)))
	plt.title(fname)
	plt.xlabel('Frequency [Hz]')
	plt.ylabel('Amplitude [dB]')
	plt.grid(True)
	plt.ylim(-100, 5)
	plt.xlim(0, 500)

plt.tight_layout()
plt.show()
```

## フィルタの適用

---

### テスト信号の生成

---

```python
# テスト信号: 50Hz + 200Hz + ノイズ
fs = 1000
t = np.linspace(0, 1, fs, endpoint=False)

# 信号成分
signal_low = np.sin(2 * np.pi * 50 * t)   # 低周波
signal_high = np.sin(2 * np.pi * 200 * t)  # 高周波
noise = 0.5 * np.random.randn(len(t))      # ノイズ

# 合成信号
test_signal = signal_low + signal_high + noise
```

### FIRフィルタの適用

---

```python
# FIRローパスフィルタ（カットオフ: 100Hz）
fir_lp = signal.firwin(101, 100, fs=fs)

# フィルタ適用
filtered_fir = signal.lfilter(fir_lp, 1.0, test_signal)

# プロット
plt.figure(figsize=(12, 6))

plt.subplot(2, 1, 1)
plt.plot(t, test_signal, label='Original', alpha=0.7)
plt.plot(t, signal_low, label='True 50Hz component', linewidth=2)
plt.xlabel('Time [s]')
plt.ylabel('Amplitude')
plt.title('Original Signal')
plt.legend()
plt.grid(True)

plt.subplot(2, 1, 2)
plt.plot(t, filtered_fir, label='Filtered', alpha=0.7)
plt.plot(t, signal_low, label='True 50Hz component', linewidth=2)
plt.xlabel('Time [s]')
plt.ylabel('Amplitude')
plt.title('FIR Filtered Signal')
plt.legend()
plt.grid(True)

plt.tight_layout()
plt.show()
```

### IIRフィルタの適用

---

```python
# IIRローパスフィルタ（4次バターワース、カットオフ: 100Hz）
b, a = signal.butter(4, 100, btype='low', fs=fs)

# フィルタ適用
filtered_iir = signal.filtfilt(b, a, test_signal)  # 位相歪みなし

# プロット
plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.plot(t, test_signal, label='Original', alpha=0.7)
plt.plot(t, filtered_iir, label='Filtered (filtfilt)', linewidth=2)
plt.xlabel('Time [s]')
plt.ylabel('Amplitude')
plt.title('IIR Filtered Signal (Zero Phase)')
plt.legend()
plt.grid(True)

# lfilter vs filtfilt の比較
filtered_iir_lfilter = signal.lfilter(b, a, test_signal)

plt.subplot(1, 2, 2)
plt.plot(t, filtered_iir_lfilter, label='lfilter (causal)', alpha=0.7)
plt.plot(t, filtered_iir, label='filtfilt (zero-phase)', linewidth=2)
plt.xlabel('Time [s]')
plt.ylabel('Amplitude')
plt.title('lfilter vs filtfilt')
plt.legend()
plt.grid(True)

plt.tight_layout()
plt.show()
```

**`lfilter` vs `filtfilt`**:
- `lfilter`: 因果的（リアルタイム処理可能）、位相遅延あり
- `filtfilt`: 非因果的（オフライン処理）、位相遅延なし

## リアルタイム処理への応用

---

### ストリーミング信号の処理

---

```python
class RealtimeFilter:
	def __init__(self, b, a):
		"""
		リアルタイムフィルタクラス

		Parameters:
		b, a : array_like
			フィルタ係数
		"""
		self.b = b
		self.a = a
		# 内部状態の初期化
		self.zi = signal.lfilter_zi(b, a)

	def process(self, x):
		"""
		入力信号をフィルタリング

		Parameters:
		x : array_like
			入力信号

		Returns:
		y : array_like
			フィルタリングされた信号
		"""
		y, self.zi = signal.lfilter(self.b, self.a, x, zi=self.zi)
		return y

# 使用例
b, a = signal.butter(4, 100, btype='low', fs=1000)
rt_filter = RealtimeFilter(b, a)

# ストリーミングデータを処理
chunk_size = 100
for i in range(0, len(test_signal), chunk_size):
	chunk = test_signal[i:i+chunk_size]
	filtered_chunk = rt_filter.process(chunk)
	# filtered_chunkを使った処理（例：再生、送信など）
```

### バンドパスフィルタの実装例

---

```python
# 100-150Hzのバンドパスフィルタ
b_bp, a_bp = signal.butter(4, [100, 150], btype='band', fs=fs)

# テスト信号（50Hz + 120Hz + 200Hz）
t = np.linspace(0, 1, fs, endpoint=False)
multi_freq = (np.sin(2*np.pi*50*t) +
			  np.sin(2*np.pi*120*t) +
			  np.sin(2*np.pi*200*t))

# フィルタ適用
filtered_bp = signal.filtfilt(b_bp, a_bp, multi_freq)

# プロット
plt.figure(figsize=(12, 6))

# 時間領域
plt.subplot(2, 1, 1)
plt.plot(t[:200], multi_freq[:200], label='Original')
plt.plot(t[:200], filtered_bp[:200], label='Bandpass Filtered', linewidth=2)
plt.xlabel('Time [s]')
plt.ylabel('Amplitude')
plt.title('Time Domain')
plt.legend()
plt.grid(True)

# 周波数領域
freqs_orig = np.fft.fftfreq(len(multi_freq), 1/fs)
fft_orig = np.abs(np.fft.fft(multi_freq))
fft_filt = np.abs(np.fft.fft(filtered_bp))

plt.subplot(2, 1, 2)
plt.plot(freqs_orig[:len(freqs_orig)//2], fft_orig[:len(fft_orig)//2],
		 label='Original', alpha=0.7)
plt.plot(freqs_orig[:len(freqs_orig)//2], fft_filt[:len(fft_filt)//2],
		 label='Filtered', linewidth=2)
plt.xlabel('Frequency [Hz]')
plt.ylabel('Amplitude')
plt.title('Frequency Domain')
plt.legend()
plt.grid(True)
plt.xlim(0, 300)

plt.tight_layout()
plt.show()
```

## まとめ

---

デジタルフィルタの設計と実装において、以下のポイントが重要です：

1. **FIR vs IIR**: 用途に応じた適切な選択
   - 安定性・線形位相重視 → FIR
   - 計算効率・急峻な特性 → IIR

2. **設計手法**: Pythonで簡単に実装可能
   - SciPyの信号処理ライブラリを活用
   - 周波数応答の確認が重要

3. **リアルタイム処理**: 内部状態の保持が鍵
   - `lfilter_zi`で状態を初期化
   - チャンクごとに処理

4. **実用的な考慮事項**:
   - サンプリング定理（ナイキスト周波数）の順守
   - 量子化誤差とビット深度
   - 計算コストとメモリ使用量

デジタルフィルタは、信号処理の基盤技術として、音声処理、画像処理、通信システム、制御システムなど、あらゆる分野で活用されています。

## 参考リソース

---

### ライブラリ・ツール

---

- SciPy Signal Processing: https://docs.scipy.org/doc/scipy/reference/signal.html
- NumPy: https://numpy.org/doc/
- Matplotlib: https://matplotlib.org/

### 参考文献

---

- "Digital Signal Processing" by John G. Proakis and Dimitris G. Manolakis
- "The Scientist and Engineer's Guide to Digital Signal Processing" by Steven W. Smith
