# funder component 组件库test11

[官方文档](https://element.eleme.cn/#/zh-CN/component/icon)

本 组件库 是基于 Vue 2 和 element-ui 实现的。

## 你能学到什么

1. 单元测试、覆盖率、持续集成等工程概念
2. 重构、TDD/BDD、设计模式、单向数据流等技术概念
2. Vue 的几乎所有功能，并且是深入理解这些功能，而不是肤浅理解

## 有哪些轮子

* test组件
* 其他：路由、状态管理（代码未完成）

注意：这只是目前的计划，具体要完成的轮子可能与上面有出入。

## 项目特点 （暂时没有做单元测试）

1. 使用 Travis CI 进行持续集成
2. 有丰富的单元测试，项目完成时，期望测试覆盖率超过 90%
3. 自说明的代码，即使没有注释，你也能看懂
4. 初期我使用 parcel 构建方便新人上手，后期改为 Vue Cli 3 以实现更多功能

## 源码学习

1. 安装依赖
    ```
    npm install
    ```

2. 启动 dev server
    ```
    npm serve
    ```


Command line instructions

Git global setup

git config --global user.name "zhangbiaobin"

git config --global user.email "zhangbiaobin@purvar.com"

Create a new repository

git clone http://gitlab.example.com/ssm/purvar-component.git

cd purvar-component

touch README.md

git add README.md

git commit -m "add README"

git push -u origin master

Existing folder

cd existing_folder

git init

git remote add origin http://112.25.224.6:9999/ssm/purvar-component.git

git remote add origin http://112.25.224.6:9999/yhkg/ei/ei-view.git

git add .

git commit -m "Initial commit"

git push -u origin master

Existing Git repository

cd existing_repo

git remote rename origin old-origin

git remote add origin http://gitlab.example.com/ssm/purvar-component.git

git push -u origin --all

git push -u origin --tags