## 用户配置

```
# 配置用户名和邮箱地址
git config --global user.name ""
git config --global user.email ""

# 显示配置
git config --global --list
```



## 在github上创建git库

1. 打开浏览器，访问github.com：https://github.com；
2. 如果没有帐号，可注册一个帐号，用已注册的帐号登录；
3. 创建一个github库(==repository==)。



## 从github克隆库

```
# 打开浏览器，访问github.com：https://github.com
# 找到要克隆的库，拷贝链接
git clone https://github.com/Rockung/mydocs.git mydocs
```



## 基本工作流程

基本工作流程:  add, commit, pull/push

```
echo "Git Quick Start Demo" >> start.txt  # 创建文件
cat start.txt                             # 显示文件内容
git status                                # 查看工作区(working area)状态
git add start.txt                         # 添加文件到暂存区(staging area)
git status
git commit -m "Adding start text file"    # 提交暂存区到本地git库
git status
git push origin master                    # 提交本地库到远程库(remote)
git pull                                  # 从远程库中获取更新
```



## 创建本地库

```
git init fresh-project 
cd fresh-project
ls
ls -al
```



## 常用命令

```
git ls-files
git mv old-file new-file
git rm file-name
git commit -am ""
git add -A
git reset HEAD file                    # unstage
git log --oneline
git log --oneline --graph --decorate
git log --since="3 days ago"
```



## 别名(简化命令的输入)

```
git config --global alias.hist "log --all --graph --decorate --oneline"
```



## 忽略文件或目录

编辑.gitignore文件，可以指定git不用跟踪的文件或目录。参考[github上的模板集](https://github.com/github/gitignore)。



## 比较区间的变化

```
git diff               # 比较工作区和暂存区
git diff HEAD          # 比较工作区和本地库(最后一次提交)
git diff --staged HEAD # 比较暂存区和本地库(最后一次提交)
```



## 比较提交间的变化

```
git diff commit-id-1 commit-id-2
git diff HEAD HEAD^
```



## 比较本地库和远程库的变化

```
git diff master origin/master
```



## Windows下配置编辑器

```
git confit --global core.editor "notepad++.exe -multiInst -nosession"
git config --global -e
```



---

## 代理设置

```
# http
git config --global http.proxy http://127.0.0.1:1080
git config --global https.proxy https://127.0.0.1:1080

# socks5
git config --global http.proxy 'socks5://127.0.0.1:1080' 
git config --global https.proxy 'socks5://127.0.0.1:1080'

# 取消
git config --global --unset http.proxy
git config --global --unset https.proxy
```

