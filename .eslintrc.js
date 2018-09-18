module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
      "eslint:recommended"
    ],
    "parserOptions": {
      "ecmaVersion": 8,
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "globals": {
      "test": true,
      "expect": true,
      "describe": true,
      "beforeAll": true,
      "HTMLElement": true,
      "io": true,
      "window": true,
      "document": true,
      "beforeEach": true,
      "afterAll": true,
      "afterEach": true,
      "jest": true,
      "WebSocket": true
    },
    "rules": {
        "react/prop-types": 0,
        "no-empty": 0,
        "indent": [
            "error",
            2
        ],
        "linebreak-style": 0,
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "prefer-const": 1,
        "no-console": 0
    }
};
