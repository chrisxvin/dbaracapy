# 概述

基于 fastify 的 web server.
支持多个数据库连接，支持按数据库配置的连接池。
在 http header 中使用自定义的 `DB-GUID` header 决定用哪个数据库。

# API

使用 restful api。
接受 sql 语句和参数，执行查询并返回结果。
接受 crud 操作。

# 数据库

通过 API 接受数据库配置并保存到 config.js。每个配置都有一个GUID，与 http header 传来的做匹配。
连接池使用懒加载，第一次连接时才创建对应的连接池。
