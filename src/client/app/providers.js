"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Providers = void 0;
const next_js_1 = require("@chakra-ui/next-js");
const react_1 = require("@chakra-ui/react");
function Providers({ children }) {
    return (<next_js_1.CacheProvider>
            <react_1.ChakraProvider>
                {children}
            </react_1.ChakraProvider>
        </next_js_1.CacheProvider>);
}
exports.Providers = Providers;
