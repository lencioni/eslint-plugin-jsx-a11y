/**
 * @fileoverview Enforce onmouseover/onmouseout are accompanied
 *  by onfocus/onblur.
 * @author Ethan Cohen
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import rule from '../../../src/rules/mouse-events-map-to-key-events';
import { RuleTester } from 'eslint';

const parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true
  }
};

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const mouseOverError = {
  message: 'onMouseOver must be accompanied by onFocus for accessibility.',
  type: 'JSXOpeningElement'
};
const mouseOutError = {
  message: 'onMouseOut must be accompanied by onBlur for accessibility.',
  type: 'JSXOpeningElement'
};

ruleTester.run('mouse-events-map-to-key-events', rule, {
  valid: [
    { code: '<div onMouseOver={() => void 0} onFocus={() => void 0} />;', parserOptions },
    { code: '<div onMouseOver={() => void 0} onFocus={() => void 0} {...props} />;', parserOptions },
    { code: '<div onMouseOver={handleMouseOver} onFocus={handleFocus} />;', parserOptions },
    { code: '<div onMouseOver={handleMouseOver} onFocus={handleFocus} {...props} />;', parserOptions },
    { code: '<div />;', parserOptions },
    { code: '<div onMouseOut={() => void 0} onBlur={() => void 0} />', parserOptions },
    { code: '<div onMouseOut={() => void 0} onBlur={() => void 0} {...props} />', parserOptions },
    { code: '<div onMouseOut={handleMouseOut} onBlur={handleOnBlur} />', parserOptions },
    { code: '<div onMouseOut={handleMouseOut} onBlur={handleOnBlur} {...props} />', parserOptions }
  ],
  invalid: [
    { code: '<div onMouseOver={() => void 0} />;', errors: [ mouseOverError ], parserOptions },
    { code: '<div onMouseOut={() => void 0} />', errors: [ mouseOutError ], parserOptions },
    { code: '<div onMouseOver={() => void 0} onFocus={undefined} />;', errors: [ mouseOverError ], parserOptions },
    { code: '<div onMouseOut={() => void 0} onBlur={undefined} />', errors: [ mouseOutError ], parserOptions },
    { code: '<div onMouseOver={() => void 0} {...props} />', errors: [ mouseOverError ], parserOptions },
    { code: '<div onMouseOut={() => void 0} {...props} />', errors: [ mouseOutError ], parserOptions }
  ]
});
