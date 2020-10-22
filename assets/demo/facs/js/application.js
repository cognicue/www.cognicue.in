(function() {
    var t = this;
    (function() {
        (function() {
            this.Rails = {
                linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
                buttonClickSelector: {
                    selector: "button[data-remote]:not([form]), button[data-confirm]:not([form])",
                    exclude: "form button"
                },
                inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
                formSubmitSelector: "form",
                formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
                formDisableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
                formEnableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
                fileInputSelector: "input[name][type=file]:not([disabled])",
                linkDisableSelector: "a[data-disable-with], a[data-disable]",
                buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]"
            }
        }
        ).call(this)
    }
    ).call(t);
    var e = t.Rails;
    (function() {
        (function() {
            e.cspNonce = function() {
                var t;
                return (t = document.querySelector("meta[name=csp-nonce]")) && t.content
            }
        }
        ).call(this),
        function() {
            var t, n;
            n = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector,
            e.matches = function(t, e) {
                return null != e.exclude ? n.call(t, e.selector) && !n.call(t, e.exclude) : n.call(t, e)
            }
            ,
            t = "_ujsData",
            e.getData = function(e, n) {
                var r;
                return null != (r = e[t]) ? r[n] : void 0
            }
            ,
            e.setData = function(e, n, r) {
                return null == e[t] && (e[t] = {}),
                e[t][n] = r
            }
            ,
            e.$ = function(t) {
                return Array.prototype.slice.call(document.querySelectorAll(t))
            }
        }
        .call(this),
        function() {
            var t, n, r;
            t = e.$,
            r = e.csrfToken = function() {
                var t;
                return (t = document.querySelector("meta[name=csrf-token]")) && t.content
            }
            ,
            n = e.csrfParam = function() {
                var t;
                return (t = document.querySelector("meta[name=csrf-param]")) && t.content
            }
            ,
            e.CSRFProtection = function(t) {
                var e;
                if (null != (e = r()))
                    return t.setRequestHeader("X-CSRF-Token", e)
            }
            ,
            e.refreshCSRFTokens = function() {
                var e, i;
                if (i = r(),
                e = n(),
                null != i && null != e)
                    return t('form input[name="' + e + '"]').forEach(function(t) {
                        return t.value = i
                    })
            }
        }
        .call(this),
        function() {
            var t, n, r, i;
            r = e.matches,
            "function" != typeof (t = window.CustomEvent) && ((t = function(t, e) {
                var n;
                return (n = document.createEvent("CustomEvent")).initCustomEvent(t, e.bubbles, e.cancelable, e.detail),
                n
            }
            ).prototype = window.Event.prototype,
            i = t.prototype.preventDefault,
            t.prototype.preventDefault = function() {
                var t;
                return t = i.call(this),
                this.cancelable && !this.defaultPrevented && Object.defineProperty(this, "defaultPrevented", {
                    get: function() {
                        return !0
                    }
                }),
                t
            }
            ),
            n = e.fire = function(e, n, r) {
                var i;
                return i = new t(n,{
                    bubbles: !0,
                    cancelable: !0,
                    detail: r
                }),
                e.dispatchEvent(i),
                !i.defaultPrevented
            }
            ,
            e.stopEverything = function(t) {
                return n(t.target, "ujs:everythingStopped"),
                t.preventDefault(),
                t.stopPropagation(),
                t.stopImmediatePropagation()
            }
            ,
            e.delegate = function(t, e, n, i) {
                return t.addEventListener(n, function(t) {
                    var n;
                    for (n = t.target; n instanceof Element && !r(n, e); )
                        n = n.parentNode;
                    if (n instanceof Element && !1 === i.call(n, t))
                        return t.preventDefault(),
                        t.stopPropagation()
                })
            }
        }
        .call(this),
        function() {
            var t, n, r, i, a, o;
            i = e.cspNonce,
            n = e.CSRFProtection,
            e.fire,
            t = {
                "*": "*/*",
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript",
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            e.ajax = function(t) {
                var e;
                return t = a(t),
                e = r(t, function() {
                    var n, r;
                    return r = o(null != (n = e.response) ? n : e.responseText, e.getResponseHeader("Content-Type")),
                    2 === Math.floor(e.status / 100) ? "function" == typeof t.success && t.success(r, e.statusText, e) : "function" == typeof t.error && t.error(r, e.statusText, e),
                    "function" == typeof t.complete ? t.complete(e, e.statusText) : void 0
                }),
                !(null != t.beforeSend && !t.beforeSend(e, t)) && (e.readyState === XMLHttpRequest.OPENED ? e.send(t.data) : void 0)
            }
            ,
            a = function(e) {
                return e.url = e.url || location.href,
                e.type = e.type.toUpperCase(),
                "GET" === e.type && e.data && (e.url.indexOf("?") < 0 ? e.url += "?" + e.data : e.url += "&" + e.data),
                null == t[e.dataType] && (e.dataType = "*"),
                e.accept = t[e.dataType],
                "*" !== e.dataType && (e.accept += ", */*; q=0.01"),
                e
            }
            ,
            r = function(t, e) {
                var r;
                return (r = new XMLHttpRequest).open(t.type, t.url, !0),
                r.setRequestHeader("Accept", t.accept),
                "string" == typeof t.data && r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
                t.crossDomain || r.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                n(r),
                r.withCredentials = !!t.withCredentials,
                r.onreadystatechange = function() {
                    if (r.readyState === XMLHttpRequest.DONE)
                        return e(r)
                }
                ,
                r
            }
            ,
            o = function(t, e) {
                var n, r;
                if ("string" == typeof t && "string" == typeof e)
                    if (e.match(/\bjson\b/))
                        try {
                            t = JSON.parse(t)
                        } catch (a) {}
                    else if (e.match(/\b(?:java|ecma)script\b/))
                        (r = document.createElement("script")).nonce = i(),
                        r.text = t,
                        document.head.appendChild(r).parentNode.removeChild(r);
                    else if (e.match(/\b(xml|html|svg)\b/)) {
                        n = new DOMParser,
                        e = e.replace(/;.+/, "");
                        try {
                            t = n.parseFromString(t, e)
                        } catch (a) {}
                    }
                return t
            }
            ,
            e.href = function(t) {
                return t.href
            }
            ,
            e.isCrossDomain = function(t) {
                var e, n;
                (e = document.createElement("a")).href = location.href,
                n = document.createElement("a");
                try {
                    return n.href = t,
                    !((!n.protocol || ":" === n.protocol) && !n.host || e.protocol + "//" + e.host == n.protocol + "//" + n.host)
                } catch (r) {
                    return r,
                    !0
                }
            }
        }
        .call(this),
        function() {
            var t, n;
            t = e.matches,
            n = function(t) {
                return Array.prototype.slice.call(t)
            }
            ,
            e.serializeElement = function(e, r) {
                var i, a;
                return i = [e],
                t(e, "form") && (i = n(e.elements)),
                a = [],
                i.forEach(function(e) {
                    if (e.name && !e.disabled)
                        return t(e, "select") ? n(e.options).forEach(function(t) {
                            if (t.selected)
                                return a.push({
                                    name: e.name,
                                    value: t.value
                                })
                        }) : e.checked || -1 === ["radio", "checkbox", "submit"].indexOf(e.type) ? a.push({
                            name: e.name,
                            value: e.value
                        }) : void 0
                }),
                r && a.push(r),
                a.map(function(t) {
                    return null != t.name ? encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value) : t
                }).join("&")
            }
            ,
            e.formElements = function(e, r) {
                return t(e, "form") ? n(e.elements).filter(function(e) {
                    return t(e, r)
                }) : n(e.querySelectorAll(r))
            }
        }
        .call(this),
        function() {
            var t, n, r;
            n = e.fire,
            r = e.stopEverything,
            e.handleConfirm = function(e) {
                if (!t(this))
                    return r(e)
            }
            ,
            t = function(t) {
                var e, r, i;
                if (!(i = t.getAttribute("data-confirm")))
                    return !0;
                if (e = !1,
                n(t, "confirm")) {
                    try {
                        e = confirm(i)
                    } catch (a) {}
                    r = n(t, "confirm:complete", [e])
                }
                return e && r
            }
        }
        .call(this),
        function() {
            var t, n, r, i, a, o, u, c, s, l, f;
            s = e.matches,
            c = e.getData,
            l = e.setData,
            f = e.stopEverything,
            u = e.formElements,
            e.handleDisabledElement = function(t) {
                if (this.disabled)
                    return f(t)
            }
            ,
            e.enableElement = function(t) {
                var n;
                return n = t instanceof Event ? t.target : t,
                s(n, e.linkDisableSelector) ? o(n) : s(n, e.buttonDisableSelector) || s(n, e.formEnableSelector) ? i(n) : s(n, e.formSubmitSelector) ? a(n) : void 0
            }
            ,
            e.disableElement = function(i) {
                var a;
                return a = i instanceof Event ? i.target : i,
                s(a, e.linkDisableSelector) ? r(a) : s(a, e.buttonDisableSelector) || s(a, e.formDisableSelector) ? t(a) : s(a, e.formSubmitSelector) ? n(a) : void 0
            }
            ,
            r = function(t) {
                var e;
                return null != (e = t.getAttribute("data-disable-with")) && (l(t, "ujs:enable-with", t.innerHTML),
                t.innerHTML = e),
                t.addEventListener("click", f),
                l(t, "ujs:disabled", !0)
            }
            ,
            o = function(t) {
                var e;
                return null != (e = c(t, "ujs:enable-with")) && (t.innerHTML = e,
                l(t, "ujs:enable-with", null)),
                t.removeEventListener("click", f),
                l(t, "ujs:disabled", null)
            }
            ,
            n = function(n) {
                return u(n, e.formDisableSelector).forEach(t)
            }
            ,
            t = function(t) {
                var e;
                return null != (e = t.getAttribute("data-disable-with")) && (s(t, "button") ? (l(t, "ujs:enable-with", t.innerHTML),
                t.innerHTML = e) : (l(t, "ujs:enable-with", t.value),
                t.value = e)),
                t.disabled = !0,
                l(t, "ujs:disabled", !0)
            }
            ,
            a = function(t) {
                return u(t, e.formEnableSelector).forEach(i)
            }
            ,
            i = function(t) {
                var e;
                return null != (e = c(t, "ujs:enable-with")) && (s(t, "button") ? t.innerHTML = e : t.value = e,
                l(t, "ujs:enable-with", null)),
                t.disabled = !1,
                l(t, "ujs:disabled", null)
            }
        }
        .call(this),
        function() {
            var t;
            t = e.stopEverything,
            e.handleMethod = function(n) {
                var r, i, a, o, u, c, s;
                if (s = (c = this).getAttribute("data-method"))
                    return u = e.href(c),
                    i = e.csrfToken(),
                    r = e.csrfParam(),
                    a = document.createElement("form"),
                    o = "<input name='_method' value='" + s + "' type='hidden' />",
                    null == r || null == i || e.isCrossDomain(u) || (o += "<input name='" + r + "' value='" + i + "' type='hidden' />"),
                    o += '<input type="submit" />',
                    a.method = "post",
                    a.action = u,
                    a.target = c.target,
                    a.innerHTML = o,
                    a.style.display = "none",
                    document.body.appendChild(a),
                    a.querySelector('[type="submit"]').click(),
                    t(n)
            }
        }
        .call(this),
        function() {
            var t, n, r, i, a, o, u, c, s, l = [].slice;
            o = e.matches,
            r = e.getData,
            c = e.setData,
            n = e.fire,
            s = e.stopEverything,
            t = e.ajax,
            i = e.isCrossDomain,
            u = e.serializeElement,
            a = function(t) {
                var e;
                return null != (e = t.getAttribute("data-remote")) && "false" !== e
            }
            ,
            e.handleRemote = function(f) {
                var d, h, p, m, b, y, v;
                return !a(m = this) || (n(m, "ajax:before") ? (v = m.getAttribute("data-with-credentials"),
                p = m.getAttribute("data-type") || "script",
                o(m, e.formSubmitSelector) ? (d = r(m, "ujs:submit-button"),
                b = r(m, "ujs:submit-button-formmethod") || m.method,
                y = r(m, "ujs:submit-button-formaction") || m.getAttribute("action") || location.href,
                "GET" === b.toUpperCase() && (y = y.replace(/\?.*$/, "")),
                "multipart/form-data" === m.enctype ? (h = new FormData(m),
                null != d && h.append(d.name, d.value)) : h = u(m, d),
                c(m, "ujs:submit-button", null),
                c(m, "ujs:submit-button-formmethod", null),
                c(m, "ujs:submit-button-formaction", null)) : o(m, e.buttonClickSelector) || o(m, e.inputChangeSelector) ? (b = m.getAttribute("data-method"),
                y = m.getAttribute("data-url"),
                h = u(m, m.getAttribute("data-params"))) : (b = m.getAttribute("data-method"),
                y = e.href(m),
                h = m.getAttribute("data-params")),
                t({
                    type: b || "GET",
                    url: y,
                    data: h,
                    dataType: p,
                    beforeSend: function(t, e) {
                        return n(m, "ajax:beforeSend", [t, e]) ? n(m, "ajax:send", [t]) : (n(m, "ajax:stopped"),
                        !1)
                    },
                    success: function() {
                        var t;
                        return t = 1 <= arguments.length ? l.call(arguments, 0) : [],
                        n(m, "ajax:success", t)
                    },
                    error: function() {
                        var t;
                        return t = 1 <= arguments.length ? l.call(arguments, 0) : [],
                        n(m, "ajax:error", t)
                    },
                    complete: function() {
                        var t;
                        return t = 1 <= arguments.length ? l.call(arguments, 0) : [],
                        n(m, "ajax:complete", t)
                    },
                    crossDomain: i(y),
                    withCredentials: null != v && "false" !== v
                }),
                s(f)) : (n(m, "ajax:stopped"),
                !1))
            }
            ,
            e.formSubmitButtonClick = function() {
                var t, e;
                if (e = (t = this).form)
                    return t.name && c(e, "ujs:submit-button", {
                        name: t.name,
                        value: t.value
                    }),
                    c(e, "ujs:formnovalidate-button", t.formNoValidate),
                    c(e, "ujs:submit-button-formaction", t.getAttribute("formaction")),
                    c(e, "ujs:submit-button-formmethod", t.getAttribute("formmethod"))
            }
            ,
            e.handleMetaClick = function(t) {
                var e, n, r;
                if (r = ((n = this).getAttribute("data-method") || "GET").toUpperCase(),
                e = n.getAttribute("data-params"),
                (t.metaKey || t.ctrlKey) && "GET" === r && !e)
                    return t.stopImmediatePropagation()
            }
        }
        .call(this),
        function() {
            var t, n, r, i, a, o, u, c, s, l, f, d, h, p;
            o = e.fire,
            r = e.delegate,
            c = e.getData,
            t = e.$,
            p = e.refreshCSRFTokens,
            n = e.CSRFProtection,
            a = e.enableElement,
            i = e.disableElement,
            l = e.handleDisabledElement,
            s = e.handleConfirm,
            h = e.handleRemote,
            u = e.formSubmitButtonClick,
            f = e.handleMetaClick,
            d = e.handleMethod,
            "undefined" == typeof jQuery || null === jQuery || null == jQuery.ajax || jQuery.rails || (jQuery.rails = e,
            jQuery.ajaxPrefilter(function(t, e, r) {
                if (!t.crossDomain)
                    return n(r)
            })),
            e.start = function() {
                if (window._rails_loaded)
                    throw new Error("rails-ujs has already been loaded!");
                return window.addEventListener("pageshow", function() {
                    return t(e.formEnableSelector).forEach(function(t) {
                        if (c(t, "ujs:disabled"))
                            return a(t)
                    }),
                    t(e.linkDisableSelector).forEach(function(t) {
                        if (c(t, "ujs:disabled"))
                            return a(t)
                    })
                }),
                r(document, e.linkDisableSelector, "ajax:complete", a),
                r(document, e.linkDisableSelector, "ajax:stopped", a),
                r(document, e.buttonDisableSelector, "ajax:complete", a),
                r(document, e.buttonDisableSelector, "ajax:stopped", a),
                r(document, e.linkClickSelector, "click", l),
                r(document, e.linkClickSelector, "click", s),
                r(document, e.linkClickSelector, "click", f),
                r(document, e.linkClickSelector, "click", i),
                r(document, e.linkClickSelector, "click", h),
                r(document, e.linkClickSelector, "click", d),
                r(document, e.buttonClickSelector, "click", l),
                r(document, e.buttonClickSelector, "click", s),
                r(document, e.buttonClickSelector, "click", i),
                r(document, e.buttonClickSelector, "click", h),
                r(document, e.inputChangeSelector, "change", l),
                r(document, e.inputChangeSelector, "change", s),
                r(document, e.inputChangeSelector, "change", h),
                r(document, e.formSubmitSelector, "submit", l),
                r(document, e.formSubmitSelector, "submit", s),
                r(document, e.formSubmitSelector, "submit", h),
                r(document, e.formSubmitSelector, "submit", function(t) {
                    return setTimeout(function() {
                        return i(t)
                    }, 13)
                }),
                r(document, e.formSubmitSelector, "ajax:send", i),
                r(document, e.formSubmitSelector, "ajax:complete", a),
                r(document, e.formInputClickSelector, "click", l),
                r(document, e.formInputClickSelector, "click", s),
                r(document, e.formInputClickSelector, "click", u),
                document.addEventListener("DOMContentLoaded", p),
                window._rails_loaded = !0
            }
            ,
            window.Rails === e && o(document, "rails:attachBindings") && e.start()
        }
        .call(this)
    }
    ).call(this),
    "object" == typeof module && module.exports ? module.exports = e : "function" == typeof define && define.amd && define(e)
}
).call(this),
function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.ActiveStorage = e() : t.ActiveStorage = e()
}(this, function() {
    return function(t) {
        function e(r) {
            if (n[r])
                return n[r].exports;
            var i = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return t[r].call(i.exports, i, i.exports, e),
            i.l = !0,
            i.exports
        }
        var n = {};
        return e.m = t,
        e.c = n,
        e.d = function(t, n, r) {
            e.o(t, n) || Object.defineProperty(t, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            })
        }
        ,
        e.n = function(t) {
            var n = t && t.__esModule ? function() {
                return t["default"]
            }
            : function() {
                return t
            }
            ;
            return e.d(n, "a", n),
            n
        }
        ,
        e.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }
        ,
        e.p = "",
        e(e.s = 2)
    }([function(t, e) {
        "use strict";
        function n(t) {
            var e = i(document.head, 'meta[name="' + t + '"]');
            if (e)
                return e.getAttribute("content")
        }
        function r(t, e) {
            return "string" == typeof t && (e = t,
            t = document),
            o(t.querySelectorAll(e))
        }
        function i(t, e) {
            return "string" == typeof t && (e = t,
            t = document),
            t.querySelector(e)
        }
        function a(t, e) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
              , r = t.disabled
              , i = n.bubbles
              , a = n.cancelable
              , o = n.detail
              , u = document.createEvent("Event");
            u.initEvent(e, i || !0, a || !0),
            u.detail = o || {};
            try {
                t.disabled = !1,
                t.dispatchEvent(u)
            } finally {
                t.disabled = r
            }
            return u
        }
        function o(t) {
            return Array.isArray(t) ? t : Array.from ? Array.from(t) : [].slice.call(t)
        }
        e.d = n,
        e.c = r,
        e.b = i,
        e.a = a,
        e.e = o
    }
    , function(t, e, n) {
        "use strict";
        function r(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function i(t, e) {
            if (t && "function" == typeof t[e]) {
                for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++)
                    r[i - 2] = arguments[i];
                return t[e].apply(t, r)
            }
        }
        n.d(e, "a", function() {
            return l
        });
        var a = n(6)
          , o = n(8)
          , u = n(9)
          , c = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r)
                }
            }
            return function(e, n, r) {
                return n && t(e.prototype, n),
                r && t(e, r),
                e
            }
        }()
          , s = 0
          , l = function() {
            function t(e, n, i) {
                r(this, t),
                this.id = ++s,
                this.file = e,
                this.url = n,
                this.delegate = i
            }
            return c(t, [{
                key: "create",
                value: function(t) {
                    var e = this;
                    a.a.create(this.file, function(n, r) {
                        if (n)
                            t(n);
                        else {
                            var a = new o.a(e.file,r,e.url);
                            i(e.delegate, "directUploadWillCreateBlobWithXHR", a.xhr),
                            a.create(function(n) {
                                if (n)
                                    t(n);
                                else {
                                    var r = new u.a(a);
                                    i(e.delegate, "directUploadWillStoreFileWithXHR", r.xhr),
                                    r.create(function(e) {
                                        e ? t(e) : t(null, a.toJSON())
                                    })
                                }
                            })
                        }
                    })
                }
            }]),
            t
        }()
    }
    , function(t, e, n) {
        "use strict";
        function r() {
            window.ActiveStorage && Object(i.a)()
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(3)
          , a = n(1);
        n.d(e, "start", function() {
            return i.a
        }),
        n.d(e, "DirectUpload", function() {
            return a.a
        }),
        setTimeout(r, 1)
    }
    , function(t, e, n) {
        "use strict";
        function r() {
            h || (h = !0,
            document.addEventListener("submit", i),
            document.addEventListener("ajax:before", a))
        }
        function i(t) {
            o(t)
        }
        function a(t) {
            "FORM" == t.target.tagName && o(t)
        }
        function o(t) {
            var e = t.target;
            if (e.hasAttribute(d))
                t.preventDefault();
            else {
                var n = new l.a(e)
                  , r = n.inputs;
                r.length && (t.preventDefault(),
                e.setAttribute(d, ""),
                r.forEach(c),
                n.start(function(t) {
                    e.removeAttribute(d),
                    t ? r.forEach(s) : u(e)
                }))
            }
        }
        function u(t) {
            var e = Object(f.b)(t, "input[type=submit]");
            if (e) {
                var n = e.disabled;
                e.disabled = !1,
                e.focus(),
                e.click(),
                e.disabled = n
            } else
                (e = document.createElement("input")).type = "submit",
                e.style.display = "none",
                t.appendChild(e),
                e.click(),
                t.removeChild(e)
        }
        function c(t) {
            t.disabled = !0
        }
        function s(t) {
            t.disabled = !1
        }
        e.a = r;
        var l = n(4)
          , f = n(0)
          , d = "data-direct-uploads-processing"
          , h = !1
    }
    , function(t, e, n) {
        "use strict";
        function r(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        n.d(e, "a", function() {
            return c
        });
        var i = n(5)
          , a = n(0)
          , o = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r)
                }
            }
            return function(e, n, r) {
                return n && t(e.prototype, n),
                r && t(e, r),
                e
            }
        }()
          , u = "input[type=file][data-direct-upload-url]:not([disabled])"
          , c = function() {
            function t(e) {
                r(this, t),
                this.form = e,
                this.inputs = Object(a.c)(e, u).filter(function(t) {
                    return t.files.length
                })
            }
            return o(t, [{
                key: "start",
                value: function(t) {
                    var e = this
                      , n = this.createDirectUploadControllers();
                    this.dispatch("start"),
                    function r() {
                        var i = n.shift();
                        i ? i.start(function(n) {
                            n ? (t(n),
                            e.dispatch("end")) : r()
                        }) : (t(),
                        e.dispatch("end"))
                    }()
                }
            }, {
                key: "createDirectUploadControllers",
                value: function() {
                    var t = [];
                    return this.inputs.forEach(function(e) {
                        Object(a.e)(e.files).forEach(function(n) {
                            var r = new i.a(e,n);
                            t.push(r)
                        })
                    }),
                    t
                }
            }, {
                key: "dispatch",
                value: function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return Object(a.a)(this.form, "direct-uploads:" + t, {
                        detail: e
                    })
                }
            }]),
            t
        }()
    }
    , function(t, e, n) {
        "use strict";
        function r(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        n.d(e, "a", function() {
            return u
        });
        var i = n(1)
          , a = n(0)
          , o = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r)
                }
            }
            return function(e, n, r) {
                return n && t(e.prototype, n),
                r && t(e, r),
                e
            }
        }()
          , u = function() {
            function t(e, n) {
                r(this, t),
                this.input = e,
                this.file = n,
                this.directUpload = new i.a(this.file,this.url,this),
                this.dispatch("initialize")
            }
            return o(t, [{
                key: "start",
                value: function(t) {
                    var e = this
                      , n = document.createElement("input");
                    n.type = "hidden",
                    n.name = this.input.name,
                    this.input.insertAdjacentElement("beforebegin", n),
                    this.dispatch("start"),
                    this.directUpload.create(function(r, i) {
                        r ? (n.parentNode.removeChild(n),
                        e.dispatchError(r)) : n.value = i.signed_id,
                        e.dispatch("end"),
                        t(r)
                    })
                }
            }, {
                key: "uploadRequestDidProgress",
                value: function(t) {
                    var e = t.loaded / t.total * 100;
                    e && this.dispatch("progress", {
                        progress: e
                    })
                }
            }, {
                key: "dispatch",
                value: function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return e.file = this.file,
                    e.id = this.directUpload.id,
                    Object(a.a)(this.input, "direct-upload:" + t, {
                        detail: e
                    })
                }
            }, {
                key: "dispatchError",
                value: function(t) {
                    this.dispatch("error", {
                        error: t
                    }).defaultPrevented || alert(t)
                }
            }, {
                key: "directUploadWillCreateBlobWithXHR",
                value: function(t) {
                    this.dispatch("before-blob-request", {
                        xhr: t
                    })
                }
            }, {
                key: "directUploadWillStoreFileWithXHR",
                value: function(t) {
                    var e = this;
                    this.dispatch("before-storage-request", {
                        xhr: t
                    }),
                    t.upload.addEventListener("progress", function(t) {
                        return e.uploadRequestDidProgress(t)
                    })
                }
            }, {
                key: "url",
                get: function() {
                    return this.input.getAttribute("data-direct-upload-url")
                }
            }]),
            t
        }()
    }
    , function(t, e, n) {
        "use strict";
        function r(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        n.d(e, "a", function() {
            return c
        });
        var i = n(7)
          , a = n.n(i)
          , o = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r)
                }
            }
            return function(e, n, r) {
                return n && t(e.prototype, n),
                r && t(e, r),
                e
            }
        }()
          , u = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
          , c = function() {
            function t(e) {
                r(this, t),
                this.file = e,
                this.chunkSize = 2097152,
                this.chunkCount = Math.ceil(this.file.size / this.chunkSize),
                this.chunkIndex = 0
            }
            return o(t, null, [{
                key: "create",
                value: function(e, n) {
                    new t(e).create(n)
                }
            }]),
            o(t, [{
                key: "create",
                value: function(t) {
                    var e = this;
                    this.callback = t,
                    this.md5Buffer = new a.a.ArrayBuffer,
                    this.fileReader = new FileReader,
                    this.fileReader.addEventListener("load", function(t) {
                        return e.fileReaderDidLoad(t)
                    }),
                    this.fileReader.addEventListener("error", function(t) {
                        return e.fileReaderDidError(t)
                    }),
                    this.readNextChunk()
                }
            }, {
                key: "fileReaderDidLoad",
                value: function(t) {
                    if (this.md5Buffer.append(t.target.result),
                    !this.readNextChunk()) {
                        var e = this.md5Buffer.end(!0)
                          , n = btoa(e);
                        this.callback(null, n)
                    }
                }
            }, {
                key: "fileReaderDidError",
                value: function() {
                    this.callback("Error reading " + this.file.name)
                }
            }, {
                key: "readNextChunk",
                value: function() {
                    if (this.chunkIndex < this.chunkCount) {
                        var t = this.chunkIndex * this.chunkSize
                          , e = Math.min(t + this.chunkSize, this.file.size)
                          , n = u.call(this.file, t, e);
                        return this.fileReader.readAsArrayBuffer(n),
                        this.chunkIndex++,
                        !0
                    }
                    return !1
                }
            }]),
            t
        }()
    }
    , function(t) {
        !function(e) {
            t.exports = e()
        }(function(t) {
            "use strict";
            function e(t, e) {
                var n = t[0]
                  , r = t[1]
                  , i = t[2]
                  , a = t[3];
                r = ((r += ((i = ((i += ((a = ((a += ((n = ((n += (r & i | ~r & a) + e[0] - 680876936 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & i) + e[1] - 389564586 | 0) << 12 | a >>> 20) + n | 0) & n | ~a & r) + e[2] + 606105819 | 0) << 17 | i >>> 15) + a | 0) & a | ~i & n) + e[3] - 1044525330 | 0) << 22 | r >>> 10) + i | 0,
                r = ((r += ((i = ((i += ((a = ((a += ((n = ((n += (r & i | ~r & a) + e[4] - 176418897 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & i) + e[5] + 1200080426 | 0) << 12 | a >>> 20) + n | 0) & n | ~a & r) + e[6] - 1473231341 | 0) << 17 | i >>> 15) + a | 0) & a | ~i & n) + e[7] - 45705983 | 0) << 22 | r >>> 10) + i | 0,
                r = ((r += ((i = ((i += ((a = ((a += ((n = ((n += (r & i | ~r & a) + e[8] + 1770035416 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & i) + e[9] - 1958414417 | 0) << 12 | a >>> 20) + n | 0) & n | ~a & r) + e[10] - 42063 | 0) << 17 | i >>> 15) + a | 0) & a | ~i & n) + e[11] - 1990404162 | 0) << 22 | r >>> 10) + i | 0,
                r = ((r += ((i = ((i += ((a = ((a += ((n = ((n += (r & i | ~r & a) + e[12] + 1804603682 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & i) + e[13] - 40341101 | 0) << 12 | a >>> 20) + n | 0) & n | ~a & r) + e[14] - 1502002290 | 0) << 17 | i >>> 15) + a | 0) & a | ~i & n) + e[15] + 1236535329 | 0) << 22 | r >>> 10) + i | 0,
                r = ((r += ((i = ((i += ((a = ((a += ((n = ((n += (r & a | i & ~a) + e[1] - 165796510 | 0) << 5 | n >>> 27) + r | 0) & i | r & ~i) + e[6] - 1069501632 | 0) << 9 | a >>> 23) + n | 0) & r | n & ~r) + e[11] + 643717713 | 0) << 14 | i >>> 18) + a | 0) & n | a & ~n) + e[0] - 373897302 | 0) << 20 | r >>> 12) + i | 0,
                r = ((r += ((i = ((i += ((a = ((a += ((n = ((n += (r & a | i & ~a) + e[5] - 701558691 | 0) << 5 | n >>> 27) + r | 0) & i | r & ~i) + e[10] + 38016083 | 0) << 9 | a >>> 23) + n | 0) & r | n & ~r) + e[15] - 660478335 | 0) << 14 | i >>> 18) + a | 0) & n | a & ~n) + e[4] - 405537848 | 0) << 20 | r >>> 12) + i | 0,
                r = ((r += ((i = ((i += ((a = ((a += ((n = ((n += (r & a | i & ~a) + e[9] + 568446438 | 0) << 5 | n >>> 27) + r | 0) & i | r & ~i) + e[14] - 1019803690 | 0) << 9 | a >>> 23) + n | 0) & r | n & ~r) + e[3] - 187363961 | 0) << 14 | i >>> 18) + a | 0) & n | a & ~n) + e[8] + 1163531501 | 0) << 20 | r >>> 12) + i | 0,
                r = ((r += ((i = ((i += ((a = ((a += ((n = ((n += (r & a | i & ~a) + e[13] - 1444681467 | 0) << 5 | n >>> 27) + r | 0) & i | r & ~i) + e[2] - 51403784 | 0) << 9 | a >>> 23) + n | 0) & r | n & ~r) + e[7] + 1735328473 | 0) << 14 | i >>> 18) + a | 0) & n | a & ~n) + e[12] - 1926607734 | 0) << 20 | r >>> 12) + i | 0,
                r = ((r += ((i = ((i += ((a = ((a += ((n = ((n += (r ^ i ^ a) + e[5] - 378558 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ i) + e[8] - 2022574463 | 0) << 11 | a >>> 21) + n | 0) ^ n ^ r) + e[11] + 1839030562 | 0) << 16 | i >>> 16) + a | 0) ^ a ^ n) + e[14] - 35309556 | 0) << 23 | r >>> 9) + i | 0,
                r = ((r += ((i = ((i += ((a = ((a += ((n = ((n += (r ^ i ^ a) + e[1] - 1530992060 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ i) + e[4] + 1272893353 | 0) << 11 | a >>> 21) + n | 0) ^ n ^ r) + e[7] - 155497632 | 0) << 16 | i >>> 16) + a | 0) ^ a ^ n) + e[10] - 1094730640 | 0) << 23 | r >>> 9) + i | 0,
                r = ((r += ((i = ((i += ((a = ((a += ((n = ((n += (r ^ i ^ a) + e[13] + 681279174 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ i) + e[0] - 358537222 | 0) << 11 | a >>> 21) + n | 0) ^ n ^ r) + e[3] - 722521979 | 0) << 16 | i >>> 16) + a | 0) ^ a ^ n) + e[6] + 76029189 | 0) << 23 | r >>> 9) + i | 0,
                r = ((r += ((i = ((i += ((a = ((a += ((n = ((n += (r ^ i ^ a) + e[9] - 640364487 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ i) + e[12] - 421815835 | 0) << 11 | a >>> 21) + n | 0) ^ n ^ r) + e[15] + 530742520 | 0) << 16 | i >>> 16) + a | 0) ^ a ^ n) + e[2] - 995338651 | 0) << 23 | r >>> 9) + i | 0,
                r = ((r += ((a = ((a += (r ^ ((n = ((n += (i ^ (r | ~a)) + e[0] - 198630844 | 0) << 6 | n >>> 26) + r | 0) | ~i)) + e[7] + 1126891415 | 0) << 10 | a >>> 22) + n | 0) ^ ((i = ((i += (n ^ (a | ~r)) + e[14] - 1416354905 | 0) << 15 | i >>> 17) + a | 0) | ~n)) + e[5] - 57434055 | 0) << 21 | r >>> 11) + i | 0,
                r = ((r += ((a = ((a += (r ^ ((n = ((n += (i ^ (r | ~a)) + e[12] + 1700485571 | 0) << 6 | n >>> 26) + r | 0) | ~i)) + e[3] - 1894986606 | 0) << 10 | a >>> 22) + n | 0) ^ ((i = ((i += (n ^ (a | ~r)) + e[10] - 1051523 | 0) << 15 | i >>> 17) + a | 0) | ~n)) + e[1] - 2054922799 | 0) << 21 | r >>> 11) + i | 0,
                r = ((r += ((a = ((a += (r ^ ((n = ((n += (i ^ (r | ~a)) + e[8] + 1873313359 | 0) << 6 | n >>> 26) + r | 0) | ~i)) + e[15] - 30611744 | 0) << 10 | a >>> 22) + n | 0) ^ ((i = ((i += (n ^ (a | ~r)) + e[6] - 1560198380 | 0) << 15 | i >>> 17) + a | 0) | ~n)) + e[13] + 1309151649 | 0) << 21 | r >>> 11) + i | 0,
                r = ((r += ((a = ((a += (r ^ ((n = ((n += (i ^ (r | ~a)) + e[4] - 145523070 | 0) << 6 | n >>> 26) + r | 0) | ~i)) + e[11] - 1120210379 | 0) << 10 | a >>> 22) + n | 0) ^ ((i = ((i += (n ^ (a | ~r)) + e[2] + 718787259 | 0) << 15 | i >>> 17) + a | 0) | ~n)) + e[9] - 343485551 | 0) << 21 | r >>> 11) + i | 0,
                t[0] = n + t[0] | 0,
                t[1] = r + t[1] | 0,
                t[2] = i + t[2] | 0,
                t[3] = a + t[3] | 0
            }
            function n(t) {
                var e, n = [];
                for (e = 0; e < 64; e += 4)
                    n[e >> 2] = t.charCodeAt(e) + (t.charCodeAt(e + 1) << 8) + (t.charCodeAt(e + 2) << 16) + (t.charCodeAt(e + 3) << 24);
                return n
            }
            function r(t) {
                var e, n = [];
                for (e = 0; e < 64; e += 4)
                    n[e >> 2] = t[e] + (t[e + 1] << 8) + (t[e + 2] << 16) + (t[e + 3] << 24);
                return n
            }
            function i(t) {
                var r, i, a, o, u, c, s = t.length, l = [1732584193, -271733879, -1732584194, 271733878];
                for (r = 64; r <= s; r += 64)
                    e(l, n(t.substring(r - 64, r)));
                for (i = (t = t.substring(r - 64)).length,
                a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                r = 0; r < i; r += 1)
                    a[r >> 2] |= t.charCodeAt(r) << (r % 4 << 3);
                if (a[r >> 2] |= 128 << (r % 4 << 3),
                r > 55)
                    for (e(l, a),
                    r = 0; r < 16; r += 1)
                        a[r] = 0;
                return o = (o = 8 * s).toString(16).match(/(.*?)(.{0,8})$/),
                u = parseInt(o[2], 16),
                c = parseInt(o[1], 16) || 0,
                a[14] = u,
                a[15] = c,
                e(l, a),
                l
            }
            function a(t) {
                var n, i, a, o, u, c, s = t.length, l = [1732584193, -271733879, -1732584194, 271733878];
                for (n = 64; n <= s; n += 64)
                    e(l, r(t.subarray(n - 64, n)));
                for (i = (t = n - 64 < s ? t.subarray(n - 64) : new Uint8Array(0)).length,
                a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                n = 0; n < i; n += 1)
                    a[n >> 2] |= t[n] << (n % 4 << 3);
                if (a[n >> 2] |= 128 << (n % 4 << 3),
                n > 55)
                    for (e(l, a),
                    n = 0; n < 16; n += 1)
                        a[n] = 0;
                return o = (o = 8 * s).toString(16).match(/(.*?)(.{0,8})$/),
                u = parseInt(o[2], 16),
                c = parseInt(o[1], 16) || 0,
                a[14] = u,
                a[15] = c,
                e(l, a),
                l
            }
            function o(t) {
                var e, n = "";
                for (e = 0; e < 4; e += 1)
                    n += p[t >> 8 * e + 4 & 15] + p[t >> 8 * e & 15];
                return n
            }
            function u(t) {
                var e;
                for (e = 0; e < t.length; e += 1)
                    t[e] = o(t[e]);
                return t.join("")
            }
            function c(t) {
                return /[\u0080-\uFFFF]/.test(t) && (t = unescape(encodeURIComponent(t))),
                t
            }
            function s(t, e) {
                var n, r = t.length, i = new ArrayBuffer(r), a = new Uint8Array(i);
                for (n = 0; n < r; n += 1)
                    a[n] = t.charCodeAt(n);
                return e ? a : i
            }
            function l(t) {
                return String.fromCharCode.apply(null, new Uint8Array(t))
            }
            function f(t, e, n) {
                var r = new Uint8Array(t.byteLength + e.byteLength);
                return r.set(new Uint8Array(t)),
                r.set(new Uint8Array(e), t.byteLength),
                n ? r : r.buffer
            }
            function d(t) {
                var e, n = [], r = t.length;
                for (e = 0; e < r - 1; e += 2)
                    n.push(parseInt(t.substr(e, 2), 16));
                return String.fromCharCode.apply(String, n)
            }
            function h() {
                this.reset()
            }
            var p = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
            return u(i("hello")),
            "undefined" == typeof ArrayBuffer || ArrayBuffer.prototype.slice || function() {
                function e(t, e) {
                    return (t = 0 | t || 0) < 0 ? Math.max(t + e, 0) : Math.min(t, e)
                }
                ArrayBuffer.prototype.slice = function(n, r) {
                    var i, a, o, u, c = this.byteLength, s = e(n, c), l = c;
                    return r !== t && (l = e(r, c)),
                    s > l ? new ArrayBuffer(0) : (i = l - s,
                    a = new ArrayBuffer(i),
                    o = new Uint8Array(a),
                    u = new Uint8Array(this,s,i),
                    o.set(u),
                    a)
                }
            }(),
            h.prototype.append = function(t) {
                return this.appendBinary(c(t)),
                this
            }
            ,
            h.prototype.appendBinary = function(t) {
                this._buff += t,
                this._length += t.length;
                var r, i = this._buff.length;
                for (r = 64; r <= i; r += 64)
                    e(this._hash, n(this._buff.substring(r - 64, r)));
                return this._buff = this._buff.substring(r - 64),
                this
            }
            ,
            h.prototype.end = function(t) {
                var e, n, r = this._buff, i = r.length, a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (e = 0; e < i; e += 1)
                    a[e >> 2] |= r.charCodeAt(e) << (e % 4 << 3);
                return this._finish(a, i),
                n = u(this._hash),
                t && (n = d(n)),
                this.reset(),
                n
            }
            ,
            h.prototype.reset = function() {
                return this._buff = "",
                this._length = 0,
                this._hash = [1732584193, -271733879, -1732584194, 271733878],
                this
            }
            ,
            h.prototype.getState = function() {
                return {
                    buff: this._buff,
                    length: this._length,
                    hash: this._hash
                }
            }
            ,
            h.prototype.setState = function(t) {
                return this._buff = t.buff,
                this._length = t.length,
                this._hash = t.hash,
                this
            }
            ,
            h.prototype.destroy = function() {
                delete this._hash,
                delete this._buff,
                delete this._length
            }
            ,
            h.prototype._finish = function(t, n) {
                var r, i, a, o = n;
                if (t[o >> 2] |= 128 << (o % 4 << 3),
                o > 55)
                    for (e(this._hash, t),
                    o = 0; o < 16; o += 1)
                        t[o] = 0;
                r = (r = 8 * this._length).toString(16).match(/(.*?)(.{0,8})$/),
                i = parseInt(r[2], 16),
                a = parseInt(r[1], 16) || 0,
                t[14] = i,
                t[15] = a,
                e(this._hash, t)
            }
            ,
            h.hash = function(t, e) {
                return h.hashBinary(c(t), e)
            }
            ,
            h.hashBinary = function(t, e) {
                var n = u(i(t));
                return e ? d(n) : n
            }
            ,
            h.ArrayBuffer = function() {
                this.reset()
            }
            ,
            h.ArrayBuffer.prototype.append = function(t) {
                var n, i = f(this._buff.buffer, t, !0), a = i.length;
                for (this._length += t.byteLength,
                n = 64; n <= a; n += 64)
                    e(this._hash, r(i.subarray(n - 64, n)));
                return this._buff = n - 64 < a ? new Uint8Array(i.buffer.slice(n - 64)) : new Uint8Array(0),
                this
            }
            ,
            h.ArrayBuffer.prototype.end = function(t) {
                var e, n, r = this._buff, i = r.length, a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (e = 0; e < i; e += 1)
                    a[e >> 2] |= r[e] << (e % 4 << 3);
                return this._finish(a, i),
                n = u(this._hash),
                t && (n = d(n)),
                this.reset(),
                n
            }
            ,
            h.ArrayBuffer.prototype.reset = function() {
                return this._buff = new Uint8Array(0),
                this._length = 0,
                this._hash = [1732584193, -271733879, -1732584194, 271733878],
                this
            }
            ,
            h.ArrayBuffer.prototype.getState = function() {
                var t = h.prototype.getState.call(this);
                return t.buff = l(t.buff),
                t
            }
            ,
            h.ArrayBuffer.prototype.setState = function(t) {
                return t.buff = s(t.buff, !0),
                h.prototype.setState.call(this, t)
            }
            ,
            h.ArrayBuffer.prototype.destroy = h.prototype.destroy,
            h.ArrayBuffer.prototype._finish = h.prototype._finish,
            h.ArrayBuffer.hash = function(t, e) {
                var n = u(a(new Uint8Array(t)));
                return e ? d(n) : n
            }
            ,
            h
        })
    }
    , function(t, e, n) {
        "use strict";
        function r(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        n.d(e, "a", function() {
            return o
        });
        var i = n(0)
          , a = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r)
                }
            }
            return function(e, n, r) {
                return n && t(e.prototype, n),
                r && t(e, r),
                e
            }
        }()
          , o = function() {
            function t(e, n, a) {
                var o = this;
                r(this, t),
                this.file = e,
                this.attributes = {
                    filename: e.name,
                    content_type: e.type,
                    byte_size: e.size,
                    checksum: n
                },
                this.xhr = new XMLHttpRequest,
                this.xhr.open("POST", a, !0),
                this.xhr.responseType = "json",
                this.xhr.setRequestHeader("Content-Type", "application/json"),
                this.xhr.setRequestHeader("Accept", "application/json"),
                this.xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                this.xhr.setRequestHeader("X-CSRF-Token", Object(i.d)("csrf-token")),
                this.xhr.addEventListener("load", function(t) {
                    return o.requestDidLoad(t)
                }),
                this.xhr.addEventListener("error", function(t) {
                    return o.requestDidError(t)
                })
            }
            return a(t, [{
                key: "create",
                value: function(t) {
                    this.callback = t,
                    this.xhr.send(JSON.stringify({
                        blob: this.attributes
                    }))
                }
            }, {
                key: "requestDidLoad",
                value: function(t) {
                    if (this.status >= 200 && this.status < 300) {
                        var e = this.response
                          , n = e.direct_upload;
                        delete e.direct_upload,
                        this.attributes = e,
                        this.directUploadData = n,
                        this.callback(null, this.toJSON())
                    } else
                        this.requestDidError(t)
                }
            }, {
                key: "requestDidError",
                value: function() {
                    this.callback('Error creating Blob for "' + this.file.name + '". Status: ' + this.status)
                }
            }, {
                key: "toJSON",
                value: function() {
                    var t = {};
                    for (var e in this.attributes)
                        t[e] = this.attributes[e];
                    return t
                }
            }, {
                key: "status",
                get: function() {
                    return this.xhr.status
                }
            }, {
                key: "response",
                get: function() {
                    var t = this.xhr
                      , e = t.responseType
                      , n = t.response;
                    return "json" == e ? n : JSON.parse(n)
                }
            }]),
            t
        }()
    }
    , function(t, e, n) {
        "use strict";
        function r(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        n.d(e, "a", function() {
            return a
        });
        var i = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r)
                }
            }
            return function(e, n, r) {
                return n && t(e.prototype, n),
                r && t(e, r),
                e
            }
        }()
          , a = function() {
            function t(e) {
                var n = this;
                r(this, t),
                this.blob = e,
                this.file = e.file;
                var i = e.directUploadData
                  , a = i.url
                  , o = i.headers;
                for (var u in this.xhr = new XMLHttpRequest,
                this.xhr.open("PUT", a, !0),
                this.xhr.responseType = "text",
                o)
                    this.xhr.setRequestHeader(u, o[u]);
                this.xhr.addEventListener("load", function(t) {
                    return n.requestDidLoad(t)
                }),
                this.xhr.addEventListener("error", function(t) {
                    return n.requestDidError(t)
                })
            }
            return i(t, [{
                key: "create",
                value: function(t) {
                    this.callback = t,
                    this.xhr.send(this.file.slice())
                }
            }, {
                key: "requestDidLoad",
                value: function(t) {
                    var e = this.xhr
                      , n = e.status
                      , r = e.response;
                    n >= 200 && n < 300 ? this.callback(null, r) : this.requestDidError(t)
                }
            }, {
                key: "requestDidError",
                value: function() {
                    this.callback('Error storing "' + this.file.name + '". Status: ' + this.xhr.status)
                }
            }]),
            t
        }()
    }
    ])
});


$.fn.select2.amd.require(['select2/selection/search'], function (Search) {
    var oldRemoveChoice = Search.prototype.searchRemoveChoice;
    
    Search.prototype.searchRemoveChoice = function () {
        oldRemoveChoice.apply(this, arguments);
        this.$search.val('');
    };
    
});


(function(){
    $(document).ready(function(e){
        let qs = new URLSearchParams(window.location.search)
          , exclude_id=parseInt(qs.get("e"))
          , video_id=parseInt(qs.get("v"))
          , media_language = Object.keys(media)
          , random_language = media_language[Math.floor(Math.random() * media_language.length)]
          , media_list = media[random_language]
          , video_list = video_id && media_list.filter(v=>(v.id === video_id))
          , final_list = video_list.length ? video_list : media_list.filter(v=>(v.id  != exclude_id))
          , random_media = final_list[Math.floor(Math.random() * final_list.length)]
          , demo_id = random_media.id
          , new_link = window.location.origin+window.location.pathname+"?e="+demo_id;

        $("#media-stimulus,#media-object").attr("poster", random_media.poster).attr("data", random_media.data);
        $("body").delegate("#try_another,#choose_another", "click", (e)=>{e.preventDefault(),window.location.href=new_link});

        let demoType = qs.get("type")
          , demoFACSId = 'facevideo-node'
          , demoMessage;

        if(demoType === "play"){
            demoMessage = messages.demoMessageStart+messages.demoPlay+messages.demoMessageEnd;
        }
        else if(demoType === "watch"){
            demoMessage = messages.demoMessageStart+messages.demoWatch+messages.demoMessageEnd;
            demoFACSId = 'video-wrapper'
        }
        else if(demoType === "present"){
            demoMessage = messages.demoMessageStart+messages.demoPresent+messages.demoMessageEnd;
        }
        else{
            demoMessage = messages.demoMessageStart+messages.demoPlay+messages.demoWatch+messages.demoPresent+messages.demoMessageEnd;
        }
        messages.demoMessage = demoMessage;
        messages.demoFACSId = demoFACSId;
    });

    $(window).on('load', function() {
        $('#preloader-active').delay(450).fadeOut('slow');
        $('body').delay(450).css({
            'overflow': 'visible'
        });
    });

})($);