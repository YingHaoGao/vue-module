# 分类查询组件

##  props

```
categorySearchData: [
    {
        menuList:[
            searchField:JSON字符,   //传入接口的查询条件
            name:String             //显示在页面上查询条件的名称
        ],
        name:String  //每一行查询条件的标题
    }
]

注：searchField的参数：（顺序不能变）
        "{"categoryId":2}" --分类
        "{"videoLocality":26}" --地区
        "{"videoType":12}" --类型
        "{"yearStr":2018}" --年份
        "{"chargeTypeStr":"3"}" --资费
        "{"keywords":4}" --关键词

示例：
[
    {
        menuList: [
            {
                searchField: "{"categoryId":2}", 
                name: "电影"
            },
            {
                searchField: "{"categoryId":3}", 
                name: "电视剧"
            }
        ],
        name: "分类"
    },
    {
         menuList: [
            {
                searchField: "{"videoLocality":26}", 
                name: "英国"
            },
            {
                searchField: "{"videoLocality":5}", 
                name: "美国"
            }
        ],
        name: "地区"
    }
    ...
]

```

## emit

### categorySearchItemClick

* 点击每一个查询条件的回调

* 参数：queryParams--Array

```
示例：
queryParams: [
    "{"categoryId":3}",
    "{"videoLocality":27}",
    "{"videoType":25}",
    "{"yearStr":2017}",
    "{"chargeTypeStr":"!3"}",
    "{"keywords":5}",
]

queryParams: [
    {},
    "{"videoLocality":27}",
    "{"videoType":25}",
    "{"yearStr":2017}",
    {},
    "{"keywords":5}",
]
```
