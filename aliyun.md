# 阿里云服务器配置

## 升级apt

阿里云服务器初始化后apt-get安装软件时找不到源，需要执行

```bash
$ apt-get update
```



## 代理服务器

```bash
$ sudo apt-get install shadowsocks
$ sudo ssserver -p 9191 -k password -m rc4-md5 -d start
```

在服务器控制台**安全组**里，开放对应端口。

下载shadowsocks客户端软件，配置代理

配置浏览器，使用本地代理



## 使用VS code进行远程开发

### 配置免密远程登录(Win10 Client)

#### [通过PowerShell安装OpenSSH](https://docs.microsoft.com/zh-cn/windows-server/administration/openssh/openssh_install_firstuse)

以管理员身份启动PowerShell

```
Get-WindowsCapability -Online | ? Name -like 'OpenSSH*'

# This should return the following output:

Name  : OpenSSH.Client~~~~0.0.1.0
State : NotPresent
Name  : OpenSSH.Server~~~~0.0.1.0
State : NotPresent
```

安装客户端

```
# Install the OpenSSH Client
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0

# Both of these should return the following output:

Path          :
Online        : True
RestartNeeded : False
```

#### [生成秘钥对，并上传](https://code.visualstudio.com/docs/remote/troubleshooting#_installing-a-supported-ssh-client)

生成秘钥对

```
ssh-keygen -t rsa -b 4096
```

上传公钥

```
$USER_AT_HOST="your-user-name-on-host@hostname"
$PUBKEYPATH="$HOME\.ssh\id_rsa.pub"

$pubKey=(Get-Content "$PUBKEYPATH" | Out-String); ssh "$USER_AT_HOST" "mkdir -p ~/.ssh && chmod 700 ~/.ssh && echo '${pubKey}' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

### 安装配置VS code远程开发插件

在VS code中，使用`ctrl+shift+x`打开插件搜索窗口，输入`Remote Development`

使用`ctrl+shift+p`打开命令输入窗口，输入`Remote-SSH:Connect to Host`，第一次选择`Add New SSH Host`进行配置，文件保存到`.ssh/config`下，格式为：

```
Host alias
  HostName host_id
  User user_name
  Port 22
  ForwardAgent yes
```



## 公网访问Nodejs项目

**勿在localhost上启动应用**

```sh
cross-env NODE_ENV=production webpack-dev-server --open --host 0.0.0.0 --config demo/webpack.config.js
```

测试连通性的步骤

```shell
telnet 127.0.0.1 8080
telnet 172.20.121.143 8080
telnet public_ip 8080(本地)
telnet public_ip 8080(外网)
```