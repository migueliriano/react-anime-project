module.exports = {
    "extends": ["airbnb"],
    "globals": {
        "fetchMock": false,
        "renderer": false,
        "configureStore": false,
        "thunk": false,
        "shallow": false,
        "toJson": false
    },
    "env": {
        "browser": true,
        "jest": true
    },
    "parser": "babel-eslint",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "import/no-unresolved": 0,
        "import/no-extraneous-dependencies": 0,
        "import/extensions": 0,
        "strict": 0,
    }
};
