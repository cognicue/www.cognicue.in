function Summary(t=null) {
    const a = t=>{
        let a = 0;
        return t.forEach(t=>{
            a += t
        }
        ),
        t.length > 0 ? a /= t.length : null
    }
      , n = (t,a)=>{
        let n = 0;
        for (let r = 0; r < t.length; r++)
            n += Math.pow(a - t[r], 2);
        return t.length >= 2 ? (n /= t.length - 1,
        Math.sqrt(n)) : null
    }
      , r = (t,a)=>(function(n) {
        return a.map(function(a) {
            return [a, d3.mean(n, function(n) {
                return t(a - n)
            })]
        })
    }
    )
      , e = t=>(function(a) {
        return Math.abs(a /= t) <= 1 ? .75 * (1 - a * a) / t : 0
    }
    )
      , o = d3.select("#summaryGraph")
      , l = +o.attr("width")
      , i = +o.attr("height")
      , s = {
        top: 20,
        right: 30,
        bottom: 30,
        left: 40
    };
    let d = d3.scaleLinear().domain([-.2, 1.2]).range([s.left, l - s.right])
      , c = d3.scaleLinear().domain([0, 10]).range([i - s.bottom, s.top]);
    o.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + (i - s.bottom) + ")").call(d3.axisBottom(d)).append("text").attr("x", l - s.right).attr("y", -6).attr("fill", "#000").attr("text-anchor", "end").attr("font-weight", "bold").text("Contempt Data"),
    o.append("g").attr("class", "axis axis--y").attr("transform", "translate(" + s.left + ",0)").call(d3.axisLeft(c).ticks(null, "%")),
    data_to_plot = t.metrics.contempt,
    console.log(data_to_plot);
    let u = .05
      , h = a(data_to_plot);
    console.log(u),
    console.log(n(data_to_plot, h)),
    console.log(h);
    var p = data_to_plot.length
      , g = d3.histogram().domain(d.domain()).thresholds(80)(data_to_plot)
      , f = r(e(u), d.ticks(80))(data_to_plot);
    o.insert("g", "*").attr("fill", "#bbb").selectAll("rect").data(g).enter().append("rect").attr("x", function(t) {
        return d(t.x0) + 1
    }).attr("y", function(t) {
        return c(t.length / p)
    }).attr("width", function(t) {
        return d(t.x1) - d(t.x0) - 1
    }).attr("height", function(t) {
        return c(0) - c(t.length / p)
    }),
    o.append("path").datum(f).attr("fill", "#4444").attr("stroke", "#000").attr("stroke-width", 1.5).attr("stroke-linejoin", "round").attr("d", d3.line().curve(d3.curveBasis).x(function(t) {
        return d(t[0])
    }).y(function(t) {
        return c(t[1])
    }))
}
