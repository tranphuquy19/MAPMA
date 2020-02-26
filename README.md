# Make Android phone more Awesome MAPMA 
- Bài viết gồm 2 phần, phần 1 hướng dẫn cách setup một Webserver trên android phone, phần 2 là hướng dẫn cách public Webserver lên Internet. Mọi copy xin để nguồn tranphuquy19 email:tranphuquy19@gmail.com
https://github.com/tranphuquy19/MAPMA.git (link git của mình ở đây nhé)

I. [Phần một -  Setup Android phone](#)
  1. [Chuẩn bị](#i-phần-1)
  2. [Cài ứng dụng Termux trên Android](#2-cài-ứng-dụng-termux-trên-android)
  3. [Setup Authen cho SSH](#3-setup-authen-cho-ssh)
     -  [Install Open SSH](#install-open-ssh)
     -  [Setup SSH](#setup-ssh)
  4. [Connect SSH đến Android phone](#4-connect-ssh-đến-android-phone)
  5. [Setup môi trường trên Android phone](#5-setup-môi-trường-trên-android-phone)
  6. [Deploy](#6-deploy)
  7. [Enjoy!!!](#7-enjoy)

II. [Phần hai - Public your website](#ii-phần-hai)
  1. [Kỹ thuật tunneling](#1-kỹ-thuật-tunneling)
     -  [ngrok](#ngrok)
     -  [localtunnel](#localtunnel)
  2. [NAT port - Port Forwarding](#)
     -  [Set ip tĩnh - DHCP Static Client](#)
     -  [Port Forwading](#)
     -  [Get public IP](#)
     -  [DDNS - Dynamic Domain Name System](#)
     -  [Orther DNS Services](#)
---

# I. Phần 1

## 1. Chuẩn bị

1. Android phone (đã rooted hoặc chưa cũng được)
2. Laptop/PC 
3. Cả 2 thiết bị trên cùng kết nối chung mạng wifi
4. Và một chút kiến thức về Linux, git

Note: Trong bài viết mình deploy web server chạy NodeJS, đối với nền tảng các bạn chỉ cần setup trên android tới bước 5 là đủ

## 2. Cài ứng dụng Termux trên Android 

- [link Termux](https://play.google.com/store/apps/details?id=com.termux&hl=vi)
- Giới thiệu sơ qua về Termux app, thì đây là ứng dụng tương tự như Terminal trên linux, nhưng cái hay là chúng hỗ trợ môi trường Linux thông qua trình quản lí packages đi kèm. Các bạn có thể tham khảo về termux trên Github (open-source). 
- Xem thêm:
   - [Các Packages Termux hỗ trợ](https://github.com/termux/termux-packages/tree/master/packages)
   - [Termux khác với các distro Linux khác như thế nào](https://wiki.termux.com/wiki/Differences_from_Linux)
- Trong bài này mình thực hiện test trên con xiaomi redmi note 4 (mido / rooted), chưa root vẫn được nhé, nhưng cực cái là các bạn ko duyệt file trên đt được. Còn source code thì được dev trên laptop chạy ubuntu và deploy thông qua github. Let's go

**Note**: Termux hiện tại chỉ hoạt động với android 5 trở lên! Từ ngày 1.1.2020 sẽ ko hỗ trợ cho android 5 và 6, các phiên bản cũ hơn của Termux vẫn làm việc tốt, [tải tại đây](https://archive.org/download/termux-repositories-legacy)


## 3. Setup Authen cho SSH

### Install Open SSH
- Đầu tiên chúng ta phải setup ssh cho nó cái đã. Chạy lệnh sau 

```shell
apt update && apt upgrade -y 
apt install openssh
```
### Setup SSH

- Đầu tiên chúng ta phải coi user hiện tại là gì đã. Có 3 cách là

1. ```$ pwd ``` 		print working directory
2. ```$ echo $HOME ``` 	In biến HOME ra 
3. ```$ whoami ``` 		WHO AM I?

=> username của mình là u0_a173

- 1. Set password cho account. Như linux thôi 

```$ passwd <username>```	Ví dụ: ```$ passwd u0_a173``` Nhập pass 2 lần nhá.
```$ sshd``` để start ssh server 


## 4. Connect SSH đến Android phone

- Test thử xem sao? Mở terminal trên Ubuntu lên, trên windows có thể sử dụng powershell nha!

```$ ssh -p 8022 u0_a173@192.168.1.102```

- Giải thích chút xíu về command trên, `-p 8022` là port ssh trên Android phone, nghe hơi sai sai, thông thường thì ssh start ở port 21/22, nhưng trên Android phone thì Termux map nó ở port 8022, `u0_a173` là username lúc nãy, ```192.168.1.102``` là ip trong mạng LAN (wifi), muốn biết thì vào settings >> WIFI bấm vào wifi đang connecting thì lấy được, hoặc vào trang setup của Router wifi >> DHCP Lease Information là ra.

- Từ lúc này mình setup ko cần động đến đt nữa, mọi thao tác sẽ qua ssh trên Ubuntu terminal cho tiện, sau bài này mình sẽ hướng dẫn connect đến android phone thông qua Internet/3G.4G đều được, public server web...

## 5. Setup môi trường trên Android phone

- Update lần nữa Android phone
```$ apt update && apt upgrade```

- Một số hướng dẫn thao tác với Termux

Working with packages:

 * Search packages:   pkg search [query]
 * Install a package: pkg install [packages]
 * Upgrade packages:  pkg upgrade

- Trong bài này mình sẽ setup node js với express framework 

```$ apt install nodejs```

- Kiểm tra version hiện tại của Node và NPM

```$ node -v && npm -v```

- Tạo 1 trang test với express trên laptop nha, sau đó deploy qua github.

Note: trong bài viết này mình coi như là bạn đã thông thạo Git & Github mình ko giải thích gì thêm!

Thao tác tại PC ko phải với Android phone qua ssh

```shell
$ sudo apt-get update && sudo apt-get upgrade -y
$ sudo apt-get install nodejs
$ npm install express
$ npm install express-generator
$ express --ejs MAPMA
$ cd MAPMA
$ git init
$ git add .
$ git commit -m "first commit"
$ git remote add origin https://github.com/<username>/<your-repo>.git
$ git push -u origin master
```
- Các commands bên trên là toàn bộ thiết lập mới cho Ubuntu dành cho bạn nào chưa biết 

- Setup git cho Android phone

```$ apt install git```



## 5. Deploy

- Clone repo phía trên từ github về
```shell
$ git clone https://github.com/<username>/<your-repo>.git
$ cd <your-repo>
$ npm install 
$ npm start
```
- Hoặc bạn có thể clone Project demo của mình
```shell
$ git clone https://github.com/tranphuquy19/MAPMA.git
$ cd MAPMA
$ npm install 
$ npm start
```

Note: Các bạn có thể setup Express chạy ngầm (deamon) thông qua ForeverJS hoặc PM2. Cú pháp
1. Forever JS

- Install
```shell
$ npm install -g forever
```

- Start 
```shell
$ forever start ./bin/www
```

- Stop
```shell
$ forever stopall
```

2. PM2 

- Install
```shell
$ npm install -g pm2 
```

- Start
```shell
$ pm2 start ./bin/www
```

- Stop
```shell
$ pm2 stop all
```

## 7. Enjoy!!!
![demo](/public/images/img5.png?raw=true "Trang demo trên điện thoại sẽ như thế này")

![demo](/public/images/img2.png?raw=true "Optional Title")

![demo](/public/images/img3.png?raw=true "Optional Title")


# II. Phần hai

Trong phần này mình sẽ nói rất nhiều về việc *làm thế nào để đưa localhost lên Internet*. Deploy thành quả của mình để chạy một cách ngon lành trên mạng. 


## 1. Kỹ thuật tunneling

- Về bản chất, đây là quá trình đặt toàn bộ gói tin vào trong một lớp header (tiêu đề) chứa thông tin định tuyến có thể truyền qua hệ thống mạng trung gian theo những "đường ống" riêng (tunnel).
- Khi gói tin được truyền đến đích, chúng được tách lớp header và chuyển đến các máy trạm cuối cùng cần nhận dữ liệu. Để thiết lập kết nối Tunnel, máy khách và máy chủ phải sử dụng chung một giao thức (tunnel protocol).
- Để dễ hình dung hơn thì đây giống như bọc 1 lá thư trong 1 lá thư khác, thay vì gửi cho **anh ABC** nào đấy thì mình sẽ gửi cho **anh đưa thư** với *địa chỉ anh đưa thư* ghi trên **bì thư ngoài**. Sau đó **anh đưa thư** nhận được, bóc và gửi đến *địa chỉ của anh ABC* đã ghi ở **lá thư bên trong***...
- Điển hình cho việc sử dụng giao thức này đó chính là mạng riêng ảo VPN (Virtual Private Network) [Wikipedia](https://vi.wikipedia.org/wiki/M%E1%BA%A1ng_ri%C3%AAng_%E1%BA%A3o). Đừng nhầm lẫn giữa **VPN** và **Tunneling** nha, vì **Tunneling** là một giao thức (protocol) còn **VPN** là 1 khái niệm (concept).

![vpn.vs.tunneling](/public/images/img4.gif?raw=true "Optional Title")

Sau đây là một số ưu điểm và nhược của Tunneling Protocol

**Ưu**

* Có thể triển khai ở hạ tầng mạng phức tạp
* Bảo mật tốt trong môi trường mạng không an toàn
* Có thể truy cập mọi lúc mọi nơi khi nó kết nối mạng
* Triển khai nhanh không cần cấu hình phức tạp
* Thích hợp cho testing

**Nhược**

* Không duy trì kết nối được lâu dài vì một số yếu tố khách quan
* Độ trễ cao
* Băng thông phụ thuộc nhiều vào server ngoài
* Gây khó khăn cho việc [SEO](https://vi.wikipedia.org/wiki/T%E1%BB%91i_%C6%B0u_h%C3%B3a_c%C3%B4ng_c%E1%BB%A5_t%C3%ACm_ki%E1%BA%BFm)

==> Chỉ thích hợp cho demo & test nhanh các chức năng, hoàn toàn không thíc hợp cho môi trường `PRODUCT`

### Ngrok

- Đây là 1 trong 2 tools mình sẽ giới thiệu trong bài viết này

#### Install & Using

```shell
$ sudo npm install ngrok -g
$ ngrok http 3000
```
Ngrok sẽ lắng nghe ở địa chỉ `http://localhost:3000`; **3000** chính là port của Webserver chúng ta đang start. Bây giờ hãy copy link của ngrok trong terminal rồi share cho mn thôi

### Localtunnel

#### Install & Using

```shell
$ sudo npm install localtunnel -g
$ lt -p 3000 -h http://localtunnel.me --local-https false
```

- Về cách thức hoạt động thì nó y chang như **ngrok** như đã giới thiệu ở trên. Tuy nhiên thì mình hay dùng **localtunnel** hơn vì nó đơn giản cũng như thời gian duy trì kết nối lâu hơn **ngrok**.
