import React from 'react';

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
  return React.forwardRef<any, any>((props, ref) => {
    const domProps: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(props)) {
      if (!MOTION_PROPS.has(key)) {
        domProps[key] = value;
      }
    }

    return React.createElement(tag, { ...domProps, ref });
  });
}

export const motion = {
  div: createMotionComponent('div'),
  button: createMotionComponent('button'),
  a: createMotionComponent('a'),
  article: createMotionComponent('article'),
};

export const AnimatePresence: React.FC<any> = ({ children }) => (
  <>{children}</>
);
