/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/uuid/index.js":
/*!************************************!*\
  !*** ./node_modules/uuid/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var v1 = __webpack_require__(/*! ./v1 */ \"./node_modules/uuid/v1.js\");\nvar v4 = __webpack_require__(/*! ./v4 */ \"./node_modules/uuid/v4.js\");\n\nvar uuid = v4;\nuuid.v1 = v1;\nuuid.v4 = v4;\n\nmodule.exports = uuid;\n\n\n//# sourceURL=webpack:///./node_modules/uuid/index.js?");

/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\nvar byteToHex = [];\nfor (var i = 0; i < 256; ++i) {\n  byteToHex[i] = (i + 0x100).toString(16).substr(1);\n}\n\nfunction bytesToUuid(buf, offset) {\n  var i = offset || 0;\n  var bth = byteToHex;\n  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4\n  return ([bth[buf[i++]], bth[buf[i++]], \n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]],\n\tbth[buf[i++]], bth[buf[i++]],\n\tbth[buf[i++]], bth[buf[i++]]]).join('');\n}\n\nmodule.exports = bytesToUuid;\n\n\n//# sourceURL=webpack:///./node_modules/uuid/lib/bytesToUuid.js?");

/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Unique ID creation requires a high quality random # generator.  In the\n// browser this is a little complicated due to unknown quality of Math.random()\n// and inconsistent support for the `crypto` API.  We do the best we can via\n// feature-detection\n\n// getRandomValues needs to be invoked in a context where \"this\" is a Crypto\n// implementation. Also, find the complete implementation of crypto on IE11.\nvar getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||\n                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));\n\nif (getRandomValues) {\n  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto\n  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef\n\n  module.exports = function whatwgRNG() {\n    getRandomValues(rnds8);\n    return rnds8;\n  };\n} else {\n  // Math.random()-based (RNG)\n  //\n  // If all else fails, use Math.random().  It's fast, but is of unspecified\n  // quality.\n  var rnds = new Array(16);\n\n  module.exports = function mathRNG() {\n    for (var i = 0, r; i < 16; i++) {\n      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;\n      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;\n    }\n\n    return rnds;\n  };\n}\n\n\n//# sourceURL=webpack:///./node_modules/uuid/lib/rng-browser.js?");

/***/ }),

/***/ "./node_modules/uuid/v1.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var rng = __webpack_require__(/*! ./lib/rng */ \"./node_modules/uuid/lib/rng-browser.js\");\nvar bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ \"./node_modules/uuid/lib/bytesToUuid.js\");\n\n// **`v1()` - Generate time-based UUID**\n//\n// Inspired by https://github.com/LiosK/UUID.js\n// and http://docs.python.org/library/uuid.html\n\nvar _nodeId;\nvar _clockseq;\n\n// Previous uuid creation time\nvar _lastMSecs = 0;\nvar _lastNSecs = 0;\n\n// See https://github.com/broofa/node-uuid for API details\nfunction v1(options, buf, offset) {\n  var i = buf && offset || 0;\n  var b = buf || [];\n\n  options = options || {};\n  var node = options.node || _nodeId;\n  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;\n\n  // node and clockseq need to be initialized to random values if they're not\n  // specified.  We do this lazily to minimize issues related to insufficient\n  // system entropy.  See #189\n  if (node == null || clockseq == null) {\n    var seedBytes = rng();\n    if (node == null) {\n      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)\n      node = _nodeId = [\n        seedBytes[0] | 0x01,\n        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]\n      ];\n    }\n    if (clockseq == null) {\n      // Per 4.2.2, randomize (14 bit) clockseq\n      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;\n    }\n  }\n\n  // UUID timestamps are 100 nano-second units since the Gregorian epoch,\n  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so\n  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'\n  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.\n  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();\n\n  // Per 4.2.1.2, use count of uuid's generated during the current clock\n  // cycle to simulate higher resolution clock\n  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;\n\n  // Time since last uuid creation (in msecs)\n  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;\n\n  // Per 4.2.1.2, Bump clockseq on clock regression\n  if (dt < 0 && options.clockseq === undefined) {\n    clockseq = clockseq + 1 & 0x3fff;\n  }\n\n  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new\n  // time interval\n  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {\n    nsecs = 0;\n  }\n\n  // Per 4.2.1.2 Throw error if too many uuids are requested\n  if (nsecs >= 10000) {\n    throw new Error('uuid.v1(): Can\\'t create more than 10M uuids/sec');\n  }\n\n  _lastMSecs = msecs;\n  _lastNSecs = nsecs;\n  _clockseq = clockseq;\n\n  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch\n  msecs += 12219292800000;\n\n  // `time_low`\n  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;\n  b[i++] = tl >>> 24 & 0xff;\n  b[i++] = tl >>> 16 & 0xff;\n  b[i++] = tl >>> 8 & 0xff;\n  b[i++] = tl & 0xff;\n\n  // `time_mid`\n  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;\n  b[i++] = tmh >>> 8 & 0xff;\n  b[i++] = tmh & 0xff;\n\n  // `time_high_and_version`\n  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version\n  b[i++] = tmh >>> 16 & 0xff;\n\n  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)\n  b[i++] = clockseq >>> 8 | 0x80;\n\n  // `clock_seq_low`\n  b[i++] = clockseq & 0xff;\n\n  // `node`\n  for (var n = 0; n < 6; ++n) {\n    b[i + n] = node[n];\n  }\n\n  return buf ? buf : bytesToUuid(b);\n}\n\nmodule.exports = v1;\n\n\n//# sourceURL=webpack:///./node_modules/uuid/v1.js?");

/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var rng = __webpack_require__(/*! ./lib/rng */ \"./node_modules/uuid/lib/rng-browser.js\");\nvar bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ \"./node_modules/uuid/lib/bytesToUuid.js\");\n\nfunction v4(options, buf, offset) {\n  var i = buf && offset || 0;\n\n  if (typeof(options) == 'string') {\n    buf = options === 'binary' ? new Array(16) : null;\n    options = null;\n  }\n  options = options || {};\n\n  var rnds = options.random || (options.rng || rng)();\n\n  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n  rnds[6] = (rnds[6] & 0x0f) | 0x40;\n  rnds[8] = (rnds[8] & 0x3f) | 0x80;\n\n  // Copy bytes to buffer, if provided\n  if (buf) {\n    for (var ii = 0; ii < 16; ++ii) {\n      buf[i + ii] = rnds[ii];\n    }\n  }\n\n  return buf || bytesToUuid(rnds);\n}\n\nmodule.exports = v4;\n\n\n//# sourceURL=webpack:///./node_modules/uuid/v4.js?");

/***/ }),

/***/ "./src/card-const.js":
/*!***************************!*\
  !*** ./src/card-const.js ***!
  \***************************/
/*! exports provided: cardColors, defaultCardInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cardColors\", function() { return cardColors; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defaultCardInfo\", function() { return defaultCardInfo; });\nconst cardColors = {\r\n    \"default\": \"rgb(231, 231, 231)\",\r\n    \"keep\": \"rgb(135, 206, 250)\",\r\n    \"problem\": \"rgb(244, 164, 96)\",\r\n    \"try\": \"rgb(152, 251, 152)\"\r\n};\r\n\r\n/*山田さんのCSSによって変更する*/\r\nconst defaultCardInfo = {\r\n    \"cardNo\": \"\",\r\n    \"topPosition\": \"550px\",\r\n    \"leftPosition\": \"900px\",\r\n    \"color\": cardColors.default,\r\n    \"text\": \"\"\r\n};\n\n//# sourceURL=webpack:///./src/card-const.js?");

/***/ }),

/***/ "./src/card.js":
/*!*********************!*\
  !*** ./src/card.js ***!
  \*********************/
/*! exports provided: default, changeCardColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Card; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeCardColor\", function() { return changeCardColor; });\n/* harmony import */ var _card_const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card-const */ \"./src/card-const.js\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/index.js\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\n//グローバル変数設定\r\nlet clickedTopPosition;\r\nlet clickedLeftPosition;\r\n\r\nclass Card{\r\n    constructor(cardInfo){\r\n        const cardId = Object(uuid__WEBPACK_IMPORTED_MODULE_1__[\"v4\"])()\r\n\r\n        // カードdiv生成\r\n        const cardDiv = document.createElement(\"div\");\r\n        cardDiv.setAttribute(\"id\", cardId)\r\n        cardDiv.setAttribute(\"class\", \"cardDiv\");\r\n        cardDiv.setAttribute(\"style\", `top: ${cardInfo.topPosition}; left: ${cardInfo.leftPosition}`);\r\n\r\n        // テキストエリア生成\r\n        const textarea = document.createElement(\"textarea\");\r\n        textarea.setAttribute(\"class\", \"textarea\");\r\n        textarea.setAttribute(\"style\", \" background-color: \" + cardInfo.color)\r\n        textarea.innerHTML = cardInfo.text\r\n    \r\n        // カードカラー変更用ボタン生成\r\n        const changeColorButton = document.createElement(\"button\");\r\n        changeColorButton.setAttribute(\"class\", \"changeColorButton\")\r\n        changeColorButton.setAttribute(\"onclick\", \"changeCardColor(this)\")\r\n        changeColorButton.innerHTML = \"+\";\r\n    \r\n        // カードdivに要素を追加\r\n        cardDiv.appendChild(textarea);\r\n        cardDiv.appendChild(document.createElement(\"br\"));\r\n        cardDiv.appendChild(changeColorButton);\r\n    \r\n        // カードを表示\r\n        const locationForDraggable = document.getElementById(\"cardCreationArea\");\r\n        locationForDraggable.appendChild(cardDiv)\r\n\r\n\r\n        // ドラッグアンドドロップ機能追加\r\n        cardDiv.addEventListener(\"mousedown\", glabCard, false);\r\n        cardDiv.addEventListener(\"touchstart\", glabCard, false);\r\n    }\r\n}\r\n\r\n// マウスがクリックされた場合実行\r\nfunction glabCard(e) {\r\n    const cursorEvent = e\r\n\r\n    //タッチイベントとマウスイベントは差異があるためイベントの差異を吸収\r\n    if (e.type != \"mousedown\") {\r\n        // イベントがタッチイベントだった場合\r\n        cursorEvent = e.changedTouches[0];\r\n    }\r\n\r\n    // 要素内の相対座標を取得\r\n    clickedLeftPosition = cursorEvent.pageX - this.offsetLeft;\r\n    clickedTopPosition = cursorEvent.pageY - this.offsetTop;\r\n\r\n    this.addEventListener(\"mousemove\", dragCard, false);\r\n    this.addEventListener(\"touchmove\", dragCard, false);\r\n\r\n    this.addEventListener(\"mouseup\", dropCard, false);\r\n    this.addEventListener(\"mouseleave\", dropCard, false);\r\n    this.addEventListener(\"touchend\", dropCard, false);\r\n    this.addEventListener(\"touchleave\", dropCard, false);\r\n}\r\n\r\n\r\n//マウスカーソルが動いた場合実行\r\nfunction dragCard(e) {\r\n    const cursorEvent = e\r\n\r\n    // マウスとタッチの差異を吸収\r\n    if (e.type != \"mousemove\") {\r\n        // イベントがタッチイベントだった場合\r\n        cursorEvent = e.changedTouches[0];\r\n    }\r\n\r\n    // フリックしたときに画面を動かさないようにデフォルト動作を抑制\r\n    cursorEvent.preventDefault();\r\n\r\n    // マウスが動いた場所に要素を動かす\r\n    this.style.top = `${cursorEvent.pageY - clickedTopPosition}px`;\r\n    this.style.left = `${cursorEvent.pageX - clickedLeftPosition}px`;\r\n}\r\n\r\n// マウスボタンが上がったら発火\r\nfunction dropCard(e) {\r\n    // 対象外の要素にも反応してしまうためエラー回避\r\n    if (this != undefined) {\r\n        //イベントリスナーの消去\r\n        this.removeEventListener(\"mousemove\", dragCard, false);\r\n        this.removeEventListener(\"mouseup\", dropCard, false);\r\n        this.removeEventListener(\"touchmove\", dragCard, false);\r\n        this.removeEventListener(\"touchend\", dropCard, false);\r\n    }\r\n}\r\n\r\nfunction changeCardColor(clickedElementInfo) {\r\n    const clickedCardId = clickedElementInfo.parentNode.id;\r\n\r\n    // 色の変更\r\n    switch (document.getElementById(clickedCardId).children[0].style.backgroundColor) {\r\n        case _card_const__WEBPACK_IMPORTED_MODULE_0__[\"cardColors\"].default:\r\n            document.getElementById(clickedCardId).children[0].style.backgroundColor = _card_const__WEBPACK_IMPORTED_MODULE_0__[\"cardColors\"].keep;\r\n            break;\r\n\r\n        case _card_const__WEBPACK_IMPORTED_MODULE_0__[\"cardColors\"].keep:\r\n            document.getElementById(clickedCardId).children[0].style.backgroundColor = _card_const__WEBPACK_IMPORTED_MODULE_0__[\"cardColors\"].problem;\r\n            break;\r\n\r\n        case _card_const__WEBPACK_IMPORTED_MODULE_0__[\"cardColors\"].problem:\r\n            document.getElementById(clickedCardId).children[0].style.backgroundColor = _card_const__WEBPACK_IMPORTED_MODULE_0__[\"cardColors\"].try;\r\n            break;\r\n\r\n        case _card_const__WEBPACK_IMPORTED_MODULE_0__[\"cardColors\"].try:\r\n            document.getElementById(clickedCardId).children[0].style.backgroundColor = _card_const__WEBPACK_IMPORTED_MODULE_0__[\"cardColors\"].default;\r\n            break;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/card.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card */ \"./src/card.js\");\n/* harmony import */ var _card_const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card-const */ \"./src/card-const.js\");\n\r\n\r\n\r\nwindow.createCard = createCard\r\nwindow.changeCardColor = _card__WEBPACK_IMPORTED_MODULE_0__[\"changeCardColor\"]\r\n\r\n// カード作成関数\r\nfunction createCard(cardInfo = _card_const__WEBPACK_IMPORTED_MODULE_1__[\"defaultCardInfo\"]) {\r\n    new _card__WEBPACK_IMPORTED_MODULE_0__[\"default\"](cardInfo)\r\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });