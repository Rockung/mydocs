# OpenJDK

## 1. 安装open-jdk

```cmd
yum install java
yum install java-devel
```

## 2. 配置环境

```bash
# 编辑/etc/profile 或者 ~/.bashrc
# source /etc/profile 或者 ~/.bashrc，使其生效

export JAVA_HOME=/etc/alternatives/java_sdk_openjdk
export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar 
export PATH=$PATH:$JAVA_HOME/bin
```

