---
title: STM32マイコン入門｜GPIO制御からタイマー割り込みまで実践ガイド2025
slug: stm32-gpio-timer-guide
description: STM32マイコンの基礎から実践まで。GPIO制御、タイマー、割り込み処理を図解とコード例で丁寧に解説。初心者から中級者向けの完全ガイド。
published_date: 2025-01-20
author: SSSSブログ編集部
category: 組み込みシステム
tags: [STM32, マイコン, GPIO, タイマー, 割り込み, 組み込み, ARM Cortex-M, HAL]
keywords: STM32, マイコン, GPIO, タイマー, 割り込み, ARM Cortex-M, STM32CubeMX, HAL, 組み込み開発
image: /images/thumbnails/stm32-gpio-timer-guide.png
features:
  - STM32の基本構成と特徴
  - GPIOの初期化と制御方法
  - タイマーの設定と活用
  - 割り込み処理の実装
---

# STM32マイコン入門：GPIO制御からタイマー割り込みまで

STM32は、STMicroelectronics社が提供するARM Cortex-Mコアを搭載したマイコンファミリーです。高性能、低消費電力、豊富なペリフェラルにより、組み込みシステム開発で広く採用されています。

本記事では、STM32の基礎から実践的なGPIO制御、タイマー、割り込み処理まで、実例を交えて解説します。

## STM32マイコンの基本

### STM32ファミリーの概要

STM32は、用途に応じて複数のシリーズが提供されています：

| シリーズ | コア | 動作周波数 | 用途 |
|---------|------|-----------|------|
| STM32F0 | Cortex-M0 | 48MHz | エントリーレベル、低コスト |
| STM32F1 | Cortex-M3 | 72MHz | 汎用アプリケーション |
| STM32F4 | Cortex-M4 | 180MHz | DSP、モーター制御 |
| STM32F7 | Cortex-M7 | 216MHz | 高性能アプリケーション |
| STM32H7 | Cortex-M7 | 480MHz | 最高性能 |
| STM32L4 | Cortex-M4 | 80MHz | 低消費電力 |

### STM32の主な特徴

1. **豊富なペリフェラル**: UART、SPI、I2C、ADC、DAC、タイマーなど
2. **高性能**: ARM Cortex-Mコアによる高速処理
3. **低消費電力**: スリープモード、ストップモードなど複数の省電力モード
4. **開発環境の充実**: STM32CubeMX、STM32CubeIDEなど無料ツール

## 開発環境のセットアップ

### 必要なツール

1. **STM32CubeMX**: ペリフェラル設定とコード生成ツール
2. **STM32CubeIDE**: 統合開発環境（Eclipse based）
3. **ST-Link**: デバッガ/プログラマ

### プロジェクトの作成

```bash
# STM32CubeMXでプロジェクトを作成
# 1. MCU Selectorでターゲットマイコンを選択（例: STM32F401RE）
# 2. Pinout & Configurationでペリフェラルを設定
# 3. Clock Configurationでクロックを設定
# 4. Project Manager > Generate Code
```

## GPIO制御の基礎

GPIOは、マイコンと外部デバイスを接続する基本的なインターフェースです。

### GPIOの初期化

STM32 HAL（Hardware Abstraction Layer）を使ったGPIO初期化の例：

```c
/* GPIO初期化の例：PA5ピンを出力として設定 */
void MX_GPIO_Init(void)
{
	GPIO_InitTypeDef GPIO_InitStruct = {0};

	/* GPIOクロックを有効化 */
	__HAL_RCC_GPIOA_CLK_ENABLE();

	/* GPIO設定構造体の初期化 */
	GPIO_InitStruct.Pin = GPIO_PIN_5;         // PA5ピン
	GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP; // プッシュプル出力
	GPIO_InitStruct.Pull = GPIO_NOPULL;        // プルアップ/ダウンなし
	GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW; // 低速

	/* GPIOを初期化 */
	HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);
}
```

### GPIOモードの種類

```c
/* 出力モード */
GPIO_MODE_OUTPUT_PP  // プッシュプル出力
GPIO_MODE_OUTPUT_OD  // オープンドレイン出力

/* 入力モード */
GPIO_MODE_INPUT      // 入力モード
GPIO_MODE_IT_RISING  // 立ち上がりエッジ割り込み
GPIO_MODE_IT_FALLING // 立ち下がりエッジ割り込み

/* アナログ・代替機能 */
GPIO_MODE_ANALOG     // アナログモード
GPIO_MODE_AF_PP      // 代替機能プッシュプル
```

### GPIO出力制御

```c
/* LEDを点灯・消灯する例 */
void LED_Control(void)
{
	/* LEDを点灯 */
	HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_SET);

	/* 1秒待機 */
	HAL_Delay(1000);

	/* LEDを消灯 */
	HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_RESET);

	/* 1秒待機 */
	HAL_Delay(1000);
}

/* より効率的なトグル制御 */
void LED_Toggle(void)
{
	HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
	HAL_Delay(500);
}
```

### GPIO入力読み取り

```c
/* ボタン入力を読み取る例 */
void Button_Read(void)
{
	GPIO_PinState buttonState;

	/* ボタンの状態を読み取り */
	buttonState = HAL_GPIO_ReadPin(GPIOC, GPIO_PIN_13);

	if (buttonState == GPIO_PIN_RESET) {
		/* ボタンが押されている */
		HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_SET);
	} else {
		/* ボタンが押されていない */
		HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_RESET);
	}
}
```

## タイマーの基礎

STM32のタイマーは、時間計測、PWM生成、イベントカウントなど多様な用途に使えます。

### タイマーの種類

| タイマー | ビット数 | 特徴 |
|---------|---------|------|
| TIM1, TIM8 | 16-bit | アドバンストタイマー（モーター制御） |
| TIM2-TIM5 | 32-bit | 汎用タイマー |
| TIM6, TIM7 | 16-bit | ベーシックタイマー |
| TIM9-TIM14 | 16-bit | 汎用タイマー（簡易版） |

### タイマーの基本設定

```c
/* TIM2の基本設定例（1秒間隔） */
void MX_TIM2_Init(void)
{
	TIM_HandleTypeDef htim2;

	/* タイマークロックを有効化 */
	__HAL_RCC_TIM2_CLK_ENABLE();

	/* タイマー設定 */
	htim2.Instance = TIM2;
	htim2.Init.Prescaler = 84 - 1;  // 84MHz / 84 = 1MHz
	htim2.Init.CounterMode = TIM_COUNTERMODE_UP;
	htim2.Init.Period = 1000000 - 1; // 1秒 (1MHz / 1000000)
	htim2.Init.ClockDivision = TIM_CLOCKDIVISION_DIV1;

	/* タイマー初期化 */
	HAL_TIM_Base_Init(&htim2);

	/* タイマー開始 */
	HAL_TIM_Base_Start(&htim2);
}
```

### タイマー計算の公式

```
タイマー周期 = (Prescaler + 1) × (Period + 1) / タイマークロック周波数

例: 1秒間隔を実現する場合
- タイマークロック: 84MHz
- Prescaler: 83 (84 - 1)
- Period: 999999 (1000000 - 1)

周期 = 84 × 1000000 / 84000000 = 1秒
```

### PWM出力の設定

```c
/* PWM出力の設定例 */
void MX_TIM3_PWM_Init(void)
{
	TIM_HandleTypeDef htim3;
	TIM_OC_InitTypeDef sConfigOC = {0};

	/* タイマー基本設定 */
	htim3.Instance = TIM3;
	htim3.Init.Prescaler = 84 - 1;   // 1MHz
	htim3.Init.CounterMode = TIM_COUNTERMODE_UP;
	htim3.Init.Period = 1000 - 1;    // 1kHz PWM周波数
	htim3.Init.ClockDivision = TIM_CLOCKDIVISION_DIV1;

	HAL_TIM_PWM_Init(&htim3);

	/* PWMチャネル設定 */
	sConfigOC.OCMode = TIM_OCMODE_PWM1;
	sConfigOC.Pulse = 500;  // デューティ比50%
	sConfigOC.OCPolarity = TIM_OCPOLARITY_HIGH;
	sConfigOC.OCFastMode = TIM_OCFAST_DISABLE;

	HAL_TIM_PWM_ConfigChannel(&htim3, &sConfigOC, TIM_CHANNEL_1);

	/* PWM出力開始 */
	HAL_TIM_PWM_Start(&htim3, TIM_CHANNEL_1);
}

/* デューティ比を変更する関数 */
void Set_PWM_DutyCycle(uint16_t duty)
{
	__HAL_TIM_SET_COMPARE(&htim3, TIM_CHANNEL_1, duty);
}
```

## 割り込み処理

割り込みは、外部イベントや内部タイマーによってプログラムの実行を一時停止し、特定の処理を実行する仕組みです。

### GPIO外部割り込みの設定

```c
/* ボタン押下時の割り込み設定 */
void MX_GPIO_EXTI_Init(void)
{
	GPIO_InitTypeDef GPIO_InitStruct = {0};

	/* GPIOクロック有効化 */
	__HAL_RCC_GPIOC_CLK_ENABLE();

	/* GPIO設定 */
	GPIO_InitStruct.Pin = GPIO_PIN_13;
	GPIO_InitStruct.Mode = GPIO_MODE_IT_FALLING; // 立ち下がりエッジ割り込み
	GPIO_InitStruct.Pull = GPIO_PULLUP;

	HAL_GPIO_Init(GPIOC, &GPIO_InitStruct);

	/* 割り込み優先度設定 */
	HAL_NVIC_SetPriority(EXTI15_10_IRQn, 0, 0);
	HAL_NVIC_EnableIRQ(EXTI15_10_IRQn);
}

/* 割り込みハンドラ */
void EXTI15_10_IRQHandler(void)
{
	HAL_GPIO_EXTI_IRQHandler(GPIO_PIN_13);
}

/* 割り込みコールバック関数 */
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
{
	if (GPIO_Pin == GPIO_PIN_13) {
		/* ボタンが押された時の処理 */
		HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
	}
}
```

### タイマー割り込みの設定

```c
/* タイマー割り込みの設定 */
void MX_TIM2_IT_Init(void)
{
	TIM_HandleTypeDef htim2;

	/* タイマー設定 */
	htim2.Instance = TIM2;
	htim2.Init.Prescaler = 8400 - 1;  // 84MHz / 8400 = 10kHz
	htim2.Init.CounterMode = TIM_COUNTERMODE_UP;
	htim2.Init.Period = 10000 - 1;    // 1秒間隔 (10kHz / 10000)

	HAL_TIM_Base_Init(&htim2);

	/* 割り込み優先度設定 */
	HAL_NVIC_SetPriority(TIM2_IRQn, 0, 0);
	HAL_NVIC_EnableIRQ(TIM2_IRQn);

	/* タイマー割り込みを有効化して開始 */
	HAL_TIM_Base_Start_IT(&htim2);
}

/* タイマー割り込みハンドラ */
void TIM2_IRQHandler(void)
{
	HAL_TIM_IRQHandler(&htim2);
}

/* タイマー割り込みコールバック */
void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim)
{
	if (htim->Instance == TIM2) {
		/* 1秒ごとにLEDをトグル */
		HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
	}
}
```

## 実践例：Lチカ＋ボタン＋タイマー

これまでの知識を統合した実践例です。

```c
/* main.c */
#include "main.h"

TIM_HandleTypeDef htim2;
volatile uint32_t led_blink_interval = 500; // ms

int main(void)
{
	/* HAL初期化 */
	HAL_Init();

	/* クロック設定 */
	SystemClock_Config();

	/* GPIO初期化（LED: PA5, Button: PC13） */
	MX_GPIO_Init();

	/* タイマー初期化 */
	MX_TIM2_Init();

	/* メインループ */
	while (1)
	{
		/* タイマー割り込みとボタン割り込みで処理 */
	}
}

/* GPIO初期化 */
void MX_GPIO_Init(void)
{
	GPIO_InitTypeDef GPIO_InitStruct = {0};

	/* クロック有効化 */
	__HAL_RCC_GPIOA_CLK_ENABLE();
	__HAL_RCC_GPIOC_CLK_ENABLE();

	/* LED (PA5) 設定 */
	GPIO_InitStruct.Pin = GPIO_PIN_5;
	GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
	GPIO_InitStruct.Pull = GPIO_NOPULL;
	GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
	HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);

	/* Button (PC13) 設定 */
	GPIO_InitStruct.Pin = GPIO_PIN_13;
	GPIO_InitStruct.Mode = GPIO_MODE_IT_FALLING;
	GPIO_InitStruct.Pull = GPIO_PULLUP;
	HAL_GPIO_Init(GPIOC, &GPIO_InitStruct);

	/* 外部割り込み設定 */
	HAL_NVIC_SetPriority(EXTI15_10_IRQn, 1, 0);
	HAL_NVIC_EnableIRQ(EXTI15_10_IRQn);
}

/* タイマー初期化 */
void MX_TIM2_Init(void)
{
	__HAL_RCC_TIM2_CLK_ENABLE();

	htim2.Instance = TIM2;
	htim2.Init.Prescaler = 84 - 1;
	htim2.Init.CounterMode = TIM_COUNTERMODE_UP;
	htim2.Init.Period = led_blink_interval * 1000 - 1;

	HAL_TIM_Base_Init(&htim2);

	HAL_NVIC_SetPriority(TIM2_IRQn, 0, 0);
	HAL_NVIC_EnableIRQ(TIM2_IRQn);

	HAL_TIM_Base_Start_IT(&htim2);
}

/* ボタン割り込みコールバック */
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
{
	if (GPIO_Pin == GPIO_PIN_13) {
		/* ボタン押下時、点滅間隔を変更 */
		if (led_blink_interval == 500) {
			led_blink_interval = 100;
		} else {
			led_blink_interval = 500;
		}

		/* タイマー周期を更新 */
		__HAL_TIM_SET_AUTORELOAD(&htim2, led_blink_interval * 1000 - 1);
	}
}

/* タイマー割り込みコールバック */
void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim)
{
	if (htim->Instance == TIM2) {
		HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
	}
}
```

## デバッグのヒント

### シリアル出力によるデバッグ

```c
/* UART経由でデバッグ情報を出力 */
void Debug_Print(char *message)
{
	HAL_UART_Transmit(&huart2, (uint8_t*)message, strlen(message), 100);
}

/* 使用例 */
Debug_Print("Timer interrupt occurred\r\n");
```

### SWV（Serial Wire Viewer）を使ったデバッグ

```c
/* printf関数をSWOにリダイレクト */
int _write(int file, char *ptr, int len)
{
	int i;
	for (i = 0; i < len; i++) {
		ITM_SendChar((*ptr++));
	}
	return len;
}

/* 使用例 */
printf("LED Blink Interval: %lu ms\r\n", led_blink_interval);
```

## まとめ

STM32マイコンの基礎から実践まで、以下のポイントを学びました：

1. **GPIO制御**: 入出力の基本、初期化、読み書き
2. **タイマー**: 時間計測、PWM生成、周期計算
3. **割り込み**: GPIO外部割り込み、タイマー割り込み、優先度設定
4. **HALライブラリ**: STM32 HALの基本的な使い方

これらの基礎知識を応用することで、モーター制御、センサーインターフェース、通信プロトコルなど、より高度な組み込みシステムを構築できます。

## 参考リソース

### 公式ドキュメント
- STM32CubeMXユーザーマニュアル: https://www.st.com/resource/en/user_manual/um1718-stm32cubemx-for-stm32-configuration-and-initialization-c-code-generation-stmicroelectronics.pdf
- STM32F4 HALドライバー: https://www.st.com/resource/en/user_manual/um1725-description-of-stm32f4-hal-and-lowlayer-drivers-stmicroelectronics.pdf

### チュートリアル・コミュニティ
- STM32公式フォーラム: https://community.st.com/
- ControllersTech: https://controllerstech.com/
