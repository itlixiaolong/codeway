---
title: 前端组件库设计与封装：50+ 组件、复用率 80%
date: 2024-02-28
tags:
  - 组件设计
  - 前端工程
  - Vue
categories:
  - 框架实战
author: 李小龙
description: 从零设计企业级组件库的经验总结，包含组件设计原则、API 设计、文档建设、发布流程等完整方案
---

# 前端组件库设计与封装：50+ 组件、复用率 80%

> 本文总结了我在设计企业级组件库过程中的完整经验，包含设计原则、API 规范、代码组织、性能优化等多个维度。

## 一、组件库设计原则

```
┌─────────────────────────────────────────────────────────────────┐
│                      组件设计七大原则                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   1. 单一职责 ──── 每个组件只做一件事                             │
│   2. 可组合性 ──── 原子化设计，易于组合                          │
│   3. 接口稳定 ──── Props 设计要向后兼容                          │
│   4. 可定制化 ──── 支持主题定制和插槽扩展                         │
│   5. 可访问性 ──── 支持键盘导航和屏幕阅读                         │
│   6. 响应式 ────── 适配多种屏幕尺寸                               │
│   7. 无障碍 ────── ARIA 属性、语义化标签                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 二、组件分层架构

### 2.1 分层设计

```typescript
// 组件分层
const ComponentLayers = {
  // 原子组件（最底层）
  Atoms: [
    'Button',      // 按钮
    'Icon',        // 图标
    'Input',       // 输入框
    'Badge',       // 徽章
    'Avatar',      // 头像
    'Divider'      // 分割线
  ],

  // 分子组件（由原子组件组合）
  Molecules: [
    'InputSearch',      // 搜索框
    'InputNumber',      // 数字输入
    'SelectOption',     // 选择项
    'CardHeader',       // 卡片头部
    'FormItem'          // 表单项
  ],

  // 有机体组件（业务相关）
  Organisms: [
    'SearchForm',       // 搜索表单
    'DataTable',        // 数据表格
    'TreeSelect',       // 树形选择
    'DateRangePicker'   // 日期范围选择
  ],

  // 模板组件（页面级）
  Templates: [
    'PageHeader',       // 页面头部
    'PageContainer',    // 页面容器
    'ModalForm',        // 弹窗表单
    'DrawerPanel'       // 抽屉面板
  ]
}
```

### 2.2 目录结构

```bash
# Vue 组件库目录结构
packages/
└── components/
    ├── index.ts              # 入口文件
    │
    ├── base/                  # 基础组件
    │   ├── Button/
    │   │   ├── src/
    │   │   │   └── Button.vue
    │   │   ├── __tests__/
    │   │   │   └── Button.spec.ts
    │   │   ├── index.ts
    │   │   ├── types.ts
    │   │   ├── constants.ts
    │   │   └── useButton.ts
    │   │
    │   ├── Icon/
    │   ├── Input/
    │   └── ...
    │
    ├── form/                  # 表单组件
    │   ├── Form/
    │   ├── FormItem/
    │   ├── Input/
    │   ├── Select/
    │   ├── DatePicker/
    │   └── ...
    │
    ├── data/                  # 数据展示组件
    │   ├── Table/
    │   ├── Tree/
    │   ├── Card/
    │   └── ...
    │
    ├── feedback/              # 反馈组件
    │   ├── Modal/
    │   ├── Drawer/
    │   ├── Message/
    │   ├── Notification/
    │   └── ...
    │
    └── navigation/            # 导航组件
        ├── Tabs/
        ├── Menu/
        ├── Breadcrumb/
        └── Pagination/
```

## 三、组件 API 设计

### 3.1 Props 设计规范

```typescript
// types/props.ts

// 基础 Props 类型
export interface BaseProps {
  // 样式类名
  class?: string | string[] | Record<string, boolean>;
  style?: string | Record<string, string | number>;

  // 状态
  disabled?: boolean;
  readonly?: boolean;
  loading?: boolean;

  // 事件
  onClick?: (event: MouseEvent) => void;
}

// Button Props
export interface ButtonProps extends BaseProps {
  // 类型
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
  nativeType?: 'button' | 'submit' | 'reset';

  // 尺寸
  size?: 'small' | 'medium' | 'large';

  // 外观
  plain?: boolean;        // 朴素按钮
  round?: boolean;        // 圆角按钮
  circle?: boolean;       // 圆形按钮
  text?: boolean;         // 文字按钮

  // 图标
  icon?: string;
  iconPosition?: 'left' | 'right';

  // 文字
  text?: string;

  // 认证
  authority?: string | string[];
}

// Table Props
export interface TableProps<T = any> {
  // 数据
  data: T[];
  columns: TableColumn<T>[];

  // 配置
  loading?: boolean;
  border?: boolean;
  stripe?: boolean;
  highlightHover?: boolean;

  // 分页
  pagination?: PaginationConfig | false;

  // 选择
  selectable?: boolean;
  selectedRows?: T[];
  onSelectionChange?: (rows: T[]) => void;

  // 排序
  sortable?: boolean;
  defaultSort?: { prop: string; order: 'asc' | 'desc' };

  // 行展开
  expandable?: boolean;
  expandedRows?: T[];
}
```

### 3.2 组件类型定义

```typescript
// types/components.ts
import type { ExtractPropTypes, PropType, Component } from 'vue';

// Props 提取
export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

// Emits 定义
export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void;
  (e: 'update:loading', value: boolean): void;
}

// 组件实例
export interface ButtonInstance {
  // 暴露的方法
  focus(): void;
  blur(): void;

  // 暴露的属性
  ref: HTMLElement;
}

// 组合式函数
export function useButton(props: ButtonProps, emit: ButtonEmits) {
  // 组件逻辑
}
```

## 四、核心组件实现

### 4.1 Button 组件

```vue
<!-- components/base/Button/src/Button.vue -->
<template>
  <component
    :is="tag"
    :class="buttonClasses"
    :type="tag === 'button' ? nativeType : undefined"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- 加载指示器 -->
    <span v-if="loading" class="btn-loading">
      <svg class="loading-icon" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3">
          <animate attributeName="stroke-dasharray" values="0 80;40 80;0 80" dur="1.5s" repeatCount="indefinite"/>
          <animate attributeName="stroke-dashoffset" values="0;-40;0" dur="1.5s" repeatCount="indefinite"/>
        </circle>
      </svg>
    </span>

    <!-- 图标 -->
    <span v-if="icon && !loading && iconPosition === 'left'" class="btn-icon btn-icon-left">
      <component :is="iconComponent" />
    </span>

    <!-- 内容 -->
    <span class="btn-content">
      <slot />
    </span>

    <!-- 图标（右侧） -->
    <span v-if="icon && !loading && iconPosition === 'right'" class="btn-icon btn-icon-right">
      <component :is="iconComponent" />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue';
import type { ButtonProps, ButtonEmits } from '../types';
import { useButton } from '../useButton';

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  nativeType: 'button',
  size: 'medium',
  iconPosition: 'left',
  disabled: false,
  loading: false
});

const emit = defineEmits<ButtonEmits>();

const { iconComponent } = useButton(props);

// 计算标签
const tag = computed(() => {
  if (props.href) return 'a';
  return 'button';
});

// 计算类名
const buttonClasses = computed(() => [
  'btn',
  `btn-${props.type}`,
  `btn-${props.size}`,
  {
    'btn-plain': props.plain,
    'btn-round': props.round,
    'btn-circle': props.circle,
    'btn-text': props.text,
    'btn-disabled': props.disabled,
    'btn-loading': props.loading,
    'btn-icon-only': props.icon && !slots.default
  }
]);

// 事件处理
const handleClick = (e: MouseEvent) => {
  if (props.disabled || props.loading) {
    e.preventDefault();
    return;
  }
  emit('click', e);
};
</script>

<style scoped lang="scss">
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;

  // 类型样式
  @each $type in (primary, success, warning, danger, info, default) {
    &-#{$type} {
      background: var(--el-color-#{$type});
      color: white;

      &:hover:not(:disabled) {
        background: var(--el-color-#{$type}-light-3);
      }

      &.btn-plain {
        background: var(--el-color-#{$type}-light-9);
        color: var(--el-color-#{$type});

        &:hover {
          background: var(--el-color-#{$type}-light-8);
        }
      }
    }
  }

  // 尺寸
  &-small {
    height: 28px;
    padding: 0 12px;
    font-size: 12px;
  }

  &-medium {
    height: 36px;
    padding: 0 16px;
    font-size: 14px;
  }

  &-large {
    height: 44px;
    padding: 0 20px;
    font-size: 16px;
  }

  // 禁用
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
```

### 4.2 Table 组件

```vue
<!-- components/data/Table/src/Table.vue -->
<template>
  <div class="table-container">
    <!-- 加载状态 -->
    <div v-if="loading" class="table-loading">
      <div class="loading-spinner" />
    </div>

    <!-- 表格 -->
    <table :class="['table', { 'table-bordered': border, 'table-stripe': stripe }]">
      <!-- 表头 -->
      <thead class="table-thead">
        <tr>
          <!-- 选择列 -->
          <th v-if="selectable" class="table-cell table-cell-checkbox">
            <input
              type="checkbox"
              :checked="isAllSelected"
              :indeterminate="isIndeterminate"
              @change="handleSelectAll"
            />
          </th>

          <!-- 数据列 -->
          <th
            v-for="column in columns"
            :key="column.prop"
            :class="['table-cell', { 'table-cell-sortable': column.sortable }]"
            :style="{ width: column.width, textAlign: column.align || 'left' }"
            @click="column.sortable && handleSort(column)"
          >
            <slot :name="`header-${column.prop}`" :column="column">
              {{ column.label }}
            </slot>

            <!-- 排序图标 -->
            <span v-if="column.sortable" class="sort-icon">
              <svg
                :class="['sort-up', { active: sortConfig.prop === column.prop && sortConfig.order === 'asc' }]"
                viewBox="0 0 24 24"
              >
                <path d="M12 8l-6 6h12z" fill="currentColor" />
              </svg>
              <svg
                :class="['sort-down', { active: sortConfig.prop === column.prop && sortConfig.order === 'desc' }]"
                viewBox="0 0 24 24"
              >
                <path d="M12 16l-6-6h12z" fill="currentColor" />
              </svg>
            </span>
          </th>
        </tr>
      </thead>

      <!-- 表体 -->
      <tbody class="table-tbody">
        <template v-if="paginatedData.length">
          <tr
            v-for="(row, index) in paginatedData"
            :key="getRowKey(row, index)"
            :class="{ 'row-selected': isRowSelected(row) }"
            @click="handleRowClick(row)"
          >
            <!-- 选择列 -->
            <td v-if="selectable" class="table-cell table-cell-checkbox">
              <input
                type="checkbox"
                :checked="isRowSelected(row)"
                @change="handleSelect(row)"
                @click.stop
              />
            </td>

            <!-- 数据列 -->
            <td
              v-for="column in columns"
              :key="column.prop"
              :class="['table-cell', column.className]"
              :style="{ textAlign: column.align || 'left' }"
            >
              <slot :name="column.prop" :row="row" :column="column" :$index="index">
                {{ getCellValue(row, column) }}
              </slot>
            </td>
          </tr>
        </template>

        <!-- 空状态 -->
        <tr v-else>
          <td :colspan="columns.length + (selectable ? 1 : 0)" class="table-empty">
            <slot name="empty">
              <div class="empty-content">
                <svg class="empty-icon" viewBox="0 0 24 24">
                  <path d="M3 3h18v18H3V3zm2 2v14h14V5H5z" fill="currentColor" />
                </svg>
                <p>暂无数据</p>
              </div>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分页 -->
    <div v-if="pagination !== false" class="table-pagination">
      <Pagination
        v-bind="paginationConfig"
        :total="data.length"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { TableProps, TableEmits, TableColumn, SortConfig } from '../types';

const props = withDefaults(defineProps<TableProps>(), {
  border: false,
  stripe: false,
  highlightHover: true,
  selectable: false,
  sortable: false,
  pagination: false
});

const emit = defineEmits<TableEmits>();

// 分页
const currentPage = ref(1);
const pageSize = ref(10);

const paginationConfig = computed(() => {
  if (typeof props.pagination === 'object') {
    return { ...props.pagination };
  }
  return { currentPage: 1, pageSize: 10 };
});

// 数据处理
const paginatedData = computed(() => {
  if (props.pagination === false) return props.data;

  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return props.data.slice(start, end);
});
</script>
```

## 五、主题定制系统

### 5.1 CSS 变量主题

```scss
// themes/default/variables.scss

// 品牌色
$--colors: (
  'primary': (base: #165DFF, light-1: #3370FF, light-2: #4080FF, light-3: #5380FF),
  'success': (base: #00B42A, light-1: #18B35C, light-2: #33B38F, light-3: #4FB3C1),
  'warning': (base: #FF7D00, light-1: #FF9527, light-2: #FFAD4E, light-3: #FFC575),
  'danger': (base: #F53F3F, light-1: #F76560, light-2: #F98D82, light-3: #FBB5A4),
  'info': (base: #005CDC, light-1: #1A78DE, light-2: #3494E0, light-3: #4EB0E1)
) !default;

// 字体
$--font-family: (
  base: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', Consolas, monospace"
) !default;

// 字号
$--font-size: (
  'extra-large': 20px,
  'large': 18px,
  'medium': 14px,
  'base': 14px,
  'small': 13px,
  'extra-small': 12px
) !default;

// 圆角
$--border-radius: (
  'base': 4px,
  'small': 2px,
  'round': 20px,
  'circle': 50%
) !default;

// 阴影
$--box-shadow: (
  'base': '0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04)',
  'light': '0 2px 12px 0 rgba(0, 0, 0, 0.08)',
  'lighter': '0 4px 16px 0 rgba(0, 0, 0, 0.08)',
  'dark': '0 4px 16px 0 rgba(0, 0, 0, 0.15)'
) !default;
```

### 5.2 暗色主题

```scss
// themes/dark/variables.scss

$--colors: (
  'primary': (base: #4080FF, light-1: #5393FF, light-2: #66A6FF, light-3: #79B9FF),
  'success': (base: #23D16A, light-1: #3DD87A, light-2: #57DE89, light-3: #6BE499),
  'warning': (base: #FF9A2E, light-1: #FFA547, light-2: #FFAF60, light-3: #FFBA79),
  'danger': (base: #FF7875, light-1: #FF8B8B, light-2: #FF9EA0, light-3: #FFB1B5),
  'info': (base: #5393FF, light-1: #6AA2FF, light-2: #82B1FF, light-3: #9AC0FF)
);

// 背景色
$--bg-color: (
  'base': #141414,
  'overlay': #1D1D1D,
  'surface': #262626,
  'elevated': #2D2D2D
) !default;

// 文本色
$--text-color: (
  'primary': #E5E6EB,
  'regular': #C9CDD4,
  'secondary': #86909C,
  'placeholder': #6B7785,
  'disabled': #4E5969
) !default;
```

## 六、文档建设

### 6.1 组件文档模板

```typescript
// Button.md

## 基础用法

基础的按钮用法。

:::demo 使用 `type`、`size` 属性来定义按钮的样式。

```vue
<template>
  <div class="button-demo">
    <Button type="primary">主要按钮</Button>
    <Button type="success">成功按钮</Button>
    <Button type="warning">警告按钮</Button>
    <Button type="danger">危险按钮</Button>
    <Button>默认按钮</Button>
  </div>
</template>

<script setup>
import { Button } from '@bruce-ui/components';
</script>
```

:::

## 禁用状态

使用 `disabled` 属性来定义按钮的禁用状态。

:::demo

```vue
<template>
  <Button disabled>禁用按钮</Button>
  <Button type="primary" disabled>禁用主要按钮</Button>
</template>
```

:::

## Props

| 参数 | 说明 | 类型 | 默认值 |
|-----|------|------|-------|
| type | 按钮类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'default'` |
| size | 按钮尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| icon | 图标组件 | `Component` | - |

## Events

| 事件名 | 说明 | 参数 |
|-------|------|-----|
| click | 点击按钮时触发 | `(event: MouseEvent)` |

## Slots

| 插槽名 | 说明 |
|-------|------|
| default | 按钮内容 |
| icon | 自定义图标 |
```

## 七、发布与维护

### 7.1 发布流程

```yaml
# 发布配置
# .release-it.json

{
  "plugins": {
    "@release-it/conventional-changelog": {
      "preset": "angular",
      "infile": "CHANGELOG.md"
    }
  },
  "git": {
    "commitMessage": "Release v${version}",
    "tagName": "v${version}"
  },
  "npm": {
    "publish": {
      "access": "public",
      "registry": "https://registry.npmjs.org"
    }
  }
}
```

### 7.2 版本号管理

```
语义化版本 (SemVer)
┌─────────────────────────────────────┐
│                                     │
│   MAJOR.MINOR.PATCH                 │
│      │    │    │                    │
│      │    │    └── 补丁版本          │
│      │    └─────── 次要版本 (新功能)  │
│      └─────────── 主要版本 (破坏性)   │
│                                     │
└─────────────────────────────────────┘
```

## 八、成果展示

```
┌─────────────────────────────────────────────────────────────────┐
│                      组件库建设成果                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   📦 组件数量 ──────────────────────── 50+                      │
│   📊 覆盖率 ─────────────────────────── 85%                      │
│   📈 代码复用率 ──────────────────────── 80%                     │
│   ⭐ GitHub Stars ───────────────────── 2300+                 │
│   📥 周下载量 ────────────────────────── 5000+                  │
│   🏢 使用企业 ─────────────────────────── 100+                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

::: tip 组件库建设建议
1. **从实际需求出发**：先解决项目中的重复代码
2. **渐进式开发**：先核心后完善
3. **文档先行**：好的文档是好组件的标配
4. **持续迭代**：根据反馈不断优化
5. **版本管理**：遵守语义化版本规范
:::

希望这篇文章对你设计组件库有所帮助！
