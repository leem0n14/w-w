// src/components/index.ts
import type { App } from 'vue';

// 自动导入所有组件
const modules = import.meta.globEager('./**/*.vue');

export default {
  install(app: App) {
    Object.values(modules).forEach((module) => {
      // 获取组件配置
      const component = module.default;
      
      // 确保组件有 name 属性（用于注册）
      if (component.name) {
        // 全局注册组件
        app.component(component.name, component);
      }
    });
  },
};