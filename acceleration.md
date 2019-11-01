# Acceleration

## Python

pip3 install -i https://mirrors.aliyun.com/pypi/simple/ xxxx

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