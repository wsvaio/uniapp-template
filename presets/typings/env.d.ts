
declare module '*.vue' {
  import type { ComponentOptions } from 'vue';
  const Component: ComponentOptions;
  export default Component;
}

type T = any;
type obj = { [k: string]: any; };
type keys<K extends keyof any, T = any> = {
  [P in K]: T;
};
