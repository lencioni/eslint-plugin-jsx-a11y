/**
 * @fileoverview Enforce non-interactive elements with click handlers use role attribute.
 * @author Ethan Cohen
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import rule from '../../../src/rules/onclick-uses-role';
import { RuleTester } from 'eslint';

const parserOptions  = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true
  }
};

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const  expectedError  = {
  message: 'Visible, non-interactive elements with click ' +
  'handlers must have role attribute.',
  type: 'JSXOpeningElement'
};

ruleTester.run('onclick-uses-role', rule, {
  valid: [
    { code: '<div onClick={() => void 0} role="button" />;', parserOptions },
    { code: '<div onClick={() => void 0} role={role} />;', parserOptions },
    { code: '<div onClick={() => void 0} role={"button"} />;', parserOptions },
    { code: '<div onClick={() => void 0} role={`${role}`} />;', parserOptions },
    { code: '<div onClick={() => void 0} role="button" {...props} />;', parserOptions },
    { code: '<div className="foo" />;', parserOptions },
    { code: '<div onClick={() => void 0} role="button" aria-hidden />;', parserOptions },
    { code: '<div onClick={() => void 0} role="button" aria-hidden={true} />;', parserOptions },
    { code: '<div onClick={() => void 0} role="button" aria-hidden={false} />;', parserOptions },
    { code: '<div onClick={() => void 0} role="button" aria-hidden={undefined} />;', parserOptions },
    { code: '<input type="text" onClick={() => void 0} />', parserOptions },
    { code: '<input onClick={() => void 0} />', parserOptions },
    { code: '<button onClick={() => void 0} className="foo" />', parserOptions },
    { code: '<option onClick={() => void 0} className="foo" />', parserOptions },
    { code: '<select onClick={() => void 0} className="foo" />', parserOptions },
    { code: '<textarea onClick={() => void 0} className="foo" />', parserOptions },
    { code: '<a tabIndex="0" onClick={() => void 0} />', parserOptions },
    { code: '<a role="button" onClick={() => void 0} />', parserOptions },
    { code: '<a onClick={() => void 0} href="http://x.y.z" />', parserOptions },
    { code: '<a onClick={() => void 0} href="http://x.y.z" tabIndex="0" />', parserOptions },
    { code: '<TestComponent onClick={doFoo} />', parserOptions }
  ],
  invalid: [
    { code: '<div onClick={() => void 0} />;', errors: [ expectedError ], parserOptions },
    { code: '<div onClick={() => void 0} role={undefined} />;', errors: [ expectedError ], parserOptions },
    { code: '<div onClick={() => void 0} {...props} />;', errors: [ expectedError ], parserOptions },
    { code: '<section onClick={() => void 0} />;', errors: [ expectedError ], parserOptions },
    { code: '<main onClick={() => void 0} />;', errors: [ expectedError ], parserOptions },
    { code: '<article onClick={() => void 0} />;', errors: [ expectedError ], parserOptions },
    { code: '<header onClick={() => void 0} />;', errors: [ expectedError ], parserOptions },
    { code: '<footer onClick={() => void 0} />;', errors: [ expectedError ], parserOptions },
    { code: '<div onClick={() => void 0} aria-hidden={false} />;', errors: [ expectedError ], parserOptions },
    { code: '<input onClick={() => void 0} type="hidden" />;', errors: [ expectedError ], parserOptions },
    { code: '<a onClick={() => void 0} />', errors: [ expectedError ], parserOptions }
  ]
});
