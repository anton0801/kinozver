/*! jQuery UI - v1.9.2 - 2012-11-23
* http://jqueryui.com
* Includes: jquery.ui.core.js
* Copyright 2012 jQuery Foundation and other contributors; Licensed MIT */
(function (e, t) {
    function i(t, n) {
        var r, i, o, u = t.nodeName.toLowerCase();
        return "area" === u ? (r = t.parentNode, i = r.name, !t.href || !i || r.nodeName.toLowerCase() !== "map" ? !1 : (o = e("img[usemap=#" + i + "]")[0], !!o && s(o))) : (/input|select|textarea|button|object/.test(u) ? !t.disabled : "a" === u ? t.href || n : n) && s(t)
    }

    function s(t) {
        return e.expr.filters.visible(t) && !e(t).parents().andSelf().filter(function () {
            return e.css(this, "visibility") === "hidden"
        }).length
    }

    var n = 0, r = /^ui-id-\d+$/;
    e.ui = e.ui || {};
    if (e.ui.version) return;
    e.extend(e.ui, {
        version: "1.9.2",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), e.fn.extend({
        _focus: e.fn.focus, focus: function (t, n) {
            return typeof t == "number" ? this.each(function () {
                var r = this;
                setTimeout(function () {
                    e(r).focus(), n && n.call(r)
                }, t)
            }) : this._focus.apply(this, arguments)
        }, scrollParent: function () {
            var t;
            return e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? t = this.parents().filter(function () {
                return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
            }).eq(0) : t = this.parents().filter(function () {
                return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
            }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
        }, zIndex: function (n) {
            if (n !== t) return this.css("zIndex", n);
            if (this.length) {
                var r = e(this[0]), i, s;
                while (r.length && r[0] !== document) {
                    i = r.css("position");
                    if (i === "absolute" || i === "relative" || i === "fixed") {
                        s = parseInt(r.css("zIndex"), 10);
                        if (!isNaN(s) && s !== 0) return s
                    }
                    r = r.parent()
                }
            }
            return 0
        }, uniqueId: function () {
            return this.each(function () {
                this.id || (this.id = "ui-id-" + ++n)
            })
        }, removeUniqueId: function () {
            return this.each(function () {
                r.test(this.id) && e(this).removeAttr("id")
            })
        }
    }), e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function (t) {
            return function (n) {
                return !!e.data(n, t)
            }
        }) : function (t, n, r) {
            return !!e.data(t, r[3])
        }, focusable: function (t) {
            return i(t, !isNaN(e.attr(t, "tabindex")))
        }, tabbable: function (t) {
            var n = e.attr(t, "tabindex"), r = isNaN(n);
            return (r || n >= 0) && i(t, !r)
        }
    }), e(function () {
        var t = document.body, n = t.appendChild(n = document.createElement("div"));
        n.offsetHeight, e.extend(n.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        }), e.support.minHeight = n.offsetHeight === 100, e.support.selectstart = "onselectstart" in n, t.removeChild(n).style.display = "none"
    }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function (n, r) {
        function u(t, n, r, s) {
            return e.each(i, function () {
                n -= parseFloat(e.css(t, "padding" + this)) || 0, r && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0), s && (n -= parseFloat(e.css(t, "margin" + this)) || 0)
            }), n
        }

        var i = r === "Width" ? ["Left", "Right"] : ["Top", "Bottom"], s = r.toLowerCase(), o = {
            innerWidth: e.fn.innerWidth,
            innerHeight: e.fn.innerHeight,
            outerWidth: e.fn.outerWidth,
            outerHeight: e.fn.outerHeight
        };
        e.fn["inner" + r] = function (n) {
            return n === t ? o["inner" + r].call(this) : this.each(function () {
                e(this).css(s, u(this, n) + "px")
            })
        }, e.fn["outer" + r] = function (t, n) {
            return typeof t != "number" ? o["outer" + r].call(this, t) : this.each(function () {
                e(this).css(s, u(this, t, !0, n) + "px")
            })
        }
    }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function (t) {
        return function (n) {
            return arguments.length ? t.call(this, e.camelCase(n)) : t.call(this)
        }
    }(e.fn.removeData)), function () {
        var t = /msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) || [];
        e.ui.ie = t.length ? !0 : !1, e.ui.ie6 = parseFloat(t[1], 10) === 6
    }(), e.fn.extend({
        disableSelection: function () {
            return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (e) {
                e.preventDefault()
            })
        }, enableSelection: function () {
            return this.unbind(".ui-disableSelection")
        }
    }), e.extend(e.ui, {
        plugin: {
            add: function (t, n, r) {
                var i, s = e.ui[t].prototype;
                for (i in r) s.plugins[i] = s.plugins[i] || [], s.plugins[i].push([n, r[i]])
            }, call: function (e, t, n) {
                var r, i = e.plugins[t];
                if (!i || !e.element[0].parentNode || e.element[0].parentNode.nodeType === 11) return;
                for (r = 0; r < i.length; r++) e.options[i[r][0]] && i[r][1].apply(e.element, n)
            }
        }, contains: e.contains, hasScroll: function (t, n) {
            if (e(t).css("overflow") === "hidden") return !1;
            var r = n && n === "left" ? "scrollLeft" : "scrollTop", i = !1;
            return t[r] > 0 ? !0 : (t[r] = 1, i = t[r] > 0, t[r] = 0, i)
        }, isOverAxis: function (e, t, n) {
            return e > t && e < t + n
        }, isOver: function (t, n, r, i, s, o) {
            return e.ui.isOverAxis(t, r, s) && e.ui.isOverAxis(n, i, o)
        }
    })
})(jQuery);
/*! jQuery UI - v1.9.2 - 2012-11-23
* http://jqueryui.com
* Includes: jquery.ui.widget.js
* Copyright 2012 jQuery Foundation and other contributors; Licensed MIT */
(function (e, t) {
    var n = 0, r = Array.prototype.slice, i = e.cleanData;
    e.cleanData = function (t) {
        for (var n = 0, r; (r = t[n]) != null; n++) try {
            e(r).triggerHandler("remove")
        } catch (s) {
        }
        i(t)
    }, e.widget = function (t, n, r) {
        var i, s, o, u, a = t.split(".")[0];
        t = t.split(".")[1], i = a + "-" + t, r || (r = n, n = e.Widget), e.expr[":"][i.toLowerCase()] = function (t) {
            return !!e.data(t, i)
        }, e[a] = e[a] || {}, s = e[a][t], o = e[a][t] = function (e, t) {
            if (!this._createWidget) return new o(e, t);
            arguments.length && this._createWidget(e, t)
        }, e.extend(o, s, {
            version: r.version,
            _proto: e.extend({}, r),
            _childConstructors: []
        }), u = new n, u.options = e.widget.extend({}, u.options), e.each(r, function (t, i) {
            e.isFunction(i) && (r[t] = function () {
                var e = function () {
                    return n.prototype[t].apply(this, arguments)
                }, r = function (e) {
                    return n.prototype[t].apply(this, e)
                };
                return function () {
                    var t = this._super, n = this._superApply, s;
                    return this._super = e, this._superApply = r, s = i.apply(this, arguments), this._super = t, this._superApply = n, s
                }
            }())
        }), o.prototype = e.widget.extend(u, {widgetEventPrefix: s ? u.widgetEventPrefix : t}, r, {
            constructor: o,
            namespace: a,
            widgetName: t,
            widgetBaseClass: i,
            widgetFullName: i
        }), s ? (e.each(s._childConstructors, function (t, n) {
            var r = n.prototype;
            e.widget(r.namespace + "." + r.widgetName, o, n._proto)
        }), delete s._childConstructors) : n._childConstructors.push(o), e.widget.bridge(t, o)
    }, e.widget.extend = function (n) {
        var i = r.call(arguments, 1), s = 0, o = i.length, u, a;
        for (; s < o; s++) for (u in i[s]) a = i[s][u], i[s].hasOwnProperty(u) && a !== t && (e.isPlainObject(a) ? n[u] = e.isPlainObject(n[u]) ? e.widget.extend({}, n[u], a) : e.widget.extend({}, a) : n[u] = a);
        return n
    }, e.widget.bridge = function (n, i) {
        var s = i.prototype.widgetFullName || n;
        e.fn[n] = function (o) {
            var u = typeof o == "string", a = r.call(arguments, 1), f = this;
            return o = !u && a.length ? e.widget.extend.apply(null, [o].concat(a)) : o, u ? this.each(function () {
                var r, i = e.data(this, s);
                if (!i) return e.error("cannot call methods on " + n + " prior to initialization; " + "attempted to call method '" + o + "'");
                if (!e.isFunction(i[o]) || o.charAt(0) === "_") return e.error("no such method '" + o + "' for " + n + " widget instance");
                r = i[o].apply(i, a);
                if (r !== i && r !== t) return f = r && r.jquery ? f.pushStack(r.get()) : r, !1
            }) : this.each(function () {
                var t = e.data(this, s);
                t ? t.option(o || {})._init() : e.data(this, s, new i(o, this))
            }), f
        }
    }, e.Widget = function () {
    }, e.Widget._childConstructors = [], e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {disabled: !1, create: null},
        _createWidget: function (t, r) {
            r = e(r || this.defaultElement || this)[0], this.element = e(r), this.uuid = n++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), r !== this && (e.data(r, this.widgetName, this), e.data(r, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function (e) {
                    e.target === r && this.destroy()
                }
            }), this.document = e(r.style ? r.ownerDocument : r.document || r), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: e.noop,
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function () {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: e.noop,
        widget: function () {
            return this.element
        },
        option: function (n, r) {
            var i = n, s, o, u;
            if (arguments.length === 0) return e.widget.extend({}, this.options);
            if (typeof n == "string") {
                i = {}, s = n.split("."), n = s.shift();
                if (s.length) {
                    o = i[n] = e.widget.extend({}, this.options[n]);
                    for (u = 0; u < s.length - 1; u++) o[s[u]] = o[s[u]] || {}, o = o[s[u]];
                    n = s.pop();
                    if (r === t) return o[n] === t ? null : o[n];
                    o[n] = r
                } else {
                    if (r === t) return this.options[n] === t ? null : this.options[n];
                    i[n] = r
                }
            }
            return this._setOptions(i), this
        },
        _setOptions: function (e) {
            var t;
            for (t in e) this._setOption(t, e[t]);
            return this
        },
        _setOption: function (e, t) {
            return this.options[e] = t, e === "disabled" && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
        },
        enable: function () {
            return this._setOption("disabled", !1)
        },
        disable: function () {
            return this._setOption("disabled", !0)
        },
        _on: function (t, n, r) {
            var i, s = this;
            typeof t != "boolean" && (r = n, n = t, t = !1), r ? (n = i = e(n), this.bindings = this.bindings.add(n)) : (r = n, n = this.element, i = this.widget()), e.each(r, function (r, o) {
                function u() {
                    if (!t && (s.options.disabled === !0 || e(this).hasClass("ui-state-disabled"))) return;
                    return (typeof o == "string" ? s[o] : o).apply(s, arguments)
                }

                typeof o != "string" && (u.guid = o.guid = o.guid || u.guid || e.guid++);
                var a = r.match(/^(\w+)\s*(.*)$/), f = a[1] + s.eventNamespace, l = a[2];
                l ? i.delegate(l, f, u) : n.bind(f, u)
            })
        },
        _off: function (e, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
        },
        _delay: function (e, t) {
            function n() {
                return (typeof e == "string" ? r[e] : e).apply(r, arguments)
            }

            var r = this;
            return setTimeout(n, t || 0)
        },
        _hoverable: function (t) {
            this.hoverable = this.hoverable.add(t), this._on(t, {
                mouseenter: function (t) {
                    e(t.currentTarget).addClass("ui-state-hover")
                }, mouseleave: function (t) {
                    e(t.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function (t) {
            this.focusable = this.focusable.add(t), this._on(t, {
                focusin: function (t) {
                    e(t.currentTarget).addClass("ui-state-focus")
                }, focusout: function (t) {
                    e(t.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function (t, n, r) {
            var i, s, o = this.options[t];
            r = r || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], s = n.originalEvent;
            if (s) for (i in s) i in n || (n[i] = s[i]);
            return this.element.trigger(n, r), !(e.isFunction(o) && o.apply(this.element[0], [n].concat(r)) === !1 || n.isDefaultPrevented())
        }
    }, e.each({show: "fadeIn", hide: "fadeOut"}, function (t, n) {
        e.Widget.prototype["_" + t] = function (r, i, s) {
            typeof i == "string" && (i = {effect: i});
            var o, u = i ? i === !0 || typeof i == "number" ? n : i.effect || n : t;
            i = i || {}, typeof i == "number" && (i = {duration: i}), o = !e.isEmptyObject(i), i.complete = s, i.delay && r.delay(i.delay), o && e.effects && (e.effects.effect[u] || e.uiBackCompat !== !1 && e.effects[u]) ? r[t](i) : u !== t && r[u] ? r[u](i.duration, i.easing, s) : r.queue(function (n) {
                e(this)[t](), s && s.call(r[0]), n()
            })
        }
    }), e.uiBackCompat !== !1 && (e.Widget.prototype._getCreateOptions = function () {
        return e.metadata && e.metadata.get(this.element[0])[this.widgetName]
    })
})(jQuery);

(function (e, t) {
    var n = !1;
    e(document).mouseup(function (e) {
        n = !1
    }), e.widget("ui.mouse", {
        version: "1.9.2",
        options: {cancel: "input,textarea,button,select,option", distance: 1, delay: 0},
        _mouseInit: function () {
            var t = this;
            this.element.bind("mousedown." + this.widgetName, function (e) {
                return t._mouseDown(e)
            }).bind("click." + this.widgetName, function (n) {
                if (!0 === e.data(n.target, t.widgetName + ".preventClickEvent")) return e.removeData(n.target, t.widgetName + ".preventClickEvent"), n.stopImmediatePropagation(), !1
            }), this.started = !1
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function (t) {
            if (n) return;
            this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
            var r = this, i = t.which === 1,
                s = typeof this.options.cancel == "string" && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
            if (!i || s || !this._mouseCapture(t)) return !0;
            this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                r.mouseDelayMet = !0
            }, this.options.delay));
            if (this._mouseDistanceMet(t) && this._mouseDelayMet(t)) {
                this._mouseStarted = this._mouseStart(t) !== !1;
                if (!this._mouseStarted) return t.preventDefault(), !0
            }
            return !0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (e) {
                return r._mouseMove(e)
            }, this._mouseUpDelegate = function (e) {
                return r._mouseUp(e)
            }, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), n = !0, !0
        },
        _mouseMove: function (t) {
            return !e.ui.ie || document.documentMode >= 9 || !!t.button ? this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) : this._mouseUp(t)
        },
        _mouseUp: function (t) {
            return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
        },
        _mouseDistanceMet: function (e) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function (e) {
            return this.mouseDelayMet
        },
        _mouseStart: function (e) {
        },
        _mouseDrag: function (e) {
        },
        _mouseStop: function (e) {
        },
        _mouseCapture: function (e) {
            return !0
        }
    })
})(jQuery);
/*! jQuery UI - v1.9.2 - 2012-11-23
* http://jqueryui.com
* Includes: jquery.ui.position.js
* Copyright 2012 jQuery Foundation and other contributors; Licensed MIT */
(function (e, t) {
    function h(e, t, n) {
        return [parseInt(e[0], 10) * (l.test(e[0]) ? t / 100 : 1), parseInt(e[1], 10) * (l.test(e[1]) ? n / 100 : 1)]
    }

    function p(t, n) {
        return parseInt(e.css(t, n), 10) || 0
    }

    e.ui = e.ui || {};
    var n, r = Math.max, i = Math.abs, s = Math.round, o = /left|center|right/, u = /top|center|bottom/,
        a = /[\+\-]\d+%?/, f = /^\w+/, l = /%$/, c = e.fn.position;
    e.position = {
        scrollbarWidth: function () {
            if (n !== t) return n;
            var r, i,
                s = e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                o = s.children()[0];
            return e("body").append(s), r = o.offsetWidth, s.css("overflow", "scroll"), i = o.offsetWidth, r === i && (i = s[0].clientWidth), s.remove(), n = r - i
        }, getScrollInfo: function (t) {
            var n = t.isWindow ? "" : t.element.css("overflow-x"), r = t.isWindow ? "" : t.element.css("overflow-y"),
                i = n === "scroll" || n === "auto" && t.width < t.element[0].scrollWidth,
                s = r === "scroll" || r === "auto" && t.height < t.element[0].scrollHeight;
            return {width: i ? e.position.scrollbarWidth() : 0, height: s ? e.position.scrollbarWidth() : 0}
        }, getWithinInfo: function (t) {
            var n = e(t || window), r = e.isWindow(n[0]);
            return {
                element: n,
                isWindow: r,
                offset: n.offset() || {left: 0, top: 0},
                scrollLeft: n.scrollLeft(),
                scrollTop: n.scrollTop(),
                width: r ? n.width() : n.outerWidth(),
                height: r ? n.height() : n.outerHeight()
            }
        }
    }, e.fn.position = function (t) {
        if (!t || !t.of) return c.apply(this, arguments);
        t = e.extend({}, t);
        var n, l, d, v, m, g = e(t.of), y = e.position.getWithinInfo(t.within), b = e.position.getScrollInfo(y),
            w = g[0], E = (t.collision || "flip").split(" "), S = {};
        return w.nodeType === 9 ? (l = g.width(), d = g.height(), v = {
            top: 0,
            left: 0
        }) : e.isWindow(w) ? (l = g.width(), d = g.height(), v = {
            top: g.scrollTop(),
            left: g.scrollLeft()
        }) : w.preventDefault ? (t.at = "left top", l = d = 0, v = {
            top: w.pageY,
            left: w.pageX
        }) : (l = g.outerWidth(), d = g.outerHeight(), v = g.offset()), m = e.extend({}, v), e.each(["my", "at"], function () {
            var e = (t[this] || "").split(" "), n, r;
            e.length === 1 && (e = o.test(e[0]) ? e.concat(["center"]) : u.test(e[0]) ? ["center"].concat(e) : ["center", "center"]), e[0] = o.test(e[0]) ? e[0] : "center", e[1] = u.test(e[1]) ? e[1] : "center", n = a.exec(e[0]), r = a.exec(e[1]), S[this] = [n ? n[0] : 0, r ? r[0] : 0], t[this] = [f.exec(e[0])[0], f.exec(e[1])[0]]
        }), E.length === 1 && (E[1] = E[0]), t.at[0] === "right" ? m.left += l : t.at[0] === "center" && (m.left += l / 2), t.at[1] === "bottom" ? m.top += d : t.at[1] === "center" && (m.top += d / 2), n = h(S.at, l, d), m.left += n[0], m.top += n[1], this.each(function () {
            var o, u, a = e(this), f = a.outerWidth(), c = a.outerHeight(), w = p(this, "marginLeft"),
                x = p(this, "marginTop"), T = f + w + p(this, "marginRight") + b.width,
                N = c + x + p(this, "marginBottom") + b.height, C = e.extend({}, m),
                k = h(S.my, a.outerWidth(), a.outerHeight());
            t.my[0] === "right" ? C.left -= f : t.my[0] === "center" && (C.left -= f / 2), t.my[1] === "bottom" ? C.top -= c : t.my[1] === "center" && (C.top -= c / 2), C.left += k[0], C.top += k[1], e.support.offsetFractions || (C.left = s(C.left), C.top = s(C.top)), o = {
                marginLeft: w,
                marginTop: x
            }, e.each(["left", "top"], function (r, i) {
                e.ui.position[E[r]] && e.ui.position[E[r]][i](C, {
                    targetWidth: l,
                    targetHeight: d,
                    elemWidth: f,
                    elemHeight: c,
                    collisionPosition: o,
                    collisionWidth: T,
                    collisionHeight: N,
                    offset: [n[0] + k[0], n[1] + k[1]],
                    my: t.my,
                    at: t.at,
                    within: y,
                    elem: a
                })
            }), e.fn.bgiframe && a.bgiframe(), t.using && (u = function (e) {
                var n = v.left - C.left, s = n + l - f, o = v.top - C.top, u = o + d - c, h = {
                    target: {element: g, left: v.left, top: v.top, width: l, height: d},
                    element: {element: a, left: C.left, top: C.top, width: f, height: c},
                    horizontal: s < 0 ? "left" : n > 0 ? "right" : "center",
                    vertical: u < 0 ? "top" : o > 0 ? "bottom" : "middle"
                };
                l < f && i(n + s) < l && (h.horizontal = "center"), d < c && i(o + u) < d && (h.vertical = "middle"), r(i(n), i(s)) > r(i(o), i(u)) ? h.important = "horizontal" : h.important = "vertical", t.using.call(this, e, h)
            }), a.offset(e.extend(C, {using: u}))
        })
    }, e.ui.position = {
        fit: {
            left: function (e, t) {
                var n = t.within, i = n.isWindow ? n.scrollLeft : n.offset.left, s = n.width,
                    o = e.left - t.collisionPosition.marginLeft, u = i - o, a = o + t.collisionWidth - s - i, f;
                t.collisionWidth > s ? u > 0 && a <= 0 ? (f = e.left + u + t.collisionWidth - s - i, e.left += u - f) : a > 0 && u <= 0 ? e.left = i : u > a ? e.left = i + s - t.collisionWidth : e.left = i : u > 0 ? e.left += u : a > 0 ? e.left -= a : e.left = r(e.left - o, e.left)
            }, top: function (e, t) {
                var n = t.within, i = n.isWindow ? n.scrollTop : n.offset.top, s = t.within.height,
                    o = e.top - t.collisionPosition.marginTop, u = i - o, a = o + t.collisionHeight - s - i, f;
                t.collisionHeight > s ? u > 0 && a <= 0 ? (f = e.top + u + t.collisionHeight - s - i, e.top += u - f) : a > 0 && u <= 0 ? e.top = i : u > a ? e.top = i + s - t.collisionHeight : e.top = i : u > 0 ? e.top += u : a > 0 ? e.top -= a : e.top = r(e.top - o, e.top)
            }
        }, flip: {
            left: function (e, t) {
                var n = t.within, r = n.offset.left + n.scrollLeft, s = n.width,
                    o = n.isWindow ? n.scrollLeft : n.offset.left, u = e.left - t.collisionPosition.marginLeft,
                    a = u - o, f = u + t.collisionWidth - s - o,
                    l = t.my[0] === "left" ? -t.elemWidth : t.my[0] === "right" ? t.elemWidth : 0,
                    c = t.at[0] === "left" ? t.targetWidth : t.at[0] === "right" ? -t.targetWidth : 0,
                    h = -2 * t.offset[0], p, d;
                if (a < 0) {
                    p = e.left + l + c + h + t.collisionWidth - s - r;
                    if (p < 0 || p < i(a)) e.left += l + c + h
                } else if (f > 0) {
                    d = e.left - t.collisionPosition.marginLeft + l + c + h - o;
                    if (d > 0 || i(d) < f) e.left += l + c + h
                }
            }, top: function (e, t) {
                var n = t.within, r = n.offset.top + n.scrollTop, s = n.height,
                    o = n.isWindow ? n.scrollTop : n.offset.top, u = e.top - t.collisionPosition.marginTop, a = u - o,
                    f = u + t.collisionHeight - s - o, l = t.my[1] === "top",
                    c = l ? -t.elemHeight : t.my[1] === "bottom" ? t.elemHeight : 0,
                    h = t.at[1] === "top" ? t.targetHeight : t.at[1] === "bottom" ? -t.targetHeight : 0,
                    p = -2 * t.offset[1], d, v;
                a < 0 ? (v = e.top + c + h + p + t.collisionHeight - s - r, e.top + c + h + p > a && (v < 0 || v < i(a)) && (e.top += c + h + p)) : f > 0 && (d = e.top - t.collisionPosition.marginTop + c + h + p - o, e.top + c + h + p > f && (d > 0 || i(d) < f) && (e.top += c + h + p))
            }
        }, flipfit: {
            left: function () {
                e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments)
            }, top: function () {
                e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments)
            }
        }
    }, function () {
        var t, n, r, i, s, o = document.getElementsByTagName("body")[0], u = document.createElement("div");
        t = document.createElement(o ? "div" : "body"), r = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        }, o && e.extend(r, {position: "absolute", left: "-1000px", top: "-1000px"});
        for (s in r) t.style[s] = r[s];
        t.appendChild(u), n = o || document.documentElement, n.insertBefore(t, n.firstChild), u.style.cssText = "position: absolute; left: 10.7432222px;", i = e(u).offset().left, e.support.offsetFractions = i > 10 && i < 11, t.innerHTML = "", n.removeChild(t)
    }(), e.uiBackCompat !== !1 && function (e) {
        var n = e.fn.position;
        e.fn.position = function (r) {
            if (!r || !r.offset) return n.call(this, r);
            var i = r.offset.split(" "), s = r.at.split(" ");
            return i.length === 1 && (i[1] = i[0]), /^\d/.test(i[0]) && (i[0] = "+" + i[0]), /^\d/.test(i[1]) && (i[1] = "+" + i[1]), s.length === 1 && (/left|center|right/.test(s[0]) ? s[1] = "center" : (s[1] = s[0], s[0] = "center")), n.call(this, e.extend(r, {
                at: s[0] + i[0] + " " + s[1] + i[1],
                offset: t
            }))
        }
    }(jQuery)
})(jQuery);
/*! jQuery UI - v1.9.2 - 2012-11-23
* http://jqueryui.com
* Includes: jquery.ui.draggable.js
* Copyright 2012 jQuery Foundation and other contributors; Licensed MIT */
(function (e, t) {
    e.widget("ui.draggable", e.ui.mouse, {
        version: "1.9.2",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1
        },
        _create: function () {
            this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
        },
        _destroy: function () {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
        },
        _mouseCapture: function (t) {
            var n = this.options;
            return this.helper || n.disabled || e(t.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(t), this.handle ? (e(n.iframeFix === !0 ? "iframe" : n.iframeFix).each(function () {
                e('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(e(this).offset()).appendTo("body")
            }), !0) : !1)
        },
        _mouseStart: function (t) {
            var n = this.options;
            return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, e.extend(this.offset, {
                click: {left: t.pageX - this.offset.left, top: t.pageY - this.offset.top},
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.originalPosition = this.position = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, n.cursorAt && this._adjustOffsetFromHelper(n.cursorAt), n.containment && this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0)
        },
        _mouseDrag: function (t, n) {
            this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute");
            if (!n) {
                var r = this._uiHash();
                if (this._trigger("drag", t, r) === !1) return this._mouseUp({}), !1;
                this.position = r.position
            }
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            return e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1
        },
        _mouseStop: function (t) {
            var n = !1;
            e.ui.ddmanager && !this.options.dropBehaviour && (n = e.ui.ddmanager.drop(this, t)), this.dropped && (n = this.dropped, this.dropped = !1);
            var r = this.element[0], i = !1;
            while (r && (r = r.parentNode)) r == document && (i = !0);
            if (!i && this.options.helper === "original") return !1;
            if (this.options.revert == "invalid" && !n || this.options.revert == "valid" && n || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, n)) {
                var s = this;
                e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                    s._trigger("stop", t) !== !1 && s._clear()
                })
            } else this._trigger("stop", t) !== !1 && this._clear();
            return !1
        },
        _mouseUp: function (t) {
            return e("div.ui-draggable-iframeFix").each(function () {
                this.parentNode.removeChild(this)
            }), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), e.ui.mouse.prototype._mouseUp.call(this, t)
        },
        cancel: function () {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
        },
        _getHandle: function (t) {
            var n = !this.options.handle || !e(this.options.handle, this.element).length ? !0 : !1;
            return e(this.options.handle, this.element).find("*").andSelf().each(function () {
                this == t.target && (n = !0)
            }), n
        },
        _createHelper: function (t) {
            var n = this.options,
                r = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t])) : n.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
            return r.parents("body").length || r.appendTo(n.appendTo == "parent" ? this.element[0].parentNode : n.appendTo), r[0] != this.element[0] && !/(fixed|absolute)/.test(r.css("position")) && r.css("position", "absolute"), r
        },
        _adjustOffsetFromHelper: function (t) {
            typeof t == "string" && (t = t.split(" ")), e.isArray(t) && (t = {
                left: +t[0],
                top: +t[1] || 0
            }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var t = this.offsetParent.offset();
            this.cssPosition == "absolute" && this.scrollParent[0] != document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop());
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && e.ui.ie) t = {
                top: 0,
                left: 0
            };
            return {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var e = this.element.position();
                return {
                    top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {top: 0, left: 0}
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        },
        _setContainment: function () {
            var t = this.options;
            t.containment == "parent" && (t.containment = this.helper[0].parentNode);
            if (t.containment == "document" || t.containment == "window") this.containment = [t.containment == "document" ? 0 : e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t.containment == "document" ? 0 : e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (t.containment == "document" ? 0 : e(window).scrollLeft()) + e(t.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (t.containment == "document" ? 0 : e(window).scrollTop()) + (e(t.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(t.containment) && t.containment.constructor != Array) {
                var n = e(t.containment), r = n[0];
                if (!r) return;
                var i = n.offset(), s = e(r).css("overflow") != "hidden";
                this.containment = [(parseInt(e(r).css("borderLeftWidth"), 10) || 0) + (parseInt(e(r).css("paddingLeft"), 10) || 0), (parseInt(e(r).css("borderTopWidth"), 10) || 0) + (parseInt(e(r).css("paddingTop"), 10) || 0), (s ? Math.max(r.scrollWidth, r.offsetWidth) : r.offsetWidth) - (parseInt(e(r).css("borderLeftWidth"), 10) || 0) - (parseInt(e(r).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (s ? Math.max(r.scrollHeight, r.offsetHeight) : r.offsetHeight) - (parseInt(e(r).css("borderTopWidth"), 10) || 0) - (parseInt(e(r).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = n
            } else t.containment.constructor == Array && (this.containment = t.containment)
        },
        _convertPositionTo: function (t, n) {
            n || (n = this.position);
            var r = t == "absolute" ? 1 : -1, i = this.options,
                s = this.cssPosition != "absolute" || this.scrollParent[0] != document && !!e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                o = /(html|body)/i.test(s[0].tagName);
            return {
                top: n.top + this.offset.relative.top * r + this.offset.parent.top * r - (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : o ? 0 : s.scrollTop()) * r,
                left: n.left + this.offset.relative.left * r + this.offset.parent.left * r - (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : o ? 0 : s.scrollLeft()) * r
            }
        },
        _generatePosition: function (t) {
            var n = this.options,
                r = this.cssPosition != "absolute" || this.scrollParent[0] != document && !!e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                i = /(html|body)/i.test(r[0].tagName), s = t.pageX, o = t.pageY;
            if (this.originalPosition) {
                var u;
                if (this.containment) {
                    if (this.relative_container) {
                        var a = this.relative_container.offset();
                        u = [this.containment[0] + a.left, this.containment[1] + a.top, this.containment[2] + a.left, this.containment[3] + a.top]
                    } else u = this.containment;
                    t.pageX - this.offset.click.left < u[0] && (s = u[0] + this.offset.click.left), t.pageY - this.offset.click.top < u[1] && (o = u[1] + this.offset.click.top), t.pageX - this.offset.click.left > u[2] && (s = u[2] + this.offset.click.left), t.pageY - this.offset.click.top > u[3] && (o = u[3] + this.offset.click.top)
                }
                if (n.grid) {
                    var f = n.grid[1] ? this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1] : this.originalPageY;
                    o = u ? f - this.offset.click.top < u[1] || f - this.offset.click.top > u[3] ? f - this.offset.click.top < u[1] ? f + n.grid[1] : f - n.grid[1] : f : f;
                    var l = n.grid[0] ? this.originalPageX + Math.round((s - this.originalPageX) / n.grid[0]) * n.grid[0] : this.originalPageX;
                    s = u ? l - this.offset.click.left < u[0] || l - this.offset.click.left > u[2] ? l - this.offset.click.left < u[0] ? l + n.grid[0] : l - n.grid[0] : l : l
                }
            }
            return {
                top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : i ? 0 : r.scrollTop()),
                left: s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : r.scrollLeft())
            }
        },
        _clear: function () {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
        },
        _trigger: function (t, n, r) {
            return r = r || this._uiHash(), e.ui.plugin.call(this, t, [n, r]), t == "drag" && (this.positionAbs = this._convertPositionTo("absolute")), e.Widget.prototype._trigger.call(this, t, n, r)
        },
        plugins: {},
        _uiHash: function (e) {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }), e.ui.plugin.add("draggable", "connectToSortable", {
        start: function (t, n) {
            var r = e(this).data("draggable"), i = r.options, s = e.extend({}, n, {item: r.element});
            r.sortables = [], e(i.connectToSortable).each(function () {
                var n = e.data(this, "sortable");
                n && !n.options.disabled && (r.sortables.push({
                    instance: n,
                    shouldRevert: n.options.revert
                }), n.refreshPositions(), n._trigger("activate", t, s))
            })
        }, stop: function (t, n) {
            var r = e(this).data("draggable"), i = e.extend({}, n, {item: r.element});
            e.each(r.sortables, function () {
                this.instance.isOver ? (this.instance.isOver = 0, r.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, r.options.helper == "original" && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, i))
            })
        }, drag: function (t, n) {
            var r = e(this).data("draggable"), i = this, s = function (t) {
                var n = this.offset.click.top, r = this.offset.click.left, i = this.positionAbs.top,
                    s = this.positionAbs.left, o = t.height, u = t.width, a = t.top, f = t.left;
                return e.ui.isOver(i + n, s + r, a, f, o, u)
            };
            e.each(r.sortables, function (s) {
                var o = !1, u = this;
                this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (o = !0, e.each(r.sortables, function () {
                    return this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this != u && this.instance._intersectsWith(this.instance.containerCache) && e.ui.contains(u.instance.element[0], this.instance.element[0]) && (o = !1), o
                })), o ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = e(i).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
                    return n.helper[0]
                }, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = r.offset.click.top, this.instance.offset.click.left = r.offset.click.left, this.instance.offset.parent.left -= r.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= r.offset.parent.top - this.instance.offset.parent.top, r._trigger("toSortable", t), r.dropped = this.instance.element, r.currentItem = r.element, this.instance.fromOutside = r), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), r._trigger("fromSortable", t), r.dropped = !1)
            })
        }
    }), e.ui.plugin.add("draggable", "cursor", {
        start: function (t, n) {
            var r = e("body"), i = e(this).data("draggable").options;
            r.css("cursor") && (i._cursor = r.css("cursor")), r.css("cursor", i.cursor)
        }, stop: function (t, n) {
            var r = e(this).data("draggable").options;
            r._cursor && e("body").css("cursor", r._cursor)
        }
    }), e.ui.plugin.add("draggable", "opacity", {
        start: function (t, n) {
            var r = e(n.helper), i = e(this).data("draggable").options;
            r.css("opacity") && (i._opacity = r.css("opacity")), r.css("opacity", i.opacity)
        }, stop: function (t, n) {
            var r = e(this).data("draggable").options;
            r._opacity && e(n.helper).css("opacity", r._opacity)
        }
    }), e.ui.plugin.add("draggable", "scroll", {
        start: function (t, n) {
            var r = e(this).data("draggable");
            r.scrollParent[0] != document && r.scrollParent[0].tagName != "HTML" && (r.overflowOffset = r.scrollParent.offset())
        }, drag: function (t, n) {
            var r = e(this).data("draggable"), i = r.options, s = !1;
            if (r.scrollParent[0] != document && r.scrollParent[0].tagName != "HTML") {
                if (!i.axis || i.axis != "x") r.overflowOffset.top + r.scrollParent[0].offsetHeight - t.pageY < i.scrollSensitivity ? r.scrollParent[0].scrollTop = s = r.scrollParent[0].scrollTop + i.scrollSpeed : t.pageY - r.overflowOffset.top < i.scrollSensitivity && (r.scrollParent[0].scrollTop = s = r.scrollParent[0].scrollTop - i.scrollSpeed);
                if (!i.axis || i.axis != "y") r.overflowOffset.left + r.scrollParent[0].offsetWidth - t.pageX < i.scrollSensitivity ? r.scrollParent[0].scrollLeft = s = r.scrollParent[0].scrollLeft + i.scrollSpeed : t.pageX - r.overflowOffset.left < i.scrollSensitivity && (r.scrollParent[0].scrollLeft = s = r.scrollParent[0].scrollLeft - i.scrollSpeed)
            } else {
                if (!i.axis || i.axis != "x") t.pageY - e(document).scrollTop() < i.scrollSensitivity ? s = e(document).scrollTop(e(document).scrollTop() - i.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < i.scrollSensitivity && (s = e(document).scrollTop(e(document).scrollTop() + i.scrollSpeed));
                if (!i.axis || i.axis != "y") t.pageX - e(document).scrollLeft() < i.scrollSensitivity ? s = e(document).scrollLeft(e(document).scrollLeft() - i.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < i.scrollSensitivity && (s = e(document).scrollLeft(e(document).scrollLeft() + i.scrollSpeed))
            }
            s !== !1 && e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(r, t)
        }
    }), e.ui.plugin.add("draggable", "snap", {
        start: function (t, n) {
            var r = e(this).data("draggable"), i = r.options;
            r.snapElements = [], e(i.snap.constructor != String ? i.snap.items || ":data(draggable)" : i.snap).each(function () {
                var t = e(this), n = t.offset();
                this != r.element[0] && r.snapElements.push({
                    item: this,
                    width: t.outerWidth(),
                    height: t.outerHeight(),
                    top: n.top,
                    left: n.left
                })
            })
        }, drag: function (t, n) {
            var r = e(this).data("draggable"), i = r.options, s = i.snapTolerance, o = n.offset.left,
                u = o + r.helperProportions.width, a = n.offset.top, f = a + r.helperProportions.height;
            for (var l = r.snapElements.length - 1; l >= 0; l--) {
                var c = r.snapElements[l].left, h = c + r.snapElements[l].width, p = r.snapElements[l].top,
                    d = p + r.snapElements[l].height;
                if (!(c - s < o && o < h + s && p - s < a && a < d + s || c - s < o && o < h + s && p - s < f && f < d + s || c - s < u && u < h + s && p - s < a && a < d + s || c - s < u && u < h + s && p - s < f && f < d + s)) {
                    r.snapElements[l].snapping && r.options.snap.release && r.options.snap.release.call(r.element, t, e.extend(r._uiHash(), {snapItem: r.snapElements[l].item})), r.snapElements[l].snapping = !1;
                    continue
                }
                if (i.snapMode != "inner") {
                    var v = Math.abs(p - f) <= s, m = Math.abs(d - a) <= s, g = Math.abs(c - u) <= s,
                        y = Math.abs(h - o) <= s;
                    v && (n.position.top = r._convertPositionTo("relative", {
                        top: p - r.helperProportions.height,
                        left: 0
                    }).top - r.margins.top), m && (n.position.top = r._convertPositionTo("relative", {
                        top: d,
                        left: 0
                    }).top - r.margins.top), g && (n.position.left = r._convertPositionTo("relative", {
                        top: 0,
                        left: c - r.helperProportions.width
                    }).left - r.margins.left), y && (n.position.left = r._convertPositionTo("relative", {
                        top: 0,
                        left: h
                    }).left - r.margins.left)
                }
                var b = v || m || g || y;
                if (i.snapMode != "outer") {
                    var v = Math.abs(p - a) <= s, m = Math.abs(d - f) <= s, g = Math.abs(c - o) <= s,
                        y = Math.abs(h - u) <= s;
                    v && (n.position.top = r._convertPositionTo("relative", {
                        top: p,
                        left: 0
                    }).top - r.margins.top), m && (n.position.top = r._convertPositionTo("relative", {
                        top: d - r.helperProportions.height,
                        left: 0
                    }).top - r.margins.top), g && (n.position.left = r._convertPositionTo("relative", {
                        top: 0,
                        left: c
                    }).left - r.margins.left), y && (n.position.left = r._convertPositionTo("relative", {
                        top: 0,
                        left: h - r.helperProportions.width
                    }).left - r.margins.left)
                }
                !r.snapElements[l].snapping && (v || m || g || y || b) && r.options.snap.snap && r.options.snap.snap.call(r.element, t, e.extend(r._uiHash(), {snapItem: r.snapElements[l].item})), r.snapElements[l].snapping = v || m || g || y || b
            }
        }
    }), e.ui.plugin.add("draggable", "stack", {
        start: function (t, n) {
            var r = e(this).data("draggable").options, i = e.makeArray(e(r.stack)).sort(function (t, n) {
                return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(n).css("zIndex"), 10) || 0)
            });
            if (!i.length) return;
            var s = parseInt(i[0].style.zIndex) || 0;
            e(i).each(function (e) {
                this.style.zIndex = s + e
            }), this[0].style.zIndex = s + i.length
        }
    }), e.ui.plugin.add("draggable", "zIndex", {
        start: function (t, n) {
            var r = e(n.helper), i = e(this).data("draggable").options;
            r.css("zIndex") && (i._zIndex = r.css("zIndex")), r.css("zIndex", i.zIndex)
        }, stop: function (t, n) {
            var r = e(this).data("draggable").options;
            r._zIndex && e(n.helper).css("zIndex", r._zIndex)
        }
    })
})(jQuery);
/*! jQuery UI - v1.9.2 - 2012-11-23
* http://jqueryui.com
* Includes: jquery.ui.button.js
* Copyright 2012 jQuery Foundation and other contributors; Licensed MIT */
(function (e, t) {
    var n, r, i, s, o = "ui-button ui-widget ui-state-default ui-corner-all", u = "ui-state-hover ui-state-active ",
        a = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
        f = function () {
            var t = e(this).find(":ui-button");
            setTimeout(function () {
                t.button("refresh")
            }, 1)
        }, l = function (t) {
            var n = t.name, r = t.form, i = e([]);
            return n && (r ? i = e(r).find("[name='" + n + "']") : i = e("[name='" + n + "']", t.ownerDocument).filter(function () {
                return !this.form
            })), i
        };
    e.widget("ui.button", {
        version: "1.9.2",
        defaultElement: "<button>",
        options: {disabled: null, text: !0, label: null, icons: {primary: null, secondary: null}},
        _create: function () {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, f), typeof this.options.disabled != "boolean" ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
            var t = this, u = this.options, a = this.type === "checkbox" || this.type === "radio",
                c = a ? "" : "ui-state-active", h = "ui-state-focus";
            u.label === null && (u.label = this.type === "input" ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(o).attr("role", "button").bind("mouseenter" + this.eventNamespace, function () {
                if (u.disabled) return;
                this === n && e(this).addClass("ui-state-active")
            }).bind("mouseleave" + this.eventNamespace, function () {
                if (u.disabled) return;
                e(this).removeClass(c)
            }).bind("click" + this.eventNamespace, function (e) {
                u.disabled && (e.preventDefault(), e.stopImmediatePropagation())
            }), this.element.bind("focus" + this.eventNamespace, function () {
                t.buttonElement.addClass(h)
            }).bind("blur" + this.eventNamespace, function () {
                t.buttonElement.removeClass(h)
            }), a && (this.element.bind("change" + this.eventNamespace, function () {
                if (s) return;
                t.refresh()
            }), this.buttonElement.bind("mousedown" + this.eventNamespace, function (e) {
                if (u.disabled) return;
                s = !1, r = e.pageX, i = e.pageY
            }).bind("mouseup" + this.eventNamespace, function (e) {
                if (u.disabled) return;
                if (r !== e.pageX || i !== e.pageY) s = !0
            })), this.type === "checkbox" ? this.buttonElement.bind("click" + this.eventNamespace, function () {
                if (u.disabled || s) return !1;
                e(this).toggleClass("ui-state-active"), t.buttonElement.attr("aria-pressed", t.element[0].checked)
            }) : this.type === "radio" ? this.buttonElement.bind("click" + this.eventNamespace, function () {
                if (u.disabled || s) return !1;
                e(this).addClass("ui-state-active"), t.buttonElement.attr("aria-pressed", "true");
                var n = t.element[0];
                l(n).not(n).map(function () {
                    return e(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function () {
                if (u.disabled) return !1;
                e(this).addClass("ui-state-active"), n = this, t.document.one("mouseup", function () {
                    n = null
                })
            }).bind("mouseup" + this.eventNamespace, function () {
                if (u.disabled) return !1;
                e(this).removeClass("ui-state-active")
            }).bind("keydown" + this.eventNamespace, function (t) {
                if (u.disabled) return !1;
                (t.keyCode === e.ui.keyCode.SPACE || t.keyCode === e.ui.keyCode.ENTER) && e(this).addClass("ui-state-active")
            }).bind("keyup" + this.eventNamespace, function () {
                e(this).removeClass("ui-state-active")
            }), this.buttonElement.is("a") && this.buttonElement.keyup(function (t) {
                t.keyCode === e.ui.keyCode.SPACE && e(this).click()
            })), this._setOption("disabled", u.disabled), this._resetButton()
        },
        _determineButtonType: function () {
            var e, t, n;
            this.element.is("[type=checkbox]") ? this.type = "checkbox" : this.element.is("[type=radio]") ? this.type = "radio" : this.element.is("input") ? this.type = "input" : this.type = "button", this.type === "checkbox" || this.type === "radio" ? (e = this.element.parents().last(), t = "label[for='" + this.element.attr("id") + "']", this.buttonElement = e.find(t), this.buttonElement.length || (e = e.length ? e.siblings() : this.element.siblings(), this.buttonElement = e.filter(t), this.buttonElement.length || (this.buttonElement = e.find(t))), this.element.addClass("ui-helper-hidden-accessible"), n = this.element.is(":checked"), n && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", n)) : this.buttonElement = this.element
        },
        widget: function () {
            return this.buttonElement
        },
        _destroy: function () {
            this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(o + " " + u + " " + a).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
        },
        _setOption: function (e, t) {
            this._super(e, t);
            if (e === "disabled") {
                t ? this.element.prop("disabled", !0) : this.element.prop("disabled", !1);
                return
            }
            this._resetButton()
        },
        refresh: function () {
            var t = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            t !== this.options.disabled && this._setOption("disabled", t), this.type === "radio" ? l(this.element[0]).each(function () {
                e(this).is(":checked") ? e(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : this.type === "checkbox" && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
        },
        _resetButton: function () {
            if (this.type === "input") {
                this.options.label && this.element.val(this.options.label);
                return
            }
            var t = this.buttonElement.removeClass(a),
                n = e("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),
                r = this.options.icons, i = r.primary && r.secondary, s = [];
            r.primary || r.secondary ? (this.options.text && s.push("ui-button-text-icon" + (i ? "s" : r.primary ? "-primary" : "-secondary")), r.primary && t.prepend("<span class='ui-button-icon-primary ui-icon " + r.primary + "'></span>"), r.secondary && t.append("<span class='ui-button-icon-secondary ui-icon " + r.secondary + "'></span>"), this.options.text || (s.push(i ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || t.attr("title", e.trim(n)))) : s.push("ui-button-text-only"), t.addClass(s.join(" "))
        }
    }), e.widget("ui.buttonset", {
        version: "1.9.2",
        options: {items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(button)"},
        _create: function () {
            this.element.addClass("ui-buttonset")
        },
        _init: function () {
            this.refresh()
        },
        _setOption: function (e, t) {
            e === "disabled" && this.buttons.button("option", e, t), this._super(e, t)
        },
        refresh: function () {
            var t = this.element.css("direction") === "rtl";
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function () {
                return e(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(t ? "ui-corner-left" : "ui-corner-right").end().end()
        },
        _destroy: function () {
            this.element.removeClass("ui-buttonset"), this.buttons.map(function () {
                return e(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
        }
    })
})(jQuery);
/*! jQuery UI - v1.9.2 - 2012-11-23
* http://jqueryui.com
* Includes: jquery.ui.dialog.js
* Copyright 2012 jQuery Foundation and other contributors; Licensed MIT */
(function (e, t) {
    var n = "ui-dialog ui-widget ui-widget-content ui-corner-all ",
        r = {buttons: !0, height: !0, maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0, width: !0},
        i = {maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0};
    e.widget("ui.dialog", {
        version: "1.9.2",
        options: {
            autoOpen: !0,
            buttons: {},
            closeOnEscape: !0,
            closeText: "close",
            dialogClass: "",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: !1,
            maxWidth: !1,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center", at: "center", of: window, collision: "fit", using: function (t) {
                    var n = e(this).css(t).offset().top;
                    n < 0 && e(this).css("top", t.top - n)
                }
            },
            resizable: !0,
            show: null,
            stack: !0,
            title: "",
            width: 300,
            zIndex: 1e3
        },
        _create: function () {
            this.originalTitle = this.element.attr("title"), typeof this.originalTitle != "string" && (this.originalTitle = ""), this.oldPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            }, this.options.title = this.options.title || this.originalTitle;
            var t = this, r = this.options, i = r.title || "&#160;", s, o, u, a, f;
            s = (this.uiDialog = e("<div>")).addClass(n + r.dialogClass).css({
                display: "none",
                outline: 0,
                zIndex: r.zIndex
            }).attr("tabIndex", -1).keydown(function (n) {
                r.closeOnEscape && !n.isDefaultPrevented() && n.keyCode && n.keyCode === e.ui.keyCode.ESCAPE && (t.close(n), n.preventDefault())
            }).mousedown(function (e) {
                t.moveToTop(!1, e)
            }).appendTo("body"), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(s), o = (this.uiDialogTitlebar = e("<div>")).addClass("ui-dialog-titlebar  ui-widget-header  ui-corner-all  ui-helper-clearfix").bind("mousedown", function () {
                s.focus()
            }).prependTo(s), u = e("<a href='#'></a>").addClass("ui-dialog-titlebar-close  ui-corner-all").attr("role", "button").click(function (e) {
                e.preventDefault(), t.close(e)
            }).appendTo(o), (this.uiDialogTitlebarCloseText = e("<span>")).addClass("ui-icon ui-icon-closethick").text(r.closeText).appendTo(u), a = e("<span>").uniqueId().addClass("ui-dialog-title").html(i).prependTo(o), f = (this.uiDialogButtonPane = e("<div>")).addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), (this.uiButtonSet = e("<div>")).addClass("ui-dialog-buttonset").appendTo(f), s.attr({
                role: "dialog",
                "aria-labelledby": a.attr("id")
            }), o.find("*").add(o).disableSelection(), this._hoverable(u), this._focusable(u), r.draggable && e.fn.draggable && this._makeDraggable(), r.resizable && e.fn.resizable && this._makeResizable(), this._createButtons(r.buttons), this._isOpen = !1, e.fn.bgiframe && s.bgiframe(), this._on(s, {
                keydown: function (t) {
                    if (!r.modal || t.keyCode !== e.ui.keyCode.TAB) return;
                    var n = e(":tabbable", s), i = n.filter(":first"), o = n.filter(":last");
                    if (t.target === o[0] && !t.shiftKey) return i.focus(1), !1;
                    if (t.target === i[0] && t.shiftKey) return o.focus(1), !1
                }
            })
        },
        _init: function () {
            this.options.autoOpen && this.open()
        },
        _destroy: function () {
            var e, t = this.oldPosition;
            this.overlay && this.overlay.destroy(), this.uiDialog.hide(), this.element.removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"), this.uiDialog.remove(), this.originalTitle && this.element.attr("title", this.originalTitle), e = t.parent.children().eq(t.index), e.length && e[0] !== this.element[0] ? e.before(this.element) : t.parent.append(this.element)
        },
        widget: function () {
            return this.uiDialog
        },
        close: function (t) {
            var n = this, r, i;
            if (!this._isOpen) return;
            if (!1 === this._trigger("beforeClose", t)) return;
            return this._isOpen = !1, this.overlay && this.overlay.destroy(), this.options.hide ? this._hide(this.uiDialog, this.options.hide, function () {
                n._trigger("close", t)
            }) : (this.uiDialog.hide(), this._trigger("close", t)), e.ui.dialog.overlay.resize(), this.options.modal && (r = 0, e(".ui-dialog").each(function () {
                this !== n.uiDialog[0] && (i = e(this).css("z-index"), isNaN(i) || (r = Math.max(r, i)))
            }), e.ui.dialog.maxZ = r), this
        },
        isOpen: function () {
            return this._isOpen
        },
        moveToTop: function (t, n) {
            var r = this.options, i;
            return r.modal && !t || !r.stack && !r.modal ? this._trigger("focus", n) : (r.zIndex > e.ui.dialog.maxZ && (e.ui.dialog.maxZ = r.zIndex), this.overlay && (e.ui.dialog.maxZ += 1, e.ui.dialog.overlay.maxZ = e.ui.dialog.maxZ, this.overlay.$el.css("z-index", e.ui.dialog.overlay.maxZ)), i = {
                scrollTop: this.element.scrollTop(),
                scrollLeft: this.element.scrollLeft()
            }, e.ui.dialog.maxZ += 1, this.uiDialog.css("z-index", e.ui.dialog.maxZ), this.element.attr(i), this._trigger("focus", n), this)
        },
        open: function () {
            if (this._isOpen) return;
            var t, n = this.options, r = this.uiDialog;
            return this._size(), this._position(n.position), r.show(n.show), this.overlay = n.modal ? new e.ui.dialog.overlay(this) : null, this.moveToTop(!0), t = this.element.find(":tabbable"), t.length || (t = this.uiDialogButtonPane.find(":tabbable"), t.length || (t = r)), t.eq(0).focus(), this._isOpen = !0, this._trigger("open"), this
        },
        _createButtons: function (t) {
            var n = this, r = !1;
            this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), typeof t == "object" && t !== null && e.each(t, function () {
                return !(r = !0)
            }), r ? (e.each(t, function (t, r) {
                var i, s;
                r = e.isFunction(r) ? {
                    click: r,
                    text: t
                } : r, r = e.extend({type: "button"}, r), s = r.click, r.click = function () {
                    s.apply(n.element[0], arguments)
                }, i = e("<button></button>", r).appendTo(n.uiButtonSet), e.fn.button && i.button()
            }), this.uiDialog.addClass("ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog)) : this.uiDialog.removeClass("ui-dialog-buttons")
        },
        _makeDraggable: function () {
            function r(e) {
                return {position: e.position, offset: e.offset}
            }

            var t = this, n = this.options;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function (n, i) {
                    e(this).addClass("ui-dialog-dragging"), t._trigger("dragStart", n, r(i))
                },
                drag: function (e, n) {
                    t._trigger("drag", e, r(n))
                },
                stop: function (i, s) {
                    n.position = [s.position.left - t.document.scrollLeft(), s.position.top - t.document.scrollTop()], e(this).removeClass("ui-dialog-dragging"), t._trigger("dragStop", i, r(s)), e.ui.dialog.overlay.resize()
                }
            })
        },
        _makeResizable: function (n) {
            function u(e) {
                return {
                    originalPosition: e.originalPosition,
                    originalSize: e.originalSize,
                    position: e.position,
                    size: e.size
                }
            }

            n = n === t ? this.options.resizable : n;
            var r = this, i = this.options, s = this.uiDialog.css("position"),
                o = typeof n == "string" ? n : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: i.maxWidth,
                maxHeight: i.maxHeight,
                minWidth: i.minWidth,
                minHeight: this._minHeight(),
                handles: o,
                start: function (t, n) {
                    e(this).addClass("ui-dialog-resizing"), r._trigger("resizeStart", t, u(n))
                },
                resize: function (e, t) {
                    r._trigger("resize", e, u(t))
                },
                stop: function (t, n) {
                    e(this).removeClass("ui-dialog-resizing"), i.height = e(this).height(), i.width = e(this).width(), r._trigger("resizeStop", t, u(n)), e.ui.dialog.overlay.resize()
                }
            }).css("position", s).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
        },
        _minHeight: function () {
            var e = this.options;
            return e.height === "auto" ? e.minHeight : Math.min(e.minHeight, e.height)
        },
        _position: function (t) {
            var n = [], r = [0, 0], i;
            if (t) {
                if (typeof t == "string" || typeof t == "object" && "0" in t) n = t.split ? t.split(" ") : [t[0], t[1]], n.length === 1 && (n[1] = n[0]), e.each(["left", "top"], function (e, t) {
                    +n[e] === n[e] && (r[e] = n[e], n[e] = t)
                }), t = {
                    my: n[0] + (r[0] < 0 ? r[0] : "+" + r[0]) + " " + n[1] + (r[1] < 0 ? r[1] : "+" + r[1]),
                    at: n.join(" ")
                };
                t = e.extend({}, e.ui.dialog.prototype.options.position, t)
            } else t = e.ui.dialog.prototype.options.position;
            i = this.uiDialog.is(":visible"), i || this.uiDialog.show(), this.uiDialog.position(t), i || this.uiDialog.hide()
        },
        _setOptions: function (t) {
            var n = this, s = {}, o = !1;
            e.each(t, function (e, t) {
                n._setOption(e, t), e in r && (o = !0), e in i && (s[e] = t)
            }), o && this._size(), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", s)
        },
        _setOption: function (t, r) {
            var i, s, o = this.uiDialog;
            switch (t) {
                case"buttons":
                    this._createButtons(r);
                    break;
                case"closeText":
                    this.uiDialogTitlebarCloseText.text("" + r);
                    break;
                case"dialogClass":
                    o.removeClass(this.options.dialogClass).addClass(n + r);
                    break;
                case"disabled":
                    r ? o.addClass("ui-dialog-disabled") : o.removeClass("ui-dialog-disabled");
                    break;
                case"draggable":
                    i = o.is(":data(draggable)"), i && !r && o.draggable("destroy"), !i && r && this._makeDraggable();
                    break;
                case"position":
                    this._position(r);
                    break;
                case"resizable":
                    s = o.is(":data(resizable)"), s && !r && o.resizable("destroy"), s && typeof r == "string" && o.resizable("option", "handles", r), !s && r !== !1 && this._makeResizable(r);
                    break;
                case"title":
                    e(".ui-dialog-title", this.uiDialogTitlebar).html("" + (r || "&#160;"))
            }
            this._super(t, r)
        },
        _size: function () {
            var t, n, r, i = this.options, s = this.uiDialog.is(":visible");
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                height: 0
            }), i.minWidth > i.width && (i.width = i.minWidth), t = this.uiDialog.css({
                height: "auto",
                width: i.width
            }).outerHeight(), n = Math.max(0, i.minHeight - t), i.height === "auto" ? e.support.minHeight ? this.element.css({
                minHeight: n,
                height: "auto"
            }) : (this.uiDialog.show(), r = this.element.css("height", "auto").height(), s || this.uiDialog.hide(), this.element.height(Math.max(r, n))) : this.element.height(Math.max(i.height - t, 0)), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        }
    }), e.extend(e.ui.dialog, {
        uuid: 0, maxZ: 0, getTitleId: function (e) {
            var t = e.attr("id");
            return t || (this.uuid += 1, t = this.uuid), "ui-dialog-title-" + t
        }, overlay: function (t) {
            this.$el = e.ui.dialog.overlay.create(t)
        }
    }), e.extend(e.ui.dialog.overlay, {
        instances: [],
        oldInstances: [],
        maxZ: 0,
        events: e.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function (e) {
            return e + ".dialog-overlay"
        }).join(" "),
        create: function (t) {
            this.instances.length === 0 && (setTimeout(function () {
                e.ui.dialog.overlay.instances.length && e(document).bind(e.ui.dialog.overlay.events, function (t) {
                    if (e(t.target).zIndex() < e.ui.dialog.overlay.maxZ) return !1
                })
            }, 1), e(window).bind("resize.dialog-overlay", e.ui.dialog.overlay.resize));
            var n = this.oldInstances.pop() || e("<div>").addClass("ui-widget-overlay");
            return e(document).bind("keydown.dialog-overlay", function (r) {
                var i = e.ui.dialog.overlay.instances;
                i.length !== 0 && i[i.length - 1] === n && t.options.closeOnEscape && !r.isDefaultPrevented() && r.keyCode && r.keyCode === e.ui.keyCode.ESCAPE && (t.close(r), r.preventDefault())
            }), n.appendTo(document.body).css({
                width: this.width(),
                height: this.height()
            }), e.fn.bgiframe && n.bgiframe(), this.instances.push(n), n
        },
        destroy: function (t) {
            var n = e.inArray(t, this.instances), r = 0;
            n !== -1 && this.oldInstances.push(this.instances.splice(n, 1)[0]), this.instances.length === 0 && e([document, window]).unbind(".dialog-overlay"), t.height(0).width(0).remove(), e.each(this.instances, function () {
                r = Math.max(r, this.css("z-index"))
            }), this.maxZ = r
        },
        height: function () {
            var t, n;
            return e.ui.ie ? (t = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), n = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight), t < n ? e(window).height() + "px" : t + "px") : e(document).height() + "px"
        },
        width: function () {
            var t, n;
            return e.ui.ie ? (t = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), n = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth), t < n ? e(window).width() + "px" : t + "px") : e(document).width() + "px"
        },
        resize: function () {
            var t = e([]);
            e.each(e.ui.dialog.overlay.instances, function () {
                t = t.add(this)
            }), t.css({width: 0, height: 0}).css({
                width: e.ui.dialog.overlay.width(),
                height: e.ui.dialog.overlay.height()
            })
        }
    }), e.extend(e.ui.dialog.overlay.prototype, {
        destroy: function () {
            e.ui.dialog.overlay.destroy(this.$el)
        }
    })
})(jQuery);
/*! jQuery UI - v1.9.2 - 2012-11-23
* http://jqueryui.com
* Includes: jquery.ui.progressbar.js
* Copyright 2012 jQuery Foundation and other contributors; Licensed MIT */
(function (e, t) {
    e.widget("ui.progressbar", {
        version: "1.9.2", options: {value: 0, max: 100}, min: 0, _create: function () {
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._value()
            }), this.valueDiv = e("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this.oldValue = this._value(), this._refreshValue()
        }, _destroy: function () {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove()
        }, value: function (e) {
            return e === t ? this._value() : (this._setOption("value", e), this)
        }, _setOption: function (e, t) {
            e === "value" && (this.options.value = t, this._refreshValue(), this._value() === this.options.max && this._trigger("complete")), this._super(e, t)
        }, _value: function () {
            var e = this.options.value;
            return typeof e != "number" && (e = 0), Math.min(this.options.max, Math.max(this.min, e))
        }, _percentage: function () {
            return 100 * this._value() / this.options.max
        }, _refreshValue: function () {
            var e = this.value(), t = this._percentage();
            this.oldValue !== e && (this.oldValue = e, this._trigger("change")), this.valueDiv.toggle(e > this.min).toggleClass("ui-corner-right", e === this.options.max).width(t.toFixed(0) + "%"), this.element.attr("aria-valuenow", e)
        }
    })
})(jQuery);
/*! jQuery UI - v1.9.2 - 2012-11-23
* http://jqueryui.com
* Includes: jquery.ui.effect.js
* Copyright 2012 jQuery Foundation and other contributors; Licensed MIT */
jQuery.effects || function (e, t) {
    var n = e.uiBackCompat !== !1, r = "ui-effects-";
    e.effects = {effect: {}}, function (t, n) {
        function p(e, t, n) {
            var r = a[t.type] || {};
            return e == null ? n || !t.def ? null : t.def : (e = r.floor ? ~~e : parseFloat(e), isNaN(e) ? t.def : r.mod ? (e + r.mod) % r.mod : 0 > e ? 0 : r.max < e ? r.max : e)
        }

        function d(e) {
            var n = o(), r = n._rgba = [];
            return e = e.toLowerCase(), h(s, function (t, i) {
                var s, o = i.re.exec(e), a = o && i.parse(o), f = i.space || "rgba";
                if (a) return s = n[f](a), n[u[f].cache] = s[u[f].cache], r = n._rgba = s._rgba, !1
            }), r.length ? (r.join() === "0,0,0,0" && t.extend(r, c.transparent), n) : c[e]
        }

        function v(e, t, n) {
            return n = (n + 1) % 1, n * 6 < 1 ? e + (t - e) * n * 6 : n * 2 < 1 ? t : n * 3 < 2 ? e + (t - e) * (2 / 3 - n) * 6 : e
        }

        var r = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor".split(" "),
            i = /^([\-+])=\s*(\d+\.?\d*)/, s = [{
                re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                parse: function (e) {
                    return [e[1], e[2], e[3], e[4]]
                }
            }, {
                re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                parse: function (e) {
                    return [e[1] * 2.55, e[2] * 2.55, e[3] * 2.55, e[4]]
                }
            }, {
                re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse: function (e) {
                    return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
                }
            }, {
                re: /#([a-f0-9])([a-f0-9])([a-f0-9])/, parse: function (e) {
                    return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
                }
            }, {
                re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                space: "hsla",
                parse: function (e) {
                    return [e[1], e[2] / 100, e[3] / 100, e[4]]
                }
            }], o = t.Color = function (e, n, r, i) {
                return new t.Color.fn.parse(e, n, r, i)
            }, u = {
                rgba: {
                    props: {
                        red: {idx: 0, type: "byte"},
                        green: {idx: 1, type: "byte"},
                        blue: {idx: 2, type: "byte"}
                    }
                },
                hsla: {
                    props: {
                        hue: {idx: 0, type: "degrees"},
                        saturation: {idx: 1, type: "percent"},
                        lightness: {idx: 2, type: "percent"}
                    }
                }
            }, a = {"byte": {floor: !0, max: 255}, percent: {max: 1}, degrees: {mod: 360, floor: !0}}, f = o.support = {},
            l = t("<p>")[0], c, h = t.each;
        l.style.cssText = "background-color:rgba(1,1,1,.5)", f.rgba = l.style.backgroundColor.indexOf("rgba") > -1, h(u, function (e, t) {
            t.cache = "_" + e, t.props.alpha = {idx: 3, type: "percent", def: 1}
        }), o.fn = t.extend(o.prototype, {
            parse: function (r, i, s, a) {
                if (r === n) return this._rgba = [null, null, null, null], this;
                if (r.jquery || r.nodeType) r = t(r).css(i), i = n;
                var f = this, l = t.type(r), v = this._rgba = [];
                i !== n && (r = [r, i, s, a], l = "array");
                if (l === "string") return this.parse(d(r) || c._default);
                if (l === "array") return h(u.rgba.props, function (e, t) {
                    v[t.idx] = p(r[t.idx], t)
                }), this;
                if (l === "object") return r instanceof o ? h(u, function (e, t) {
                    r[t.cache] && (f[t.cache] = r[t.cache].slice())
                }) : h(u, function (t, n) {
                    var i = n.cache;
                    h(n.props, function (e, t) {
                        if (!f[i] && n.to) {
                            if (e === "alpha" || r[e] == null) return;
                            f[i] = n.to(f._rgba)
                        }
                        f[i][t.idx] = p(r[e], t, !0)
                    }), f[i] && e.inArray(null, f[i].slice(0, 3)) < 0 && (f[i][3] = 1, n.from && (f._rgba = n.from(f[i])))
                }), this
            }, is: function (e) {
                var t = o(e), n = !0, r = this;
                return h(u, function (e, i) {
                    var s, o = t[i.cache];
                    return o && (s = r[i.cache] || i.to && i.to(r._rgba) || [], h(i.props, function (e, t) {
                        if (o[t.idx] != null) return n = o[t.idx] === s[t.idx], n
                    })), n
                }), n
            }, _space: function () {
                var e = [], t = this;
                return h(u, function (n, r) {
                    t[r.cache] && e.push(n)
                }), e.pop()
            }, transition: function (e, t) {
                var n = o(e), r = n._space(), i = u[r], s = this.alpha() === 0 ? o("transparent") : this,
                    f = s[i.cache] || i.to(s._rgba), l = f.slice();
                return n = n[i.cache], h(i.props, function (e, r) {
                    var i = r.idx, s = f[i], o = n[i], u = a[r.type] || {};
                    if (o === null) return;
                    s === null ? l[i] = o : (u.mod && (o - s > u.mod / 2 ? s += u.mod : s - o > u.mod / 2 && (s -= u.mod)), l[i] = p((o - s) * t + s, r))
                }), this[r](l)
            }, blend: function (e) {
                if (this._rgba[3] === 1) return this;
                var n = this._rgba.slice(), r = n.pop(), i = o(e)._rgba;
                return o(t.map(n, function (e, t) {
                    return (1 - r) * i[t] + r * e
                }))
            }, toRgbaString: function () {
                var e = "rgba(", n = t.map(this._rgba, function (e, t) {
                    return e == null ? t > 2 ? 1 : 0 : e
                });
                return n[3] === 1 && (n.pop(), e = "rgb("), e + n.join() + ")"
            }, toHslaString: function () {
                var e = "hsla(", n = t.map(this.hsla(), function (e, t) {
                    return e == null && (e = t > 2 ? 1 : 0), t && t < 3 && (e = Math.round(e * 100) + "%"), e
                });
                return n[3] === 1 && (n.pop(), e = "hsl("), e + n.join() + ")"
            }, toHexString: function (e) {
                var n = this._rgba.slice(), r = n.pop();
                return e && n.push(~~(r * 255)), "#" + t.map(n, function (e) {
                    return e = (e || 0).toString(16), e.length === 1 ? "0" + e : e
                }).join("")
            }, toString: function () {
                return this._rgba[3] === 0 ? "transparent" : this.toRgbaString()
            }
        }), o.fn.parse.prototype = o.fn, u.hsla.to = function (e) {
            if (e[0] == null || e[1] == null || e[2] == null) return [null, null, null, e[3]];
            var t = e[0] / 255, n = e[1] / 255, r = e[2] / 255, i = e[3], s = Math.max(t, n, r), o = Math.min(t, n, r),
                u = s - o, a = s + o, f = a * .5, l, c;
            return o === s ? l = 0 : t === s ? l = 60 * (n - r) / u + 360 : n === s ? l = 60 * (r - t) / u + 120 : l = 60 * (t - n) / u + 240, f === 0 || f === 1 ? c = f : f <= .5 ? c = u / a : c = u / (2 - a), [Math.round(l) % 360, c, f, i == null ? 1 : i]
        }, u.hsla.from = function (e) {
            if (e[0] == null || e[1] == null || e[2] == null) return [null, null, null, e[3]];
            var t = e[0] / 360, n = e[1], r = e[2], i = e[3], s = r <= .5 ? r * (1 + n) : r + n - r * n, o = 2 * r - s;
            return [Math.round(v(o, s, t + 1 / 3) * 255), Math.round(v(o, s, t) * 255), Math.round(v(o, s, t - 1 / 3) * 255), i]
        }, h(u, function (e, r) {
            var s = r.props, u = r.cache, a = r.to, f = r.from;
            o.fn[e] = function (e) {
                a && !this[u] && (this[u] = a(this._rgba));
                if (e === n) return this[u].slice();
                var r, i = t.type(e), l = i === "array" || i === "object" ? e : arguments, c = this[u].slice();
                return h(s, function (e, t) {
                    var n = l[i === "object" ? e : t.idx];
                    n == null && (n = c[t.idx]), c[t.idx] = p(n, t)
                }), f ? (r = o(f(c)), r[u] = c, r) : o(c)
            }, h(s, function (n, r) {
                if (o.fn[n]) return;
                o.fn[n] = function (s) {
                    var o = t.type(s), u = n === "alpha" ? this._hsla ? "hsla" : "rgba" : e, a = this[u](),
                        f = a[r.idx], l;
                    return o === "undefined" ? f : (o === "function" && (s = s.call(this, f), o = t.type(s)), s == null && r.empty ? this : (o === "string" && (l = i.exec(s), l && (s = f + parseFloat(l[2]) * (l[1] === "+" ? 1 : -1))), a[r.idx] = s, this[u](a)))
                }
            })
        }), h(r, function (e, n) {
            t.cssHooks[n] = {
                set: function (e, r) {
                    var i, s, u = "";
                    if (t.type(r) !== "string" || (i = d(r))) {
                        r = o(i || r);
                        if (!f.rgba && r._rgba[3] !== 1) {
                            s = n === "backgroundColor" ? e.parentNode : e;
                            while ((u === "" || u === "transparent") && s && s.style) try {
                                u = t.css(s, "backgroundColor"), s = s.parentNode
                            } catch (a) {
                            }
                            r = r.blend(u && u !== "transparent" ? u : "_default")
                        }
                        r = r.toRgbaString()
                    }
                    try {
                        e.style[n] = r
                    } catch (l) {
                    }
                }
            }, t.fx.step[n] = function (e) {
                e.colorInit || (e.start = o(e.elem, n), e.end = o(e.end), e.colorInit = !0), t.cssHooks[n].set(e.elem, e.start.transition(e.end, e.pos))
            }
        }), t.cssHooks.borderColor = {
            expand: function (e) {
                var t = {};
                return h(["Top", "Right", "Bottom", "Left"], function (n, r) {
                    t["border" + r + "Color"] = e
                }), t
            }
        }, c = t.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    }(jQuery), function () {
        function i() {
            var t = this.ownerDocument.defaultView ? this.ownerDocument.defaultView.getComputedStyle(this, null) : this.currentStyle,
                n = {}, r, i;
            if (t && t.length && t[0] && t[t[0]]) {
                i = t.length;
                while (i--) r = t[i], typeof t[r] == "string" && (n[e.camelCase(r)] = t[r])
            } else for (r in t) typeof t[r] == "string" && (n[r] = t[r]);
            return n
        }

        function s(t, n) {
            var i = {}, s, o;
            for (s in n) o = n[s], t[s] !== o && !r[s] && (e.fx.step[s] || !isNaN(parseFloat(o))) && (i[s] = o);
            return i
        }

        var n = ["add", "remove", "toggle"], r = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
        e.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (t, n) {
            e.fx.step[n] = function (e) {
                if (e.end !== "none" && !e.setAttr || e.pos === 1 && !e.setAttr) jQuery.style(e.elem, n, e.end), e.setAttr = !0
            }
        }), e.effects.animateClass = function (t, r, o, u) {
            var a = e.speed(r, o, u);
            return this.queue(function () {
                var r = e(this), o = r.attr("class") || "", u, f = a.children ? r.find("*").andSelf() : r;
                f = f.map(function () {
                    var t = e(this);
                    return {el: t, start: i.call(this)}
                }), u = function () {
                    e.each(n, function (e, n) {
                        t[n] && r[n + "Class"](t[n])
                    })
                }, u(), f = f.map(function () {
                    return this.end = i.call(this.el[0]), this.diff = s(this.start, this.end), this
                }), r.attr("class", o), f = f.map(function () {
                    var t = this, n = e.Deferred(), r = jQuery.extend({}, a, {
                        queue: !1, complete: function () {
                            n.resolve(t)
                        }
                    });
                    return this.el.animate(this.diff, r), n.promise()
                }), e.when.apply(e, f.get()).done(function () {
                    u(), e.each(arguments, function () {
                        var t = this.el;
                        e.each(this.diff, function (e) {
                            t.css(e, "")
                        })
                    }), a.complete.call(r[0])
                })
            })
        }, e.fn.extend({
            _addClass: e.fn.addClass, addClass: function (t, n, r, i) {
                return n ? e.effects.animateClass.call(this, {add: t}, n, r, i) : this._addClass(t)
            }, _removeClass: e.fn.removeClass, removeClass: function (t, n, r, i) {
                return n ? e.effects.animateClass.call(this, {remove: t}, n, r, i) : this._removeClass(t)
            }, _toggleClass: e.fn.toggleClass, toggleClass: function (n, r, i, s, o) {
                return typeof r == "boolean" || r === t ? i ? e.effects.animateClass.call(this, r ? {add: n} : {remove: n}, i, s, o) : this._toggleClass(n, r) : e.effects.animateClass.call(this, {toggle: n}, r, i, s)
            }, switchClass: function (t, n, r, i, s) {
                return e.effects.animateClass.call(this, {add: n, remove: t}, r, i, s)
            }
        })
    }(), function () {
        function i(t, n, r, i) {
            e.isPlainObject(t) && (n = t, t = t.effect), t = {effect: t}, n == null && (n = {}), e.isFunction(n) && (i = n, r = null, n = {});
            if (typeof n == "number" || e.fx.speeds[n]) i = r, r = n, n = {};
            return e.isFunction(r) && (i = r, r = null), n && e.extend(t, n), r = r || n.duration, t.duration = e.fx.off ? 0 : typeof r == "number" ? r : r in e.fx.speeds ? e.fx.speeds[r] : e.fx.speeds._default, t.complete = i || n.complete, t
        }

        function s(t) {
            return !t || typeof t == "number" || e.fx.speeds[t] ? !0 : typeof t == "string" && !e.effects.effect[t] ? n && e.effects[t] ? !1 : !0 : !1
        }

        e.extend(e.effects, {
            version: "1.9.2", save: function (e, t) {
                for (var n = 0; n < t.length; n++) t[n] !== null && e.data(r + t[n], e[0].style[t[n]])
            }, restore: function (e, n) {
                var i, s;
                for (s = 0; s < n.length; s++) n[s] !== null && (i = e.data(r + n[s]), i === t && (i = ""), e.css(n[s], i))
            }, setMode: function (e, t) {
                return t === "toggle" && (t = e.is(":hidden") ? "show" : "hide"), t
            }, getBaseline: function (e, t) {
                var n, r;
                switch (e[0]) {
                    case"top":
                        n = 0;
                        break;
                    case"middle":
                        n = .5;
                        break;
                    case"bottom":
                        n = 1;
                        break;
                    default:
                        n = e[0] / t.height
                }
                switch (e[1]) {
                    case"left":
                        r = 0;
                        break;
                    case"center":
                        r = .5;
                        break;
                    case"right":
                        r = 1;
                        break;
                    default:
                        r = e[1] / t.width
                }
                return {x: r, y: n}
            }, createWrapper: function (t) {
                if (t.parent().is(".ui-effects-wrapper")) return t.parent();
                var n = {width: t.outerWidth(!0), height: t.outerHeight(!0), "float": t.css("float")},
                    r = e("<div></div>").addClass("ui-effects-wrapper").css({
                        fontSize: "100%",
                        background: "transparent",
                        border: "none",
                        margin: 0,
                        padding: 0
                    }), i = {width: t.width(), height: t.height()}, s = document.activeElement;
                try {
                    s.id
                } catch (o) {
                    s = document.body
                }
                return t.wrap(r), (t[0] === s || e.contains(t[0], s)) && e(s).focus(), r = t.parent(), t.css("position") === "static" ? (r.css({position: "relative"}), t.css({position: "relative"})) : (e.extend(n, {
                    position: t.css("position"),
                    zIndex: t.css("z-index")
                }), e.each(["top", "left", "bottom", "right"], function (e, r) {
                    n[r] = t.css(r), isNaN(parseInt(n[r], 10)) && (n[r] = "auto")
                }), t.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })), t.css(i), r.css(n).show()
            }, removeWrapper: function (t) {
                var n = document.activeElement;
                return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === n || e.contains(t[0], n)) && e(n).focus()), t
            }, setTransition: function (t, n, r, i) {
                return i = i || {}, e.each(n, function (e, n) {
                    var s = t.cssUnit(n);
                    s[0] > 0 && (i[n] = s[0] * r + s[1])
                }), i
            }
        }), e.fn.extend({
            effect: function () {
                function a(n) {
                    function u() {
                        e.isFunction(i) && i.call(r[0]), e.isFunction(n) && n()
                    }

                    var r = e(this), i = t.complete, s = t.mode;
                    (r.is(":hidden") ? s === "hide" : s === "show") ? u() : o.call(r[0], t, u)
                }

                var t = i.apply(this, arguments), r = t.mode, s = t.queue, o = e.effects.effect[t.effect],
                    u = !o && n && e.effects[t.effect];
                return e.fx.off || !o && !u ? r ? this[r](t.duration, t.complete) : this.each(function () {
                    t.complete && t.complete.call(this)
                }) : o ? s === !1 ? this.each(a) : this.queue(s || "fx", a) : u.call(this, {
                    options: t,
                    duration: t.duration,
                    callback: t.complete,
                    mode: t.mode
                })
            }, _show: e.fn.show, show: function (e) {
                if (s(e)) return this._show.apply(this, arguments);
                var t = i.apply(this, arguments);
                return t.mode = "show", this.effect.call(this, t)
            }, _hide: e.fn.hide, hide: function (e) {
                if (s(e)) return this._hide.apply(this, arguments);
                var t = i.apply(this, arguments);
                return t.mode = "hide", this.effect.call(this, t)
            }, __toggle: e.fn.toggle, toggle: function (t) {
                if (s(t) || typeof t == "boolean" || e.isFunction(t)) return this.__toggle.apply(this, arguments);
                var n = i.apply(this, arguments);
                return n.mode = "toggle", this.effect.call(this, n)
            }, cssUnit: function (t) {
                var n = this.css(t), r = [];
                return e.each(["em", "px", "%", "pt"], function (e, t) {
                    n.indexOf(t) > 0 && (r = [parseFloat(n), t])
                }), r
            }
        })
    }(), function () {
        var t = {};
        e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (e, n) {
            t[n] = function (t) {
                return Math.pow(t, e + 2)
            }
        }), e.extend(t, {
            Sine: function (e) {
                return 1 - Math.cos(e * Math.PI / 2)
            }, Circ: function (e) {
                return 1 - Math.sqrt(1 - e * e)
            }, Elastic: function (e) {
                return e === 0 || e === 1 ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin(((e - 1) * 80 - 7.5) * Math.PI / 15)
            }, Back: function (e) {
                return e * e * (3 * e - 2)
            }, Bounce: function (e) {
                var t, n = 4;
                while (e < ((t = Math.pow(2, --n)) - 1) / 11) ;
                return 1 / Math.pow(4, 3 - n) - 7.5625 * Math.pow((t * 3 - 2) / 22 - e, 2)
            }
        }), e.each(t, function (t, n) {
            e.easing["easeIn" + t] = n, e.easing["easeOut" + t] = function (e) {
                return 1 - n(1 - e)
            }, e.easing["easeInOut" + t] = function (e) {
                return e < .5 ? n(e * 2) / 2 : 1 - n(e * -2 + 2) / 2
            }
        })
    }()
}(jQuery);
/*! jQuery UI - v1.9.2 - 2012-11-23
* http://jqueryui.com
* Includes: jquery.ui.effect-slide.js
* Copyright 2012 jQuery Foundation and other contributors; Licensed MIT */
(function (e, t) {
    e.effects.effect.slide = function (t, n) {
        var r = e(this), i = ["position", "top", "bottom", "left", "right", "width", "height"],
            s = e.effects.setMode(r, t.mode || "show"), o = s === "show", u = t.direction || "left",
            a = u === "up" || u === "down" ? "top" : "left", f = u === "up" || u === "left", l, c = {};
        e.effects.save(r, i), r.show(), l = t.distance || r[a === "top" ? "outerHeight" : "outerWidth"](!0), e.effects.createWrapper(r).css({overflow: "hidden"}), o && r.css(a, f ? isNaN(l) ? "-" + l : -l : l), c[a] = (o ? f ? "+=" : "-=" : f ? "-=" : "+=") + l, r.animate(c, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: function () {
                s === "hide" && r.hide(), e.effects.restore(r, i), e.effects.removeWrapper(r), n()
            }
        })
    }
})(jQuery);
/*! jQuery UI - v1.9.2 - 2012-11-23
* http://jqueryui.com
* Includes: jquery.ui.effect-blind.js
* Copyright 2012 jQuery Foundation and other contributors; Licensed MIT */
(function (e, t) {
    var n = /up|down|vertical/, r = /up|left|vertical|horizontal/;
    e.effects.effect.blind = function (t, i) {
        var s = e(this), o = ["position", "top", "bottom", "left", "right", "height", "width"],
            u = e.effects.setMode(s, t.mode || "hide"), a = t.direction || "up", f = n.test(a),
            l = f ? "height" : "width", c = f ? "top" : "left", h = r.test(a), p = {}, d = u === "show", v, m, g;
        s.parent().is(".ui-effects-wrapper") ? e.effects.save(s.parent(), o) : e.effects.save(s, o), s.show(), v = e.effects.createWrapper(s).css({overflow: "hidden"}), m = v[l](), g = parseFloat(v.css(c)) || 0, p[l] = d ? m : 0, h || (s.css(f ? "bottom" : "right", 0).css(f ? "top" : "left", "auto").css({position: "absolute"}), p[c] = d ? g : m + g), d && (v.css(l, 0), h || v.css(c, g + m)), v.animate(p, {
            duration: t.duration,
            easing: t.easing,
            queue: !1,
            complete: function () {
                u === "hide" && s.hide(), e.effects.restore(s, o), e.effects.removeWrapper(s), i()
            }
        })
    }
})(jQuery);
/*! jQuery UI - v1.9.2 - 2012-11-23
* http://jqueryui.com
* Includes: jquery.ui.effect-fade.js
* Copyright 2012 jQuery Foundation and other contributors; Licensed MIT */
(function (e, t) {
    e.effects.effect.fade = function (t, n) {
        var r = e(this), i = e.effects.setMode(r, t.mode || "toggle");
        r.animate({opacity: i}, {queue: !1, duration: t.duration, easing: t.easing, complete: n})
    }
})(jQuery);
/*! jQuery UI - v1.9.2 - 2012-11-23
* http://jqueryui.com
* Includes: jquery.ui.effect-highlight.js
* Copyright 2012 jQuery Foundation and other contributors; Licensed MIT */
(function (e, t) {
    e.effects.effect.highlight = function (t, n) {
        var r = e(this), i = ["backgroundImage", "backgroundColor", "opacity"],
            s = e.effects.setMode(r, t.mode || "show"), o = {backgroundColor: r.css("backgroundColor")};
        s === "hide" && (o.opacity = 0), e.effects.save(r, i), r.show().css({
            backgroundImage: "none",
            backgroundColor: t.color || "#ffff99"
        }).animate(o, {
            queue: !1, duration: t.duration, easing: t.easing, complete: function () {
                s === "hide" && r.hide(), e.effects.restore(r, i), n()
            }
        })
    }
})(jQuery);
/*! jQuery UI - v1.9.2 - 2012-11-23
* http://jqueryui.com
* Includes: jquery.ui.effect-pulsate.js
* Copyright 2012 jQuery Foundation and other contributors; Licensed MIT */
(function (e, t) {
    e.effects.effect.pulsate = function (t, n) {
        var r = e(this), i = e.effects.setMode(r, t.mode || "show"), s = i === "show", o = i === "hide",
            u = s || i === "hide", a = (t.times || 5) * 2 + (u ? 1 : 0), f = t.duration / a, l = 0, c = r.queue(),
            h = c.length, p;
        if (s || !r.is(":visible")) r.css("opacity", 0).show(), l = 1;
        for (p = 1; p < a; p++) r.animate({opacity: l}, f, t.easing), l = 1 - l;
        r.animate({opacity: l}, f, t.easing), r.queue(function () {
            o && r.hide(), n()
        }), h > 1 && c.splice.apply(c, [1, 0].concat(c.splice(h, a + 1))), r.dequeue()
    }
})(jQuery);
/*! jQuery UI - v1.9.2 - 2012-11-23
* http://jqueryui.com
* Includes: jquery.ui.autocomplete.js
* Copyright 2012 jQuery Foundation and other contributors; Licensed MIT */
(function (e, t) {
    var n = 0;
    e.widget("ui.autocomplete", {
        version: "1.9.2",
        defaultElement: "<input>",
        options: {
            appendTo: "body",
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {my: "left top", at: "left bottom", collision: "none"},
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        pending: 0,
        _create: function () {
            var t, n, r;
            this.isMultiLine = this._isMultiLine(), this.valueMethod = this.element[this.element.is("input,textarea") ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
                keydown: function (i) {
                    if (this.element.prop("readOnly")) {
                        t = !0, r = !0, n = !0;
                        return
                    }
                    t = !1, r = !1, n = !1;
                    var s = e.ui.keyCode;
                    switch (i.keyCode) {
                        case s.PAGE_UP:
                            t = !0, this._move("previousPage", i);
                            break;
                        case s.PAGE_DOWN:
                            t = !0, this._move("nextPage", i);
                            break;
                        case s.UP:
                            t = !0, this._keyEvent("previous", i);
                            break;
                        case s.DOWN:
                            t = !0, this._keyEvent("next", i);
                            break;
                        case s.ENTER:
                        case s.NUMPAD_ENTER:
                            this.menu.active && (t = !0, i.preventDefault(), this.menu.select(i));
                            break;
                        case s.TAB:
                            this.menu.active && this.menu.select(i);
                            break;
                        case s.ESCAPE:
                            this.menu.element.is(":visible") && (this._value(this.term), this.close(i), i.preventDefault());
                            break;
                        default:
                            n = !0, this._searchTimeout(i)
                    }
                }, keypress: function (r) {
                    if (t) {
                        t = !1, r.preventDefault();
                        return
                    }
                    if (n) return;
                    var i = e.ui.keyCode;
                    switch (r.keyCode) {
                        case i.PAGE_UP:
                            this._move("previousPage", r);
                            break;
                        case i.PAGE_DOWN:
                            this._move("nextPage", r);
                            break;
                        case i.UP:
                            this._keyEvent("previous", r);
                            break;
                        case i.DOWN:
                            this._keyEvent("next", r)
                    }
                }, input: function (e) {
                    if (r) {
                        r = !1, e.preventDefault();
                        return
                    }
                    this._searchTimeout(e)
                }, focus: function () {
                    this.selectedItem = null, this.previous = this._value()
                }, blur: function (e) {
                    if (this.cancelBlur) {
                        delete this.cancelBlur;
                        return
                    }
                    clearTimeout(this.searching), this.close(e), this._change(e)
                }
            }), this._initSource(), this.menu = e("<ul>").addClass("ui-autocomplete").appendTo(this.document.find(this.options.appendTo || "body")[0]).menu({
                input: e(),
                role: null
            }).zIndex(this.element.zIndex() + 1).hide().data("menu"), this._on(this.menu.element, {
                mousedown: function (t) {
                    t.preventDefault(), this.cancelBlur = !0, this._delay(function () {
                        delete this.cancelBlur
                    });
                    var n = this.menu.element[0];
                    e(t.target).closest(".ui-menu-item").length || this._delay(function () {
                        var t = this;
                        this.document.one("mousedown", function (r) {
                            r.target !== t.element[0] && r.target !== n && !e.contains(n, r.target) && t.close()
                        })
                    })
                }, menufocus: function (t, n) {
                    if (this.isNewMenu) {
                        this.isNewMenu = !1;
                        if (t.originalEvent && /^mouse/.test(t.originalEvent.type)) {
                            this.menu.blur(), this.document.one("mousemove", function () {
                                e(t.target).trigger(t.originalEvent)
                            });
                            return
                        }
                    }
                    var r = n.item.data("ui-autocomplete-item") || n.item.data("item.autocomplete");
                    !1 !== this._trigger("focus", t, {item: r}) ? t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(r.value) : this.liveRegion.text(r.value)
                }, menuselect: function (e, t) {
                    var n = t.item.data("ui-autocomplete-item") || t.item.data("item.autocomplete"), r = this.previous;
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = r, this._delay(function () {
                        this.previous = r, this.selectedItem = n
                    })), !1 !== this._trigger("select", e, {item: n}) && this._value(n.value), this.term = this._value(), this.close(e), this.selectedItem = n
                }
            }), this.liveRegion = e("<span>", {
                role: "status",
                "aria-live": "polite"
            }).addClass("ui-helper-hidden-accessible").insertAfter(this.element), e.fn.bgiframe && this.menu.element.bgiframe(), this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function () {
            clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
        },
        _setOption: function (e, t) {
            this._super(e, t), e === "source" && this._initSource(), e === "appendTo" && this.menu.element.appendTo(this.document.find(t || "body")[0]), e === "disabled" && t && this.xhr && this.xhr.abort()
        },
        _isMultiLine: function () {
            return this.element.is("textarea") ? !0 : this.element.is("input") ? !1 : this.element.prop("isContentEditable")
        },
        _initSource: function () {
            var t, n, r = this;
            e.isArray(this.options.source) ? (t = this.options.source, this.source = function (n, r) {
                r(e.ui.autocomplete.filter(t, n.term))
            }) : typeof this.options.source == "string" ? (n = this.options.source, this.source = function (t, i) {
                r.xhr && r.xhr.abort(), r.xhr = e.ajax({
                    url: n, data: t, dataType: "json", success: function (e) {
                        i(e)
                    }, error: function () {
                        i([])
                    }
                })
            }) : this.source = this.options.source
        },
        _searchTimeout: function (e) {
            clearTimeout(this.searching), this.searching = this._delay(function () {
                this.term !== this._value() && (this.selectedItem = null, this.search(null, e))
            }, this.options.delay)
        },
        search: function (e, t) {
            e = e != null ? e : this._value(), this.term = this._value();
            if (e.length < this.options.minLength) return this.close(t);
            if (this._trigger("search", t) === !1) return;
            return this._search(e)
        },
        _search: function (e) {
            this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({term: e}, this._response())
        },
        _response: function () {
            var e = this, t = ++n;
            return function (r) {
                t === n && e.__response(r), e.pending--, e.pending || e.element.removeClass("ui-autocomplete-loading")
            }
        },
        __response: function (e) {
            e && (e = this._normalize(e)), this._trigger("response", null, {content: e}), !this.options.disabled && e && e.length && !this.cancelSearch ? (this._suggest(e), this._trigger("open")) : this._close()
        },
        close: function (e) {
            this.cancelSearch = !0, this._close(e)
        },
        _close: function (e) {
            this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", e))
        },
        _change: function (e) {
            this.previous !== this._value() && this._trigger("change", e, {item: this.selectedItem})
        },
        _normalize: function (t) {
            return t.length && t[0].label && t[0].value ? t : e.map(t, function (t) {
                return typeof t == "string" ? {label: t, value: t} : e.extend({
                    label: t.label || t.value,
                    value: t.value || t.label
                }, t)
            })
        },
        _suggest: function (t) {
            var n = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
            this._renderMenu(n, t), this.menu.refresh(), n.show(), this._resizeMenu(), n.position(e.extend({of: this.element}, this.options.position)), this.options.autoFocus && this.menu.next()
        },
        _resizeMenu: function () {
            var e = this.menu.element;
            e.outerWidth(Math.max(e.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function (t, n) {
            var r = this;
            e.each(n, function (e, n) {
                r._renderItemData(t, n)
            })
        },
        _renderItemData: function (e, t) {
            return this._renderItem(e, t).data("ui-autocomplete-item", t)
        },
        _renderItem: function (t, n) {
            return e("<li>").append(e("<a>").text(n.label)).appendTo(t)
        },
        _move: function (e, t) {
            if (!this.menu.element.is(":visible")) {
                this.search(null, t);
                return
            }
            if (this.menu.isFirstItem() && /^previous/.test(e) || this.menu.isLastItem() && /^next/.test(e)) {
                this._value(this.term), this.menu.blur();
                return
            }
            this.menu[e](t)
        },
        widget: function () {
            return this.menu.element
        },
        _value: function () {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function (e, t) {
            if (!this.isMultiLine || this.menu.element.is(":visible")) this._move(e, t), t.preventDefault()
        }
    }), e.extend(e.ui.autocomplete, {
        escapeRegex: function (e) {
            return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        }, filter: function (t, n) {
            var r = new RegExp(e.ui.autocomplete.escapeRegex(n), "i");
            return e.grep(t, function (e) {
                return r.test(e.label || e.value || e)
            })
        }
    }), e.widget("ui.autocomplete", e.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function (e) {
                    return e + (e > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        }, __response: function (e) {
            var t;
            this._superApply(arguments);
            if (this.options.disabled || this.cancelSearch) return;
            e && e.length ? t = this.options.messages.results(e.length) : t = this.options.messages.noResults, this.liveRegion.text(t)
        }
    })
})(jQuery);
/*! jQuery UI - v1.9.2 - 2012-11-23
* http://jqueryui.com
* Includes: jquery.ui.menu.js
* Copyright 2012 jQuery Foundation and other contributors; Licensed MIT */
(function (e, t) {
    var n = !1;
    e.widget("ui.menu", {
        version: "1.9.2",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {submenu: "ui-icon-carat-1-e"},
            menus: "ul",
            position: {my: "left top", at: "right top"},
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function () {
            this.activeMenu = this.element, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }).bind("click" + this.eventNamespace, e.proxy(function (e) {
                this.options.disabled && e.preventDefault()
            }, this)), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
                "mousedown .ui-menu-item > a": function (e) {
                    e.preventDefault()
                }, "click .ui-state-disabled > a": function (e) {
                    e.preventDefault()
                }, "click .ui-menu-item:has(a)": function (t) {
                    var r = e(t.target).closest(".ui-menu-item");
                    !n && r.not(".ui-state-disabled").length && (n = !0, this.select(t), r.has(".ui-menu").length ? this.expand(t) : this.element.is(":focus") || (this.element.trigger("focus", [!0]), this.active && this.active.parents(".ui-menu").length === 1 && clearTimeout(this.timer)))
                }, "mouseenter .ui-menu-item": function (t) {
                    var n = e(t.currentTarget);
                    n.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(t, n)
                }, mouseleave: "collapseAll", "mouseleave .ui-menu": "collapseAll", focus: function (e, t) {
                    var n = this.active || this.element.children(".ui-menu-item").eq(0);
                    t || this.focus(e, n)
                }, blur: function (t) {
                    this._delay(function () {
                        e.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t)
                    })
                }, keydown: "_keydown"
            }), this.refresh(), this._on(this.document, {
                click: function (t) {
                    e(t.target).closest(".ui-menu").length || this.collapseAll(t), n = !1
                }
            })
        },
        _destroy: function () {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").andSelf().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function () {
                var t = e(this);
                t.data("ui-menu-submenu-carat") && t.remove()
            }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function (t) {
            function a(e) {
                return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            }

            var n, r, i, s, o, u = !0;
            switch (t.keyCode) {
                case e.ui.keyCode.PAGE_UP:
                    this.previousPage(t);
                    break;
                case e.ui.keyCode.PAGE_DOWN:
                    this.nextPage(t);
                    break;
                case e.ui.keyCode.HOME:
                    this._move("first", "first", t);
                    break;
                case e.ui.keyCode.END:
                    this._move("last", "last", t);
                    break;
                case e.ui.keyCode.UP:
                    this.previous(t);
                    break;
                case e.ui.keyCode.DOWN:
                    this.next(t);
                    break;
                case e.ui.keyCode.LEFT:
                    this.collapse(t);
                    break;
                case e.ui.keyCode.RIGHT:
                    this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
                    break;
                case e.ui.keyCode.ENTER:
                case e.ui.keyCode.SPACE:
                    this._activate(t);
                    break;
                case e.ui.keyCode.ESCAPE:
                    this.collapse(t);
                    break;
                default:
                    u = !1, r = this.previousFilter || "", i = String.fromCharCode(t.keyCode), s = !1, clearTimeout(this.filterTimer), i === r ? s = !0 : i = r + i, o = new RegExp("^" + a(i), "i"), n = this.activeMenu.children(".ui-menu-item").filter(function () {
                        return o.test(e(this).children("a").text())
                    }), n = s && n.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : n, n.length || (i = String.fromCharCode(t.keyCode), o = new RegExp("^" + a(i), "i"), n = this.activeMenu.children(".ui-menu-item").filter(function () {
                        return o.test(e(this).children("a").text())
                    })), n.length ? (this.focus(t, n), n.length > 1 ? (this.previousFilter = i, this.filterTimer = this._delay(function () {
                        delete this.previousFilter
                    }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
            }
            u && t.preventDefault()
        },
        _activate: function (e) {
            this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(e) : this.select(e))
        },
        refresh: function () {
            var t, n = this.options.icons.submenu, r = this.element.find(this.options.menus);
            r.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function () {
                var t = e(this), r = t.prev("a"),
                    i = e("<span>").addClass("ui-menu-icon ui-icon " + n).data("ui-menu-submenu-carat", !0);
                r.attr("aria-haspopup", "true").prepend(i), t.attr("aria-labelledby", r.attr("id"))
            }), t = r.add(this.element), t.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                tabIndex: -1,
                role: this._itemRole()
            }), t.children(":not(.ui-menu-item)").each(function () {
                var t = e(this);
                /[^\-—–\s]/.test(t.text()) || t.addClass("ui-widget-content ui-menu-divider")
            }), t.children(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !e.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function () {
            return {menu: "menuitem", listbox: "option"}[this.options.role]
        },
        focus: function (e, t) {
            var n, r;
            this.blur(e, e && e.type === "focus"), this._scrollIntoView(t), this.active = t.first(), r = this.active.children("a").addClass("ui-state-focus"), this.options.role && this.element.attr("aria-activedescendant", r.attr("id")), this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), e && e.type === "keydown" ? this._close() : this.timer = this._delay(function () {
                this._close()
            }, this.delay), n = t.children(".ui-menu"), n.length && /^mouse/.test(e.type) && this._startOpening(n), this.activeMenu = t.parent(), this._trigger("focus", e, {item: t})
        },
        _scrollIntoView: function (t) {
            var n, r, i, s, o, u;
            this._hasScroll() && (n = parseFloat(e.css(this.activeMenu[0], "borderTopWidth")) || 0, r = parseFloat(e.css(this.activeMenu[0], "paddingTop")) || 0, i = t.offset().top - this.activeMenu.offset().top - n - r, s = this.activeMenu.scrollTop(), o = this.activeMenu.height(), u = t.height(), i < 0 ? this.activeMenu.scrollTop(s + i) : i + u > o && this.activeMenu.scrollTop(s + i - o + u))
        },
        blur: function (e, t) {
            t || clearTimeout(this.timer);
            if (!this.active) return;
            this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", e, {item: this.active})
        },
        _startOpening: function (e) {
            clearTimeout(this.timer);
            if (e.attr("aria-hidden") !== "true") return;
            this.timer = this._delay(function () {
                this._close(), this._open(e)
            }, this.delay)
        },
        _open: function (t) {
            var n = e.extend({of: this.active}, this.options.position);
            clearTimeout(this.timer), this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true"), t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(n)
        },
        collapseAll: function (t, n) {
            clearTimeout(this.timer), this.timer = this._delay(function () {
                var r = n ? this.element : e(t && t.target).closest(this.element.find(".ui-menu"));
                r.length || (r = this.element), this._close(r), this.blur(t), this.activeMenu = r
            }, this.delay)
        },
        _close: function (e) {
            e || (e = this.active ? this.active.parent() : this.element), e.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
        },
        collapse: function (e) {
            var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            t && t.length && (this._close(), this.focus(e, t))
        },
        expand: function (e) {
            var t = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
            t && t.length && (this._open(t.parent()), this._delay(function () {
                this.focus(e, t)
            }))
        },
        next: function (e) {
            this._move("next", "first", e)
        },
        previous: function (e) {
            this._move("prev", "last", e)
        },
        isFirstItem: function () {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function () {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function (e, t, n) {
            var r;
            this.active && (e === "first" || e === "last" ? r = this.active[e === "first" ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : r = this.active[e + "All"](".ui-menu-item").eq(0));
            if (!r || !r.length || !this.active) r = this.activeMenu.children(".ui-menu-item")[t]();
            this.focus(n, r)
        },
        nextPage: function (t) {
            var n, r, i;
            if (!this.active) {
                this.next(t);
                return
            }
            if (this.isLastItem()) return;
            this._hasScroll() ? (r = this.active.offset().top, i = this.element.height(), this.active.nextAll(".ui-menu-item").each(function () {
                return n = e(this), n.offset().top - r - i < 0
            }), this.focus(t, n)) : this.focus(t, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())
        },
        previousPage: function (t) {
            var n, r, i;
            if (!this.active) {
                this.next(t);
                return
            }
            if (this.isFirstItem()) return;
            this._hasScroll() ? (r = this.active.offset().top, i = this.element.height(), this.active.prevAll(".ui-menu-item").each(function () {
                return n = e(this), n.offset().top - r + i > 0
            }), this.focus(t, n)) : this.focus(t, this.activeMenu.children(".ui-menu-item").first())
        },
        _hasScroll: function () {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function (t) {
            this.active = this.active || e(t.target).closest(".ui-menu-item");
            var n = {item: this.active};
            this.active.has(".ui-menu").length || this.collapseAll(t, !0), this._trigger("select", t, n)
        }
    })
})(jQuery);

/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function (c) {
    c.support.touch = "ontouchend" in document;
    if (!c.support.touch) {
        return
    }
    var b = c.ui.mouse.prototype, f = b._mouseInit, g = b._mouseDestroy, e, d, i, h;

    function a(k, l) {
        if (k.originalEvent.touches.length > 1) {
            return
        }
        k.preventDefault();
        var m = k.originalEvent.changedTouches[0], j = document.createEvent("MouseEvents");
        j.initMouseEvent(l, true, true, window, 1, m.screenX, m.screenY, m.clientX, m.clientY, false, false, false, false, 0, null);
        k.target.dispatchEvent(j)
    }

    b._touchStart = function (k) {
        var j = this;
        if (i || !j._mouseCapture(k.originalEvent.changedTouches[0])) {
            return
        }
        i = true;
        h = false;
        e = k.originalEvent.touches[0].screenX;
        d = k.originalEvent.touches[0].screenY;
        a(k, "mouseover");
        a(k, "mousemove");
        a(k, "mousedown")
    };
    b._touchMove = function (l) {
        if (!i) {
            return
        }
        var k = l.originalEvent.touches[0].screenX, j = l.originalEvent.touches[0].screenY;
        if (e >= k - 2 && e <= k + 2 && d >= j - 2 && d <= j + 2) {
            h = false;
            return
        }
        h = true;
        a(l, "mousemove")
    };
    b._touchEnd = function (j) {
        if (!i) {
            return
        }
        a(j, "mouseup");
        a(j, "mouseout");
        if (!h) {
            a(j, "click")
        }
        i = false
    };
    b._mouseInit = function () {
        var j = this;
        j.element.bind({
            touchstart: c.proxy(j, "_touchStart"),
            touchmove: c.proxy(j, "_touchMove"),
            touchend: c.proxy(j, "_touchEnd")
        });
        f.call(j)
    };
    b._mouseDestroy = function () {
        var j = this;
        j.element.unbind({
            touchstart: c.proxy(j, "_touchStart"),
            touchmove: c.proxy(j, "_touchMove"),
            touchend: c.proxy(j, "_touchEnd")
        });
        g.call(j)
    }
})(jQuery);


$.ui.dialog.prototype.options.responsive = true;
$.ui.dialog.prototype.options.scaleH = 0.9;
$.ui.dialog.prototype.options.scaleW = 1;


// extend _init
var _init = $.ui.dialog.prototype._init;
$.ui.dialog.prototype._init = function () {
    var self = this;

    // apply original arguments
    _init.apply(this, arguments);

};
// end _init


// extend open function
var _open = $.ui.dialog.prototype.open;
$.ui.dialog.prototype.open = function () {
    var self = this;

    // apply original arguments
    _open.apply(this, arguments);

    // get dialog original size on open
    var oHeight = self.element.parent().outerHeight(),
        oWidth = self.element.parent().outerWidth();

    // responsive width & height
    var resize = function () {

        if (self.options.responsive === true) {
            var elem = self.element,
                wHeight = $(window).height(),
                wWidth = $(window).width(),
                dHeight = elem.parent().outerHeight(),
                dWidth = elem.parent().outerWidth(),
                setHeight = Math.min(wHeight * self.options.scaleH, oHeight),
                setWidth = Math.min(wWidth * self.options.scaleW, oWidth);

            elem.dialog("option", "height", setHeight).parent().css("max-height", setHeight);
            elem.dialog("option", "width", setWidth).parent().css("max-width", setWidth);
            elem.dialog("option", "position", "center");
            elem.css("overflow", "auto");
        }

    };

    // call resize()
    resize();

    // resize on window resize
    $(window).on("resize", resize);

    self.element.on('dialogclose', function () {
        $(window).off("resize", resize);
    });

    // resize on orientation change
    window.addEventListener("orientationchange", function () {
        resize();
    });

};
//end open
