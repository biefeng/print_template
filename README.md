# print_template

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


### work plan 2019-7-4 
#### 1.EPSON需要区分针式打印机和热敏打印机。
    方案：思考代码结构的设计，更易扩展
#### 2.对于EPSON，需要区分页模式以及标准模式，页模式可以完成大部分模板的打印功能，但对于打印列表数据（如清单），则在标准模式下更易完成
    方案：标准模式下，需要支持的功能有：水平拖拽（根据水平定位完成），水平对齐方式，文本格式修改，条码格式修改
#### 3.页面如何加载模板以实现预览功能以及对已有模板的再修改功能
    方案：数据库需要保存模板的html以完成加载
#### 4.页面设计
    方案：各个元素的属性含义给出提示，
      4.1如条码的字体位置
      4.2针式与非针式区别
      4.3标注模式与页模式区别
