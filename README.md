**Car Rental Solution**

Bu depo iki ana proje içerir: mobil/uygulama arayüzü (frontend) ve katmanlı mimaride yazılmış ASP.NET Core Web API (backend). Aşağıda her iki projeyi, kullanılan teknolojileri, nasıl çalıştırılacağını ve önemli dosya/konfigürasyon noktalarını bulabilirsiniz.

**Projects**

- **Frontend (Mobil/Expo)**: [CarRental-FE](CarRental-FE) — React Native + Expo ile hazırlanmış TypeScript tabanlı uygulama. Temel bağımlılıklar ve sürümler için bakınız: [CarRental-FE/package.json](CarRental-FE/package.json#L1-L80).
- **Backend (Web API)**: [CarRentalProject/WebApi](CarRentalProject/WebApi) — ASP.NET Core Web API (katmanlı mimari: Business, Core, DataAccess, Entities). Proje dosyası ve NuGet paketleri: [CarRentalProject/WebApi/WebAPI.csproj](CarRentalProject/WebApi/WebAPI.csproj#L1-L80).

**Teknolojiler ve Kütüphaneler**

- **Backend:**
  - **Platform:** `ASP.NET Core` (`net6.0`).
  - **Dil:** `C#`.
  - **Paketler:** `Hangfire` (arka plan işleri), `Hangfire.PostgreSql`, `Microsoft.AspNetCore.Authentication.JwtBearer` (JWT auth), `Microsoft.Data.SqlClient` (SQL Server istemcisi), `Serilog` (loglama), `Swashbuckle`/`Swagger` (API dokümantasyonu). (Detaylar: [CarRentalProject/WebApi/WebAPI.csproj](CarRentalProject/WebApi/WebAPI.csproj#L1-L80)).
  - **Mimari:** Ayrılmış katmanlar — `Business`, `Core`, `DataAccess`, `Entities`.

- **Frontend:**
  - **Platform:** `Expo` (Expo SDK ~54) + `expo-router`.
  - **Kütüphaneler:** `react` (v19), `react-native` (v0.81.5), `@reduxjs/toolkit`, `react-redux`, `axios`, `react-native-paper`, `expo-*` paketleri. (Detaylar: [CarRental-FE/package.json](CarRental-FE/package.json#L1-L80)).
  - **Dil:** `TypeScript`.

**Önemli Dosyalar / Konumlar**

- API giriş noktası: [CarRentalProject/WebApi/Program.cs](CarRentalProject/WebApi/Program.cs)
- API proje dosyası: [CarRentalProject/WebApi/WebAPI.csproj](CarRentalProject/WebApi/WebAPI.csproj#L1-L80)
- Veritabanı scripti: [CarRentalProject/databaseSQL.sql](CarRentalProject/databaseSQL.sql)
- Frontend bağımlılıkları: [CarRental-FE/package.json](CarRental-FE/package.json#L1-L80)
- Frontend API konfigürasyonu: [CarRental-FE/constants/api.ts](CarRental-FE/constants/api.ts#L1-L200)

**Nasıl Çalıştırılır (Geliştirici Rehberi)**

- Backend (API):
  1. Önkoşullar: `dotnet 6 SDK` kurulu olmalı.
  2. Veritabanı ve bağlantı dizelerini ayarlayın: `CarRentalProject/WebApi/appsettings.json` veya `appsettings.Development.json` içinde `ConnectionStrings` bölümünü güncelleyin (varsayılan dosyaları kontrol edin).
  3. Veritabanı scriptini çalıştırın (varsa): `CarRentalProject/databaseSQL.sql` içerisindeki tabloları/seed verilerini hedef veritabanınıza uygulayın.
  4. Projeyi derleyip çalıştırın:

```powershell
dotnet restore
dotnet build
dotnet run --project CarRentalProject/WebApi
```

- Not: Hangfire için depo/konfigürasyon ayarları projede `Hangfire.PostgreSql` paketinin varlığını gösteriyor; Hangfire iş kuyruğu için ayrı bir PostgreSQL konfigürasyonu kullanılıyor olabilir. `appsettings` ve `Extensions` klasörünü kontrol edin.

- Frontend (Expo/React Native):
  1. Önkoşullar: `Node.js` ve `npm` veya `yarn` kurulu olmalı, ayrıca `expo` kullanmak için sistem gereksinimlerini sağlayın.
  2. Frontend klasörüne gidin ve paketleri yükleyin:

```bash
cd CarRental-FE
npm install
# veya: yarn install
```

3. Uygulamayı başlatın:

```bash
npm run start
# veya: expo start
```

4. API adresi/temel URL: Frontend, API çağrılarını `CarRental-FE/constants/api.ts` dosyasında tanımlanmış `baseUrl` vb. üzerinden yapar — geliştirme/test için backend çalışır durumda iken burada gerekli URL ve portu ayarlayın.

**Proje Yapısı (Kısa Özet)**

- `CarRental-FE/` — Mobil uygulama; `app/`, `components/`, `constants/`, `store/` gibi klasörler içerir.
- `CarRentalProject/` — Çözüm dosyası ve katmanlı backend projeleri: `Business/`, `Core/`, `DataAccess/`, `Entities/`, `WebApi/`.

**Öneriler & Notlar**

- Geliştirme ortamında önce backend'i çalıştırıp API uç noktalarının (`Swagger`) çalıştığından emin olun; Swagger genellikle `https://localhost:<port>/swagger` altında bulunur.
- Auth (JWT) yapısı varsa, `appsettings` içinde JWT parametrelerini (Issuer, Key, Audience) doğru ayarlayın.
- Loglama için `Serilog` kullanılmış; konfigürasyon `appsettings` ve/veya kod tarafında yer alır.
- Eğer Hangfire kullanımı aktifse, Hangfire dashboard ve depolama ayarlarını kontrol edin (PostgreSQL bağlantısı olabilir).

**Yardım / Geliştirme İpuçları**

- API tarafında değişiklik yaparken `Business` ve `DataAccess` katmanlarında interface ve DTO uyumluluğuna dikkat edin.
- Frontend tarafında global API değişiklikleri yapıldığında `CarRental-FE/constants/api.ts` ve `store/` içindeki async thunks/servis çağrılarını güncelleyin.

Eğer isterseniz, README'yi daha da genişletebilirim: örnek .env şablonu, sık kullanılan API uç noktalarının listesi, veya adım adım veritabanı kurulum talimatları ekleyebilirim.
