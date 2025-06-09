
# Canlı Döviz Kuru Takip ve Hesaplama Uygulaması

Bu proje, kullanıcıların canlı döviz kurlarını takip edebileceği, farklı para birimleri arasında dönüşüm yapabileceği ve popüler çapraz kurları görüntüleyebileceği modern bir web uygulamasıdır.

## 🌟 Özellikler

- 💱 Canlı döviz kuru takibi
- 🔄 Para birimi dönüştürücü
- 📊 Popüler çapraz kurlar tablosu
- 📈 24 saatlik değişim oranları
- 🌐 Çoklu para birimi desteği
- 🔄 Anlık yenileme özelliği
- 📱 Mobil uyumlu tasarım

## 💹 Desteklenen Para Birimleri

- TRY (Türk Lirası)
- USD (Amerikan Doları)
- EUR (Euro)
- GBP (İngiliz Sterlini)
- JPY (Japon Yeni)
- AUD (Avustralya Doları)
- CNY (Çin Yuanı)
- INR (Hindistan Rupisi)
- RUB (Rus Rublesi)

## 🛠️ Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/AliOsman16/LiveCurrency.git
```

2. Proje dizinine gidin:
```bash
cd LiveCurrency
```

3. `currency.js` dosyasında API anahtarınızı ayarlayın:
```javascript
this.apiKey = "YOUR_API_KEY"; // FreeCurrencyAPI anahtarınızı buraya girin
```

4. Projeyi bir web sunucusunda çalıştırın veya doğrudan `LiveCurrency.html` dosyasını tarayıcınızda açın.

## 📌 API Kullanımı

Bu proje [FreeCurrencyAPI](https://freecurrencyapi.com/)'yi kullanmaktadır. Uygulamayı kullanabilmek için:

1. [FreeCurrencyAPI](https://freecurrencyapi.com/)'ye kaydolun
2. API anahtarınızı alın
3. `currency.js` dosyasındaki `apiKey` değişkenine API anahtarınızı ekleyin

## 🔧 Teknolojiler

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5.3.6
- Font Awesome 6.5.0
- FreeCurrencyAPI

## 📁 Proje Yapısı

```
LiveCurrency/
│
├── LiveCurrency.html    # Ana HTML dosyası
├── styles.css          # Stil dosyası
├── app.js             # Ana uygulama mantığı
├── currency.js        # API işlemleri ve döviz hesaplamaları
└── README.md          # Proje dokümantasyonu
```

## 🚀 Özellik Detayları

### Döviz Hesaplayıcı
- Miktar girişi
- Kaynak para birimi seçimi
- Hedef para birimi seçimi
- Anlık hesaplama
- Detaylı sonuç gösterimi

### Canlı Döviz Kurları
- Seçilen baz para birimine göre güncel kurlar
- 24 saatlik değişim oranları
- Görsel göstergeler (artış/azalış ikonları)
- Manuel yenileme butonu

### Popüler Çapraz Kurlar
- Önemli para çiftlerinin anlık değerleri
- 24 saatlik değişim yüzdeleri
- Otomatik güncelleme

## 💡 Geliştirme Fikirleri

  🌐 Daha fazla döviz ekleyerek genişletme
  
  📈 Grafikler ekleyerek trend takibi
  
  🕒 Ayarlanabilir yenileme aralığı
  
  🌓 Koyu / Açık tema seçimi

## 🤝 Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik: Detay'`)
4. Branch'inizi push edin (`git push origin feature/yeniOzellik`)
5. Pull Request oluşturun
