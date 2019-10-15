## 用户配置

```
# 配置用户名和邮箱地址
git config --global user.name ""
git config --global user.email ""

# 在仓库里配置
git config --local user.name ""
git config --local user.email ""

# 显示配置
git config --global --list
git config --local --list
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
# 把已有的项目纳入Git管理
cd old-project
git init

# 创建新的本地仓库
git init fresh-project 
cd fresh-project
ls
ls -al
```

## 备份本地库到远程库

```
git remote add origin https://github.com/xxx/xxx.git
git push -u origin master
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



## 变更提交信息

```
# 修改最近一次提交的信息
git commit --amend

# 修改以前的提交信息
git rebase -i commit-id-before
  * commit-id-before: 要修改提交的上一个提交
  * -i: 交互式。修改pick->reword
  
# 合并以前的提交信息
git rebase -i commit-id-before
  * commit-id-before: 要合并提交的上一个提交
  * -i: 交互式。修改pick->squash
```



## 分支操作

```
# 查看分支
git branch -av

# 创建分支
git branch new-branch-name

# 切换分支
git checkout branch-name

# 创建并切换分支
git checkout -b new-branch-name

# 删除分支
git branch -d branch-name
```



## 比较区间的变化

```
git diff               # 比较工作区和暂存区
git diff -- filename   # 比较工作区和暂存区的单个文件
git diff HEAD          # 比较工作区和本地库(最后一次提交)
git diff --staged HEAD # 比较暂存区和本地库(最后一次提交)
git diff --cache       # 比较暂存区和本地库(最后一次提交)
```



## 比较提交间的变化

```
git diff commit-id-1 commit-id-2
git diff HEAD HEAD^
git diff branch-1 branch-2
```



## 比较本地库和远程库的变化

```
git diff master origin/master
```

## 恢复文件和存储区

```
# 从本地库恢复到暂存区
git reset HEAD             # 
git diff --cached          # 恢复之后，此命令没有更过提示
git reset HEAD -- filename # 恢复部分文件

# 从本地库恢复到暂存区和工作区
git reset --hard HEAD

# 从暂存区恢复到工作区
git checkout -- filename

# 彻底丢弃某个提交和之后的所有提交
git reset --hard commit-id
```

## 临时工作的切换

```
# 准备处理临时工作，保存现有工作
git stash
git stash list

# 临时工作后，回来
git stash list
git stash apply/pop
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

