declare module "locomotive-scroll" {
    interface LocomotiveScrollOptions {
      el: HTMLElement;
      name?: string;
      offset?: number[];
      smooth?: boolean;
      multiplier?: number;
      class?: string;
      smartphone?: { smooth: boolean };
      tablet?: { smooth: boolean };
      [key: string]: unknown; // fallback for extra options
    }
  
    export default class LocomotiveScroll {
      constructor(options: LocomotiveScrollOptions);
      update(): void;
      destroy(): void;
      scrollTo(
        target: string | HTMLElement | number,
        options?: { offset?: number; duration?: number; easing?: [number, number, number, number] }
      ): void;
      on(event: string, callback: (...args: unknown[]) => void): void;
      off(event: string, callback: (...args: unknown[]) => void): void;
    }
  }
  