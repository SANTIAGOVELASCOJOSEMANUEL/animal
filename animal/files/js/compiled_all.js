/*! 2016-11-14 */
function Segment(a, b, c) {
    this.path = a,
    this.length = a.getTotalLength(),
    this.path.style.strokeDashoffset = 2 * this.length,
    this.begin = b ? this.valueOf(b) : 0,
    this.end = c ? this.valueOf(c) : this.length,
    this.timer = null,
    this.draw(this.begin, this.end)
}
function zeroFill(a, b, c) {
    c = "undefined" == typeof c ? "0" : c + "",
    a += "";
    var d = "";
    for ("-" === a.charAt(0) && (d = "-",
    a = a.slice(1)); a.length < b; )
        a = c + a;
    return d + a
}
function numberWithCommas(a) {
    var b = a.toString().split(".");
    return b[0].replace(/\B(?=(\d{3})+(?=$))/g, ",") + (b[1] ? "." + b[1] : "")
}
function initWorkData() {
    $numThumbsLeft = settings.portData.projects.length,
    parseData(0)
}
function thumbLoaded(a) {
    createItem(a),
    $nextId = a + 1,
    --$numThumbsLeft ? parseData($nextId) : createEndGallery()
}
function parseData(a) {
    var b = {};
    b.thumb = settings.portData.projects[a].thumb,
    b.title = settings.portData.projects[a].title,
    b.role = settings.portData.projects[a].role,
    b.client = settings.portData.projects[a].client,
    b.link = settings.portData.projects[a].link,
    b.gallery = settings.portData.projects[a].gallery,
    $items.push(b);
    var c = new Image;
    c.src = settings.cdnPath + settings.portData.projects[a].thumb,
    thumbLoaded(a)
}
function createItem(a) {
    var b = $items[a].title
      , c = '<p class="title">' + $items[a].title + "</p>"
      , d = '<p class="client">' + $items[a].client.toUpperCase() + "</p>"
      , e = settings.cdnPath + $items[a].thumb
      , f = b.replace(/\s+/g, "-").toLowerCase()
      , g = Math.round(400 * Math.random())
      , h = Math.round(400 * Math.random())
      , i = 'style="background-position-x:' + g + 'px;"'
      , j = 'style="background-position-x:' + h + 'px;"'
      , k = '<div class="work-bush-container"><div class="work-bushes bush-bg"' + i + '></div><div class="work-bushes bush-fg"' + j + '></div><div class="button"><div class="sprite-anim-leaves"></div></div></div>'
      , l = '<div class="data-module">' + k + '<div class="data-container">' + c + d + "</div></div>"
      , m = '<a class="project" href="/work/' + f + '" data-id="' + a + '"><div class="gallery-thumb-container"><div class="button"><div class="sprite-anim-project"></div></div><div class="bg-container"><img class="bg" src="' + e + '"></div></div><div class="gallery-info-container">' + l + '</div><div class="gallery-bottom-bar"></div></a>';
    $("#gallery-work").append(m)
}
function createEndGallery() {
    var a = '<div class="project" style="visibility: hidden"></div><div class="project" style="visibility: hidden"></div>';
    $("#gallery-work").append(a)
}
function createStartGallery() {}
function galleryInit(a) {
    $isGalleryOpen = !0,
    $pData = settings.portData.projects[a],
    $gData = $pData.gallery,
    $itemsLeft = $gData.length,
    loadItem(0)
}
function itemLoaded(a) {
    var b = $gData[a].type;
    switch (b) {
    case "image":
        drawImage(a);
        break;
    case "video":
        drawVideo(a);
        break;
    case "youtube":
        drawEmbed(a);
        break;
    case "vimeo":
        drawEmbed(a)
    }
    var c = a + 1;
    --$itemsLeft && loadItem(c)
}
function loadItem(a) {
    if ("image" == $gData[a].type) {
        var b = new Image;
        b.src = settings.cdnPath + $gData[a].url,
        b.onload = function() {
            itemLoaded(a)
        }
    } else
        itemLoaded(a)
}
function drawImage(a) {
    var b = $gData[a].aspect;
    $("#gallery-container").append("square" == b ? '<div class="image-container square"><img class="shadow" src="' + settings.cdnPath + $gData[a].url + '"></div>' : '<div class="image-container"><img class="shadow" src="' + settings.cdnPath + $gData[a].url + '"></div>')
}
function drawVideo(a) {
    var b = $gData[a].aspect;
    $("#gallery-container").append($('<div class="image-container ' + b + ' shadow"></div>').load(settings.cdnPath + "files/php/modules/gallery-video.php", {
        video: $gData[a].url,
        poster: $gData[a].poster,
        id: a
    }))
}
function drawEmbed(a) {
    $("#gallery-container").append($('<div class="image-container shadow"></div>').load(settings.cdnPath + "files/php/modules/gallery-embed.php", {
        video: $gData[a].url,
        type: $gData[a].type,
        id: a
    }))
}
function myShadow(a) {
    var b = ""
      , c = 600;
    for (i = 0; i < c; i++)
        comma = i == c - 1 ? "" : ",",
        b += LightenDarkenColor("#" + a, -30) + " " + i + "px " + i + "px" + comma;
    return b
}
function LightenDarkenColor(a, b) {
    var c = !1;
    "#" == a[0] && (a = a.slice(1),
    c = !0);
    var d = parseInt(a, 16)
      , e = (d >> 16) + b;
    e > 255 ? e = 255 : 0 > e && (e = 0);
    var f = (d >> 8 & 255) + b;
    f > 255 ? f = 255 : 0 > f && (f = 0);
    var g = (255 & d) + b;
    return g > 255 ? g = 255 : 0 > g && (g = 0),
    "rgb(" + e + "," + f + "," + g + ")"
}
function terminateLoader() {
    --$itemsLeft && (0 == $itemsLeft,
    window.stop())
}
window.Modernizr = function(a, b, c) {
    function d(a) {
        t.cssText = a
    }
    function e(a, b) {
        return d(x.join(a + ";") + (b || ""))
    }
    function f(a, b) {
        return typeof a === b
    }
    function g(a, b) {
        return !!~("" + a).indexOf(b)
    }
    function h(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!g(e, "-") && t[e] !== c)
                return "pfx" == b ? e : !0
        }
        return !1
    }
    function i(a, b, d) {
        for (var e in a) {
            var g = b[a[e]];
            if (g !== c)
                return d === !1 ? a[e] : f(g, "function") ? g.bind(d || b) : g
        }
        return !1
    }
    function j(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1)
          , e = (a + " " + z.join(d + " ") + d).split(" ");
        return f(b, "string") || f(b, "undefined") ? h(e, b) : (e = (a + " " + A.join(d + " ") + d).split(" "),
        i(e, b, c))
    }
    function k() {
        o.input = function(c) {
            for (var d = 0, e = c.length; e > d; d++)
                E[c[d]] = c[d]in u;
            return E.list && (E.list = !!b.createElement("datalist") && !!a.HTMLDataListElement),
            E
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),
        o.inputtypes = function(a) {
            for (var d, e, f, g = 0, h = a.length; h > g; g++)
                u.setAttribute("type", e = a[g]),
                d = "text" !== u.type,
                d && (u.value = v,
                u.style.cssText = "position:absolute;visibility:hidden;",
                /^range$/.test(e) && u.style.WebkitAppearance !== c ? (q.appendChild(u),
                f = b.defaultView,
                d = f.getComputedStyle && "textfield" !== f.getComputedStyle(u, null).WebkitAppearance && 0 !== u.offsetHeight,
                q.removeChild(u)) : /^(search|tel)$/.test(e) || (d = /^(url|email)$/.test(e) ? u.checkValidity && u.checkValidity() === !1 : u.value != v)),
                D[a[g]] = !!d;
            return D
        }("search tel url email datetime date month week time datetime-local number range color".split(" "))
    }
    var l, m, n = "2.8.1", o = {}, p = !0, q = b.documentElement, r = "modernizr", s = b.createElement(r), t = s.style, u = b.createElement("input"), v = ":)", w = {}.toString, x = " -webkit- -moz- -o- -ms- ".split(" "), y = "Webkit Moz O ms", z = y.split(" "), A = y.toLowerCase().split(" "), B = {
        svg: "http://www.w3.org/2000/svg"
    }, C = {}, D = {}, E = {}, F = [], G = F.slice, H = function(a, c, d, e) {
        var f, g, h, i, j = b.createElement("div"), k = b.body, l = k || b.createElement("body");
        if (parseInt(d, 10))
            for (; d--; )
                h = b.createElement("div"),
                h.id = e ? e[d] : r + (d + 1),
                j.appendChild(h);
        return f = ["&#173;", '<style id="s', r, '">', a, "</style>"].join(""),
        j.id = r,
        (k ? j : l).innerHTML += f,
        l.appendChild(j),
        k || (l.style.background = "",
        l.style.overflow = "hidden",
        i = q.style.overflow,
        q.style.overflow = "hidden",
        q.appendChild(l)),
        g = c(j, a),
        k ? j.parentNode.removeChild(j) : (l.parentNode.removeChild(l),
        q.style.overflow = i),
        !!g
    }, I = function(b) {
        var c = a.matchMedia || a.msMatchMedia;
        if (c)
            return c(b) && c(b).matches || !1;
        var d;
        return H("@media " + b + " { #" + r + " { position: absolute; } }", function(b) {
            d = "absolute" == (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle).position
        }),
        d
    }, J = function() {
        function a(a, e) {
            e = e || b.createElement(d[a] || "div"),
            a = "on" + a;
            var g = a in e;
            return g || (e.setAttribute || (e = b.createElement("div")),
            e.setAttribute && e.removeAttribute && (e.setAttribute(a, ""),
            g = f(e[a], "function"),
            f(e[a], "undefined") || (e[a] = c),
            e.removeAttribute(a))),
            e = null,
            g
        }
        var d = {
            select: "input",
            change: "input",
            submit: "form",
            reset: "form",
            error: "img",
            load: "img",
            abort: "img"
        };
        return a
    }(), K = {}.hasOwnProperty;
    m = f(K, "undefined") || f(K.call, "undefined") ? function(a, b) {
        return b in a && f(a.constructor.prototype[b], "undefined")
    }
    : function(a, b) {
        return K.call(a, b)
    }
    ,
    Function.prototype.bind || (Function.prototype.bind = function(a) {
        var b = this;
        if ("function" != typeof b)
            throw new TypeError;
        var c = G.call(arguments, 1)
          , d = function() {
            if (this instanceof d) {
                var e = function() {};
                e.prototype = b.prototype;
                var f = new e
                  , g = b.apply(f, c.concat(G.call(arguments)));
                return Object(g) === g ? g : f
            }
            return b.apply(a, c.concat(G.call(arguments)))
        };
        return d
    }
    ),
    C.flexbox = function() {
        return j("flexWrap")
    }
    ,
    C.flexboxlegacy = function() {
        return j("boxDirection")
    }
    ,
    C.canvas = function() {
        var a = b.createElement("canvas");
        return !!a.getContext && !!a.getContext("2d")
    }
    ,
    C.canvastext = function() {
        return !!o.canvas && !!f(b.createElement("canvas").getContext("2d").fillText, "function")
    }
    ,
    C.webgl = function() {
        return !!a.WebGLRenderingContext
    }
    ,
    C.touch = function() {
        var c;
        return "ontouchstart"in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : H(["@media (", x.join("touch-enabled),("), r, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
            c = 9 === a.offsetTop
        }),
        c
    }
    ,
    C.postmessage = function() {
        return !!a.postMessage
    }
    ,
    C.websqldatabase = function() {
        return !!a.openDatabase
    }
    ,
    C.indexedDB = function() {
        return !!j("indexedDB", a)
    }
    ,
    C.hashchange = function() {
        return J("hashchange", a) && (b.documentMode === c || b.documentMode > 7)
    }
    ,
    C.history = function() {
        return !!a.history && !!history.pushState
    }
    ,
    C.draganddrop = function() {
        var a = b.createElement("div");
        return "draggable"in a || "ondragstart"in a && "ondrop"in a
    }
    ,
    C.websockets = function() {
        return "WebSocket"in a || "MozWebSocket"in a
    }
    ,
    C.rgba = function() {
        return d("background-color:rgba(150,255,150,.5)"),
        g(t.backgroundColor, "rgba")
    }
    ,
    C.hsla = function() {
        return d("background-color:hsla(120,40%,100%,.5)"),
        g(t.backgroundColor, "rgba") || g(t.backgroundColor, "hsla")
    }
    ,
    C.multiplebgs = function() {
        return d("background:url(https://),url(https://),red url(https://)"),
        /(url\s*\(.*?){3}/.test(t.background)
    }
    ,
    C.backgroundsize = function() {
        return j("backgroundSize")
    }
    ,
    C.borderimage = function() {
        return j("borderImage")
    }
    ,
    C.borderradius = function() {
        return j("borderRadius")
    }
    ,
    C.boxshadow = function() {
        return j("boxShadow")
    }
    ,
    C.textshadow = function() {
        return "" === b.createElement("div").style.textShadow
    }
    ,
    C.opacity = function() {
        return e("opacity:.55"),
        /^0.55$/.test(t.opacity)
    }
    ,
    C.cssanimations = function() {
        return j("animationName")
    }
    ,
    C.csscolumns = function() {
        return j("columnCount")
    }
    ,
    C.cssgradients = function() {
        var a = "background-image:"
          , b = "gradient(linear,left top,right bottom,from(#9f9),to(white));"
          , c = "linear-gradient(left top,#9f9, white);";
        return d((a + "-webkit- ".split(" ").join(b + a) + x.join(c + a)).slice(0, -a.length)),
        g(t.backgroundImage, "gradient")
    }
    ,
    C.cssreflections = function() {
        return j("boxReflect")
    }
    ,
    C.csstransforms = function() {
        return !!j("transform")
    }
    ,
    C.csstransforms3d = function() {
        var a = !!j("perspective");
        return a && "webkitPerspective"in q.style && H("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(b) {
            a = 9 === b.offsetLeft && 3 === b.offsetHeight
        }),
        a
    }
    ,
    C.csstransitions = function() {
        return j("transition")
    }
    ,
    C.fontface = function() {
        var a;
        return H('@font-face {font-family:"font";src:url("https://")}', function(c, d) {
            var e = b.getElementById("smodernizr")
              , f = e.sheet || e.styleSheet
              , g = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "";
            a = /src/i.test(g) && 0 === g.indexOf(d.split(" ")[0])
        }),
        a
    }
    ,
    C.generatedcontent = function() {
        var a;
        return H(["#", r, "{font:0/0 a}#", r, ':after{content:"', v, '";visibility:hidden;font:3px/1 a}'].join(""), function(b) {
            a = b.offsetHeight >= 3
        }),
        a
    }
    ,
    C.video = function() {
        var a = b.createElement("video")
          , c = !1;
        try {
            (c = !!a.canPlayType) && (c = new Boolean(c),
            c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""),
            c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""),
            c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
        } catch (d) {}
        return c
    }
    ,
    C.audio = function() {
        var a = b.createElement("audio")
          , c = !1;
        try {
            (c = !!a.canPlayType) && (c = new Boolean(c),
            c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
            c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""),
            c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
            c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, ""))
        } catch (d) {}
        return c
    }
    ,
    C.localstorage = function() {
        try {
            return localStorage.setItem(r, r),
            localStorage.removeItem(r),
            !0
        } catch (a) {
            return !1
        }
    }
    ,
    C.sessionstorage = function() {
        try {
            return sessionStorage.setItem(r, r),
            sessionStorage.removeItem(r),
            !0
        } catch (a) {
            return !1
        }
    }
    ,
    C.webworkers = function() {
        return !!a.Worker
    }
    ,
    C.applicationcache = function() {
        return !!a.applicationCache
    }
    ,
    C.svg = function() {
        return !!b.createElementNS && !!b.createElementNS(B.svg, "svg").createSVGRect
    }
    ,
    C.inlinesvg = function() {
        var a = b.createElement("div");
        return a.innerHTML = "<svg/>",
        (a.firstChild && a.firstChild.namespaceURI) == B.svg
    }
    ,
    C.svgclippaths = function() {
        return !!b.createElementNS && /SVGClipPath/.test(w.call(b.createElementNS(B.svg, "clipPath")))
    }
    ;
    for (var L in C)
        m(C, L) && (l = L.toLowerCase(),
        o[l] = C[L](),
        F.push((o[l] ? "" : "no-") + l));
    return o.input || k(),
    o.addTest = function(a, b) {
        if ("object" == typeof a)
            for (var d in a)
                m(a, d) && o.addTest(d, a[d]);
        else {
            if (a = a.toLowerCase(),
            o[a] !== c)
                return o;
            b = "function" == typeof b ? b() : b,
            "undefined" != typeof p && p && (q.className += " " + (b ? "" : "no-") + a),
            o[a] = b
        }
        return o
    }
    ,
    d(""),
    s = u = null,
    function(a, b) {
        function c(a, b) {
            var c = a.createElement("p")
              , d = a.getElementsByTagName("head")[0] || a.documentElement;
            return c.innerHTML = "x<style>" + b + "</style>",
            d.insertBefore(c.lastChild, d.firstChild)
        }
        function d() {
            var a = s.elements;
            return "string" == typeof a ? a.split(" ") : a
        }
        function e(a) {
            var b = r[a[p]];
            return b || (b = {},
            q++,
            a[p] = q,
            r[q] = b),
            b
        }
        function f(a, c, d) {
            if (c || (c = b),
            k)
                return c.createElement(a);
            d || (d = e(c));
            var f;
            return f = d.cache[a] ? d.cache[a].cloneNode() : o.test(a) ? (d.cache[a] = d.createElem(a)).cloneNode() : d.createElem(a),
            !f.canHaveChildren || n.test(a) || f.tagUrn ? f : d.frag.appendChild(f)
        }
        function g(a, c) {
            if (a || (a = b),
            k)
                return a.createDocumentFragment();
            c = c || e(a);
            for (var f = c.frag.cloneNode(), g = 0, h = d(), i = h.length; i > g; g++)
                f.createElement(h[g]);
            return f
        }
        function h(a, b) {
            b.cache || (b.cache = {},
            b.createElem = a.createElement,
            b.createFrag = a.createDocumentFragment,
            b.frag = b.createFrag()),
            a.createElement = function(c) {
                return s.shivMethods ? f(c, a, b) : b.createElem(c)
            }
            ,
            a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + d().join().replace(/[\w\-]+/g, function(a) {
                return b.createElem(a),
                b.frag.createElement(a),
                'c("' + a + '")'
            }) + ");return n}")(s, b.frag)
        }
        function i(a) {
            a || (a = b);
            var d = e(a);
            return s.shivCSS && !j && !d.hasCSS && (d.hasCSS = !!c(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),
            k || h(a, d),
            a
        }
        var j, k, l = "3.7.0", m = a.html5 || {}, n = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, o = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, p = "_html5shiv", q = 0, r = {};
        !function() {
            try {
                var a = b.createElement("a");
                a.innerHTML = "<xyz></xyz>",
                j = "hidden"in a,
                k = 1 == a.childNodes.length || function() {
                    b.createElement("a");
                    var a = b.createDocumentFragment();
                    return "undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment || "undefined" == typeof a.createElement
                }()
            } catch (c) {
                j = !0,
                k = !0
            }
        }();
        var s = {
            elements: m.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
            version: l,
            shivCSS: m.shivCSS !== !1,
            supportsUnknownElements: k,
            shivMethods: m.shivMethods !== !1,
            type: "default",
            shivDocument: i,
            createElement: f,
            createDocumentFragment: g
        };
        a.html5 = s,
        i(b)
    }(this, b),
    o._version = n,
    o._prefixes = x,
    o._domPrefixes = A,
    o._cssomPrefixes = z,
    o.mq = I,
    o.hasEvent = J,
    o.testProp = function(a) {
        return h([a])
    }
    ,
    o.testAllProps = j,
    o.testStyles = H,
    o.prefixed = function(a, b, c) {
        return b ? j(a, b, c) : j(a, "pfx")
    }
    ,
    q.className = q.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (p ? " js " + F.join(" ") : ""),
    o
}(this, this.document),
function(a, b, c) {
    function d(a) {
        return "[object Function]" == q.call(a)
    }
    function e(a) {
        return "string" == typeof a
    }
    function f() {}
    function g(a) {
        return !a || "loaded" == a || "complete" == a || "uninitialized" == a
    }
    function h() {
        var a = r.shift();
        s = 1,
        a ? a.t ? o(function() {
            ("c" == a.t ? m.injectCss : m.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
        }, 0) : (a(),
        h()) : s = 0
    }
    function i(a, c, d, e, f, i, j) {
        function k(b) {
            if (!n && g(l.readyState) && (t.r = n = 1,
            !s && h(),
            l.onload = l.onreadystatechange = null,
            b)) {
                "img" != a && o(function() {
                    v.removeChild(l)
                }, 50);
                for (var d in A[c])
                    A[c].hasOwnProperty(d) && A[c][d].onload()
            }
        }
        var j = j || m.errorTimeout
          , l = b.createElement(a)
          , n = 0
          , q = 0
          , t = {
            t: d,
            s: c,
            e: f,
            a: i,
            x: j
        };
        1 === A[c] && (q = 1,
        A[c] = []),
        "object" == a ? l.data = c : (l.src = c,
        l.type = a),
        l.width = l.height = "0",
        l.onerror = l.onload = l.onreadystatechange = function() {
            k.call(this, q)
        }
        ,
        r.splice(e, 0, t),
        "img" != a && (q || 2 === A[c] ? (v.insertBefore(l, u ? null : p),
        o(k, j)) : A[c].push(l))
    }
    function j(a, b, c, d, f) {
        return s = 0,
        b = b || "j",
        e(a) ? i("c" == b ? x : w, a, b, this.i++, c, d, f) : (r.splice(this.i++, 0, a),
        1 == r.length && h()),
        this
    }
    function k() {
        var a = m;
        return a.loader = {
            load: j,
            i: 0
        },
        a
    }
    var l, m, n = b.documentElement, o = a.setTimeout, p = b.getElementsByTagName("script")[0], q = {}.toString, r = [], s = 0, t = "MozAppearance"in n.style, u = t && !!b.createRange().compareNode, v = u ? n : p.parentNode, n = a.opera && "[object Opera]" == q.call(a.opera), n = !!b.attachEvent && !n, w = t ? "object" : n ? "script" : "img", x = n ? "script" : w, y = Array.isArray || function(a) {
        return "[object Array]" == q.call(a)
    }
    , z = [], A = {}, B = {
        timeout: function(a, b) {
            return b.length && (a.timeout = b[0]),
            a
        }
    };
    m = function(a) {
        function b(a) {
            var b, c, d, a = a.split("!"), e = z.length, f = a.pop(), g = a.length, f = {
                url: f,
                origUrl: f,
                prefixes: a
            };
            for (c = 0; g > c; c++)
                d = a[c].split("="),
                (b = B[d.shift()]) && (f = b(f, d));
            for (c = 0; e > c; c++)
                f = z[c](f);
            return f
        }
        function g(a, e, f, g, h) {
            var i = b(a)
              , j = i.autoCallback;
            i.url.split(".").pop().split("?").shift(),
            i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]),
            i.instead ? i.instead(a, e, f, g, h) : (A[i.url] ? i.noexec = !0 : A[i.url] = 1,
            f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout),
            (d(e) || d(j)) && f.load(function() {
                k(),
                e && e(i.origUrl, h, g),
                j && j(i.origUrl, h, g),
                A[i.url] = 2
            })))
        }
        function h(a, b) {
            function c(a, c) {
                if (a) {
                    if (e(a))
                        c || (l = function() {
                            var a = [].slice.call(arguments);
                            m.apply(this, a),
                            n()
                        }
                        ),
                        g(a, l, b, 0, j);
                    else if (Object(a) === a)
                        for (i in h = function() {
                            var b, c = 0;
                            for (b in a)
                                a.hasOwnProperty(b) && c++;
                            return c
                        }(),
                        a)
                            a.hasOwnProperty(i) && (!c && !--h && (d(l) ? l = function() {
                                var a = [].slice.call(arguments);
                                m.apply(this, a),
                                n()
                            }
                            : l[i] = function(a) {
                                return function() {
                                    var b = [].slice.call(arguments);
                                    a && a.apply(this, b),
                                    n()
                                }
                            }(m[i])),
                            g(a[i], l, b, i, j))
                } else
                    !c && n()
            }
            var h, i, j = !!a.test, k = a.load || a.both, l = a.callback || f, m = l, n = a.complete || f;
            c(j ? a.yep : a.nope, !!k),
            k && c(k)
        }
        var i, j, l = this.yepnope.loader;
        if (e(a))
            g(a, 0, l, 0);
        else if (y(a))
            for (i = 0; i < a.length; i++)
                j = a[i],
                e(j) ? g(j, 0, l, 0) : y(j) ? m(j) : Object(j) === j && h(j, l);
        else
            Object(a) === a && h(a, l)
    }
    ,
    m.addPrefix = function(a, b) {
        B[a] = b
    }
    ,
    m.addFilter = function(a) {
        z.push(a)
    }
    ,
    m.errorTimeout = 1e4,
    null == b.readyState && b.addEventListener && (b.readyState = "loading",
    b.addEventListener("DOMContentLoaded", l = function() {
        b.removeEventListener("DOMContentLoaded", l, 0),
        b.readyState = "complete"
    }
    , 0)),
    a.yepnope = k(),
    a.yepnope.executeStack = h,
    a.yepnope.injectJs = function(a, c, d, e, i, j) {
        var k, l, n = b.createElement("script"), e = e || m.errorTimeout;
        n.src = a;
        for (l in d)
            n.setAttribute(l, d[l]);
        c = j ? h : c || f,
        n.onreadystatechange = n.onload = function() {
            !k && g(n.readyState) && (k = 1,
            c(),
            n.onload = n.onreadystatechange = null)
        }
        ,
        o(function() {
            k || (k = 1,
            c(1))
        }, e),
        i ? n.onload() : p.parentNode.insertBefore(n, p)
    }
    ,
    a.yepnope.injectCss = function(a, c, d, e, g, i) {
        var j, e = b.createElement("link"), c = i ? h : c || f;
        e.href = a,
        e.rel = "stylesheet",
        e.type = "text/css";
        for (j in d)
            e.setAttribute(j, d[j]);
        g || (p.parentNode.insertBefore(e, p),
        o(c, 0))
    }
}(this, document),
Modernizr.load = function() {
    yepnope.apply(window, [].slice.call(arguments, 0))
}
,
Modernizr.addTest("getusermedia", !!Modernizr.prefixed("getUserMedia", navigator)),
!function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document)
            throw new Error("jQuery requires a window with a document");
        return b(a)
    }
    : b(a)
}("undefined" != typeof window ? window : this, function(a, b) {
    function c(a) {
        var b = "length"in a && a.length
          , c = _.type(a);
        return "function" === c || _.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }
    function d(a, b, c) {
        if (_.isFunction(b))
            return _.grep(a, function(a, d) {
                return !!b.call(a, d, a) !== c
            });
        if (b.nodeType)
            return _.grep(a, function(a) {
                return a === b !== c
            });
        if ("string" == typeof b) {
            if (ha.test(b))
                return _.filter(b, a, c);
            b = _.filter(b, a)
        }
        return _.grep(a, function(a) {
            return U.call(b, a) >= 0 !== c
        })
    }
    function e(a, b) {
        for (; (a = a[b]) && 1 !== a.nodeType; )
            ;
        return a
    }
    function f(a) {
        var b = oa[a] = {};
        return _.each(a.match(na) || [], function(a, c) {
            b[c] = !0
        }),
        b
    }
    function g() {
        Z.removeEventListener("DOMContentLoaded", g, !1),
        a.removeEventListener("load", g, !1),
        _.ready()
    }
    function h() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {}
            }
        }),
        this.expando = _.expando + h.uid++
    }
    function i(a, b, c) {
        var d;
        if (void 0 === c && 1 === a.nodeType)
            if (d = "data-" + b.replace(ua, "-$1").toLowerCase(),
            c = a.getAttribute(d),
            "string" == typeof c) {
                try {
                    c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : ta.test(c) ? _.parseJSON(c) : c
                } catch (e) {}
                sa.set(a, b, c)
            } else
                c = void 0;
        return c
    }
    function j() {
        return !0
    }
    function k() {
        return !1
    }
    function l() {
        try {
            return Z.activeElement
        } catch (a) {}
    }
    function m(a, b) {
        return _.nodeName(a, "table") && _.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }
    function n(a) {
        return a.type = (null !== a.getAttribute("type")) + "/" + a.type,
        a
    }
    function o(a) {
        var b = Ka.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"),
        a
    }
    function p(a, b) {
        for (var c = 0, d = a.length; d > c; c++)
            ra.set(a[c], "globalEval", !b || ra.get(b[c], "globalEval"))
    }
    function q(a, b) {
        var c, d, e, f, g, h, i, j;
        if (1 === b.nodeType) {
            if (ra.hasData(a) && (f = ra.access(a),
            g = ra.set(b, f),
            j = f.events)) {
                delete g.handle,
                g.events = {};
                for (e in j)
                    for (c = 0,
                    d = j[e].length; d > c; c++)
                        _.event.add(b, e, j[e][c])
            }
            sa.hasData(a) && (h = sa.access(a),
            i = _.extend({}, h),
            sa.set(b, i))
        }
    }
    function r(a, b) {
        var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
        return void 0 === b || b && _.nodeName(a, b) ? _.merge([a], c) : c
    }
    function s(a, b) {
        var c = b.nodeName.toLowerCase();
        "input" === c && ya.test(a.type) ? b.checked = a.checked : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
    }
    function t(b, c) {
        var d, e = _(c.createElement(b)).appendTo(c.body), f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : _.css(e[0], "display");
        return e.detach(),
        f
    }
    function u(a) {
        var b = Z
          , c = Oa[a];
        return c || (c = t(a, b),
        "none" !== c && c || (Na = (Na || _("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),
        b = Na[0].contentDocument,
        b.write(),
        b.close(),
        c = t(a, b),
        Na.detach()),
        Oa[a] = c),
        c
    }
    function v(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Ra(a),
        c && (g = c.getPropertyValue(b) || c[b]),
        c && ("" !== g || _.contains(a.ownerDocument, a) || (g = _.style(a, b)),
        Qa.test(g) && Pa.test(b) && (d = h.width,
        e = h.minWidth,
        f = h.maxWidth,
        h.minWidth = h.maxWidth = h.width = g,
        g = c.width,
        h.width = d,
        h.minWidth = e,
        h.maxWidth = f)),
        void 0 !== g ? g + "" : g
    }
    function w(a, b) {
        return {
            get: function() {
                return a() ? void delete this.get : (this.get = b).apply(this, arguments)
            }
        }
    }
    function x(a, b) {
        if (b in a)
            return b;
        for (var c = b[0].toUpperCase() + b.slice(1), d = b, e = Xa.length; e--; )
            if (b = Xa[e] + c,
            b in a)
                return b;
        return d
    }
    function y(a, b, c) {
        var d = Ta.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }
    function z(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2)
            "margin" === c && (g += _.css(a, c + wa[f], !0, e)),
            d ? ("content" === c && (g -= _.css(a, "padding" + wa[f], !0, e)),
            "margin" !== c && (g -= _.css(a, "border" + wa[f] + "Width", !0, e))) : (g += _.css(a, "padding" + wa[f], !0, e),
            "padding" !== c && (g += _.css(a, "border" + wa[f] + "Width", !0, e)));
        return g
    }
    function A(a, b, c) {
        var d = !0
          , e = "width" === b ? a.offsetWidth : a.offsetHeight
          , f = Ra(a)
          , g = "border-box" === _.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = v(a, b, f),
            (0 > e || null == e) && (e = a.style[b]),
            Qa.test(e))
                return e;
            d = g && (Y.boxSizingReliable() || e === a.style[b]),
            e = parseFloat(e) || 0
        }
        return e + z(a, b, c || (g ? "border" : "content"), d, f) + "px"
    }
    function B(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)
            d = a[g],
            d.style && (f[g] = ra.get(d, "olddisplay"),
            c = d.style.display,
            b ? (f[g] || "none" !== c || (d.style.display = ""),
            "" === d.style.display && xa(d) && (f[g] = ra.access(d, "olddisplay", u(d.nodeName)))) : (e = xa(d),
            "none" === c && e || ra.set(d, "olddisplay", e ? c : _.css(d, "display"))));
        for (g = 0; h > g; g++)
            d = a[g],
            d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a
    }
    function C(a, b, c, d, e) {
        return new C.prototype.init(a,b,c,d,e)
    }
    function D() {
        return setTimeout(function() {
            Ya = void 0
        }),
        Ya = _.now()
    }
    function E(a, b) {
        var c, d = 0, e = {
            height: a
        };
        for (b = b ? 1 : 0; 4 > d; d += 2 - b)
            c = wa[d],
            e["margin" + c] = e["padding" + c] = a;
        return b && (e.opacity = e.width = a),
        e
    }
    function F(a, b, c) {
        for (var d, e = (cb[b] || []).concat(cb["*"]), f = 0, g = e.length; g > f; f++)
            if (d = e[f].call(c, b, a))
                return d
    }
    function G(a, b, c) {
        var d, e, f, g, h, i, j, k, l = this, m = {}, n = a.style, o = a.nodeType && xa(a), p = ra.get(a, "fxshow");
        c.queue || (h = _._queueHooks(a, "fx"),
        null == h.unqueued && (h.unqueued = 0,
        i = h.empty.fire,
        h.empty.fire = function() {
            h.unqueued || i()
        }
        ),
        h.unqueued++,
        l.always(function() {
            l.always(function() {
                h.unqueued--,
                _.queue(a, "fx").length || h.empty.fire()
            })
        })),
        1 === a.nodeType && ("height"in b || "width"in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY],
        j = _.css(a, "display"),
        k = "none" === j ? ra.get(a, "olddisplay") || u(a.nodeName) : j,
        "inline" === k && "none" === _.css(a, "float") && (n.display = "inline-block")),
        c.overflow && (n.overflow = "hidden",
        l.always(function() {
            n.overflow = c.overflow[0],
            n.overflowX = c.overflow[1],
            n.overflowY = c.overflow[2]
        }));
        for (d in b)
            if (e = b[d],
            $a.exec(e)) {
                if (delete b[d],
                f = f || "toggle" === e,
                e === (o ? "hide" : "show")) {
                    if ("show" !== e || !p || void 0 === p[d])
                        continue;
                    o = !0
                }
                m[d] = p && p[d] || _.style(a, d)
            } else
                j = void 0;
        if (_.isEmptyObject(m))
            "inline" === ("none" === j ? u(a.nodeName) : j) && (n.display = j);
        else {
            p ? "hidden"in p && (o = p.hidden) : p = ra.access(a, "fxshow", {}),
            f && (p.hidden = !o),
            o ? _(a).show() : l.done(function() {
                _(a).hide()
            }),
            l.done(function() {
                var b;
                ra.remove(a, "fxshow");
                for (b in m)
                    _.style(a, b, m[b])
            });
            for (d in m)
                g = F(o ? p[d] : 0, d, l),
                d in p || (p[d] = g.start,
                o && (g.end = g.start,
                g.start = "width" === d || "height" === d ? 1 : 0))
        }
    }
    function H(a, b) {
        var c, d, e, f, g;
        for (c in a)
            if (d = _.camelCase(c),
            e = b[d],
            f = a[c],
            _.isArray(f) && (e = f[1],
            f = a[c] = f[0]),
            c !== d && (a[d] = f,
            delete a[c]),
            g = _.cssHooks[d],
            g && "expand"in g) {
                f = g.expand(f),
                delete a[d];
                for (c in f)
                    c in a || (a[c] = f[c],
                    b[c] = e)
            } else
                b[d] = e
    }
    function I(a, b, c) {
        var d, e, f = 0, g = bb.length, h = _.Deferred().always(function() {
            delete i.elem
        }), i = function() {
            if (e)
                return !1;
            for (var b = Ya || D(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++)
                j.tweens[g].run(f);
            return h.notifyWith(a, [j, f, c]),
            1 > f && i ? c : (h.resolveWith(a, [j]),
            !1)
        }, j = h.promise({
            elem: a,
            props: _.extend({}, b),
            opts: _.extend(!0, {
                specialEasing: {}
            }, c),
            originalProperties: b,
            originalOptions: c,
            startTime: Ya || D(),
            duration: c.duration,
            tweens: [],
            createTween: function(b, c) {
                var d = _.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(d),
                d
            },
            stop: function(b) {
                var c = 0
                  , d = b ? j.tweens.length : 0;
                if (e)
                    return this;
                for (e = !0; d > c; c++)
                    j.tweens[c].run(1);
                return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]),
                this
            }
        }), k = j.props;
        for (H(k, j.opts.specialEasing); g > f; f++)
            if (d = bb[f].call(j, a, k, j.opts))
                return d;
        return _.map(k, F, j),
        _.isFunction(j.opts.start) && j.opts.start.call(a, j),
        _.fx.timer(_.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })),
        j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }
    function J(a) {
        return function(b, c) {
            "string" != typeof b && (c = b,
            b = "*");
            var d, e = 0, f = b.toLowerCase().match(na) || [];
            if (_.isFunction(c))
                for (; d = f[e++]; )
                    "+" === d[0] ? (d = d.slice(1) || "*",
                    (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }
    function K(a, b, c, d) {
        function e(h) {
            var i;
            return f[h] = !0,
            _.each(a[h] || [], function(a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j),
                e(j),
                !1)
            }),
            i
        }
        var f = {}
          , g = a === tb;
        return e(b.dataTypes[0]) || !f["*"] && e("*")
    }
    function L(a, b) {
        var c, d, e = _.ajaxSettings.flatOptions || {};
        for (c in b)
            void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
        return d && _.extend(!0, a, d),
        a
    }
    function M(a, b, c) {
        for (var d, e, f, g, h = a.contents, i = a.dataTypes; "*" === i[0]; )
            i.shift(),
            void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
        if (d)
            for (e in h)
                if (h[e] && h[e].test(d)) {
                    i.unshift(e);
                    break
                }
        if (i[0]in c)
            f = i[0];
        else {
            for (e in c) {
                if (!i[0] || a.converters[e + " " + i[0]]) {
                    f = e;
                    break
                }
                g || (g = e)
            }
            f = f || g
        }
        return f ? (f !== i[0] && i.unshift(f),
        c[f]) : void 0
    }
    function N(a, b, c, d) {
        var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
        if (k[1])
            for (g in a.converters)
                j[g.toLowerCase()] = a.converters[g];
        for (f = k.shift(); f; )
            if (a.responseFields[f] && (c[a.responseFields[f]] = b),
            !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)),
            i = f,
            f = k.shift())
                if ("*" === f)
                    f = i;
                else if ("*" !== i && i !== f) {
                    if (g = j[i + " " + f] || j["* " + f],
                    !g)
                        for (e in j)
                            if (h = e.split(" "),
                            h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0],
                                k.unshift(h[1]));
                                break
                            }
                    if (g !== !0)
                        if (g && a["throws"])
                            b = g(b);
                        else
                            try {
                                b = g(b)
                            } catch (l) {
                                return {
                                    state: "parsererror",
                                    error: g ? l : "No conversion from " + i + " to " + f
                                }
                            }
                }
        return {
            state: "success",
            data: b
        }
    }
    function O(a, b, c, d) {
        var e;
        if (_.isArray(b))
            _.each(b, function(b, e) {
                c || yb.test(a) ? d(a, e) : O(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
            });
        else if (c || "object" !== _.type(b))
            d(a, b);
        else
            for (e in b)
                O(a + "[" + e + "]", b[e], c, d)
    }
    function P(a) {
        return _.isWindow(a) ? a : 9 === a.nodeType && a.defaultView
    }
    var Q = []
      , R = Q.slice
      , S = Q.concat
      , T = Q.push
      , U = Q.indexOf
      , V = {}
      , W = V.toString
      , X = V.hasOwnProperty
      , Y = {}
      , Z = a.document
      , $ = "2.1.4"
      , _ = function(a, b) {
        return new _.fn.init(a,b)
    }
      , aa = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
      , ba = /^-ms-/
      , ca = /-([\da-z])/gi
      , da = function(a, b) {
        return b.toUpperCase()
    };
    _.fn = _.prototype = {
        jquery: $,
        constructor: _,
        selector: "",
        length: 0,
        toArray: function() {
            return R.call(this)
        },
        get: function(a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : R.call(this)
        },
        pushStack: function(a) {
            var b = _.merge(this.constructor(), a);
            return b.prevObject = this,
            b.context = this.context,
            b
        },
        each: function(a, b) {
            return _.each(this, a, b)
        },
        map: function(a) {
            return this.pushStack(_.map(this, function(b, c) {
                return a.call(b, c, b)
            }))
        },
        slice: function() {
            return this.pushStack(R.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(a) {
            var b = this.length
              , c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: T,
        sort: Q.sort,
        splice: Q.splice
    },
    _.extend = _.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
        for ("boolean" == typeof g && (j = g,
        g = arguments[h] || {},
        h++),
        "object" == typeof g || _.isFunction(g) || (g = {}),
        h === i && (g = this,
        h--); i > h; h++)
            if (null != (a = arguments[h]))
                for (b in a)
                    c = g[b],
                    d = a[b],
                    g !== d && (j && d && (_.isPlainObject(d) || (e = _.isArray(d))) ? (e ? (e = !1,
                    f = c && _.isArray(c) ? c : []) : f = c && _.isPlainObject(c) ? c : {},
                    g[b] = _.extend(j, f, d)) : void 0 !== d && (g[b] = d));
        return g
    }
    ,
    _.extend({
        expando: "jQuery" + ($ + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a)
        },
        noop: function() {},
        isFunction: function(a) {
            return "function" === _.type(a)
        },
        isArray: Array.isArray,
        isWindow: function(a) {
            return null != a && a === a.window
        },
        isNumeric: function(a) {
            return !_.isArray(a) && a - parseFloat(a) + 1 >= 0
        },
        isPlainObject: function(a) {
            return "object" !== _.type(a) || a.nodeType || _.isWindow(a) ? !1 : a.constructor && !X.call(a.constructor.prototype, "isPrototypeOf") ? !1 : !0
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a)
                return !1;
            return !0
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? V[W.call(a)] || "object" : typeof a
        },
        globalEval: function(a) {
            var b, c = eval;
            a = _.trim(a),
            a && (1 === a.indexOf("use strict") ? (b = Z.createElement("script"),
            b.text = a,
            Z.head.appendChild(b).parentNode.removeChild(b)) : c(a))
        },
        camelCase: function(a) {
            return a.replace(ba, "ms-").replace(ca, da)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function(a, b, d) {
            var e, f = 0, g = a.length, h = c(a);
            if (d) {
                if (h)
                    for (; g > f && (e = b.apply(a[f], d),
                    e !== !1); f++)
                        ;
                else
                    for (f in a)
                        if (e = b.apply(a[f], d),
                        e === !1)
                            break
            } else if (h)
                for (; g > f && (e = b.call(a[f], f, a[f]),
                e !== !1); f++)
                    ;
            else
                for (f in a)
                    if (e = b.call(a[f], f, a[f]),
                    e === !1)
                        break;
            return a
        },
        trim: function(a) {
            return null == a ? "" : (a + "").replace(aa, "")
        },
        makeArray: function(a, b) {
            var d = b || [];
            return null != a && (c(Object(a)) ? _.merge(d, "string" == typeof a ? [a] : a) : T.call(d, a)),
            d
        },
        inArray: function(a, b, c) {
            return null == b ? -1 : U.call(b, a, c)
        },
        merge: function(a, b) {
            for (var c = +b.length, d = 0, e = a.length; c > d; d++)
                a[e++] = b[d];
            return a.length = e,
            a
        },
        grep: function(a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++)
                d = !b(a[f], f),
                d !== h && e.push(a[f]);
            return e
        },
        map: function(a, b, d) {
            var e, f = 0, g = a.length, h = c(a), i = [];
            if (h)
                for (; g > f; f++)
                    e = b(a[f], f, d),
                    null != e && i.push(e);
            else
                for (f in a)
                    e = b(a[f], f, d),
                    null != e && i.push(e);
            return S.apply([], i)
        },
        guid: 1,
        proxy: function(a, b) {
            var c, d, e;
            return "string" == typeof b && (c = a[b],
            b = a,
            a = c),
            _.isFunction(a) ? (d = R.call(arguments, 2),
            e = function() {
                return a.apply(b || this, d.concat(R.call(arguments)))
            }
            ,
            e.guid = a.guid = a.guid || _.guid++,
            e) : void 0
        },
        now: Date.now,
        support: Y
    }),
    _.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        V["[object " + b + "]"] = b.toLowerCase();

    });
    var ea = function(a) {
        function b(a, b, c, d) {
            var e, f, g, h, i, j, l, n, o, p;
            if ((b ? b.ownerDocument || b : O) !== G && F(b),
            b = b || G,
            c = c || [],
            h = b.nodeType,
            "string" != typeof a || !a || 1 !== h && 9 !== h && 11 !== h)
                return c;
            if (!d && I) {
                if (11 !== h && (e = sa.exec(a)))
                    if (g = e[1]) {
                        if (9 === h) {
                            if (f = b.getElementById(g),
                            !f || !f.parentNode)
                                return c;
                            if (f.id === g)
                                return c.push(f),
                                c
                        } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g)
                            return c.push(f),
                            c
                    } else {
                        if (e[2])
                            return $.apply(c, b.getElementsByTagName(a)),
                            c;
                        if ((g = e[3]) && v.getElementsByClassName)
                            return $.apply(c, b.getElementsByClassName(g)),
                            c
                    }
                if (v.qsa && (!J || !J.test(a))) {
                    if (n = l = N,
                    o = b,
                    p = 1 !== h && a,
                    1 === h && "object" !== b.nodeName.toLowerCase()) {
                        for (j = z(a),
                        (l = b.getAttribute("id")) ? n = l.replace(ua, "\\$&") : b.setAttribute("id", n),
                        n = "[id='" + n + "'] ",
                        i = j.length; i--; )
                            j[i] = n + m(j[i]);
                        o = ta.test(a) && k(b.parentNode) || b,
                        p = j.join(",")
                    }
                    if (p)
                        try {
                            return $.apply(c, o.querySelectorAll(p)),
                            c
                        } catch (q) {} finally {
                            l || b.removeAttribute("id")
                        }
                }
            }
            return B(a.replace(ia, "$1"), b, c, d)
        }
        function c() {
            function a(c, d) {
                return b.push(c + " ") > w.cacheLength && delete a[b.shift()],
                a[c + " "] = d
            }
            var b = [];
            return a
        }
        function d(a) {
            return a[N] = !0,
            a
        }
        function e(a) {
            var b = G.createElement("div");
            try {
                return !!a(b)
            } catch (c) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b),
                b = null
            }
        }
        function f(a, b) {
            for (var c = a.split("|"), d = a.length; d--; )
                w.attrHandle[c[d]] = b
        }
        function g(a, b) {
            var c = b && a
              , d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || V) - (~a.sourceIndex || V);
            if (d)
                return d;
            if (c)
                for (; c = c.nextSibling; )
                    if (c === b)
                        return -1;
            return a ? 1 : -1
        }
        function h(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }
        function i(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }
        function j(a) {
            return d(function(b) {
                return b = +b,
                d(function(c, d) {
                    for (var e, f = a([], c.length, b), g = f.length; g--; )
                        c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }
        function k(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a
        }
        function l() {}
        function m(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++)
                d += a[b].value;
            return d
        }
        function n(a, b, c) {
            var d = b.dir
              , e = c && "parentNode" === d
              , f = Q++;
            return b.first ? function(b, c, f) {
                for (; b = b[d]; )
                    if (1 === b.nodeType || e)
                        return a(b, c, f)
            }
            : function(b, c, g) {
                var h, i, j = [P, f];
                if (g) {
                    for (; b = b[d]; )
                        if ((1 === b.nodeType || e) && a(b, c, g))
                            return !0
                } else
                    for (; b = b[d]; )
                        if (1 === b.nodeType || e) {
                            if (i = b[N] || (b[N] = {}),
                            (h = i[d]) && h[0] === P && h[1] === f)
                                return j[2] = h[2];
                            if (i[d] = j,
                            j[2] = a(b, c, g))
                                return !0
                        }
            }
        }
        function o(a) {
            return a.length > 1 ? function(b, c, d) {
                for (var e = a.length; e--; )
                    if (!a[e](b, c, d))
                        return !1;
                return !0
            }
            : a[0]
        }
        function p(a, c, d) {
            for (var e = 0, f = c.length; f > e; e++)
                b(a, c[e], d);
            return d
        }
        function q(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)
                (f = a[h]) && (!c || c(f, d, e)) && (g.push(f),
                j && b.push(h));
            return g
        }
        function r(a, b, c, e, f, g) {
            return e && !e[N] && (e = r(e)),
            f && !f[N] && (f = r(f, g)),
            d(function(d, g, h, i) {
                var j, k, l, m = [], n = [], o = g.length, r = d || p(b || "*", h.nodeType ? [h] : h, []), s = !a || !d && b ? r : q(r, m, a, h, i), t = c ? f || (d ? a : o || e) ? [] : g : s;
                if (c && c(s, t, h, i),
                e)
                    for (j = q(t, n),
                    e(j, [], h, i),
                    k = j.length; k--; )
                        (l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                if (d) {
                    if (f || a) {
                        if (f) {
                            for (j = [],
                            k = t.length; k--; )
                                (l = t[k]) && j.push(s[k] = l);
                            f(null, t = [], j, i)
                        }
                        for (k = t.length; k--; )
                            (l = t[k]) && (j = f ? aa(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
                    }
                } else
                    t = q(t === g ? t.splice(o, t.length) : t),
                    f ? f(null, g, t, i) : $.apply(g, t)
            })
        }
        function s(a) {
            for (var b, c, d, e = a.length, f = w.relative[a[0].type], g = f || w.relative[" "], h = f ? 1 : 0, i = n(function(a) {
                return a === b
            }, g, !0), j = n(function(a) {
                return aa(b, a) > -1
            }, g, !0), k = [function(a, c, d) {
                var e = !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
                return b = null,
                e
            }
            ]; e > h; h++)
                if (c = w.relative[a[h].type])
                    k = [n(o(k), c)];
                else {
                    if (c = w.filter[a[h].type].apply(null, a[h].matches),
                    c[N]) {
                        for (d = ++h; e > d && !w.relative[a[d].type]; d++)
                            ;
                        return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({
                            value: " " === a[h - 2].type ? "*" : ""
                        })).replace(ia, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && m(a))
                    }
                    k.push(c)
                }
            return o(k)
        }
        function t(a, c) {
            var e = c.length > 0
              , f = a.length > 0
              , g = function(d, g, h, i, j) {
                var k, l, m, n = 0, o = "0", p = d && [], r = [], s = C, t = d || f && w.find.TAG("*", j), u = P += null == s ? 1 : Math.random() || .1, v = t.length;
                for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) {
                    if (f && k) {
                        for (l = 0; m = a[l++]; )
                            if (m(k, g, h)) {
                                i.push(k);
                                break
                            }
                        j && (P = u)
                    }
                    e && ((k = !m && k) && n--,
                    d && p.push(k))
                }
                if (n += o,
                e && o !== n) {
                    for (l = 0; m = c[l++]; )
                        m(p, r, g, h);
                    if (d) {
                        if (n > 0)
                            for (; o--; )
                                p[o] || r[o] || (r[o] = Y.call(i));
                        r = q(r)
                    }
                    $.apply(i, r),
                    j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
                }
                return j && (P = u,
                C = s),
                p
            };
            return e ? d(g) : g
        }
        var u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + 1 * new Date, O = a.document, P = 0, Q = 0, R = c(), S = c(), T = c(), U = function(a, b) {
            return a === b && (E = !0),
            0
        }, V = 1 << 31, W = {}.hasOwnProperty, X = [], Y = X.pop, Z = X.push, $ = X.push, _ = X.slice, aa = function(a, b) {
            for (var c = 0, d = a.length; d > c; c++)
                if (a[c] === b)
                    return c;
            return -1
        }, ba = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ca = "[\\x20\\t\\r\\n\\f]", da = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ea = da.replace("w", "w#"), fa = "\\[" + ca + "*(" + da + ")(?:" + ca + "*([*^$|!~]?=)" + ca + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ea + "))|)" + ca + "*\\]", ga = ":(" + da + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + fa + ")*)|.*)\\)|)", ha = new RegExp(ca + "+","g"), ia = new RegExp("^" + ca + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ca + "+$","g"), ja = new RegExp("^" + ca + "*," + ca + "*"), ka = new RegExp("^" + ca + "*([>+~]|" + ca + ")" + ca + "*"), la = new RegExp("=" + ca + "*([^\\]'\"]*?)" + ca + "*\\]","g"), ma = new RegExp(ga), na = new RegExp("^" + ea + "$"), oa = {
            ID: new RegExp("^#(" + da + ")"),
            CLASS: new RegExp("^\\.(" + da + ")"),
            TAG: new RegExp("^(" + da.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + fa),
            PSEUDO: new RegExp("^" + ga),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ca + "*(even|odd|(([+-]|)(\\d*)n|)" + ca + "*(?:([+-]|)" + ca + "*(\\d+)|))" + ca + "*\\)|)","i"),
            bool: new RegExp("^(?:" + ba + ")$","i"),
            needsContext: new RegExp("^" + ca + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ca + "*((?:-\\d)?\\d*)" + ca + "*\\)|)(?=[^-]|$)","i")
        }, pa = /^(?:input|select|textarea|button)$/i, qa = /^h\d$/i, ra = /^[^{]+\{\s*\[native \w/, sa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ta = /[+~]/, ua = /'|\\/g, va = new RegExp("\\\\([\\da-f]{1,6}" + ca + "?|(" + ca + ")|.)","ig"), wa = function(a, b, c) {
            var d = "0x" + b - 65536;
            return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
        }, xa = function() {
            F()
        };
        try {
            $.apply(X = _.call(O.childNodes), O.childNodes),
            X[O.childNodes.length].nodeType
        } catch (ya) {
            $ = {
                apply: X.length ? function(a, b) {
                    Z.apply(a, _.call(b))
                }
                : function(a, b) {
                    for (var c = a.length, d = 0; a[c++] = b[d++]; )
                        ;
                    a.length = c - 1
                }
            }
        }
        v = b.support = {},
        y = b.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1
        }
        ,
        F = b.setDocument = function(a) {
            var b, c, d = a ? a.ownerDocument || a : O;
            return d !== G && 9 === d.nodeType && d.documentElement ? (G = d,
            H = d.documentElement,
            c = d.defaultView,
            c && c !== c.top && (c.addEventListener ? c.addEventListener("unload", xa, !1) : c.attachEvent && c.attachEvent("onunload", xa)),
            I = !y(d),
            v.attributes = e(function(a) {
                return a.className = "i",
                !a.getAttribute("className")
            }),
            v.getElementsByTagName = e(function(a) {
                return a.appendChild(d.createComment("")),
                !a.getElementsByTagName("*").length
            }),
            v.getElementsByClassName = ra.test(d.getElementsByClassName),
            v.getById = e(function(a) {
                return H.appendChild(a).id = N,
                !d.getElementsByName || !d.getElementsByName(N).length
            }),
            v.getById ? (w.find.ID = function(a, b) {
                if ("undefined" != typeof b.getElementById && I) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [c] : []
                }
            }
            ,
            w.filter.ID = function(a) {
                var b = a.replace(va, wa);
                return function(a) {
                    return a.getAttribute("id") === b
                }
            }
            ) : (delete w.find.ID,
            w.filter.ID = function(a) {
                var b = a.replace(va, wa);
                return function(a) {
                    var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }
            ),
            w.find.TAG = v.getElementsByTagName ? function(a, b) {
                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : v.qsa ? b.querySelectorAll(a) : void 0
            }
            : function(a, b) {
                var c, d = [], e = 0, f = b.getElementsByTagName(a);
                if ("*" === a) {
                    for (; c = f[e++]; )
                        1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }
            ,
            w.find.CLASS = v.getElementsByClassName && function(a, b) {
                return I ? b.getElementsByClassName(a) : void 0
            }
            ,
            K = [],
            J = [],
            (v.qsa = ra.test(d.querySelectorAll)) && (e(function(a) {
                H.appendChild(a).innerHTML = "<a id='" + N + "'></a><select id='" + N + "-\f]' msallowcapture=''><option selected=''></option></select>",
                a.querySelectorAll("[msallowcapture^='']").length && J.push("[*^$]=" + ca + "*(?:''|\"\")"),
                a.querySelectorAll("[selected]").length || J.push("\\[" + ca + "*(?:value|" + ba + ")"),
                a.querySelectorAll("[id~=" + N + "-]").length || J.push("~="),
                a.querySelectorAll(":checked").length || J.push(":checked"),
                a.querySelectorAll("a#" + N + "+*").length || J.push(".#.+[+~]")
            }),
            e(function(a) {
                var b = d.createElement("input");
                b.setAttribute("type", "hidden"),
                a.appendChild(b).setAttribute("name", "D"),
                a.querySelectorAll("[name=d]").length && J.push("name" + ca + "*[*^$|!~]?="),
                a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"),
                a.querySelectorAll("*,:x"),
                J.push(",.*:")
            })),
            (v.matchesSelector = ra.test(L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function(a) {
                v.disconnectedMatch = L.call(a, "div"),
                L.call(a, "[s!='']:x"),
                K.push("!=", ga)
            }),
            J = J.length && new RegExp(J.join("|")),
            K = K.length && new RegExp(K.join("|")),
            b = ra.test(H.compareDocumentPosition),
            M = b || ra.test(H.contains) ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a
                  , d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            }
            : function(a, b) {
                if (b)
                    for (; b = b.parentNode; )
                        if (b === a)
                            return !0;
                return !1
            }
            ,
            U = b ? function(a, b) {
                if (a === b)
                    return E = !0,
                    0;
                var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return c ? c : (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1,
                1 & c || !v.sortDetached && b.compareDocumentPosition(a) === c ? a === d || a.ownerDocument === O && M(O, a) ? -1 : b === d || b.ownerDocument === O && M(O, b) ? 1 : D ? aa(D, a) - aa(D, b) : 0 : 4 & c ? -1 : 1)
            }
            : function(a, b) {
                if (a === b)
                    return E = !0,
                    0;
                var c, e = 0, f = a.parentNode, h = b.parentNode, i = [a], j = [b];
                if (!f || !h)
                    return a === d ? -1 : b === d ? 1 : f ? -1 : h ? 1 : D ? aa(D, a) - aa(D, b) : 0;
                if (f === h)
                    return g(a, b);
                for (c = a; c = c.parentNode; )
                    i.unshift(c);
                for (c = b; c = c.parentNode; )
                    j.unshift(c);
                for (; i[e] === j[e]; )
                    e++;
                return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0
            }
            ,
            d) : G
        }
        ,
        b.matches = function(a, c) {
            return b(a, null, null, c)
        }
        ,
        b.matchesSelector = function(a, c) {
            if ((a.ownerDocument || a) !== G && F(a),
            c = c.replace(la, "='$1']"),
            !(!v.matchesSelector || !I || K && K.test(c) || J && J.test(c)))
                try {
                    var d = L.call(a, c);
                    if (d || v.disconnectedMatch || a.document && 11 !== a.document.nodeType)
                        return d
                } catch (e) {}
            return b(c, G, null, [a]).length > 0
        }
        ,
        b.contains = function(a, b) {
            return (a.ownerDocument || a) !== G && F(a),
            M(a, b)
        }
        ,
        b.attr = function(a, b) {
            (a.ownerDocument || a) !== G && F(a);
            var c = w.attrHandle[b.toLowerCase()]
              , d = c && W.call(w.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
            return void 0 !== d ? d : v.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }
        ,
        b.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }
        ,
        b.uniqueSort = function(a) {
            var b, c = [], d = 0, e = 0;
            if (E = !v.detectDuplicates,
            D = !v.sortStable && a.slice(0),
            a.sort(U),
            E) {
                for (; b = a[e++]; )
                    b === a[e] && (d = c.push(e));
                for (; d--; )
                    a.splice(c[d], 1)
            }
            return D = null,
            a
        }
        ,
        x = b.getText = function(a) {
            var b, c = "", d = 0, e = a.nodeType;
            if (e) {
                if (1 === e || 9 === e || 11 === e) {
                    if ("string" == typeof a.textContent)
                        return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling)
                        c += x(a)
                } else if (3 === e || 4 === e)
                    return a.nodeValue
            } else
                for (; b = a[d++]; )
                    c += x(b);
            return c
        }
        ,
        w = b.selectors = {
            cacheLength: 50,
            createPseudo: d,
            match: oa,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(va, wa),
                    a[3] = (a[3] || a[4] || a[5] || "").replace(va, wa),
                    "~=" === a[2] && (a[3] = " " + a[3] + " "),
                    a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(),
                    "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]),
                    a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])),
                    a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]),
                    a
                },
                PSEUDO: function(a) {
                    var b, c = !a[6] && a[2];
                    return oa.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && ma.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b),
                    a[2] = c.slice(0, b)),
                    a.slice(0, 3))
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(va, wa).toLowerCase();
                    return "*" === a ? function() {
                        return !0
                    }
                    : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function(a) {
                    var b = R[a + " "];
                    return b || (b = new RegExp("(^|" + ca + ")" + a + "(" + ca + "|$)")) && R(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, c, d) {
                    return function(e) {
                        var f = b.attr(e, a);
                        return null == f ? "!=" === c : c ? (f += "",
                        "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f.replace(ha, " ") + " ").indexOf(d) > -1 : "|=" === c ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0
                    }
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3)
                      , g = "last" !== a.slice(-4)
                      , h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode
                    }
                    : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode, r = h && b.nodeName.toLowerCase(), s = !i && !h;
                        if (q) {
                            if (f) {
                                for (; p; ) {
                                    for (l = b; l = l[p]; )
                                        if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType)
                                            return !1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild : q.lastChild],
                            g && s) {
                                for (k = q[N] || (q[N] = {}),
                                j = k[a] || [],
                                n = j[0] === P && j[1],
                                m = j[0] === P && j[2],
                                l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop(); )
                                    if (1 === l.nodeType && ++m && l === b) {
                                        k[a] = [P, n, m];
                                        break
                                    }
                            } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P)
                                m = j[1];
                            else
                                for (; (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]),
                                l !== b)); )
                                    ;
                            return m -= e,
                            m === d || m % d === 0 && m / d >= 0
                        }
                    }
                },
                PSEUDO: function(a, c) {
                    var e, f = w.pseudos[a] || w.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                    return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c],
                    w.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
                        for (var d, e = f(a, c), g = e.length; g--; )
                            d = aa(a, e[g]),
                            a[d] = !(b[d] = e[g])
                    }) : function(a) {
                        return f(a, 0, e)
                    }
                    ) : f
                }
            },
            pseudos: {
                not: d(function(a) {
                    var b = []
                      , c = []
                      , e = A(a.replace(ia, "$1"));
                    return e[N] ? d(function(a, b, c, d) {
                        for (var f, g = e(a, null, d, []), h = a.length; h--; )
                            (f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function(a, d, f) {
                        return b[0] = a,
                        e(b, null, f, c),
                        b[0] = null,
                        !c.pop()
                    }
                }),
                has: d(function(a) {
                    return function(c) {
                        return b(a, c).length > 0
                    }
                }),
                contains: d(function(a) {
                    return a = a.replace(va, wa),
                    function(b) {
                        return (b.textContent || b.innerText || x(b)).indexOf(a) > -1
                    }
                }),
                lang: d(function(a) {
                    return na.test(a || "") || b.error("unsupported lang: " + a),
                    a = a.replace(va, wa).toLowerCase(),
                    function(b) {
                        var c;
                        do
                            if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))
                                return c = c.toLowerCase(),
                                c === a || 0 === c.indexOf(a + "-");
                        while ((b = b.parentNode) && 1 === b.nodeType);
                        return !1
                    }
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                },
                root: function(a) {
                    return a === H
                },
                focus: function(a) {
                    return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                enabled: function(a) {
                    return a.disabled === !1
                },
                disabled: function(a) {
                    return a.disabled === !0
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex,
                    a.selected === !0
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling)
                        if (a.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(a) {
                    return !w.pseudos.empty(a)
                },
                header: function(a) {
                    return qa.test(a.nodeName)
                },
                input: function(a) {
                    return pa.test(a.nodeName)
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                },
                first: j(function() {
                    return [0]
                }),
                last: j(function(a, b) {
                    return [b - 1]
                }),
                eq: j(function(a, b, c) {
                    return [0 > c ? c + b : c]
                }),
                even: j(function(a, b) {
                    for (var c = 0; b > c; c += 2)
                        a.push(c);
                    return a
                }),
                odd: j(function(a, b) {
                    for (var c = 1; b > c; c += 2)
                        a.push(c);
                    return a
                }),
                lt: j(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0; )
                        a.push(d);
                    return a
                }),
                gt: j(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b; )
                        a.push(d);
                    return a
                })
            }
        },
        w.pseudos.nth = w.pseudos.eq;
        for (u in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            w.pseudos[u] = h(u);
        for (u in {
            submit: !0,
            reset: !0
        })
            w.pseudos[u] = i(u);
        return l.prototype = w.filters = w.pseudos,
        w.setFilters = new l,
        z = b.tokenize = function(a, c) {
            var d, e, f, g, h, i, j, k = S[a + " "];
            if (k)
                return c ? 0 : k.slice(0);
            for (h = a,
            i = [],
            j = w.preFilter; h; ) {
                (!d || (e = ja.exec(h))) && (e && (h = h.slice(e[0].length) || h),
                i.push(f = [])),
                d = !1,
                (e = ka.exec(h)) && (d = e.shift(),
                f.push({
                    value: d,
                    type: e[0].replace(ia, " ")
                }),
                h = h.slice(d.length));
                for (g in w.filter)
                    !(e = oa[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(),
                    f.push({
                        value: d,
                        type: g,
                        matches: e
                    }),
                    h = h.slice(d.length));
                if (!d)
                    break
            }
            return c ? h.length : h ? b.error(a) : S(a, i).slice(0)
        }
        ,
        A = b.compile = function(a, b) {
            var c, d = [], e = [], f = T[a + " "];
            if (!f) {
                for (b || (b = z(a)),
                c = b.length; c--; )
                    f = s(b[c]),
                    f[N] ? d.push(f) : e.push(f);
                f = T(a, t(e, d)),
                f.selector = a
            }
            return f
        }
        ,
        B = b.select = function(a, b, c, d) {
            var e, f, g, h, i, j = "function" == typeof a && a, l = !d && z(a = j.selector || a);
            if (c = c || [],
            1 === l.length) {
                if (f = l[0] = l[0].slice(0),
                f.length > 2 && "ID" === (g = f[0]).type && v.getById && 9 === b.nodeType && I && w.relative[f[1].type]) {
                    if (b = (w.find.ID(g.matches[0].replace(va, wa), b) || [])[0],
                    !b)
                        return c;
                    j && (b = b.parentNode),
                    a = a.slice(f.shift().value.length)
                }
                for (e = oa.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e],
                !w.relative[h = g.type]); )
                    if ((i = w.find[h]) && (d = i(g.matches[0].replace(va, wa), ta.test(f[0].type) && k(b.parentNode) || b))) {
                        if (f.splice(e, 1),
                        a = d.length && m(f),
                        !a)
                            return $.apply(c, d),
                            c;
                        break
                    }
            }
            return (j || A(a, l))(d, b, !I, c, ta.test(a) && k(b.parentNode) || b),
            c
        }
        ,
        v.sortStable = N.split("").sort(U).join("") === N,
        v.detectDuplicates = !!E,
        F(),
        v.sortDetached = e(function(a) {
            return 1 & a.compareDocumentPosition(G.createElement("div"))
        }),
        e(function(a) {
            return a.innerHTML = "<a href='#'></a>",
            "#" === a.firstChild.getAttribute("href")
        }) || f("type|href|height|width", function(a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }),
        v.attributes && e(function(a) {
            return a.innerHTML = "<input/>",
            a.firstChild.setAttribute("value", ""),
            "" === a.firstChild.getAttribute("value")
        }) || f("value", function(a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
        }),
        e(function(a) {
            return null == a.getAttribute("disabled")
        }) || f(ba, function(a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }),
        b
    }(a);
    _.find = ea,
    _.expr = ea.selectors,
    _.expr[":"] = _.expr.pseudos,
    _.unique = ea.uniqueSort,
    _.text = ea.getText,
    _.isXMLDoc = ea.isXML,
    _.contains = ea.contains;
    var fa = _.expr.match.needsContext
      , ga = /^<(\w+)\s*\/?>(?:<\/\1>|)$/
      , ha = /^.[^:#\[\.,]*$/;
    _.filter = function(a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"),
        1 === b.length && 1 === d.nodeType ? _.find.matchesSelector(d, a) ? [d] : [] : _.find.matches(a, _.grep(b, function(a) {
            return 1 === a.nodeType
        }))
    }
    ,
    _.fn.extend({
        find: function(a) {
            var b, c = this.length, d = [], e = this;
            if ("string" != typeof a)
                return this.pushStack(_(a).filter(function() {
                    for (b = 0; c > b; b++)
                        if (_.contains(e[b], this))
                            return !0
                }));
            for (b = 0; c > b; b++)
                _.find(a, e[b], d);
            return d = this.pushStack(c > 1 ? _.unique(d) : d),
            d.selector = this.selector ? this.selector + " " + a : a,
            d
        },
        filter: function(a) {
            return this.pushStack(d(this, a || [], !1))
        },
        not: function(a) {
            return this.pushStack(d(this, a || [], !0))
        },
        is: function(a) {
            return !!d(this, "string" == typeof a && fa.test(a) ? _(a) : a || [], !1).length
        }
    });
    var ia, ja = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ka = _.fn.init = function(a, b) {
        var c, d;
        if (!a)
            return this;
        if ("string" == typeof a) {
            if (c = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : ja.exec(a),
            !c || !c[1] && b)
                return !b || b.jquery ? (b || ia).find(a) : this.constructor(b).find(a);
            if (c[1]) {
                if (b = b instanceof _ ? b[0] : b,
                _.merge(this, _.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : Z, !0)),
                ga.test(c[1]) && _.isPlainObject(b))
                    for (c in b)
                        _.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                return this
            }
            return d = Z.getElementById(c[2]),
            d && d.parentNode && (this.length = 1,
            this[0] = d),
            this.context = Z,
            this.selector = a,
            this
        }
        return a.nodeType ? (this.context = this[0] = a,
        this.length = 1,
        this) : _.isFunction(a) ? "undefined" != typeof ia.ready ? ia.ready(a) : a(_) : (void 0 !== a.selector && (this.selector = a.selector,
        this.context = a.context),
        _.makeArray(a, this))
    }
    ;
    ka.prototype = _.fn,
    ia = _(Z);
    var la = /^(?:parents|prev(?:Until|All))/
      , ma = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    _.extend({
        dir: function(a, b, c) {
            for (var d = [], e = void 0 !== c; (a = a[b]) && 9 !== a.nodeType; )
                if (1 === a.nodeType) {
                    if (e && _(a).is(c))
                        break;
                    d.push(a)
                }
            return d
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling)
                1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    }),
    _.fn.extend({
        has: function(a) {
            var b = _(a, this)
              , c = b.length;
            return this.filter(function() {
                for (var a = 0; c > a; a++)
                    if (_.contains(this, b[a]))
                        return !0
            })
        },
        closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = fa.test(a) || "string" != typeof a ? _(a, b || this.context) : 0; e > d; d++)
                for (c = this[d]; c && c !== b; c = c.parentNode)
                    if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && _.find.matchesSelector(c, a))) {
                        f.push(c);
                        break
                    }
            return this.pushStack(f.length > 1 ? _.unique(f) : f)
        },
        index: function(a) {
            return a ? "string" == typeof a ? U.call(_(a), this[0]) : U.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(a, b) {
            return this.pushStack(_.unique(_.merge(this.get(), _(a, b))))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    }),
    _.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        parents: function(a) {
            return _.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return _.dir(a, "parentNode", c)
        },
        next: function(a) {
            return e(a, "nextSibling")
        },
        prev: function(a) {
            return e(a, "previousSibling")
        },
        nextAll: function(a) {
            return _.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return _.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return _.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return _.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return _.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return _.sibling(a.firstChild)
        },
        contents: function(a) {
            return a.contentDocument || _.merge([], a.childNodes)
        }
    }, function(a, b) {
        _.fn[a] = function(c, d) {
            var e = _.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c),
            d && "string" == typeof d && (e = _.filter(d, e)),
            this.length > 1 && (ma[a] || _.unique(e),
            la.test(a) && e.reverse()),
            this.pushStack(e)
        }
    });
    var na = /\S+/g
      , oa = {};
    _.Callbacks = function(a) {
        a = "string" == typeof a ? oa[a] || f(a) : _.extend({}, a);
        var b, c, d, e, g, h, i = [], j = !a.once && [], k = function(f) {
            for (b = a.memory && f,
            c = !0,
            h = e || 0,
            e = 0,
            g = i.length,
            d = !0; i && g > h; h++)
                if (i[h].apply(f[0], f[1]) === !1 && a.stopOnFalse) {
                    b = !1;
                    break
                }
            d = !1,
            i && (j ? j.length && k(j.shift()) : b ? i = [] : l.disable())
        }, l = {
            add: function() {
                if (i) {
                    var c = i.length;
                    !function f(b) {
                        _.each(b, function(b, c) {
                            var d = _.type(c);
                            "function" === d ? a.unique && l.has(c) || i.push(c) : c && c.length && "string" !== d && f(c)
                        })
                    }(arguments),
                    d ? g = i.length : b && (e = c,
                    k(b))
                }
                return this
            },
            remove: function() {
                return i && _.each(arguments, function(a, b) {
                    for (var c; (c = _.inArray(b, i, c)) > -1; )
                        i.splice(c, 1),
                        d && (g >= c && g--,
                        h >= c && h--)
                }),
                this
            },
            has: function(a) {
                return a ? _.inArray(a, i) > -1 : !(!i || !i.length)
            },
            empty: function() {
                return i = [],
                g = 0,
                this
            },
            disable: function() {
                return i = j = b = void 0,
                this
            },
            disabled: function() {
                return !i
            },
            lock: function() {
                return j = void 0,
                b || l.disable(),
                this
            },
            locked: function() {
                return !j
            },
            fireWith: function(a, b) {
                return !i || c && !j || (b = b || [],
                b = [a, b.slice ? b.slice() : b],
                d ? j.push(b) : k(b)),
                this
            },
            fire: function() {
                return l.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!c
            }
        };
        return l
    }
    ,
    _.extend({
        Deferred: function(a) {
            var b = [["resolve", "done", _.Callbacks("once memory"), "resolved"], ["reject", "fail", _.Callbacks("once memory"), "rejected"], ["notify", "progress", _.Callbacks("memory")]]
              , c = "pending"
              , d = {
                state: function() {
                    return c
                },
                always: function() {
                    return e.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var a = arguments;
                    return _.Deferred(function(c) {
                        _.each(b, function(b, f) {
                            var g = _.isFunction(a[b]) && a[b];
                            e[f[1]](function() {
                                var a = g && g.apply(this, arguments);
                                a && _.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                            })
                        }),
                        a = null
                    }).promise()
                },
                promise: function(a) {
                    return null != a ? _.extend(a, d) : d
                }
            }
              , e = {};
            return d.pipe = d.then,
            _.each(b, function(a, f) {
                var g = f[2]
                  , h = f[3];
                d[f[1]] = g.add,
                h && g.add(function() {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock),
                e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments),
                    this
                }
                ,
                e[f[0] + "With"] = g.fireWith
            }),
            d.promise(e),
            a && a.call(e, e),
            e
        },
        when: function(a) {
            var b, c, d, e = 0, f = R.call(arguments), g = f.length, h = 1 !== g || a && _.isFunction(a.promise) ? g : 0, i = 1 === h ? a : _.Deferred(), j = function(a, c, d) {
                return function(e) {
                    c[a] = this,
                    d[a] = arguments.length > 1 ? R.call(arguments) : e,
                    d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                }
            };
            if (g > 1)
                for (b = new Array(g),
                c = new Array(g),
                d = new Array(g); g > e; e++)
                    f[e] && _.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
            return h || i.resolveWith(d, f),
            i.promise()
        }
    });
    var pa;
    _.fn.ready = function(a) {
        return _.ready.promise().done(a),
        this
    }
    ,
    _.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? _.readyWait++ : _.ready(!0)
        },
        ready: function(a) {
            (a === !0 ? --_.readyWait : _.isReady) || (_.isReady = !0,
            a !== !0 && --_.readyWait > 0 || (pa.resolveWith(Z, [_]),
            _.fn.triggerHandler && (_(Z).triggerHandler("ready"),
            _(Z).off("ready"))))
        }
    }),
    _.ready.promise = function(b) {
        return pa || (pa = _.Deferred(),
        "complete" === Z.readyState ? setTimeout(_.ready) : (Z.addEventListener("DOMContentLoaded", g, !1),
        a.addEventListener("load", g, !1))),
        pa.promise(b)
    }
    ,
    _.ready.promise();
    var qa = _.access = function(a, b, c, d, e, f, g) {
        var h = 0
          , i = a.length
          , j = null == c;
        if ("object" === _.type(c)) {
            e = !0;
            for (h in c)
                _.access(a, b, h, c[h], !0, f, g)
        } else if (void 0 !== d && (e = !0,
        _.isFunction(d) || (g = !0),
        j && (g ? (b.call(a, d),
        b = null) : (j = b,
        b = function(a, b, c) {
            return j.call(_(a), c)
        }
        )),
        b))
            for (; i > h; h++)
                b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
    }
    ;
    _.acceptData = function(a) {
        return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
    }
    ,
    h.uid = 1,
    h.accepts = _.acceptData,
    h.prototype = {
        key: function(a) {
            if (!h.accepts(a))
                return 0;
            var b = {}
              , c = a[this.expando];
            if (!c) {
                c = h.uid++;
                try {
                    b[this.expando] = {
                        value: c
                    },
                    Object.defineProperties(a, b)
                } catch (d) {
                    b[this.expando] = c,
                    _.extend(a, b)
                }
            }
            return this.cache[c] || (this.cache[c] = {}),
            c
        },
        set: function(a, b, c) {
            var d, e = this.key(a), f = this.cache[e];
            if ("string" == typeof b)
                f[b] = c;
            else if (_.isEmptyObject(f))
                _.extend(this.cache[e], b);
            else
                for (d in b)
                    f[d] = b[d];
            return f
        },
        get: function(a, b) {
            var c = this.cache[this.key(a)];
            return void 0 === b ? c : c[b]
        },
        access: function(a, b, c) {
            var d;
            return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b),
            void 0 !== d ? d : this.get(a, _.camelCase(b))) : (this.set(a, b, c),
            void 0 !== c ? c : b)
        },
        remove: function(a, b) {
            var c, d, e, f = this.key(a), g = this.cache[f];
            if (void 0 === b)
                this.cache[f] = {};
            else {
                _.isArray(b) ? d = b.concat(b.map(_.camelCase)) : (e = _.camelCase(b),
                b in g ? d = [b, e] : (d = e,
                d = d in g ? [d] : d.match(na) || [])),
                c = d.length;
                for (; c--; )
                    delete g[d[c]]
            }
        },
        hasData: function(a) {
            return !_.isEmptyObject(this.cache[a[this.expando]] || {})
        },
        discard: function(a) {
            a[this.expando] && delete this.cache[a[this.expando]]
        }
    };
    var ra = new h
      , sa = new h
      , ta = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , ua = /([A-Z])/g;
    _.extend({
        hasData: function(a) {
            return sa.hasData(a) || ra.hasData(a)
        },
        data: function(a, b, c) {
            return sa.access(a, b, c)
        },
        removeData: function(a, b) {
            sa.remove(a, b)
        },
        _data: function(a, b, c) {
            return ra.access(a, b, c)
        },
        _removeData: function(a, b) {
            ra.remove(a, b)
        }
    }),
    _.fn.extend({
        data: function(a, b) {
            var c, d, e, f = this[0], g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = sa.get(f),
                1 === f.nodeType && !ra.get(f, "hasDataAttrs"))) {
                    for (c = g.length; c--; )
                        g[c] && (d = g[c].name,
                        0 === d.indexOf("data-") && (d = _.camelCase(d.slice(5)),
                        i(f, d, e[d])));
                    ra.set(f, "hasDataAttrs", !0)
                }
                return e
            }
            return "object" == typeof a ? this.each(function() {
                sa.set(this, a)
            }) : qa(this, function(b) {
                var c, d = _.camelCase(a);
                if (f && void 0 === b) {
                    if (c = sa.get(f, a),
                    void 0 !== c)
                        return c;
                    if (c = sa.get(f, d),
                    void 0 !== c)
                        return c;
                    if (c = i(f, d, void 0),
                    void 0 !== c)
                        return c
                } else
                    this.each(function() {
                        var c = sa.get(this, d);
                        sa.set(this, d, b),
                        -1 !== a.indexOf("-") && void 0 !== c && sa.set(this, a, b)
                    })
            }, null, b, arguments.length > 1, null, !0)
        },
        removeData: function(a) {
            return this.each(function() {
                sa.remove(this, a)
            })
        }
    }),
    _.extend({
        queue: function(a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue",
            d = ra.get(a, b),
            c && (!d || _.isArray(c) ? d = ra.access(a, b, _.makeArray(c)) : d.push(c)),
            d || []) : void 0
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = _.queue(a, b)
              , d = c.length
              , e = c.shift()
              , f = _._queueHooks(a, b)
              , g = function() {
                _.dequeue(a, b)
            };
            "inprogress" === e && (e = c.shift(),
            d--),
            e && ("fx" === b && c.unshift("inprogress"),
            delete f.stop,
            e.call(a, g, f)),
            !d && f && f.empty.fire()
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return ra.get(a, c) || ra.access(a, c, {
                empty: _.Callbacks("once memory").add(function() {
                    ra.remove(a, [b + "queue", c])
                })
            })
        }
    }),
    _.fn.extend({
        queue: function(a, b) {
            var c = 2;
            return "string" != typeof a && (b = a,
            a = "fx",
            c--),
            arguments.length < c ? _.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                var c = _.queue(this, a, b);
                _._queueHooks(this, a),
                "fx" === a && "inprogress" !== c[0] && _.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                _.dequeue(this, a)
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, b) {
            var c, d = 1, e = _.Deferred(), f = this, g = this.length, h = function() {
                --d || e.resolveWith(f, [f])
            };
            for ("string" != typeof a && (b = a,
            a = void 0),
            a = a || "fx"; g--; )
                c = ra.get(f[g], a + "queueHooks"),
                c && c.empty && (d++,
                c.empty.add(h));
            return h(),
            e.promise(b)
        }
    });
    var va = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
      , wa = ["Top", "Right", "Bottom", "Left"]
      , xa = function(a, b) {
        return a = b || a,
        "none" === _.css(a, "display") || !_.contains(a.ownerDocument, a)
    }
      , ya = /^(?:checkbox|radio)$/i;
    !function() {
        var a = Z.createDocumentFragment()
          , b = a.appendChild(Z.createElement("div"))
          , c = Z.createElement("input");
        c.setAttribute("type", "radio"),
        c.setAttribute("checked", "checked"),
        c.setAttribute("name", "t"),
        b.appendChild(c),
        Y.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked,
        b.innerHTML = "<textarea>x</textarea>",
        Y.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
    }();
    var za = "undefined";
    Y.focusinBubbles = "onfocusin"in a;
    var Aa = /^key/
      , Ba = /^(?:mouse|pointer|contextmenu)|click/
      , Ca = /^(?:focusinfocus|focusoutblur)$/
      , Da = /^([^.]*)(?:\.(.+)|)$/;
    _.event = {
        global: {},
        add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = ra.get(a);
            if (q)
                for (c.handler && (f = c,
                c = f.handler,
                e = f.selector),
                c.guid || (c.guid = _.guid++),
                (i = q.events) || (i = q.events = {}),
                (g = q.handle) || (g = q.handle = function(b) {
                    return typeof _ !== za && _.event.triggered !== b.type ? _.event.dispatch.apply(a, arguments) : void 0
                }
                ),
                b = (b || "").match(na) || [""],
                j = b.length; j--; )
                    h = Da.exec(b[j]) || [],
                    n = p = h[1],
                    o = (h[2] || "").split(".").sort(),
                    n && (l = _.event.special[n] || {},
                    n = (e ? l.delegateType : l.bindType) || n,
                    l = _.event.special[n] || {},
                    k = _.extend({
                        type: n,
                        origType: p,
                        data: d,
                        handler: c,
                        guid: c.guid,
                        selector: e,
                        needsContext: e && _.expr.match.needsContext.test(e),
                        namespace: o.join(".")
                    }, f),
                    (m = i[n]) || (m = i[n] = [],
                    m.delegateCount = 0,
                    l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g, !1)),
                    l.add && (l.add.call(a, k),
                    k.handler.guid || (k.handler.guid = c.guid)),
                    e ? m.splice(m.delegateCount++, 0, k) : m.push(k),
                    _.event.global[n] = !0)
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = ra.hasData(a) && ra.get(a);
            if (q && (i = q.events)) {
                for (b = (b || "").match(na) || [""],
                j = b.length; j--; )
                    if (h = Da.exec(b[j]) || [],
                    n = p = h[1],
                    o = (h[2] || "").split(".").sort(),
                    n) {
                        for (l = _.event.special[n] || {},
                        n = (d ? l.delegateType : l.bindType) || n,
                        m = i[n] || [],
                        h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        g = f = m.length; f--; )
                            k = m[f],
                            !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1),
                            k.selector && m.delegateCount--,
                            l.remove && l.remove.call(a, k));
                        g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || _.removeEvent(a, n, q.handle),
                        delete i[n])
                    } else
                        for (n in i)
                            _.event.remove(a, n + b[j], c, d, !0);
                _.isEmptyObject(i) && (delete q.handle,
                ra.remove(a, "events"))
            }
        },
        trigger: function(b, c, d, e) {
            var f, g, h, i, j, k, l, m = [d || Z], n = X.call(b, "type") ? b.type : b, o = X.call(b, "namespace") ? b.namespace.split(".") : [];
            if (g = h = d = d || Z,
            3 !== d.nodeType && 8 !== d.nodeType && !Ca.test(n + _.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."),
            n = o.shift(),
            o.sort()),
            j = n.indexOf(":") < 0 && "on" + n,
            b = b[_.expando] ? b : new _.Event(n,"object" == typeof b && b),
            b.isTrigger = e ? 2 : 3,
            b.namespace = o.join("."),
            b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
            b.result = void 0,
            b.target || (b.target = d),
            c = null == c ? [b] : _.makeArray(c, [b]),
            l = _.event.special[n] || {},
            e || !l.trigger || l.trigger.apply(d, c) !== !1)) {
                if (!e && !l.noBubble && !_.isWindow(d)) {
                    for (i = l.delegateType || n,
                    Ca.test(i + n) || (g = g.parentNode); g; g = g.parentNode)
                        m.push(g),
                        h = g;
                    h === (d.ownerDocument || Z) && m.push(h.defaultView || h.parentWindow || a)
                }
                for (f = 0; (g = m[f++]) && !b.isPropagationStopped(); )
                    b.type = f > 1 ? i : l.bindType || n,
                    k = (ra.get(g, "events") || {})[b.type] && ra.get(g, "handle"),
                    k && k.apply(g, c),
                    k = j && g[j],
                    k && k.apply && _.acceptData(g) && (b.result = k.apply(g, c),
                    b.result === !1 && b.preventDefault());
                return b.type = n,
                e || b.isDefaultPrevented() || l._default && l._default.apply(m.pop(), c) !== !1 || !_.acceptData(d) || j && _.isFunction(d[n]) && !_.isWindow(d) && (h = d[j],
                h && (d[j] = null),
                _.event.triggered = n,
                d[n](),
                _.event.triggered = void 0,
                h && (d[j] = h)),
                b.result
            }
        },
        dispatch: function(a) {
            a = _.event.fix(a);
            var b, c, d, e, f, g = [], h = R.call(arguments), i = (ra.get(this, "events") || {})[a.type] || [], j = _.event.special[a.type] || {};
            if (h[0] = a,
            a.delegateTarget = this,
            !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
                for (g = _.event.handlers.call(this, a, i),
                b = 0; (e = g[b++]) && !a.isPropagationStopped(); )
                    for (a.currentTarget = e.elem,
                    c = 0; (f = e.handlers[c++]) && !a.isImmediatePropagationStopped(); )
                        (!a.namespace_re || a.namespace_re.test(f.namespace)) && (a.handleObj = f,
                        a.data = f.data,
                        d = ((_.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, h),
                        void 0 !== d && (a.result = d) === !1 && (a.preventDefault(),
                        a.stopPropagation()));
                return j.postDispatch && j.postDispatch.call(this, a),
                a.result
            }
        },
        handlers: function(a, b) {
            var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
            if (h && i.nodeType && (!a.button || "click" !== a.type))
                for (; i !== this; i = i.parentNode || this)
                    if (i.disabled !== !0 || "click" !== a.type) {
                        for (d = [],
                        c = 0; h > c; c++)
                            f = b[c],
                            e = f.selector + " ",
                            void 0 === d[e] && (d[e] = f.needsContext ? _(e, this).index(i) >= 0 : _.find(e, this, null, [i]).length),
                            d[e] && d.push(f);
                        d.length && g.push({
                            elem: i,
                            handlers: d
                        })
                    }
            return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }),
            g
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode),
                a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var c, d, e, f = b.button;
                return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || Z,
                d = c.documentElement,
                e = c.body,
                a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0),
                a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)),
                a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0),
                a
            }
        },
        fix: function(a) {
            if (a[_.expando])
                return a;
            var b, c, d, e = a.type, f = a, g = this.fixHooks[e];
            for (g || (this.fixHooks[e] = g = Ba.test(e) ? this.mouseHooks : Aa.test(e) ? this.keyHooks : {}),
            d = g.props ? this.props.concat(g.props) : this.props,
            a = new _.Event(f),
            b = d.length; b--; )
                c = d[b],
                a[c] = f[c];
            return a.target || (a.target = Z),
            3 === a.target.nodeType && (a.target = a.target.parentNode),
            g.filter ? g.filter(a, f) : a
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== l() && this.focus ? (this.focus(),
                    !1) : void 0
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === l() && this.blur ? (this.blur(),
                    !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && _.nodeName(this, "input") ? (this.click(),
                    !1) : void 0
                },
                _default: function(a) {
                    return _.nodeName(a.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = _.extend(new _.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? _.event.trigger(e, null, b) : _.event.dispatch.call(b, e),
            e.isDefaultPrevented() && c.preventDefault()
        }
    },
    _.removeEvent = function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    }
    ,
    _.Event = function(a, b) {
        return this instanceof _.Event ? (a && a.type ? (this.originalEvent = a,
        this.type = a.type,
        this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? j : k) : this.type = a,
        b && _.extend(this, b),
        this.timeStamp = a && a.timeStamp || _.now(),
        void (this[_.expando] = !0)) : new _.Event(a,b)
    }
    ,
    _.Event.prototype = {
        isDefaultPrevented: k,
        isPropagationStopped: k,
        isImmediatePropagationStopped: k,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = j,
            a && a.preventDefault && a.preventDefault()
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = j,
            a && a.stopPropagation && a.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = j,
            a && a.stopImmediatePropagation && a.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    _.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(a, b) {
        _.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj;
                return (!e || e !== d && !_.contains(d, e)) && (a.type = f.origType,
                c = f.handler.apply(this, arguments),
                a.type = b),
                c
            }
        }
    }),
    Y.focusinBubbles || _.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = function(a) {
            _.event.simulate(b, a.target, _.event.fix(a), !0)
        };
        _.event.special[b] = {
            setup: function() {
                var d = this.ownerDocument || this
                  , e = ra.access(d, b);
                e || d.addEventListener(a, c, !0),
                ra.access(d, b, (e || 0) + 1)
            },
            teardown: function() {
                var d = this.ownerDocument || this
                  , e = ra.access(d, b) - 1;
                e ? ra.access(d, b, e) : (d.removeEventListener(a, c, !0),
                ra.remove(d, b))
            }
        }
    }),
    _.fn.extend({
        on: function(a, b, c, d, e) {
            var f, g;
            if ("object" == typeof a) {
                "string" != typeof b && (c = c || b,
                b = void 0);
                for (g in a)
                    this.on(g, b, c, a[g], e);
                return this
            }
            if (null == c && null == d ? (d = b,
            c = b = void 0) : null == d && ("string" == typeof b ? (d = c,
            c = void 0) : (d = c,
            c = b,
            b = void 0)),
            d === !1)
                d = k;
            else if (!d)
                return this;
            return 1 === e && (f = d,
            d = function(a) {
                return _().off(a),
                f.apply(this, arguments)
            }
            ,
            d.guid = f.guid || (f.guid = _.guid++)),
            this.each(function() {
                _.event.add(this, a, d, c, b)
            })
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },
        off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj)
                return d = a.handleObj,
                _(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler),
                this;
            if ("object" == typeof a) {
                for (e in a)
                    this.off(e, b, a[e]);
                return this
            }
            return (b === !1 || "function" == typeof b) && (c = b,
            b = void 0),
            c === !1 && (c = k),
            this.each(function() {
                _.event.remove(this, a, c, b)
            })
        },
        trigger: function(a, b) {
            return this.each(function() {
                _.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            return c ? _.event.trigger(a, b, c, !0) : void 0
        }
    });
    var Ea = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
      , Fa = /<([\w:]+)/
      , Ga = /<|&#?\w+;/
      , Ha = /<(?:script|style|link)/i
      , Ia = /checked\s*(?:[^=]|=\s*.checked.)/i
      , Ja = /^$|\/(?:java|ecma)script/i
      , Ka = /^true\/(.*)/
      , La = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
      , Ma = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    Ma.optgroup = Ma.option,
    Ma.tbody = Ma.tfoot = Ma.colgroup = Ma.caption = Ma.thead,
    Ma.th = Ma.td,
    _.extend({
        clone: function(a, b, c) {
            var d, e, f, g, h = a.cloneNode(!0), i = _.contains(a.ownerDocument, a);
            if (!(Y.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || _.isXMLDoc(a)))
                for (g = r(h),
                f = r(a),
                d = 0,
                e = f.length; e > d; d++)
                    s(f[d], g[d]);
            if (b)
                if (c)
                    for (f = f || r(a),
                    g = g || r(h),
                    d = 0,
                    e = f.length; e > d; d++)
                        q(f[d], g[d]);
                else
                    q(a, h);
            return g = r(h, "script"),
            g.length > 0 && p(g, !i && r(a, "script")),
            h
        },
        buildFragment: function(a, b, c, d) {
            for (var e, f, g, h, i, j, k = b.createDocumentFragment(), l = [], m = 0, n = a.length; n > m; m++)
                if (e = a[m],
                e || 0 === e)
                    if ("object" === _.type(e))
                        _.merge(l, e.nodeType ? [e] : e);
                    else if (Ga.test(e)) {
                        for (f = f || k.appendChild(b.createElement("div")),
                        g = (Fa.exec(e) || ["", ""])[1].toLowerCase(),
                        h = Ma[g] || Ma._default,
                        f.innerHTML = h[1] + e.replace(Ea, "<$1></$2>") + h[2],
                        j = h[0]; j--; )
                            f = f.lastChild;
                        _.merge(l, f.childNodes),
                        f = k.firstChild,
                        f.textContent = ""
                    } else
                        l.push(b.createTextNode(e));
            for (k.textContent = "",
            m = 0; e = l[m++]; )
                if ((!d || -1 === _.inArray(e, d)) && (i = _.contains(e.ownerDocument, e),
                f = r(k.appendChild(e), "script"),
                i && p(f),
                c))
                    for (j = 0; e = f[j++]; )
                        Ja.test(e.type || "") && c.push(e);
            return k
        },
        cleanData: function(a) {
            for (var b, c, d, e, f = _.event.special, g = 0; void 0 !== (c = a[g]); g++) {
                if (_.acceptData(c) && (e = c[ra.expando],
                e && (b = ra.cache[e]))) {
                    if (b.events)
                        for (d in b.events)
                            f[d] ? _.event.remove(c, d) : _.removeEvent(c, d, b.handle);
                    ra.cache[e] && delete ra.cache[e]
                }
                delete sa.cache[c[sa.expando]]
            }
        }
    }),
    _.fn.extend({
        text: function(a) {
            return qa(this, function(a) {
                return void 0 === a ? _.text(this) : this.empty().each(function() {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = a)
                })
            }, null, a, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = m(this, a);
                    b.appendChild(a)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = m(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        remove: function(a, b) {
            for (var c, d = a ? _.filter(a, this) : this, e = 0; null != (c = d[e]); e++)
                b || 1 !== c.nodeType || _.cleanData(r(c)),
                c.parentNode && (b && _.contains(c.ownerDocument, c) && p(r(c, "script")),
                c.parentNode.removeChild(c));
            return this
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++)
                1 === a.nodeType && (_.cleanData(r(a, !1)),
                a.textContent = "");
            return this
        },
        clone: function(a, b) {
            return a = null == a ? !1 : a,
            b = null == b ? a : b,
            this.map(function() {
                return _.clone(this, a, b)
            })
        },
        html: function(a) {
            return qa(this, function(a) {
                var b = this[0] || {}
                  , c = 0
                  , d = this.length;
                if (void 0 === a && 1 === b.nodeType)
                    return b.innerHTML;
                if ("string" == typeof a && !Ha.test(a) && !Ma[(Fa.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(Ea, "<$1></$2>");
                    try {
                        for (; d > c; c++)
                            b = this[c] || {},
                            1 === b.nodeType && (_.cleanData(r(b, !1)),
                            b.innerHTML = a);
                        b = 0
                    } catch (e) {}
                }
                b && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function() {
            var a = arguments[0];
            return this.domManip(arguments, function(b) {
                a = this.parentNode,
                _.cleanData(r(this)),
                a && a.replaceChild(b, this)
            }),
            a && (a.length || a.nodeType) ? this : this.remove()
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, b) {
            a = S.apply([], a);
            var c, d, e, f, g, h, i = 0, j = this.length, k = this, l = j - 1, m = a[0], p = _.isFunction(m);
            if (p || j > 1 && "string" == typeof m && !Y.checkClone && Ia.test(m))
                return this.each(function(c) {
                    var d = k.eq(c);
                    p && (a[0] = m.call(this, c, d.html())),
                    d.domManip(a, b)
                });
            if (j && (c = _.buildFragment(a, this[0].ownerDocument, !1, this),
            d = c.firstChild,
            1 === c.childNodes.length && (c = d),
            d)) {
                for (e = _.map(r(c, "script"), n),
                f = e.length; j > i; i++)
                    g = c,
                    i !== l && (g = _.clone(g, !0, !0),
                    f && _.merge(e, r(g, "script"))),
                    b.call(this[i], g, i);
                if (f)
                    for (h = e[e.length - 1].ownerDocument,
                    _.map(e, o),
                    i = 0; f > i; i++)
                        g = e[i],
                        Ja.test(g.type || "") && !ra.access(g, "globalEval") && _.contains(h, g) && (g.src ? _._evalUrl && _._evalUrl(g.src) : _.globalEval(g.textContent.replace(La, "")))
            }
            return this
        }
    }),
    _.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        _.fn[a] = function(a) {
            for (var c, d = [], e = _(a), f = e.length - 1, g = 0; f >= g; g++)
                c = g === f ? this : this.clone(!0),
                _(e[g])[b](c),
                T.apply(d, c.get());
            return this.pushStack(d)
        }
    });
    var Na, Oa = {}, Pa = /^margin/, Qa = new RegExp("^(" + va + ")(?!px)[a-z%]+$","i"), Ra = function(b) {
        return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null)
    };
    !function() {
        function b() {
            g.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",
            g.innerHTML = "",
            e.appendChild(f);
            var b = a.getComputedStyle(g, null);
            c = "1%" !== b.top,
            d = "4px" === b.width,
            e.removeChild(f)
        }
        var c, d, e = Z.documentElement, f = Z.createElement("div"), g = Z.createElement("div");
        g.style && (g.style.backgroundClip = "content-box",
        g.cloneNode(!0).style.backgroundClip = "",
        Y.clearCloneStyle = "content-box" === g.style.backgroundClip,
        f.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",
        f.appendChild(g),
        a.getComputedStyle && _.extend(Y, {
            pixelPosition: function() {
                return b(),
                c
            },
            boxSizingReliable: function() {
                return null == d && b(),
                d
            },
            reliableMarginRight: function() {
                var b, c = g.appendChild(Z.createElement("div"));
                return c.style.cssText = g.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
                c.style.marginRight = c.style.width = "0",
                g.style.width = "1px",
                e.appendChild(f),
                b = !parseFloat(a.getComputedStyle(c, null).marginRight),
                e.removeChild(f),
                g.removeChild(c),
                b
            }
        }))
    }(),
    _.swap = function(a, b, c, d) {
        var e, f, g = {};
        for (f in b)
            g[f] = a.style[f],
            a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b)
            a.style[f] = g[f];
        return e
    }
    ;
    var Sa = /^(none|table(?!-c[ea]).+)/
      , Ta = new RegExp("^(" + va + ")(.*)$","i")
      , Ua = new RegExp("^([+-])=(" + va + ")","i")
      , Va = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , Wa = {
        letterSpacing: "0",
        fontWeight: "400"
    }
      , Xa = ["Webkit", "O", "Moz", "ms"];
    _.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = v(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = _.camelCase(b), i = a.style;
                return b = _.cssProps[h] || (_.cssProps[h] = x(i, h)),
                g = _.cssHooks[b] || _.cssHooks[h],
                void 0 === c ? g && "get"in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c,
                "string" === f && (e = Ua.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(_.css(a, b)),
                f = "number"),
                void (null != c && c === c && ("number" !== f || _.cssNumber[h] || (c += "px"),
                Y.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"),
                g && "set"in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c))))
            }
        },
        css: function(a, b, c, d) {
            var e, f, g, h = _.camelCase(b);
            return b = _.cssProps[h] || (_.cssProps[h] = x(a.style, h)),
            g = _.cssHooks[b] || _.cssHooks[h],
            g && "get"in g && (e = g.get(a, !0, c)),
            void 0 === e && (e = v(a, b, d)),
            "normal" === e && b in Wa && (e = Wa[b]),
            "" === c || c ? (f = parseFloat(e),
            c === !0 || _.isNumeric(f) ? f || 0 : e) : e
        }
    }),
    _.each(["height", "width"], function(a, b) {
        _.cssHooks[b] = {
            get: function(a, c, d) {
                return c ? Sa.test(_.css(a, "display")) && 0 === a.offsetWidth ? _.swap(a, Va, function() {
                    return A(a, b, d)
                }) : A(a, b, d) : void 0
            },
            set: function(a, c, d) {
                var e = d && Ra(a);
                return y(a, c, d ? z(a, b, d, "border-box" === _.css(a, "boxSizing", !1, e), e) : 0)
            }
        }
    }),
    _.cssHooks.marginRight = w(Y.reliableMarginRight, function(a, b) {
        return b ? _.swap(a, {
            display: "inline-block"
        }, v, [a, "marginRight"]) : void 0
    }),
    _.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        _.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++)
                    e[a + wa[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        },
        Pa.test(a) || (_.cssHooks[a + b].set = y)
    }),
    _.fn.extend({
        css: function(a, b) {
            return qa(this, function(a, b, c) {
                var d, e, f = {}, g = 0;
                if (_.isArray(b)) {
                    for (d = Ra(a),
                    e = b.length; e > g; g++)
                        f[b[g]] = _.css(a, b[g], !1, d);
                    return f
                }
                return void 0 !== c ? _.style(a, b, c) : _.css(a, b)
            }, a, b, arguments.length > 1)
        },
        show: function() {
            return B(this, !0)
        },
        hide: function() {
            return B(this)
        },
        toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                xa(this) ? _(this).show() : _(this).hide()
            })
        }
    }),
    _.Tween = C,
    C.prototype = {
        constructor: C,
        init: function(a, b, c, d, e, f) {
            this.elem = a,
            this.prop = c,
            this.easing = e || "swing",
            this.options = b,
            this.start = this.now = this.cur(),
            this.end = d,
            this.unit = f || (_.cssNumber[c] ? "" : "px")
        },
        cur: function() {
            var a = C.propHooks[this.prop];
            return a && a.get ? a.get(this) : C.propHooks._default.get(this)
        },
        run: function(a) {
            var b, c = C.propHooks[this.prop];
            return this.pos = b = this.options.duration ? _.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a,
            this.now = (this.end - this.start) * b + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            c && c.set ? c.set(this) : C.propHooks._default.set(this),
            this
        }
    },
    C.prototype.init.prototype = C.prototype,
    C.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = _.css(a.elem, a.prop, ""),
                b && "auto" !== b ? b : 0) : a.elem[a.prop]
            },
            set: function(a) {
                _.fx.step[a.prop] ? _.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[_.cssProps[a.prop]] || _.cssHooks[a.prop]) ? _.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    },
    C.propHooks.scrollTop = C.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    },
    _.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }
    },
    _.fx = C.prototype.init,
    _.fx.step = {};
    var Ya, Za, $a = /^(?:toggle|show|hide)$/, _a = new RegExp("^(?:([+-])=|)(" + va + ")([a-z%]*)$","i"), ab = /queueHooks$/, bb = [G], cb = {
        "*": [function(a, b) {
            var c = this.createTween(a, b)
              , d = c.cur()
              , e = _a.exec(b)
              , f = e && e[3] || (_.cssNumber[a] ? "" : "px")
              , g = (_.cssNumber[a] || "px" !== f && +d) && _a.exec(_.css(c.elem, a))
              , h = 1
              , i = 20;
            if (g && g[3] !== f) {
                f = f || g[3],
                e = e || [],
                g = +d || 1;
                do
                    h = h || ".5",
                    g /= h,
                    _.style(c.elem, a, g + f);
                while (h !== (h = c.cur() / d) && 1 !== h && --i)
            }
            return e && (g = c.start = +g || +d || 0,
            c.unit = f,
            c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]),
            c
        }
        ]
    };
    _.Animation = _.extend(I, {
        tweener: function(a, b) {
            _.isFunction(a) ? (b = a,
            a = ["*"]) : a = a.split(" ");
            for (var c, d = 0, e = a.length; e > d; d++)
                c = a[d],
                cb[c] = cb[c] || [],
                cb[c].unshift(b)
        },
        prefilter: function(a, b) {
            b ? bb.unshift(a) : bb.push(a)
        }
    }),
    _.speed = function(a, b, c) {
        var d = a && "object" == typeof a ? _.extend({}, a) : {
            complete: c || !c && b || _.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !_.isFunction(b) && b
        };
        return d.duration = _.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in _.fx.speeds ? _.fx.speeds[d.duration] : _.fx.speeds._default,
        (null == d.queue || d.queue === !0) && (d.queue = "fx"),
        d.old = d.complete,
        d.complete = function() {
            _.isFunction(d.old) && d.old.call(this),
            d.queue && _.dequeue(this, d.queue)
        }
        ,
        d
    }
    ,
    _.fn.extend({
        fadeTo: function(a, b, c, d) {
            return this.filter(xa).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d)
        },
        animate: function(a, b, c, d) {
            var e = _.isEmptyObject(a)
              , f = _.speed(b, c, d)
              , g = function() {
                var b = I(this, _.extend({}, a), f);
                (e || ra.get(this, "finish")) && b.stop(!0)
            };
            return g.finish = g,
            e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        },
        stop: function(a, b, c) {
            var d = function(a) {
                var b = a.stop;
                delete a.stop,
                b(c)
            };
            return "string" != typeof a && (c = b,
            b = a,
            a = void 0),
            b && a !== !1 && this.queue(a || "fx", []),
            this.each(function() {
                var b = !0
                  , e = null != a && a + "queueHooks"
                  , f = _.timers
                  , g = ra.get(this);
                if (e)
                    g[e] && g[e].stop && d(g[e]);
                else
                    for (e in g)
                        g[e] && g[e].stop && ab.test(e) && d(g[e]);
                for (e = f.length; e--; )
                    f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c),
                    b = !1,
                    f.splice(e, 1));
                (b || !c) && _.dequeue(this, a)
            })
        },
        finish: function(a) {
            return a !== !1 && (a = a || "fx"),
            this.each(function() {
                var b, c = ra.get(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = _.timers, g = d ? d.length : 0;
                for (c.finish = !0,
                _.queue(this, a, []),
                e && e.stop && e.stop.call(this, !0),
                b = f.length; b--; )
                    f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0),
                    f.splice(b, 1));
                for (b = 0; g > b; b++)
                    d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish
            })
        }
    }),
    _.each(["toggle", "show", "hide"], function(a, b) {
        var c = _.fn[b];
        _.fn[b] = function(a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(E(b, !0), a, d, e)
        }
    }),
    _.each({
        slideDown: E("show"),
        slideUp: E("hide"),
        slideToggle: E("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        _.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d)
        }
    }),
    _.timers = [],
    _.fx.tick = function() {
        var a, b = 0, c = _.timers;
        for (Ya = _.now(); b < c.length; b++)
            a = c[b],
            a() || c[b] !== a || c.splice(b--, 1);
        c.length || _.fx.stop(),
        Ya = void 0
    }
    ,
    _.fx.timer = function(a) {
        _.timers.push(a),
        a() ? _.fx.start() : _.timers.pop()
    }
    ,
    _.fx.interval = 13,
    _.fx.start = function() {
        Za || (Za = setInterval(_.fx.tick, _.fx.interval))
    }
    ,
    _.fx.stop = function() {
        clearInterval(Za),
        Za = null
    }
    ,
    _.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    _.fn.delay = function(a, b) {
        return a = _.fx ? _.fx.speeds[a] || a : a,
        b = b || "fx",
        this.queue(b, function(b, c) {
            var d = setTimeout(b, a);
            c.stop = function() {
                clearTimeout(d)
            }
        })
    }
    ,
    function() {
        var a = Z.createElement("input")
          , b = Z.createElement("select")
          , c = b.appendChild(Z.createElement("option"));
        a.type = "checkbox",
        Y.checkOn = "" !== a.value,
        Y.optSelected = c.selected,
        b.disabled = !0,
        Y.optDisabled = !c.disabled,
        a = Z.createElement("input"),
        a.value = "t",
        a.type = "radio",
        Y.radioValue = "t" === a.value
    }();
    var db, eb, fb = _.expr.attrHandle;
    _.fn.extend({
        attr: function(a, b) {
            return qa(this, _.attr, a, b, arguments.length > 1)
        },
        removeAttr: function(a) {
            return this.each(function() {
                _.removeAttr(this, a)
            })
        }
    }),
    _.extend({
        attr: function(a, b, c) {
            var d, e, f = a.nodeType;
            return a && 3 !== f && 8 !== f && 2 !== f ? typeof a.getAttribute === za ? _.prop(a, b, c) : (1 === f && _.isXMLDoc(a) || (b = b.toLowerCase(),
            d = _.attrHooks[b] || (_.expr.match.bool.test(b) ? eb : db)),
            void 0 === c ? d && "get"in d && null !== (e = d.get(a, b)) ? e : (e = _.find.attr(a, b),
            null == e ? void 0 : e) : null !== c ? d && "set"in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""),
            c) : void _.removeAttr(a, b)) : void 0
        },
        removeAttr: function(a, b) {
            var c, d, e = 0, f = b && b.match(na);
            if (f && 1 === a.nodeType)
                for (; c = f[e++]; )
                    d = _.propFix[c] || c,
                    _.expr.match.bool.test(c) && (a[d] = !1),
                    a.removeAttribute(c)
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!Y.radioValue && "radio" === b && _.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b),
                        c && (a.value = c),
                        b
                    }
                }
            }
        }
    }),
    eb = {
        set: function(a, b, c) {
            return b === !1 ? _.removeAttr(a, c) : a.setAttribute(c, c),
            c
        }
    },
    _.each(_.expr.match.bool.source.match(/\w+/g), function(a, b) {
        var c = fb[b] || _.find.attr;
        fb[b] = function(a, b, d) {
            var e, f;
            return d || (f = fb[b],
            fb[b] = e,
            e = null != c(a, b, d) ? b.toLowerCase() : null,
            fb[b] = f),
            e
        }
    });
    var gb = /^(?:input|select|textarea|button)$/i;
    _.fn.extend({
        prop: function(a, b) {
            return qa(this, _.prop, a, b, arguments.length > 1)
        },
        removeProp: function(a) {
            return this.each(function() {
                delete this[_.propFix[a] || a]
            })
        }
    }),
    _.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(a, b, c) {
            var d, e, f, g = a.nodeType;
            return a && 3 !== g && 8 !== g && 2 !== g ? (f = 1 !== g || !_.isXMLDoc(a),
            f && (b = _.propFix[b] || b,
            e = _.propHooks[b]),
            void 0 !== c ? e && "set"in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get"in e && null !== (d = e.get(a, b)) ? d : a[b]) : void 0
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    return a.hasAttribute("tabindex") || gb.test(a.nodeName) || a.href ? a.tabIndex : -1
                }
            }
        }
    }),
    Y.optSelected || (_.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && b.parentNode && b.parentNode.selectedIndex,
            null
        }
    }),
    _.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        _.propFix[this.toLowerCase()] = this
    });
    var hb = /[\t\r\n\f]/g;
    _.fn.extend({
        addClass: function(a) {
            var b, c, d, e, f, g, h = "string" == typeof a && a, i = 0, j = this.length;
            if (_.isFunction(a))
                return this.each(function(b) {
                    _(this).addClass(a.call(this, b, this.className))
                });
            if (h)
                for (b = (a || "").match(na) || []; j > i; i++)
                    if (c = this[i],
                    d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(hb, " ") : " ")) {
                        for (f = 0; e = b[f++]; )
                            d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                        g = _.trim(d),
                        c.className !== g && (c.className = g)
                    }
            return this
        },
        removeClass: function(a) {
            var b, c, d, e, f, g, h = 0 === arguments.length || "string" == typeof a && a, i = 0, j = this.length;
            if (_.isFunction(a))
                return this.each(function(b) {
                    _(this).removeClass(a.call(this, b, this.className))
                });
            if (h)
                for (b = (a || "").match(na) || []; j > i; i++)
                    if (c = this[i],
                    d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(hb, " ") : "")) {
                        for (f = 0; e = b[f++]; )
                            for (; d.indexOf(" " + e + " ") >= 0; )
                                d = d.replace(" " + e + " ", " ");
                        g = a ? _.trim(d) : "",
                        c.className !== g && (c.className = g)
                    }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(_.isFunction(a) ? function(c) {
                _(this).toggleClass(a.call(this, c, this.className, b), b)
            }
            : function() {
                if ("string" === c)
                    for (var b, d = 0, e = _(this), f = a.match(na) || []; b = f[d++]; )
                        e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                else
                    (c === za || "boolean" === c) && (this.className && ra.set(this, "__className__", this.className),
                    this.className = this.className || a === !1 ? "" : ra.get(this, "__className__") || "")
            }
            )
        },
        hasClass: function(a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
                if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(hb, " ").indexOf(b) >= 0)
                    return !0;
            return !1
        }
    });
    var ib = /\r/g;
    _.fn.extend({
        val: function(a) {
            var b, c, d, e = this[0];
            return arguments.length ? (d = _.isFunction(a),
            this.each(function(c) {
                var e;
                1 === this.nodeType && (e = d ? a.call(this, c, _(this).val()) : a,
                null == e ? e = "" : "number" == typeof e ? e += "" : _.isArray(e) && (e = _.map(e, function(a) {
                    return null == a ? "" : a + ""
                })),
                b = _.valHooks[this.type] || _.valHooks[this.nodeName.toLowerCase()],
                b && "set"in b && void 0 !== b.set(this, e, "value") || (this.value = e))
            })) : e ? (b = _.valHooks[e.type] || _.valHooks[e.nodeName.toLowerCase()],
            b && "get"in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value,
            "string" == typeof c ? c.replace(ib, "") : null == c ? "" : c)) : void 0
        }
    }),
    _.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = _.find.attr(a, "value");
                    return null != b ? b : _.trim(_.text(a))
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                        if (c = d[i],
                        !(!c.selected && i !== e || (Y.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && _.nodeName(c.parentNode, "optgroup"))) {
                            if (b = _(c).val(),
                            f)
                                return b;
                            g.push(b)
                        }
                    return g
                },
                set: function(a, b) {
                    for (var c, d, e = a.options, f = _.makeArray(b), g = e.length; g--; )
                        d = e[g],
                        (d.selected = _.inArray(d.value, f) >= 0) && (c = !0);
                    return c || (a.selectedIndex = -1),
                    f
                }
            }
        }
    }),
    _.each(["radio", "checkbox"], function() {
        _.valHooks[this] = {
            set: function(a, b) {
                return _.isArray(b) ? a.checked = _.inArray(_(a).val(), b) >= 0 : void 0
            }
        },
        Y.checkOn || (_.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value
        }
        )
    }),
    _.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        _.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }),
    _.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    });
    var jb = _.now()
      , kb = /\?/;
    _.parseJSON = function(a) {
        return JSON.parse(a + "")
    }
    ,
    _.parseXML = function(a) {
        var b, c;
        if (!a || "string" != typeof a)
            return null;
        try {
            c = new DOMParser,
            b = c.parseFromString(a, "text/xml")
        } catch (d) {
            b = void 0
        }
        return (!b || b.getElementsByTagName("parsererror").length) && _.error("Invalid XML: " + a),
        b
    }
    ;
    var lb = /#.*$/
      , mb = /([?&])_=[^&]*/
      , nb = /^(.*?):[ \t]*([^\r\n]*)$/gm
      , ob = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
      , pb = /^(?:GET|HEAD)$/
      , qb = /^\/\//
      , rb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/
      , sb = {}
      , tb = {}
      , ub = "*/".concat("*")
      , vb = a.location.href
      , wb = rb.exec(vb.toLowerCase()) || [];
    _.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: vb,
            type: "GET",
            isLocal: ob.test(wb[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": ub,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": _.parseJSON,
                "text xml": _.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? L(L(a, _.ajaxSettings), b) : L(_.ajaxSettings, a)
        },
        ajaxPrefilter: J(sb),
        ajaxTransport: J(tb),
        ajax: function(a, b) {
            function c(a, b, c, g) {
                var i, k, r, s, u, w = b;
                2 !== t && (t = 2,
                h && clearTimeout(h),
                d = void 0,
                f = g || "",
                v.readyState = a > 0 ? 4 : 0,
                i = a >= 200 && 300 > a || 304 === a,
                c && (s = M(l, v, c)),
                s = N(l, s, v, i),
                i ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"),
                u && (_.lastModified[e] = u),
                u = v.getResponseHeader("etag"),
                u && (_.etag[e] = u)),
                204 === a || "HEAD" === l.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = s.state,
                k = s.data,
                r = s.error,
                i = !r)) : (r = w,
                (a || !w) && (w = "error",
                0 > a && (a = 0))),
                v.status = a,
                v.statusText = (b || w) + "",
                i ? o.resolveWith(m, [k, w, v]) : o.rejectWith(m, [v, w, r]),
                v.statusCode(q),
                q = void 0,
                j && n.trigger(i ? "ajaxSuccess" : "ajaxError", [v, l, i ? k : r]),
                p.fireWith(m, [v, w]),
                j && (n.trigger("ajaxComplete", [v, l]),
                --_.active || _.event.trigger("ajaxStop")))
            }
            "object" == typeof a && (b = a,
            a = void 0),
            b = b || {};
            var d, e, f, g, h, i, j, k, l = _.ajaxSetup({}, b), m = l.context || l, n = l.context && (m.nodeType || m.jquery) ? _(m) : _.event, o = _.Deferred(), p = _.Callbacks("once memory"), q = l.statusCode || {}, r = {}, s = {}, t = 0, u = "canceled", v = {
                readyState: 0,
                getResponseHeader: function(a) {
                    var b;
                    if (2 === t) {
                        if (!g)
                            for (g = {}; b = nb.exec(f); )
                                g[b[1].toLowerCase()] = b[2];
                        b = g[a.toLowerCase()]
                    }
                    return null == b ? null : b
                },
                getAllResponseHeaders: function() {
                    return 2 === t ? f : null
                },
                setRequestHeader: function(a, b) {
                    var c = a.toLowerCase();
                    return t || (a = s[c] = s[c] || a,
                    r[a] = b),
                    this
                },
                overrideMimeType: function(a) {
                    return t || (l.mimeType = a),
                    this
                },
                statusCode: function(a) {
                    var b;
                    if (a)
                        if (2 > t)
                            for (b in a)
                                q[b] = [q[b], a[b]];
                        else
                            v.always(a[v.status]);
                    return this
                },
                abort: function(a) {
                    var b = a || u;
                    return d && d.abort(b),
                    c(0, b),
                    this
                }
            };
            if (o.promise(v).complete = p.add,
            v.success = v.done,
            v.error = v.fail,
            l.url = ((a || l.url || vb) + "").replace(lb, "").replace(qb, wb[1] + "//"),
            l.type = b.method || b.type || l.method || l.type,
            l.dataTypes = _.trim(l.dataType || "*").toLowerCase().match(na) || [""],
            null == l.crossDomain && (i = rb.exec(l.url.toLowerCase()),
            l.crossDomain = !(!i || i[1] === wb[1] && i[2] === wb[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (wb[3] || ("http:" === wb[1] ? "80" : "443")))),
            l.data && l.processData && "string" != typeof l.data && (l.data = _.param(l.data, l.traditional)),
            K(sb, l, b, v),
            2 === t)
                return v;
            j = _.event && l.global,
            j && 0 === _.active++ && _.event.trigger("ajaxStart"),
            l.type = l.type.toUpperCase(),
            l.hasContent = !pb.test(l.type),
            e = l.url,
            l.hasContent || (l.data && (e = l.url += (kb.test(e) ? "&" : "?") + l.data,
            delete l.data),
            l.cache === !1 && (l.url = mb.test(e) ? e.replace(mb, "$1_=" + jb++) : e + (kb.test(e) ? "&" : "?") + "_=" + jb++)),
            l.ifModified && (_.lastModified[e] && v.setRequestHeader("If-Modified-Since", _.lastModified[e]),
            _.etag[e] && v.setRequestHeader("If-None-Match", _.etag[e])),
            (l.data && l.hasContent && l.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", l.contentType),
            v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + ub + "; q=0.01" : "") : l.accepts["*"]);
            for (k in l.headers)
                v.setRequestHeader(k, l.headers[k]);
            if (l.beforeSend && (l.beforeSend.call(m, v, l) === !1 || 2 === t))
                return v.abort();
            u = "abort";
            for (k in {
                success: 1,
                error: 1,
                complete: 1
            })
                v[k](l[k]);
            if (d = K(tb, l, b, v)) {
                v.readyState = 1,
                j && n.trigger("ajaxSend", [v, l]),
                l.async && l.timeout > 0 && (h = setTimeout(function() {
                    v.abort("timeout")
                }, l.timeout));
                try {
                    t = 1,
                    d.send(r, c)
                } catch (w) {
                    if (!(2 > t))
                        throw w;
                    c(-1, w)
                }
            } else
                c(-1, "No Transport");
            return v
        },
        getJSON: function(a, b, c) {
            return _.get(a, b, c, "json")
        },
        getScript: function(a, b) {
            return _.get(a, void 0, b, "script")
        }
    }),
    _.each(["get", "post"], function(a, b) {
        _[b] = function(a, c, d, e) {
            return _.isFunction(c) && (e = e || d,
            d = c,
            c = void 0),
            _.ajax({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            })
        }
    }),
    _._evalUrl = function(a) {
        return _.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }
    ,
    _.fn.extend({
        wrapAll: function(a) {
            var b;
            return _.isFunction(a) ? this.each(function(b) {
                _(this).wrapAll(a.call(this, b))
            }) : (this[0] && (b = _(a, this[0].ownerDocument).eq(0).clone(!0),
            this[0].parentNode && b.insertBefore(this[0]),
            b.map(function() {
                for (var a = this; a.firstElementChild; )
                    a = a.firstElementChild;
                return a
            }).append(this)),
            this)
        },
        wrapInner: function(a) {
            return this.each(_.isFunction(a) ? function(b) {
                _(this).wrapInner(a.call(this, b))
            }
            : function() {
                var b = _(this)
                  , c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            }
            )
        },
        wrap: function(a) {
            var b = _.isFunction(a);
            return this.each(function(c) {
                _(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                _.nodeName(this, "body") || _(this).replaceWith(this.childNodes)
            }).end()
        }
    }),
    _.expr.filters.hidden = function(a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0
    }
    ,
    _.expr.filters.visible = function(a) {
        return !_.expr.filters.hidden(a)
    }
    ;
    var xb = /%20/g
      , yb = /\[\]$/
      , zb = /\r?\n/g
      , Ab = /^(?:submit|button|image|reset|file)$/i
      , Bb = /^(?:input|select|textarea|keygen)/i;
    _.param = function(a, b) {
        var c, d = [], e = function(a, b) {
            b = _.isFunction(b) ? b() : null == b ? "" : b,
            d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        if (void 0 === b && (b = _.ajaxSettings && _.ajaxSettings.traditional),
        _.isArray(a) || a.jquery && !_.isPlainObject(a))
            _.each(a, function() {
                e(this.name, this.value)
            });
        else
            for (c in a)
                O(c, a[c], b, e);
        return d.join("&").replace(xb, "+")
    }
    ,
    _.fn.extend({
        serialize: function() {
            return _.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = _.prop(this, "elements");
                return a ? _.makeArray(a) : this
            }).filter(function() {
                var a = this.type;
                return this.name && !_(this).is(":disabled") && Bb.test(this.nodeName) && !Ab.test(a) && (this.checked || !ya.test(a))
            }).map(function(a, b) {
                var c = _(this).val();
                return null == c ? null : _.isArray(c) ? _.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(zb, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(zb, "\r\n")
                }
            }).get()
        }
    }),
    _.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch (a) {}
    }
    ;
    var Cb = 0
      , Db = {}
      , Eb = {
        0: 200,
        1223: 204
    }
      , Fb = _.ajaxSettings.xhr();
    a.attachEvent && a.attachEvent("onunload", function() {
        for (var a in Db)
            Db[a]()
    }),
    Y.cors = !!Fb && "withCredentials"in Fb,
    Y.ajax = Fb = !!Fb,
    _.ajaxTransport(function(a) {
        var b;
        return Y.cors || Fb && !a.crossDomain ? {
            send: function(c, d) {
                var e, f = a.xhr(), g = ++Cb;
                if (f.open(a.type, a.url, a.async, a.username, a.password),
                a.xhrFields)
                    for (e in a.xhrFields)
                        f[e] = a.xhrFields[e];
                a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType),
                a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                for (e in c)
                    f.setRequestHeader(e, c[e]);
                b = function(a) {
                    return function() {
                        b && (delete Db[g],
                        b = f.onload = f.onerror = null,
                        "abort" === a ? f.abort() : "error" === a ? d(f.status, f.statusText) : d(Eb[f.status] || f.status, f.statusText, "string" == typeof f.responseText ? {
                            text: f.responseText
                        } : void 0, f.getAllResponseHeaders()))
                    }
                }
                ,
                f.onload = b(),
                f.onerror = b("error"),
                b = Db[g] = b("abort");
                try {
                    f.send(a.hasContent && a.data || null)
                } catch (h) {
                    if (b)
                        throw h
                }
            },
            abort: function() {
                b && b()
            }
        } : void 0
    }),
    _.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                return _.globalEval(a),
                a
            }
        }
    }),
    _.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1),
        a.crossDomain && (a.type = "GET")
    }),
    _.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c;
            return {
                send: function(d, e) {
                    b = _("<script>").prop({
                        async: !0,
                        charset: a.scriptCharset,
                        src: a.url
                    }).on("load error", c = function(a) {
                        b.remove(),
                        c = null,
                        a && e("error" === a.type ? 404 : 200, a.type)
                    }
                    ),
                    Z.head.appendChild(b[0])
                },
                abort: function() {
                    c && c()
                }
            }
        }
    });
    var Gb = []
      , Hb = /(=)\?(?=&|$)|\?\?/;
    _.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = Gb.pop() || _.expando + "_" + jb++;
            return this[a] = !0,
            a
        }
    }),
    _.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (Hb.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && Hb.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = _.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
        h ? b[h] = b[h].replace(Hb, "$1" + e) : b.jsonp !== !1 && (b.url += (kb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e),
        b.converters["script json"] = function() {
            return g || _.error(e + " was not called"),
            g[0]
        }
        ,
        b.dataTypes[0] = "json",
        f = a[e],
        a[e] = function() {
            g = arguments
        }
        ,
        d.always(function() {
            a[e] = f,
            b[e] && (b.jsonpCallback = c.jsonpCallback,
            Gb.push(e)),
            g && _.isFunction(f) && f(g[0]),
            g = f = void 0
        }),
        "script") : void 0
    }),
    _.parseHTML = function(a, b, c) {
        if (!a || "string" != typeof a)
            return null;
        "boolean" == typeof b && (c = b,
        b = !1),
        b = b || Z;
        var d = ga.exec(a)
          , e = !c && [];
        return d ? [b.createElement(d[1])] : (d = _.buildFragment([a], b, e),
        e && e.length && _(e).remove(),
        _.merge([], d.childNodes))
    }
    ;
    var Ib = _.fn.load;
    _.fn.load = function(a, b, c) {
        if ("string" != typeof a && Ib)
            return Ib.apply(this, arguments);
        var d, e, f, g = this, h = a.indexOf(" ");
        return h >= 0 && (d = _.trim(a.slice(h)),
        a = a.slice(0, h)),
        _.isFunction(b) ? (c = b,
        b = void 0) : b && "object" == typeof b && (e = "POST"),
        g.length > 0 && _.ajax({
            url: a,
            type: e,
            dataType: "html",
            data: b
        }).done(function(a) {
            f = arguments,
            g.html(d ? _("<div>").append(_.parseHTML(a)).find(d) : a)
        }).complete(c && function(a, b) {
            g.each(c, f || [a.responseText, b, a])
        }
        ),
        this
    }
    ,
    _.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
        _.fn[b] = function(a) {
            return this.on(b, a)
        }
    }),
    _.expr.filters.animated = function(a) {
        return _.grep(_.timers, function(b) {
            return a === b.elem
        }).length
    }
    ;
    var Jb = a.document.documentElement;
    _.offset = {
        setOffset: function(a, b, c) {
            var d, e, f, g, h, i, j, k = _.css(a, "position"), l = _(a), m = {};
            "static" === k && (a.style.position = "relative"),
            h = l.offset(),
            f = _.css(a, "top"),
            i = _.css(a, "left"),
            j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1,
            j ? (d = l.position(),
            g = d.top,
            e = d.left) : (g = parseFloat(f) || 0,
            e = parseFloat(i) || 0),
            _.isFunction(b) && (b = b.call(a, c, h)),
            null != b.top && (m.top = b.top - h.top + g),
            null != b.left && (m.left = b.left - h.left + e),
            "using"in b ? b.using.call(a, m) : l.css(m)
        }
    },
    _.fn.extend({
        offset: function(a) {
            if (arguments.length)
                return void 0 === a ? this : this.each(function(b) {
                    _.offset.setOffset(this, a, b)
                });
            var b, c, d = this[0], e = {
                top: 0,
                left: 0
            }, f = d && d.ownerDocument;
            return f ? (b = f.documentElement,
            _.contains(b, d) ? (typeof d.getBoundingClientRect !== za && (e = d.getBoundingClientRect()),
            c = P(f),
            {
                top: e.top + c.pageYOffset - b.clientTop,
                left: e.left + c.pageXOffset - b.clientLeft
            }) : e) : void 0
        },
        position: function() {
            if (this[0]) {
                var a, b, c = this[0], d = {
                    top: 0,
                    left: 0
                };
                return "fixed" === _.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(),
                b = this.offset(),
                _.nodeName(a[0], "html") || (d = a.offset()),
                d.top += _.css(a[0], "borderTopWidth", !0),
                d.left += _.css(a[0], "borderLeftWidth", !0)),
                {
                    top: b.top - d.top - _.css(c, "marginTop", !0),
                    left: b.left - d.left - _.css(c, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || Jb; a && !_.nodeName(a, "html") && "static" === _.css(a, "position"); )
                    a = a.offsetParent;
                return a || Jb
            })
        }
    }),
    _.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(b, c) {
        var d = "pageYOffset" === c;
        _.fn[b] = function(e) {
            return qa(this, function(b, e, f) {
                var g = P(b);
                return void 0 === f ? g ? g[c] : b[e] : void (g ? g.scrollTo(d ? a.pageXOffset : f, d ? f : a.pageYOffset) : b[e] = f)
            }, b, e, arguments.length, null)
        }
    }),
    _.each(["top", "left"], function(a, b) {
        _.cssHooks[b] = w(Y.pixelPosition, function(a, c) {
            return c ? (c = v(a, b),
            Qa.test(c) ? _(a).position()[b] + "px" : c) : void 0
        })
    }),
    _.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        _.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(c, d) {
            _.fn[d] = function(d, e) {
                var f = arguments.length && (c || "boolean" != typeof d)
                  , g = c || (d === !0 || e === !0 ? "margin" : "border");
                return qa(this, function(b, c, d) {
                    var e;
                    return _.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement,
                    Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? _.css(b, c, g) : _.style(b, c, d, g)
                }, b, f ? d : void 0, f, null)
            }
        })
    }),
    _.fn.size = function() {
        return this.length
    }
    ,
    _.fn.andSelf = _.fn.addBack,
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return _
    });
    var Kb = a.jQuery
      , Lb = a.$;
    return _.noConflict = function(b) {
        return a.$ === _ && (a.$ = Lb),
        b && a.jQuery === _ && (a.jQuery = Kb),
        _
    }
    ,
    typeof b === za && (a.jQuery = a.$ = _),
    _
}),
Segment.prototype = {
    draw: function(a, b, c, d) {
        if (c) {
            var e = d.hasOwnProperty("delay") ? 1e3 * parseFloat(d.delay) : 0
              , f = d.hasOwnProperty("easing") ? d.easing : null
              , g = d.hasOwnProperty("callback") ? d.callback : null
              , h = this;
            if (this.stop(),
            e)
                return delete d.delay,
                this.timer = setTimeout(function() {
                    h.draw(a, b, c, d)
                }, e),
                this.timer;
            var i = new Date
              , j = 1e3 / 60
              , k = this.begin
              , l = this.end
              , m = this.valueOf(a)
              , n = this.valueOf(b);
            !function o() {
                var a = new Date
                  , b = (a - i) / 1e3
                  , d = b / parseFloat(c)
                  , e = d;
                return "function" == typeof f && (e = f(e)),
                d > 1 ? (h.stop(),
                e = 1) : h.timer = setTimeout(o, j),
                h.begin = k + (m - k) * e,
                h.end = l + (n - l) * e,
                h.begin < 0 && (h.begin = 0),
                h.end > h.length && (h.end = h.length),
                h.begin < h.end ? h.draw(h.begin, h.end) : h.draw(h.begin + (h.end - h.begin), h.end - (h.end - h.begin)),
                d > 1 && "function" == typeof g ? g.call(h.context) : void 0
            }()
        } else
            this.path.style.strokeDasharray = this.strokeDasharray(a, b)
    },
    strokeDasharray: function(a, b) {
        return this.begin = this.valueOf(a),
        this.end = this.valueOf(b),
        [this.length, this.length + this.begin, this.end - this.begin].join(" ")
    },
    valueOf: function(a) {
        var b = parseFloat(a);
        if (("string" == typeof a || a instanceof String) && ~a.indexOf("%")) {
            var c;
            ~a.indexOf("+") ? (c = a.split("+"),
            b = this.percent(c[0]) + parseFloat(c[1])) : ~a.indexOf("-") ? (c = a.split("-"),
            b = this.percent(c[0]) - parseFloat(c[1])) : b = this.percent(a)
        }
        return b
    },
    stop: function() {
        clearTimeout(this.timer),
        this.timer = null
    },
    percent: function(a) {
        return parseFloat(a) / 100 * this.length
    }
},
!function(a, b) {
    "object" == typeof exports && "undefined" != typeof module ? b(exports) : "function" == typeof define && define.amd ? define(["exports"], b) : b(a.ease = {})
}(this, function(a) {
    "use strict";
    function b(a, b) {
        return null == a || isNaN(a) ? b : +a
    }
    function c(a, c) {
        a = Math.max(1, b(a, 1)),
        c = b(c, .3) * F;
        var d = c * Math.asin(1 / a);
        return function(b) {
            return a * Math.pow(2, 10 * --b) * Math.sin((d - b) / c)
        }
    }
    function d(a, c) {
        a = Math.max(1, b(a, 1)),
        c = b(c, .3) * F;
        var d = c * Math.asin(1 / a);
        return function(b) {
            return a * Math.pow(2, -10 * b) * Math.sin((b - d) / c) + 1
        }
    }
    function e(a, c) {
        a = Math.max(1, b(a, 1)),
        c = 1.5 * b(c, .3) * F;
        var d = c * Math.asin(1 / a);
        return function(b) {
            return a * ((b = 2 * b - 1) < 0 ? Math.pow(2, 10 * b) * Math.sin((d - b) / c) : Math.pow(2, -10 * b) * Math.sin((b - d) / c) + 2) / 2
        }
    }
    function f(a) {
        return a = b(a, 1.70158),
        function(b) {
            return b * b * ((a + 1) * b - a)
        }
    }
    function g(a) {
        return a = b(a, 1.70158),
        function(b) {
            return --b * b * ((a + 1) * b + a) + 1
        }
    }
    function h(a) {
        return a = 1.525 * b(a, 1.70158),
        function(b) {
            return ((b *= 2) < 1 ? b * b * ((a + 1) * b - a) : (b -= 2) * b * ((a + 1) * b + a) + 2) / 2
        }
    }
    function i(a) {
        return 1 - j(1 - a)
    }
    function j(a) {
        return G > a ? P * a * a : I > a ? P * (a -= H) * a + J : L > a ? P * (a -= K) * a + M : P * (a -= N) * a + O
    }
    function k(a) {
        return ((a *= 2) <= 1 ? 1 - j(1 - a) : j(a - 1) + 1) / 2
    }
    function l(a) {
        return 1 - Math.sqrt(1 - a * a)
    }
    function m(a) {
        return Math.sqrt(1 - --a * a)
    }
    function n(a) {
        return ((a *= 2) <= 1 ? 1 - Math.sqrt(1 - a * a) : Math.sqrt(1 - (a -= 2) * a) + 1) / 2
    }
    function o(a) {
        return Math.pow(2, 10 * a - 10)
    }
    function p(a) {
        return 1 - Math.pow(2, -10 * a)
    }
    function q(a) {
        return ((a *= 2) <= 1 ? Math.pow(2, 10 * a - 10) : 2 - Math.pow(2, 10 - 10 * a)) / 2
    }
    function r(a) {
        return 1 - Math.cos(a * R)
    }
    function s(a) {
        return Math.sin(a * R)
    }
    function t(a) {
        return (1 - Math.cos(Q * a)) / 2
    }
    function u(a) {
        return a * a * a
    }
    function v(a) {
        return --a * a * a + 1
    }
    function w(a) {
        return ((a *= 2) <= 1 ? a * a * a : (a -= 2) * a * a + 2) / 2
    }
    function x(a) {
        return a * a
    }
    function y(a) {
        return a * (2 - a)
    }
    function z(a) {
        return ((a *= 2) <= 1 ? a * a : --a * (2 - a) + 1) / 2
    }
    function A(a) {
        return +a
    }
    function B(a) {
        return a = b(a, 3),
        function(b) {
            return Math.pow(b, a)
        }
    }
    function C(a) {
        return a = b(a, 3),
        function(b) {
            return 1 - Math.pow(1 - b, a)
        }
    }
    function D(a) {
        return a = b(a, 3),
        function(b) {
            return ((b *= 2) <= 1 ? Math.pow(b, a) : 2 - Math.pow(2 - b, a)) / 2
        }
    }
    function E(a, b, c) {
        var d = (a += "").indexOf("-");
        return 0 > d && (a += "-in"),
        arguments.length > 1 && T.hasOwnProperty(a) ? T[a](b, c) : S.hasOwnProperty(a) ? S[a] : A
    }
    var F = 1 / (2 * Math.PI)
      , G = 4 / 11
      , H = 6 / 11
      , I = 8 / 11
      , J = .75
      , K = 9 / 11
      , L = 10 / 11
      , M = .9375
      , N = 21 / 22
      , O = 63 / 64
      , P = 1 / G / G
      , Q = Math.PI
      , R = Q / 2
      , S = {
        "linear-in": A,
        "linear-out": A,
        "linear-in-out": A,
        "quad-in": x,
        "quad-out": y,
        "quad-in-out": z,
        "cubic-in": u,
        "cubic-out": v,
        "cubic-in-out": w,
        "poly-in": u,
        "poly-out": v,
        "poly-in-out": w,
        "sin-in": r,
        "sin-out": s,
        "sin-in-out": t,
        "exp-in": o,
        "exp-out": p,
        "exp-in-out": q,
        "circle-in": l,
        "circle-out": m,
        "circle-in-out": n,
        "bounce-in": i,
        "bounce-out": j,
        "bounce-in-out": k,
        "back-in": f(),
        "back-out": g(),
        "back-in-out": h(),
        "elastic-in": c(),
        "elastic-out": d(),
        "elastic-in-out": e()
    }
      , T = {
        "poly-in": B,
        "poly-out": C,
        "poly-in-out": D,
        "back-in": f,
        "back-out": g,
        "back-in-out": h,
        "elastic-in": c,
        "elastic-out": d,
        "elastic-in-out": e
    };
    a.ease = E
}),
function() {
    var a = !1
      , b = /xyz/.test(function() {
        xyz
    }) ? /\b_super\b/ : /.*/;
    this.Class = function() {}
    ,
    Class.extend = function(c) {
        function d() {
            !a && this.init && this.init.apply(this, arguments)
        }
        var e = this.prototype;
        a = !0;
        var f = new this;
        a = !1;
        for (var g in c)
            f[g] = "function" == typeof c[g] && "function" == typeof e[g] && b.test(c[g]) ? function(a, b) {
                return function() {
                    var c = this._super;
                    this._super = e[a];
                    var d = b.apply(this, arguments);
                    return this._super = c,
                    d
                }
            }(g, c[g]) : c[g];
        return d.prototype = f,
        d.prototype.constructor = d,
        d.extend = arguments.callee,
        d.prototype.synthesize = function(a) {
            null == this[a] && (this[a] = function() {
                return 0 == arguments.length ? this["_" + a] : void (1 == arguments.length && (this["_" + a] = arguments[0]))
            }
            )
        }
        ,
        d
    }
}();
var InputText = Class.extend({
    TYPE_STRING: 0,
    TYPE_EMAIL: 1,
    TYPE_PHONE: 2,
    TYPE_NUMBER: 3,
    init: function(a) {
        this._debugId = "InputText -- ";
        var b = {
            container: null,
            defaultValue: "",
            restriction: "",
            inputType: this.TYPE_STRING
        }
          , c = this;
        this._config = $.extend(b, a),
        this._callbacks = {},
        null != this._config.container && (this._config.defaultValue = this._config.container.val(),
        this._config.container.bind("focus", function() {
            c._config.container.val() == c._config.defaultValue && c._config.container.val("")
        }).bind("blur", function() {
            "" == c._config.container.val() && c._config.container.val(c._config.defaultValue)
        }),
        this._config.inputType == InputText.prototype.TYPE_NUMBER && this._config.container.bind("keypress", function(a) {
            return a.which >= 48 && a.which <= 57 ? void 0 : !1
        }))
    },
    validate: function() {
        var a = this._config.container.val();
        return "" == a || a == this._config.defaultValue ? !1 : this._config.inputType != InputText.prototype.TYPE_EMAIL || this.isEmail(a) ? !0 : !1
    },
    isEmail: function(a) {
        var b = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return b.test(a)
    },
    isPhone: function() {
        return !0
    },
    isNumber: function() {},
    validateNumber: function(a) {
        var b = $(a.currentTarget);
        b.val(b.val().replace(/[^0-9]/g, ""))
    },
    getValue: function() {
        return this._config.container.val()
    },
    reset: function() {
        this._config.container.val(this._config.defaultValue)
    }
});
!function() {
    for (var a = 0, b = ["webkit", "moz"], c = 0; c < b.length && !window.requestAnimationFrame; ++c)
        window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"],
        window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(b) {
        var c = (new Date).getTime()
          , d = Math.max(0, 16 - (c - a))
          , e = window.setTimeout(function() {
            b(c + d)
        }, d);
        return a = c + d,
        e
    }
    ),
    window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
        clearTimeout(a)
    }
    )
}();
try {
    !function(a) {
        "use strict";
        var b = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
          , c = "default"
          , d = -1
          , e = "you can only extend classes"
          , f = function() {
            this.frameRate = d,
            this.lastTime = 0,
            this.frameNumber = 0,
            this.interValHandle = "",
            this.enterframeEventQue = {},
            this.atuoPublish()
        };
        f.fn = f.prototype,
        f.fn.onEnterFrame = function(a, b, d, e) {
            var f = a || c;
            return this.enterframeEventQue[f] = b,
            d && d(e),
            this
        }
        ,
        f.fn.deleteEnterFrame = function(a, b) {
            var d = a || c;
            return delete this.enterframeEventQue[d],
            b && b(),
            this
        }
        ,
        f.fn.setFrameRate = function(a) {
            return 1 > a ? a = d : a > 60 && (a = 60),
            this.frameRate = a,
            this.restartFrame(),
            this
        }
        ,
        f.fn.getInterval = function() {
            var a = 1e3 / this.frameRate;
            return a
        }
        ,
        f.fn.getFrameNumber = function() {
            return this.frameNumber
        }
        ,
        f.fn.getFrame = function() {
            return this.frameRate
        }
        ,
        f.fn.restartFrame = function() {
            clearInterval(this.interValHandle),
            this.atuoPublish()
        }
        ,
        f.fn.updateFrameNumber = function() {
            return this.frameNumber++,
            this.frameNumber > 1e3,
            this
        }
        ,
        f.fn.atuoPublish = function() {
            var a = this
              , c = function() {
                a.updateFrameNumber();
                var e = (new Date).getTime();
                for (var f in a.enterframeEventQue) {
                    var g = {
                        frame: a.getFrameNumber(),
                        handle: f,
                        eventTime: e,
                        lastTime: a.lastTime,
                        readableEventTime: e,
                        source: a.enterframeEventQue[f].toString(),
                        toString: function() {
                            return "framerate:" + (-1 == a.frameRate ? " MAX " : a.frameRate) + " Current frame: " + this.frame + " Timeline: " + this.readableEventTime
                        }
                    };
                    a.enterframeEventQue[f](g)
                }
                null !== b && a.getFrame() == d && b(c),
                a.lastTime = (new Date).getTime()
            };
            return null !== b && a.getFrame() == d ? b(c) : this.interValHandle = setInterval(c, this.getInterval()),
            this
        }
        ,
        f.fn.extend = function(a) {
            if (a && a.constructor && a.call && a.apply)
                return a.prototype.frameEvent = new f,
                this;
            throw e
        }
        ,
        a.prototype.frameEvent = new f
    }(Window)
} catch (e) {}
!function() {
    function a(a, b) {
        return [].slice.call((b || document).querySelectorAll(a))
    }
    if (window.addEventListener) {
        var b = window.StyleFix = {
            link: function(a) {
                try {
                    if ("stylesheet" !== a.rel || a.hasAttribute("data-noprefix"))
                        return
                } catch (c) {
                    return
                }
                var d, e = a.href || a.getAttribute("data-href"), f = e.replace(/[^\/]+$/, ""), g = (/^[a-z]{3,10}:/.exec(f) || [""])[0], h = (/^[a-z]{3,10}:\/\/[^\/]+/.exec(f) || [""])[0], i = /^([^?]*)\??/.exec(e)[1], j = a.parentNode, k = new XMLHttpRequest;
                k.onreadystatechange = function() {
                    4 === k.readyState && d()
                }
                ,
                d = function() {
                    var c = k.responseText;
                    if (c && a.parentNode && (!k.status || k.status < 400 || k.status > 600)) {
                        if (c = b.fix(c, !0, a),
                        f) {
                            c = c.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi, function(a, b, c) {
                                return /^([a-z]{3,10}:|#)/i.test(c) ? a : /^\/\//.test(c) ? 'url("' + g + c + '")' : /^\//.test(c) ? 'url("' + h + c + '")' : /^\?/.test(c) ? 'url("' + i + c + '")' : 'url("' + f + c + '")'
                            });
                            var d = f.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g, "\\$1");
                            c = c.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)" + d, "gi"), "$1")
                        }
                        var e = document.createElement("style");
                        e.textContent = c,
                        e.media = a.media,
                        e.disabled = a.disabled,
                        e.setAttribute("data-href", a.getAttribute("href")),
                        j.insertBefore(e, a),
                        j.removeChild(a),
                        e.media = a.media
                    }
                }
                ;
                try {
                    k.open("GET", e),
                    k.send(null)
                } catch (c) {
                    "undefined" != typeof XDomainRequest && (k = new XDomainRequest,
                    k.onerror = k.onprogress = function() {}
                    ,
                    k.onload = d,
                    k.open("GET", e),
                    k.send(null))
                }
                a.setAttribute("data-inprogress", "")
            },
            styleElement: function(a) {
                if (!a.hasAttribute("data-noprefix")) {
                    var c = a.disabled;
                    a.textContent = b.fix(a.textContent, !0, a),
                    a.disabled = c
                }
            },
            styleAttribute: function(a) {
                var c = a.getAttribute("style");
                c = b.fix(c, !1, a),
                a.setAttribute("style", c)
            },
            process: function() {
                a('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link),
                a("style").forEach(StyleFix.styleElement),
                a("[style]").forEach(StyleFix.styleAttribute)
            },
            register: function(a, c) {
                (b.fixers = b.fixers || []).splice(void 0 === c ? b.fixers.length : c, 0, a)
            },
            fix: function(a, c, d) {
                for (var e = 0; e < b.fixers.length; e++)
                    a = b.fixers[e](a, c, d) || a;
                return a
            },
            camelCase: function(a) {
                return a.replace(/-([a-z])/g, function(a, b) {
                    return b.toUpperCase()
                }).replace("-", "")
            },
            deCamelCase: function(a) {
                return a.replace(/[A-Z]/g, function(a) {
                    return "-" + a.toLowerCase()
                })
            }
        };
        !function() {
            setTimeout(function() {
                a('link[rel="stylesheet"]').forEach(StyleFix.link)
            }, 10),
            document.addEventListener("DOMContentLoaded", StyleFix.process, !1)
        }()
    }
}(),
function(a) {
    function b(a, b, d, e, f) {
        if (a = c[a],
        a.length) {
            var g = RegExp(b + "(" + a.join("|") + ")" + d, "gi");
            f = f.replace(g, e)
        }
        return f
    }
    if (window.StyleFix && window.getComputedStyle) {
        var c = window.PrefixFree = {
            prefixCSS: function(a, d) {
                var e = c.prefix;
                if (c.functions.indexOf("linear-gradient") > -1 && (a = a.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/gi, function(a, b, c, d) {
                    return b + (c || "") + "linear-gradient(" + (90 - d) + "deg"
                })),
                a = b("functions", "(\\s|:|,)", "\\s*\\(", "$1" + e + "$2(", a),
                a = b("keywords", "(\\s|:)", "(\\s|;|\\}|$)", "$1" + e + "$2$3", a),
                a = b("properties", "(^|\\{|\\s|;)", "\\s*:", "$1" + e + "$2:", a),
                c.properties.length) {
                    var f = RegExp("\\b(" + c.properties.join("|") + ")(?!:)", "gi");
                    a = b("valueProperties", "\\b", ":(.+?);", function(a) {
                        return a.replace(f, e + "$1")
                    }, a)
                }
                return d && (a = b("selectors", "", "\\b", c.prefixSelector, a),
                a = b("atrules", "@", "\\b", "@" + e + "$1", a)),
                a = a.replace(RegExp("-" + e, "g"), "-"),
                a = a.replace(/-\*-(?=[a-z]+)/gi, c.prefix)
            },
            property: function(a) {
                return (c.properties.indexOf(a) >= 0 ? c.prefix : "") + a
            },
            value: function(a, d) {
                return a = b("functions", "(^|\\s|,)", "\\s*\\(", "$1" + c.prefix + "$2(", a),
                a = b("keywords", "(^|\\s)", "(\\s|$)", "$1" + c.prefix + "$2$3", a),
                c.valueProperties.indexOf(d) >= 0 && (a = b("properties", "(^|\\s|,)", "($|\\s|,)", "$1" + c.prefix + "$2$3", a)),
                a
            },
            prefixSelector: function(a) {
                return a.replace(/^:{1,2}/, function(a) {
                    return a + c.prefix
                })
            },
            prefixProperty: function(a, b) {
                var d = c.prefix + a;
                return b ? StyleFix.camelCase(d) : d
            }
        };
        !function() {
            var a = {}
              , b = []
              , d = getComputedStyle(document.documentElement, null)
              , e = document.createElement("div").style
              , f = function(c) {
                if ("-" === c.charAt(0)) {
                    b.push(c);
                    var d = c.split("-")
                      , e = d[1];
                    for (a[e] = ++a[e] || 1; d.length > 3; ) {
                        d.pop();
                        var f = d.join("-");
                        g(f) && -1 === b.indexOf(f) && b.push(f)
                    }
                }
            }
              , g = function(a) {
                return StyleFix.camelCase(a)in e
            };
            if (d.length > 0)
                for (var h = 0; h < d.length; h++)
                    f(d[h]);
            else
                for (var i in d)
                    f(StyleFix.deCamelCase(i));
            var j = {
                uses: 0
            };
            for (var k in a) {
                var l = a[k];
                j.uses < l && (j = {
                    prefix: k,
                    uses: l
                })
            }
            c.prefix = "-" + j.prefix + "-",
            c.Prefix = StyleFix.camelCase(c.prefix),
            c.properties = [];
            for (var h = 0; h < b.length; h++) {
                var i = b[h];
                if (0 === i.indexOf(c.prefix)) {
                    var m = i.slice(c.prefix.length);
                    g(m) || c.properties.push(m)
                }
            }
            "Ms" == c.Prefix && !("transform"in e) && !("MsTransform"in e) && "msTransform"in e && c.properties.push("transform", "transform-origin"),
            c.properties.sort()
        }(),
        function() {
            function a(a, b) {
                return e[b] = "",
                e[b] = a,
                !!e[b]
            }
            var b = {
                "linear-gradient": {
                    property: "backgroundImage",
                    params: "red, teal"
                },
                calc: {
                    property: "width",
                    params: "1px + 5%"
                },
                element: {
                    property: "backgroundImage",
                    params: "#foo"
                },
                "cross-fade": {
                    property: "backgroundImage",
                    params: "url(a.png), url(b.png), 50%"
                }
            };
            b["repeating-linear-gradient"] = b["repeating-radial-gradient"] = b["radial-gradient"] = b["linear-gradient"];
            var d = {
                initial: "color",
                "zoom-in": "cursor",
                "zoom-out": "cursor",
                box: "display",
                flexbox: "display",
                "inline-flexbox": "display",
                flex: "display",
                "inline-flex": "display",
                grid: "display",
                "inline-grid": "display",
                "min-content": "width"
            };
            c.functions = [],
            c.keywords = [];
            var e = document.createElement("div").style;
            for (var f in b) {
                var g = b[f]
                  , h = g.property
                  , i = f + "(" + g.params + ")";
                !a(i, h) && a(c.prefix + i, h) && c.functions.push(f)
            }
            for (var j in d) {
                var h = d[j];
                !a(j, h) && a(c.prefix + j, h) && c.keywords.push(j)
            }
        }(),
        function() {
            function b(a) {
                return f.textContent = a + "{}",
                !!f.sheet.cssRules.length
            }
            var d = {
                ":read-only": null,
                ":read-write": null,
                ":any-link": null,
                "::selection": null
            }
              , e = {
                keyframes: "name",
                viewport: null,
                document: 'regexp(".")'
            };
            c.selectors = [],
            c.atrules = [];
            var f = a.appendChild(document.createElement("style"));
            for (var g in d) {
                var h = g + (d[g] ? "(" + d[g] + ")" : "");
                !b(h) && b(c.prefixSelector(h)) && c.selectors.push(g)
            }
            for (var i in e) {
                var h = i + " " + (e[i] || "");
                !b("@" + h) && b("@" + c.prefix + h) && c.atrules.push(i)
            }
            a.removeChild(f)
        }(),
        c.valueProperties = ["transition", "transition-property"],
        a.className += " " + c.prefix,
        StyleFix.register(c.prefixCSS)
    }
}(document.documentElement),
function() {
    var a = !1
      , b = "animation"
      , c = prefix = ""
      , d = ["Webkit", "Moz", "O", "ms", "Khtml"];
    $(window).load(function() {
        var e = document.body.style;
        if (void 0 !== e.animationName && (a = !0),
        a === !1)
            for (var f = 0; f < d.length; f++)
                if (void 0 !== e[d[f] + "AnimationName"]) {
                    prefix = d[f],
                    b = prefix + "Animation",
                    c = "-" + prefix.toLowerCase() + "-",
                    a = !0;
                    break
                }
    });
    var e = function(a, b) {
        return $.keyframe.debug && void 0,
        $("<style>" + b + "</style>").attr({
            "class": "keyframe-style",
            id: a,
            type: "text/css"
        }).appendTo("head")
    };
    $.keyframe = {
        debug: !1,
        getVendorPrefix: function() {
            return c
        },
        isSupported: function() {
            return a
        },
        generate: function(a) {
            var d = a.name || ""
              , f = "@" + c + "keyframes " + d + " {";
            for (var g in a)
                if ("name" !== g && "media" !== g && "complete" !== g) {
                    f += g + " {";
                    for (var h in a[g])
                        f += h + ":" + a[g][h] + ";";
                    f += "}"
                }
            window.PrefixFree ? f = PrefixFree.prefixCSS(f + "}") : f += "}",
            a.media && (f = "@media " + a.media + "{" + f + "}");
            var i = $("style#" + a.name);
            if (i.length > 0) {
                i.html(f);
                var j = $("*").filter(function() {
                    return this.style[b + "Name"] === d
                });
                j.each(function() {
                    var a = $(this)
                      , b = a.data("keyframeOptions");
                    a.resetKeyframe(function() {
                        a.playKeyframe(b)
                    })
                })
            } else
                e(d, f)
        },
        define: function(a) {
            if (a.length)
                for (var b = 0; b < a.length; b++) {
                    var c = a[b];
                    this.generate(c)
                }
            else
                this.generate(a)
        }
    };
    var f = "animation-play-state"
      , g = "running";
    $.fn.resetKeyframe = function(a) {
        $(this).css(c + f, g).css(c + "animation", "none"),
        a && setTimeout(a, 1)
    }
    ,
    $.fn.pauseKeyframe = function() {
        $(this).css(c + f, "paused")
    }
    ,
    $.fn.resumeKeyframe = function() {
        $(this).css(c + f, g)
    }
    ,
    $.fn.playKeyframe = function(a, b) {
        var d = function(a) {
            return a = $.extend({
                duration: "0s",
                timingFunction: "ease",
                delay: "0s",
                iterationCount: 1,
                direction: "normal",
                fillMode: "forwards"
            }, a),
            [a.name, a.duration, a.timingFunction, a.delay, a.iterationCount, a.direction, a.fillMode].join(" ")
        }
          , e = "";
        if ($.isArray(a)) {
            for (var h = [], i = 0; i < a.length; i++)
                h.push("string" == typeof a[i] ? a[i] : d(a[i]));
            e = h.join(", ")
        } else
            e = "string" == typeof a ? a : d(a);
        var j = c + "animation"
          , k = ["webkit", "moz", "MS", "o", ""];
        !b && a.complete && (b = a.complete);
        var l = function(a, b, c) {
            for (var d = 0; d < k.length; d++) {
                k[d] || (b = b.toLowerCase());
                var e = k[d] + b;
                a.off(e).on(e, c)
            }
        };
        return this.each(function() {
            var d = $(this).addClass("boostKeyframe").css(c + f, g).css(j, e).data("keyframeOptions", a);
            if ($.keyframe.debug) {
                d.css(j)
            }
            b && (l(d, "AnimationIteration", b),
            l(d, "AnimationEnd", b))
        }),
        this
    }
    ,
    e("boost-keyframe", " .boostKeyframe{" + c + "transform:scale3d(1,1,1);}")
}
.call(this),
function(a) {
    var b = a.History
      , c = a.jQuery
      , d = a.document;
    return b.enabled ? void c(function() {
        var e = "#content,article:first,.article:first,.post:first"
          , f = c(e).filter(":first")
          , g = f.get(0)
          , h = c("#menu,#nav,nav:first,.nav:first").filter(":first")
          , i = "active selected current youarehere"
          , j = ".active,.selected,.current,.youarehere"
          , k = "> li,> ul > li"
          , l = "statechangecomplete"
          , m = c(a)
          , n = c(d.body)
          , o = b.getRootUrl()
          , p = {
            duration: 800,
            easing: "swing"
        };
        0 === f.length && (f = n),
        c.expr[":"].internal = function(a) {
            var b, d = c(a), e = d.attr("href") || "";
            return b = e.substring(0, o.length) === o || -1 === e.indexOf(":")
        }
        ;
        var q = function(a) {
            var b = String(a).replace(/<\!DOCTYPE[^>]*>/i, "").replace(/<(html|head|body|title|meta|script)([\s\>])/gi, '<div class="document-$1"$2').replace(/<\/(html|head|body|title|meta|script)\>/gi, "</div>");
            return c.trim(b)
        };
        c.fn.ajaxify = function() {
            var a = c(this);
            return a.find("a:internal:not(.no-ajaxy)").click(function(a) {
                var d = c(this)
                  , e = d.attr("href")
                  , f = d.attr("title") || null;
                return 2 == a.which || a.metaKey ? !0 : (b.pushState(null, f, e),
                a.preventDefault(),
                !1)
            }),
            a
        }
        ,
        n.ajaxify(),
        m.bind("statechange", function() {
            var r = b.getState()
              , s = r.url
              , t = s.replace(o, "");
            n.addClass("loading"),
            f.animate({
                opacity: 0
            }, 800),
            c.ajax({
                url: s,
                success: function(b) {
                    var o, r, u, v = c(q(b)), w = v.find(".document-body:first"), x = w.find(e).filter(":first");
                    if (u = x.find(".document-script"),
                    u.length && u.detach(),
                    r = x.html() || v.html(),
                    !r)
                        return d.location.href = s,
                        !1;
                    o = h.find(k),
                    o.filter(j).removeClass(i),
                    o = o.has('a[href^="' + t + '"],a[href^="/' + t + '"],a[href^="' + s + '"]'),
                    1 === o.length && o.addClass(i),
                    f.stop(!0, !0),
                    f.html(r).ajaxify().css("opacity", 100).show(),
                    d.title = v.find(".document-title:first").text();
                    try {
                        d.getElementsByTagName("title")[0].innerHTML = d.title.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
                    } catch (y) {}
                    u.each(function() {
                        var a = c(this)
                          , b = a.text()
                          , e = d.createElement("script");
                        a.attr("src") && (a[0].async || (e.async = !1),
                        e.src = a.attr("src")),
                        e.appendChild(d.createTextNode(b)),
                        g.appendChild(e)
                    }),
                    n.ScrollTo && n.ScrollTo(p),
                    n.removeClass("loading"),
                    m.trigger(l),
                    "undefined" != typeof a._gaq && a._gaq.push(["_trackPageview", t]),
                    "undefined" != typeof a.reinvigorate && "undefined" != typeof a.reinvigorate.ajax_track && reinvigorate.ajax_track(s)
                },
                error: function() {
                    return d.location.href = s,
                    !1
                }
            })
        })
    }) : !1
}(window),
!function(a, b) {
    function c(b) {
        var c, d = a("<div></div>").css({
            width: "100%"
        });
        return b.append(d),
        c = b.width() - d.width(),
        d.remove(),
        c
    }
    function d(e, f) {
        var g = e.getBoundingClientRect()
          , h = g.top
          , i = g.bottom
          , j = g.left
          , k = g.right
          , l = a.extend({
            tolerance: 0,
            viewport: b
        }, f)
          , m = !1
          , n = l.viewport.jquery ? l.viewport : a(l.viewport);
        n.length || (n = a(b));
        var o = n.height()
          , p = n.width()
          , q = n.get(0).toString();
        if (n[0] !== b && "[object Window]" !== q && "[object DOMWindow]" !== q) {
            var r = n.get(0).getBoundingClientRect();
            h -= r.top,
            i -= r.top,
            j -= r.left,
            k -= r.left,
            d.scrollBarWidth = d.scrollBarWidth || c(n),
            p -= d.scrollBarWidth
        }
        return l.tolerance = ~~Math.round(parseFloat(l.tolerance)),
        l.tolerance < 0 && (l.tolerance = o + l.tolerance),
        0 >= k || j >= p ? m : m = l.tolerance ? !!(h <= l.tolerance && i >= l.tolerance) : !!(i > 0 && o >= h)
    }
    String.prototype.hasOwnProperty("trim") || (String.prototype.trim = function() {
        return this.replace(/^\s*(.*?)\s*$/, "$1")
    }
    );
    var e = function(b) {
        if (1 === arguments.length && "function" == typeof b && (b = [b]),
        !(b instanceof Array))
            throw new SyntaxError("isInViewport: Argument(s) passed to .do/.run should be a function or an array of functions");
        for (var c = 0; c < b.length; c++)
            if ("function" == typeof b[c])
                for (var d = 0; d < this.length; d++)
                    b[c].call(a(this[d]));
        return this
    };
    a.fn["do"] = function(a) {
        return e(a)
    }
    ,
    a.fn.run = e,
    a.extend(a.expr[":"], {
        "in-viewport": function(a, b, c) {
            if (c[3]) {
                var e = c[3].split(",");
                return 1 === e.length && isNaN(e[0]) && (e[1] = e[0],
                e[0] = void 0),
                d(a, {
                    tolerance: e[0] ? e[0].trim() : void 0,
                    viewport: e[1] ? e[1].trim() : void 0
                })
            }
            return d(a)
        }
    })
}(jQuery, window),
function(a) {
    function b(b) {
        function d() {
            b ? g.removeData(b) : m && delete c[m]
        }
        function f() {
            i.id = setTimeout(function() {
                i.fn()
            }, n)
        }
        var g, h = this, i = {}, j = b ? a.fn : a, k = arguments, l = 4, m = k[1], n = k[2], o = k[3];
        if ("string" != typeof m && (l--,
        m = b = 0,
        n = k[1],
        o = k[2]),
        b ? (g = h.eq(0),
        g.data(b, i = g.data(b) || {})) : m && (i = c[m] || (c[m] = {})),
        i.id && clearTimeout(i.id),
        delete i.id,
        o)
            i.fn = function(a) {
                "string" == typeof o && (o = j[o]),
                o.apply(h, e.call(k, l)) !== !0 || a ? d() : f()
            }
            ,
            f();
        else {
            if (i.fn)
                return void 0 === n ? d() : i.fn(n === !1),
                !0;
            d()
        }
    }
    var c = {}
      , d = "doTimeout"
      , e = Array.prototype.slice;
    a[d] = function() {
        return b.apply(window, [0].concat(e.call(arguments)))
    }
    ,
    a.fn[d] = function() {
        var a = e.call(arguments)
          , c = b.apply(this, [d + a[0]].concat(a));
        return "number" == typeof a[0] || "number" == typeof a[1] ? this : c
    }
}(jQuery),
function(a, b) {
    var c, d = a.jQuery || a.Cowboy || (a.Cowboy = {});
    d.throttle = c = function(a, c, e, f) {
        function g() {
            function d() {
                i = +new Date,
                e.apply(j, l)
            }
            function g() {
                h = b
            }
            var j = this
              , k = +new Date - i
              , l = arguments;
            f && !h && d(),
            h && clearTimeout(h),
            f === b && k > a ? d() : c !== !0 && (h = setTimeout(f ? g : d, f === b ? a - k : a))
        }
        var h, i = 0;
        return "boolean" != typeof c && (f = e,
        e = c,
        c = b),
        d.guid && (g.guid = e.guid = e.guid || d.guid++),
        g
    }
    ,
    d.debounce = function(a, d, e) {
        return e === b ? c(a, d, !1) : c(a, e, d !== !1)
    }
}(this),
window.JSON || (window.JSON = {}),
function() {
    function f(a) {
        return 10 > a ? "0" + a : a
    }
    function quote(a) {
        return escapable.lastIndex = 0,
        escapable.test(a) ? '"' + a.replace(escapable, function(a) {
            var b = meta[a];
            return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }
    function str(a, b) {
        var c, d, e, f, g, h = gap, i = b[a];
        switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(a)),
        "function" == typeof rep && (i = rep.call(b, a, i)),
        typeof i) {
        case "string":
            return quote(i);
        case "number":
            return isFinite(i) ? String(i) : "null";
        case "boolean":
        case "null":
            return String(i);
        case "object":
            if (!i)
                return "null";
            if (gap += indent,
            g = [],
            "[object Array]" === Object.prototype.toString.apply(i)) {
                for (f = i.length,
                c = 0; f > c; c += 1)
                    g[c] = str(c, i) || "null";
                return e = 0 === g.length ? "[]" : gap ? "[\n" + gap + g.join(",\n" + gap) + "\n" + h + "]" : "[" + g.join(",") + "]",
                gap = h,
                e
            }
            if (rep && "object" == typeof rep)
                for (f = rep.length,
                c = 0; f > c; c += 1)
                    d = rep[c],
                    "string" == typeof d && (e = str(d, i),
                    e && g.push(quote(d) + (gap ? ": " : ":") + e));
            else
                for (d in i)
                    Object.hasOwnProperty.call(i, d) && (e = str(d, i),
                    e && g.push(quote(d) + (gap ? ": " : ":") + e));
            return e = 0 === g.length ? "{}" : gap ? "{\n" + gap + g.join(",\n" + gap) + "\n" + h + "}" : "{" + g.join(",") + "}",
            gap = h,
            e
        }
    }
    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    }
    ,
    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf()
    }
    );
    var JSON = window.JSON, cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, rep;
    "function" != typeof JSON.stringify && (JSON.stringify = function(a, b, c) {
        var d;
        if (gap = "",
        indent = "",
        "number" == typeof c)
            for (d = 0; c > d; d += 1)
                indent += " ";
        else
            "string" == typeof c && (indent = c);
        if (rep = b,
        !b || "function" == typeof b || "object" == typeof b && "number" == typeof b.length)
            return str("", {
                "": a
            });
        throw new Error("JSON.stringify")
    }
    ),
    "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
        function walk(a, b) {
            var c, d, e = a[b];
            if (e && "object" == typeof e)
                for (c in e)
                    Object.hasOwnProperty.call(e, c) && (d = walk(e, c),
                    void 0 !== d ? e[c] = d : delete e[c]);
            return reviver.call(a, b, e)
        }
        var j;
        if (text = String(text),
        cx.lastIndex = 0,
        cx.test(text) && (text = text.replace(cx, function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        })),
        /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
            return j = eval("(" + text + ")"),
            "function" == typeof reviver ? walk({
                "": j
            }, "") : j;
        throw new SyntaxError("JSON.parse")
    }
    )
}(),
function(a, b) {
    "use strict";
    var c = a.History = a.History || {}
      , d = a.jQuery;

    if ("undefined" != typeof c.Adapter)
        throw new Error("History.js Adapter has already been loaded...");
    c.Adapter = {
        bind: function(a, b, c) {
            d(a).bind(b, c)
        },
        trigger: function(a, b, c) {
            d(a).trigger(b, c)
        },
        extractEventData: function(a, c, d) {
            var e = c && c.originalEvent && c.originalEvent[a] || d && d[a] || b;
            return e
        },
        onDomLoad: function(a) {
            d(a)
        }
    },
    "undefined" != typeof c.init && c.init()
}(window),
function(a) {
    "use strict";
    var b = a.document
      , c = a.setTimeout || c
      , d = a.clearTimeout || d
      , e = a.setInterval || e
      , f = a.History = a.History || {};
    if ("undefined" != typeof f.initHtml4)
        throw new Error("History.js HTML4 Support has already been loaded...");
    f.initHtml4 = function() {
        return "undefined" != typeof f.initHtml4.initialized ? !1 : (f.initHtml4.initialized = !0,
        f.enabled = !0,
        f.savedHashes = [],
        f.isLastHash = function(a) {
            var b, c = f.getHashByIndex();
            return b = a === c
        }
        ,
        f.saveHash = function(a) {
            return f.isLastHash(a) ? !1 : (f.savedHashes.push(a),
            !0)
        }
        ,
        f.getHashByIndex = function(a) {
            var b = null;
            return b = "undefined" == typeof a ? f.savedHashes[f.savedHashes.length - 1] : 0 > a ? f.savedHashes[f.savedHashes.length + a] : f.savedHashes[a]
        }
        ,
        f.discardedHashes = {},
        f.discardedStates = {},
        f.discardState = function(a, b, c) {
            var d, e = f.getHashByState(a);
            return d = {
                discardedState: a,
                backState: c,
                forwardState: b
            },
            f.discardedStates[e] = d,
            !0
        }
        ,
        f.discardHash = function(a, b, c) {
            var d = {
                discardedHash: a,
                backState: c,
                forwardState: b
            };
            return f.discardedHashes[a] = d,
            !0
        }
        ,
        f.discardedState = function(a) {
            var b, c = f.getHashByState(a);
            return b = f.discardedStates[c] || !1
        }
        ,
        f.discardedHash = function(a) {
            var b = f.discardedHashes[a] || !1;
            return b
        }
        ,
        f.recycleState = function(a) {
            var b = f.getHashByState(a);
            return f.discardedState(a) && delete f.discardedStates[b],
            !0
        }
        ,
        f.emulated.hashChange && (f.hashChangeInit = function() {
            f.checkerFunction = null;
            var c, d, g, h, i = "";
            return f.isInternetExplorer() ? (c = "historyjs-iframe",
            d = b.createElement("iframe"),
            d.setAttribute("id", c),
            d.style.display = "none",
            b.body.appendChild(d),
            d.contentWindow.document.open(),
            d.contentWindow.document.close(),
            g = "",
            h = !1,
            f.checkerFunction = function() {
                if (h)
                    return !1;
                h = !0;
                var b = f.getHash() || ""
                  , c = f.unescapeHash(d.contentWindow.document.location.hash) || "";
                return b !== i ? (i = b,
                c !== b && (g = c = b,
                d.contentWindow.document.open(),
                d.contentWindow.document.close(),
                d.contentWindow.document.location.hash = f.escapeHash(b)),
                f.Adapter.trigger(a, "hashchange")) : c !== g && (g = c,
                f.setHash(c, !1)),
                h = !1,
                !0
            }
            ) : f.checkerFunction = function() {
                var b = f.getHash();
                return b !== i && (i = b,
                f.Adapter.trigger(a, "hashchange")),
                !0
            }
            ,
            f.intervalList.push(e(f.checkerFunction, f.options.hashChangeInterval)),
            !0
        }
        ,
        f.Adapter.onDomLoad(f.hashChangeInit)),
        f.emulated.pushState && (f.onHashChange = function(c) {
            var d, e = c && c.newURL || b.location.href, g = f.getHashByUrl(e), h = null, i = null;
            return f.isLastHash(g) ? (f.busy(!1),
            !1) : (f.doubleCheckComplete(),
            f.saveHash(g),
            g && f.isTraditionalAnchor(g) ? (f.Adapter.trigger(a, "anchorchange"),
            f.busy(!1),
            !1) : (h = f.extractState(f.getFullUrl(g || b.location.href, !1), !0),
            f.isLastSavedState(h) ? (f.busy(!1),
            !1) : (i = f.getHashByState(h),
            d = f.discardedState(h),
            d ? (f.getHashByIndex(-2) === f.getHashByState(d.forwardState) ? f.back(!1) : f.forward(!1),
            !1) : (f.pushState(h.data, h.title, h.url, !1),
            !0))))
        }
        ,
        f.Adapter.bind(a, "hashchange", f.onHashChange),
        f.pushState = function(c, d, e, g) {
            if (f.getHashByUrl(e))
                throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
            if (g !== !1 && f.busy())
                return f.pushQueue({
                    scope: f,
                    callback: f.pushState,
                    args: arguments,
                    queue: g
                }),
                !1;
            f.busy(!0);
            var h = f.createStateObject(c, d, e)
              , i = f.getHashByState(h)
              , j = f.getState(!1)
              , k = f.getHashByState(j)
              , l = f.getHash();
            return f.storeState(h),
            f.expectedStateId = h.id,
            f.recycleState(h),
            f.setTitle(h),
            i === k ? (f.busy(!1),
            !1) : i !== l && i !== f.getShortUrl(b.location.href) ? (f.setHash(i, !1),
            !1) : (f.saveState(h),
            f.Adapter.trigger(a, "statechange"),
            f.busy(!1),
            !0)
        }
        ,
        f.replaceState = function(a, b, c, d) {
            if (f.getHashByUrl(c))
                throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
            if (d !== !1 && f.busy())
                return f.pushQueue({
                    scope: f,
                    callback: f.replaceState,
                    args: arguments,
                    queue: d
                }),
                !1;
            f.busy(!0);
            var e = f.createStateObject(a, b, c)
              , g = f.getState(!1)
              , h = f.getStateByIndex(-2);
            return f.discardState(g, e, h),
            f.pushState(e.data, e.title, e.url, !1),
            !0
        }
        ),
        f.emulated.pushState && f.getHash() && !f.emulated.hashChange && f.Adapter.onDomLoad(function() {
            f.Adapter.trigger(a, "hashchange")
        }),
        void 0)
    }
    ,
    "undefined" != typeof f.init && f.init()
}(window),
function(a, b) {
    "use strict";
    var c = a.console || b
      , d = a.document
      , e = a.navigator
      , f = a.sessionStorage || !1
      , g = a.setTimeout
      , h = a.clearTimeout
      , i = a.setInterval
      , j = a.clearInterval
      , k = a.JSON
      , l = a.alert
      , m = a.History = a.History || {}
      , n = a.history;
    if (k.stringify = k.stringify || k.encode,
    k.parse = k.parse || k.decode,
    "undefined" != typeof m.init)
        throw new Error("History.js Core has already been loaded...");
    m.init = function() {
        return "undefined" == typeof m.Adapter ? !1 : ("undefined" != typeof m.initCore && m.initCore(),
        "undefined" != typeof m.initHtml4 && m.initHtml4(),
        !0)
    }
    ,
    m.initCore = function() {
        if ("undefined" != typeof m.initCore.initialized)
            return !1;
        if (m.initCore.initialized = !0,
        m.options = m.options || {},
        m.options.hashChangeInterval = m.options.hashChangeInterval || 100,
        m.options.safariPollInterval = m.options.safariPollInterval || 500,
        m.options.doubleCheckInterval = m.options.doubleCheckInterval || 500,
        m.options.storeInterval = m.options.storeInterval || 1e3,
        m.options.busyDelay = m.options.busyDelay || 250,
        m.options.debug = m.options.debug || !1,
        m.options.initialTitle = m.options.initialTitle || d.title,
        m.intervalList = [],
        m.clearAllIntervals = function() {
            var a, b = m.intervalList;
            if ("undefined" != typeof b && null !== b) {
                for (a = 0; a < b.length; a++)
                    j(b[a]);
                m.intervalList = null
            }
        }
        ,
        m.debug = function() {
            (m.options.debug || !1) && m.log.apply(m, arguments)
        }
        ,
        m.log = function() {
            var a, b, e, f, g, h = "undefined" != typeof c && "undefined" != typeof c.log && "undefined" != typeof c.log.apply, i = d.getElementById("log");
            for (h ? (f = Array.prototype.slice.call(arguments),
            a = f.shift(),
            "undefined" != typeof c.debug ? c.debug.apply(c, [a, f]) : c.log.apply(c, [a, f])) : a = "\n" + arguments[0] + "\n",
            b = 1,
            e = arguments.length; e > b; ++b) {
                if (g = arguments[b],
                "object" == typeof g && "undefined" != typeof k)
                    try {
                        g = k.stringify(g)
                    } catch (j) {}
                a += "\n" + g + "\n"
            }
            return i ? (i.value += a + "\n-----\n",
            i.scrollTop = i.scrollHeight - i.clientHeight) : h || l(a),
            !0
        }
        ,
        m.getInternetExplorerMajorVersion = function() {
            var a = m.getInternetExplorerMajorVersion.cached = "undefined" != typeof m.getInternetExplorerMajorVersion.cached ? m.getInternetExplorerMajorVersion.cached : function() {
                for (var a = 3, b = d.createElement("div"), c = b.getElementsByTagName("i"); (b.innerHTML = "<!--[if gt IE " + ++a + "]><i></i><![endif]-->") && c[0]; )
                    ;
                return a > 4 ? a : !1
            }();
            return a
        }
        ,
        m.isInternetExplorer = function() {
            var a = m.isInternetExplorer.cached = "undefined" != typeof m.isInternetExplorer.cached ? m.isInternetExplorer.cached : Boolean(m.getInternetExplorerMajorVersion());
            return a
        }
        ,
        m.emulated = {
            pushState: !Boolean(a.history && a.history.pushState && a.history.replaceState && !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(e.userAgent) && !/AppleWebKit\/5([0-2]|3[0-2])/i.test(e.userAgent)),
            hashChange: Boolean(!("onhashchange"in a || "onhashchange"in d) || m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 8)
        },
        m.enabled = !m.emulated.pushState,
        m.bugs = {
            setHash: Boolean(!m.emulated.pushState && "Apple Computer, Inc." === e.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),
            safariPoll: Boolean(!m.emulated.pushState && "Apple Computer, Inc." === e.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),
            ieDoubleCheck: Boolean(m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 8),
            hashEscape: Boolean(m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 7)
        },
        m.isEmptyObject = function(a) {
            for (var b in a)
                return !1;
            return !0
        }
        ,
        m.cloneObject = function(a) {
            var b, c;
            return a ? (b = k.stringify(a),
            c = k.parse(b)) : c = {},
            c
        }
        ,
        m.getRootUrl = function() {
            var a = d.location.protocol + "//" + (d.location.hostname || d.location.host);
            return d.location.port && (a += ":" + d.location.port),
            a += "/"
        }
        ,
        m.getBaseHref = function() {
            var a = d.getElementsByTagName("base")
              , b = null
              , c = "";
            return 1 === a.length && (b = a[0],
            c = b.href.replace(/[^\/]+$/, "")),
            c = c.replace(/\/+$/, ""),
            c && (c += "/"),
            c
        }
        ,
        m.getBaseUrl = function() {
            var a = m.getBaseHref() || m.getBasePageUrl() || m.getRootUrl();
            return a
        }
        ,
        m.getPageUrl = function() {
            var a, b = m.getState(!1, !1), c = (b || {}).url || d.location.href;
            return a = c.replace(/\/+$/, "").replace(/[^\/]+$/, function(a) {
                return /\./.test(a) ? a : a + "/"
            })
        }
        ,
        m.getBasePageUrl = function() {
            var a = d.location.href.replace(/[#\?].*/, "").replace(/[^\/]+$/, function(a) {
                return /[^\/]$/.test(a) ? "" : a
            }).replace(/\/+$/, "") + "/";
            return a
        }
        ,
        m.getFullUrl = function(a, b) {
            var c = a
              , d = a.substring(0, 1);
            return b = "undefined" == typeof b ? !0 : b,
            /[a-z]+\:\/\//.test(a) || (c = "/" === d ? m.getRootUrl() + a.replace(/^\/+/, "") : "#" === d ? m.getPageUrl().replace(/#.*/, "") + a : "?" === d ? m.getPageUrl().replace(/[\?#].*/, "") + a : b ? m.getBaseUrl() + a.replace(/^(\.\/)+/, "") : m.getBasePageUrl() + a.replace(/^(\.\/)+/, "")),
            c.replace(/\#$/, "")
        }
        ,
        m.getShortUrl = function(a) {
            var b = a
              , c = m.getBaseUrl()
              , d = m.getRootUrl();
            return m.emulated.pushState && (b = b.replace(c, "")),
            b = b.replace(d, "/"),
            m.isTraditionalAnchor(b) && (b = "./" + b),
            b = b.replace(/^(\.\/)+/g, "./").replace(/\#$/, "")
        }
        ,
        m.store = {},
        m.idToState = m.idToState || {},
        m.stateToId = m.stateToId || {},
        m.urlToId = m.urlToId || {},
        m.storedStates = m.storedStates || [],
        m.savedStates = m.savedStates || [],
        m.normalizeStore = function() {
            m.store.idToState = m.store.idToState || {},
            m.store.urlToId = m.store.urlToId || {},
            m.store.stateToId = m.store.stateToId || {}
        }
        ,
        m.getState = function(a, b) {
            "undefined" == typeof a && (a = !0),
            "undefined" == typeof b && (b = !0);
            var c = m.getLastSavedState();
            return !c && b && (c = m.createStateObject()),
            a && (c = m.cloneObject(c),
            c.url = c.cleanUrl || c.url),
            c
        }
        ,
        m.getIdByState = function(a) {
            var b, c = m.extractId(a.url);
            if (!c)
                if (b = m.getStateString(a),
                "undefined" != typeof m.stateToId[b])
                    c = m.stateToId[b];
                else if ("undefined" != typeof m.store.stateToId[b])
                    c = m.store.stateToId[b];
                else {
                    for (; c = (new Date).getTime() + String(Math.random()).replace(/\D/g, ""),
                    "undefined" != typeof m.idToState[c] || "undefined" != typeof m.store.idToState[c]; )
                        ;
                    m.stateToId[b] = c,
                    m.idToState[c] = a
                }
            return c
        }
        ,
        m.normalizeState = function(a) {
            var b, c;
            return a && "object" == typeof a || (a = {}),
            "undefined" != typeof a.normalized ? a : (a.data && "object" == typeof a.data || (a.data = {}),
            b = {},
            b.normalized = !0,
            b.title = a.title || "",
            b.url = m.getFullUrl(m.unescapeString(a.url || d.location.href)),
            b.hash = m.getShortUrl(b.url),
            b.data = m.cloneObject(a.data),
            b.id = m.getIdByState(b),
            b.cleanUrl = b.url.replace(/\??\&_suid.*/, ""),
            b.url = b.cleanUrl,
            c = !m.isEmptyObject(b.data),
            (b.title || c) && (b.hash = m.getShortUrl(b.url).replace(/\??\&_suid.*/, ""),
            /\?/.test(b.hash) || (b.hash += "?"),
            b.hash += "&_suid=" + b.id),
            b.hashedUrl = m.getFullUrl(b.hash),
            (m.emulated.pushState || m.bugs.safariPoll) && m.hasUrlDuplicate(b) && (b.url = b.hashedUrl),
            b)
        }
        ,
        m.createStateObject = function(a, b, c) {
            var d = {
                data: a,
                title: b,
                url: c
            };
            return d = m.normalizeState(d)
        }
        ,
        m.getStateById = function(a) {
            a = String(a);
            var c = m.idToState[a] || m.store.idToState[a] || b;
            return c
        }
        ,
        m.getStateString = function(a) {
            var b, c, d;
            return b = m.normalizeState(a),
            c = {
                data: b.data,
                title: a.title,
                url: a.url
            },
            d = k.stringify(c)
        }
        ,
        m.getStateId = function(a) {
            var b, c;
            return b = m.normalizeState(a),
            c = b.id
        }
        ,
        m.getHashByState = function(a) {
            var b, c;
            return b = m.normalizeState(a),
            c = b.hash
        }
        ,
        m.extractId = function(a) {
            var b, c, d;
            return c = /(.*)\&_suid=([0-9]+)$/.exec(a),
            d = c ? c[1] || a : a,
            b = c ? String(c[2] || "") : "",
            b || !1
        }
        ,
        m.isTraditionalAnchor = function(a) {
            var b = !/[\/\?\.]/.test(a);
            return b
        }
        ,
        m.extractState = function(a, b) {
            var c, d, e = null;
            return b = b || !1,
            c = m.extractId(a),
            c && (e = m.getStateById(c)),
            e || (d = m.getFullUrl(a),
            c = m.getIdByUrl(d) || !1,
            c && (e = m.getStateById(c)),
            !e && b && !m.isTraditionalAnchor(a) && (e = m.createStateObject(null, null, d))),
            e
        }
        ,
        m.getIdByUrl = function(a) {
            var c = m.urlToId[a] || m.store.urlToId[a] || b;
            return c
        }
        ,
        m.getLastSavedState = function() {
            return m.savedStates[m.savedStates.length - 1] || b
        }
        ,
        m.getLastStoredState = function() {
            return m.storedStates[m.storedStates.length - 1] || b
        }
        ,
        m.hasUrlDuplicate = function(a) {
            var b, c = !1;
            return b = m.extractState(a.url),
            c = b && b.id !== a.id
        }
        ,
        m.storeState = function(a) {
            return m.urlToId[a.url] = a.id,
            m.storedStates.push(m.cloneObject(a)),
            a
        }
        ,
        m.isLastSavedState = function(a) {
            var b, c, d, e = !1;
            return m.savedStates.length && (b = a.id,
            c = m.getLastSavedState(),
            d = c.id,
            e = b === d),
            e
        }
        ,
        m.saveState = function(a) {
            return m.isLastSavedState(a) ? !1 : (m.savedStates.push(m.cloneObject(a)),
            !0)
        }
        ,
        m.getStateByIndex = function(a) {
            var b = null;
            return b = "undefined" == typeof a ? m.savedStates[m.savedStates.length - 1] : 0 > a ? m.savedStates[m.savedStates.length + a] : m.savedStates[a]
        }
        ,
        m.getHash = function() {
            var a = m.unescapeHash(d.location.hash);
            return a
        }
        ,
        m.unescapeString = function(b) {
            for (var c, d = b; c = a.unescape(d),
            c !== d; )
                d = c;
            return d
        }
        ,
        m.unescapeHash = function(a) {
            var b = m.normalizeHash(a);
            return b = m.unescapeString(b)
        }
        ,
        m.normalizeHash = function(a) {
            var b = a.replace(/[^#]*#/, "").replace(/#.*/, "");
            return b
        }
        ,
        m.setHash = function(a, b) {
            var c, e, f;
            return b !== !1 && m.busy() ? (m.pushQueue({
                scope: m,
                callback: m.setHash,
                args: arguments,
                queue: b
            }),
            !1) : (c = m.escapeHash(a),
            m.busy(!0),
            e = m.extractState(a, !0),
            e && !m.emulated.pushState ? m.pushState(e.data, e.title, e.url, !1) : d.location.hash !== c && (m.bugs.setHash ? (f = m.getPageUrl(),
            m.pushState(null, null, f + "#" + c, !1)) : d.location.hash = c),
            m)
        }
        ,
        m.escapeHash = function(b) {
            var c = m.normalizeHash(b);
            return c = a.escape(c),
            m.bugs.hashEscape || (c = c.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")),
            c
        }
        ,
        m.getHashByUrl = function(a) {
            var b = String(a).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
            return b = m.unescapeHash(b)
        }
        ,
        m.setTitle = function(a) {
            var b, c = a.title;
            c || (b = m.getStateByIndex(0),
            b && b.url === a.url && (c = b.title || m.options.initialTitle));
            try {
                d.getElementsByTagName("title")[0].innerHTML = c.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
            } catch (e) {}
            return d.title = c,
            m
        }
        ,
        m.queues = [],
        m.busy = function(a) {
            if ("undefined" != typeof a ? m.busy.flag = a : "undefined" == typeof m.busy.flag && (m.busy.flag = !1),
            !m.busy.flag) {
                h(m.busy.timeout);
                var b = function() {
                    var a, c, d;
                    if (!m.busy.flag)
                        for (a = m.queues.length - 1; a >= 0; --a)
                            c = m.queues[a],
                            0 !== c.length && (d = c.shift(),
                            m.fireQueueItem(d),
                            m.busy.timeout = g(b, m.options.busyDelay))
                };
                m.busy.timeout = g(b, m.options.busyDelay)
            }
            return m.busy.flag
        }
        ,
        m.busy.flag = !1,
        m.fireQueueItem = function(a) {
            return a.callback.apply(a.scope || m, a.args || [])
        }
        ,
        m.pushQueue = function(a) {
            return m.queues[a.queue || 0] = m.queues[a.queue || 0] || [],
            m.queues[a.queue || 0].push(a),
            m
        }
        ,
        m.queue = function(a, b) {
            return "function" == typeof a && (a = {
                callback: a
            }),
            "undefined" != typeof b && (a.queue = b),
            m.busy() ? m.pushQueue(a) : m.fireQueueItem(a),
            m
        }
        ,
        m.clearQueue = function() {
            return m.busy.flag = !1,
            m.queues = [],
            m
        }
        ,
        m.stateChanged = !1,
        m.doubleChecker = !1,
        m.doubleCheckComplete = function() {
            return m.stateChanged = !0,
            m.doubleCheckClear(),
            m
        }
        ,
        m.doubleCheckClear = function() {
            return m.doubleChecker && (h(m.doubleChecker),
            m.doubleChecker = !1),
            m
        }
        ,
        m.doubleCheck = function(a) {
            return m.stateChanged = !1,
            m.doubleCheckClear(),
            m.bugs.ieDoubleCheck && (m.doubleChecker = g(function() {
                return m.doubleCheckClear(),
                m.stateChanged || a(),
                !0
            }, m.options.doubleCheckInterval)),
            m
        }
        ,
        m.safariStatePoll = function() {
            var b, c = m.extractState(d.location.href);
            if (!m.isLastSavedState(c))
                return b = c,
                b || (b = m.createStateObject()),
                m.Adapter.trigger(a, "popstate"),
                m
        }
        ,
        m.back = function(a) {
            return a !== !1 && m.busy() ? (m.pushQueue({
                scope: m,
                callback: m.back,
                args: arguments,
                queue: a
            }),
            !1) : (m.busy(!0),
            m.doubleCheck(function() {
                m.back(!1)
            }),
            n.go(-1),
            !0)
        }
        ,
        m.forward = function(a) {
            return a !== !1 && m.busy() ? (m.pushQueue({
                scope: m,
                callback: m.forward,
                args: arguments,
                queue: a
            }),
            !1) : (m.busy(!0),
            m.doubleCheck(function() {
                m.forward(!1)
            }),
            n.go(1),
            !0)
        }
        ,
        m.go = function(a, b) {
            var c;
            if (a > 0)
                for (c = 1; a >= c; ++c)
                    m.forward(b);
            else {
                if (!(0 > a))
                    throw new Error("History.go: History.go requires a positive or negative integer passed.");
                for (c = -1; c >= a; --c)
                    m.back(b)
            }
            return m
        }
        ,
        m.emulated.pushState) {
            var o = function() {};
            m.pushState = m.pushState || o,
            m.replaceState = m.replaceState || o
        } else
            m.onPopState = function(b, c) {
                var e, f, g = !1, h = !1;
                return m.doubleCheckComplete(),
                e = m.getHash(),
                e ? (f = m.extractState(e || d.location.href, !0),
                f ? m.replaceState(f.data, f.title, f.url, !1) : (m.Adapter.trigger(a, "anchorchange"),
                m.busy(!1)),
                m.expectedStateId = !1,
                !1) : (g = m.Adapter.extractEventData("state", b, c) || !1,
                h = g ? m.getStateById(g) : m.expectedStateId ? m.getStateById(m.expectedStateId) : m.extractState(d.location.href),
                h || (h = m.createStateObject(null, null, d.location.href)),
                m.expectedStateId = !1,
                m.isLastSavedState(h) ? (m.busy(!1),
                !1) : (m.storeState(h),
                m.saveState(h),
                m.setTitle(h),
                m.Adapter.trigger(a, "statechange"),
                m.busy(!1),
                !0))
            }
            ,
            m.Adapter.bind(a, "popstate", m.onPopState),
            m.pushState = function(b, c, d, e) {
                if (m.getHashByUrl(d) && m.emulated.pushState)
                    throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (e !== !1 && m.busy())
                    return m.pushQueue({
                        scope: m,
                        callback: m.pushState,
                        args: arguments,
                        queue: e
                    }),
                    !1;
                m.busy(!0);
                var f = m.createStateObject(b, c, d);
                return m.isLastSavedState(f) ? m.busy(!1) : (m.storeState(f),
                m.expectedStateId = f.id,
                n.pushState(f.id, f.title, f.url),
                m.Adapter.trigger(a, "popstate")),
                !0
            }
            ,
            m.replaceState = function(b, c, d, e) {
                if (m.getHashByUrl(d) && m.emulated.pushState)
                    throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (e !== !1 && m.busy())
                    return m.pushQueue({
                        scope: m,
                        callback: m.replaceState,
                        args: arguments,
                        queue: e
                    }),
                    !1;
                m.busy(!0);
                var f = m.createStateObject(b, c, d);
                return m.isLastSavedState(f) ? m.busy(!1) : (m.storeState(f),
                m.expectedStateId = f.id,
                n.replaceState(f.id, f.title, f.url),
                m.Adapter.trigger(a, "popstate")),
                !0
            }
            ;
        if (f) {
            try {
                m.store = k.parse(f.getItem("History.store")) || {}
            } catch (p) {
                m.store = {}
            }
            m.normalizeStore()
        } else
            m.store = {},
            m.normalizeStore();
        m.Adapter.bind(a, "beforeunload", m.clearAllIntervals),
        m.Adapter.bind(a, "unload", m.clearAllIntervals),
        m.saveState(m.storeState(m.extractState(d.location.href, !0))),
        f && (m.onUnload = function() {
            var a, b;
            try {
                a = k.parse(f.getItem("History.store")) || {}
            } catch (c) {
                a = {}
            }
            a.idToState = a.idToState || {},
            a.urlToId = a.urlToId || {},
            a.stateToId = a.stateToId || {};
            for (b in m.idToState)
                m.idToState.hasOwnProperty(b) && (a.idToState[b] = m.idToState[b]);
            for (b in m.urlToId)
                m.urlToId.hasOwnProperty(b) && (a.urlToId[b] = m.urlToId[b]);
            for (b in m.stateToId)
                m.stateToId.hasOwnProperty(b) && (a.stateToId[b] = m.stateToId[b]);
            m.store = a,
            m.normalizeStore(),
            f.setItem("History.store", k.stringify(a))
        }
        ,
        m.intervalList.push(i(m.onUnload, m.options.storeInterval)),
        m.Adapter.bind(a, "beforeunload", m.onUnload),
        m.Adapter.bind(a, "unload", m.onUnload)),
        m.emulated.pushState || (m.bugs.safariPoll && m.intervalList.push(i(m.safariStatePoll, m.options.safariPollInterval)),
        ("Apple Computer, Inc." === e.vendor || "Mozilla" === (e.appCodeName || "")) && (m.Adapter.bind(a, "hashchange", function() {
            m.Adapter.trigger(a, "popstate")
        }),
        m.getHash() && m.Adapter.onDomLoad(function() {
            m.Adapter.trigger(a, "hashchange")
        })))
    }
    ,
    m.init()
}(window),
!function(a, b, c, d) {
    "use strict";
    function e(b, c) {
        this.element = b,
        this.$context = a(b).data("api", this),
        this.$layers = this.$context.find(".layer");
        var d = {
            calibrateX: this.$context.data("calibrate-x") || null,
            calibrateY: this.$context.data("calibrate-y") || null,
            invertX: this.$context.data("invert-x") || null,
            invertY: this.$context.data("invert-y") || null,
            limitX: parseFloat(this.$context.data("limit-x")) || null,
            limitY: parseFloat(this.$context.data("limit-y")) || null,
            scalarX: parseFloat(this.$context.data("scalar-x")) || null,
            scalarY: parseFloat(this.$context.data("scalar-y")) || null,
            frictionX: parseFloat(this.$context.data("friction-x")) || null,
            frictionY: parseFloat(this.$context.data("friction-y")) || null,
            originX: parseFloat(this.$context.data("origin-x")) || null,
            originY: parseFloat(this.$context.data("origin-y")) || null
        };
        for (var e in d)
            null === d[e] && delete d[e];
        a.extend(this, h, c, d),
        this.calibrationTimer = null,
        this.calibrationFlag = !0,
        this.enabled = !1,
        this.depths = [],
        this.raf = null,
        this.bounds = null,
        this.ex = 0,
        this.ey = 0,
        this.ew = 0,
        this.eh = 0,
        this.ecx = 0,
        this.ecy = 0,
        this.erx = 0,
        this.ery = 0,
        this.cx = 0,
        this.cy = 0,
        this.ix = 0,
        this.iy = 0,
        this.mx = 0,
        this.my = 0,
        this.vx = 0,
        this.vy = 0,
        this.onMouseMove = this.onMouseMove.bind(this),
        this.onDeviceOrientation = this.onDeviceOrientation.bind(this),
        this.onOrientationTimer = this.onOrientationTimer.bind(this),
        this.onCalibrationTimer = this.onCalibrationTimer.bind(this),
        this.onAnimationFrame = this.onAnimationFrame.bind(this),
        this.onWindowResize = this.onWindowResize.bind(this),
        this.initialise()
    }
    var f = "parallax"
      , g = 30
      , h = {
        relativeInput: !1,
        clipRelativeInput: !1,
        calibrationThreshold: 100,
        calibrationDelay: 500,
        supportDelay: 500,
        calibrateX: !1,
        calibrateY: !0,
        invertX: !0,
        invertY: !0,
        limitX: !1,
        limitY: !1,
        scalarX: 10,
        scalarY: 10,
        frictionX: .1,
        frictionY: .1,
        originX: .5,
        originY: .5
    };
    e.prototype.transformSupport = function(a) {
        for (var e = c.createElement("div"), f = !1, g = null, h = !1, i = null, j = null, k = 0, l = this.vendors.length; l > k; k++)
            if (null !== this.vendors[k] ? (i = this.vendors[k][0] + "transform",
            j = this.vendors[k][1] + "Transform") : (i = "transform",
            j = "transform"),
            e.style[j] !== d) {
                f = !0;
                break
            }
        switch (a) {
        case "2D":
            h = f;
            break;
        case "3D":
            if (f) {
                var m = c.body || c.createElement("body")
                  , n = c.documentElement
                  , o = n.style.overflow;
                c.body || (n.style.overflow = "hidden",
                n.appendChild(m),
                m.style.overflow = "hidden",
                m.style.background = ""),
                m.appendChild(e),
                e.style[j] = "translate3d(1px,1px,1px)",
                g = b.getComputedStyle(e).getPropertyValue(i),
                h = g !== d && g.length > 0 && "none" !== g,
                n.style.overflow = o,
                m.removeChild(e)
            }
        }
        return h
    }
    ,
    e.prototype.ww = null,
    e.prototype.wh = null,
    e.prototype.wcx = null,
    e.prototype.wcy = null,
    e.prototype.wrx = null,
    e.prototype.wry = null,
    e.prototype.portrait = null,
    e.prototype.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i),
    e.prototype.vendors = [null, ["-webkit-", "webkit"], ["-moz-", "Moz"], ["-o-", "O"], ["-ms-", "ms"]],
    e.prototype.motionSupport = !!b.DeviceMotionEvent,
    e.prototype.orientationSupport = !!b.DeviceOrientationEvent,
    e.prototype.orientationStatus = 0,
    e.prototype.transform2DSupport = e.prototype.transformSupport("2D"),
    e.prototype.transform3DSupport = e.prototype.transformSupport("3D"),
    e.prototype.propertyCache = {},
    e.prototype.initialise = function() {
        "static" === this.$context.css("position") && this.$context.css({
            position: "relative"
        }),
        this.accelerate(this.$context),
        this.updateLayers(),
        this.updateDimensions(),
        this.enable(),
        this.queueCalibration(this.calibrationDelay)
    }
    ,
    e.prototype.updateLayers = function() {
        this.$layers = this.$context.find(".layer"),
        this.depths = [],
        this.$layers.css({
            position: "absolute",
            display: "block",
            left: 0,
            top: 0
        }),
        this.$layers.first().css({
            position: "relative"
        }),
        this.accelerate(this.$layers),
        this.$layers.each(a.proxy(function(b, c) {
            this.depths.push(a(c).data("depth") || 0)
        }, this))
    }
    ,
    e.prototype.updateDimensions = function() {
        this.ww = b.innerWidth,
        this.wh = b.innerHeight,
        this.wcx = this.ww * this.originX,
        this.wcy = this.wh * this.originY,
        this.wrx = Math.max(this.wcx, this.ww - this.wcx),
        this.wry = Math.max(this.wcy, this.wh - this.wcy)
    }
    ,
    e.prototype.updateBounds = function() {
        this.bounds = this.element.getBoundingClientRect(),
        this.ex = this.bounds.left,
        this.ey = this.bounds.top,
        this.ew = this.bounds.width,
        this.eh = this.bounds.height,
        this.ecx = this.ew * this.originX,
        this.ecy = this.eh * this.originY,
        this.erx = Math.max(this.ecx, this.ew - this.ecx),
        this.ery = Math.max(this.ecy, this.eh - this.ecy)
    }
    ,
    e.prototype.queueCalibration = function(a) {
        clearTimeout(this.calibrationTimer),
        this.calibrationTimer = setTimeout(this.onCalibrationTimer, a)
    }
    ,
    e.prototype.enable = function() {
        this.enabled || (this.enabled = !0,
        this.orientationSupport ? (this.portrait = null,
        b.addEventListener("deviceorientation", this.onDeviceOrientation),
        setTimeout(this.onOrientationTimer, this.supportDelay)) : (this.cx = 0,
        this.cy = 0,
        this.portrait = !1,
        b.addEventListener("mousemove", this.onMouseMove)),
        b.addEventListener("resize", this.onWindowResize),
        this.raf = requestAnimationFrame(this.onAnimationFrame))
    }
    ,
    e.prototype.disable = function() {
        this.enabled && (this.enabled = !1,
        this.orientationSupport ? b.removeEventListener("deviceorientation", this.onDeviceOrientation) : b.removeEventListener("mousemove", this.onMouseMove),
        b.removeEventListener("resize", this.onWindowResize),
        cancelAnimationFrame(this.raf))
    }
    ,
    e.prototype.calibrate = function(a, b) {
        this.calibrateX = a === d ? this.calibrateX : a,
        this.calibrateY = b === d ? this.calibrateY : b
    }
    ,
    e.prototype.invert = function(a, b) {
        this.invertX = a === d ? this.invertX : a,
        this.invertY = b === d ? this.invertY : b
    }
    ,
    e.prototype.friction = function(a, b) {
        this.frictionX = a === d ? this.frictionX : a,
        this.frictionY = b === d ? this.frictionY : b
    }
    ,
    e.prototype.scalar = function(a, b) {
        this.scalarX = a === d ? this.scalarX : a,
        this.scalarY = b === d ? this.scalarY : b
    }
    ,
    e.prototype.limit = function(a, b) {
        this.limitX = a === d ? this.limitX : a,
        this.limitY = b === d ? this.limitY : b
    }
    ,
    e.prototype.origin = function(a, b) {
        this.originX = a === d ? this.originX : a,
        this.originY = b === d ? this.originY : b
    }
    ,
    e.prototype.clamp = function(a, b, c) {
        return a = Math.max(a, b),
        a = Math.min(a, c)
    }
    ,
    e.prototype.css = function(b, c, e) {
        var f = this.propertyCache[c];
        if (!f)
            for (var g = 0, h = this.vendors.length; h > g; g++)
                if (f = null !== this.vendors[g] ? a.camelCase(this.vendors[g][1] + "-" + c) : c,
                b.style[f] !== d) {
                    this.propertyCache[c] = f;
                    break
                }
        b.style[f] = e
    }
    ,
    e.prototype.accelerate = function(a) {
        for (var b = 0, c = a.length; c > b; b++) {
            var d = a[b];
            this.css(d, "transform", "translate3d(0,0,0)"),
            this.css(d, "transform-style", "preserve-3d"),
            this.css(d, "backface-visibility", "hidden")
        }
    }
    ,
    e.prototype.setPosition = function(a, b, c) {
        b += "px",
        c += "px",
        this.transform3DSupport ? this.css(a, "transform", "translate3d(" + b + "," + c + ",0)") : this.transform2DSupport ? this.css(a, "transform", "translate(" + b + "," + c + ")") : (a.style.left = b,
        a.style.top = c)
    }
    ,
    e.prototype.onOrientationTimer = function() {
        this.orientationSupport && 0 === this.orientationStatus && (this.disable(),
        this.orientationSupport = !1,
        this.enable())
    }
    ,
    e.prototype.onCalibrationTimer = function() {
        this.calibrationFlag = !0
    }
    ,
    e.prototype.onWindowResize = function() {
        this.updateDimensions()
    }
    ,
    e.prototype.onAnimationFrame = function() {
        this.updateBounds();
        var a = this.ix - this.cx
          , b = this.iy - this.cy;
        (Math.abs(a) > this.calibrationThreshold || Math.abs(b) > this.calibrationThreshold) && this.queueCalibration(0),
        this.portrait ? (this.mx = this.calibrateX ? b : this.iy,
        this.my = this.calibrateY ? a : this.ix) : (this.mx = this.calibrateX ? a : this.ix,
        this.my = this.calibrateY ? b : this.iy),
        this.mx *= this.ew * (this.scalarX / 100),
        this.my *= this.eh * (this.scalarY / 100),
        isNaN(parseFloat(this.limitX)) || (this.mx = this.clamp(this.mx, -this.limitX, this.limitX)),
        isNaN(parseFloat(this.limitY)) || (this.my = this.clamp(this.my, -this.limitY, this.limitY)),
        this.vx += (this.mx - this.vx) * this.frictionX,
        this.vy += (this.my - this.vy) * this.frictionY;
        for (var c = 0, d = this.$layers.length; d > c; c++) {
            var e = this.depths[c]
              , f = this.$layers[c]
              , g = this.vx * e * (this.invertX ? -1 : 1)
              , h = this.vy * e * (this.invertY ? -1 : 1);
            this.setPosition(f, g, h)
        }
        this.raf = requestAnimationFrame(this.onAnimationFrame)
    }
    ,
    e.prototype.onDeviceOrientation = function(a) {
        if (!this.desktop && null !== a.beta && null !== a.gamma) {
            this.orientationStatus = 1;
            var c = (a.beta || 0) / g
              , d = (a.gamma || 0) / g
              , e = b.innerHeight > b.innerWidth;
            this.portrait !== e && (this.portrait = e,
            this.calibrationFlag = !0),
            this.calibrationFlag && (this.calibrationFlag = !1,
            this.cx = c,
            this.cy = d),
            this.ix = c,
            this.iy = d
        }
    }
    ,
    e.prototype.onMouseMove = function(a) {
        var b = a.clientX
          , c = a.clientY;
        !this.orientationSupport && this.relativeInput ? (this.clipRelativeInput && (b = Math.max(b, this.ex),
        b = Math.min(b, this.ex + this.ew),
        c = Math.max(c, this.ey),
        c = Math.min(c, this.ey + this.eh)),
        this.ix = (b - this.ex - this.ecx) / this.erx,
        this.iy = (c - this.ey - this.ecy) / this.ery) : (this.ix = (b - this.wcx) / this.wrx,
        this.iy = (c - this.wcy) / this.wry)
    }
    ;
    var i = {
        enable: e.prototype.enable,
        disable: e.prototype.disable,
        updateLayers: e.prototype.updateLayers,
        calibrate: e.prototype.calibrate,
        friction: e.prototype.friction,
        invert: e.prototype.invert,
        scalar: e.prototype.scalar,
        limit: e.prototype.limit,
        origin: e.prototype.origin
    };
    a.fn[f] = function(b) {
        var c = arguments;
        return this.each(function() {
            var d = a(this)
              , g = d.data(f);
            g || (g = new e(this,b),
            d.data(f, g)),
            i[b] && g[b].apply(g, Array.prototype.slice.call(c, 1))
        })
    }
}(window.jQuery || window.Zepto, window, document),
function() {
    for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c)
        window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"],
        window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(b) {
        var c = (new Date).getTime()
          , d = Math.max(0, 16 - (c - a))
          , e = window.setTimeout(function() {
            b(c + d)
        }, d);
        return a = c + d,
        e
    }
    ),
    window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
        clearTimeout(a)
    }
    )
}(),
function(a) {
    "use strict";
    a(["jquery"], function(a) {
        function b(b) {
            return !b.nodeName || -1 !== a.inArray(b.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"])
        }
        function c(b) {
            return a.isFunction(b) || a.isPlainObject(b) ? b : {
                top: b,
                left: b
            }
        }
        var d = a.scrollTo = function(b, c, d) {
            return a(window).scrollTo(b, c, d)
        }
        ;
        return d.defaults = {
            axis: "xy",
            duration: 0,
            limit: !0
        },
        a.fn.scrollTo = function(e, f, g) {
            "object" == typeof f && (g = f,
            f = 0),
            "function" == typeof g && (g = {
                onAfter: g
            }),
            "max" === e && (e = 9e9),
            g = a.extend({}, d.defaults, g),
            f = f || g.duration;
            var h = g.queue && g.axis.length > 1;
            return h && (f /= 2),
            g.offset = c(g.offset),
            g.over = c(g.over),
            this.each(function() {
                function i(b) {
                    var c = a.extend({}, g, {
                        queue: !0,
                        duration: f,
                        complete: b && function() {
                            b.call(l, n, g)
                        }
                    });
                    m.animate(o, c)
                }
                if (null !== e) {
                    var j, k = b(this), l = k ? this.contentWindow || window : this, m = a(l), n = e, o = {};
                    switch (typeof n) {
                    case "number":
                    case "string":
                        if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(n)) {
                            n = c(n);
                            break
                        }
                        if (n = k ? a(n) : a(n, l),
                        !n.length)
                            return;
                    case "object":
                        (n.is || n.style) && (j = (n = a(n)).offset())
                    }
                    var p = a.isFunction(g.offset) && g.offset(l, n) || g.offset;
                    a.each(g.axis.split(""), function(a, b) {
                        var c = "x" === b ? "Left" : "Top"
                          , e = c.toLowerCase()
                          , f = "scroll" + c
                          , q = m[f]()
                          , r = d.max(l, b);
                        if (j)
                            o[f] = j[e] + (k ? 0 : q - m.offset()[e]),
                            g.margin && (o[f] -= parseInt(n.css("margin" + c), 10) || 0,
                            o[f] -= parseInt(n.css("border" + c + "Width"), 10) || 0),
                            o[f] += p[e] || 0,
                            g.over[e] && (o[f] += n["x" === b ? "width" : "height"]() * g.over[e]);
                        else {
                            var s = n[e];
                            o[f] = s.slice && "%" === s.slice(-1) ? parseFloat(s) / 100 * r : s
                        }
                        g.limit && /^\d+$/.test(o[f]) && (o[f] = o[f] <= 0 ? 0 : Math.min(o[f], r)),
                        !a && g.axis.length > 1 && (q === o[f] ? o = {} : h && (i(g.onAfterFirst),
                        o = {}))
                    }),
                    i(g.onAfter)
                }
            })
        }
        ,
        d.max = function(c, d) {
            var e = "x" === d ? "Width" : "Height"
              , f = "scroll" + e;
            if (!b(c))
                return c[f] - a(c)[e.toLowerCase()]();
            var g = "client" + e
              , h = c.ownerDocument || c.document
              , i = h.documentElement
              , j = h.body;
            return Math.max(i[f], j[f]) - Math.min(i[g], j[g])
        }
        ,
        a.Tween.propHooks.scrollLeft = a.Tween.propHooks.scrollTop = {
            get: function(b) {
                return a(b.elem)[b.prop]()
            },
            set: function(b) {
                var c = this.get(b);
                if (b.options.interrupt && b._last && b._last !== c)
                    return a(b.elem).stop();
                var d = Math.round(b.now);
                c !== d && (a(b.elem)[b.prop](d),
                b._last = this.get(b))
            }
        },
        d
    })
}("function" == typeof define && define.amd ? define : function(a, b) {
    "use strict";
    "undefined" != typeof module && module.exports ? module.exports = b(require("jquery")) : b(jQuery)
}
),
!function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function(a) {
    "use strict";
    function b(b, e) {
        function f() {
            return m.update(),
            h(),
            m
        }
        function g() {
            r.css(x, m.contentPosition / m.trackRatio),
            o.css(x, -m.contentPosition),
            p.css(w, m.trackSize),
            q.css(w, m.trackSize),
            r.css(w, m.thumbSize)
        }
        function h() {
            u ? n[0].ontouchstart = function(a) {
                1 === a.touches.length && (a.stopPropagation(),
                i(a.touches[0]))
            }
            : (r.bind("mousedown", i),
            q.bind("mousedown", k)),
            a(window).resize(function() {
                m.update("relative")
            }),
            m.options.wheel && window.addEventListener ? b[0].addEventListener(v, j, !1) : m.options.wheel && (b[0].onmousewheel = j)
        }
        function i(b) {
            a("body").addClass("noSelect"),
            s = t ? b.pageX : b.pageY,
            m.thumbPosition = parseInt(r.css(x), 10) || 0,
            u ? (document.ontouchmove = function(a) {
                a.preventDefault(),
                k(a.touches[0])
            }
            ,
            document.ontouchend = l) : (a(document).bind("mousemove", k),
            a(document).bind("mouseup", l),
            r.bind("mouseup", l))
        }
        function j(c) {
            if (m.contentRatio < 1) {
                var d = c || window.event
                  , e = "delta" + m.options.axis.toUpperCase()
                  , f = -(d[e] || d.detail || -1 / 3 * d.wheelDelta) / 40;
                m.contentPosition -= f * m.options.wheelSpeed,
                m.contentPosition = Math.min(m.contentSize - m.viewportSize, Math.max(0, m.contentPosition)),
                b.trigger("move"),
                r.css(x, m.contentPosition / m.trackRatio),
                o.css(x, -m.contentPosition),
                (m.options.wheelLock || m.contentPosition !== m.contentSize - m.viewportSize && 0 !== m.contentPosition) && (d = a.event.fix(d),
                d.preventDefault())
            }
        }
        function k(a) {
            if (m.contentRatio < 1) {
                var c = t ? a.pageX : a.pageY
                  , d = c - s;
                m.options.scrollInvert && u && (d = s - c);
                var e = Math.min(m.trackSize - m.thumbSize, Math.max(0, m.thumbPosition + d));
                m.contentPosition = e * m.trackRatio,
                b.trigger("move"),
                r.css(x, e),
                o.css(x, -m.contentPosition)
            }
        }
        function l() {
            a("body").removeClass("noSelect"),
            a(document).unbind("mousemove", k),
            a(document).unbind("mouseup", l),
            r.unbind("mouseup", l),
            document.ontouchmove = document.ontouchend = null
        }
        this.options = a.extend({}, d, e),
        this._defaults = d,
        this._name = c;
        var m = this
          , n = b.find(".viewport")
          , o = b.find(".overview")
          , p = b.find(".scrollbar")
          , q = p.find(".track")
          , r = p.find(".thumb")
          , s = 0
          , t = "x" === this.options.axis
          , u = "ontouchstart"in document.documentElement
          , v = "onwheel"in document || document.documentMode >= 9 ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll"
          , w = t ? "width" : "height"
          , x = t ? "left" : "top";
        return this.contentPosition = 0,
        this.viewportSize = 0,
        this.contentSize = 0,
        this.contentRatio = 0,
        this.trackSize = 0,
        this.trackRatio = 0,
        this.thumbSize = 0,
        this.thumbPosition = 0,
        this.update = function(a) {
            var b = w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
            switch (this.viewportSize = n[0]["offset" + b],
            this.contentSize = o[0]["scroll" + b],
            this.contentRatio = this.viewportSize / this.contentSize,
            this.trackSize = this.options.trackSize || this.viewportSize,
            this.thumbSize = Math.min(this.trackSize, Math.max(0, this.options.thumbSize || this.trackSize * this.contentRatio)),
            this.trackRatio = this.options.thumbSize ? (this.contentSize - this.viewportSize) / (this.trackSize - this.thumbSize) : this.contentSize / this.trackSize,
            p.toggleClass("disable", this.contentRatio >= 1),
            a) {
            case "bottom":
                this.contentPosition = this.contentSize - this.viewportSize;
                break;
            case "relative":
                this.contentPosition = Math.min(Math.max(this.contentSize - this.viewportSize, 0), Math.max(0, this.contentPosition));
                break;
            default:
                this.contentPosition = parseInt(a, 10) || 0
            }
            return g(),
            m
        }
        ,
        f()
    }
    var c = "tinyscrollbar"
      , d = {
        axis: "y",
        wheel: !0,
        wheelSpeed: 40,
        wheelLock: !0,
        scrollInvert: !1,
        trackSize: !1,
        thumbSize: !1
    };
    a.fn[c] = function(d) {
        return this.each(function() {
            a.data(this, "plugin_" + c) || a.data(this, "plugin_" + c, new b(a(this),d))
        })
    }
}),
function(a) {
    function b(a, b, c, d, e) {
        this._listener = b,
        this._isOnce = c,
        this.context = d,
        this._signal = a,
        this._priority = e || 0
    }
    function c(a, b) {
        if ("function" != typeof a)
            throw Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}", b))
    }
    function d() {
        this._bindings = [],
        this._prevParams = null;
        var a = this;
        this.dispatch = function() {
            d.prototype.dispatch.apply(a, arguments)
        }
    }
    b.prototype = {
        active: !0,
        params: null,
        execute: function(a) {
            var b;
            return this.active && this._listener && (a = this.params ? this.params.concat(a) : a,
            b = this._listener.apply(this.context, a),
            this._isOnce && this.detach()),
            b
        },
        detach: function() {
            return this.isBound() ? this._signal.remove(this._listener, this.context) : null
        },
        isBound: function() {
            return !!this._signal && !!this._listener
        },
        isOnce: function() {
            return this._isOnce
        },
        getListener: function() {
            return this._listener
        },
        getSignal: function() {
            return this._signal
        },
        _destroy: function() {
            delete this._signal,
            delete this._listener,
            delete this.context
        },
        toString: function() {
            return "[SignalBinding isOnce:" + this._isOnce + ", isBound:" + this.isBound() + ", active:" + this.active + "]"
        }
    },
    d.prototype = {
        VERSION: "1.0.0",
        memorize: !1,
        _shouldPropagate: !0,
        active: !0,
        _registerListener: function(a, c, d, e) {
            var f = this._indexOfListener(a, d);
            if (-1 !== f) {
                if (a = this._bindings[f],
                a.isOnce() !== c)
                    throw Error("You cannot add" + (c ? "" : "Once") + "() then add" + (c ? "Once" : "") + "() the same listener without removing the relationship first.")
            } else
                a = new b(this,a,c,d,e),
                this._addBinding(a);
            return this.memorize && this._prevParams && a.execute(this._prevParams),
            a
        },
        _addBinding: function(a) {
            var b = this._bindings.length;
            do
                --b;
            while (this._bindings[b] && a._priority <= this._bindings[b]._priority);
            this._bindings.splice(b + 1, 0, a)
        },
        _indexOfListener: function(a, b) {
            for (var c, d = this._bindings.length; d--; )
                if (c = this._bindings[d],
                c._listener === a && c.context === b)
                    return d;
            return -1
        },
        has: function(a, b) {
            return -1 !== this._indexOfListener(a, b)
        },
        add: function(a, b, d) {
            return c(a, "add"),
            this._registerListener(a, !1, b, d)
        },
        addOnce: function(a, b, d) {
            return c(a, "addOnce"),
            this._registerListener(a, !0, b, d)
        },
        remove: function(a, b) {
            c(a, "remove");
            var d = this._indexOfListener(a, b);
            return -1 !== d && (this._bindings[d]._destroy(),
            this._bindings.splice(d, 1)),
            a
        },
        removeAll: function() {
            for (var a = this._bindings.length; a--; )
                this._bindings[a]._destroy();
            this._bindings.length = 0
        },
        getNumListeners: function() {
            return this._bindings.length
        },
        halt: function() {
            this._shouldPropagate = !1
        },
        dispatch: function() {
            if (this.active) {
                var a, b = Array.prototype.slice.call(arguments), c = this._bindings.length;
                if (this.memorize && (this._prevParams = b),
                c) {
                    a = this._bindings.slice(),
                    this._shouldPropagate = !0;
                    do
                        c--;
                    while (a[c] && this._shouldPropagate && a[c].execute(b) !== !1)
                }
            }
        },
        forget: function() {
            this._prevParams = null
        },
        dispose: function() {
            this.removeAll(),
            delete this._bindings,
            delete this._prevParams
        },
        toString: function() {
            return "[Signal active:" + this.active + " numListeners:" + this.getNumListeners() + "]"
        }
    };
    var e = d;
    e.Signal = d,
    "function" == typeof define && define.amd ? define(function() {
        return e
    }) : "undefined" != typeof module && module.exports ? module.exports = e : a.signals = e
}(this),
(window._gsQueue || (window._gsQueue = [])).push(function() {
    "use strict";
    window._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(a, b, c) {
        var d = [].slice
          , e = function(a, b, d) {
            c.call(this, a, b, d),
            this._cycle = 0,
            this._yoyo = this.vars.yoyo === !0,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._dirty = !0,
            this.render = e.prototype.render
        }
          , f = 1e-10
          , g = c._internals.isSelector
          , h = c._internals.isArray
          , i = e.prototype = c.to({}, .1, {})
          , j = [];
        e.version = "1.11.8",
        i.constructor = e,
        i.kill()._gc = !1,
        e.killTweensOf = e.killDelayedCallsTo = c.killTweensOf,
        e.getTweensOf = c.getTweensOf,
        e.ticker = c.ticker,
        i.invalidate = function() {
            return this._yoyo = this.vars.yoyo === !0,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._uncache(!0),
            c.prototype.invalidate.call(this)
        }
        ,
        i.updateTo = function(a, b) {
            var d, e = this.ratio;
            b && this._startTime < this._timeline._time && (this._startTime = this._timeline._time,
            this._uncache(!1),
            this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
            for (d in a)
                this.vars[d] = a[d];
            if (this._initted)
                if (b)
                    this._initted = !1;
                else if (this._gc && this._enabled(!0, !1),
                this._notifyPluginsOfEnabled && this._firstPT && c._onPluginEvent("_onDisable", this),
                this._time / this._duration > .998) {
                    var f = this._time;
                    this.render(0, !0, !1),
                    this._initted = !1,
                    this.render(f, !0, !1)
                } else if (this._time > 0) {
                    this._initted = !1,
                    this._init();
                    for (var g, h = 1 / (1 - e), i = this._firstPT; i; )
                        g = i.s + i.c,
                        i.c *= h,
                        i.s = g - i.c,
                        i = i._next
                }
            return this
        }
        ,
        i.render = function(a, b, c) {
            this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
            var d, e, g, h, i, k, l, m, n = this._dirty ? this.totalDuration() : this._totalDuration, o = this._time, p = this._totalTime, q = this._cycle, r = this._duration;
            if (a >= n ? (this._totalTime = n,
            this._cycle = this._repeat,
            this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = r,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
            this._reversed || (d = !0,
            e = "onComplete"),
            0 === r && (m = this._rawPrevTime,
            this._startTime === this._timeline._duration && (a = 0),
            (0 === a || 0 > m || m === f) && m !== a && (c = !0,
            m > f && (e = "onReverseComplete")),
            this._rawPrevTime = m = !b || a || this._rawPrevTime === a ? a : f)) : 1e-7 > a ? (this._totalTime = this._time = this._cycle = 0,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0,
            (0 !== p || 0 === r && this._rawPrevTime > 0 && this._rawPrevTime !== f) && (e = "onReverseComplete",
            d = this._reversed),
            0 > a ? (this._active = !1,
            0 === r && (this._rawPrevTime >= 0 && (c = !0),
            this._rawPrevTime = m = !b || a || this._rawPrevTime === a ? a : f)) : this._initted || (c = !0)) : (this._totalTime = this._time = a,
            0 !== this._repeat && (h = r + this._repeatDelay,
            this._cycle = this._totalTime / h >> 0,
            0 !== this._cycle && this._cycle === this._totalTime / h && this._cycle--,
            this._time = this._totalTime - this._cycle * h,
            this._yoyo && 0 !== (1 & this._cycle) && (this._time = r - this._time),
            this._time > r ? this._time = r : 0 > this._time && (this._time = 0)),
            this._easeType ? (i = this._time / r,
            k = this._easeType,
            l = this._easePower,
            (1 === k || 3 === k && i >= .5) && (i = 1 - i),
            3 === k && (i *= 2),
            1 === l ? i *= i : 2 === l ? i *= i * i : 3 === l ? i *= i * i * i : 4 === l && (i *= i * i * i * i),
            this.ratio = 1 === k ? 1 - i : 2 === k ? i : .5 > this._time / r ? i / 2 : 1 - i / 2) : this.ratio = this._ease.getRatio(this._time / r)),
            o === this._time && !c && q === this._cycle)
                return void (p !== this._totalTime && this._onUpdate && (b || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || j)));
            if (!this._initted) {
                if (this._init(),
                !this._initted || this._gc)
                    return;
                this._time && !d ? this.ratio = this._ease.getRatio(this._time / r) : d && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
            }
            for (this._active || !this._paused && this._time !== o && a >= 0 && (this._active = !0),
            0 === p && (this._startAt && (a >= 0 ? this._startAt.render(a, b, c) : e || (e = "_dummyGS")),
            this.vars.onStart && (0 !== this._totalTime || 0 === r) && (b || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || j))),
            g = this._firstPT; g; )
                g.f ? g.t[g.p](g.c * this.ratio + g.s) : g.t[g.p] = g.c * this.ratio + g.s,
                g = g._next;
            this._onUpdate && (0 > a && this._startAt && this._startTime && this._startAt.render(a, b, c),
            b || (this._totalTime !== p || d) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || j)),
            this._cycle !== q && (b || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || j)),
            e && (this._gc || (0 > a && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(a, b, c),
            d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
            this._active = !1),
            !b && this.vars[e] && this.vars[e].apply(this.vars[e + "Scope"] || this, this.vars[e + "Params"] || j),
            0 === r && this._rawPrevTime === f && m !== f && (this._rawPrevTime = 0)))
        }
        ,
        e.to = function(a, b, c) {
            return new e(a,b,c)
        }
        ,
        e.from = function(a, b, c) {
            return c.runBackwards = !0,
            c.immediateRender = 0 != c.immediateRender,
            new e(a,b,c)
        }
        ,
        e.fromTo = function(a, b, c, d) {
            return d.startAt = c,
            d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender,
            new e(a,b,d)
        }
        ,
        e.staggerTo = e.allTo = function(a, b, f, i, k, l, m) {
            i = i || 0;
            var n, o, p, q, r = f.delay || 0, s = [], t = function() {
                f.onComplete && f.onComplete.apply(f.onCompleteScope || this, arguments),
                k.apply(m || this, l || j)
            };
            for (h(a) || ("string" == typeof a && (a = c.selector(a) || a),
            g(a) && (a = d.call(a, 0))),
            n = a.length,
            p = 0; n > p; p++) {
                o = {};
                for (q in f)
                    o[q] = f[q];
                o.delay = r,
                p === n - 1 && k && (o.onComplete = t),
                s[p] = new e(a[p],b,o),
                r += i
            }
            return s
        }
        ,
        e.staggerFrom = e.allFrom = function(a, b, c, d, f, g, h) {
            return c.runBackwards = !0,
            c.immediateRender = 0 != c.immediateRender,
            e.staggerTo(a, b, c, d, f, g, h)
        }
        ,
        e.staggerFromTo = e.allFromTo = function(a, b, c, d, f, g, h, i) {
            return d.startAt = c,
            d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender,
            e.staggerTo(a, b, d, f, g, h, i)
        }
        ,
        e.delayedCall = function(a, b, c, d, f) {
            return new e(b,0,{
                delay: a,
                onComplete: b,
                onCompleteParams: c,
                onCompleteScope: d,
                onReverseComplete: b,
                onReverseCompleteParams: c,
                onReverseCompleteScope: d,
                immediateRender: !1,
                useFrames: f,
                overwrite: 0
            })
        }
        ,
        e.set = function(a, b) {
            return new e(a,0,b)
        }
        ,
        e.isTweening = function(a) {
            return c.getTweensOf(a, !0).length > 0
        }
        ;
        var k = function(a, b) {
            for (var d = [], e = 0, f = a._first; f; )
                f instanceof c ? d[e++] = f : (b && (d[e++] = f),
                d = d.concat(k(f, b)),
                e = d.length),
                f = f._next;
            return d
        }
          , l = e.getAllTweens = function(b) {
            return k(a._rootTimeline, b).concat(k(a._rootFramesTimeline, b))
        }
        ;
        e.killAll = function(a, c, d, e) {
            null == c && (c = !0),
            null == d && (d = !0);
            var f, g, h, i = l(0 != e), j = i.length, k = c && d && e;
            for (h = 0; j > h; h++)
                g = i[h],
                (k || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && (a ? g.totalTime(g.totalDuration()) : g._enabled(!1, !1))
        }
        ,
        e.killChildTweensOf = function(a, b) {
            if (null != a) {
                var f, i, j, k, l, m = c._tweenLookup;
                if ("string" == typeof a && (a = c.selector(a) || a),
                g(a) && (a = d.call(a, 0)),
                h(a))
                    for (k = a.length; --k > -1; )
                        e.killChildTweensOf(a[k], b);
                else {
                    f = [];
                    for (j in m)
                        for (i = m[j].target.parentNode; i; )
                            i === a && (f = f.concat(m[j].tweens)),
                            i = i.parentNode;
                    for (l = f.length,
                    k = 0; l > k; k++)
                        b && f[k].totalTime(f[k].totalDuration()),
                        f[k]._enabled(!1, !1)
                }
            }
        }
        ;
        var m = function(a, c, d, e) {
            c = c !== !1,
            d = d !== !1,
            e = e !== !1;
            for (var f, g, h = l(e), i = c && d && e, j = h.length; --j > -1; )
                g = h[j],
                (i || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && g.paused(a)
        };
        return e.pauseAll = function(a, b, c) {
            m(!0, a, b, c)
        }
        ,
        e.resumeAll = function(a, b, c) {
            m(!1, a, b, c)
        }
        ,
        e.globalTimeScale = function(b) {
            var d = a._rootTimeline
              , e = c.ticker.time;
            return arguments.length ? (b = b || f,
            d._startTime = e - (e - d._startTime) * d._timeScale / b,
            d = a._rootFramesTimeline,
            e = c.ticker.frame,
            d._startTime = e - (e - d._startTime) * d._timeScale / b,
            d._timeScale = a._rootTimeline._timeScale = b,
            b) : d._timeScale
        }
        ,
        i.progress = function(a) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
        }
        ,
        i.totalProgress = function(a) {
            return arguments.length ? this.totalTime(this.totalDuration() * a, !1) : this._totalTime / this.totalDuration()
        }
        ,
        i.time = function(a, b) {
            return arguments.length ? (this._dirty && this.totalDuration(),
            a > this._duration && (a = this._duration),
            this._yoyo && 0 !== (1 & this._cycle) ? a = this._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (a += this._cycle * (this._duration + this._repeatDelay)),
            this.totalTime(a, b)) : this._time
        }
        ,
        i.duration = function(b) {
            return arguments.length ? a.prototype.duration.call(this, b) : this._duration
        }
        ,
        i.totalDuration = function(a) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((a - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat,
            this._dirty = !1),
            this._totalDuration)
        }
        ,
        i.repeat = function(a) {
            return arguments.length ? (this._repeat = a,
            this._uncache(!0)) : this._repeat
        }
        ,
        i.repeatDelay = function(a) {
            return arguments.length ? (this._repeatDelay = a,
            this._uncache(!0)) : this._repeatDelay
        }
        ,
        i.yoyo = function(a) {
            return arguments.length ? (this._yoyo = a,
            this) : this._yoyo
        }
        ,
        e
    }, !0),
    window._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(a, b, c) {
        var d = function(a) {
            b.call(this, a),
            this._labels = {},
            this.autoRemoveChildren = this.vars.autoRemoveChildren === !0,
            this.smoothChildTiming = this.vars.smoothChildTiming === !0,
            this._sortChildren = !0,
            this._onUpdate = this.vars.onUpdate;
            var c, d, e = this.vars;
            for (d in e)
                c = e[d],
                g(c) && -1 !== c.join("").indexOf("{self}") && (e[d] = this._swapSelfInParams(c));
            g(e.tweens) && this.add(e.tweens, 0, e.align, e.stagger)
        }
          , e = 1e-10
          , f = c._internals.isSelector
          , g = c._internals.isArray
          , h = []
          , i = window._gsDefine.globals
          , j = function(a) {
            var b, c = {};
            for (b in a)
                c[b] = a[b];
            return c
        }
          , k = function(a, b, c, d) {
            a._timeline.pause(a._startTime),
            b && b.apply(d || a._timeline, c || h)
        }
          , l = h.slice
          , m = d.prototype = new b;
        return d.version = "1.11.8",
        m.constructor = d,
        m.kill()._gc = !1,
        m.to = function(a, b, d, e) {
            var f = d.repeat && i.TweenMax || c;
            return b ? this.add(new f(a,b,d), e) : this.set(a, d, e)
        }
        ,
        m.from = function(a, b, d, e) {
            return this.add((d.repeat && i.TweenMax || c).from(a, b, d), e)
        }
        ,
        m.fromTo = function(a, b, d, e, f) {
            var g = e.repeat && i.TweenMax || c;
            return b ? this.add(g.fromTo(a, b, d, e), f) : this.set(a, e, f)
        }
        ,
        m.staggerTo = function(a, b, e, g, h, i, k, m) {
            var n, o = new d({
                onComplete: i,
                onCompleteParams: k,
                onCompleteScope: m,
                smoothChildTiming: this.smoothChildTiming
            });
            for ("string" == typeof a && (a = c.selector(a) || a),
            f(a) && (a = l.call(a, 0)),
            g = g || 0,
            n = 0; a.length > n; n++)
                e.startAt && (e.startAt = j(e.startAt)),
                o.to(a[n], b, j(e), n * g);
            return this.add(o, h)
        }
        ,
        m.staggerFrom = function(a, b, c, d, e, f, g, h) {
            return c.immediateRender = 0 != c.immediateRender,
            c.runBackwards = !0,
            this.staggerTo(a, b, c, d, e, f, g, h)
        }
        ,
        m.staggerFromTo = function(a, b, c, d, e, f, g, h, i) {
            return d.startAt = c,
            d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender,
            this.staggerTo(a, b, d, e, f, g, h, i)
        }
        ,
        m.call = function(a, b, d, e) {
            return this.add(c.delayedCall(0, a, b, d), e)
        }
        ,
        m.set = function(a, b, d) {
            return d = this._parseTimeOrLabel(d, 0, !0),
            null == b.immediateRender && (b.immediateRender = d === this._time && !this._paused),
            this.add(new c(a,0,b), d)
        }
        ,
        d.exportRoot = function(a, b) {
            a = a || {},
            null == a.smoothChildTiming && (a.smoothChildTiming = !0);
            var e, f, g = new d(a), h = g._timeline;
            for (null == b && (b = !0),
            h._remove(g, !0),
            g._startTime = 0,
            g._rawPrevTime = g._time = g._totalTime = h._time,
            e = h._first; e; )
                f = e._next,
                b && e instanceof c && e.target === e.vars.onComplete || g.add(e, e._startTime - e._delay),
                e = f;
            return h.add(g, 0),
            g
        }
        ,
        m.add = function(e, f, h, i) {
            var j, k, l, m, n, o;
            if ("number" != typeof f && (f = this._parseTimeOrLabel(f, 0, !0, e)),
            !(e instanceof a)) {
                if (e instanceof Array || e && e.push && g(e)) {
                    for (h = h || "normal",
                    i = i || 0,
                    j = f,
                    k = e.length,
                    l = 0; k > l; l++)
                        g(m = e[l]) && (m = new d({
                            tweens: m
                        })),
                        this.add(m, j),
                        "string" != typeof m && "function" != typeof m && ("sequence" === h ? j = m._startTime + m.totalDuration() / m._timeScale : "start" === h && (m._startTime -= m.delay())),
                        j += i;
                    return this._uncache(!0)
                }
                if ("string" == typeof e)
                    return this.addLabel(e, f);
                if ("function" != typeof e)
                    throw "Cannot add " + e + " into the timeline; it is not a tween, timeline, function, or string.";
                e = c.delayedCall(0, e)
            }
            if (b.prototype.add.call(this, e, f),
            (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                for (n = this,
                o = n.rawTime() > e._startTime; n._timeline; )
                    o && n._timeline.smoothChildTiming ? n.totalTime(n._totalTime, !0) : n._gc && n._enabled(!0, !1),
                    n = n._timeline;
            return this
        }
        ,
        m.remove = function(b) {
            if (b instanceof a)
                return this._remove(b, !1);
            if (b instanceof Array || b && b.push && g(b)) {
                for (var c = b.length; --c > -1; )
                    this.remove(b[c]);
                return this
            }
            return "string" == typeof b ? this.removeLabel(b) : this.kill(null, b)
        }
        ,
        m._remove = function(a, c) {
            b.prototype._remove.call(this, a, c);
            var d = this._last;
            return d ? this._time > d._startTime + d._totalDuration / d._timeScale && (this._time = this.duration(),
            this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0,
            this
        }
        ,
        m.append = function(a, b) {
            return this.add(a, this._parseTimeOrLabel(null, b, !0, a))
        }
        ,
        m.insert = m.insertMultiple = function(a, b, c, d) {
            return this.add(a, b || 0, c, d)
        }
        ,
        m.appendMultiple = function(a, b, c, d) {
            return this.add(a, this._parseTimeOrLabel(null, b, !0, a), c, d)
        }
        ,
        m.addLabel = function(a, b) {
            return this._labels[a] = this._parseTimeOrLabel(b),
            this
        }
        ,
        m.addPause = function(a, b, c, d) {
            return this.call(k, ["{self}", b, c, d], this, a)
        }
        ,
        m.removeLabel = function(a) {
            return delete this._labels[a],
            this
        }
        ,
        m.getLabelTime = function(a) {
            return null != this._labels[a] ? this._labels[a] : -1
        }
        ,
        m._parseTimeOrLabel = function(b, c, d, e) {
            var f;
            if (e instanceof a && e.timeline === this)
                this.remove(e);
            else if (e && (e instanceof Array || e.push && g(e)))
                for (f = e.length; --f > -1; )
                    e[f]instanceof a && e[f].timeline === this && this.remove(e[f]);
            if ("string" == typeof c)
                return this._parseTimeOrLabel(c, d && "number" == typeof b && null == this._labels[c] ? b - this.duration() : 0, d);
            if (c = c || 0,
            "string" != typeof b || !isNaN(b) && null == this._labels[b])
                null == b && (b = this.duration());
            else {
                if (f = b.indexOf("="),
                -1 === f)
                    return null == this._labels[b] ? d ? this._labels[b] = this.duration() + c : c : this._labels[b] + c;
                c = parseInt(b.charAt(f - 1) + "1", 10) * Number(b.substr(f + 1)),
                b = f > 1 ? this._parseTimeOrLabel(b.substr(0, f - 1), 0, d) : this.duration()
            }
            return Number(b) + c
        }
        ,
        m.seek = function(a, b) {
            return this.totalTime("number" == typeof a ? a : this._parseTimeOrLabel(a), b !== !1)
        }
        ,
        m.stop = function() {
            return this.paused(!0)
        }
        ,
        m.gotoAndPlay = function(a, b) {
            return this.play(a, b)
        }
        ,
        m.gotoAndStop = function(a, b) {
            return this.pause(a, b)
        }
        ,
        m.render = function(a, b, c) {
            this._gc && this._enabled(!0, !1);
            var d, f, g, i, j, k = this._dirty ? this.totalDuration() : this._totalDuration, l = this._time, m = this._startTime, n = this._timeScale, o = this._paused;
            if (a >= k ? (this._totalTime = this._time = k,
            this._reversed || this._hasPausedChild() || (f = !0,
            i = "onComplete",
            0 === this._duration && (0 === a || 0 > this._rawPrevTime || this._rawPrevTime === e) && this._rawPrevTime !== a && this._first && (j = !0,
            this._rawPrevTime > e && (i = "onReverseComplete"))),
            this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e,
            a = k + 1e-4) : 1e-7 > a ? (this._totalTime = this._time = 0,
            (0 !== l || 0 === this._duration && this._rawPrevTime !== e && (this._rawPrevTime > 0 || 0 > a && this._rawPrevTime >= 0)) && (i = "onReverseComplete",
            f = this._reversed),
            0 > a ? (this._active = !1,
            0 === this._duration && this._rawPrevTime >= 0 && this._first && (j = !0),
            this._rawPrevTime = a) : (this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e,
            a = 0,
            this._initted || (j = !0))) : this._totalTime = this._time = this._rawPrevTime = a,
            this._time !== l && this._first || c || j) {
                if (this._initted || (this._initted = !0),
                this._active || !this._paused && this._time !== l && a > 0 && (this._active = !0),
                0 === l && this.vars.onStart && 0 !== this._time && (b || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || h)),
                this._time >= l)
                    for (d = this._first; d && (g = d._next,
                    !this._paused || o); )
                        (d._active || d._startTime <= this._time && !d._paused && !d._gc) && (d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)),
                        d = g;
                else
                    for (d = this._last; d && (g = d._prev,
                    !this._paused || o); )
                        (d._active || l >= d._startTime && !d._paused && !d._gc) && (d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)),
                        d = g;
                this._onUpdate && (b || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || h)),
                i && (this._gc || (m === this._startTime || n !== this._timeScale) && (0 === this._time || k >= this.totalDuration()) && (f && (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                this._active = !1),
                !b && this.vars[i] && this.vars[i].apply(this.vars[i + "Scope"] || this, this.vars[i + "Params"] || h)))
            }
        }
        ,
        m._hasPausedChild = function() {
            for (var a = this._first; a; ) {
                if (a._paused || a instanceof d && a._hasPausedChild())
                    return !0;
                a = a._next
            }
            return !1
        }
        ,
        m.getChildren = function(a, b, d, e) {
            e = e || -9999999999;
            for (var f = [], g = this._first, h = 0; g; )
                e > g._startTime || (g instanceof c ? b !== !1 && (f[h++] = g) : (d !== !1 && (f[h++] = g),
                a !== !1 && (f = f.concat(g.getChildren(!0, b, d)),
                h = f.length))),
                g = g._next;
            return f
        }
        ,
        m.getTweensOf = function(a, b) {
            for (var d = c.getTweensOf(a), e = d.length, f = [], g = 0; --e > -1; )
                (d[e].timeline === this || b && this._contains(d[e])) && (f[g++] = d[e]);
            return f
        }
        ,
        m._contains = function(a) {
            for (var b = a.timeline; b; ) {
                if (b === this)
                    return !0;
                b = b.timeline
            }
            return !1
        }
        ,
        m.shiftChildren = function(a, b, c) {
            c = c || 0;
            for (var d, e = this._first, f = this._labels; e; )
                e._startTime >= c && (e._startTime += a),
                e = e._next;
            if (b)
                for (d in f)
                    f[d] >= c && (f[d] += a);
            return this._uncache(!0)
        }
        ,
        m._kill = function(a, b) {
            if (!a && !b)
                return this._enabled(!1, !1);
            for (var c = b ? this.getTweensOf(b) : this.getChildren(!0, !0, !1), d = c.length, e = !1; --d > -1; )
                c[d]._kill(a, b) && (e = !0);
            return e
        }
        ,
        m.clear = function(a) {
            var b = this.getChildren(!1, !0, !0)
              , c = b.length;
            for (this._time = this._totalTime = 0; --c > -1; )
                b[c]._enabled(!1, !1);
            return a !== !1 && (this._labels = {}),
            this._uncache(!0)
        }
        ,
        m.invalidate = function() {
            for (var a = this._first; a; )
                a.invalidate(),
                a = a._next;
            return this
        }
        ,
        m._enabled = function(a, c) {
            if (a === this._gc)
                for (var d = this._first; d; )
                    d._enabled(a, !0),
                    d = d._next;
            return b.prototype._enabled.call(this, a, c)
        }
        ,
        m.duration = function(a) {
            return arguments.length ? (0 !== this.duration() && 0 !== a && this.timeScale(this._duration / a),
            this) : (this._dirty && this.totalDuration(),
            this._duration)
        }
        ,
        m.totalDuration = function(a) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var b, c, d = 0, e = this._last, f = 999999999999; e; )
                        b = e._prev,
                        e._dirty && e.totalDuration(),
                        e._startTime > f && this._sortChildren && !e._paused ? this.add(e, e._startTime - e._delay) : f = e._startTime,
                        0 > e._startTime && !e._paused && (d -= e._startTime,
                        this._timeline.smoothChildTiming && (this._startTime += e._startTime / this._timeScale),
                        this.shiftChildren(-e._startTime, !1, -9999999999),
                        f = 0),
                        c = e._startTime + e._totalDuration / e._timeScale,
                        c > d && (d = c),
                        e = b;
                    this._duration = this._totalDuration = d,
                    this._dirty = !1
                }
                return this._totalDuration
            }
            return 0 !== this.totalDuration() && 0 !== a && this.timeScale(this._totalDuration / a),
            this
        }
        ,
        m.usesFrames = function() {
            for (var b = this._timeline; b._timeline; )
                b = b._timeline;
            return b === a._rootFramesTimeline
        }
        ,
        m.rawTime = function() {
            return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
        }
        ,
        d
    }, !0),
    window._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(a, b, c) {
        var d = function(b) {
            a.call(this, b),
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._cycle = 0,
            this._yoyo = this.vars.yoyo === !0,
            this._dirty = !0
        }
          , e = 1e-10
          , f = []
          , g = new c(null,null,1,0)
          , h = d.prototype = new a;
        return h.constructor = d,
        h.kill()._gc = !1,
        d.version = "1.11.8",
        h.invalidate = function() {
            return this._yoyo = this.vars.yoyo === !0,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._uncache(!0),
            a.prototype.invalidate.call(this)
        }
        ,
        h.addCallback = function(a, c, d, e) {
            return this.add(b.delayedCall(0, a, d, e), c)
        }
        ,
        h.removeCallback = function(a, b) {
            if (a)
                if (null == b)
                    this._kill(null, a);
                else
                    for (var c = this.getTweensOf(a, !1), d = c.length, e = this._parseTimeOrLabel(b); --d > -1; )
                        c[d]._startTime === e && c[d]._enabled(!1, !1);
            return this
        }
        ,
        h.tweenTo = function(a, c) {
            c = c || {};
            var d, e, h, i = {
                ease: g,
                overwrite: c.delay ? 2 : 1,
                useFrames: this.usesFrames(),
                immediateRender: !1
            };
            for (e in c)
                i[e] = c[e];
            return i.time = this._parseTimeOrLabel(a),
            d = Math.abs(Number(i.time) - this._time) / this._timeScale || .001,
            h = new b(this,d,i),
            i.onStart = function() {
                h.target.paused(!0),
                h.vars.time !== h.target.time() && d === h.duration() && h.duration(Math.abs(h.vars.time - h.target.time()) / h.target._timeScale),
                c.onStart && c.onStart.apply(c.onStartScope || h, c.onStartParams || f)
            }
            ,
            h
        }
        ,
        h.tweenFromTo = function(a, b, c) {
            c = c || {},
            a = this._parseTimeOrLabel(a),
            c.startAt = {
                onComplete: this.seek,
                onCompleteParams: [a],
                onCompleteScope: this
            },
            c.immediateRender = c.immediateRender !== !1;
            var d = this.tweenTo(b, c);
            return d.duration(Math.abs(d.vars.time - a) / this._timeScale || .001)
        }
        ,
        h.render = function(a, b, c) {
            this._gc && this._enabled(!0, !1);
            var d, g, h, i, j, k, l = this._dirty ? this.totalDuration() : this._totalDuration, m = this._duration, n = this._time, o = this._totalTime, p = this._startTime, q = this._timeScale, r = this._rawPrevTime, s = this._paused, t = this._cycle;
            if (a >= l ? (this._locked || (this._totalTime = l,
            this._cycle = this._repeat),
            this._reversed || this._hasPausedChild() || (g = !0,
            i = "onComplete",
            0 === this._duration && (0 === a || 0 > r || r === e) && r !== a && this._first && (j = !0,
            r > e && (i = "onReverseComplete"))),
            this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e,
            this._yoyo && 0 !== (1 & this._cycle) ? this._time = a = 0 : (this._time = m,
            a = m + 1e-4)) : 1e-7 > a ? (this._locked || (this._totalTime = this._cycle = 0),
            this._time = 0,
            (0 !== n || 0 === m && r !== e && (r > 0 || 0 > a && r >= 0) && !this._locked) && (i = "onReverseComplete",
            g = this._reversed),
            0 > a ? (this._active = !1,
            0 === m && r >= 0 && this._first && (j = !0),
            this._rawPrevTime = a) : (this._rawPrevTime = m || !b || a || this._rawPrevTime === a ? a : e,
            a = 0,
            this._initted || (j = !0))) : (0 === m && 0 > r && (j = !0),
            this._time = this._rawPrevTime = a,
            this._locked || (this._totalTime = a,
            0 !== this._repeat && (k = m + this._repeatDelay,
            this._cycle = this._totalTime / k >> 0,
            0 !== this._cycle && this._cycle === this._totalTime / k && this._cycle--,
            this._time = this._totalTime - this._cycle * k,
            this._yoyo && 0 !== (1 & this._cycle) && (this._time = m - this._time),
            this._time > m ? (this._time = m,
            a = m + 1e-4) : 0 > this._time ? this._time = a = 0 : a = this._time))),
            this._cycle !== t && !this._locked) {
                var u = this._yoyo && 0 !== (1 & t)
                  , v = u === (this._yoyo && 0 !== (1 & this._cycle))
                  , w = this._totalTime
                  , x = this._cycle
                  , y = this._rawPrevTime
                  , z = this._time;
                if (this._totalTime = t * m,
                t > this._cycle ? u = !u : this._totalTime += m,
                this._time = n,
                this._rawPrevTime = 0 === m ? r - 1e-4 : r,
                this._cycle = t,
                this._locked = !0,
                n = u ? 0 : m,
                this.render(n, b, 0 === m),
                b || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || f),
                v && (n = u ? m + 1e-4 : -1e-4,
                this.render(n, !0, !1)),
                this._locked = !1,
                this._paused && !s)
                    return;
                this._time = z,
                this._totalTime = w,
                this._cycle = x,
                this._rawPrevTime = y
            }
            if (!(this._time !== n && this._first || c || j))
                return void (o !== this._totalTime && this._onUpdate && (b || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || f)));
            if (this._initted || (this._initted = !0),
            this._active || !this._paused && this._totalTime !== o && a > 0 && (this._active = !0),
            0 === o && this.vars.onStart && 0 !== this._totalTime && (b || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || f)),
            this._time >= n)
                for (d = this._first; d && (h = d._next,
                !this._paused || s); )
                    (d._active || d._startTime <= this._time && !d._paused && !d._gc) && (d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)),
                    d = h;
            else
                for (d = this._last; d && (h = d._prev,
                !this._paused || s); )
                    (d._active || n >= d._startTime && !d._paused && !d._gc) && (d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)),
                    d = h;
            this._onUpdate && (b || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || f)),
            i && (this._locked || this._gc || (p === this._startTime || q !== this._timeScale) && (0 === this._time || l >= this.totalDuration()) && (g && (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
            this._active = !1),
            !b && this.vars[i] && this.vars[i].apply(this.vars[i + "Scope"] || this, this.vars[i + "Params"] || f)))
        }
        ,
        h.getActive = function(a, b, c) {
            null == a && (a = !0),
            null == b && (b = !0),
            null == c && (c = !1);
            var d, e, f = [], g = this.getChildren(a, b, c), h = 0, i = g.length;
            for (d = 0; i > d; d++)
                e = g[d],
                e.isActive() && (f[h++] = e);
            return f
        }
        ,
        h.getLabelAfter = function(a) {
            a || 0 !== a && (a = this._time);
            var b, c = this.getLabelsArray(), d = c.length;
            for (b = 0; d > b; b++)
                if (c[b].time > a)
                    return c[b].name;
            return null
        }
        ,
        h.getLabelBefore = function(a) {
            null == a && (a = this._time);
            for (var b = this.getLabelsArray(), c = b.length; --c > -1; )
                if (a > b[c].time)
                    return b[c].name;
            return null
        }
        ,
        h.getLabelsArray = function() {
            var a, b = [], c = 0;
            for (a in this._labels)
                b[c++] = {
                    time: this._labels[a],
                    name: a
                };
            return b.sort(function(a, b) {
                return a.time - b.time
            }),
            b
        }
        ,
        h.progress = function(a) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
        }
        ,
        h.totalProgress = function(a) {
            return arguments.length ? this.totalTime(this.totalDuration() * a, !1) : this._totalTime / this.totalDuration()
        }
        ,
        h.totalDuration = function(b) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((b - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (a.prototype.totalDuration.call(this),
            this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat),
            this._totalDuration)
        }
        ,
        h.time = function(a, b) {
            return arguments.length ? (this._dirty && this.totalDuration(),
            a > this._duration && (a = this._duration),
            this._yoyo && 0 !== (1 & this._cycle) ? a = this._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (a += this._cycle * (this._duration + this._repeatDelay)),
            this.totalTime(a, b)) : this._time
        }
        ,
        h.repeat = function(a) {
            return arguments.length ? (this._repeat = a,
            this._uncache(!0)) : this._repeat
        }
        ,
        h.repeatDelay = function(a) {
            return arguments.length ? (this._repeatDelay = a,
            this._uncache(!0)) : this._repeatDelay
        }
        ,
        h.yoyo = function(a) {
            return arguments.length ? (this._yoyo = a,
            this) : this._yoyo
        }
        ,
        h.currentLabel = function(a) {
            return arguments.length ? this.seek(a, !0) : this.getLabelBefore(this._time + 1e-8)
        }
        ,
        d
    }, !0),
    function() {
        var a = 180 / Math.PI
          , b = []
          , c = []
          , d = []
          , e = {}
          , f = function(a, b, c, d) {
            this.a = a,
            this.b = b,
            this.c = c,
            this.d = d,
            this.da = d - a,
            this.ca = c - a,
            this.ba = b - a
        }
          , g = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,"
          , h = function(a, b, c, d) {
            var e = {
                a: a
            }
              , f = {}
              , g = {}
              , h = {
                c: d
            }
              , i = (a + b) / 2
              , j = (b + c) / 2
              , k = (c + d) / 2
              , l = (i + j) / 2
              , m = (j + k) / 2
              , n = (m - l) / 8;
            return e.b = i + (a - i) / 4,
            f.b = l + n,
            e.c = f.a = (e.b + f.b) / 2,
            f.c = g.a = (l + m) / 2,
            g.b = m - n,
            h.b = k + (d - k) / 4,
            g.c = h.a = (g.b + h.b) / 2,
            [e, f, g, h]
        }
          , i = function(a, e, f, g, i) {
            var j, k, l, m, n, o, p, q, r, s, t, u, v, w = a.length - 1, x = 0, y = a[0].a;
            for (j = 0; w > j; j++)
                n = a[x],
                k = n.a,
                l = n.d,
                m = a[x + 1].d,
                i ? (t = b[j],
                u = c[j],
                v = .25 * (u + t) * e / (g ? .5 : d[j] || .5),
                o = l - (l - k) * (g ? .5 * e : 0 !== t ? v / t : 0),
                p = l + (m - l) * (g ? .5 * e : 0 !== u ? v / u : 0),
                q = l - (o + ((p - o) * (3 * t / (t + u) + .5) / 4 || 0))) : (o = l - .5 * (l - k) * e,
                p = l + .5 * (m - l) * e,
                q = l - (o + p) / 2),
                o += q,
                p += q,
                n.c = r = o,
                n.b = 0 !== j ? y : y = n.a + .6 * (n.c - n.a),
                n.da = l - k,
                n.ca = r - k,
                n.ba = y - k,
                f ? (s = h(k, y, r, l),
                a.splice(x, 1, s[0], s[1], s[2], s[3]),
                x += 4) : x++,
                y = p;
            n = a[x],
            n.b = y,
            n.c = y + .4 * (n.d - y),
            n.da = n.d - n.a,
            n.ca = n.c - n.a,
            n.ba = y - n.a,
            f && (s = h(n.a, y, n.c, n.d),
            a.splice(x, 1, s[0], s[1], s[2], s[3]))
        }
          , j = function(a, d, e, g) {
            var h, i, j, k, l, m, n = [];
            if (g)
                for (a = [g].concat(a),
                i = a.length; --i > -1; )
                    "string" == typeof (m = a[i][d]) && "=" === m.charAt(1) && (a[i][d] = g[d] + Number(m.charAt(0) + m.substr(2)));
            if (h = a.length - 2,
            0 > h)
                return n[0] = new f(a[0][d],0,0,a[-1 > h ? 0 : 1][d]),
                n;
            for (i = 0; h > i; i++)
                j = a[i][d],
                k = a[i + 1][d],
                n[i] = new f(j,0,0,k),
                e && (l = a[i + 2][d],
                b[i] = (b[i] || 0) + (k - j) * (k - j),
                c[i] = (c[i] || 0) + (l - k) * (l - k));
            return n[i] = new f(a[i][d],0,0,a[i + 1][d]),
            n
        }
          , k = function(a, f, h, k, l, m) {
            var n, o, p, q, r, s, t, u, v = {}, w = [], x = m || a[0];
            l = "string" == typeof l ? "," + l + "," : g,
            null == f && (f = 1);
            for (o in a[0])
                w.push(o);
            if (a.length > 1) {
                for (u = a[a.length - 1],
                t = !0,
                n = w.length; --n > -1; )
                    if (o = w[n],
                    Math.abs(x[o] - u[o]) > .05) {
                        t = !1;
                        break
                    }
                t && (a = a.concat(),
                m && a.unshift(m),
                a.push(a[1]),
                m = a[a.length - 3])
            }
            for (b.length = c.length = d.length = 0,
            n = w.length; --n > -1; )
                o = w[n],
                e[o] = -1 !== l.indexOf("," + o + ","),
                v[o] = j(a, o, e[o], m);
            for (n = b.length; --n > -1; )
                b[n] = Math.sqrt(b[n]),
                c[n] = Math.sqrt(c[n]);
            if (!k) {
                for (n = w.length; --n > -1; )
                    if (e[o])
                        for (p = v[w[n]],
                        s = p.length - 1,
                        q = 0; s > q; q++)
                            r = p[q + 1].da / c[q] + p[q].da / b[q],
                            d[q] = (d[q] || 0) + r * r;

                for (n = d.length; --n > -1; )
                    d[n] = Math.sqrt(d[n])
            }
            for (n = w.length,
            q = h ? 4 : 1; --n > -1; )
                o = w[n],
                p = v[o],
                i(p, f, h, k, e[o]),
                t && (p.splice(0, q),
                p.splice(p.length - q, q));
            return v
        }
          , l = function(a, b, c) {
            b = b || "soft";
            var d, e, g, h, i, j, k, l, m, n, o, p = {}, q = "cubic" === b ? 3 : 2, r = "soft" === b, s = [];
            if (r && c && (a = [c].concat(a)),
            null == a || q + 1 > a.length)
                throw "invalid Bezier data";
            for (m in a[0])
                s.push(m);
            for (j = s.length; --j > -1; ) {
                for (m = s[j],
                p[m] = i = [],
                n = 0,
                l = a.length,
                k = 0; l > k; k++)
                    d = null == c ? a[k][m] : "string" == typeof (o = a[k][m]) && "=" === o.charAt(1) ? c[m] + Number(o.charAt(0) + o.substr(2)) : Number(o),
                    r && k > 1 && l - 1 > k && (i[n++] = (d + i[n - 2]) / 2),
                    i[n++] = d;
                for (l = n - q + 1,
                n = 0,
                k = 0; l > k; k += q)
                    d = i[k],
                    e = i[k + 1],
                    g = i[k + 2],
                    h = 2 === q ? 0 : i[k + 3],
                    i[n++] = o = 3 === q ? new f(d,e,g,h) : new f(d,(2 * e + d) / 3,(2 * e + g) / 3,g);
                i.length = n
            }
            return p
        }
          , m = function(a, b, c) {
            for (var d, e, f, g, h, i, j, k, l, m, n, o = 1 / c, p = a.length; --p > -1; )
                for (m = a[p],
                f = m.a,
                g = m.d - f,
                h = m.c - f,
                i = m.b - f,
                d = e = 0,
                k = 1; c >= k; k++)
                    j = o * k,
                    l = 1 - j,
                    d = e - (e = (j * j * g + 3 * l * (j * h + l * i)) * j),
                    n = p * c + k - 1,
                    b[n] = (b[n] || 0) + d * d
        }
          , n = function(a, b) {
            b = b >> 0 || 6;
            var c, d, e, f, g = [], h = [], i = 0, j = 0, k = b - 1, l = [], n = [];
            for (c in a)
                m(a[c], g, b);
            for (e = g.length,
            d = 0; e > d; d++)
                i += Math.sqrt(g[d]),
                f = d % b,
                n[f] = i,
                f === k && (j += i,
                f = d / b >> 0,
                l[f] = n,
                h[f] = j,
                i = 0,
                n = []);
            return {
                length: j,
                lengths: h,
                segments: l
            }
        }
          , o = window._gsDefine.plugin({
            propName: "bezier",
            priority: -1,
            version: "1.3.2",
            API: 2,
            global: !0,
            init: function(a, b, c) {
                this._target = a,
                b instanceof Array && (b = {
                    values: b
                }),
                this._func = {},
                this._round = {},
                this._props = [],
                this._timeRes = null == b.timeResolution ? 6 : parseInt(b.timeResolution, 10);
                var d, e, f, g, h, i = b.values || [], j = {}, m = i[0], o = b.autoRotate || c.vars.orientToBezier;
                this._autoRotate = o ? o instanceof Array ? o : [["x", "y", "rotation", o === !0 ? 0 : Number(o) || 0]] : null;
                for (d in m)
                    this._props.push(d);
                for (f = this._props.length; --f > -1; )
                    d = this._props[f],
                    this._overwriteProps.push(d),
                    e = this._func[d] = "function" == typeof a[d],
                    j[d] = e ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)]() : parseFloat(a[d]),
                    h || j[d] !== i[0][d] && (h = j);
                if (this._beziers = "cubic" !== b.type && "quadratic" !== b.type && "soft" !== b.type ? k(i, isNaN(b.curviness) ? 1 : b.curviness, !1, "thruBasic" === b.type, b.correlate, h) : l(i, b.type, j),
                this._segCount = this._beziers[d].length,
                this._timeRes) {
                    var p = n(this._beziers, this._timeRes);
                    this._length = p.length,
                    this._lengths = p.lengths,
                    this._segments = p.segments,
                    this._l1 = this._li = this._s1 = this._si = 0,
                    this._l2 = this._lengths[0],
                    this._curSeg = this._segments[0],
                    this._s2 = this._curSeg[0],
                    this._prec = 1 / this._curSeg.length
                }
                if (o = this._autoRotate)
                    for (this._initialRotations = [],
                    o[0]instanceof Array || (this._autoRotate = o = [o]),
                    f = o.length; --f > -1; ) {
                        for (g = 0; 3 > g; g++)
                            d = o[f][g],
                            this._func[d] = "function" == typeof a[d] ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)] : !1;
                        d = o[f][2],
                        this._initialRotations[f] = this._func[d] ? this._func[d].call(this._target) : this._target[d]
                    }
                return this._startRatio = c.vars.runBackwards ? 1 : 0,
                !0
            },
            set: function(b) {
                var c, d, e, f, g, h, i, j, k, l, m = this._segCount, n = this._func, o = this._target, p = b !== this._startRatio;
                if (this._timeRes) {
                    if (k = this._lengths,
                    l = this._curSeg,
                    b *= this._length,
                    e = this._li,
                    b > this._l2 && m - 1 > e) {
                        for (j = m - 1; j > e && b >= (this._l2 = k[++e]); )
                            ;
                        this._l1 = k[e - 1],
                        this._li = e,
                        this._curSeg = l = this._segments[e],
                        this._s2 = l[this._s1 = this._si = 0]
                    } else if (this._l1 > b && e > 0) {
                        for (; e > 0 && (this._l1 = k[--e]) >= b; )
                            ;
                        0 === e && this._l1 > b ? this._l1 = 0 : e++,
                        this._l2 = k[e],
                        this._li = e,
                        this._curSeg = l = this._segments[e],
                        this._s1 = l[(this._si = l.length - 1) - 1] || 0,
                        this._s2 = l[this._si]
                    }
                    if (c = e,
                    b -= this._l1,
                    e = this._si,
                    b > this._s2 && l.length - 1 > e) {
                        for (j = l.length - 1; j > e && b >= (this._s2 = l[++e]); )
                            ;
                        this._s1 = l[e - 1],
                        this._si = e
                    } else if (this._s1 > b && e > 0) {
                        for (; e > 0 && (this._s1 = l[--e]) >= b; )
                            ;
                        0 === e && this._s1 > b ? this._s1 = 0 : e++,
                        this._s2 = l[e],
                        this._si = e
                    }
                    h = (e + (b - this._s1) / (this._s2 - this._s1)) * this._prec
                } else
                    c = 0 > b ? 0 : b >= 1 ? m - 1 : m * b >> 0,
                    h = (b - c * (1 / m)) * m;
                for (d = 1 - h,
                e = this._props.length; --e > -1; )
                    f = this._props[e],
                    g = this._beziers[f][c],
                    i = (h * h * g.da + 3 * d * (h * g.ca + d * g.ba)) * h + g.a,
                    this._round[f] && (i = Math.round(i)),
                    n[f] ? o[f](i) : o[f] = i;
                if (this._autoRotate) {
                    var q, r, s, t, u, v, w, x = this._autoRotate;
                    for (e = x.length; --e > -1; )
                        f = x[e][2],
                        v = x[e][3] || 0,
                        w = x[e][4] === !0 ? 1 : a,
                        g = this._beziers[x[e][0]],
                        q = this._beziers[x[e][1]],
                        g && q && (g = g[c],
                        q = q[c],
                        r = g.a + (g.b - g.a) * h,
                        t = g.b + (g.c - g.b) * h,
                        r += (t - r) * h,
                        t += (g.c + (g.d - g.c) * h - t) * h,
                        s = q.a + (q.b - q.a) * h,
                        u = q.b + (q.c - q.b) * h,
                        s += (u - s) * h,
                        u += (q.c + (q.d - q.c) * h - u) * h,
                        i = p ? Math.atan2(u - s, t - r) * w + v : this._initialRotations[e],
                        n[f] ? o[f](i) : o[f] = i)
                }
            }
        })
          , p = o.prototype;
        o.bezierThrough = k,
        o.cubicToQuadratic = h,
        o._autoCSS = !0,
        o.quadraticToCubic = function(a, b, c) {
            return new f(a,(2 * b + a) / 3,(2 * b + c) / 3,c)
        }
        ,
        o._cssRegister = function() {
            var a = window._gsDefine.globals.CSSPlugin;
            if (a) {
                var b = a._internals
                  , c = b._parseToProxy
                  , d = b._setPluginRatio
                  , e = b.CSSPropTween;
                b._registerComplexSpecialProp("bezier", {
                    parser: function(a, b, f, g, h, i) {
                        b instanceof Array && (b = {
                            values: b
                        }),
                        i = new o;
                        var j, k, l, m = b.values, n = m.length - 1, p = [], q = {};
                        if (0 > n)
                            return h;
                        for (j = 0; n >= j; j++)
                            l = c(a, m[j], g, h, i, n !== j),
                            p[j] = l.end;
                        for (k in b)
                            q[k] = b[k];
                        return q.values = p,
                        h = new e(a,"bezier",0,0,l.pt,2),
                        h.data = l,
                        h.plugin = i,
                        h.setRatio = d,
                        0 === q.autoRotate && (q.autoRotate = !0),
                        !q.autoRotate || q.autoRotate instanceof Array || (j = q.autoRotate === !0 ? 0 : Number(q.autoRotate),
                        q.autoRotate = null != l.end.left ? [["left", "top", "rotation", j, !1]] : null != l.end.x ? [["x", "y", "rotation", j, !1]] : !1),
                        q.autoRotate && (g._transform || g._enableTransforms(!1),
                        l.autoRotate = g._target._gsTransform),
                        i._onInitTween(l.proxy, q, g._tween),
                        h
                    }
                })
            }
        }
        ,
        p._roundProps = function(a, b) {
            for (var c = this._overwriteProps, d = c.length; --d > -1; )
                (a[c[d]] || a.bezier || a.bezierThrough) && (this._round[c[d]] = b)
        }
        ,
        p._kill = function(a) {
            var b, c, d = this._props;
            for (b in this._beziers)
                if (b in a)
                    for (delete this._beziers[b],
                    delete this._func[b],
                    c = d.length; --c > -1; )
                        d[c] === b && d.splice(c, 1);
            return this._super._kill.call(this, a)
        }
    }(),
    window._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(a, b) {
        var c, d, e, f, g = function() {
            a.call(this, "css"),
            this._overwriteProps.length = 0,
            this.setRatio = g.prototype.setRatio
        }, h = {}, i = g.prototype = new a("css");
        i.constructor = g,
        g.version = "1.11.8",
        g.API = 2,
        g.defaultTransformPerspective = 0,
        g.defaultSkewType = "compensated",
        i = "px",
        g.suffixMap = {
            top: i,
            right: i,
            bottom: i,
            left: i,
            width: i,
            height: i,
            fontSize: i,
            padding: i,
            margin: i,
            perspective: i,
            lineHeight: ""
        };
        var j, k, l, m, n, o, p = /(?:\d|\-\d|\.\d|\-\.\d)+/g, q = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g, r = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, s = /[^\d\-\.]/g, t = /(?:\d|\-|\+|=|#|\.)*/g, u = /opacity *= *([^)]*)/, v = /opacity:([^;]*)/, w = /alpha\(opacity *=.+?\)/i, x = /^(rgb|hsl)/, y = /([A-Z])/g, z = /-([a-z])/gi, A = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, B = function(a, b) {
            return b.toUpperCase()
        }, C = /(?:Left|Right|Width)/i, D = /(M11|M12|M21|M22)=[\d\-\.e]+/gi, E = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, F = /,(?=[^\)]*(?:\(|$))/gi, G = Math.PI / 180, H = 180 / Math.PI, I = {}, J = document, K = J.createElement("div"), L = J.createElement("img"), M = g._internals = {
            _specialProps: h
        }, N = navigator.userAgent, O = function() {
            var a, b = N.indexOf("Android"), c = J.createElement("div");
            return l = -1 !== N.indexOf("Safari") && -1 === N.indexOf("Chrome") && (-1 === b || Number(N.substr(b + 8, 1)) > 3),
            n = l && 6 > Number(N.substr(N.indexOf("Version/") + 8, 1)),
            m = -1 !== N.indexOf("Firefox"),
            /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(N) && (o = parseFloat(RegExp.$1)),
            c.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>",
            a = c.getElementsByTagName("a")[0],
            a ? /^0.55/.test(a.style.opacity) : !1
        }(), P = function(a) {
            return u.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
        }, Q = function(a) {
            window.console && void 0
        }, R = "", S = "", T = function(a, b) {
            b = b || K;
            var c, d, e = b.style;
            if (void 0 !== e[a])
                return a;
            for (a = a.charAt(0).toUpperCase() + a.substr(1),
            c = ["O", "Moz", "ms", "Ms", "Webkit"],
            d = 5; --d > -1 && void 0 === e[c[d] + a]; )
                ;
            return d >= 0 ? (S = 3 === d ? "ms" : c[d],
            R = "-" + S.toLowerCase() + "-",
            S + a) : null
        }, U = J.defaultView ? J.defaultView.getComputedStyle : function() {}
        , V = g.getStyle = function(a, b, c, d, e) {
            var f;
            return O || "opacity" !== b ? (!d && a.style[b] ? f = a.style[b] : (c = c || U(a, null)) ? f = c[b] || c.getPropertyValue(b) || c.getPropertyValue(b.replace(y, "-$1").toLowerCase()) : a.currentStyle && (f = a.currentStyle[b]),
            null == e || f && "none" !== f && "auto" !== f && "auto auto" !== f ? f : e) : P(a)
        }
        , W = M.convertToPixels = function(a, c, d, e, f) {
            if ("px" === e || !e)
                return d;
            if ("auto" === e || !d)
                return 0;
            var h, i, j, k = C.test(c), l = a, m = K.style, n = 0 > d;
            if (n && (d = -d),
            "%" === e && -1 !== c.indexOf("border"))
                h = d / 100 * (k ? a.clientWidth : a.clientHeight);
            else {
                if (m.cssText = "border:0 solid red;position:" + V(a, "position") + ";line-height:0;",
                "%" !== e && l.appendChild)
                    m[k ? "borderLeftWidth" : "borderTopWidth"] = d + e;
                else {
                    if (l = a.parentNode || J.body,
                    i = l._gsCache,
                    j = b.ticker.frame,
                    i && k && i.time === j)
                        return i.width * d / 100;
                    m[k ? "width" : "height"] = d + e
                }
                l.appendChild(K),
                h = parseFloat(K[k ? "offsetWidth" : "offsetHeight"]),
                l.removeChild(K),
                k && "%" === e && g.cacheWidths !== !1 && (i = l._gsCache = l._gsCache || {},
                i.time = j,
                i.width = 100 * (h / d)),
                0 !== h || f || (h = W(a, c, d, e, !0))
            }
            return n ? -h : h
        }
        , X = M.calculateOffset = function(a, b, c) {
            if ("absolute" !== V(a, "position", c))
                return 0;
            var d = "left" === b ? "Left" : "Top"
              , e = V(a, "margin" + d, c);
            return a["offset" + d] - (W(a, b, parseFloat(e), e.replace(t, "")) || 0)
        }
        , Y = function(a, b) {
            var c, d, e = {};
            if (b = b || U(a, null))
                if (c = b.length)
                    for (; --c > -1; )
                        e[b[c].replace(z, B)] = b.getPropertyValue(b[c]);
                else
                    for (c in b)
                        e[c] = b[c];
            else if (b = a.currentStyle || a.style)
                for (c in b)
                    "string" == typeof c && void 0 === e[c] && (e[c.replace(z, B)] = b[c]);
            return O || (e.opacity = P(a)),
            d = ya(a, b, !1),
            e.rotation = d.rotation,
            e.skewX = d.skewX,
            e.scaleX = d.scaleX,
            e.scaleY = d.scaleY,
            e.x = d.x,
            e.y = d.y,
            wa && (e.z = d.z,
            e.rotationX = d.rotationX,
            e.rotationY = d.rotationY,
            e.scaleZ = d.scaleZ),
            e.filters && delete e.filters,
            e
        }, Z = function(a, b, c, d, e) {
            var f, g, h, i = {}, j = a.style;
            for (g in c)
                "cssText" !== g && "length" !== g && isNaN(g) && (b[g] !== (f = c[g]) || e && e[g]) && -1 === g.indexOf("Origin") && ("number" == typeof f || "string" == typeof f) && (i[g] = "auto" !== f || "left" !== g && "top" !== g ? "" !== f && "auto" !== f && "none" !== f || "string" != typeof b[g] || "" === b[g].replace(s, "") ? f : 0 : X(a, g),
                void 0 !== j[g] && (h = new la(j,g,j[g],h)));
            if (d)
                for (g in d)
                    "className" !== g && (i[g] = d[g]);
            return {
                difs: i,
                firstMPT: h
            }
        }, $ = {
            width: ["Left", "Right"],
            height: ["Top", "Bottom"]
        }, _ = ["marginLeft", "marginRight", "marginTop", "marginBottom"], aa = function(a, b, c) {
            var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight)
              , e = $[b]
              , f = e.length;
            for (c = c || U(a, null); --f > -1; )
                d -= parseFloat(V(a, "padding" + e[f], c, !0)) || 0,
                d -= parseFloat(V(a, "border" + e[f] + "Width", c, !0)) || 0;
            return d
        }, ba = function(a, b) {
            (null == a || "" === a || "auto" === a || "auto auto" === a) && (a = "0 0");
            var c = a.split(" ")
              , d = -1 !== a.indexOf("left") ? "0%" : -1 !== a.indexOf("right") ? "100%" : c[0]
              , e = -1 !== a.indexOf("top") ? "0%" : -1 !== a.indexOf("bottom") ? "100%" : c[1];
            return null == e ? e = "0" : "center" === e && (e = "50%"),
            ("center" === d || isNaN(parseFloat(d)) && -1 === (d + "").indexOf("=")) && (d = "50%"),
            b && (b.oxp = -1 !== d.indexOf("%"),
            b.oyp = -1 !== e.indexOf("%"),
            b.oxr = "=" === d.charAt(1),
            b.oyr = "=" === e.charAt(1),
            b.ox = parseFloat(d.replace(s, "")),
            b.oy = parseFloat(e.replace(s, ""))),
            d + " " + e + (c.length > 2 ? " " + c[2] : "")
        }, ca = function(a, b) {
            return "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - parseFloat(b)
        }, da = function(a, b) {
            return null == a ? b : "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * Number(a.substr(2)) + b : parseFloat(a)
        }, ea = function(a, b, c, d) {
            var e, f, g, h, i = 1e-6;
            return null == a ? h = b : "number" == typeof a ? h = a : (e = 360,
            f = a.split("_"),
            g = Number(f[0].replace(s, "")) * (-1 === a.indexOf("rad") ? 1 : H) - ("=" === a.charAt(1) ? 0 : b),
            f.length && (d && (d[c] = b + g),
            -1 !== a.indexOf("short") && (g %= e,
            g !== g % (e / 2) && (g = 0 > g ? g + e : g - e)),
            -1 !== a.indexOf("_cw") && 0 > g ? g = (g + 9999999999 * e) % e - (0 | g / e) * e : -1 !== a.indexOf("ccw") && g > 0 && (g = (g - 9999999999 * e) % e - (0 | g / e) * e)),
            h = b + g),
            i > h && h > -i && (h = 0),
            h
        }, fa = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0]
        }, ga = function(a, b, c) {
            return a = 0 > a ? a + 1 : a > 1 ? a - 1 : a,
            0 | 255 * (1 > 6 * a ? b + 6 * (c - b) * a : .5 > a ? c : 2 > 3 * a ? b + 6 * (c - b) * (2 / 3 - a) : b) + .5
        }, ha = function(a) {
            var b, c, d, e, f, g;
            return a && "" !== a ? "number" == typeof a ? [a >> 16, 255 & a >> 8, 255 & a] : ("," === a.charAt(a.length - 1) && (a = a.substr(0, a.length - 1)),
            fa[a] ? fa[a] : "#" === a.charAt(0) ? (4 === a.length && (b = a.charAt(1),
            c = a.charAt(2),
            d = a.charAt(3),
            a = "#" + b + b + c + c + d + d),
            a = parseInt(a.substr(1), 16),
            [a >> 16, 255 & a >> 8, 255 & a]) : "hsl" === a.substr(0, 3) ? (a = a.match(p),
            e = Number(a[0]) % 360 / 360,
            f = Number(a[1]) / 100,
            g = Number(a[2]) / 100,
            c = .5 >= g ? g * (f + 1) : g + f - g * f,
            b = 2 * g - c,
            a.length > 3 && (a[3] = Number(a[3])),
            a[0] = ga(e + 1 / 3, b, c),
            a[1] = ga(e, b, c),
            a[2] = ga(e - 1 / 3, b, c),
            a) : (a = a.match(p) || fa.transparent,
            a[0] = Number(a[0]),
            a[1] = Number(a[1]),
            a[2] = Number(a[2]),
            a.length > 3 && (a[3] = Number(a[3])),
            a)) : fa.black
        }, ia = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
        for (i in fa)
            ia += "|" + i + "\\b";
        ia = RegExp(ia + ")", "gi");
        var ja = function(a, b, c, d) {
            if (null == a)
                return function(a) {
                    return a
                }
                ;
            var e, f = b ? (a.match(ia) || [""])[0] : "", g = a.split(f).join("").match(r) || [], h = a.substr(0, a.indexOf(g[0])), i = ")" === a.charAt(a.length - 1) ? ")" : "", j = -1 !== a.indexOf(" ") ? " " : ",", k = g.length, l = k > 0 ? g[0].replace(p, "") : "";
            return k ? e = b ? function(a) {
                var b, m, n, o;
                if ("number" == typeof a)
                    a += l;
                else if (d && F.test(a)) {
                    for (o = a.replace(F, "|").split("|"),
                    n = 0; o.length > n; n++)
                        o[n] = e(o[n]);
                    return o.join(",")
                }
                if (b = (a.match(ia) || [f])[0],
                m = a.split(b).join("").match(r) || [],
                n = m.length,
                k > n--)
                    for (; k > ++n; )
                        m[n] = c ? m[0 | (n - 1) / 2] : g[n];
                return h + m.join(j) + j + b + i + (-1 !== a.indexOf("inset") ? " inset" : "")
            }
            : function(a) {
                var b, f, m;
                if ("number" == typeof a)
                    a += l;
                else if (d && F.test(a)) {
                    for (f = a.replace(F, "|").split("|"),
                    m = 0; f.length > m; m++)
                        f[m] = e(f[m]);
                    return f.join(",")
                }
                if (b = a.match(r) || [],
                m = b.length,
                k > m--)
                    for (; k > ++m; )
                        b[m] = c ? b[0 | (m - 1) / 2] : g[m];
                return h + b.join(j) + i
            }
            : function(a) {
                return a
            }
        }
          , ka = function(a) {
            return a = a.split(","),
            function(b, c, d, e, f, g, h) {
                var i, j = (c + "").split(" ");
                for (h = {},
                i = 0; 4 > i; i++)
                    h[a[i]] = j[i] = j[i] || j[(i - 1) / 2 >> 0];
                return e.parse(b, h, f, g)
            }
        }
          , la = (M._setPluginRatio = function(a) {
            this.plugin.setRatio(a);
            for (var b, c, d, e, f = this.data, g = f.proxy, h = f.firstMPT, i = 1e-6; h; )
                b = g[h.v],
                h.r ? b = Math.round(b) : i > b && b > -i && (b = 0),
                h.t[h.p] = b,
                h = h._next;
            if (f.autoRotate && (f.autoRotate.rotation = g.rotation),
            1 === a)
                for (h = f.firstMPT; h; ) {
                    if (c = h.t,
                    c.type) {
                        if (1 === c.type) {
                            for (e = c.xs0 + c.s + c.xs1,
                            d = 1; c.l > d; d++)
                                e += c["xn" + d] + c["xs" + (d + 1)];
                            c.e = e
                        }
                    } else
                        c.e = c.s + c.xs0;
                    h = h._next
                }
        }
        ,
        function(a, b, c, d, e) {
            this.t = a,
            this.p = b,
            this.v = c,
            this.r = e,
            d && (d._prev = this,
            this._next = d)
        }
        )
          , ma = (M._parseToProxy = function(a, b, c, d, e, f) {
            var g, h, i, j, k, l = d, m = {}, n = {}, o = c._transform, p = I;
            for (c._transform = null,
            I = b,
            d = k = c.parse(a, b, d, e),
            I = p,
            f && (c._transform = o,
            l && (l._prev = null,
            l._prev && (l._prev._next = null))); d && d !== l; ) {
                if (1 >= d.type && (h = d.p,
                n[h] = d.s + d.c,
                m[h] = d.s,
                f || (j = new la(d,"s",h,j,d.r),
                d.c = 0),
                1 === d.type))
                    for (g = d.l; --g > 0; )
                        i = "xn" + g,
                        h = d.p + "_" + i,
                        n[h] = d.data[i],
                        m[h] = d[i],
                        f || (j = new la(d,i,h,j,d.rxp[i]));
                d = d._next
            }
            return {
                proxy: m,
                end: n,
                firstMPT: j,
                pt: k
            }
        }
        ,
        M.CSSPropTween = function(a, b, d, e, g, h, i, j, k, l, m) {
            this.t = a,
            this.p = b,
            this.s = d,
            this.c = e,
            this.n = i || b,
            a instanceof ma || f.push(this.n),
            this.r = j,
            this.type = h || 0,
            k && (this.pr = k,
            c = !0),
            this.b = void 0 === l ? d : l,
            this.e = void 0 === m ? d + e : m,
            g && (this._next = g,
            g._prev = this)
        }
        )
          , na = g.parseComplex = function(a, b, c, d, e, f, g, h, i, k) {
            c = c || f || "",
            g = new ma(a,b,0,0,g,k ? 2 : 1,null,!1,h,c,d),
            d += "";
            var l, m, n, o, r, s, t, u, v, w, y, z, A = c.split(", ").join(",").split(" "), B = d.split(", ").join(",").split(" "), C = A.length, D = j !== !1;
            for ((-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) && (A = A.join(" ").replace(F, ", ").split(" "),
            B = B.join(" ").replace(F, ", ").split(" "),
            C = A.length),
            C !== B.length && (A = (f || "").split(" "),
            C = A.length),
            g.plugin = i,
            g.setRatio = k,
            l = 0; C > l; l++)
                if (o = A[l],
                r = B[l],
                u = parseFloat(o),
                u || 0 === u)
                    g.appendXtra("", u, ca(r, u), r.replace(q, ""), D && -1 !== r.indexOf("px"), !0);
                else if (e && ("#" === o.charAt(0) || fa[o] || x.test(o)))
                    z = "," === r.charAt(r.length - 1) ? ")," : ")",
                    o = ha(o),
                    r = ha(r),
                    v = o.length + r.length > 6,
                    v && !O && 0 === r[3] ? (g["xs" + g.l] += g.l ? " transparent" : "transparent",
                    g.e = g.e.split(B[l]).join("transparent")) : (O || (v = !1),
                    g.appendXtra(v ? "rgba(" : "rgb(", o[0], r[0] - o[0], ",", !0, !0).appendXtra("", o[1], r[1] - o[1], ",", !0).appendXtra("", o[2], r[2] - o[2], v ? "," : z, !0),
                    v && (o = 4 > o.length ? 1 : o[3],
                    g.appendXtra("", o, (4 > r.length ? 1 : r[3]) - o, z, !1)));
                else if (s = o.match(p)) {
                    if (t = r.match(q),
                    !t || t.length !== s.length)
                        return g;
                    for (n = 0,
                    m = 0; s.length > m; m++)
                        y = s[m],
                        w = o.indexOf(y, n),
                        g.appendXtra(o.substr(n, w - n), Number(y), ca(t[m], y), "", D && "px" === o.substr(w + y.length, 2), 0 === m),
                        n = w + y.length;
                    g["xs" + g.l] += o.substr(n)
                } else
                    g["xs" + g.l] += g.l ? " " + o : o;
            if (-1 !== d.indexOf("=") && g.data) {
                for (z = g.xs0 + g.data.s,
                l = 1; g.l > l; l++)
                    z += g["xs" + l] + g.data["xn" + l];
                g.e = z + g["xs" + l]
            }
            return g.l || (g.type = -1,
            g.xs0 = g.e),
            g.xfirst || g
        }
          , oa = 9;
        for (i = ma.prototype,
        i.l = i.pr = 0; --oa > 0; )
            i["xn" + oa] = 0,
            i["xs" + oa] = "";
        i.xs0 = "",
        i._next = i._prev = i.xfirst = i.data = i.plugin = i.setRatio = i.rxp = null,
        i.appendXtra = function(a, b, c, d, e, f) {
            var g = this
              , h = g.l;
            return g["xs" + h] += f && h ? " " + a : a || "",
            c || 0 === h || g.plugin ? (g.l++,
            g.type = g.setRatio ? 2 : 1,
            g["xs" + g.l] = d || "",
            h > 0 ? (g.data["xn" + h] = b + c,
            g.rxp["xn" + h] = e,
            g["xn" + h] = b,
            g.plugin || (g.xfirst = new ma(g,"xn" + h,b,c,g.xfirst || g,0,g.n,e,g.pr),
            g.xfirst.xs0 = 0),
            g) : (g.data = {
                s: b + c
            },
            g.rxp = {},
            g.s = b,
            g.c = c,
            g.r = e,
            g)) : (g["xs" + h] += b + (d || ""),
            g)
        }
        ;
        var pa = function(a, b) {
            b = b || {},
            this.p = b.prefix ? T(a) || a : a,
            h[a] = h[this.p] = this,
            this.format = b.formatter || ja(b.defaultValue, b.color, b.collapsible, b.multi),
            b.parser && (this.parse = b.parser),
            this.clrs = b.color,
            this.multi = b.multi,
            this.keyword = b.keyword,
            this.dflt = b.defaultValue,
            this.pr = b.priority || 0
        }
          , qa = M._registerComplexSpecialProp = function(a, b, c) {
            "object" != typeof b && (b = {
                parser: c
            });
            var d, e, f = a.split(","), g = b.defaultValue;
            for (c = c || [g],
            d = 0; f.length > d; d++)
                b.prefix = 0 === d && b.prefix,
                b.defaultValue = c[d] || g,
                e = new pa(f[d],b)
        }
          , ra = function(a) {
            if (!h[a]) {
                var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
                qa(a, {
                    parser: function(a, c, d, e, f, g, i) {
                        var j = (window.GreenSockGlobals || window).com.greensock.plugins[b];
                        return j ? (j._cssRegister(),
                        h[d].parse(a, c, d, e, f, g, i)) : (Q("Error: " + b + " js file not loaded."),
                        f)
                    }
                })
            }
        };
        i = pa.prototype,
        i.parseComplex = function(a, b, c, d, e, f) {
            var g, h, i, j, k, l, m = this.keyword;
            if (this.multi && (F.test(c) || F.test(b) ? (h = b.replace(F, "|").split("|"),
            i = c.replace(F, "|").split("|")) : m && (h = [b],
            i = [c])),
            i) {
                for (j = i.length > h.length ? i.length : h.length,
                g = 0; j > g; g++)
                    b = h[g] = h[g] || this.dflt,
                    c = i[g] = i[g] || this.dflt,
                    m && (k = b.indexOf(m),
                    l = c.indexOf(m),
                    k !== l && (c = -1 === l ? i : h,
                    c[g] += " " + m));
                b = h.join(", "),
                c = i.join(", ")
            }
            return na(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f)
        }
        ,
        i.parse = function(a, b, c, d, f, g) {
            return this.parseComplex(a.style, this.format(V(a, this.p, e, !1, this.dflt)), this.format(b), f, g)
        }
        ,
        g.registerSpecialProp = function(a, b, c) {
            qa(a, {
                parser: function(a, d, e, f, g, h) {
                    var i = new ma(a,e,0,0,g,2,e,!1,c);
                    return i.plugin = h,
                    i.setRatio = b(a, d, f._tween, e),
                    i
                },
                priority: c
            })
        }
        ;
        var sa = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective".split(",")
          , ta = T("transform")
          , ua = R + "transform"
          , va = T("transformOrigin")
          , wa = null !== T("perspective")
          , xa = M.Transform = function() {
            this.skewY = 0
        }
          , ya = M.getTransform = function(a, b, c, d) {
            if (a._gsTransform && c && !d)
                return a._gsTransform;
            var e, f, h, i, j, k, l, m, n, o, p, q, r, s = c ? a._gsTransform || new xa : new xa, t = 0 > s.scaleX, u = 2e-5, v = 1e5, w = 179.99, x = w * G, y = wa ? parseFloat(V(a, va, b, !1, "0 0 0").split(" ")[2]) || s.zOrigin || 0 : 0;
            for (ta ? e = V(a, ua, b, !0) : a.currentStyle && (e = a.currentStyle.filter.match(D),
            e = e && 4 === e.length ? [e[0].substr(4), Number(e[2].substr(4)), Number(e[1].substr(4)), e[3].substr(4), s.x || 0, s.y || 0].join(",") : ""),
            f = (e || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [],
            h = f.length; --h > -1; )
                i = Number(f[h]),
                f[h] = (j = i - (i |= 0)) ? (0 | j * v + (0 > j ? -.5 : .5)) / v + i : i;
            if (16 === f.length) {
                var z = f[8]
                  , A = f[9]
                  , B = f[10]
                  , C = f[12]
                  , E = f[13]
                  , F = f[14];
                if (s.zOrigin && (F = -s.zOrigin,
                C = z * F - f[12],
                E = A * F - f[13],
                F = B * F + s.zOrigin - f[14]),
                !c || d || null == s.rotationX) {
                    var I, J, K, L, M, N, O, P = f[0], Q = f[1], R = f[2], S = f[3], T = f[4], U = f[5], W = f[6], X = f[7], Y = f[11], Z = Math.atan2(W, B), $ = -x > Z || Z > x;
                    s.rotationX = Z * H,
                    Z && (L = Math.cos(-Z),
                    M = Math.sin(-Z),
                    I = T * L + z * M,
                    J = U * L + A * M,
                    K = W * L + B * M,
                    z = T * -M + z * L,
                    A = U * -M + A * L,
                    B = W * -M + B * L,
                    Y = X * -M + Y * L,
                    T = I,
                    U = J,
                    W = K),
                    Z = Math.atan2(z, P),
                    s.rotationY = Z * H,
                    Z && (N = -x > Z || Z > x,
                    L = Math.cos(-Z),
                    M = Math.sin(-Z),
                    I = P * L - z * M,
                    J = Q * L - A * M,
                    K = R * L - B * M,
                    A = Q * M + A * L,
                    B = R * M + B * L,
                    Y = S * M + Y * L,
                    P = I,
                    Q = J,
                    R = K),
                    Z = Math.atan2(Q, U),
                    s.rotation = Z * H,
                    Z && (O = -x > Z || Z > x,
                    L = Math.cos(-Z),
                    M = Math.sin(-Z),
                    P = P * L + T * M,
                    J = Q * L + U * M,
                    U = Q * -M + U * L,
                    W = R * -M + W * L,
                    Q = J),
                    O && $ ? s.rotation = s.rotationX = 0 : O && N ? s.rotation = s.rotationY = 0 : N && $ && (s.rotationY = s.rotationX = 0),
                    s.scaleX = (0 | Math.sqrt(P * P + Q * Q) * v + .5) / v,
                    s.scaleY = (0 | Math.sqrt(U * U + A * A) * v + .5) / v,
                    s.scaleZ = (0 | Math.sqrt(W * W + B * B) * v + .5) / v,
                    s.skewX = 0,
                    s.perspective = Y ? 1 / (0 > Y ? -Y : Y) : 0,
                    s.x = C,
                    s.y = E,
                    s.z = F
                }
            } else if (!(wa && !d && f.length && s.x === f[4] && s.y === f[5] && (s.rotationX || s.rotationY) || void 0 !== s.x && "none" === V(a, "display", b))) {
                var _ = f.length >= 6
                  , aa = _ ? f[0] : 1
                  , ba = f[1] || 0
                  , ca = f[2] || 0
                  , da = _ ? f[3] : 1;
                s.x = f[4] || 0,
                s.y = f[5] || 0,
                k = Math.sqrt(aa * aa + ba * ba),
                l = Math.sqrt(da * da + ca * ca),
                m = aa || ba ? Math.atan2(ba, aa) * H : s.rotation || 0,
                n = ca || da ? Math.atan2(ca, da) * H + m : s.skewX || 0,
                o = k - Math.abs(s.scaleX || 0),
                p = l - Math.abs(s.scaleY || 0),
                Math.abs(n) > 90 && 270 > Math.abs(n) && (t ? (k *= -1,
                n += 0 >= m ? 180 : -180,
                m += 0 >= m ? 180 : -180) : (l *= -1,
                n += 0 >= n ? 180 : -180)),
                q = (m - s.rotation) % 180,
                r = (n - s.skewX) % 180,
                (void 0 === s.skewX || o > u || -u > o || p > u || -u > p || q > -w && w > q && !1 | q * v || r > -w && w > r && !1 | r * v) && (s.scaleX = k,
                s.scaleY = l,
                s.rotation = m,
                s.skewX = n),
                wa && (s.rotationX = s.rotationY = s.z = 0,
                s.perspective = parseFloat(g.defaultTransformPerspective) || 0,
                s.scaleZ = 1)
            }
            s.zOrigin = y;
            for (h in s)
                u > s[h] && s[h] > -u && (s[h] = 0);
            return c && (a._gsTransform = s),
            s
        }
          , za = function(a) {
            var b, c, d = this.data, e = -d.rotation * G, f = e + d.skewX * G, g = 1e5, h = (0 | Math.cos(e) * d.scaleX * g) / g, i = (0 | Math.sin(e) * d.scaleX * g) / g, j = (0 | Math.sin(f) * -d.scaleY * g) / g, k = (0 | Math.cos(f) * d.scaleY * g) / g, l = this.t.style, m = this.t.currentStyle;
            if (m) {
                c = i,
                i = -j,
                j = -c,
                b = m.filter,
                l.filter = "";
                var n, p, q = this.t.offsetWidth, r = this.t.offsetHeight, s = "absolute" !== m.position, v = "progid:DXImageTransform.Microsoft.Matrix(M11=" + h + ", M12=" + i + ", M21=" + j + ", M22=" + k, w = d.x, x = d.y;
                if (null != d.ox && (n = (d.oxp ? .01 * q * d.ox : d.ox) - q / 2,
                p = (d.oyp ? .01 * r * d.oy : d.oy) - r / 2,
                w += n - (n * h + p * i),
                x += p - (n * j + p * k)),
                s ? (n = q / 2,
                p = r / 2,
                v += ", Dx=" + (n - (n * h + p * i) + w) + ", Dy=" + (p - (n * j + p * k) + x) + ")") : v += ", sizingMethod='auto expand')",
                l.filter = -1 !== b.indexOf("DXImageTransform.Microsoft.Matrix(") ? b.replace(E, v) : v + " " + b,
                (0 === a || 1 === a) && 1 === h && 0 === i && 0 === j && 1 === k && (s && -1 === v.indexOf("Dx=0, Dy=0") || u.test(b) && 100 !== parseFloat(RegExp.$1) || -1 === b.indexOf("gradient(" && b.indexOf("Alpha")) && l.removeAttribute("filter")),
                !s) {
                    var y, z, A, B = 8 > o ? 1 : -1;
                    for (n = d.ieOffsetX || 0,
                    p = d.ieOffsetY || 0,
                    d.ieOffsetX = Math.round((q - ((0 > h ? -h : h) * q + (0 > i ? -i : i) * r)) / 2 + w),
                    d.ieOffsetY = Math.round((r - ((0 > k ? -k : k) * r + (0 > j ? -j : j) * q)) / 2 + x),
                    oa = 0; 4 > oa; oa++)
                        z = _[oa],
                        y = m[z],
                        c = -1 !== y.indexOf("px") ? parseFloat(y) : W(this.t, z, parseFloat(y), y.replace(t, "")) || 0,
                        A = c !== d[z] ? 2 > oa ? -d.ieOffsetX : -d.ieOffsetY : 2 > oa ? n - d.ieOffsetX : p - d.ieOffsetY,
                        l[z] = (d[z] = Math.round(c - A * (0 === oa || 2 === oa ? 1 : B))) + "px"
                }
            }
        }
          , Aa = M.set3DTransformRatio = function() {
            var a, b, c, d, e, f, g, h, i, j, k, l, n, o, p, q, r, s, t, u, v, w, x, y = this.data, z = this.t.style, A = y.rotation * G, B = y.scaleX, C = y.scaleY, D = y.scaleZ, E = y.perspective;
            if (m) {
                var F = 1e-4;
                F > B && B > -F && (B = D = 2e-5),
                F > C && C > -F && (C = D = 2e-5),
                !E || y.z || y.rotationX || y.rotationY || (E = 0)
            }
            if (A || y.skewX)
                s = Math.cos(A),
                t = Math.sin(A),
                a = s,
                e = t,
                y.skewX && (A -= y.skewX * G,
                s = Math.cos(A),
                t = Math.sin(A),
                "simple" === y.skewType && (u = Math.tan(y.skewX * G),
                u = Math.sqrt(1 + u * u),
                s *= u,
                t *= u)),
                b = -t,
                f = s;
            else {
                if (!(y.rotationY || y.rotationX || 1 !== D || E))
                    return void (z[ta] = "translate3d(" + y.x + "px," + y.y + "px," + y.z + "px)" + (1 !== B || 1 !== C ? " scale(" + B + "," + C + ")" : ""));
                a = f = 1,
                b = e = 0
            }
            k = 1,
            c = d = g = h = i = j = l = n = o = 0,
            p = E ? -1 / E : 0,
            q = y.zOrigin,
            r = 1e5,
            A = y.rotationY * G,
            A && (s = Math.cos(A),
            t = Math.sin(A),
            i = k * -t,
            n = p * -t,
            c = a * t,
            g = e * t,
            k *= s,
            p *= s,
            a *= s,
            e *= s),
            A = y.rotationX * G,
            A && (s = Math.cos(A),
            t = Math.sin(A),
            u = b * s + c * t,
            v = f * s + g * t,
            w = j * s + k * t,
            x = o * s + p * t,
            c = b * -t + c * s,
            g = f * -t + g * s,
            k = j * -t + k * s,
            p = o * -t + p * s,
            b = u,
            f = v,
            j = w,
            o = x),
            1 !== D && (c *= D,
            g *= D,
            k *= D,
            p *= D),
            1 !== C && (b *= C,
            f *= C,
            j *= C,
            o *= C),
            1 !== B && (a *= B,
            e *= B,
            i *= B,
            n *= B),
            q && (l -= q,
            d = c * l,
            h = g * l,
            l = k * l + q),
            d = (u = (d += y.x) - (d |= 0)) ? (0 | u * r + (0 > u ? -.5 : .5)) / r + d : d,
            h = (u = (h += y.y) - (h |= 0)) ? (0 | u * r + (0 > u ? -.5 : .5)) / r + h : h,
            l = (u = (l += y.z) - (l |= 0)) ? (0 | u * r + (0 > u ? -.5 : .5)) / r + l : l,
            z[ta] = "matrix3d(" + [(0 | a * r) / r, (0 | e * r) / r, (0 | i * r) / r, (0 | n * r) / r, (0 | b * r) / r, (0 | f * r) / r, (0 | j * r) / r, (0 | o * r) / r, (0 | c * r) / r, (0 | g * r) / r, (0 | k * r) / r, (0 | p * r) / r, d, h, l, E ? 1 + -l / E : 1].join(",") + ")"
        }
          , Ba = M.set2DTransformRatio = function(a) {
            var b, c, d, e, f, g = this.data, h = this.t, i = h.style;
            return g.rotationX || g.rotationY || g.z || g.force3D ? (this.setRatio = Aa,
            void Aa.call(this, a)) : void (g.rotation || g.skewX ? (b = g.rotation * G,
            c = b - g.skewX * G,
            d = 1e5,
            e = g.scaleX * d,
            f = g.scaleY * d,
            i[ta] = "matrix(" + (0 | Math.cos(b) * e) / d + "," + (0 | Math.sin(b) * e) / d + "," + (0 | Math.sin(c) * -f) / d + "," + (0 | Math.cos(c) * f) / d + "," + g.x + "," + g.y + ")") : i[ta] = "matrix(" + g.scaleX + ",0,0," + g.scaleY + "," + g.x + "," + g.y + ")")
        }
        ;
        qa("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType", {
            parser: function(a, b, c, d, f, h, i) {
                if (d._transform)
                    return f;
                var j, k, l, m, n, o, p, q = d._transform = ya(a, e, !0, i.parseTransform), r = a.style, s = 1e-6, t = sa.length, u = i, v = {};
                if ("string" == typeof u.transform && ta)
                    l = r.cssText,
                    r[ta] = u.transform,
                    r.display = "block",
                    j = ya(a, null, !1),
                    r.cssText = l;
                else if ("object" == typeof u) {
                    if (j = {
                        scaleX: da(null != u.scaleX ? u.scaleX : u.scale, q.scaleX),
                        scaleY: da(null != u.scaleY ? u.scaleY : u.scale, q.scaleY),
                        scaleZ: da(u.scaleZ, q.scaleZ),
                        x: da(u.x, q.x),
                        y: da(u.y, q.y),
                        z: da(u.z, q.z),
                        perspective: da(u.transformPerspective, q.perspective)
                    },
                    p = u.directionalRotation,
                    null != p)
                        if ("object" == typeof p)
                            for (l in p)
                                u[l] = p[l];
                        else
                            u.rotation = p;
                    j.rotation = ea("rotation"in u ? u.rotation : "shortRotation"in u ? u.shortRotation + "_short" : "rotationZ"in u ? u.rotationZ : q.rotation, q.rotation, "rotation", v),
                    wa && (j.rotationX = ea("rotationX"in u ? u.rotationX : "shortRotationX"in u ? u.shortRotationX + "_short" : q.rotationX || 0, q.rotationX, "rotationX", v),
                    j.rotationY = ea("rotationY"in u ? u.rotationY : "shortRotationY"in u ? u.shortRotationY + "_short" : q.rotationY || 0, q.rotationY, "rotationY", v)),
                    j.skewX = null == u.skewX ? q.skewX : ea(u.skewX, q.skewX),
                    j.skewY = null == u.skewY ? q.skewY : ea(u.skewY, q.skewY),
                    (k = j.skewY - q.skewY) && (j.skewX += k,
                    j.rotation += k)
                }
                for (wa && null != u.force3D && (q.force3D = u.force3D,
                o = !0),
                q.skewType = u.skewType || q.skewType || g.defaultSkewType,
                n = q.force3D || q.z || q.rotationX || q.rotationY || j.z || j.rotationX || j.rotationY || j.perspective,
                n || null == u.scale || (j.scaleZ = 1); --t > -1; )
                    c = sa[t],
                    m = j[c] - q[c],
                    (m > s || -s > m || null != I[c]) && (o = !0,
                    f = new ma(q,c,q[c],m,f),
                    c in v && (f.e = v[c]),
                    f.xs0 = 0,
                    f.plugin = h,
                    d._overwriteProps.push(f.n));
                return m = u.transformOrigin,
                (m || wa && n && q.zOrigin) && (ta ? (o = !0,
                c = va,
                m = (m || V(a, c, e, !1, "50% 50%")) + "",
                f = new ma(r,c,0,0,f,-1,"transformOrigin"),
                f.b = r[c],
                f.plugin = h,
                wa ? (l = q.zOrigin,
                m = m.split(" "),
                q.zOrigin = (m.length > 2 && (0 === l || "0px" !== m[2]) ? parseFloat(m[2]) : l) || 0,
                f.xs0 = f.e = r[c] = m[0] + " " + (m[1] || "50%") + " 0px",
                f = new ma(q,"zOrigin",0,0,f,-1,f.n),
                f.b = l,
                f.xs0 = f.e = q.zOrigin) : f.xs0 = f.e = r[c] = m) : ba(m + "", q)),
                o && (d._transformType = n || 3 === this._transformType ? 3 : 2),
                f
            },
            prefix: !0
        }),
        qa("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        }),
        qa("borderRadius", {
            defaultValue: "0px",
            parser: function(a, b, c, f, g) {
                b = this.format(b);
                var h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"], y = a.style;
                for (p = parseFloat(a.offsetWidth),
                q = parseFloat(a.offsetHeight),
                h = b.split(" "),
                i = 0; x.length > i; i++)
                    this.p.indexOf("border") && (x[i] = T(x[i])),
                    l = k = V(a, x[i], e, !1, "0px"),
                    -1 !== l.indexOf(" ") && (k = l.split(" "),
                    l = k[0],
                    k = k[1]),
                    m = j = h[i],
                    n = parseFloat(l),
                    s = l.substr((n + "").length),
                    t = "=" === m.charAt(1),
                    t ? (o = parseInt(m.charAt(0) + "1", 10),
                    m = m.substr(2),
                    o *= parseFloat(m),
                    r = m.substr((o + "").length - (0 > o ? 1 : 0)) || "") : (o = parseFloat(m),
                    r = m.substr((o + "").length)),
                    "" === r && (r = d[c] || s),
                    r !== s && (u = W(a, "borderLeft", n, s),
                    v = W(a, "borderTop", n, s),
                    "%" === r ? (l = 100 * (u / p) + "%",
                    k = 100 * (v / q) + "%") : "em" === r ? (w = W(a, "borderLeft", 1, "em"),
                    l = u / w + "em",
                    k = v / w + "em") : (l = u + "px",
                    k = v + "px"),
                    t && (m = parseFloat(l) + o + r,
                    j = parseFloat(k) + o + r)),
                    g = na(y, x[i], l + " " + k, m + " " + j, !1, "0px", g);
                return g
            },
            prefix: !0,
            formatter: ja("0px 0px 0px 0px", !1, !0)
        }),
        qa("backgroundPosition", {
            defaultValue: "0 0",
            parser: function(a, b, c, d, f, g) {
                var h, i, j, k, l, m, n = "background-position", p = e || U(a, null), q = this.format((p ? o ? p.getPropertyValue(n + "-x") + " " + p.getPropertyValue(n + "-y") : p.getPropertyValue(n) : a.currentStyle.backgroundPositionX + " " + a.currentStyle.backgroundPositionY) || "0 0"), r = this.format(b);
                if (-1 !== q.indexOf("%") != (-1 !== r.indexOf("%")) && (m = V(a, "backgroundImage").replace(A, ""),
                m && "none" !== m)) {
                    for (h = q.split(" "),
                    i = r.split(" "),
                    L.setAttribute("src", m),
                    j = 2; --j > -1; )
                        q = h[j],
                        k = -1 !== q.indexOf("%"),
                        k !== (-1 !== i[j].indexOf("%")) && (l = 0 === j ? a.offsetWidth - L.width : a.offsetHeight - L.height,
                        h[j] = k ? parseFloat(q) / 100 * l + "px" : 100 * (parseFloat(q) / l) + "%");
                    q = h.join(" ")
                }
                return this.parseComplex(a.style, q, r, f, g)
            },
            formatter: ba
        }),
        qa("backgroundSize", {
            defaultValue: "0 0",
            formatter: ba
        }),
        qa("perspective", {
            defaultValue: "0px",
            prefix: !0
        }),
        qa("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        }),
        qa("transformStyle", {
            prefix: !0
        }),
        qa("backfaceVisibility", {
            prefix: !0
        }),
        qa("userSelect", {
            prefix: !0
        }),
        qa("margin", {
            parser: ka("marginTop,marginRight,marginBottom,marginLeft")
        }),
        qa("padding", {
            parser: ka("paddingTop,paddingRight,paddingBottom,paddingLeft")
        }),
        qa("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function(a, b, c, d, f, g) {
                var h, i, j;
                return 9 > o ? (i = a.currentStyle,
                j = 8 > o ? " " : ",",
                h = "rect(" + i.clipTop + j + i.clipRight + j + i.clipBottom + j + i.clipLeft + ")",
                b = this.format(b).split(",").join(j)) : (h = this.format(V(a, this.p, e, !1, this.dflt)),
                b = this.format(b)),
                this.parseComplex(a.style, h, b, f, g)
            }
        }),
        qa("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        }),
        qa("autoRound,strictUnits", {
            parser: function(a, b, c, d, e) {
                return e
            }
        }),
        qa("border", {
            defaultValue: "0px solid #000",
            parser: function(a, b, c, d, f, g) {
                return this.parseComplex(a.style, this.format(V(a, "borderTopWidth", e, !1, "0px") + " " + V(a, "borderTopStyle", e, !1, "solid") + " " + V(a, "borderTopColor", e, !1, "#000")), this.format(b), f, g)
            },
            color: !0,
            formatter: function(a) {
                var b = a.split(" ");
                return b[0] + " " + (b[1] || "solid") + " " + (a.match(ia) || ["#000"])[0]
            }
        }),
        qa("borderWidth", {
            parser: ka("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
        }),
        qa("float,cssFloat,styleFloat", {
            parser: function(a, b, c, d, e) {
                var f = a.style
                  , g = "cssFloat"in f ? "cssFloat" : "styleFloat";
                return new ma(f,g,0,0,e,-1,c,!1,0,f[g],b)
            }
        });
        var Ca = function(a) {
            var b, c = this.t, d = c.filter || V(this.data, "filter"), e = 0 | this.s + this.c * a;
            100 === e && (-1 === d.indexOf("atrix(") && -1 === d.indexOf("radient(") && -1 === d.indexOf("oader(") ? (c.removeAttribute("filter"),
            b = !V(this.data, "filter")) : (c.filter = d.replace(w, ""),
            b = !0)),
            b || (this.xn1 && (c.filter = d = d || "alpha(opacity=" + e + ")"),
            -1 === d.indexOf("opacity") ? 0 === e && this.xn1 || (c.filter = d + " alpha(opacity=" + e + ")") : c.filter = d.replace(u, "opacity=" + e))
        };
        qa("opacity,alpha,autoAlpha", {
            defaultValue: "1",
            parser: function(a, b, c, d, f, g) {
                var h = parseFloat(V(a, "opacity", e, !1, "1"))
                  , i = a.style
                  , j = "autoAlpha" === c;
                return "string" == typeof b && "=" === b.charAt(1) && (b = ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h),
                j && 1 === h && "hidden" === V(a, "visibility", e) && 0 !== b && (h = 0),
                O ? f = new ma(i,"opacity",h,b - h,f) : (f = new ma(i,"opacity",100 * h,100 * (b - h),f),
                f.xn1 = j ? 1 : 0,
                i.zoom = 1,
                f.type = 2,
                f.b = "alpha(opacity=" + f.s + ")",
                f.e = "alpha(opacity=" + (f.s + f.c) + ")",
                f.data = a,
                f.plugin = g,
                f.setRatio = Ca),
                j && (f = new ma(i,"visibility",0,0,f,-1,null,!1,0,0 !== h ? "inherit" : "hidden",0 === b ? "hidden" : "inherit"),
                f.xs0 = "inherit",
                d._overwriteProps.push(f.n),
                d._overwriteProps.push(c)),
                f
            }
        });
        var Da = function(a, b) {
            b && (a.removeProperty ? ("ms" === b.substr(0, 2) && (b = "M" + b.substr(1)),
            a.removeProperty(b.replace(y, "-$1").toLowerCase())) : a.removeAttribute(b))
        }
          , Ea = function(a) {
            if (this.t._gsClassPT = this,
            1 === a || 0 === a) {
                this.t.className = 0 === a ? this.b : this.e;
                for (var b = this.data, c = this.t.style; b; )
                    b.v ? c[b.p] = b.v : Da(c, b.p),
                    b = b._next;
                1 === a && this.t._gsClassPT === this && (this.t._gsClassPT = null)
            } else
                this.t.className !== this.e && (this.t.className = this.e)
        };
        qa("className", {
            parser: function(a, b, d, f, g, h, i) {
                var j, k, l, m, n, o = a.className, p = a.style.cssText;
                if (g = f._classNamePT = new ma(a,d,0,0,g,2),
                g.setRatio = Ea,
                g.pr = -11,
                c = !0,
                g.b = o,
                k = Y(a, e),
                l = a._gsClassPT) {
                    for (m = {},
                    n = l.data; n; )
                        m[n.p] = 1,
                        n = n._next;
                    l.setRatio(1)
                }
                return a._gsClassPT = g,
                g.e = "=" !== b.charAt(1) ? b : o.replace(RegExp("\\s*\\b" + b.substr(2) + "\\b"), "") + ("+" === b.charAt(0) ? " " + b.substr(2) : ""),
                f._tween._duration && (a.className = g.e,
                j = Z(a, k, Y(a), i, m),
                a.className = o,
                g.data = j.firstMPT,
                a.style.cssText = p,
                g = g.xfirst = f.parse(a, j.difs, g, h)),
                g
            }
        });
        var Fa = function(a) {
            if ((1 === a || 0 === a) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                var b, c, d, e, f = this.t.style, g = h.transform.parse;
                if ("all" === this.e)
                    f.cssText = "",
                    e = !0;
                else
                    for (b = this.e.split(","),
                    d = b.length; --d > -1; )
                        c = b[d],
                        h[c] && (h[c].parse === g ? e = !0 : c = "transformOrigin" === c ? va : h[c].p),
                        Da(f, c);
                e && (Da(f, ta),
                this.t._gsTransform && delete this.t._gsTransform)
            }
        };
        for (qa("clearProps", {
            parser: function(a, b, d, e, f) {
                return f = new ma(a,d,0,0,f,2),
                f.setRatio = Fa,
                f.e = b,
                f.pr = -10,
                f.data = e._tween,
                c = !0,
                f
            }
        }),
        i = "bezier,throwProps,physicsProps,physics2D".split(","),
        oa = i.length; oa--; )
            ra(i[oa]);
        i = g.prototype,
        i._firstPT = null,
        i._onInitTween = function(a, b, h) {
            if (!a.nodeType)
                return !1;
            this._target = a,
            this._tween = h,
            this._vars = b,
            j = b.autoRound,
            c = !1,
            d = b.suffixMap || g.suffixMap,
            e = U(a, ""),
            f = this._overwriteProps;
            var i, m, o, p, q, r, s, t, u, w = a.style;
            if (k && "" === w.zIndex && (i = V(a, "zIndex", e),
            ("auto" === i || "" === i) && (w.zIndex = 0)),
            "string" == typeof b && (p = w.cssText,
            i = Y(a, e),
            w.cssText = p + ";" + b,
            i = Z(a, i, Y(a)).difs,
            !O && v.test(b) && (i.opacity = parseFloat(RegExp.$1)),
            b = i,
            w.cssText = p),
            this._firstPT = m = this.parse(a, b, null),
            this._transformType) {
                for (u = 3 === this._transformType,
                ta ? l && (k = !0,
                "" === w.zIndex && (s = V(a, "zIndex", e),
                ("auto" === s || "" === s) && (w.zIndex = 0)),
                n && (w.WebkitBackfaceVisibility = this._vars.WebkitBackfaceVisibility || (u ? "visible" : "hidden"))) : w.zoom = 1,
                o = m; o && o._next; )
                    o = o._next;
                t = new ma(a,"transform",0,0,null,2),
                this._linkCSSP(t, null, o),
                t.setRatio = u && wa ? Aa : ta ? Ba : za,
                t.data = this._transform || ya(a, e, !0),
                f.pop()
            }
            if (c) {
                for (; m; ) {
                    for (r = m._next,
                    o = p; o && o.pr > m.pr; )
                        o = o._next;
                    (m._prev = o ? o._prev : q) ? m._prev._next = m : p = m,
                    (m._next = o) ? o._prev = m : q = m,
                    m = r
                }
                this._firstPT = p
            }
            return !0
        }
        ,
        i.parse = function(a, b, c, f) {
            var g, i, k, l, m, n, o, p, q, r, s = a.style;
            for (g in b)
                n = b[g],
                i = h[g],
                i ? c = i.parse(a, n, g, this, c, f, b) : (m = V(a, g, e) + "",
                q = "string" == typeof n,
                "color" === g || "fill" === g || "stroke" === g || -1 !== g.indexOf("Color") || q && x.test(n) ? (q || (n = ha(n),
                n = (n.length > 3 ? "rgba(" : "rgb(") + n.join(",") + ")"),
                c = na(s, g, m, n, !0, "transparent", c, 0, f)) : !q || -1 === n.indexOf(" ") && -1 === n.indexOf(",") ? (k = parseFloat(m),
                o = k || 0 === k ? m.substr((k + "").length) : "",
                ("" === m || "auto" === m) && ("width" === g || "height" === g ? (k = aa(a, g, e),
                o = "px") : "left" === g || "top" === g ? (k = X(a, g, e),
                o = "px") : (k = "opacity" !== g ? 0 : 1,
                o = "")),
                r = q && "=" === n.charAt(1),
                r ? (l = parseInt(n.charAt(0) + "1", 10),
                n = n.substr(2),
                l *= parseFloat(n),
                p = n.replace(t, "")) : (l = parseFloat(n),
                p = q ? n.substr((l + "").length) || "" : ""),
                "" === p && (p = g in d ? d[g] : o),
                n = l || 0 === l ? (r ? l + k : l) + p : b[g],
                o !== p && "" !== p && (l || 0 === l) && k && (k = W(a, g, k, o),
                "%" === p ? (k /= W(a, g, 100, "%") / 100,
                b.strictUnits !== !0 && (m = k + "%")) : "em" === p ? k /= W(a, g, 1, "em") : "px" !== p && (l = W(a, g, l, p),
                p = "px"),
                r && (l || 0 === l) && (n = l + k + p)),
                r && (l += k),
                !k && 0 !== k || !l && 0 !== l ? void 0 !== s[g] && (n || "NaN" != n + "" && null != n) ? (c = new ma(s,g,l || k || 0,0,c,-1,g,!1,0,m,n),
                c.xs0 = "none" !== n || "display" !== g && -1 === g.indexOf("Style") ? n : m) : Q("invalid " + g + " tween value: " + b[g]) : (c = new ma(s,g,k,l - k,c,0,g,j !== !1 && ("px" === p || "zIndex" === g),0,m,n),
                c.xs0 = p)) : c = na(s, g, m, n, !0, null, c, 0, f)),
                f && c && !c.plugin && (c.plugin = f);
            return c
        }
        ,
        i.setRatio = function(a) {
            var b, c, d, e = this._firstPT, f = 1e-6;
            if (1 !== a || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                if (a || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                    for (; e; ) {
                        if (b = e.c * a + e.s,
                        e.r ? b = Math.round(b) : f > b && b > -f && (b = 0),
                        e.type)
                            if (1 === e.type)
                                if (d = e.l,
                                2 === d)
                                    e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2;
                                else if (3 === d)
                                    e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3;
                                else if (4 === d)
                                    e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4;
                                else if (5 === d)
                                    e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4 + e.xn4 + e.xs5;
                                else {
                                    for (c = e.xs0 + b + e.xs1,
                                    d = 1; e.l > d; d++)
                                        c += e["xn" + d] + e["xs" + (d + 1)];
                                    e.t[e.p] = c
                                }
                            else
                                -1 === e.type ? e.t[e.p] = e.xs0 : e.setRatio && e.setRatio(a);
                        else
                            e.t[e.p] = b + e.xs0;
                        e = e._next
                    }
                else
                    for (; e; )
                        2 !== e.type ? e.t[e.p] = e.b : e.setRatio(a),
                        e = e._next;
            else
                for (; e; )
                    2 !== e.type ? e.t[e.p] = e.e : e.setRatio(a),
                    e = e._next
        }
        ,
        i._enableTransforms = function(a) {
            this._transformType = a || 3 === this._transformType ? 3 : 2,
            this._transform = this._transform || ya(this._target, e, !0)
        }
        ,
        i._linkCSSP = function(a, b, c, d) {
            return a && (b && (b._prev = a),
            a._next && (a._next._prev = a._prev),
            a._prev ? a._prev._next = a._next : this._firstPT === a && (this._firstPT = a._next,
            d = !0),
            c ? c._next = a : d || null !== this._firstPT || (this._firstPT = a),
            a._next = b,
            a._prev = c),
            a
        }
        ,
        i._kill = function(b) {
            var c, d, e, f = b;
            if (b.autoAlpha || b.alpha) {
                f = {};
                for (d in b)
                    f[d] = b[d];
                f.opacity = 1,
                f.autoAlpha && (f.visibility = 1)
            }
            return b.className && (c = this._classNamePT) && (e = c.xfirst,
            e && e._prev ? this._linkCSSP(e._prev, c._next, e._prev._prev) : e === this._firstPT && (this._firstPT = c._next),
            c._next && this._linkCSSP(c._next, c._next._next, e._prev),
            this._classNamePT = null),
            a.prototype._kill.call(this, f)
        }
        ;
        var Ga = function(a, b, c) {
            var d, e, f, g;
            if (a.slice)
                for (e = a.length; --e > -1; )
                    Ga(a[e], b, c);
            else
                for (d = a.childNodes,
                e = d.length; --e > -1; )
                    f = d[e],
                    g = f.type,
                    f.style && (b.push(Y(f)),
                    c && c.push(f)),
                    1 !== g && 9 !== g && 11 !== g || !f.childNodes.length || Ga(f, b, c)
        };
        return g.cascadeTo = function(a, c, d) {
            var e, f, g, h = b.to(a, c, d), i = [h], j = [], k = [], l = [], m = b._internals.reservedProps;
            for (a = h._targets || h.target,
            Ga(a, j, l),
            h.render(c, !0),
            Ga(a, k),
            h.render(0, !0),
            h._enabled(!0),
            e = l.length; --e > -1; )
                if (f = Z(l[e], j[e], k[e]),
                f.firstMPT) {
                    f = f.difs;
                    for (g in d)
                        m[g] && (f[g] = d[g]);
                    i.push(b.to(l[e], c, f))
                }
            return i
        }
        ,
        a.activate([g]),
        g
    }, !0),
    function() {
        var a = window._gsDefine.plugin({
            propName: "roundProps",
            priority: -1,
            API: 2,
            init: function(a, b, c) {
                return this._tween = c,
                !0
            }
        })
          , b = a.prototype;
        b._onInitAllProps = function() {
            for (var a, b, c, d = this._tween, e = d.vars.roundProps instanceof Array ? d.vars.roundProps : d.vars.roundProps.split(","), f = e.length, g = {}, h = d._propLookup.roundProps; --f > -1; )
                g[e[f]] = 1;
            for (f = e.length; --f > -1; )
                for (a = e[f],
                b = d._firstPT; b; )
                    c = b._next,
                    b.pg ? b.t._roundProps(g, !0) : b.n === a && (this._add(b.t, a, b.s, b.c),
                    c && (c._prev = b._prev),
                    b._prev ? b._prev._next = c : d._firstPT === b && (d._firstPT = c),
                    b._next = b._prev = null,
                    d._propLookup[a] = h),
                    b = c;
            return !1
        }
        ,
        b._add = function(a, b, c, d) {
            this._addTween(a, b, c, c + d, b, !0),
            this._overwriteProps.push(b)
        }
    }(),
    window._gsDefine.plugin({
        propName: "attr",
        API: 2,
        version: "0.3.0",
        init: function(a, b, c) {
            var d, e, f;
            if ("function" != typeof a.setAttribute)
                return !1;
            this._target = a,
            this._proxy = {},
            this._start = {},
            this._end = {},
            this._endRatio = c.vars.runBackwards ? 0 : 1;
            for (d in b)
                this._start[d] = this._proxy[d] = e = a.getAttribute(d),
                this._end[d] = f = b[d],
                this._addTween(this._proxy, d, parseFloat(e), f, d),
                this._overwriteProps.push(d);
            return !0
        },
        set: function(a) {
            this._super.setRatio.call(this, a);
            for (var b, c = this._overwriteProps, d = c.length, e = 0 !== a && 1 !== a ? this._proxy : a === this._endRatio ? this._end : this._start; --d > -1; )
                b = c[d],
                this._target.setAttribute(b, e[b] + "")
        }
    }),
    window._gsDefine.plugin({
        propName: "directionalRotation",
        API: 2,
        version: "0.2.0",
        init: function(a, b) {
            "object" != typeof b && (b = {
                rotation: b
            }),
            this.finals = {};
            var c, d, e, f, g, h, i = b.useRadians === !0 ? 2 * Math.PI : 360, j = 1e-6;
            for (c in b)
                "useRadians" !== c && (h = (b[c] + "").split("_"),
                d = h[0],
                e = parseFloat("function" != typeof a[c] ? a[c] : a[c.indexOf("set") || "function" != typeof a["get" + c.substr(3)] ? c : "get" + c.substr(3)]()),
                f = this.finals[c] = "string" == typeof d && "=" === d.charAt(1) ? e + parseInt(d.charAt(0) + "1", 10) * Number(d.substr(2)) : Number(d) || 0,
                g = f - e,
                h.length && (d = h.join("_"),
                -1 !== d.indexOf("short") && (g %= i,
                g !== g % (i / 2) && (g = 0 > g ? g + i : g - i)),
                -1 !== d.indexOf("_cw") && 0 > g ? g = (g + 9999999999 * i) % i - (0 | g / i) * i : -1 !== d.indexOf("ccw") && g > 0 && (g = (g - 9999999999 * i) % i - (0 | g / i) * i)),
                (g > j || -j > g) && (this._addTween(a, c, e, e + g, c),
                this._overwriteProps.push(c)));
            return !0
        },
        set: function(a) {
            var b;
            if (1 !== a)
                this._super.setRatio.call(this, a);
            else
                for (b = this._firstPT; b; )
                    b.f ? b.t[b.p](this.finals[b.p]) : b.t[b.p] = this.finals[b.p],
                    b = b._next
        }
    })._autoCSS = !0,
    window._gsDefine("easing.Back", ["easing.Ease"], function(a) {
        var b, c, d, e = window.GreenSockGlobals || window, f = e.com.greensock, g = 2 * Math.PI, h = Math.PI / 2, i = f._class, j = function(b, c) {
            var d = i("easing." + b, function() {}, !0)
              , e = d.prototype = new a;
            return e.constructor = d,
            e.getRatio = c,
            d
        }, k = a.register || function() {}
        , l = function(a, b, c, d) {
            var e = i("easing." + a, {
                easeOut: new b,
                easeIn: new c,
                easeInOut: new d
            }, !0);
            return k(e, a),
            e
        }, m = function(a, b, c) {
            this.t = a,
            this.v = b,
            c && (this.next = c,
            c.prev = this,
            this.c = c.v - b,
            this.gap = c.t - a)
        }, n = function(b, c) {
            var d = i("easing." + b, function(a) {
                this._p1 = a || 0 === a ? a : 1.70158,
                this._p2 = 1.525 * this._p1
            }, !0)
              , e = d.prototype = new a;
            return e.constructor = d,
            e.getRatio = c,
            e.config = function(a) {
                return new d(a)
            }
            ,
            d
        }, o = l("Back", n("BackOut", function(a) {
            return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1
        }), n("BackIn", function(a) {
            return a * a * ((this._p1 + 1) * a - this._p1)
        }), n("BackInOut", function(a) {
            return 1 > (a *= 2) ? .5 * a * a * ((this._p2 + 1) * a - this._p2) : .5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2)
        })), p = i("easing.SlowMo", function(a, b, c) {
            b = b || 0 === b ? b : .7,
            null == a ? a = .7 : a > 1 && (a = 1),
            this._p = 1 !== a ? b : 0,
            this._p1 = (1 - a) / 2,
            this._p2 = a,
            this._p3 = this._p1 + this._p2,
            this._calcEnd = c === !0
        }, !0), q = p.prototype = new a;
        return q.constructor = p,
        q.getRatio = function(a) {
            var b = a + (.5 - a) * this._p;
            return this._p1 > a ? this._calcEnd ? 1 - (a = 1 - a / this._p1) * a : b - (a = 1 - a / this._p1) * a * a * a * b : a > this._p3 ? this._calcEnd ? 1 - (a = (a - this._p3) / this._p1) * a : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a : this._calcEnd ? 1 : b
        }
        ,
        p.ease = new p(.7,.7),
        q.config = p.config = function(a, b, c) {
            return new p(a,b,c)
        }
        ,
        b = i("easing.SteppedEase", function(a) {
            a = a || 1,
            this._p1 = 1 / a,
            this._p2 = a + 1
        }, !0),
        q = b.prototype = new a,
        q.constructor = b,
        q.getRatio = function(a) {
            return 0 > a ? a = 0 : a >= 1 && (a = .999999999),
            (this._p2 * a >> 0) * this._p1
        }
        ,
        q.config = b.config = function(a) {
            return new b(a)
        }
        ,
        c = i("easing.RoughEase", function(b) {
            b = b || {};
            for (var c, d, e, f, g, h, i = b.taper || "none", j = [], k = 0, l = 0 | (b.points || 20), n = l, o = b.randomize !== !1, p = b.clamp === !0, q = b.template instanceof a ? b.template : null, r = "number" == typeof b.strength ? .4 * b.strength : .4; --n > -1; )
                c = o ? Math.random() : 1 / l * n,
                d = q ? q.getRatio(c) : c,
                "none" === i ? e = r : "out" === i ? (f = 1 - c,
                e = f * f * r) : "in" === i ? e = c * c * r : .5 > c ? (f = 2 * c,
                e = .5 * f * f * r) : (f = 2 * (1 - c),
                e = .5 * f * f * r),
                o ? d += Math.random() * e - .5 * e : n % 2 ? d += .5 * e : d -= .5 * e,
                p && (d > 1 ? d = 1 : 0 > d && (d = 0)),
                j[k++] = {
                    x: c,
                    y: d
                };
            for (j.sort(function(a, b) {
                return a.x - b.x
            }),
            h = new m(1,1,null),
            n = l; --n > -1; )
                g = j[n],
                h = new m(g.x,g.y,h);
            this._prev = new m(0,0,0 !== h.t ? h : h.next)
        }, !0),
        q = c.prototype = new a,
        q.constructor = c,
        q.getRatio = function(a) {
            var b = this._prev;
            if (a > b.t) {
                for (; b.next && a >= b.t; )
                    b = b.next;
                b = b.prev
            } else
                for (; b.prev && b.t >= a; )
                    b = b.prev;
            return this._prev = b,
            b.v + (a - b.t) / b.gap * b.c
        }
        ,
        q.config = function(a) {
            return new c(a)
        }
        ,
        c.ease = new c,
        l("Bounce", j("BounceOut", function(a) {
            return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
        }), j("BounceIn", function(a) {
            return 1 / 2.75 > (a = 1 - a) ? 1 - 7.5625 * a * a : 2 / 2.75 > a ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375)
        }), j("BounceInOut", function(a) {
            var b = .5 > a;
            return a = b ? 1 - 2 * a : 2 * a - 1,
            a = 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375,
            b ? .5 * (1 - a) : .5 * a + .5
        })),
        l("Circ", j("CircOut", function(a) {
            return Math.sqrt(1 - (a -= 1) * a)
        }), j("CircIn", function(a) {
            return -(Math.sqrt(1 - a * a) - 1)
        }), j("CircInOut", function(a) {
            return 1 > (a *= 2) ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
        })),
        d = function(b, c, d) {
            var e = i("easing." + b, function(a, b) {
                this._p1 = a || 1,
                this._p2 = b || d,
                this._p3 = this._p2 / g * (Math.asin(1 / this._p1) || 0)
            }, !0)
              , f = e.prototype = new a;
            return f.constructor = e,
            f.getRatio = c,
            f.config = function(a, b) {
                return new e(a,b)
            }
            ,
            e
        }
        ,
        l("Elastic", d("ElasticOut", function(a) {
            return this._p1 * Math.pow(2, -10 * a) * Math.sin((a - this._p3) * g / this._p2) + 1
        }, .3), d("ElasticIn", function(a) {
            return -(this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * g / this._p2))
        }, .3), d("ElasticInOut", function(a) {
            return 1 > (a *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * g / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - this._p3) * g / this._p2) + 1
        }, .45)),
        l("Expo", j("ExpoOut", function(a) {
            return 1 - Math.pow(2, -10 * a)
        }), j("ExpoIn", function(a) {
            return Math.pow(2, 10 * (a - 1)) - .001
        }), j("ExpoInOut", function(a) {
            return 1 > (a *= 2) ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * (a - 1)))
        })),
        l("Sine", j("SineOut", function(a) {
            return Math.sin(a * h)
        }), j("SineIn", function(a) {
            return -Math.cos(a * h) + 1
        }), j("SineInOut", function(a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        })),
        i("easing.EaseLookup", {
            find: function(b) {
                return a.map[b]
            }
        }, !0),
        k(e.SlowMo, "SlowMo", "ease,"),
        k(c, "RoughEase", "ease,"),
        k(b, "SteppedEase", "ease,"),
        o
    }, !0)
}),
function(a) {
    "use strict";
    var b = a.GreenSockGlobals || a;
    if (!b.TweenLite) {
        var c, d, e, f, g, h = function(a) {
            var c, d = a.split("."), e = b;
            for (c = 0; d.length > c; c++)
                e[d[c]] = e = e[d[c]] || {};
            return e
        }, i = h("com.greensock"), j = 1e-10, k = [].slice, l = function() {}, m = function() {
            var a = Object.prototype.toString
              , b = a.call([]);
            return function(c) {
                return null != c && (c instanceof Array || "object" == typeof c && !!c.push && a.call(c) === b)
            }
        }(), n = {}, o = function(c, d, e, f) {
            this.sc = n[c] ? n[c].sc : [],
            n[c] = this,
            this.gsClass = null,
            this.func = e;
            var g = [];
            this.check = function(i) {
                for (var j, k, l, m, p = d.length, q = p; --p > -1; )
                    (j = n[d[p]] || new o(d[p],[])).gsClass ? (g[p] = j.gsClass,
                    q--) : i && j.sc.push(this);
                if (0 === q && e)
                    for (k = ("com.greensock." + c).split("."),
                    l = k.pop(),
                    m = h(k.join("."))[l] = this.gsClass = e.apply(e, g),
                    f && (b[l] = m,
                    "function" == typeof define && define.amd ? define((a.GreenSockAMDPath ? a.GreenSockAMDPath + "/" : "") + c.split(".").join("/"), [], function() {
                        return m
                    }) : "undefined" != typeof module && module.exports && (module.exports = m)),
                    p = 0; this.sc.length > p; p++)
                        this.sc[p].check()
            }
            ,
            this.check(!0)
        }, p = a._gsDefine = function(a, b, c, d) {
            return new o(a,b,c,d)
        }
        , q = i._class = function(a, b, c) {
            return b = b || function() {}
            ,
            p(a, [], function() {
                return b
            }, c),
            b
        }
        ;
        p.globals = b;
        var r = [0, 0, 1, 1]
          , s = []
          , t = q("easing.Ease", function(a, b, c, d) {
            this._func = a,
            this._type = c || 0,
            this._power = d || 0,
            this._params = b ? r.concat(b) : r
        }, !0)
          , u = t.map = {}
          , v = t.register = function(a, b, c, d) {
            for (var e, f, g, h, j = b.split(","), k = j.length, l = (c || "easeIn,easeOut,easeInOut").split(","); --k > -1; )
                for (f = j[k],
                e = d ? q("easing." + f, null, !0) : i.easing[f] || {},
                g = l.length; --g > -1; )
                    h = l[g],
                    u[f + "." + h] = u[h + f] = e[h] = a.getRatio ? a : a[h] || new a
        }
        ;
        for (e = t.prototype,
        e._calcEnd = !1,
        e.getRatio = function(a) {
            if (this._func)
                return this._params[0] = a,
                this._func.apply(null, this._params);
            var b = this._type
              , c = this._power
              , d = 1 === b ? 1 - a : 2 === b ? a : .5 > a ? 2 * a : 2 * (1 - a);
            return 1 === c ? d *= d : 2 === c ? d *= d * d : 3 === c ? d *= d * d * d : 4 === c && (d *= d * d * d * d),
            1 === b ? 1 - d : 2 === b ? d : .5 > a ? d / 2 : 1 - d / 2
        }
        ,
        c = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
        d = c.length; --d > -1; )
            e = c[d] + ",Power" + d,
            v(new t(null,null,1,d), e, "easeOut", !0),
            v(new t(null,null,2,d), e, "easeIn" + (0 === d ? ",easeNone" : "")),
            v(new t(null,null,3,d), e, "easeInOut");
        u.linear = i.easing.Linear.easeIn,
        u.swing = i.easing.Quad.easeInOut;
        var w = q("events.EventDispatcher", function(a) {
            this._listeners = {},
            this._eventTarget = a || this
        });
        e = w.prototype,
        e.addEventListener = function(a, b, c, d, e) {
            e = e || 0;
            var h, i, j = this._listeners[a], k = 0;
            for (null == j && (this._listeners[a] = j = []),
            i = j.length; --i > -1; )
                h = j[i],
                h.c === b && h.s === c ? j.splice(i, 1) : 0 === k && e > h.pr && (k = i + 1);
            j.splice(k, 0, {
                c: b,
                s: c,
                up: d,
                pr: e
            }),
            this !== f || g || f.wake()
        }
        ,
        e.removeEventListener = function(a, b) {
            var c, d = this._listeners[a];
            if (d)
                for (c = d.length; --c > -1; )
                    if (d[c].c === b)
                        return void d.splice(c, 1)
        }
        ,
        e.dispatchEvent = function(a) {
            var b, c, d, e = this._listeners[a];
            if (e)
                for (b = e.length,
                c = this._eventTarget; --b > -1; )
                    d = e[b],
                    d.up ? d.c.call(d.s || c, {
                        type: a,
                        target: c
                    }) : d.c.call(d.s || c)
        }
        ;
        var x = a.requestAnimationFrame
          , y = a.cancelAnimationFrame
          , z = Date.now || function() {
            return (new Date).getTime()
        }
          , A = z();
        for (c = ["ms", "moz", "webkit", "o"],
        d = c.length; --d > -1 && !x; )
            x = a[c[d] + "RequestAnimationFrame"],
            y = a[c[d] + "CancelAnimationFrame"] || a[c[d] + "CancelRequestAnimationFrame"];
        q("Ticker", function(a, b) {
            var c, d, e, h, i, j = this, k = z(), m = b !== !1 && x, n = function(a) {
                A = z(),
                j.time = (A - k) / 1e3;
                var b, f = j.time - i;
                (!c || f > 0 || a === !0) && (j.frame++,
                i += f + (f >= h ? .004 : h - f),
                b = !0),
                a !== !0 && (e = d(n)),
                b && j.dispatchEvent("tick")
            };
            w.call(j),
            j.time = j.frame = 0,
            j.tick = function() {
                n(!0)
            }
            ,
            j.sleep = function() {
                null != e && (m && y ? y(e) : clearTimeout(e),
                d = l,
                e = null,
                j === f && (g = !1))
            }
            ,
            j.wake = function() {
                null !== e && j.sleep(),
                d = 0 === c ? l : m && x ? x : function(a) {
                    return setTimeout(a, 0 | 1e3 * (i - j.time) + 1)
                }
                ,
                j === f && (g = !0),
                n(2)
            }
            ,
            j.fps = function(a) {
                return arguments.length ? (c = a,
                h = 1 / (c || 60),
                i = this.time + h,
                void j.wake()) : c
            }
            ,
            j.useRAF = function(a) {
                return arguments.length ? (j.sleep(),
                m = a,
                void j.fps(c)) : m
            }
            ,
            j.fps(a),
            setTimeout(function() {
                m && (!e || 5 > j.frame) && j.useRAF(!1)
            }, 1500)
        }),
        e = i.Ticker.prototype = new i.events.EventDispatcher,
        e.constructor = i.Ticker;
        var B = q("core.Animation", function(a, b) {
            if (this.vars = b = b || {},
            this._duration = this._totalDuration = a || 0,
            this._delay = Number(b.delay) || 0,
            this._timeScale = 1,
            this._active = b.immediateRender === !0,
            this.data = b.data,
            this._reversed = b.reversed === !0,
            O) {
                g || f.wake();
                var c = this.vars.useFrames ? N : O;
                c.add(this, c._time),
                this.vars.paused && this.paused(!0)
            }
        });
        f = B.ticker = new i.Ticker,
        e = B.prototype,
        e._dirty = e._gc = e._initted = e._paused = !1,
        e._totalTime = e._time = 0,
        e._rawPrevTime = -1,
        e._next = e._last = e._onUpdate = e._timeline = e.timeline = null,
        e._paused = !1;
        var C = function() {
            g && z() - A > 2e3 && f.wake(),
            setTimeout(C, 2e3)
        };
        C(),
        e.play = function(a, b) {
            return null != a && this.seek(a, b),
            this.reversed(!1).paused(!1)
        }
        ,
        e.pause = function(a, b) {
            return null != a && this.seek(a, b),
            this.paused(!0)
        }
        ,
        e.resume = function(a, b) {
            return null != a && this.seek(a, b),
            this.paused(!1)
        }
        ,
        e.seek = function(a, b) {
            return this.totalTime(Number(a), b !== !1)
        }
        ,
        e.restart = function(a, b) {
            return this.reversed(!1).paused(!1).totalTime(a ? -this._delay : 0, b !== !1, !0)
        }
        ,
        e.reverse = function(a, b) {
            return null != a && this.seek(a || this.totalDuration(), b),
            this.reversed(!0).paused(!1)
        }
        ,
        e.render = function() {}
        ,
        e.invalidate = function() {
            return this
        }
        ,
        e.isActive = function() {
            var a, b = this._timeline, c = this._startTime;
            return !b || !this._gc && !this._paused && b.isActive() && (a = b.rawTime()) >= c && c + this.totalDuration() / this._timeScale > a
        }
        ,
        e._enabled = function(a, b) {
            return g || f.wake(),
            this._gc = !a,
            this._active = this.isActive(),
            b !== !0 && (a && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !a && this.timeline && this._timeline._remove(this, !0)),
            !1
        }
        ,
        e._kill = function() {
            return this._enabled(!1, !1)
        }
        ,
        e.kill = function(a, b) {
            return this._kill(a, b),
            this
        }
        ,
        e._uncache = function(a) {
            for (var b = a ? this : this.timeline; b; )
                b._dirty = !0,
                b = b.timeline;
            return this
        }
        ,
        e._swapSelfInParams = function(a) {
            for (var b = a.length, c = a.concat(); --b > -1; )
                "{self}" === a[b] && (c[b] = this);
            return c
        }
        ,
        e.eventCallback = function(a, b, c, d) {
            if ("on" === (a || "").substr(0, 2)) {
                var e = this.vars;
                if (1 === arguments.length)
                    return e[a];
                null == b ? delete e[a] : (e[a] = b,
                e[a + "Params"] = m(c) && -1 !== c.join("").indexOf("{self}") ? this._swapSelfInParams(c) : c,
                e[a + "Scope"] = d),
                "onUpdate" === a && (this._onUpdate = b)
            }
            return this
        }
        ,
        e.delay = function(a) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay),
            this._delay = a,
            this) : this._delay
        }
        ,
        e.duration = function(a) {
            return arguments.length ? (this._duration = this._totalDuration = a,
            this._uncache(!0),
            this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== a && this.totalTime(this._totalTime * (a / this._duration), !0),
            this) : (this._dirty = !1,
            this._duration)
        }
        ,
        e.totalDuration = function(a) {
            return this._dirty = !1,
            arguments.length ? this.duration(a) : this._totalDuration
        }
        ,
        e.time = function(a, b) {
            return arguments.length ? (this._dirty && this.totalDuration(),
            this.totalTime(a > this._duration ? this._duration : a, b)) : this._time
        }
        ,
        e.totalTime = function(a, b, c) {
            if (g || f.wake(),
            !arguments.length)
                return this._totalTime;
            if (this._timeline) {
                if (0 > a && !c && (a += this.totalDuration()),
                this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var d = this._totalDuration
                      , e = this._timeline;
                    if (a > d && !c && (a = d),
                    this._startTime = (this._paused ? this._pauseTime : e._time) - (this._reversed ? d - a : a) / this._timeScale,
                    e._dirty || this._uncache(!1),
                    e._timeline)
                        for (; e._timeline; )
                            e._timeline._time !== (e._startTime + e._totalTime) / e._timeScale && e.totalTime(e._totalTime, !0),
                            e = e._timeline
                }
                this._gc && this._enabled(!0, !1),
                (this._totalTime !== a || 0 === this._duration) && this.render(a, b, !1)
            }
            return this
        }
        ,
        e.progress = e.totalProgress = function(a, b) {
            return arguments.length ? this.totalTime(this.duration() * a, b) : this._time / this.duration()
        }
        ,
        e.startTime = function(a) {
            return arguments.length ? (a !== this._startTime && (this._startTime = a,
            this.timeline && this.timeline._sortChildren && this.timeline.add(this, a - this._delay)),
            this) : this._startTime
        }
        ,
        e.timeScale = function(a) {
            if (!arguments.length)
                return this._timeScale;
            if (a = a || j,
            this._timeline && this._timeline.smoothChildTiming) {
                var b = this._pauseTime
                  , c = b || 0 === b ? b : this._timeline.totalTime();
                this._startTime = c - (c - this._startTime) * this._timeScale / a
            }
            return this._timeScale = a,
            this._uncache(!1)
        }
        ,
        e.reversed = function(a) {
            return arguments.length ? (a != this._reversed && (this._reversed = a,
            this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)),
            this) : this._reversed
        }
        ,
        e.paused = function(a) {
            if (!arguments.length)
                return this._paused;
            if (a != this._paused && this._timeline) {
                g || a || f.wake();
                var b = this._timeline
                  , c = b.rawTime()
                  , d = c - this._pauseTime;
                !a && b.smoothChildTiming && (this._startTime += d,
                this._uncache(!1)),
                this._pauseTime = a ? c : null,
                this._paused = a,
                this._active = this.isActive(),
                !a && 0 !== d && this._initted && this.duration() && this.render(b.smoothChildTiming ? this._totalTime : (c - this._startTime) / this._timeScale, !0, !0)
            }
            return this._gc && !a && this._enabled(!0, !1),
            this
        }
        ;
        var D = q("core.SimpleTimeline", function(a) {
            B.call(this, 0, a),
            this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        e = D.prototype = new B,
        e.constructor = D,
        e.kill()._gc = !1,
        e._first = e._last = null,
        e._sortChildren = !1,
        e.add = e.insert = function(a, b) {
            var c, d;
            if (a._startTime = Number(b || 0) + a._delay,
            a._paused && this !== a._timeline && (a._pauseTime = a._startTime + (this.rawTime() - a._startTime) / a._timeScale),
            a.timeline && a.timeline._remove(a, !0),
            a.timeline = a._timeline = this,
            a._gc && a._enabled(!0, !0),
            c = this._last,
            this._sortChildren)
                for (d = a._startTime; c && c._startTime > d; )
                    c = c._prev;
            return c ? (a._next = c._next,
            c._next = a) : (a._next = this._first,
            this._first = a),
            a._next ? a._next._prev = a : this._last = a,
            a._prev = c,
            this._timeline && this._uncache(!0),
            this
        }
        ,
        e._remove = function(a, b) {
            return a.timeline === this && (b || a._enabled(!1, !0),
            a.timeline = null,
            a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next),
            a._next ? a._next._prev = a._prev : this._last === a && (this._last = a._prev),
            this._timeline && this._uncache(!0)),
            this
        }
        ,
        e.render = function(a, b, c) {
            var d, e = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = a; e; )
                d = e._next,
                (e._active || a >= e._startTime && !e._paused) && (e._reversed ? e.render((e._dirty ? e.totalDuration() : e._totalDuration) - (a - e._startTime) * e._timeScale, b, c) : e.render((a - e._startTime) * e._timeScale, b, c)),
                e = d
        }
        ,
        e.rawTime = function() {
            return g || f.wake(),
            this._totalTime
        }
        ;
        var E = q("TweenLite", function(b, c, d) {
            if (B.call(this, c, d),
            this.render = E.prototype.render,
            null == b)
                throw "Cannot tween a null target.";
            this.target = b = "string" != typeof b ? b : E.selector(b) || b;
            var e, f, g, h = b.jquery || b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType), i = this.vars.overwrite;
            if (this._overwrite = i = null == i ? M[E.defaultOverwrite] : "number" == typeof i ? i >> 0 : M[i],
            (h || b instanceof Array || b.push && m(b)) && "number" != typeof b[0])
                for (this._targets = g = k.call(b, 0),
                this._propLookup = [],
                this._siblings = [],
                e = 0; g.length > e; e++)
                    f = g[e],
                    f ? "string" != typeof f ? f.length && f !== a && f[0] && (f[0] === a || f[0].nodeType && f[0].style && !f.nodeType) ? (g.splice(e--, 1),
                    this._targets = g = g.concat(k.call(f, 0))) : (this._siblings[e] = P(f, this, !1),
                    1 === i && this._siblings[e].length > 1 && Q(f, this, null, 1, this._siblings[e])) : (f = g[e--] = E.selector(f),
                    "string" == typeof f && g.splice(e + 1, 1)) : g.splice(e--, 1);
            else
                this._propLookup = {},
                this._siblings = P(b, this, !1),
                1 === i && this._siblings.length > 1 && Q(b, this, null, 1, this._siblings);
            (this.vars.immediateRender || 0 === c && 0 === this._delay && this.vars.immediateRender !== !1) && this.render(-this._delay, !1, !0)
        }, !0)
          , F = function(b) {
            return b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType)
        }
          , G = function(a, b) {
            var c, d = {};
            for (c in a)
                L[c] || c in b && "x" !== c && "y" !== c && "width" !== c && "height" !== c && "className" !== c && "border" !== c || !(!I[c] || I[c] && I[c]._autoCSS) || (d[c] = a[c],
                delete a[c]);
            a.css = d
        };
        e = E.prototype = new B,
        e.constructor = E,
        e.kill()._gc = !1,
        e.ratio = 0,
        e._firstPT = e._targets = e._overwrittenProps = e._startAt = null,
        e._notifyPluginsOfEnabled = !1,
        E.version = "1.11.8",
        E.defaultEase = e._ease = new t(null,null,1,1),
        E.defaultOverwrite = "auto",
        E.ticker = f,
        E.autoSleep = !0,
        E.selector = a.$ || a.jQuery || function(b) {
            return a.$ ? (E.selector = a.$,
            a.$(b)) : a.document ? a.document.getElementById("#" === b.charAt(0) ? b.substr(1) : b) : b
        }
        ;
        var H = E._internals = {
            isArray: m,
            isSelector: F
        }
          , I = E._plugins = {}
          , J = E._tweenLookup = {}
          , K = 0
          , L = H.reservedProps = {
            ease: 1,
            delay: 1,
            overwrite: 1,
            onComplete: 1,
            onCompleteParams: 1,
            onCompleteScope: 1,
            useFrames: 1,
            runBackwards: 1,
            startAt: 1,
            onUpdate: 1,
            onUpdateParams: 1,
            onUpdateScope: 1,
            onStart: 1,
            onStartParams: 1,
            onStartScope: 1,
            onReverseComplete: 1,
            onReverseCompleteParams: 1,
            onReverseCompleteScope: 1,
            onRepeat: 1,
            onRepeatParams: 1,
            onRepeatScope: 1,
            easeParams: 1,
            yoyo: 1,
            immediateRender: 1,
            repeat: 1,
            repeatDelay: 1,
            data: 1,
            paused: 1,
            reversed: 1,
            autoCSS: 1
        }
          , M = {
            none: 0,
            all: 1,
            auto: 2,
            concurrent: 3,
            allOnStart: 4,
            preexisting: 5,
            "true": 1,
            "false": 0
        }
          , N = B._rootFramesTimeline = new D
          , O = B._rootTimeline = new D;
        O._startTime = f.time,
        N._startTime = f.frame,
        O._active = N._active = !0,
        B._updateRoot = function() {
            if (O.render((f.time - O._startTime) * O._timeScale, !1, !1),
            N.render((f.frame - N._startTime) * N._timeScale, !1, !1),
            !(f.frame % 120)) {
                var a, b, c;
                for (c in J) {
                    for (b = J[c].tweens,
                    a = b.length; --a > -1; )
                        b[a]._gc && b.splice(a, 1);
                    0 === b.length && delete J[c]
                }
                if (c = O._first,
                (!c || c._paused) && E.autoSleep && !N._first && 1 === f._listeners.tick.length) {
                    for (; c && c._paused; )
                        c = c._next;
                    c || f.sleep()
                }
            }
        }
        ,
        f.addEventListener("tick", B._updateRoot);
        var P = function(a, b, c) {
            var d, e, f = a._gsTweenID;
            if (J[f || (a._gsTweenID = f = "t" + K++)] || (J[f] = {
                target: a,
                tweens: []
            }),
            b && (d = J[f].tweens,
            d[e = d.length] = b,
            c))
                for (; --e > -1; )
                    d[e] === b && d.splice(e, 1);
            return J[f].tweens
        }
          , Q = function(a, b, c, d, e) {
            var f, g, h, i;
            if (1 === d || d >= 4) {
                for (i = e.length,
                f = 0; i > f; f++)
                    if ((h = e[f]) !== b)
                        h._gc || h._enabled(!1, !1) && (g = !0);
                    else if (5 === d)
                        break;
                return g
            }
            var k, l = b._startTime + j, m = [], n = 0, o = 0 === b._duration;
            for (f = e.length; --f > -1; )
                (h = e[f]) === b || h._gc || h._paused || (h._timeline !== b._timeline ? (k = k || R(b, 0, o),
                0 === R(h, k, o) && (m[n++] = h)) : l >= h._startTime && h._startTime + h.totalDuration() / h._timeScale > l && ((o || !h._initted) && 2e-10 >= l - h._startTime || (m[n++] = h)));
            for (f = n; --f > -1; )
                h = m[f],
                2 === d && h._kill(c, a) && (g = !0),
                (2 !== d || !h._firstPT && h._initted) && h._enabled(!1, !1) && (g = !0);
            return g
        }
          , R = function(a, b, c) {
            for (var d = a._timeline, e = d._timeScale, f = a._startTime; d._timeline; ) {
                if (f += d._startTime,
                e *= d._timeScale,
                d._paused)
                    return -100;
                d = d._timeline
            }
            return f /= e,
            f > b ? f - b : c && f === b || !a._initted && 2 * j > f - b ? j : (f += a.totalDuration() / a._timeScale / e) > b + j ? 0 : f - b - j
        };
        e._init = function() {
            var a, b, c, d, e = this.vars, f = this._overwrittenProps, g = this._duration, h = e.immediateRender, i = e.ease;
            if (e.startAt) {
                if (this._startAt && this._startAt.render(-1, !0),
                e.startAt.overwrite = 0,
                e.startAt.immediateRender = !0,
                this._startAt = E.to(this.target, 0, e.startAt),
                h)
                    if (this._time > 0)
                        this._startAt = null;
                    else if (0 !== g)
                        return
            } else if (e.runBackwards && 0 !== g)
                if (this._startAt)
                    this._startAt.render(-1, !0),
                    this._startAt = null;
                else {
                    c = {};
                    for (d in e)
                        L[d] && "autoCSS" !== d || (c[d] = e[d]);
                    if (c.overwrite = 0,
                    c.data = "isFromStart",
                    this._startAt = E.to(this.target, 0, c),
                    e.immediateRender) {
                        if (0 === this._time)
                            return
                    } else
                        this._startAt.render(-1, !0)
                }
            if (this._ease = i ? i instanceof t ? e.easeParams instanceof Array ? i.config.apply(i, e.easeParams) : i : "function" == typeof i ? new t(i,e.easeParams) : u[i] || E.defaultEase : E.defaultEase,
            this._easeType = this._ease._type,
            this._easePower = this._ease._power,
            this._firstPT = null,
            this._targets)
                for (a = this._targets.length; --a > -1; )
                    this._initProps(this._targets[a], this._propLookup[a] = {}, this._siblings[a], f ? f[a] : null) && (b = !0);
            else
                b = this._initProps(this.target, this._propLookup, this._siblings, f);
            if (b && E._onPluginEvent("_onInitAllProps", this),
            f && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)),
            e.runBackwards)
                for (c = this._firstPT; c; )
                    c.s += c.c,
                    c.c = -c.c,
                    c = c._next;
            this._onUpdate = e.onUpdate,
            this._initted = !0
        }
        ,
        e._initProps = function(b, c, d, e) {
            var f, g, h, i, j, k;
            if (null == b)
                return !1;
            this.vars.css || b.style && b !== a && b.nodeType && I.css && this.vars.autoCSS !== !1 && G(this.vars, b);
            for (f in this.vars) {
                if (k = this.vars[f],
                L[f])
                    k && (k instanceof Array || k.push && m(k)) && -1 !== k.join("").indexOf("{self}") && (this.vars[f] = k = this._swapSelfInParams(k, this));
                else if (I[f] && (i = new I[f])._onInitTween(b, this.vars[f], this)) {
                    for (this._firstPT = j = {
                        _next: this._firstPT,
                        t: i,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: !0,
                        n: f,
                        pg: !0,
                        pr: i._priority
                    },
                    g = i._overwriteProps.length; --g > -1; )
                        c[i._overwriteProps[g]] = this._firstPT;
                    (i._priority || i._onInitAllProps) && (h = !0),
                    (i._onDisable || i._onEnable) && (this._notifyPluginsOfEnabled = !0)
                } else
                    this._firstPT = c[f] = j = {
                        _next: this._firstPT,
                        t: b,
                        p: f,
                        f: "function" == typeof b[f],
                        n: f,
                        pg: !1,
                        pr: 0
                    },
                    j.s = j.f ? b[f.indexOf("set") || "function" != typeof b["get" + f.substr(3)] ? f : "get" + f.substr(3)]() : parseFloat(b[f]),
                    j.c = "string" == typeof k && "=" === k.charAt(1) ? parseInt(k.charAt(0) + "1", 10) * Number(k.substr(2)) : Number(k) - j.s || 0;
                j && j._next && (j._next._prev = j)
            }
            return e && this._kill(e, b) ? this._initProps(b, c, d, e) : this._overwrite > 1 && this._firstPT && d.length > 1 && Q(b, this, c, this._overwrite, d) ? (this._kill(c, b),
            this._initProps(b, c, d, e)) : h
        }
        ,
        e.render = function(a, b, c) {
            var d, e, f, g, h = this._time, i = this._duration;
            if (a >= i)
                this._totalTime = this._time = i,
                this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1,
                this._reversed || (d = !0,
                e = "onComplete"),
                0 === i && (g = this._rawPrevTime,
                this._startTime === this._timeline._duration && (a = 0),
                (0 === a || 0 > g || g === j) && g !== a && (c = !0,
                g > j && (e = "onReverseComplete")),
                this._rawPrevTime = g = !b || a || this._rawPrevTime === a ? a : j);
            else if (1e-7 > a)
                this._totalTime = this._time = 0,
                this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0,
                (0 !== h || 0 === i && this._rawPrevTime > 0 && this._rawPrevTime !== j) && (e = "onReverseComplete",
                d = this._reversed),
                0 > a ? (this._active = !1,
                0 === i && (this._rawPrevTime >= 0 && (c = !0),
                this._rawPrevTime = g = !b || a || this._rawPrevTime === a ? a : j)) : this._initted || (c = !0);
            else if (this._totalTime = this._time = a,
            this._easeType) {
                var k = a / i
                  , l = this._easeType
                  , m = this._easePower;
                (1 === l || 3 === l && k >= .5) && (k = 1 - k),
                3 === l && (k *= 2),
                1 === m ? k *= k : 2 === m ? k *= k * k : 3 === m ? k *= k * k * k : 4 === m && (k *= k * k * k * k),
                this.ratio = 1 === l ? 1 - k : 2 === l ? k : .5 > a / i ? k / 2 : 1 - k / 2
            } else
                this.ratio = this._ease.getRatio(a / i);
            if (this._time !== h || c) {
                if (!this._initted) {
                    if (this._init(),
                    !this._initted || this._gc)
                        return;
                    this._time && !d ? this.ratio = this._ease.getRatio(this._time / i) : d && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (this._active || !this._paused && this._time !== h && a >= 0 && (this._active = !0),
                0 === h && (this._startAt && (a >= 0 ? this._startAt.render(a, b, c) : e || (e = "_dummyGS")),
                this.vars.onStart && (0 !== this._time || 0 === i) && (b || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || s))),
                f = this._firstPT; f; )
                    f.f ? f.t[f.p](f.c * this.ratio + f.s) : f.t[f.p] = f.c * this.ratio + f.s,
                    f = f._next;
                this._onUpdate && (0 > a && this._startAt && this._startTime && this._startAt.render(a, b, c),
                b || (this._time !== h || d) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || s)),
                e && (this._gc || (0 > a && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(a, b, c),
                d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                this._active = !1),
                !b && this.vars[e] && this.vars[e].apply(this.vars[e + "Scope"] || this, this.vars[e + "Params"] || s),
                0 === i && this._rawPrevTime === j && g !== j && (this._rawPrevTime = 0)))
            }
        }
        ,
        e._kill = function(a, b) {
            if ("all" === a && (a = null),
            null == a && (null == b || b === this.target))
                return this._enabled(!1, !1);
            b = "string" != typeof b ? b || this._targets || this.target : E.selector(b) || b;
            var c, d, e, f, g, h, i, j;
            if ((m(b) || F(b)) && "number" != typeof b[0])
                for (c = b.length; --c > -1; )
                    this._kill(a, b[c]) && (h = !0);
            else {
                if (this._targets) {
                    for (c = this._targets.length; --c > -1; )
                        if (b === this._targets[c]) {
                            g = this._propLookup[c] || {},
                            this._overwrittenProps = this._overwrittenProps || [],
                            d = this._overwrittenProps[c] = a ? this._overwrittenProps[c] || {} : "all";
                            break
                        }
                } else {
                    if (b !== this.target)
                        return !1;
                    g = this._propLookup,
                    d = this._overwrittenProps = a ? this._overwrittenProps || {} : "all"
                }
                if (g) {
                    i = a || g,
                    j = a !== d && "all" !== d && a !== g && ("object" != typeof a || !a._tempKill);
                    for (e in i)
                        (f = g[e]) && (f.pg && f.t._kill(i) && (h = !0),
                        f.pg && 0 !== f.t._overwriteProps.length || (f._prev ? f._prev._next = f._next : f === this._firstPT && (this._firstPT = f._next),
                        f._next && (f._next._prev = f._prev),
                        f._next = f._prev = null),
                        delete g[e]),
                        j && (d[e] = 1);
                    !this._firstPT && this._initted && this._enabled(!1, !1)
                }
            }
            return h
        }
        ,
        e.invalidate = function() {
            return this._notifyPluginsOfEnabled && E._onPluginEvent("_onDisable", this),
            this._firstPT = null,
            this._overwrittenProps = null,
            this._onUpdate = null,
            this._startAt = null,
            this._initted = this._active = this._notifyPluginsOfEnabled = !1,
            this._propLookup = this._targets ? {} : [],
            this
        }
        ,
        e._enabled = function(a, b) {
            if (g || f.wake(),
            a && this._gc) {
                var c, d = this._targets;
                if (d)
                    for (c = d.length; --c > -1; )
                        this._siblings[c] = P(d[c], this, !0);
                else
                    this._siblings = P(this.target, this, !0)
            }
            return B.prototype._enabled.call(this, a, b),
            this._notifyPluginsOfEnabled && this._firstPT ? E._onPluginEvent(a ? "_onEnable" : "_onDisable", this) : !1
        }
        ,
        E.to = function(a, b, c) {
            return new E(a,b,c)
        }
        ,
        E.from = function(a, b, c) {
            return c.runBackwards = !0,
            c.immediateRender = 0 != c.immediateRender,
            new E(a,b,c)
        }
        ,
        E.fromTo = function(a, b, c, d) {
            return d.startAt = c,
            d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender,
            new E(a,b,d)
        }
        ,
        E.delayedCall = function(a, b, c, d, e) {
            return new E(b,0,{
                delay: a,
                onComplete: b,
                onCompleteParams: c,
                onCompleteScope: d,
                onReverseComplete: b,
                onReverseCompleteParams: c,
                onReverseCompleteScope: d,
                immediateRender: !1,
                useFrames: e,
                overwrite: 0
            })
        }
        ,
        E.set = function(a, b) {
            return new E(a,0,b)
        }
        ,
        E.getTweensOf = function(a, b) {
            if (null == a)
                return [];
            a = "string" != typeof a ? a : E.selector(a) || a;
            var c, d, e, f;
            if ((m(a) || F(a)) && "number" != typeof a[0]) {
                for (c = a.length,
                d = []; --c > -1; )
                    d = d.concat(E.getTweensOf(a[c], b));
                for (c = d.length; --c > -1; )
                    for (f = d[c],
                    e = c; --e > -1; )
                        f === d[e] && d.splice(c, 1)
            } else
                for (d = P(a).concat(),
                c = d.length; --c > -1; )
                    (d[c]._gc || b && !d[c].isActive()) && d.splice(c, 1);
            return d
        }
        ,
        E.killTweensOf = E.killDelayedCallsTo = function(a, b, c) {
            "object" == typeof b && (c = b,
            b = !1);
            for (var d = E.getTweensOf(a, b), e = d.length; --e > -1; )
                d[e]._kill(c, a)
        }
        ;
        var S = q("plugins.TweenPlugin", function(a, b) {
            this._overwriteProps = (a || "").split(","),
            this._propName = this._overwriteProps[0],
            this._priority = b || 0,
            this._super = S.prototype
        }, !0);
        if (e = S.prototype,
        S.version = "1.10.1",
        S.API = 2,
        e._firstPT = null,
        e._addTween = function(a, b, c, d, e, f) {
            var g, h;
            return null != d && (g = "number" == typeof d || "=" !== d.charAt(1) ? Number(d) - c : parseInt(d.charAt(0) + "1", 10) * Number(d.substr(2))) ? (this._firstPT = h = {
                _next: this._firstPT,
                t: a,
                p: b,
                s: c,
                c: g,
                f: "function" == typeof a[b],
                n: e || b,
                r: f
            },
            h._next && (h._next._prev = h),
            h) : void 0
        }
        ,
        e.setRatio = function(a) {
            for (var b, c = this._firstPT, d = 1e-6; c; )
                b = c.c * a + c.s,
                c.r ? b = Math.round(b) : d > b && b > -d && (b = 0),
                c.f ? c.t[c.p](b) : c.t[c.p] = b,
                c = c._next
        }
        ,
        e._kill = function(a) {
            var b, c = this._overwriteProps, d = this._firstPT;
            if (null != a[this._propName])
                this._overwriteProps = [];
            else
                for (b = c.length; --b > -1; )
                    null != a[c[b]] && c.splice(b, 1);
            for (; d; )
                null != a[d.n] && (d._next && (d._next._prev = d._prev),
                d._prev ? (d._prev._next = d._next,
                d._prev = null) : this._firstPT === d && (this._firstPT = d._next)),
                d = d._next;
            return !1
        }
        ,
        e._roundProps = function(a, b) {
            for (var c = this._firstPT; c; )
                (a[this._propName] || null != c.n && a[c.n.split(this._propName + "_").join("")]) && (c.r = b),
                c = c._next
        }
        ,
        E._onPluginEvent = function(a, b) {
            var c, d, e, f, g, h = b._firstPT;
            if ("_onInitAllProps" === a) {
                for (; h; ) {
                    for (g = h._next,
                    d = e; d && d.pr > h.pr; )
                        d = d._next;
                    (h._prev = d ? d._prev : f) ? h._prev._next = h : e = h,
                    (h._next = d) ? d._prev = h : f = h,
                    h = g
                }
                h = b._firstPT = e
            }
            for (; h; )
                h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0),
                h = h._next;
            return c
        }
        ,
        S.activate = function(a) {
            for (var b = a.length; --b > -1; )
                a[b].API === S.API && (I[(new a[b])._propName] = a[b]);
            return !0
        }
        ,
        p.plugin = function(a) {
            if (!(a && a.propName && a.init && a.API))
                throw "illegal plugin definition.";
            var b, c = a.propName, d = a.priority || 0, e = a.overwriteProps, f = {
                init: "_onInitTween",
                set: "setRatio",
                kill: "_kill",
                round: "_roundProps",
                initAll: "_onInitAllProps"
            }, g = q("plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin", function() {
                S.call(this, c, d),
                this._overwriteProps = e || []
            }, a.global === !0), h = g.prototype = new S(c);
            h.constructor = g,
            g.API = a.API;
            for (b in f)
                "function" == typeof a[b] && (h[f[b]] = a[b]);
            return g.version = a.version,
            S.activate([g]),
            g
        }
        ,
        c = a._gsQueue) {
            for (d = 0; c.length > d; d++)
                c[d]();
            for (e in n)
                n[e].func || a.console.log("GSAP encountered missing dependency: com.greensock." + e)
        }
        g = !1
    }
}(window),
(window._gsQueue || (window._gsQueue = [])).push(function() {
    "use strict";
    window._gsDefine("easing.Back", ["easing.Ease"], function(a) {
        var b, c, d, e = window.GreenSockGlobals || window, f = e.com.greensock, g = 2 * Math.PI, h = Math.PI / 2, i = f._class, j = function(b, c) {
            var d = i("easing." + b, function() {}, !0)
              , e = d.prototype = new a;
            return e.constructor = d,
            e.getRatio = c,
            d
        }, k = a.register || function() {}
        , l = function(a, b, c, d) {
            var e = i("easing." + a, {
                easeOut: new b,
                easeIn: new c,
                easeInOut: new d
            }, !0);
            return k(e, a),
            e
        }, m = function(a, b, c) {
            this.t = a,
            this.v = b,
            c && (this.next = c,
            c.prev = this,
            this.c = c.v - b,
            this.gap = c.t - a)
        }, n = function(b, c) {
            var d = i("easing." + b, function(a) {
                this._p1 = a || 0 === a ? a : 1.70158,
                this._p2 = 1.525 * this._p1
            }, !0)
              , e = d.prototype = new a;
            return e.constructor = d,
            e.getRatio = c,
            e.config = function(a) {
                return new d(a)
            }
            ,
            d
        }, o = l("Back", n("BackOut", function(a) {
            return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1
        }), n("BackIn", function(a) {
            return a * a * ((this._p1 + 1) * a - this._p1)
        }), n("BackInOut", function(a) {
            return 1 > (a *= 2) ? .5 * a * a * ((this._p2 + 1) * a - this._p2) : .5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2)
        })), p = i("easing.SlowMo", function(a, b, c) {
            b = b || 0 === b ? b : .7,
            null == a ? a = .7 : a > 1 && (a = 1),
            this._p = 1 !== a ? b : 0,
            this._p1 = (1 - a) / 2,
            this._p2 = a,
            this._p3 = this._p1 + this._p2,
            this._calcEnd = c === !0
        }, !0), q = p.prototype = new a;
        return q.constructor = p,
        q.getRatio = function(a) {
            var b = a + (.5 - a) * this._p;
            return this._p1 > a ? this._calcEnd ? 1 - (a = 1 - a / this._p1) * a : b - (a = 1 - a / this._p1) * a * a * a * b : a > this._p3 ? this._calcEnd ? 1 - (a = (a - this._p3) / this._p1) * a : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a : this._calcEnd ? 1 : b
        }
        ,
        p.ease = new p(.7,.7),
        q.config = p.config = function(a, b, c) {
            return new p(a,b,c)
        }
        ,
        b = i("easing.SteppedEase", function(a) {
            a = a || 1,
            this._p1 = 1 / a,
            this._p2 = a + 1
        }, !0),
        q = b.prototype = new a,
        q.constructor = b,
        q.getRatio = function(a) {
            return 0 > a ? a = 0 : a >= 1 && (a = .999999999),
            (this._p2 * a >> 0) * this._p1
        }
        ,
        q.config = b.config = function(a) {
            return new b(a)
        }
        ,
        c = i("easing.RoughEase", function(b) {
            b = b || {};
            for (var c, d, e, f, g, h, i = b.taper || "none", j = [], k = 0, l = 0 | (b.points || 20), n = l, o = b.randomize !== !1, p = b.clamp === !0, q = b.template instanceof a ? b.template : null, r = "number" == typeof b.strength ? .4 * b.strength : .4; --n > -1; )
                c = o ? Math.random() : 1 / l * n,
                d = q ? q.getRatio(c) : c,
                "none" === i ? e = r : "out" === i ? (f = 1 - c,
                e = f * f * r) : "in" === i ? e = c * c * r : .5 > c ? (f = 2 * c,
                e = .5 * f * f * r) : (f = 2 * (1 - c),
                e = .5 * f * f * r),
                o ? d += Math.random() * e - .5 * e : n % 2 ? d += .5 * e : d -= .5 * e,
                p && (d > 1 ? d = 1 : 0 > d && (d = 0)),
                j[k++] = {
                    x: c,
                    y: d
                };
            for (j.sort(function(a, b) {
                return a.x - b.x
            }),
            h = new m(1,1,null),
            n = l; --n > -1; )
                g = j[n],
                h = new m(g.x,g.y,h);
            this._prev = new m(0,0,0 !== h.t ? h : h.next)
        }, !0),
        q = c.prototype = new a,
        q.constructor = c,
        q.getRatio = function(a) {
            var b = this._prev;
            if (a > b.t) {
                for (; b.next && a >= b.t; )
                    b = b.next;
                b = b.prev
            } else
                for (; b.prev && b.t >= a; )
                    b = b.prev;
            return this._prev = b,
            b.v + (a - b.t) / b.gap * b.c
        }
        ,
        q.config = function(a) {
            return new c(a)
        }
        ,
        c.ease = new c,
        l("Bounce", j("BounceOut", function(a) {
            return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
        }), j("BounceIn", function(a) {
            return 1 / 2.75 > (a = 1 - a) ? 1 - 7.5625 * a * a : 2 / 2.75 > a ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375)
        }), j("BounceInOut", function(a) {
            var b = .5 > a;
            return a = b ? 1 - 2 * a : 2 * a - 1,
            a = 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375,
            b ? .5 * (1 - a) : .5 * a + .5
        })),
        l("Circ", j("CircOut", function(a) {
            return Math.sqrt(1 - (a -= 1) * a)
        }), j("CircIn", function(a) {
            return -(Math.sqrt(1 - a * a) - 1)
        }), j("CircInOut", function(a) {
            return 1 > (a *= 2) ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
        })),
        d = function(b, c, d) {
            var e = i("easing." + b, function(a, b) {
                this._p1 = a || 1,
                this._p2 = b || d,
                this._p3 = this._p2 / g * (Math.asin(1 / this._p1) || 0)
            }, !0)
              , f = e.prototype = new a;
            return f.constructor = e,
            f.getRatio = c,
            f.config = function(a, b) {
                return new e(a,b)
            }
            ,
            e
        }
        ,
        l("Elastic", d("ElasticOut", function(a) {
            return this._p1 * Math.pow(2, -10 * a) * Math.sin((a - this._p3) * g / this._p2) + 1
        }, .3), d("ElasticIn", function(a) {
            return -(this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * g / this._p2))
        }, .3), d("ElasticInOut", function(a) {
            return 1 > (a *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * g / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - this._p3) * g / this._p2) + 1
        }, .45)),
        l("Expo", j("ExpoOut", function(a) {
            return 1 - Math.pow(2, -10 * a)
        }), j("ExpoIn", function(a) {
            return Math.pow(2, 10 * (a - 1)) - .001
        }), j("ExpoInOut", function(a) {
            return 1 > (a *= 2) ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * (a - 1)))
        })),
        l("Sine", j("SineOut", function(a) {
            return Math.sin(a * h)
        }), j("SineIn", function(a) {
            return -Math.cos(a * h) + 1
        }), j("SineInOut", function(a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        })),
        i("easing.EaseLookup", {
            find: function(b) {
                return a.map[b]
            }
        }, !0),
        k(e.SlowMo, "SlowMo", "ease,"),
        k(c, "RoughEase", "ease,"),
        k(b, "SteppedEase", "ease,"),
        o
    }, !0)
}),
window._gsDefine && window._gsQueue.pop()();
var Application = function() {
    function a() {
        h = $(window),
        i = $("#wrapper"),
        j = $("#header"),
        k = $("#footer"),
        l = $("#preloader"),
        m = $("#loading"),
        n = [".bird", ".ape", ".hyena", ".oldmonkey"],
        settings.isJammin = !1,
        settings.deepLinked = !1,
        l.hide(),
        m.hide(),
        TopNav.init(),
        WorkView.init(),
        initWorkData(),
        $(window).resize($.throttle(250, d)),
        o = new Audio(settings.cdnPath + "files/audio/dope.mp3"),
        o.loop = !0,
        $(".footer-share").on("mouseenter mouseleave", "a", function(a) {
            mouse_is_inside = "mouseenter" === a.type;
            var b = 1
              , c = "#ffffff";
            return mouse_is_inside ? (b = 1.2,
            c = "#ffffff") : (b = 1,
            c = "#21ffe2"),
            $soc = $(this).find("path"),
            TweenMax.to($(this), .4, {
                scale: b,
                ease: Back.easeOut.config(3)
            }),
            TweenMax.to($soc, .1, {
                fill: c
            }),
            !1
        });
        var a = c();
        $(".splash-logo").on("mouseenter", function() {
            settings.isJammin || ($(this).addClass("hover"),
            $(this).one(a, function() {
                $(this).removeClass("hover")
            }))
        }),
        $(".splash-logo").on("mouseleave", function() {
            settings.isJammin || $(this).removeClass("hover")
        }),
        $(".splash-logo").on("click", function() {
            f()
        })
    }
    function b() {
        Modernizr.touch || $("#scene").parallax({
            originX: .5,
            originY: .5,
            limitX: 300,
            limitY: !1,
            frictionX: .2,
            frictionY: .2
        })
    }
    function c() {
        var a, b = document.createElement("fakeelement"), c = {
            animation: "animationend",
            OAnimation: "oAnimationEnd",
            MozAnimation: "animationend",
            WebkitAnimation: "webkitAnimationEnd"
        };
        for (a in c)
            if (void 0 !== b.style[a])
                return c[a]
    }
    function d() {
        settings.contentWidth = i.width(),
        settings.contentHeight = i.height(),
        settings.windowWidth = h.width(),
        settings.windowHeight = h.height(),
        WorkView.resize()
    }
    function e(a) {
        function b() {
            document.body.style.overflow = "",
            "#work" == a && WorkView.animateIn()
        }
        $("section").removeClass("active"),
        $(a).length ? ($(a).toggleClass("active"),
        $(window).trigger("resize")) : $("#home").toggleClass("active"),
        $(a).length || (a = "#home"),
        $(".project").removeClass("active"),
        $(a).css("top", -settings.windowHeight + "px");
        $(a);
        document.body.style.overflow = "hidden",
        TweenMax.to($(a), .5, {
            top: "0px",
            ease: Power2.easeOut,
            onComplete: b
        })
    }
    function f() {
        if (settings.isJammin) {
            $(".splash-logo").removeClass("active");
            for (var a = 0; a < n.length; a++) {
                var b = n[a];
                $(b).removeClass("active")
            }
            o.pause()
        } else {
            $(".splash-logo").addClass("active");
            for (var a = 0; a < n.length; a++) {
                var b = n[a];
                $(b).addClass("active")
            }
            o.play()
        }
        settings.isJammin = !settings.isJammin
    }
    function g() {
        o.volume = settings.audioMute ? 1 : 0,
        $(".button-audio").toggleClass("active"),
        settings.audioMute = !settings.audioMute
    }
    var h, i, j, k, l, m, n, o, p = {};
    return p.init = a,
    p.transition = e,
    p.resize = d,
    p.toggleJam = f,
    p.toggleAudio = g,
    p.parallax = b,
    p.whichAnimationEvent = c,
    p
}();
$numThumbsLeft = null,
$items = [],
$nextId = null,
$itemsLeft = 0,
$pData = [],
$gData = [];
var ProjectView = function() {
    function a(a) {
        e = a,
        $projectOpen = !0,
        c(),
        $(".close").on("click", function() {
            History.pushState({
                state: 2
            }, "ANIMAL - WORK", "/work")
        }),
        $(".close").on("mouseenter", function() {
            TweenMax.to(this, .3, {
                scaleX: 1.2,
                scaleY: 1.2,
                opacity: .7,
                ease: Back.easeOut
            })
        }),
        $(".close").on("mouseleave", function() {
            TweenMax.to(this, .3, {
                scaleX: 1,
                scaleY: 1,
                opacity: 1,
                ease: Back.easeOut
            })
        }),
        galleryInit(e);
        var b = "ANIMAL - " + settings.portData.projects[a].title;
        document.title = b
    }
    function b() {
        terminateLoader(),
        $("#project").empty(),
        $projectOpen = !1
    }
    function c() {
        $title = "",
        $client = "",
        $color = "",
        $role = "",
        $description = "",
        $date = "",
        $link = "",
        $heroURL = "",
        $logoURL = "",
        $pData = settings.portData.projects[e],
        $pData.title && ($title = '<p class="project-copy p-title">' + $pData.title + "</p>"),
        $heroURL = $pData.hero,
        $logoURL = $pData.logo,
        $date = '<p class="project-copy p-date">' + $pData.date + "</p>",
        $pData.client && ($client = '<p class="project-copy p-client">' + $pData.client + "</p>"),
        $pData.role && ($role = '<p class="project-copy p-role">' + $pData.role + "</p>"),
        $pContainer = jQuery('<div id ="project-container"></div>'),
        $gContainer = jQuery('<div class="gallery"><div id="gallery-container"></div></div>'),
        $projectHero = jQuery('<div id="project-hero"><div class="hero-bg responsive-background-image"></div></div>'),
        $projectHeroData = jQuery('<div class="hero-data-container"><div class="client-logo"></div><div class="hero-divider"></div><div class="hero-text"></div></div>'),
        $projectLogo = jQuery('<img src="' + settings.cdnPath + $logoURL + '"/>'),
        $projectInfo = jQuery($title + $role + $date),
        $pContainer.appendTo("#project"),
        $projectHero.appendTo("#project-container"),
        $projectHeroData.appendTo("#project-container"),
        $gContainer.appendTo("#project-container"),
        $projectInfo.appendTo(".hero-text"),
        $projectLogo.appendTo(".client-logo"),
        $pData.description && ($description = '<div class="project-description">' + $pData.description + "</div>",
        $descriptionDiv = jQuery($description),
        $descriptionDiv.appendTo("#gallery-container")),
        $(".responsive-background-image").css("background-image", "url(../" + $heroURL + ")"),
        $svg = jQuery('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="113px" height="110px" viewBox="0 0 113 110" style="overflow:scroll;enable-background:new 0 0 113 110.8;" xml:space="preserve"><defs></defs><polyline  class="navBG" points="113.2,0 57.1,56.1 1,0 "/></svg>'),
        $closeButton = jQuery('<div id="fixed-close-button"><div class="sprite-menu-drip"></div><div class="close-container"></div></div>'),
        $closeButtonIcon = jQuery('<div class="close rounded thick"></div>'),
        $closeButton.appendTo("#project"),
        $closeButtonIcon.appendTo(".close-container"),
        $color = $pData.color,
        $("#fixed-close-button").css("top", "-200px"),
        $(".project-view").css("background", "#" + $color),
        Pace.restart(),
        $(".pace .pace-progress").css("height", "100%"),
        $(".pace .pace-progress").toggleClass("special")
    }
    function d() {
        TweenMax.to($("#fixed-close-button"), .5, {
            top: "0px",
            delay: .3,
            ease: Power2.easeOut
        }),
        $("section").removeClass("active"),
        $("#project").toggleClass("active"),
        $.scrollTo("0px", 0)
    }
    var e, f = {};
    return f.init = a,
    f.remove = b,
    f.transition = d,
    f
}()
  , TopNav = function() {
    function a() {
        settings.navIsOpen = !1,
        $("nav").on("click", "a", function() {
            if ($(".sprite-contact-cta").removeClass("active"),
            settings.isJammin && "/contact" != $(this).attr("href") && Application.toggleJam(),
            settings.currentSection == $(this).attr("href"))
                return settings.navIsOpen && b(),
                !1;
            if ("/contact" == $(this).attr("href"))
                return $.scrollTo("100%", 300, function() {
                    $(".sprite-contact-cta").replaceWith($(".sprite-contact-cta").clone(!0)),
                    $(".sprite-contact-cta").addClass("active")
                }),
                settings.navIsOpen && b(),
                !1;
            var a = $(this).attr("href")
              , c = "ANIMAL - " + $(this).text();
            return History.pushState({
                urlPath: a
            }, c, a),
            $.scrollTo("0px", 300),
            settings.currentSection = $(this).attr("href"),
            !1
        }),
        $("#menu-icon-trigger").click(function() {
            b()
        });
        var a = $("#menu-icon-wrapper");
        $("#menu-icon-trigger").on("mouseenter", function() {
            TweenMax.to(a, .1, {
                scaleX: 1,
                scaleY: 1,
                opacity: .7,
                ease: Back.easeOut
            })
        }),
        $("#menu-icon-trigger").on("mouseleave", function() {
            TweenMax.to(a, .1, {
                scaleX: .8,
                scaleY: .8,
                opacity: 1,
                ease: Back.easeOut
            })
        }),
        TweenMax.to($(".button-audio"), 0, {
            scaleX: .8,
            scaleY: .8
        }),
        $(".button-audio").click(function() {
            Application.toggleAudio()
        }),
        $(".button-audio").on("mouseenter", function() {
            TweenMax.to($(this), .2, {
                scaleX: 1,
                scaleY: 1,
                ease: Back.easeOut
            }),
            $(this).addClass("hover")
        }),
        $(".button-audio").on("mouseleave", function() {
            TweenMax.to($(this), .2, {
                scaleX: .8,
                scaleY: .8,
                ease: Back.easeOut
            }),
            $(this).removeClass("hover")
        }),
        l(),
        t.style.visibility = "visible"
    }
    function b() {
        settings.isJammin && Application.toggleJam(),
        $(".sprite-contact-cta").removeClass("active"),
        settings.navIsOpen = !settings.navIsOpen,
        $("#overlay").toggleClass("open"),
        $("html").toggleClass("overflow-y-hide");
        var a = 1.4 * settings.windowHeight;
        settings.navIsOpen ? ($("#overlay").css("top", "0"),
        TweenMax.from($("#overlay"), .6, {
            top: -a,
            ease: Power2.easeOut
        })) : TweenMax.to($("#overlay"), .8, {
            top: settings.windowHeight + 500,
            ease: Power2.easeIn
        }),
        l()
    }
    function c(a) {
        "/work" == a ? ($(".footer-bg").attr("class", "footer-bg two"),
        $("body").css("background", "#ffcc00")) : ($(".footer-bg").attr("class", "footer-bg one"),
        $("body").css("background", "#000B38"))
    }
    function d(a) {
        a.draw("80% - 240", "80%", .3, {
            delay: .1,
            callback: function() {
                e(a)
            }
        })
    }
    function e(a) {
        a.draw("100% - 545", "100% - 305", .6, {
            easing: ease.ease("elastic-out", 1, .3)
        })
    }
    function f(a) {
        a.draw(w - 60, x + 60, .1, {
            callback: function() {
                g(a)
            }
        })
    }
    function g(a) {
        a.draw(w + 120, x - 120, .3, {
            easing: ease.ease("bounce-out", 1, .3)
        })
    }
    function h(a) {
        a.draw("90% - 240", "90%", .1, {
            easing: ease.ease("elastic-in", 1, .3),
            callback: function() {
                i(a)
            }
        })
    }
    function i(a) {
        a.draw("20% - 240", "20%", .3, {
            callback: function() {
                j(a)
            }
        })
    }
    function j(a) {
        a.draw(u, v, .7, {
            easing: ease.ease("elastic-out", 1, .3)
        })
    }
    function k(a) {
        a.draw(w, x, .7, {
            delay: .1,
            easing: ease.ease("elastic-out", 2, .4)
        })
    }
    function l() {
        settings.navIsOpen ? (d(q),
        f(r),
        d(s)) : (h(q),
        k(r),
        h(s))
    }
    var m = {}
      , n = document.getElementById("pathA")
      , o = document.getElementById("pathB")
      , p = document.getElementById("pathC")
      , q = new Segment(n,u,v)
      , r = new Segment(o,w,x)
      , s = new Segment(p,u,v)
      , t = (document.getElementById("menu-icon-trigger"),
    document.getElementById("menu-icon-wrapper"))
      , u = 80
      , v = 320
      , w = 80
      , x = 320;
    return m.init = a,
    m.toggleNav = b,
    m.updateColor = c,
    m
}()
  , WorkView = function() {
    function a() {
        $("#gallery-work").on("click", "a", function() {
            var a = $(this).attr("href")
              , b = $(this).data("id")
              , c = "ANIMAL - " + settings.portData.projects[b].title;
            return History.pushState({
                urlPath: a
            }, c, a),
            !1
        }),
        $("#gallery-work").on("mouseenter mouseleave", "a", function(a) {
            return mouse_is_inside = "mouseenter" === a.type,
            $image = $(this).find(".bg"),
            $bar = $(this).find(".gallery-bottom-bar"),
            $sprite = $(this).find(".sprite-anim-project"),
            $leaves = $(this).find(".sprite-anim-leaves"),
            $(".sprite-anim-project").removeClass("hover"),
            mouse_is_inside && (TweenMax.fromTo($sprite, .8, {
                css: {
                    bottom: -200
                }
            }, {
                css: {
                    bottom: 0
                },
                ease: Elastic.easeOut.config(1, .5)
            }),
            $leaves.replaceWith($leaves.clone(!0)),
            $(this).find(".sprite-anim-leaves").addClass("hover"),
            $sprite.addClass("hover")),
            $image.toggleClass("hover"),
            $bar.toggleClass("hover"),
            !1
        }),
        b()
    }
    function b() {
        $(".sprite-anim-leaves").removeClass("hover")
    }
    function c() {
        TweenMax.killTweensOf($(".project")),
        $(".project").addClass("active"),
        $(".project").each(function(a) {
            TweenMax.fromTo($(this), .8, {
                css: {
                    top: -100,
                    opacity: 0
                }
            }, {
                css: {
                    top: 0,
                    opacity: 1
                },
                delay: (a - .5) / 8,
                ease: Elastic.easeOut.config(1, .5)
            })
        })
    }
    var d = {};
    return d.init = a,
    d.resize = b,
    d.animateIn = c,
    d
}();
$(document).ready(function() {
    function a(a) {
        for (var b = 0, c = settings.portData.projects.length; c > b; b++) {
            var d = settings.portData.projects[b].title.toLowerCase()
              , e = d.replace(/\s+/g, "-").toLowerCase()
              , f = b;
            if (e == a)
                return settings.deepLinked,
                ProjectView.init(f),
                void ($projectOpen = !0)
        }
        $projectOpen = !1
    }
    $projectOpen = !1;
    var b = function(b) {
        var c;
        if ($projectOpen && ProjectView.remove(),
        b.data.urlPath)
            c = b.data.urlPath;
        else if (b.hash.indexOf("?") > 0) {
            var d = b.hash.slice(0, b.hash.indexOf("?"));
            c = d
        } else
            c = b.hash;
        settings.currentSection = c;
        var e = c.search("/work/");
        if (0 == e) {
            var f = c.substr(6);
            return void a(f)
        }
        var g = "#" + c.substring(1);
        settings.currentSelector = g,
        TopNav.updateColor(c),
        Application.transition(g);
        var h = c
          , i = "";
        h = h.substr(1),
        i = "" == h ? "ANIMAL" : "ANIMAL - " + h.toUpperCase(),
        document.title = i
    }
      , c = window.History;
    return c.enabled ? (State = c.getState(),
    c.pushState({
        urlPath: window.location.pathname
    }, $("title").text(), State.urlPath),
    b(State),
    void c.Adapter.bind(window, "statechange", function() {
        settings.navIsOpen && TopNav.toggleNav(),
        b(c.getState())
    })) : !1
});
