# Elasticsearch 7.0 on Kibana

## 索引操作

### 创建索引

```RESTFUL
# 按给定配置创建索引
PUT /lib/
{
  "settings": {
    "index": {
      "number_of_shards": 3,
      "number_of_replicas": 0
    }
  }
}

# 按缺省配置创建索引
PUT lib2
```

### 获取索引信息

```RESTFUL
# 获取指定索引信息
GET /lib/_settings
GET /lib2/_settings

# 获取所有索引信息
GET _all/_settings
```

### 删除索引

```
DELETE /lib2
```



## 文档操作



### 创建文档

格式： /{index}/\_doc/{id}, /{index}/\_doc, or /{index}/\_create/{id}

```
# 指定文档ID
PUT /lib/_doc/1
{
  "first_name": "Jane",
  "last_name":  "Smith",
  "age":        32,
  "about":      "I like to collect rock albums",
  "interests":  ["music"]
}

# 不指定文档ID，自动创建
POST /lib/_doc
{
  "first_name": "Douglas",
  "last_name":  "Fir",
  "age":        23,
  "about":      "I like to build cabinets",
  "interests":  ["forestry"]
}
```

### 查看文档内容

格式：/{index}/\_doc/{id}

```
GET /lib/_doc/1
```

### 查看文档指定字段的内容

```
GET /lib/_doc/1?_source=age,about
```

### 更新文档

```
POST /lib/_update/1
{
  "doc": {
    "age": 33
  }
}
```

### 删除文档

```
DELETE /lib/_doc/1
```

