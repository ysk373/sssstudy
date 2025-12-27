---
title: FFT（高速フーリエ変換）完全ガイド｜基礎理論からPython実装まで2025
slug: fft-basics-implementation
description: FFTの基礎理論から実装まで徹底解説。離散フーリエ変換との違い、アルゴリズムの仕組み、Pythonによる実装例、音声・画像処理への応用を網羅した実践ガイド。
published_date: 2025-01-22
author: SSSSブログ編集部
category: 信号処理
tags: [FFT, フーリエ変換, DSP, Python, NumPy, 信号処理, 周波数解析, DFT]
keywords: FFT, 高速フーリエ変換, フーリエ変換, DFT, 離散フーリエ変換, 信号処理, 周波数解析, Python, NumPy
image: /images/thumbnails/fft-basics-implementation.png
features:
  - フーリエ変換の基本原理
  - FFTアルゴリズムの効率性
  - Pythonによる実装例
  - 音声・画像処理への応用
---

# FFT（高速フーリエ変換）完全ガイド：基礎理論からPython実装まで

FFT（Fast Fourier Transform：高速フーリエ変換）は、信号処理における最も重要なアルゴリズムの一つです。音声処理、画像処理、通信システム、医療機器など、幅広い分野で活用されています。

本記事では、FFTの基礎理論から実装、応用まで、実例を交えながら詳しく解説します。

## フーリエ変換とは

### 時間領域と周波数領域

信号は、時間領域と周波数領域の2つの視点で表現できます。

**時間領域**: 時間の経過とともに信号の振幅がどう変化するかを表現
**周波数領域**: 信号がどの周波数成分を含んでいるかを表現

フーリエ変換は、時間領域の信号を周波数領域に変換する数学的な操作です。

### 連続フーリエ変換（CFT）

連続的な信号 x(t) に対するフーリエ変換：

```
X(f) = ∫ x(t) e^(-j2πft) dt
```

- x(t): 時間領域の信号
- X(f): 周波数領域の信号（スペクトル）
- f: 周波数
- j: 虚数単位

### 離散フーリエ変換（DFT）

実際のコンピューターでは、離散的なサンプル点で信号を扱います。N点の離散信号 x[n] に対するDFTは：

```
X[k] = Σ(n=0 to N-1) x[n] e^(-j2πkn/N)
```

- x[n]: 時間領域の離散信号（n = 0, 1, ..., N-1）
- X[k]: 周波数領域の離散信号（k = 0, 1, ..., N-1）
- N: サンプル数

**計算量**: O(N²) - N個の周波数成分を計算するのに、それぞれN回の計算が必要

## FFTの登場：計算量の劇的な削減

### DFTの問題点

DFTの計算量 O(N²) は、サンプル数が増えると実用的でなくなります：

- N = 1024: 約100万回の計算
- N = 4096: 約1600万回の計算
- N = 65536: 約43億回の計算

### FFTアルゴリズムの効率性

FFT（高速フーリエ変換）は、DFTを効率的に計算するアルゴリズムです。

**計算量**: O(N log N)

- N = 1024: 約10,000回（DFTの1/100）
- N = 4096: 約49,000回（DFTの1/330）
- N = 65536: 約1,050,000回（DFTの1/4000）

### Cooley-Tukeyアルゴリズム

最も有名なFFTアルゴリズムは、Cooley-Tukey法です。基本的なアイデアは「分割統治法」：

1. N点のDFTを、N/2点のDFT 2つに分割
2. 再帰的に分割を繰り返す
3. 2点のDFTまで分割したら、結果を組み合わせる

**条件**: Nが2のべき乗（2, 4, 8, 16, 32, ...）の場合に最も効率的

## Pythonによる実装

### NumPyを使った基本的な使用例

```python
import numpy as np
import matplotlib.pyplot as plt

# サンプリング周波数とサンプル数
fs = 1000  # Hz
N = 1024

# 時間軸を作成
t = np.arange(N) / fs

# テスト信号: 50Hzと120Hzの正弦波の合成
f1, f2 = 50, 120
x = np.sin(2 * np.pi * f1 * t) + 0.5 * np.sin(2 * np.pi * f2 * t)

# FFTを実行
X = np.fft.fft(x)

# 周波数軸を作成
freqs = np.fft.fftfreq(N, 1/fs)

# 振幅スペクトルを計算
amplitude = np.abs(X)

# 可視化
plt.figure(figsize=(12, 4))

# 時間領域のプロット
plt.subplot(1, 2, 1)
plt.plot(t[:200], x[:200])
plt.xlabel('Time [s]')
plt.ylabel('Amplitude')
plt.title('Time Domain Signal')
plt.grid(True)

# 周波数領域のプロット
plt.subplot(1, 2, 2)
plt.plot(freqs[:N//2], amplitude[:N//2])
plt.xlabel('Frequency [Hz]')
plt.ylabel('Amplitude')
plt.title('Frequency Spectrum')
plt.grid(True)

plt.tight_layout()
plt.show()
```

### FFTの主要な性質

#### 1. 対称性

実数信号のFFTは、共役対称性を持ちます：

```python
# 実数信号のFFT
x_real = np.random.randn(128)
X = np.fft.fft(x_real)

# 共役対称性の確認
print(np.allclose(X[1:], np.conj(X[-1:0:-1])))  # True
```

#### 2. パーセバルの定理

時間領域のエネルギーと周波数領域のエネルギーは等しい：

```python
# 時間領域のエネルギー
energy_time = np.sum(np.abs(x)**2)

# 周波数領域のエネルギー
energy_freq = np.sum(np.abs(X)**2) / N

print(f"Time domain energy: {energy_time}")
print(f"Frequency domain energy: {energy_freq}")
```

#### 3. ウィンドウ関数

信号を切り出す際の不連続性を緩和するため、ウィンドウ関数を適用します：

```python
# ハニングウィンドウを適用
window = np.hanning(N)
x_windowed = x * window

# FFT
X_windowed = np.fft.fft(x_windowed)

# 比較
plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.plot(freqs[:N//2], np.abs(X)[:N//2], label='No window')
plt.xlabel('Frequency [Hz]')
plt.ylabel('Amplitude')
plt.title('Without Window')
plt.grid(True)

plt.subplot(1, 2, 2)
plt.plot(freqs[:N//2], np.abs(X_windowed)[:N//2], label='Hanning window')
plt.xlabel('Frequency [Hz]')
plt.ylabel('Amplitude')
plt.title('With Hanning Window')
plt.grid(True)

plt.tight_layout()
plt.show()
```

主要なウィンドウ関数：
- **矩形窓**: `np.ones(N)` - 窓なし
- **ハニング窓**: `np.hanning(N)` - 一般的な用途
- **ハミング窓**: `np.hamming(N)` - 周波数分解能重視
- **ブラックマン窓**: `np.blackman(N)` - サイドローブ抑制

## 短時間フーリエ変換（STFT）

時間とともに変化する信号を分析するため、短い時間窓でFFTを繰り返し実行します。

```python
from scipy import signal

# 周波数が時間とともに変化する信号（チャープ信号）
t = np.linspace(0, 10, 10000)
w = signal.chirp(t, f0=6, f1=1, t1=10, method='linear')

# 短時間フーリエ変換
f, t_stft, Zxx = signal.stft(w, fs=1000, nperseg=256)

# スペクトログラムの表示
plt.figure(figsize=(10, 6))
plt.pcolormesh(t_stft, f, np.abs(Zxx), shading='gouraud')
plt.title('STFT Spectrogram')
plt.ylabel('Frequency [Hz]')
plt.xlabel('Time [sec]')
plt.colorbar(label='Magnitude')
plt.ylim(0, 50)
plt.show()
```

## 実践的な応用例

### 1. ノイズ除去

```python
# ノイズを含む信号の作成
t = np.linspace(0, 1, 1000)
clean_signal = np.sin(2 * np.pi * 50 * t)
noise = 0.5 * np.random.randn(len(t))
noisy_signal = clean_signal + noise

# FFT
X = np.fft.fft(noisy_signal)
freqs = np.fft.fftfreq(len(t), t[1] - t[0])

# 低周波成分のみを残す（ローパスフィルタ）
cutoff_freq = 100  # Hz
X_filtered = X.copy()
X_filtered[np.abs(freqs) > cutoff_freq] = 0

# 逆FFTで時間領域に戻す
filtered_signal = np.fft.ifft(X_filtered).real

# 比較
plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.plot(t, noisy_signal, label='Noisy', alpha=0.7)
plt.plot(t, clean_signal, label='Clean', linewidth=2)
plt.xlabel('Time [s]')
plt.ylabel('Amplitude')
plt.title('Original Signal')
plt.legend()
plt.grid(True)

plt.subplot(1, 2, 2)
plt.plot(t, filtered_signal, label='Filtered', alpha=0.7)
plt.plot(t, clean_signal, label='Clean', linewidth=2)
plt.xlabel('Time [s]')
plt.ylabel('Amplitude')
plt.title('Filtered Signal')
plt.legend()
plt.grid(True)

plt.tight_layout()
plt.show()
```

### 2. 音声のピッチ検出

```python
import librosa
import librosa.display

# 音声ファイルを読み込み
y, sr = librosa.load('audio.wav', duration=3.0)

# FFTでスペクトログラムを表示
D = librosa.amplitude_to_db(np.abs(librosa.stft(y)), ref=np.max)

plt.figure(figsize=(10, 4))
librosa.display.specshow(D, sr=sr, x_axis='time', y_axis='log')
plt.colorbar(format='%+2.0f dB')
plt.title('Spectrogram')
plt.show()

# ピッチ推定
pitches, magnitudes = librosa.piptrack(y=y, sr=sr)

# 最も強いピッチを抽出
pitch_values = []
for t in range(pitches.shape[1]):
	index = magnitudes[:, t].argmax()
	pitch = pitches[index, t]
	if pitch > 0:
		pitch_values.append(pitch)

print(f"Average pitch: {np.mean(pitch_values):.2f} Hz")
```

### 3. 画像の周波数解析

```python
from PIL import Image

# 画像を読み込み
img = Image.open('image.jpg').convert('L')  # グレースケール
img_array = np.array(img)

# 2次元FFT
F = np.fft.fft2(img_array)
F_shifted = np.fft.fftshift(F)

# 振幅スペクトルの計算
magnitude_spectrum = 20 * np.log(np.abs(F_shifted) + 1)

# 表示
plt.figure(figsize=(12, 6))

plt.subplot(1, 2, 1)
plt.imshow(img_array, cmap='gray')
plt.title('Original Image')
plt.axis('off')

plt.subplot(1, 2, 2)
plt.imshow(magnitude_spectrum, cmap='gray')
plt.title('Magnitude Spectrum')
plt.axis('off')

plt.show()
```

## FFTの最適化テクニック

### 1. ゼロパディング

サンプル数を2のべき乗に調整することで、FFTの効率を最大化：

```python
# 元の信号（サンプル数が2のべき乗でない）
x = np.random.randn(1000)

# 次の2のべき乗を計算
next_pow2 = int(2 ** np.ceil(np.log2(len(x))))

# ゼロパディング
x_padded = np.pad(x, (0, next_pow2 - len(x)), 'constant')

# FFT実行
X = np.fft.fft(x_padded)

print(f"Original length: {len(x)}")
print(f"Padded length: {len(x_padded)}")
```

### 2. リアルFFT（RFFT）

実数信号の場合、`rfft`を使うことで計算量とメモリを半減：

```python
# 通常のFFT
x = np.random.randn(1024)
X_full = np.fft.fft(x)

# リアルFFT
X_half = np.fft.rfft(x)

print(f"Full FFT length: {len(X_full)}")
print(f"Real FFT length: {len(X_half)}")  # 半分＋1
```

### 3. FFTW（Fastest Fourier Transform in the West）

さらなる高速化には、`pyFFTW`ライブラリを使用：

```python
import pyfftw

# pyfftw配列の作成
a = pyfftw.empty_aligned(1024, dtype='complex128')
a[:] = np.random.randn(1024) + 1j * np.random.randn(1024)

# FFTオブジェクトの作成
fft_object = pyfftw.builders.fft(a)

# FFT実行
b = fft_object()
```

## まとめ

FFTは信号処理における基盤技術であり、以下のポイントを理解しておくことが重要です：

1. **原理**: DFTを O(N log N) で計算する効率的なアルゴリズム
2. **実装**: NumPy/SciPyで簡単に利用可能
3. **応用**: 音声処理、画像処理、ノイズ除去、周波数解析
4. **最適化**: ゼロパディング、リアルFFT、FFTWライブラリ

FFTの理解により、リアルタイム信号処理、スペクトル分析、フィルタ設計など、幅広い応用が可能になります。

## 参考リソース

### ライブラリ・ツール
- NumPy FFT: https://numpy.org/doc/stable/reference/routines.fft.html
- SciPy Signal Processing: https://docs.scipy.org/doc/scipy/reference/signal.html
- Librosa (音声処理): https://librosa.org/

### 参考文献
- "Understanding Digital Signal Processing" by Richard G. Lyons
- "The Scientist and Engineer's Guide to Digital Signal Processing" by Steven W. Smith
