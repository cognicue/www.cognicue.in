function Graph(t, r) {
    let e = this
      , a= {};

    Object.keys(r.buttons).filter(t=>r.buttons[t].visible).map(t=>{
        a[t] = r.buttons[t]
    }),
    this.emotions = Object.keys(a).map(t=>r.buttons[t].sdk_name);
    //this.emotions_selected = e.emotions[Math.floor(Math.random() * e.emotions.length)];
    this.emotions_selected = ["joy", "surprise", "contempt", "disgust"];

    const o = Object.keys(a).map(t=>r.buttons[t].color)
      , emoRoot = $(r.emoRoot)
      , s = d3.select(t);

    if (1 != emoRoot.length)
        throw ReferenceError("Graph was not passed a unique reference to a button container");
    if (1 != s.size())
        throw ReferenceError("Graph was not passed a unique reference to an svg");

    let i = !1
      , l = null
      , c = null
      , d = "all"
      , u = r.width || 720
      , h = d3.scaleLinear().domain([0, 0]).range([0, u])
      , g = d3.scaleLinear().domain([100, -100]).range([2, 248])
      , p = null
      , m = 0
      , f = 0;

    const b = d3.line().curve(d3.curveBasis).x(t=>h(t[0])).y(t=>g(t[1]));

    let v = [];

    for (var k = 0; k < e.emotions.length; k++)
        v.push([]);

    let y = [v]
      , w = 0
      , x = !1
      , C = [[]]
      , E = null;

    this.updatePlot = ((t,r)=>{
        if (F(),x) {
            let a = new Array(e.emotions.length).fill([[0, 0]]);
            e.emotions.forEach((e,o)=>{
                a[o] = [[r, t[e]]]
            }
            ),
            e.getCurves().filter(".c" + w.toString()).data(a).enter().append("svg:path").attr("class", "curve c" + w.toString()).attr("id", function(t, r) {
                return e.emotions[r]
            }).attr("d", b).attr("stroke", function(t, r) {
                return o[r]
            }).attr("fill", "transparent").attr("stroke-width", "3px").attr("stroke-opacity", function(t, r) {
                let selected_emotions = emoRoot.val() || [];
                return (selected_emotions.indexOf(this.id) >= 0) ? 1 : 0
            }),
            C[w].push(h(r)),
            S(r),
            E.moveToFront(),
            x = !1
        } else
            e.addDataPoint(t, r).getCurves().filter(".c" + w.toString()).data(y[w]).attr("d", b);
        return e
    }
    ),
    this.noData = (t=>{
        if (F(),x)
            S(t);
        else {
            w++;
            let a = [];
            for (var r = 0; r < e.emotions.length; r++)
                a.push([]);
            y.push(a),
            C.push([h(t)]),
            E = e.getCurveBox().append("rect"),
            P()
        }
        x = !0
    }
    ),
    this.initPlot = ((t,r,sw,so)=>{
        u = r,
        $("#svg-curve").css("width", u + "px"),
        h = d3.scaleLinear().domain([0, 1e3 * t]).range([0, u]);
        var a = new Array(e.emotions.length).fill([[0, 0]]);
        e.getCurves().data(a).enter().append("svg:path").attr("class", "curve c" + w.toString()).attr("id", function(t, r) {
            return e.emotions[r]
        }).attr("d", b).attr("stroke", function(t, r) {
            return o[r]
        }).attr("fill", "transparent").attr("stroke-width", sw||"3px").attr("stroke-opacity", so||"0"),
        e.configureForPlayback(t),
        i = !0
    }
    ),
    this.clearPlot = ((t,sw,so)=>{
        e.getCurves().remove(),
        e.initPlot(t, u, sw, so),
        e.EmotionSelect2Handler(e.emotions_selected, 1);
    }
    ),
    this.initButtons = (()=>{
        let emoOptgroup = $('<optgroup label="All Emotions"></optgroup>')
          , expOptgroup = $('<optgroup label="All Expressions"></optgroup>');
        F(),
        Object.values(a).sort((t,r)=>r.order - t.order).map(t=>t.mr_name).forEach(t=>{
            let r = a[t];
            let option = `<option class="nav-link btn btn-outline-secondary btn-sm" value="${r.sdk_name}">${r.mr_name}</option>`;
            if (r.type == "Emotions"){
                emoOptgroup.append(option)
            }
            else if (r.type == "Expressions"){
                expOptgroup.append(option)
            }
            emoRoot.append(emoOptgroup).append(expOptgroup);
        }),

        emoRoot.select2({
            width: '100%'
          , placeholder: "Search any metric"
          , templateSelection: function (data, container) {
                $(container).css("background-color", o[e.emotions.indexOf(data.id)]);
                return data.text;
            }
        }).val(e.emotions_selected).trigger("change"),

        emoRoot.on("select2:select", function (evt) {
            e.EmotionSelect2Handler(evt.params.data.id, 1);
        }),
        emoRoot.on("select2:unselect", function (evt) {
            e.EmotionSelect2Handler(evt.params.data.id, .1);
            $(this).select2('close');
        }),
        e.EmotionSelect2Handler(e.emotions_selected, 1);
    }
    ),    
    this.initCursor = (()=>{
        F()
    }
    );
    const B = t=>Math.floor(t / 60) + ":" + (t % 60 < 10 ? "0" + t % 60 : t % 60)
      , F = ()=>{
        if (!i)
            throw Error("Graph not initialized, make sure to call `initPlot` before calling parent method")
    };
    this.getCurveBox = (()=>s),
    this.getCurves = (()=>s.selectAll("path.curve")),

    this.resetSelectedEmotionButton = (t=>(d !== t && ($("#" + d).css("background-color", "").css("color", $("#" + d).css("border-color")),
    $("#" + t).css("background-color", $("#" + t).css("border-color")).css("color", "#FFFFFF"),
    d = t),
    e)),

    this.allButtonClickHandler = (()=>{
        e.resetSelectedEmotionButton("all").getCurves().transition().duration(400).attr("stroke-opacity", 1)
    }
    ),

    this.EmotionButtonClickHandler = (t=>()=>{
        e.resetSelectedEmotionButton(t).getCurves().transition().duration(400).attr("stroke-opacity", function() {
            return this.id === t ? 1 : .1
        })
    }
    ),

    this.EmotionSelect2Handler = ((t,p)=>{
        e.getCurves().transition().attr("stroke-opacity", function() {
            return (Array.isArray(t) && t.indexOf(this.id) >= 0) || this.id === t ? p : parseFloat($(this).attr("stroke-opacity"))
        })
    }),

    this.addDataPoint = ((t,r)=>(e.emotions.forEach((e,a)=>{
        y[w][a].push([r, t[e]])
    }
    ),
    e));

    var P = ()=>{
        E.attr("x", C[w][0]).attr("y", 0).attr("width", 0).attr("height", 250)
    }
      , S = t=>{
        let r = C[w][0]
          , e = h(t);
        E.attr("width", e - r)
    };

    this.translateCursor = (t=>{
        l.attr("transform", "translate(" + t + ", 0)");
        const r = Math.floor(t / u * f)
          , a = B(r);
        c.text(a),
        $("#text-width")[0].innerHTML = a;
        const o = $("#text-width")[0].clientWidth;
        return t > u - o - 5 ? c.attr("transform", "translate(" + (t - o - 10) + ", 0)") : c.attr("transform", "translate(" + t + ", 0)"),
        e
    }
    ),
    this.playbackFromX = (t=>p.invert(t)),
    this.playbackToX = (t=>p(t)),
    this.clipX = (t=>{
        var r = p.invert(t);
        return r < 0 ? 0 : r >= m ? p(m) : t
    }
    ),
    this.setMousePointerDragging = (()=>($("html, .draggable-rect, line.cursor-wide").css({
        cursor: "-webkit-grabbing"
    }),
    $("html, .draggable-rect, line.cursor-wide").css({
        cursor: "-moz-grabbing"
    }),
    $("html, .draggable-rect, line.cursor-wide").css({
        cursor: "grabbing"
    }),
    e)),

    this.setMousePointerUndragging = (()=>($("html").css({
        cursor: "default"
    }),
    $(".draggable-rect, line.cursor-wide").css("cursor", "pointer"),
    e)),

    this.initializeCursor = (()=>((l = s.append("svg:g").attr("y1", 0).attr("y2", 250).attr("x1", 0).attr("x2", 10).attr("class", "draggable-group")).append("svg:rect").attr("x", -5).attr("y", 0).attr("width", 10).attr("height", 250).attr("class", "draggable-rect"),
    l.append("svg:line").attr("class", "cursor cursor-wide").attr("y1", 0).attr("y2", 250).attr("x1", 0).attr("x2", 0),
    c = s.append("svg:text").attr("class", "time video_current_time").attr("y", 20).attr("x", 5).text("0:00"),
    l)),

    this.configureForPlayback = (t=>{
        f = t,
        m = Math.floor(t),
        p = d3.scaleLinear().domain([0, t]).range([0, u])
    }
    )
}

d3.selection.prototype.moveToFront = function() {
    return this.each(function() {
        this.parentNode.appendChild(this)
    })
}
;
