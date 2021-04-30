# Acceleration

## nvm

in settings.txt

```
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

## go

环境变量

```
GO111MODULE="on"
GOPROXY="https://goproxy.io"
```

## Flutter

```cmd
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

## Python

**Command Line**

```cmd
pip3 install -i https://mirrors.aliyun.com/pypi/simple/ xxxx
```

**Linux系统**

```bash
mkdir ~/.pip
cat > ~/.pip/pip.conf << EOF
[global]
trusted-host=mirrors.aliyun.com
index-url=https://mirrors.aliyun.com/pypi/simple/
EOF
```

**Windows系统**

首先在window的文件夹窗口输入 ： %APPDATA%

然后创建pip文件夹

最后创建pip.ini文件，写入如下内容

```ini
[global]
index-url = https://mirrors.aliyun.com/pypi/simple/
[install]
trusted-host=mirrors.aliyun.com
```

## Nodejs

npm config set registry https://registry.npm.taobao.org

## Maven

在maven的settings.xml 文件里配置mirrors的子节点，添加如下mirror

```xml
<mirror>
  <id>nexus-aliyun</id>
  <mirrorOf>*</mirrorOf>
  <name>Nexus aliyun</name
  <url>http://maven.aliyun.com/nexus/content/groups/public</url>
</mirror> 
```

## Rust

http://520code.net/index.php/archives/42/

## Homebrew

https://www.phpdever.com/2019/08/02/homebrew-replace-aliyun

https://blog.csdn.net/msatergz/article/details/93241764

## Docker

https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors

```
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://z0nfaci5.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```