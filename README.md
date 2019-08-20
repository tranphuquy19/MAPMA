# Make Android phone more Awesome MAPMA 

https://github.com/tranphuquy19/MAPMA.git (link git của mình ở đây nhé)

I. [Phần một -  Setup Android phone](#)
  1. [Chuẩn bị](#user-content-chuẩn-bị)
  2. [Cài ứng dụng Termux trên Android](#user-content-cài-ứng-dụng-termux-trên-android)
  3. [Setup Authen cho SSH](#user-content-setup-authen-cho-ssh)
     - [Install Open SSH](#user-content-install-open-ssh)
     - [Setup SSH](#user-content-setup-ssh)
  4. [Connect SSH đến Android phone](#user-content-connect-ssh-đến-android-phone)
  5. [Setup môi trường trên Android phone](#user-content-setup-môi-trường-trên-android-phone)
  6. [Deploy](#user-content-deploy)
  7. [Enjoy!!!](#user-content-enjoy)
---

- Xin chào tất cả các bạn, hôm nay mình sẽ hướng dẫn các bạn cách setup Android phone chạy như 1 hosting hay vps server cho các ứng dụng web (node, java, ruby, python, vv...). Xa hơn nữa các bạn có thể setup mql sql-lite, ngnix, apache2 bla bla

## Chuẩn bị

1. Android phone (đã rooted hoặc chưa cũng được)
2. Laptop/PC 
3. Cả 2 thiết bị trên cùng kết nối chung mạng wifi
4. Và một chút kiến thức về Linux 

## Cài ứng dụng Termux trên Android 

- [link Termux](https://play.google.com/store/apps/details?id=com.termux&hl=vi)
- Giới thiệu sơ qua về Termux app, thì đây là ứng dụng tương tự như Terminal chúng ta hay dùng trên Ubuntu hay các distro Linux khác vậy, nhưng cái hay là chúng hỗ trợ môi trường Linux thông qua trình package đi kèm. Các bạn có thể tham khảo về termux trên Github (open-source mà).
- Trong bài này mình thực hiện test trên con xiaomi redmi note 4 (mido / rooted), chưa root vẫn được nhé, nhưng cực cái là các bạn ko duyệt file trên đt được. Ok let's go


## Setup Authen cho SSH

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

username của mình là u0_a173

- 1. Set password cho account. Như linux thôi 

```$ passwd <username>```	Ví dụ: ```$ passwd u0_a173``` Nhập pass 2 lần nhá.
```$ sshd``` để start ssh server 


## Connect SSH đến Android phone

- Test thử xem sao? Mở terminal trên Ubuntu lên, trên windows có thể sử dụng powershell nha!

```$ ssh -p 8022 u0_a173@192.168.1.102```

- Giải thích chút xíu về command trên, `-p 8022` là port ssh trên Android phone, nghe hơi sai sai, thông thường thì ssh start ở port 21/22, nhưng trên Android phone thì Termux map nó ở port 8022, `u0_a173` là username lúc nãy, ```192.168.1.102``` là ip trong mạng LAN (wifi), muốn biết thì vào settings >> WIFI bấm vào wifi đang connecting thì lấy được, hoặc vào trang setup của Router wifi >> DHCP là ra.

- Từ lúc này mình setup ko cần động đến đt nữa, mọi thao tác sẽ qua ssh trên Ubuntu terminal cho tiện, sau bài này mình sẽ hướng dẫn connect đến android phone thông qua Internet/3G.4G đều được, public server web...



## Setup môi trường trên Android phone

- Update lần nữa Android phone
```$ apt update && apt upgrade```

- Một số hướng dẫn thao tác với Termux

Working with packages:

 * Search packages:   pkg search <query>
 * Install a package: pkg install <package>
 * Upgrade packages:  pkg upgrade

- Trong bài này mình sẽ setup node js với express framework 

```$ apt install nodejs```

- Kiểm tra version hiện tại của Node và NPM

```$ node -v && npm -v```

- Tạo 1 trang web với express nha, tạo trên Ubuntu sau đó deploy qua github 

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



## Deploy

- Clone repo từ github về
```shell
$ git clone https://github.com/<username>/<your-repo>.git
$ cd <your-repo>
$ npm install 
$ npm start
```
Note: Các bạn có thể setup Express chạy ngầm (deamon) thông qua ForeverJS hoặc PM2. Cú pháp
1. Forever JS

- Start 
```shell
$ npm install -g forever 
$ forever start ./bin/www
```

- Stop
```shell
$ forever stopall
```

2. PM2 
```shell
$ npm install -g pm2 
$ pm2 start ./bin/www
```



## Enjoy!!!
![demo](https://snag.gy/snT4yg.jpg)

![demo](https://snag.gy/HFVz3e.jpg)

![demo](https://snag.gy/d0IjNb.jpg)


