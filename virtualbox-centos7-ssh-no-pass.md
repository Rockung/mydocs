# 配置ssh免密登录



## 安装ssh客户端

```bash
yum install ssh
```



## 配置localhost免密



```bash
# 在~/.ssh目录下生成公私钥对
ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa

# 把公钥追加到免密配置文件尾部
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys

chmod 0600 ~/.ssh/authorized_keys
```



## 使用ssh-copy-id工具



ssh-copy-id将本机的公钥复制到远程主机的authorized_keys文件上。假设有三台主机：node0、node1、node2

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub root@node0 
ssh-copy-id -i ~/.ssh/id_rsa.pub root@node1 
ssh-copy-id -i ~/.ssh/id_rsa.pub root@node2
```

如果不是root用户，假如说用户名是hadoop，且端口号为22001，那么只要稍微修改一下语句就可以了：

```bash
ssh-copy-id -i $HOME/.ssh/id_rsa.pub -p 22001 hadoop@node0
ssh-copy-id -i $HOME/.ssh/id_rsa.pub -p 22001 hadoop@node1
ssh-copy-id -i $HOME/.ssh/id_rsa.pub -p 22001 hadoop@node2
```

