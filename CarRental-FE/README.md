# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

{
// expo

    // Frontend kismi

    // Kullanici -> kayit olup , login yapacak, Token'i local'da saklanip silinecek
    // User -> 3 rol'e sahip olacak -> Admin , User , Customer Manager.
    // Admin tüm sayfalara yetkisi olup her işlemi yapabilecek.
    // User yani Worker , sadece ServiceRecord açma vb işlemleri yapabilecek
    // Customer Manager , sadece Customer yani müşteri açma vb işlemleri yapacak.
    // Customer giriş yapmadan kendi bilgilerini görüntüleyebilecek.
    // Customer tablosu -> görüntüleme Unauthorized
    // Customer tablosu -> Ekleme , silme , update -> CustomerManager
    // User,UserClaimOP,ClaimOP tablosu -> Sadece Admin
    // ServiceRecord , Vehicle -> Worker

    // Customer girişi -> Bu da bizi araç , kayıt vb alanlara sadece kendi servis'ini, kendi aracını görüntüleme -> View kullanarak
    // User girişi -> Kullanıcı kayıt etme (admin) , servise araç ekleme (customerM), kayıt açma (Worker) , Servis kayıtlarını , araçları görüntüleme

Tamamlananacaklar :
-Dosya yolu düzenlenecek ??,
-Araç,Kullanıcı vb. silme düzeltilecek ++
-Hot toast ile geri bildirim , hatalar handle edilecek. ++
-API'ler bağlanacak , ++
-Auth entegre edilecek, ++
-Logic yazılacak

- Tüm API ler bağlanacak sonra da AUTH üzerinde geliştirme yapılack
- Auth girişde ve sonralarında refresh token ile istek atsın yeni token alıp giriş yapmış olsun accessToken bitmiş olabilir ++
- bunun dışında token ++

-- Userdeki API bağlantılarını diğer yerler için yap. ++
-- serviceRecord ve vehicle api bağlanacak. ++
-- RoleClaim tablosu eklenecek. ++
-- Silerken uyarı verecek ona göre silinmesi istenecek. ++

-- Role bazlı erişim verilecek. ++
-- ID yerine liste üzerinden seçme ++

-- State durumunu seçerek ekleme ++
-- Silme durumlarında hatalar olabiliyor, örnek customer silerken , vehicle hatası. ++
-- API güncellendiğinde useEffect ile tetikle , veriler yenilensin ++

}
