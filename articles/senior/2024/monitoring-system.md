---
title: 前端监控体系：报错率从 0.8% → 0.1%
date: 2024-02-10
tags:
  - 监控
  - 工程化
  - 稳定性
categories:
  - 工程化与架构
author: 李小龙
description: 从零构建前端监控体系的完整实践，包含错误监控、性能监控、用户行为分析等核心模块，实现报错率大幅下降
---

# 前端监控体系：报错率从 0.8% → 0.1%

> 前端监控是保障应用稳定性的重要手段。本文记录了我从零搭建前端监控体系的完整过程，以及最终实现的效果。

## 一、监控体系建设目标

```
┌─────────────────────────────────────────────────────────────────┐
│                      监控体系建设目标                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐     │
│   │   错误监控   │───▶│  性能监控    │───▶│  行为分析   │     │
│   │              │    │              │    │              │     │
│   │ 报错率 0.8%→0.1%│    │ LCP < 2.5s   │    │ 用户路径追踪 │     │
│   │ 及时告警      │    │ FID < 100ms  │    │ 漏斗转化     │     │
│   └──────────────┘    └──────────────┘    └──────────────┘     │
│                                                                  │
│                          │                                       │
│                          ▼                                       │
│   ┌──────────────────────────────────────────────────────┐     │
│   │                    数据可视化                         │     │
│   │  Dashboard │ 趋势图 │ 报表 │ 告警                     │     │
│   └──────────────────────────────────────────────────────┘     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 二、整体架构设计

### 2.1 系统架构

```typescript
// 监控体系架构
interface MonitoringSystem {
  // 数据采集层
  collectors: {
    jsErrors: ErrorCollector;      // JS 错误
    promiseErrors: PromiseErrorCollector;  // Promise 错误
    resourceErrors: ResourceErrorCollector; // 资源加载错误
    performance: PerformanceCollector; // 性能数据
    userActions: UserActionCollector;   // 用户行为
  };

  // 数据处理层
  processors: {
    dataCleaner: DataCleaner;       // 数据清洗
    aggregator: DataAggregator;     // 数据聚合
    sampler: Sampler;               // 采样处理
  };

  // 数据存储层
  storage: {
    localCache: LocalCache;         // 本地缓存
    remoteReport: RemoteReport;     // 远程上报
  };

  // 数据展示层
  visualization: {
    dashboard: Dashboard;           // 仪表盘
    alerts: AlertSystem;            // 告警系统
    reports: ReportSystem;          // 报表系统
  };
}
```

### 2.2 技术选型

| 模块 | 技术方案 | 原因 |
|-----|---------|-----|
| 数据采集 | Performance API + Error Event | 浏览器原生 API |
| 数据上报 | sendBeacon + fetch | 异步非阻塞上报 |
| 数据存储 | ClickHouse / Elasticsearch | 高写入性能 |
| 数据可视化 | Grafana / 自建 Dashboard | 灵活定制 |
| 告警通知 | 钉钉 / 企业微信 / 飞书 | 及时触达 |

## 三、错误监控实现

### 3.1 JS 错误采集

```typescript
// src/monitor/error.ts

interface ErrorInfo {
  // 错误类型
  type: 'js_error' | 'promise_error' | 'resource_error' | 'custom_error';

  // 错误信息
  message: string;
  stack?: string;

  // 错误位置
  filename?: string;
  lineno?: number;
  colno?: number;

  // 上下文
  context: {
    url: string;           // 当前页面 URL
    userAgent: string;     // 浏览器信息
    timestamp: number;      // 发生时间
    userId?: string;       // 用户 ID
    sessionId: string;     // 会话 ID
    breadcrumb: Breadcrumb[]; // 用户行为轨迹
  };
}

class ErrorCollector {
  private queue: ErrorInfo[] = [];
  private maxQueueSize = 100;

  constructor() {
    this.initGlobalError();
  }

  private initGlobalError() {
    // 监听 JavaScript 错误
    window.addEventListener('error', (event) => {
      this.collect({
        type: 'js_error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        context: this.getContext()
      });
    });

    // 监听未处理的 Promise 错误
    window.addEventListener('unhandledrejection', (event) => {
      this.collect({
        type: 'promise_error',
        message: event.reason?.message || String(event.reason),
        stack: event.reason?.stack,
        context: this.getContext()
      });
    });

    // 监听资源加载错误
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        this.collect({
          type: 'resource_error',
          message: `资源加载失败: ${(event.target as HTMLElement).src || (event.target as HTMLElement).href}`,
          context: this.getContext()
        });
      }
    }, true);
  }

  private collect(errorInfo: ErrorInfo) {
    // 过滤不需要上报的错误
    if (this.shouldIgnore(errorInfo)) {
      return;
    }

    // 添加到队列
    this.queue.push(errorInfo);

    // 达到阈值上报
    if (this.queue.length >= this.maxQueueSize) {
      this.flush();
    }

    // 开发环境打印
    if (process.env.NODE_ENV === 'development') {
      console.error('[Monitor]', errorInfo);
    }
  }

  private shouldIgnore(info: ErrorInfo): boolean {
    // 忽略跨域错误（只有 Safari 会显示具体信息）
    if (info.message?.includes('Script error.')) {
      return true;
    }

    // 忽略特定错误
    const ignorePatterns = [
      /favicon\.ico/,
      /ResizeObserver/,
      /passive event listener/
    ];

    return ignorePatterns.some(pattern => pattern.test(info.message));
  }

  private getContext(): ErrorInfo['context'] {
    return {
      url: location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
      sessionId: this.getSessionId(),
      userId: this.getUserId(),
      breadcrumb: this.getBreadcrumb()
    };
  }

  flush() {
    if (this.queue.length === 0) return;

    const errors = [...this.queue];
    this.queue = [];

    // 异步上报，不阻塞主线程
    this.report(errors);
  }

  private async report(errors: ErrorInfo[]) {
    try {
      const payload = JSON.stringify({
        type: 'error',
        data: errors,
        appId: APP_ID,
        appVersion: APP_VERSION,
        environment: ENV
      });

      // 使用 sendBeacon 优先，失败则用 fetch
      if (navigator.sendBeacon) {
        const sent = navigator.sendBeacon(API_ENDPOINT, payload);
        if (!sent) {
          await this.fetchReport(payload);
        }
      } else {
        await this.fetchReport(payload);
      }
    } catch (error) {
      console.error('[Monitor] Report failed:', error);
    }
  }
}
```

### 3.2 React 错误边界

```tsx
// src/components/ErrorBoundary.tsx
import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 上报错误
    this.props.onError?.(error, errorInfo);

    // 可选：重置状态
    // setTimeout(() => this.setState({ hasError: false }), 5000);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <details>
            <summary>Error Details</summary>
            <pre>{this.state.error?.toString()}</pre>
          </details>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// 使用示例
<ErrorBoundary
  fallback={<div>加载失败</div>}
  onError={(error, info) => {
    // 上报到监控系统
    monitor.error.collect({ error, info });
  }}
>
  <App />
</ErrorBoundary>
```

### 3.3 Vue 错误处理

```typescript
// src/plugins/monitor.ts
import type { App } from 'vue';

export function setupMonitor(app: App) {
  const monitor = useMonitor();

  // Vue 组件渲染错误
  app.config.errorHandler = (err, instance, info) => {
    monitor.error.collect({
      type: 'vue_error',
      message: (err as Error).message,
      stack: (err as Error).stack,
      context: {
        componentName: instance?.$options?.name,
        propsData: instance?.$props,
        info
      }
    });
  };

  // Vue 警告（仅开发环境）
  if (import.meta.env.DEV) {
    app.config.warnHandler = (msg, instance, trace) => {
      console.warn('[Vue Warn]:', msg, trace);
    };
  }

  // 全局 Promise 错误
  window.addEventListener('unhandledrejection', (event) => {
    monitor.error.collect({
      type: 'promise_error',
      message: event.reason?.message || String(event.reason),
      stack: event.reason?.stack
    });
  });
}
```

## 四、性能监控实现

### 4.1 Web Vitals 采集

```typescript
// src/monitor/performance.ts

interface PerformanceMetrics {
  // Navigation Timing
  ttfb: number;         // Time to First Byte
  fcp: number;          // First Contentful Paint
  lcp?: number;         // Largest Contentful Paint
  fid?: number;         // First Input Delay
  cls?: number;         // Cumulative Layout Shift
  tti?: number;         // Time to Interactive

  // Resource Timing
  resources: ResourceTiming[];

  // Custom Metrics
  custom: Record<string, number>;
}

class PerformanceCollector {
  private metrics: PerformanceMetrics = {
    ttfb: 0,
    fcp: 0,
    resources: []
  };

  constructor() {
    this.init();
  }

  private init() {
    // 使用 Performance Observer 监听
    this.observePaint();
    this.observeLargestContentfulPaint();
    this.observeFirstInput();
    this.observeLayoutShift();
    this.observeLongTasks();

    // 页面加载完成后采集
    window.addEventListener('load', () => {
      this.collectNavigationTiming();
      this.collectResourceTiming();
    });
  }

  private observePaint() {
    const paintHandler = (entries: PerformanceEntryList) => {
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.fcp = entry.startTime;
        }
      });
    };

    const observer = new PerformanceObserver(paintHandler);
    observer.observe({ type: 'paint', buffered: true });
  }

  private observeLargestContentfulPaint() {
    const handler = (entries: PerformanceObserverEntryList) => {
      const lastEntry = entries.getEntries().at(-1);
      this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
    };

    const observer = new PerformanceObserver(handler);
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  }

  private observeFirstInput() {
    const handler = (entries: PerformanceObserverEntryList) => {
      const firstEntry = entries.getEntries()[0];
      this.metrics.fid = firstEntry.processingStart - firstEntry.startTime;
    };

    const observer = new PerformanceObserver(handler);
    observer.observe({ type: 'first-input', buffered: true });
  }

  private observeLayoutShift() {
    let cls = 0;

    const handler = (entries: PerformanceObserverEntryList) => {
      for (const entry of entries.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          cls += entry.value;
        }
      }
      this.metrics.cls = cls;
    };

    const observer = new PerformanceObserver(handler);
    observer.observe({ type: 'layout-shift', buffered: true });
  }

  private observeLongTasks() {
    const handler = (entries: PerformanceObserverEntryList) => {
      entries.forEach((entry) => {
        // 长任务超过 50ms
        if (entry.duration > 50) {
          this.reportLongTask(entry as PerformanceEntry & { duration: number });
        }
      });
    };

    const observer = new PerformanceObserver(handler);
    observer.observe({ type: 'longtask', buffered: true });
  }

  private collectNavigationTiming() {
    const [nav] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];

    this.metrics = {
      ...this.metrics,
      ttfb: nav.responseStart - nav.requestStart,
      tti: this.calculateTTI()
    };
  }

  private calculateTTI(): number {
    // TTI 计算：最后一个长任务完成 + 5秒无长任务
    const longTaskThreshold = 50;
    const settlingTime = 5000;

    const tasks = performance.getEntriesByType('longtask') as PerformanceEntry[];
    if (tasks.length === 0) {
      return 0;
    }

    const lastLongTask = tasks[tasks.length - 1];
    return lastLongTask.startTime + lastLongTask.duration + settlingTime;
  }

  private collectResourceTiming() {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

    this.metrics.resources = resources.map((entry) => ({
      name: entry.name,
      type: entry.initiatorType,
      duration: entry.responseEnd - entry.startTime,
      size: entry.transferSize,
      dns: entry.domainLookupEnd - entry.domainLookupStart,
      tcp: entry.connectEnd - entry.connectStart,
      ttfb: entry.responseStart - entry.requestStart
    }));
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  private reportLongTask(entry: PerformanceEntry & { duration: number }) {
    // 可以上报长任务详情
    console.warn('[Long Task]', entry);
  }
}
```

### 4.2 自定义性能指标

```typescript
// src/monitor/custom.ts

// 页面加载耗时
function measurePageLoad() {
  const timing = performance.timing;

  const metrics = {
    // DNS 解析
    dns: timing.domainLookupEnd - timing.domainLookupStart,

    // TCP 连接
    tcp: timing.connectEnd - timing.connectStart,

    // SSL 建立
    ssl: timing.connectEnd - timing.secureConnectionStart,

    // 首字节
    ttfb: timing.responseStart - timing.requestStart,

    // 内容传输
    transfer: timing.responseEnd - timing.responseStart,

    // DOM 解析
    domParse: timing.domInteractive - timing.responseEnd,

    // JS 执行
    jsExecute: timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart,

    // 首屏渲染
    firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,

    // 页面完全加载
    load: timing.loadEventEnd - timing.navigationStart
  };

  return metrics;
}

// 接口请求耗时
function measureApiRequest(apiName: string, duration: number) {
  return {
    api: apiName,
    duration,
    timestamp: Date.now()
  };
}

// 自定义业务指标
function measureBusinessMetric(name: string, value: number, tags?: Record<string, string>) {
  return {
    metric: name,
    value,
    tags,
    timestamp: Date.now()
  };
}
```

## 五、用户行为监控

### 5.1 行为轨迹采集

```typescript
// src/monitor/behavior.ts

interface Breadcrumb {
  type: 'route' | 'click' | 'input' | 'error' | 'custom';
  message: string;
  timestamp: number;
  data?: any;
}

class BreadcrumbCollector {
  private breadcrumbs: Breadcrumb[] = [];
  private maxLength = 20;

  constructor() {
    this.init();
  }

  private init() {
    // 监听路由变化
    this.trackRoute();

    // 监听点击事件
    this.trackClick();

    // 监听输入
    this.trackInput();

    // 监听控制台
    this.trackConsole();
  }

  private trackRoute() {
    // Vue Router
    router.afterEach((to) => {
      this.push({
        type: 'route',
        message: `Navigate to ${to.path}`,
        timestamp: Date.now(),
        data: { path: to.path, query: to.query }
      });
    });
  }

  private trackClick() {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      // 忽略不重要元素的点击
      if (this.shouldIgnoreClick(target)) {
        return;
      }

      this.push({
        type: 'click',
        message: `Click ${target.tagName}#${target.id}.${target.className}`,
        timestamp: Date.now(),
        data: {
          tag: target.tagName.toLowerCase(),
          id: target.id,
          className: target.className,
          text: target.innerText?.slice(0, 50),
          href: (target as HTMLAnchorElement).href
        }
      });
    });
  }

  private shouldIgnoreClick(target: HTMLElement): boolean {
    // 忽略特定元素的点击
    const ignoreTags = ['HTML', 'BODY', 'SCRIPT', 'STYLE'];
    if (ignoreTags.includes(target.tagName)) {
      return true;
    }

    // 忽略没有文本的元素
    if (!target.innerText && !target.children.length) {
      return true;
    }

    return false;
  }

  private trackInput() {
    document.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement;

      this.push({
        type: 'input',
        message: `Input in ${target.tagName}#${target.id || target.name}`,
        timestamp: Date.now(),
        data: {
          tag: target.tagName.toLowerCase(),
          name: target.name,
          id: target.id,
          type: target.type,
          valueLength: target.value?.length || 0
          // 不记录实际值，保护隐私
        }
      });
    });
  }

  private trackConsole() {
    const methods = ['log', 'warn', 'error'];

    methods.forEach((method) => {
      const original = console[method];

      console[method] = (...args) => {
        this.push({
          type: 'custom',
          message: `Console.${method}`,
          timestamp: Date.now(),
          data: {
            args: args.map(arg =>
              typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
            )
          }
        });

        original.apply(console, args);
      };
    });
  }

  push(breadcrumb: Breadcrumb) {
    this.breadcrumbs.push(breadcrumb);

    // 保持固定长度
    if (this.breadcrumbs.length > this.maxLength) {
      this.breadcrumbs.shift();
    }
  }

  getBreadcrumbs(): Breadcrumb[] {
    return [...this.breadcrumbs];
  }
}
```

### 5.2 用户会话

```typescript
// src/monitor/session.ts

class SessionManager {
  private sessionId: string;
  private userId?: string;
  private startTime: number;
  private lastActiveTime: number;
  private sessionTimeout = 30 * 60 * 1000; // 30分钟无活动结束会话

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.lastActiveTime = this.startTime;

    // 从 localStorage 恢复用户 ID
    this.userId = localStorage.getItem('user_id') || undefined;

    // 监听用户活动
    this.trackActivity();

    // 检查会话超时
    this.checkTimeout();
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  }

  private trackActivity() {
    const events = ['click', 'keydown', 'scroll', 'touchstart'];

    events.forEach((event) => {
      window.addEventListener(event, () => {
        this.lastActiveTime = Date.now();
      }, { passive: true });
    });
  }

  private checkTimeout() {
    setInterval(() => {
      if (Date.now() - this.lastActiveTime > this.sessionTimeout) {
        this.endSession();
      }
    }, 60000); // 每分钟检查一次
  }

  private endSession() {
    // 上报会话结束
    const duration = Date.now() - this.startTime;
    monitor.report({
      type: 'session_end',
      data: {
        sessionId: this.sessionId,
        duration,
        userId: this.userId
      }
    });

    // 开始新会话
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.lastActiveTime = this.startTime;
  }

  getSessionId(): string {
    return this.sessionId;
  }

  setUserId(userId: string) {
    this.userId = userId;
    localStorage.setItem('user_id', userId);
  }
}
```

## 六、数据上报策略

### 6.1 采样与节流

```typescript
// src/monitor/report.ts

class ReportManager {
  private queue: any[] = [];
  private isReporting = false;
  private maxQueueSize = 100;
  private reportInterval = 5000; // 5秒上报一次
  private sampleRate = 0.1; // 采样率 10%

  constructor() {
    // 定期上报
    setInterval(() => this.flush(), this.reportInterval);

    // 页面卸载时上报
    window.addEventListener('beforeunload', () => this.flush());

    // 页面隐藏时上报
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.flush();
      }
    });
  }

  push(data: any) {
    // 采样
    if (Math.random() > this.sampleRate) {
      return;
    }

    this.queue.push({
      ...data,
      timestamp: Date.now()
    });

    // 达到阈值立即上报
    if (this.queue.length >= this.maxQueueSize) {
      this.flush();
    }
  }

  async flush() {
    if (this.queue.length === 0 || this.isReporting) {
      return;
    }

    this.isReporting = true;

    const data = this.queue.splice(0, this.maxQueueSize);

    try {
      await this.send(data);
    } catch (error) {
      // 失败时放回队列
      this.queue.unshift(...data);
    } finally {
      this.isReporting = false;
    }
  }

  private async send(data: any[]) {
    const payload = JSON.stringify({
      appId: APP_ID,
      version: APP_VERSION,
      data
    });

    // 使用 sendBeacon（更可靠）
    if (navigator.sendBeacon) {
      navigator.sendBeacon(API_ENDPOINT, payload);
    } else {
      await fetch(API_ENDPOINT, {
        method: 'POST',
        body: payload,
        keepalive: true
      });
    }
  }
}
```

### 6.2 数据压缩

```typescript
// src/monitor/compress.ts

// 简单压缩：去除重复字段
function compressErrors(errors: ErrorInfo[]): ErrorInfo[] {
  return errors.map(error => ({
    ...error,
    // 压缩 context
    context: {
      ...error.context,
      // 去除不必要的字段
    }
  }));
}

// 使用 LZString 压缩
import LZString from 'lz-string';

function compressData(data: any): string {
  const json = JSON.stringify(data);
  return LZString.compressToUTF16(json);
}

// 上报时压缩
async function reportCompressed(data: any[]) {
  const compressed = compressData(data);

  // 压缩后大小明显减小
  console.log(`Original: ${JSON.stringify(data).length}`);
  console.log(`Compressed: ${compressed.length}`);
}
```

## 七、告警系统

### 7.1 告警规则

```typescript
// src/monitor/alert.ts

interface AlertRule {
  id: string;
  name: string;
  condition: (metrics: DashboardMetrics) => boolean;
  threshold: {
    errorRate?: number;      // 错误率阈值
    p95Latency?: number;     // P95 延迟阈值
    errorCount?: number;     // 错误数量阈值
  };
  severity: 'critical' | 'warning' | 'info';
  channels: ('dingtalk' | 'wechat' | 'email')[];
  cooldown: number; // 告警冷却时间（分钟）
}

const alertRules: AlertRule[] = [
  {
    id: 'high_error_rate',
    name: '错误率过高',
    condition: (metrics) => metrics.errorRate > 0.005, // 0.5%
    severity: 'critical',
    channels: ['dingtalk', 'wechat'],
    cooldown: 15
  },
  {
    id: 'high_latency',
    name: '页面延迟过高',
    condition: (metrics) => metrics.p95Lcp > 2500, // 2.5s
    severity: 'warning',
    channels: ['dingtalk'],
    cooldown: 30
  }
];

class AlertManager {
  private lastAlertTime: Map<string, number> = new Map();

  async checkAlerts(metrics: DashboardMetrics) {
    for (const rule of alertRules) {
      if (this.shouldAlert(rule, metrics)) {
        await this.sendAlert(rule, metrics);
      }
    }
  }

  private shouldAlert(rule: AlertRule, metrics: DashboardMetrics): boolean {
    // 检查冷却时间
    const lastAlert = this.lastAlertTime.get(rule.id) || 0;
    const cooldownMs = rule.cooldown * 60 * 1000;

    if (Date.now() - lastAlert < cooldownMs) {
      return false;
    }

    return rule.condition(metrics);
  }

  private async sendAlert(rule: AlertRule, metrics: DashboardMetrics) {
    const message = this.formatMessage(rule, metrics);

    // 发送到各个渠道
    for (const channel of rule.channels) {
      await this.sendToChannel(channel, message);
    }

    this.lastAlertTime.set(rule.id, Date.now());
  }

  private formatMessage(rule: AlertRule, metrics: DashboardMetrics): string {
    return {
      msg_type: 'markdown',
      content: {
        text: `### 🔔 ${rule.name}\n\n` +
          `**严重级别**: ${rule.severity}\n\n` +
          `**当前指标**:\n` +
          `| 指标 | 值 |\n` +
          `|-----|-----|\n` +
          `| 错误率 | ${(metrics.errorRate * 100).toFixed(2)}% |\n` +
          `| P95 LCP | ${metrics.p95Lcp}ms |\n` +
          `| P95 FID | ${metrics.p95Fid}ms |\n\n` +
          `[查看详情](${DASHBOARD_URL})`
      }
    };
  }
}
```

## 八、效果展示

```
┌─────────────────────────────────────────────────────────────────┐
│                      监控体系建设效果                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   📊 错误率变化                                                  │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │                                                          │  │
│   │  0.8% ───────┐                                           │  │
│   │             │                                            │  │
│   │  0.4% ───────┤───▶ 优化阶段                              │  │
│   │             │                                            │  │
│   │  0.1% ───────┴───────────────────▶ 稳定运行              │  │
│   │                                                          │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                  │
│   ⏱️  平均检测时间 ───────────────────── < 1 分钟               │
│   📧  告警触达率 ────────────────────── 99%                    │
│   🔍  问题定位时间 ──────────────────── < 5 分钟               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 九、总结

::: tip 监控体系核心要点
1. **全面采集**：覆盖 JS 错误、资源错误、Promise 错误、性能指标
2. **低侵入**：SDK 接入简单，不影响业务代码
3. **可靠上报**：使用 sendBeacon + fetch 双保险
4. **智能告警**：合理设置阈值和冷却时间
5. **快速定位**：用户行为轨迹辅助问题排查
:::

::: warning 注意事项
1. **隐私合规**：用户行为数据需要脱敏处理
2. **性能影响**：采集和上报要异步进行，不能阻塞主线程
3. **数据安全**：上报接口需要做好鉴权
4. **成本控制**：合理采样，避免数据量爆炸
5. **持续优化**：根据告警情况持续调整规则
:::

前端监控是保障应用稳定性的重要基础设施，好的监控体系能让问题早发现、早处理。希望这篇文章对你有帮助！
