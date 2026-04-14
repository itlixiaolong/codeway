---
title: 企业级前端架构设计最佳实践
date: 2024-03-10
tags:
  - 架构设计
  - 前端工程
  - 最佳实践
categories:
  - 工程化与架构
author: 李小龙
description: 从零开始设计企业级前端架构，包含技术选型、模块化设计、性能优化、质量保障等核心维度
---

# 企业级前端架构设计最佳实践

> 本文来自真实大型项目的架构设计经验，总结了企业级前端架构的核心要素与最佳实践。

## 架构设计原则

```
┌─────────────────────────────────────────────────────────────────┐
│                      架构设计六大原则                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐               │
│   │ 单一职责  │───▶│   开闭   │───▶│  接口   │               │
│   │  原则    │    │  原则    │    │  稳定   │               │
│   └──────────┘    └──────────┘    └──────────┘               │
│        │                               ▲                      │
│        ▼                               │                      │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐               │
│   │ 依赖注入  │───▶│  模块化  │───▶│  领域   │               │
│   │  原则    │    │  原则    │    │  划分   │               │
│   └──────────┘    └──────────┘    └──────────┘               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 一、技术选型体系

### 1.1 技术栈全景

```typescript
// 企业级前端技术栈
interface FrontendStack {
  // 核心框架
  framework: {
    primary: 'Vue 3' | 'React 18';
    ssr: 'Nuxt 3' | 'Next.js';
    mobile: 'UniApp' | 'Taro';
  };

  // 状态管理
  state: {
    local: 'Pinia' | 'Zustand';
    server: 'TanStack Query' | 'SWR';
    global: 'Pinia' | 'Redux Toolkit';
  };

  // UI 组件库
  ui: {
    enterprise: '自研组件库';
    external: 'Element Plus' | 'Ant Design';
  };

  // 构建工具
  build: {
    dev: 'Vite 5';
    prod: 'Rspack' | 'Webpack 5';
  };

  // 工程化
  engineering: {
    lint: 'ESLint + TypeScript';
    test: 'Vitest + Playwright';
    ci: 'GitLab CI' | 'GitHub Actions';
  };
}
```

### 1.2 技术选型决策矩阵

| 维度 | Vue 3 | React 18 | 权重 |
|-----|-------|---------|-----|
| 学习曲线 | ⭐⭐⭐⭐ | ⭐⭐⭐ | 15% |
| 团队适配 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 20% |
| 生态完善 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 20% |
| 性能表现 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 15% |
| 长期维护 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 20% |
| 招聘难度 | ⭐⭐⭐⭐ | ⭐⭐⭐ | 10% |
| **加权得分** | **4.15** | **3.85** | |

## 二、项目结构设计

### 2.1 Monorepo 架构

```bash
# Monorepo 项目结构
enterprise-app/
├── apps/
│   ├── admin/           # 管理后台
│   ├── portal/          # 门户站点
│   └── mobile/          # 移动端
│
├── packages/
│   ├── ui/              # 组件库
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Button/
│   │   │   │   ├── Table/
│   │   │   │   └── ...
│   │   │   ├── hooks/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── shared/          # 共享工具
│   │   ├── utils/
│   │   ├── constants/
│   │   └── types/
│   │
│   └── config/          # 共享配置
│       ├── eslint/
│       ├── typescript/
│       └── vite/
│
├── scripts/             # 构建脚本
├── pnpm-workspace.yaml
└── package.json
```

### 2.2 领域驱动设计 (DDD)

```typescript
// 领域划分示例
src/
├── domains/
│   ├── user/                    # 用户领域
│   │   ├── entities/            # 实体
│   │   │   └── User.ts
│   │   ├── repositories/       # 仓储
│   │   │   └── UserRepository.ts
│   │   ├── services/            # 领域服务
│   │   │   └── UserService.ts
│   │   └── types/              # 领域类型
│   │       └── index.ts
│   │
│   ├── order/                   # 订单领域
│   │   ├── entities/
│   │   ├── repositories/
│   │   ├── services/
│   │   └── types/
│   │
│   └── product/                 # 产品领域
│       ├── entities/
│       ├── repositories/
│       ├── services/
│       └── types/
│
├── applications/               # 应用层（用例编排）
│   ├── user/
│   │   └── CreateUser.usecase.ts
│   └── order/
│       └── CreateOrder.usecase.ts
│
├── infrastructures/            # 基础设施层
│   ├── repositories/          # 仓储实现
│   │   ├── UserRepositoryImpl.ts
│   │   └── OrderRepositoryImpl.ts
│   ├── api/                   # API 调用
│   │   └── HttpClient.ts
│   └── storage/               # 本地存储
│       └── LocalStorage.ts
│
└── presentations/             # 表现层
    ├── components/
    ├── views/
    └── hooks/
```

## 三、组件架构设计

### 3.1 组件分层

```
┌─────────────────────────────────────────────────────────────┐
│                    组件分层架构                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                   业务组件层                         │   │
│   │  特点：高度业务定制、不可复用                         │   │
│   │  路径：views/xxx/components/                        │   │
│   └─────────────────────────────────────────────────────┘   │
│                            │                                │
│                            ▼                                │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                   领域组件层                         │   │
│   │  特点：领域通用、有一定业务含义                       │   │
│   │  路径：domains/xxx/components/                      │   │
│   └─────────────────────────────────────────────────────┘   │
│                            │                                │
│                            ▼                                │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                   基础组件层                         │   │
│   │  特点：完全通用、无业务依赖                           │   │
│   │  路径：packages/ui/components/                      │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 组件设计模式

```typescript
// Compound Components Pattern（复合组件模式）
// 示例：Select 组件

// 1. 基础组件
interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
}

interface OptionProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}

// 2. 上下文共享状态
const SelectContext = createContext<{
  value?: string;
  onChange?: (value: string) => void;
}>();

// 3. 复合组件实现
const Select: React.FC<SelectProps> & { Option: React.FC<OptionProps> } = ({
  value,
  onChange,
  children
}) => {
  return (
    <SelectContext.Provider value={{ value, onChange }}>
      <div className="select">
        {children}
      </div>
    </SelectContext.Provider>
  );
};

Select.Option = ({ value, children, disabled }) => {
  const { value: selectedValue, onChange } = useContext(SelectContext);

  return (
    <div
      className={classNames({ selected: value === selectedValue })}
      onClick={() => !disabled && onChange?.(value)}
    >
      {children}
    </div>
  );
};

// 4. 使用方式
const App = () => (
  <Select value={country} onChange={setCountry}>
    <Select.Option value="CN">中国</Select.Option>
    <Select.Option value="US">美国</Select.Option>
    <Select.Option value="JP">日本</Select.Option>
  </Select>
);
```

## 四、状态管理架构

### 4.1 分层状态管理

```typescript
// 状态分层设计
interface AppState {
  // 服务端状态（远程数据）
  server: {
    users: User[];
    orders: Order[];
    products: Product[];
  };

  // 路由状态
  router: {
    currentPath: string;
    params: Record<string, string>;
    query: Record<string, string>;
  };

  // UI 状态
  ui: {
    theme: 'light' | 'dark';
    sidebarCollapsed: boolean;
    activeTab: string;
  };

  // 表单状态
  forms: {
    [formId: string]: FormState;
  };
}
```

### 4.2 TanStack Query 集成

```typescript
// hooks/useUsers.ts
export const useUsers = (params: UserQueryParams) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => userApi.getUsers(params),
    staleTime: 5 * 60 * 1000,      // 5分钟内不重新请求
    gcTime: 10 * 60 * 1000,        // 缓存保留10分钟
    retry: 3,                       // 重试3次
    select: (data) => data.list,   // 数据转换
  });
};

// hooks/useCreateUser.ts
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.createUser,

    onSuccess: () => {
      // 乐观更新：立即刷新列表
      queryClient.invalidateQueries({ queryKey: ['users'] });

      // 或者局部更新
      queryClient.setQueryData(['users'], (old) => ({
        ...old,
        list: [newUser, ...old.list]
      }));
    },

    onError: (error) => {
      toast.error('创建用户失败');
    }
  });
};
```

## 五、性能优化体系

### 5.1 构建时优化

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    // 目标浏览器
    target: 'es2015',

    // 代码分割策略
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // 框架分离
          if (id.includes('node_modules')) {
            if (id.includes('vue')) return 'vue-vendor';
            if (id.includes('element-plus')) return 'ui-vendor';
            if (id.includes('@tanstack')) return 'query-vendor';
          }
        },

        // 输出文件名哈希
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },

    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },

  // 依赖预构建
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'axios']
  }
});
```

### 5.2 运行时优化

```typescript
// 1. 组件级别优化
const MemoizedComponent = React.memo(Component, (prev, next) => {
  // 自定义比较逻辑
  return prev.userId === next.userId;
});

// 2. 虚拟列表优化长列表
import { FixedSizeList } from 'react-window';

const VirtualList = ({ items }) => (
  <FixedSizeList
    height={600}
    itemCount={items.length}
    itemSize={50}
    width="100%"
  >
    {({ index, style }) => (
      <div style={style}>{items[index].name}</div>
    )}
  </FixedSizeList>
);

// 3. 图片懒加载
const LazyImage = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <img
      src={isLoaded ? src : placeholder}
      alt={alt}
      loading="lazy"
      onLoad={() => setIsLoaded(true)}
    />
  );
};
```

## 六、质量保障体系

### 6.1 测试金字塔

```
┌─────────────────────────────────────────────────────────────┐
│                      测试金字塔                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                        ▲                                     │
│                       ╱ ╲  E2E Tests                        │
│                      ╱   ╲  (10%)                           │
│                     ╱─────╲                                 │
│                    ╱       ╲ Integration Tests               │
│                   ╱         ╲  (20%)                         │
│                  ╱───────────╲                              │
│                 ╱             ╲  Unit Tests                  │
│                ╱               ╲ (70%)                      │
│               ╱─────────────────╲                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 CI/CD 质量门禁

```yaml
# .gitlab-ci.yml
stages:
  - lint
  - test
  - build
  - deploy

# 代码检查
eslint:
  stage: lint
  script:
    - pnpm lint
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

# 单元测试
unit-test:
  stage: test
  script:
    - pnpm test:unit --coverage
  coverage: '/Coverage: \d+\.\d+%/'
  artifacts:
    reports:
      coverage_report: coverage/lcov.info

# E2E 测试
e2e-test:
  stage: test
  script:
    - pnpm build
    - pnpm test:e2e
  only:
    - main
    - develop

# 构建
build:
  stage: build
  script:
    - pnpm build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week
```

## 七、总结

::: tip 架构设计核心要点
1. **渐进式演进**：架构不是一蹴而就的，需要持续迭代
2. **业务驱动**：技术方案服务于业务目标
3. **团队适配**：选择团队能 hold 住的技术栈
4. **可度量**：建立指标体系，量化架构效果
5. **文档沉淀**：架构决策要有记录（ADR）
:::

::: warning 常见架构问题
1. **过度设计**：不要为了架构而架构
2. **过早抽象**：YAGNI 原则
3. **技术债务**：及时偿还，避免累积
4. **紧耦合**：模块边界要清晰
:::

企业级前端架构是一个系统工程，需要在实践中不断打磨。希望这篇文章能给正在做架构设计或技术选型的同学一些参考。
