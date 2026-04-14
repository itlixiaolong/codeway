# Nginx 使用

## Nginx 默认配置

```nginx
user  nobody;
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;

        location / {
            root   html;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

## 常用命令

```bash
nginx                      # 启动
nginx -s stop              # 快速停止
nginx -s quit              # 优雅停止
nginx -s reload            # 重载配置
nginx -t                  # 测试配置
nginx -v                  # 查看版本
```

## 常用配置

### 反向代理

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 负载均衡

```nginx
upstream backend {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
}

server {
    listen 80;
    location / {
        proxy_pass http://backend;
    }
}
```

### SSL 配置

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate     cert.pem;
    ssl_certificate_key cert.key;

    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;

    location / {
        root   html;
        index  index.html;
    }
}
```

### Vue/React SPA 路由

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### gzip 压缩

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;
```
