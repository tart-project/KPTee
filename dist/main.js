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
/*! exports provided: colors, defaultCardInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"colors\", function() { return colors; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defaultCardInfo\", function() { return defaultCardInfo; });\nconst colors = {\n    \"default\": \"rgb(231, 231, 231)\",\n    \"keep\": \"rgb(135, 206, 250)\",\n    \"problem\": \"rgb(244, 164, 96)\",\n    \"try\": \"rgb(152, 251, 152)\"\n};\n\n/*山田さんのCSSによって変更する*/\nconst defaultCardInfo = {\n    \"cardId\": \"\",\n    \"topPosition\": \"300px\",\n    \"leftPosition\": \"650px\",\n    \"color\": colors.default,\n    \"text\": \"\",\n    \"width\": \"\",\n    \"height\": \"\",\n    \"changeColorButton\": {\"color\": colors.keep}\n};\n\n//# sourceURL=webpack:///./src/card-const.js?");

/***/ }),

/***/ "./src/card.js":
/*!*********************!*\
  !*** ./src/card.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Card; });\n/* harmony import */ var _card_const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card-const */ \"./src/card-const.js\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/index.js\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n//グローバル変数設定\nlet clickedTopPosition;\nlet clickedLeftPosition;\n\nclass Card {\n    constructor(cardInfo = _card_const__WEBPACK_IMPORTED_MODULE_0__[\"defaultCardInfo\"]) {\n        this.cardId = Object(uuid__WEBPACK_IMPORTED_MODULE_1__[\"v4\"])()\n\n        // カードdiv生成\n        const cardDiv = document.createElement(\"div\");\n        cardDiv.setAttribute(\"id\", this.cardId)\n        cardDiv.setAttribute(\"class\", \"cardDiv\");\n        cardDiv.setAttribute(\"style\", `top: ${cardInfo.topPosition}; left: ${cardInfo.leftPosition}`);\n\n        // テキストエリア生成\n        const textarea = document.createElement(\"textarea\");\n        textarea.setAttribute(\"class\", \"textarea\");\n        textarea.setAttribute(\"style\", `background-color: ${cardInfo.color}; width: ${cardInfo.width}; height: ${cardInfo.height}`)\n        textarea.innerHTML = cardInfo.text\n\n        // カードカラー変更用ボタン生成\n        const changeColorButton = document.createElement(\"button\");\n        changeColorButton.setAttribute(\"class\", \"changeColorButton\")\n        changeColorButton.setAttribute(\"onclick\", \"changeCardColor(this)\")\n        changeColorButton.setAttribute(\"style\", `background-color: ${cardInfo.changeColorButton.color};`)\n\n        // カード削除用ボタン生成\n        const deleteCardButton = document.createElement(\"button\");\n        deleteCardButton.setAttribute(\"class\", \"deleteCardButton\")\n        deleteCardButton.setAttribute(\"onclick\", \"deleteCard(this)\")\n        deleteCardButton.innerHTML = \"×\";\n\n        // カードdivに要素を追加\n        cardDiv.appendChild(textarea);\n        cardDiv.appendChild(document.createElement(\"br\"));\n        cardDiv.appendChild(changeColorButton);\n        cardDiv.appendChild(deleteCardButton);\n\n        // カードを表示\n        const locationForDraggable = document.getElementById(\"cardCreationArea\");\n        locationForDraggable.appendChild(cardDiv)\n\n        // ドラッグアンドドロップ機能追加\n        cardDiv.addEventListener(\"mousedown\", glabCard, false);\n        cardDiv.addEventListener(\"touchstart\", glabCard, false);\n    }\n\n    getInfo() {\n        // カード情報取得\n        const cardDiv = document.getElementById(this.cardId)\n        const textarea = document.getElementById(this.cardId).getElementsByClassName(\"textarea\").item(0)\n        const changeColorButton = document.getElementById(this.cardId).getElementsByClassName(\"changeColorButton\").item(0)\n\n        // カード情報生成\n        // TODO: ディープ参照渡しの解決\n        const cardInfo = JSON.parse(JSON.stringify(_card_const__WEBPACK_IMPORTED_MODULE_0__[\"defaultCardInfo\"]))\n        cardInfo.cardId = this.cardId\n        cardInfo.topPosition = cardDiv.style.top\n        cardInfo.leftPosition = cardDiv.style.left\n        cardInfo.color = textarea.style.backgroundColor\n        cardInfo.text = textarea.value\n        cardInfo.height = textarea.style.height\n        cardInfo.width = textarea.style.width\n        cardInfo.changeColorButton.color = changeColorButton.style.backgroundColor\n\n        return cardInfo\n    }\n\n    // カード削除\n    delete() {\n        document.getElementById(this.cardId).remove();\n    }\n\n    // カラー変更\n    changeColor() {\n        // 対象情報を取得\n        const clickedCard = document.getElementById(this.cardId).getElementsByClassName(\"textarea\").item(0)\n        const clickedButton = document.getElementById(this.cardId).getElementsByClassName(\"changeColorButton\").item(0)\n\n        // カードカラーの変更\n        switch (clickedCard.style.backgroundColor) {\n            case _card_const__WEBPACK_IMPORTED_MODULE_0__[\"colors\"].default:\n                clickedCard.style.backgroundColor = _card_const__WEBPACK_IMPORTED_MODULE_0__[\"colors\"].keep;\n                clickedButton.style.backgroundColor = _card_const__WEBPACK_IMPORTED_MODULE_0__[\"colors\"].problem;\n                break;\n\n            case _card_const__WEBPACK_IMPORTED_MODULE_0__[\"colors\"].keep:\n                clickedCard.style.backgroundColor = _card_const__WEBPACK_IMPORTED_MODULE_0__[\"colors\"].problem;\n                clickedButton.style.backgroundColor = _card_const__WEBPACK_IMPORTED_MODULE_0__[\"colors\"].try;\n                break;\n\n            case _card_const__WEBPACK_IMPORTED_MODULE_0__[\"colors\"].problem:\n                clickedCard.style.backgroundColor = _card_const__WEBPACK_IMPORTED_MODULE_0__[\"colors\"].try;\n                clickedButton.style.backgroundColor = _card_const__WEBPACK_IMPORTED_MODULE_0__[\"colors\"].default;\n                break;\n\n            case _card_const__WEBPACK_IMPORTED_MODULE_0__[\"colors\"].try:\n                clickedCard.style.backgroundColor = _card_const__WEBPACK_IMPORTED_MODULE_0__[\"colors\"].default;\n                clickedButton.style.backgroundColor = _card_const__WEBPACK_IMPORTED_MODULE_0__[\"colors\"].keep;\n                break;\n        }\n    }\n}\n\n// マウスがクリックされた場合実行\nfunction glabCard(e) {\n    const cursorEvent = e\n\n    //タッチイベントとマウスイベントは差異があるためイベントの差異を吸収\n    if (e.type != \"mousedown\") {\n        // イベントがタッチイベントだった場合\n        cursorEvent = e.changedTouches[0];\n    }\n\n    // 要素内の相対座標を取得\n    clickedLeftPosition = cursorEvent.pageX - this.offsetLeft;\n    clickedTopPosition = cursorEvent.pageY - this.offsetTop;\n\n    // ドラッグイベントの追加\n    this.addEventListener(\"mousemove\", dragCard, false);\n    this.addEventListener(\"touchmove\", dragCard, false);\n\n    // ドロップイベントの追加\n    this.addEventListener(\"mouseup\", dropCard, false);\n    this.addEventListener(\"mouseleave\", dropCard, false);\n    this.addEventListener(\"touchend\", dropCard, false);\n    this.addEventListener(\"touchleave\", dropCard, false);\n}\n\n//マウスカーソルが動いた場合実行\nfunction dragCard(e) {\n    const cursorEvent = e\n\n    // マウスとタッチの差異を吸収\n    if (e.type != \"mousemove\") {\n        // イベントがタッチイベントだった場合\n        cursorEvent = e.changedTouches[0];\n    }\n\n    // フリックしたときに画面を動かさないようにデフォルト動作を抑制\n    cursorEvent.preventDefault();\n\n    // マウスが動いた場所に要素を動かす\n    this.style.top = `${cursorEvent.pageY - clickedTopPosition}px`;\n    this.style.left = `${cursorEvent.pageX - clickedLeftPosition}px`;\n}\n\n// マウスボタンが上がったら発火\nfunction dropCard(e) {\n    if (this != undefined) {\n        // 対象外の要素にも反応してしまうためエラー回避\n        this.removeEventListener(\"mousemove\", dragCard, false);\n        this.removeEventListener(\"mouseup\", dropCard, false);\n        this.removeEventListener(\"touchmove\", dragCard, false);\n        this.removeEventListener(\"touchend\", dropCard, false);\n    }\n}\n\n//# sourceURL=webpack:///./src/card.js?");

/***/ }),

/***/ "./src/file-handler.js":
/*!*****************************!*\
  !*** ./src/file-handler.js ***!
  \*****************************/
/*! exports provided: createInfoFromCards, downloadFile, createCardsFromFile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createInfoFromCards\", function() { return createInfoFromCards; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"downloadFile\", function() { return downloadFile; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createCardsFromFile\", function() { return createCardsFromFile; });\n/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card */ \"./src/card.js\");\n\n\n// エクスポートファイル作成\nfunction createInfoFromCards(cards) {\n    const info = [];\n\n    for (const card of cards) {\n        // 参照渡し回避のため、新規オブジェクト生成\n        // TODO: ディープ参照渡しの解決\n        const newCard = JSON.stringify(card.getInfo())\n        info.push(JSON.parse(newCard))\n    }\n    return info\n}\n\n// エクスポートファイルをダウンロード\nfunction downloadFile(exportedFileInfo) {\n\n    // 各種設定\n    const stringCardsInfo = JSON.stringify(exportedFileInfo);\n    const fileTitle = \"kptee-cards.json\";\n    const linkTag = document.getElementById(\"linkTagToGetCardsFile\");\n    const blobObject = new Blob([stringCardsInfo], { type: \"text/plain\" });\n\n    //ダウンロード用URL生成\n    const blobObjectUrl = window.URL.createObjectURL(blobObject);\n    linkTag.setAttribute(\"href\", blobObjectUrl);\n    linkTag.setAttribute(\"download\", fileTitle);\n}\n\n// インポート情報→カード作成\nfunction createCardsFromFile(file, fun) {\n\n    //FileReaderのインスタンスを作成する\n    const fileReader = new FileReader();\n\n    //読み込んだファイルの中身を取得する\n    fileReader.readAsText(file);\n\n    //ファイルの中身を取得後に処理を行う\n    fileReader.addEventListener(\"load\", function () {\n\n        // インポート情報を取得\n        const importedCardsInfo = JSON.parse(fileReader.result);\n\n        // インポート情報を元にカードを生成\n        for (const card of importedCardsInfo) {\n            fun(new _card__WEBPACK_IMPORTED_MODULE_0__[\"default\"](card))\n        }\n    })\n}\n\n//# sourceURL=webpack:///./src/file-handler.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: importCardsInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"importCardsInfo\", function() { return importCardsInfo; });\n/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card */ \"./src/card.js\");\n/* harmony import */ var _file_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./file-handler */ \"./src/file-handler.js\");\n\n\n\n// html上の関数と紐づけ\nwindow.createCard = createCard\nwindow.changeCardColor = changeCardColor\nwindow.importCardsInfo = importCardsInfo\nwindow.exportCardsInfo = exportCardsInfo\nwindow.deleteCard = deleteCard\n\n// グローバル変数設定\nconst cardList = [];\n\n// インポートボタンにイベントをセット\n(function () {\n    const importLocation = document.forms.formTagForImport;\n\n    // ファイルが読み込まれたら発火\n    importLocation.importFileButton.addEventListener(\"change\", importCardsInfo, false)\n}());\n\n// カード作成関数\nfunction createCard() {\n\n    // カードの生成\n    const card = new _card__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\n\n    // カードリストにidを追加\n    cardList.push(card)\n}\n\n// インポート関数\nfunction importCardsInfo(e) {\n\n    if (e) {\n        // ファイルが読み込まれた場合→ファイル情報からカードを生成\n        Object(_file_handler__WEBPACK_IMPORTED_MODULE_1__[\"createCardsFromFile\"])(e.target.files[0], function (importedCard) {\n\n            // カードリストにidを追加\n            cardList.push(importedCard)\n        })\n    }\n}\n\n// エクスポート関数\nfunction exportCardsInfo() {\n\n    // カード情報一覧からファイル作成\n    const exportedInfo = Object(_file_handler__WEBPACK_IMPORTED_MODULE_1__[\"createInfoFromCards\"])(cardList)\n\n    //ファイルをダウンロード\n    Object(_file_handler__WEBPACK_IMPORTED_MODULE_1__[\"downloadFile\"])(exportedInfo)\n}\n\nfunction changeCardColor(clieckedButton) {\n\n    // 対象カードID取得\n    const clieckedCardId = clieckedButton.parentNode.id\n\n    // 対象カード照合\n    const targetCardIndex = cardList.findIndex(({ cardId }) => cardId === clieckedCardId)\n\n    // カードカラーの変更\n    cardList[targetCardIndex].changeColor()\n}\n\n// カード削除関数\nfunction deleteCard(clieckedButton) {\n\n    // 対象カードID取得\n    const clieckedCardId = clieckedButton.parentNode.id\n\n    // 対象カード照合\n    const targetCardIndex = cardList.findIndex(({ cardId }) => cardId === clieckedCardId)\n\n    // カード削除\n    cardList[targetCardIndex].delete()\n\n    // カードID削除\n    cardList.splice(targetCardIndex, 1)\n\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });