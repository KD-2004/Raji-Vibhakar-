import React from 'react';

type MotionOnlyProps = {
  initial?: unknown;
  animate?: unknown;
  exit?: unknown;
  transition?: unknown;
  whileHover?: unknown;
  whileTap?: unknown;
  whileInView?: unknown;
  viewport?: unknown;
  layoutId?: unknown;
};

const MOTION_PROPS = new Set([
  'initial',
  'animate',
  'exit',
  'transition',
  'whileHover',
  'whileTap',
  'whileInView',
  'viewport',
  'layoutId',
]);

function createMotionComponent(tag: 'div' | 'button' | 'a' | 'article') {
  return React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & MotionOnlyProps>(
    (props, ref) => {
      const domProps: Record<string, unknown> = {};

      for (const [key, value] of Object.entries(props)) {
        if (!MOTION_PROPS.has(key)) {
          domProps[key] = value;
        }
      }

      return React.createElement(tag, { ...domProps, ref });
    },
  );
}

export const motion = {
  div: createMotionComponent('div'),
  button: createMotionComponent('button'),
  a: createMotionComponent('a'),
  article: createMotionComponent('article'),
};

export const AnimatePresence: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>{children}</>
);
