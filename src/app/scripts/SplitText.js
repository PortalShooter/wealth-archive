/*!
 * VERSION: 0.5.7
 * DATE: 2017-06-19
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
const _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; // helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(function(window) {
	
	
	const _globals = window.GreenSockGlobals || window;
		const _namespace = function(ns) {
			const a = ns.split(".");
				let p = _globals; let i;
			for (i = 0; i < a.length; i++) {
				p[a[i]] = p = p[a[i]] || {};
			}
			return p;
		};
		const pkg = _namespace("com.greensock.utils");
		var _getText = function(e) {
			const type = e.nodeType;
				let result = "";
			if (type === 1 || type === 9 || type === 11) {
				if (typeof(e.textContent) === "string") {
					return e.textContent;
				} 
					for ( e = e.firstChild; e; e = e.nextSibling ) {
						result += _getText(e);
					}
				
			} else if (type === 3 || type === 4) {
				return e.nodeValue;
			}
			return result;
		};
		const _doc = document;
		const _getComputedStyle = _doc.defaultView ? _doc.defaultView.getComputedStyle : function() {};
		const _capsExp = /([A-Z])/g;
		const _getStyle = function(t, p, cs, str) {
			let result;
			if ((cs = cs || _getComputedStyle(t, null))) {
				t = cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase());
				result = (t || cs.length) ? t : cs[p]; // Opera behaves VERY strangely - length is usually 0 and cs[p] is the only way to get accurate results EXCEPT when checking for -o-transform which only works with cs.getPropertyValue()!
			} else if (t.currentStyle) {
				cs = t.currentStyle;
				result = cs[p];
			}
			return str ? result : parseInt(result, 10) || 0;
		};
		const _isArrayLike = function(e) {
			return !!((e.length && e[0] && ((e[0].nodeType && e[0].style && !e.nodeType) || (e[0].length && e[0][0])))); // could be an array of jQuery objects too, so accommodate that.
		};
		const _flattenArray = function(a) {
			const result = [];
				const l = a.length;
				let i; let e; let j;
			for (i = 0; i < l; i++) {
				e = a[i];
				if (_isArrayLike(e)) {
					j = e.length;
					for (j = 0; j < e.length; j++) {
						result.push(e[j]);
					}
				} else {
					result.push(e);
				}
			}
			return result;
		};
		const _stripExp = /(?:\r|\n|\t\t)/g; // find carriage returns, new line feeds and double-tabs.
		const _multipleSpacesExp = /(?:\s\s+)/g;
		const _emojiStart = 0xD800;
		const _emojiEnd = 0xDBFF;
		const _emojiLowStart = 0xDC00;
		const _emojiRegionStart = 0x1F1E6;
		const _emojiRegionEnd = 0x1F1FF;
		const _emojiModStart = 0x1f3fb;
		const _emojiModEnd = 0x1f3ff;
		const _emojiPairCode = function(s) {
			return ((s.charCodeAt(0) - _emojiStart) << 10) + (s.charCodeAt(1) - _emojiLowStart) + 0x10000;
		};
		const _isOldIE = (_doc.all && !_doc.addEventListener);
		const _divStart = ` style='position:relative;display:inline-block;${  _isOldIE ? "*display:inline;*zoom:1;'" : "'"}`; // note: we must use both display:inline-block and *display:inline for IE8 and earlier, otherwise it won't flow correctly (and if we only use display:inline, IE won't render most of the property tweens - very odd).
		const _cssClassFunc = function(cssClass, tag) {
			cssClass = cssClass || "";
			const iterate = (cssClass.indexOf("++") !== -1);
				let num = 1;
			if (iterate) {
				cssClass = cssClass.split("++").join("");
			}
			return function() {
				return `<${  tag  }${_divStart  }${cssClass ? ` class='${  cssClass  }${iterate ? num++ : ""  }'>` : ">"}`;
			};
		};
		var SplitText = pkg.SplitText = _globals.SplitText = function(element, vars) {
			if (typeof(element) === "string") {
				element = SplitText.selector(element);
			}
			if (!element) {
				throw("cannot split a null element.");
			}
			this.elements = _isArrayLike(element) ? _flattenArray(element) : [element];
			this.chars = [];
			this.words = [];
			this.lines = [];
			this._originals = [];
			this.vars = vars || {};
			this.split(vars);
		};
		var _swapText = function(element, oldText, newText) {
			const type = element.nodeType;
			if (type === 1 || type === 9 || type === 11) {
				for (element = element.firstChild; element; element = element.nextSibling) {
					_swapText(element, oldText, newText);
				}
			} else if (type === 3 || type === 4) {
				element.nodeValue = element.nodeValue.split(oldText).join(newText);
			}
		};
		const _pushReversed = function(a, merge) {
			let i = merge.length;
			while (--i > -1) {
				a.push(merge[i]);
			}
		};
		const _slice = function(a) { // don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
			const b = [];
				const l = a.length;
				let i;
			for (i = 0; i !== l; b.push(a[i++])) {}
			return b;
		};
		const _isBeforeWordDelimiter = function(e, root, wordDelimiter) {
			let next;
			while (e && e !== root) {
				next = e._next || e.nextSibling;
				if (next) {
					return next.textContent.charAt(0) === wordDelimiter;
				}
				e = e.parentNode || e._parent;
			}
			return false;
		};
		var _deWordify = function(e) {
			const children = _slice(e.childNodes);
				const l = children.length;
				let i; let child;
			for (i = 0; i < l; i++) {
				child = children[i];
				if (child._isSplit) {
					_deWordify(child);
				} else {
					if (i && child.previousSibling.nodeType === 3) {
						child.previousSibling.nodeValue += (child.nodeType === 3) ? child.nodeValue : child.firstChild.nodeValue;
					} else if (child.nodeType !== 3) {
						e.insertBefore(child.firstChild, child);
					}
					e.removeChild(child);
				}
			}
		};
		const _setPositionsAfterSplit = function(element, vars, allChars, allWords, allLines, origWidth, origHeight) {
			const cs = _getComputedStyle(element);
				const paddingLeft = _getStyle(element, "paddingLeft", cs);
				let lineOffsetY = -999;
				const borderTopAndBottom = _getStyle(element, "borderBottomWidth", cs) + _getStyle(element, "borderTopWidth", cs);
				const borderLeftAndRight = _getStyle(element, "borderLeftWidth", cs) + _getStyle(element, "borderRightWidth", cs);
				const padTopAndBottom = _getStyle(element, "paddingTop", cs) + _getStyle(element, "paddingBottom", cs);
				const padLeftAndRight = _getStyle(element, "paddingLeft", cs) + _getStyle(element, "paddingRight", cs);
				const lineThreshold = _getStyle(element, "fontSize") * 0.2;
				const textAlign = _getStyle(element, "textAlign", cs, true);
				const charArray = [];
				const wordArray = [];
				const lineArray = [];
				const wordDelimiter = vars.wordDelimiter || " ";
				const tag = vars.span ? "span" : "div";
				const types = vars.type || vars.split || "chars,words,lines";
				const lines = (allLines && types.indexOf("lines") !== -1) ? [] : null;
				const words = (types.indexOf("words") !== -1);
				const chars = (types.indexOf("chars") !== -1);
				const absolute = (vars.position === "absolute" || vars.absolute === true);
				let {linesClass} = vars;
				const iterateLine = ((linesClass || "").indexOf("++") !== -1);
				const spaceNodesToRemove = [];
				let i; let j; let l; let node; let nodes; let isChild; let curLine; let addWordSpaces; let style; let lineNode; let lineWidth; let offset;
			if (lines && element.children.length === 1 && element.children[0]._isSplit) { // lines are always split on the main element (not inside nested elements), so if there's only one child, bust apart lines inside that rather than forcing it all into one big line. Like <div><div>lots of stuff</div></div> - if they split the outer one, it'd all be in one line.
				element = element.children[0];
			}
			if (iterateLine) {
				linesClass = linesClass.split("++").join("");
			}

			// copy all the descendant nodes into an array (we can't use a regular nodeList because it's live and we may need to renest things)
			j = element.getElementsByTagName("*");
			l = j.length;
			nodes = [];
			for (i = 0; i < l; i++) {
				nodes[i] = j[i];
			}

			// for absolute positioning, we need to record the x/y offsets and width/height for every <div>. And even if we're not positioning things absolutely, in order to accommodate lines, we must figure out where the y offset changes so that we can sense where the lines break, and we populate the lines array.
			if (lines || absolute) {
				for (i = 0; i < l; i++) {
					node = nodes[i];
					isChild = (node.parentNode === element);
					if (isChild || absolute || (chars && !words)) {
						offset = node.offsetTop;
						if (lines && isChild && Math.abs(offset - lineOffsetY) > lineThreshold && node.nodeName !== "BR") { // we found some rare occasions where a certain character like &#8209; could cause the offsetTop to be off by 1 pixel, so we build in a threshold.
							curLine = [];
							lines.push(curLine);
							lineOffsetY = offset;
						}
						if (absolute) { // record offset x and y, as well as width and height so that we can access them later for positioning. Grabbing them at once ensures we don't trigger a browser paint & we maximize performance.
							node._x = node.offsetLeft;
							node._y = offset;
							node._w = node.offsetWidth;
							node._h = node.offsetHeight;
						}
						if (lines) {
							if ((node._isSplit && isChild) || (!chars && isChild) || (words && isChild) || (!words && node.parentNode.parentNode === element && !node.parentNode._isSplit)) {
								curLine.push(node);
								node._x -= paddingLeft;
								if (_isBeforeWordDelimiter(node, element, wordDelimiter)) {
									node._wordEnd = true;
								}
							}
							if (node.nodeName === "BR" && node.nextSibling && node.nextSibling.nodeName === "BR") { // two consecutive <br> tags signify a new [empty] line.
								lines.push([]);
							}
						}
					}
				}
			}

			for (i = 0; i < l; i++) {
				node = nodes[i];
				isChild = (node.parentNode === element);
				if (node.nodeName === "BR") {
					if (lines || absolute) {
						if (node.parentNode) {
							node.parentNode.removeChild(node);
						}
						nodes.splice(i--, 1);
						l--;
					} else if (!words) {
						element.appendChild(node);
					}
					continue;
				}

				if (absolute) {
					style = node.style;
					if (!words && !isChild) {
						node._x += node.parentNode._x;
						node._y += node.parentNode._y;
					}
					style.left = `${node._x  }px`;
					style.top = `${node._y  }px`;
					style.position = "absolute";
					style.display = "block";
					// if we don't set the width/height, things collapse in older versions of IE and the origin for transforms is thrown off in all browsers.
					style.width = `${node._w + 1  }px`; // IE is 1px short sometimes. Avoid wrapping
					style.height = `${node._h  }px`;
				}

				if (!words && chars) {
					// we always start out wrapping words in their own <div> so that line breaks happen correctly, but here we'll remove those <div> tags if necessary and renest the characters directly into the element rather than inside the word <div>
					if (node._isSplit) {
						node._next = node.nextSibling;
						node.parentNode.appendChild(node); // put it at the end to keep the order correct.

					} else if (node.parentNode._isSplit) {
						node._parent = node.parentNode;
						if (!node.previousSibling && node.firstChild) {
							node.firstChild._isFirst = true;
						}
						if (node.nextSibling && node.nextSibling.textContent === " " && !node.nextSibling.nextSibling) { // if the last node inside a nested element is just a space (like T<span>nested </span>), remove it otherwise it'll get placed in the wrong order. Don't remove it right away, though, because we need to sense when words/characters are before a space like _isBeforeWordDelimiter(). Removing it now would make that a false negative.
							spaceNodesToRemove.push(node.nextSibling);
						}
						node._next = (node.nextSibling && node.nextSibling._isFirst) ? null : node.nextSibling;
						node.parentNode.removeChild(node);
						nodes.splice(i--, 1);
						l--;
					} else if (!isChild) {
						offset = (!node.nextSibling && _isBeforeWordDelimiter(node.parentNode, element, wordDelimiter)); // if this is the last letter in the word (and we're not breaking by lines and not positioning things absolutely), we need to add a space afterwards so that the characters don't just mash together
						if (node.parentNode._parent) {
							node.parentNode._parent.appendChild(node);
						}
						if (offset) {
							node.parentNode.appendChild(_doc.createTextNode(" "));
						}
						if (vars.span) {
							node.style.display = "inline"; // so that word breaks are honored properly.
						}
						charArray.push(node);
					}
				} else if (node.parentNode._isSplit && !node._isSplit && node.innerHTML !== "") {
					wordArray.push(node);
				} else if (chars && !node._isSplit) {
					if (vars.span) {
						node.style.display = "inline";
					}
					charArray.push(node);
				}
			}

			i = spaceNodesToRemove.length;
			while (--i > -1) {
				spaceNodesToRemove[i].parentNode.removeChild(spaceNodesToRemove[i]);
			}

			if (lines) {
				// the next 7 lines just give us the line width in the most reliable way and figure out the left offset (if position isn't relative or absolute). We must set the width along with text-align to ensure everything works properly for various alignments.
				if (absolute) {
					lineNode = _doc.createElement(tag);
					element.appendChild(lineNode);
					lineWidth = `${lineNode.offsetWidth  }px`;
					offset = (lineNode.offsetParent === element) ? 0 : element.offsetLeft;
					element.removeChild(lineNode);
				}
				style = element.style.cssText;
				element.style.cssText = "display:none;"; // to improve performance, set display:none on the element so that the browser doesn't have to worry about reflowing or rendering while we're renesting things. We'll revert the cssText later.
				// we can't use element.innerHTML = "" because that causes IE to literally delete all the nodes and their content even though we've stored them in an array! So we must loop through the children and remove them.
				while (element.firstChild) {
					element.removeChild(element.firstChild);
				}
				addWordSpaces = (wordDelimiter === " " && (!absolute || (!words && !chars)));
				for (i = 0; i < lines.length; i++) {
					curLine = lines[i];
					lineNode = _doc.createElement(tag);
					lineNode.style.cssText = `display:block;text-align:${  textAlign  };position:${  absolute ? "absolute;" : "relative;"}`;
					if (linesClass) {
						lineNode.className = linesClass + (iterateLine ? i+1 : "");
					}
					lineArray.push(lineNode);
					l = curLine.length;
					for (j = 0; j < l; j++) {
						if (curLine[j].nodeName !== "BR") {
							node = curLine[j];
							lineNode.appendChild(node);
							if (addWordSpaces && node._wordEnd) {
								lineNode.appendChild(_doc.createTextNode(" "));
							}
							if (absolute) {
								if (j === 0) {
									lineNode.style.top = `${node._y  }px`;
									lineNode.style.left = `${paddingLeft + offset  }px`;
								}
								node.style.top = "0px";
								if (offset) {
									node.style.left = `${node._x - offset  }px`;
								}
							}
						}
					}
					if (l === 0) { // if there are no nodes in the line (typically meaning there were two consecutive <br> tags, just add a non-breaking space so that things display properly.
						lineNode.innerHTML = "&nbsp;";
					} else if (!words && !chars) {
						_deWordify(lineNode);
						_swapText(lineNode, String.fromCharCode(160), " ");
					}
					if (absolute) {
						lineNode.style.width = lineWidth;
						lineNode.style.height = `${node._h  }px`;
					}
					element.appendChild(lineNode);
				}
				element.style.cssText = style;
			}

			// if everything shifts to being position:absolute, the container can collapse in terms of height or width, so fix that here.
			if (absolute) {
				if (origHeight > element.clientHeight) {
					element.style.height = `${origHeight - padTopAndBottom  }px`;
					if (element.clientHeight < origHeight) { // IE8 and earlier use a different box model - we must include padding and borders
						element.style.height = `${origHeight + borderTopAndBottom }px`;
					}
				}
				if (origWidth > element.clientWidth) {
					element.style.width = `${origWidth - padLeftAndRight  }px`;
					if (element.clientWidth < origWidth) { // IE8 and earlier use a different box model - we must include padding and borders
						element.style.width = `${origWidth + borderLeftAndRight }px`;
					}
				}
			}
			_pushReversed(allChars, charArray);
			_pushReversed(allWords, wordArray);
			_pushReversed(allLines, lineArray);
		};
		const _splitRawText = function(element, vars, wordStart, charStart) {
			const tag = vars.span ? "span" : "div";
				const types = vars.type || vars.split || "chars,words,lines";
				const words = (types.indexOf("words") !== -1);
				const chars = (types.indexOf("chars") !== -1);
				const absolute = (vars.position === "absolute" || vars.absolute === true);
				const wordDelimiter = vars.wordDelimiter || " ";
				const space = wordDelimiter !== " " ? "" : (absolute ? "&#173; " : " ");
				const wordEnd = vars.span ? "</span>" : "</div>";
				let wordIsOpen = true;
				let text; let splitText; let i; let j; let l; let character; let hasTagStart; let emojiPair1; let emojiPair2;
				const container = _doc.createElement("div");
				const parent = element.parentNode;

			parent.insertBefore(container, element);
			container.textContent = element.nodeValue;
			parent.removeChild(element);
			element = container;
			text = _getText(element);
			hasTagStart = text.indexOf("<") !== -1;

			if (vars.reduceWhiteSpace !== false) {
				text = text.replace(_multipleSpacesExp, " ").replace(_stripExp, "");
			}
			if (hasTagStart) {
				text = text.split("<").join("{{LT}}"); // we can't leave "<" in the string, or when we set the innerHTML, it can be interpreted as a node
			}
			l = text.length;
			splitText = ((text.charAt(0) === " ") ? space : "") + wordStart();
			for (i = 0; i < l; i++) {
				character = text.charAt(i);
				if (character === wordDelimiter && text.charAt(i-1) !== wordDelimiter && i) {
					splitText += wordIsOpen ? wordEnd : "";
					wordIsOpen = false;
					while (text.charAt(i + 1) === wordDelimiter) { // skip over empty spaces (to avoid making them words)
						splitText += space;
						i++;
					}
					if (i === l-1) {
						splitText += space;
					} else if (text.charAt(i + 1) !== ")") {
						splitText += space + wordStart();
						wordIsOpen = true;
					}

				} else if (character === "{" && text.substr(i, 6) === "{{LT}}") {
					splitText += chars ? `${charStart()  }{{LT}}` + `</${  tag  }>` : "{{LT}}";
					i += 5;

				} else if ((character.charCodeAt(0) >= _emojiStart && character.charCodeAt(0) <= _emojiEnd) || (text.charCodeAt(i+1) >= 0xFE00 && text.charCodeAt(i+1) <= 0xFE0F)) { // special emoji characters use 2 or 4 unicode characters that we must keep together.
					emojiPair1 = _emojiPairCode(text.substr(i, 2));
					emojiPair2 = _emojiPairCode(text.substr(i + 2, 2));
					j = ((emojiPair1 >= _emojiRegionStart && emojiPair1 <= _emojiRegionEnd && emojiPair2 >= _emojiRegionStart && emojiPair2 <= _emojiRegionEnd) || (emojiPair2 >= _emojiModStart && emojiPair2 <= _emojiModEnd)) ? 4 : 2;
					splitText += (chars && character !== " ") ? `${charStart() + text.substr(i, j)  }</${  tag  }>` : text.substr(i, j);
					i += j - 1;
				} else {
					splitText += (chars && character !== " ") ? `${charStart() + character  }</${  tag  }>` : character;
				}
			}
			element.outerHTML = splitText + (wordIsOpen ? wordEnd : "");
			if (hasTagStart) {
				_swapText(parent, "{{LT}}", "<"); // note: don't perform this on "element" because that gets replaced with all new elements when we set element.outerHTML.
			}
		};
		var _split = function(element, vars, wordStart, charStart) {
			const children = _slice(element.childNodes);
				const l = children.length;
				const absolute = (vars.position === "absolute" || vars.absolute === true);
				let i; let child;

			if (element.nodeType !== 3 || l > 1) {
				vars.absolute = false;
				for (i = 0; i < l; i++) {
					child = children[i];
					if (child.nodeType !== 3 || /\S+/.test(child.nodeValue)) {
						if (absolute && child.nodeType !== 3 && _getStyle(child, "display", null, true) === "inline") { // if there's a child node that's display:inline, switch it to inline-block so that absolute positioning works properly (most browsers don't report offsetTop/offsetLeft properly inside a <span> for example)
							child.style.display = "inline-block";
							child.style.position = "relative";
						}
						child._isSplit = true;
						_split(child, vars, wordStart, charStart); // don't split lines on child elements
					}
				}
				vars.absolute = absolute;
				element._isSplit = true;
				return;
			}

			_splitRawText(element, vars, wordStart, charStart);

		};
		const p = SplitText.prototype;

	p.split = function(vars) {
		if (this.isSplit) {
			this.revert();
		}
		this.vars = vars = vars || this.vars;
		this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
		let i = this.elements.length;
			const tag = vars.span ? "span" : "div";
			const absolute = (vars.position === "absolute" || vars.absolute === true);
			const wordStart = _cssClassFunc(vars.wordsClass, tag);
			const charStart = _cssClassFunc(vars.charsClass, tag);
			let origHeight; let origWidth; let e;
		// we split in reversed order so that if/when we position:absolute elements, they don't affect the position of the ones after them in the document flow (shifting them up as they're taken out of the document flow).
		while (--i > -1) {
			e = this.elements[i];
			this._originals[i] = e.innerHTML;
			origHeight = e.clientHeight;
			origWidth = e.clientWidth;
			_split(e, vars, wordStart, charStart);
			_setPositionsAfterSplit(e, vars, this.chars, this.words, this.lines, origWidth, origHeight);
		}
		this.chars.reverse();
		this.words.reverse();
		this.lines.reverse();
		this.isSplit = true;
		return this;
	};

	p.revert = function() {
		if (!this._originals) {
			throw("revert() call wasn't scoped properly.");
		}
		let i = this._originals.length;
		while (--i > -1) {
			this.elements[i].innerHTML = this._originals[i];
		}
		this.chars = [];
		this.words = [];
		this.lines = [];
		this.isSplit = false;
		return this;
	};

	SplitText.selector = window.$ || window.jQuery || function(e) {
		const selector = window.$ || window.jQuery;
		if (selector) {
			SplitText.selector = selector;
			return selector(e);
		}
		return (typeof(document) === "undefined") ? e : (document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById((e.charAt(0) === "#") ? e.substr(1) : e));
	};
	SplitText.version = "0.5.7";
	
})(_gsScope);

// export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
(function(name) {
	
	const getGlobal = function() {
		return (_gsScope.GreenSockGlobals || _gsScope)[name];
	};
	if (typeof(module) !== "undefined" && module.exports) { // node
		module.exports = getGlobal();
	} else if (typeof(define) === "function" && define.amd) { // AMD
		define([], getGlobal);
	}
}("SplitText"));