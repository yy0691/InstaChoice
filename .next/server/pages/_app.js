/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! framer-motion */ \"framer-motion\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/dynamic */ \"./node_modules/next/dynamic.js\");\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _utils_client_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/client-utils */ \"./src/utils/client-utils.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_2__]);\nframer_motion__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\n\n\n// 创建一个无SSR包装器组件\nconst NoSSR = ({ children })=>{\n    const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{\n        setMounted(true);\n    }, []);\n    if (!mounted) {\n        return null;\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: children\n    }, void 0, false);\n};\nfunction MyApp({ Component, pageProps }) {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    const [isClient, setIsClient] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{\n        setIsClient(true);\n    }, []);\n    // 初始化脚本，仅在客户端执行\n    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{\n        if (!isClient) return;\n        // 根据本地存储或系统偏好设置初始主题\n        const storedTheme = _utils_client_utils__WEBPACK_IMPORTED_MODULE_6__.safeLocalStorage.getItem(\"theme\");\n        const theme = storedTheme === \"dark\" || storedTheme === \"light\" ? storedTheme : (0,_utils_client_utils__WEBPACK_IMPORTED_MODULE_6__.getSystemThemePreference)();\n        (0,_utils_client_utils__WEBPACK_IMPORTED_MODULE_6__.applyTheme)(theme);\n    // 添加其他初始化逻辑...\n    }, []);\n    // 默认加载状态\n    if (!isClient) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"min-h-screen bg-background flex items-center justify-center\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"animate-pulse text-2xl\",\n                children: \"加载中...\"\n            }, void 0, false, {\n                fileName: \"E:\\\\blog\\\\InstaChoice\\\\src\\\\pages\\\\_app.tsx\",\n                lineNumber: 50,\n                columnNumber: 7\n            }, this)\n        }, void 0, false, {\n            fileName: \"E:\\\\blog\\\\InstaChoice\\\\src\\\\pages\\\\_app.tsx\",\n            lineNumber: 49,\n            columnNumber: 12\n        }, this);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(NoSSR, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.AnimatePresence, {\n            mode: \"wait\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {\n                initial: {\n                    opacity: 0,\n                    y: 8\n                },\n                animate: {\n                    opacity: 1,\n                    y: 0\n                },\n                exit: {\n                    opacity: 0,\n                    y: -8\n                },\n                transition: {\n                    duration: 0.3\n                },\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"E:\\\\blog\\\\InstaChoice\\\\src\\\\pages\\\\_app.tsx\",\n                    lineNumber: 64,\n                    columnNumber: 11\n                }, this)\n            }, router.route, false, {\n                fileName: \"E:\\\\blog\\\\InstaChoice\\\\src\\\\pages\\\\_app.tsx\",\n                lineNumber: 57,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"E:\\\\blog\\\\InstaChoice\\\\src\\\\pages\\\\_app.tsx\",\n            lineNumber: 56,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"E:\\\\blog\\\\InstaChoice\\\\src\\\\pages\\\\_app.tsx\",\n        lineNumber: 55,\n        columnNumber: 5\n    }, this);\n}\n// 禁用服务器端渲染\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_dynamic__WEBPACK_IMPORTED_MODULE_5___default()(()=>Promise.resolve(MyApp), {\n    ssr: false\n}));\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBK0I7QUFFeUI7QUFDaEI7QUFDSTtBQUNUO0FBQ3NFO0FBRXpHLGdCQUFnQjtBQUNoQixNQUFNUyxRQUFRLENBQUMsRUFBRUMsUUFBUSxFQUFpQztJQUN4RCxNQUFNLENBQUNDLFNBQVNDLFdBQVcsR0FBR1IsK0NBQVFBLENBQUM7SUFFdkNELGdEQUFTQSxDQUFDO1FBQ1JTLFdBQVc7SUFDYixHQUFHLEVBQUU7SUFFTCxJQUFJLENBQUNELFNBQVM7UUFDWixPQUFPO0lBQ1Q7SUFFQSxxQkFBTztrQkFBR0Q7O0FBQ1o7QUFFQSxTQUFTRyxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFZO0lBQy9DLE1BQU1DLFNBQVNkLHNEQUFTQTtJQUN4QixNQUFNLENBQUNlLFVBQVVDLFlBQVksR0FBR2QsK0NBQVFBLENBQUM7SUFFekNELGdEQUFTQSxDQUFDO1FBQ1JlLFlBQVk7SUFDZCxHQUFHLEVBQUU7SUFFTCxnQkFBZ0I7SUFDaEJmLGdEQUFTQSxDQUFDO1FBQ1IsSUFBSSxDQUFDYyxVQUFVO1FBRWYsb0JBQW9CO1FBQ3BCLE1BQU1FLGNBQWNiLGlFQUFnQkEsQ0FBQ2MsT0FBTyxDQUFDO1FBQzdDLE1BQU1DLFFBQVEsZ0JBQWlCLFVBQVVGLGdCQUFnQixVQUNyREEsY0FDQVgsNkVBQXdCQTtRQUU1QkQsK0RBQVVBLENBQUNjO0lBRVgsZUFBZTtJQUNqQixHQUFHLEVBQUU7SUFFTCxTQUFTO0lBQ1QsSUFBSSxDQUFDSixVQUFVO1FBQ2IscUJBQU8sOERBQUNLO1lBQUlDLFdBQVU7c0JBQ3BCLDRFQUFDRDtnQkFBSUMsV0FBVTswQkFBeUI7Ozs7Ozs7Ozs7O0lBRTVDO0lBRUEscUJBQ0UsOERBQUNkO2tCQUNDLDRFQUFDVCwwREFBZUE7WUFBQ3dCLE1BQUs7c0JBQ3BCLDRFQUFDdkIsaURBQU1BLENBQUNxQixHQUFHO2dCQUVURyxTQUFTO29CQUFFQyxTQUFTO29CQUFHQyxHQUFHO2dCQUFFO2dCQUM1QkMsU0FBUztvQkFBRUYsU0FBUztvQkFBR0MsR0FBRztnQkFBRTtnQkFDNUJFLE1BQU07b0JBQUVILFNBQVM7b0JBQUdDLEdBQUcsQ0FBQztnQkFBRTtnQkFDMUJHLFlBQVk7b0JBQUVDLFVBQVU7Z0JBQUk7MEJBRTVCLDRFQUFDakI7b0JBQVcsR0FBR0MsU0FBUzs7Ozs7O2VBTm5CQyxPQUFPZ0IsS0FBSzs7Ozs7Ozs7Ozs7Ozs7O0FBVzNCO0FBRUEsV0FBVztBQUNYLGlFQUFlM0IsbURBQU9BLENBQUMsSUFBTTRCLFFBQVFDLE9BQU8sQ0FBQ3JCLFFBQVE7SUFBRXNCLEtBQUs7QUFBTSxFQUFFLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbnN0YWNob2ljZS8uL3NyYy9wYWdlcy9fYXBwLnRzeD9mOWQ2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJztcclxuaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJztcclxuaW1wb3J0IHsgQW5pbWF0ZVByZXNlbmNlLCBtb3Rpb24gfSBmcm9tICdmcmFtZXItbW90aW9uJztcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xyXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgZHluYW1pYyBmcm9tICduZXh0L2R5bmFtaWMnO1xyXG5pbXBvcnQgeyBpc0NsaWVudCwgc2FmZUxvY2FsU3RvcmFnZSwgYXBwbHlUaGVtZSwgZ2V0U3lzdGVtVGhlbWVQcmVmZXJlbmNlIH0gZnJvbSAnLi4vdXRpbHMvY2xpZW50LXV0aWxzJztcclxuXHJcbi8vIOWIm+W7uuS4gOS4quaXoFNTUuWMheijheWZqOe7hOS7tlxyXG5jb25zdCBOb1NTUiA9ICh7IGNoaWxkcmVuIH06IHsgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZSB9KSA9PiB7XHJcbiAgY29uc3QgW21vdW50ZWQsIHNldE1vdW50ZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIFxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBzZXRNb3VudGVkKHRydWUpO1xyXG4gIH0sIFtdKTtcclxuICBcclxuICBpZiAoIW1vdW50ZWQpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICBcclxuICByZXR1cm4gPD57Y2hpbGRyZW59PC8+O1xyXG59O1xyXG5cclxuZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xyXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xyXG4gIGNvbnN0IFtpc0NsaWVudCwgc2V0SXNDbGllbnRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIFxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBzZXRJc0NsaWVudCh0cnVlKTtcclxuICB9LCBbXSk7XHJcbiAgXHJcbiAgLy8g5Yid5aeL5YyW6ISa5pys77yM5LuF5Zyo5a6i5oi356uv5omn6KGMXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaXNDbGllbnQpIHJldHVybjtcclxuICAgIFxyXG4gICAgLy8g5qC55o2u5pys5Zyw5a2Y5YKo5oiW57O757uf5YGP5aW96K6+572u5Yid5aeL5Li76aKYXHJcbiAgICBjb25zdCBzdG9yZWRUaGVtZSA9IHNhZmVMb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGhlbWUnKTtcclxuICAgIGNvbnN0IHRoZW1lID0gKHN0b3JlZFRoZW1lID09PSAnZGFyaycgfHwgc3RvcmVkVGhlbWUgPT09ICdsaWdodCcpIFxyXG4gICAgICA/IHN0b3JlZFRoZW1lIGFzICdkYXJrJyB8ICdsaWdodCdcclxuICAgICAgOiBnZXRTeXN0ZW1UaGVtZVByZWZlcmVuY2UoKTtcclxuICAgICAgXHJcbiAgICBhcHBseVRoZW1lKHRoZW1lKTtcclxuICAgIFxyXG4gICAgLy8g5re75Yqg5YW25LuW5Yid5aeL5YyW6YC76L6RLi4uXHJcbiAgfSwgW10pO1xyXG4gIFxyXG4gIC8vIOm7mOiupOWKoOi9veeKtuaAgVxyXG4gIGlmICghaXNDbGllbnQpIHtcclxuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1iYWNrZ3JvdW5kIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5pbWF0ZS1wdWxzZSB0ZXh0LTJ4bFwiPuWKoOi9veS4rS4uLjwvZGl2PlxyXG4gICAgPC9kaXY+O1xyXG4gIH1cclxuICBcclxuICByZXR1cm4gKFxyXG4gICAgPE5vU1NSPlxyXG4gICAgICA8QW5pbWF0ZVByZXNlbmNlIG1vZGU9XCJ3YWl0XCI+XHJcbiAgICAgICAgPG1vdGlvbi5kaXZcclxuICAgICAgICAgIGtleT17cm91dGVyLnJvdXRlfVxyXG4gICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiA4IH19XHJcbiAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHk6IDAgfX1cclxuICAgICAgICAgIGV4aXQ9e3sgb3BhY2l0eTogMCwgeTogLTggfX1cclxuICAgICAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDAuMyB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgICAgICA8L21vdGlvbi5kaXY+XHJcbiAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxyXG4gICAgPC9Ob1NTUj5cclxuICApO1xyXG59XHJcblxyXG4vLyDnpoHnlKjmnI3liqHlmajnq6/muLLmn5NcclxuZXhwb3J0IGRlZmF1bHQgZHluYW1pYygoKSA9PiBQcm9taXNlLnJlc29sdmUoTXlBcHApLCB7IHNzcjogZmFsc2UgfSk7ICJdLCJuYW1lcyI6WyJBbmltYXRlUHJlc2VuY2UiLCJtb3Rpb24iLCJ1c2VSb3V0ZXIiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsImR5bmFtaWMiLCJzYWZlTG9jYWxTdG9yYWdlIiwiYXBwbHlUaGVtZSIsImdldFN5c3RlbVRoZW1lUHJlZmVyZW5jZSIsIk5vU1NSIiwiY2hpbGRyZW4iLCJtb3VudGVkIiwic2V0TW91bnRlZCIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwicm91dGVyIiwiaXNDbGllbnQiLCJzZXRJc0NsaWVudCIsInN0b3JlZFRoZW1lIiwiZ2V0SXRlbSIsInRoZW1lIiwiZGl2IiwiY2xhc3NOYW1lIiwibW9kZSIsImluaXRpYWwiLCJvcGFjaXR5IiwieSIsImFuaW1hdGUiLCJleGl0IiwidHJhbnNpdGlvbiIsImR1cmF0aW9uIiwicm91dGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNzciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/utils/client-utils.ts":
/*!***********************************!*\
  !*** ./src/utils/client-utils.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   applyTheme: () => (/* binding */ applyTheme),\n/* harmony export */   generateRandomMatch: () => (/* binding */ generateRandomMatch),\n/* harmony export */   generateRandomPrice: () => (/* binding */ generateRandomPrice),\n/* harmony export */   getCurrentTheme: () => (/* binding */ getCurrentTheme),\n/* harmony export */   getSystemThemePreference: () => (/* binding */ getSystemThemePreference),\n/* harmony export */   isClient: () => (/* binding */ isClient),\n/* harmony export */   safeLocalStorage: () => (/* binding */ safeLocalStorage),\n/* harmony export */   setSafeLocalStorage: () => (/* binding */ setSafeLocalStorage)\n/* harmony export */ });\n/**\r\n * 客户端实用工具函数\r\n * 这些函数应该只在客户端使用，或者通过useEffect安全调用\r\n */ // 检查是否在客户端环境\nconst isClient = \"undefined\" !== \"undefined\";\n// 生成随机价格 (仅客户端使用)\nfunction generateRandomPrice(min = 1000, max = 10000) {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n}\n// 生成随机匹配度 (仅客户端使用)\nfunction generateRandomMatch(min = 75, max = 98) {\n    if (!isClient) return 0; // 服务器端返回默认值\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n}\n// 安全获取本地存储\nconst safeLocalStorage = {\n    getItem: (key)=>{\n        if (isClient) {\n            return localStorage.getItem(key);\n        }\n        return null;\n    },\n    setItem: (key, value)=>{\n        if (isClient) {\n            localStorage.setItem(key, value);\n        }\n    },\n    removeItem: (key)=>{\n        if (isClient) {\n            localStorage.removeItem(key);\n        }\n    }\n};\n// 安全设置本地存储\nfunction setSafeLocalStorage(key, value) {\n    if (isClient) {\n        localStorage.setItem(key, value);\n    }\n}\n// 获取系统颜色模式偏好\nfunction getSystemThemePreference() {\n    if (!isClient) return \"light\";\n    return window.matchMedia(\"(prefers-color-scheme: dark)\").matches ? \"dark\" : \"light\";\n}\n// 应用主题到HTML元素\nfunction applyTheme(theme) {\n    if (!isClient) return;\n    if (theme === \"dark\") {\n        document.documentElement.classList.add(\"dark\");\n    } else {\n        document.documentElement.classList.remove(\"dark\");\n    }\n}\n// 获取当前应用的主题\nfunction getCurrentTheme() {\n    if (!isClient) return \"light\";\n    return document.documentElement.classList.contains(\"dark\") ? \"dark\" : \"light\";\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdXRpbHMvY2xpZW50LXV0aWxzLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7OztDQUdDLEdBRUQsYUFBYTtBQUNOLE1BQU1BLFdBQVcsZ0JBQWtCLFlBQVk7QUFFdEQsa0JBQWtCO0FBQ1gsU0FBU0Msb0JBQW9CQyxNQUFjLElBQUksRUFBRUMsTUFBYyxLQUFLO0lBQ3pFLE9BQU9DLEtBQUtDLEtBQUssQ0FBQ0QsS0FBS0UsTUFBTSxLQUFNSCxDQUFBQSxNQUFNRCxNQUFNLE1BQU1BO0FBQ3ZEO0FBRUEsbUJBQW1CO0FBQ1osU0FBU0ssb0JBQW9CTCxNQUFjLEVBQUUsRUFBRUMsTUFBYyxFQUFFO0lBQ3BFLElBQUksQ0FBQ0gsVUFBVSxPQUFPLEdBQUcsWUFBWTtJQUNyQyxPQUFPSSxLQUFLQyxLQUFLLENBQUNELEtBQUtFLE1BQU0sS0FBTUgsQ0FBQUEsTUFBTUQsTUFBTSxNQUFNQTtBQUN2RDtBQUVBLFdBQVc7QUFDSixNQUFNTSxtQkFBbUI7SUFDOUJDLFNBQVMsQ0FBQ0M7UUFDUixJQUFJVixVQUFVO1lBQ1osT0FBT1csYUFBYUYsT0FBTyxDQUFDQztRQUM5QjtRQUNBLE9BQU87SUFDVDtJQUNBRSxTQUFTLENBQUNGLEtBQWFHO1FBQ3JCLElBQUliLFVBQVU7WUFDWlcsYUFBYUMsT0FBTyxDQUFDRixLQUFLRztRQUM1QjtJQUNGO0lBQ0FDLFlBQVksQ0FBQ0o7UUFDWCxJQUFJVixVQUFVO1lBQ1pXLGFBQWFHLFVBQVUsQ0FBQ0o7UUFDMUI7SUFDRjtBQUNGLEVBQUU7QUFFRixXQUFXO0FBQ0osU0FBU0ssb0JBQW9CTCxHQUFXLEVBQUVHLEtBQWE7SUFDNUQsSUFBSWIsVUFBVTtRQUNaVyxhQUFhQyxPQUFPLENBQUNGLEtBQUtHO0lBQzVCO0FBQ0Y7QUFFQSxhQUFhO0FBQ04sU0FBU0c7SUFDZCxJQUFJLENBQUNoQixVQUFVLE9BQU87SUFDdEIsT0FBT2lCLE9BQU9DLFVBQVUsQ0FBQyxnQ0FBZ0NDLE9BQU8sR0FBRyxTQUFTO0FBQzlFO0FBRUEsY0FBYztBQUNQLFNBQVNDLFdBQVdDLEtBQXVCO0lBQ2hELElBQUksQ0FBQ3JCLFVBQVU7SUFFZixJQUFJcUIsVUFBVSxRQUFRO1FBQ3BCQyxTQUFTQyxlQUFlLENBQUNDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDO0lBQ3pDLE9BQU87UUFDTEgsU0FBU0MsZUFBZSxDQUFDQyxTQUFTLENBQUNFLE1BQU0sQ0FBQztJQUM1QztBQUNGO0FBRUEsWUFBWTtBQUNMLFNBQVNDO0lBQ2QsSUFBSSxDQUFDM0IsVUFBVSxPQUFPO0lBQ3RCLE9BQU9zQixTQUFTQyxlQUFlLENBQUNDLFNBQVMsQ0FBQ0ksUUFBUSxDQUFDLFVBQVUsU0FBUztBQUN4RSIsInNvdXJjZXMiOlsid2VicGFjazovL2luc3RhY2hvaWNlLy4vc3JjL3V0aWxzL2NsaWVudC11dGlscy50cz85YzAxIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDlrqLmiLfnq6/lrp7nlKjlt6Xlhbflh73mlbBcclxuICog6L+Z5Lqb5Ye95pWw5bqU6K+l5Y+q5Zyo5a6i5oi356uv5L2/55So77yM5oiW6ICF6YCa6L+HdXNlRWZmZWN05a6J5YWo6LCD55SoXHJcbiAqL1xyXG5cclxuLy8g5qOA5p+l5piv5ZCm5Zyo5a6i5oi356uv546v5aKDXHJcbmV4cG9ydCBjb25zdCBpc0NsaWVudCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xyXG5cclxuLy8g55Sf5oiQ6ZqP5py65Lu35qC8ICjku4XlrqLmiLfnq6/kvb/nlKgpXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVJhbmRvbVByaWNlKG1pbjogbnVtYmVyID0gMTAwMCwgbWF4OiBudW1iZXIgPSAxMDAwMCk6IG51bWJlciB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XHJcbn1cclxuXHJcbi8vIOeUn+aIkOmaj+acuuWMuemFjeW6piAo5LuF5a6i5oi356uv5L2/55SoKVxyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVSYW5kb21NYXRjaChtaW46IG51bWJlciA9IDc1LCBtYXg6IG51bWJlciA9IDk4KTogbnVtYmVyIHtcclxuICBpZiAoIWlzQ2xpZW50KSByZXR1cm4gMDsgLy8g5pyN5Yqh5Zmo56uv6L+U5Zue6buY6K6k5YC8XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XHJcbn1cclxuXHJcbi8vIOWuieWFqOiOt+WPluacrOWcsOWtmOWCqFxyXG5leHBvcnQgY29uc3Qgc2FmZUxvY2FsU3RvcmFnZSA9IHtcclxuICBnZXRJdGVtOiAoa2V5OiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsID0+IHtcclxuICAgIGlmIChpc0NsaWVudCkge1xyXG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH0sXHJcbiAgc2V0SXRlbTogKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICBpZiAoaXNDbGllbnQpIHtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICByZW1vdmVJdGVtOiAoa2V5OiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgIGlmIChpc0NsaWVudCkge1xyXG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8vIOWuieWFqOiuvue9ruacrOWcsOWtmOWCqFxyXG5leHBvcnQgZnVuY3Rpb24gc2V0U2FmZUxvY2FsU3RvcmFnZShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gIGlmIChpc0NsaWVudCkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDojrflj5bns7vnu5/popzoibLmqKHlvI/lgY/lpb1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFN5c3RlbVRoZW1lUHJlZmVyZW5jZSgpOiAnZGFyaycgfCAnbGlnaHQnIHtcclxuICBpZiAoIWlzQ2xpZW50KSByZXR1cm4gJ2xpZ2h0JztcclxuICByZXR1cm4gd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzID8gJ2RhcmsnIDogJ2xpZ2h0JztcclxufVxyXG5cclxuLy8g5bqU55So5Li76aKY5YiwSFRNTOWFg+e0oFxyXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlUaGVtZSh0aGVtZTogJ2RhcmsnIHwgJ2xpZ2h0Jyk6IHZvaWQge1xyXG4gIGlmICghaXNDbGllbnQpIHJldHVybjtcclxuICBcclxuICBpZiAodGhlbWUgPT09ICdkYXJrJykge1xyXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2RhcmsnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RhcmsnKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOiOt+WPluW9k+WJjeW6lOeUqOeahOS4u+mimFxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFRoZW1lKCk6ICdkYXJrJyB8ICdsaWdodCcge1xyXG4gIGlmICghaXNDbGllbnQpIHJldHVybiAnbGlnaHQnO1xyXG4gIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkYXJrJykgPyAnZGFyaycgOiAnbGlnaHQnO1xyXG59ICJdLCJuYW1lcyI6WyJpc0NsaWVudCIsImdlbmVyYXRlUmFuZG9tUHJpY2UiLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnZW5lcmF0ZVJhbmRvbU1hdGNoIiwic2FmZUxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJrZXkiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwidmFsdWUiLCJyZW1vdmVJdGVtIiwic2V0U2FmZUxvY2FsU3RvcmFnZSIsImdldFN5c3RlbVRoZW1lUHJlZmVyZW5jZSIsIndpbmRvdyIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwiYXBwbHlUaGVtZSIsInRoZW1lIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJnZXRDdXJyZW50VGhlbWUiLCJjb250YWlucyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/utils/client-utils.ts\n");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ "framer-motion":
/*!********************************!*\
  !*** external "framer-motion" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = import("framer-motion");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./src/pages/_app.tsx")));
module.exports = __webpack_exports__;

})();