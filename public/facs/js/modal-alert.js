const Alert = o=>{
    const d = $("#" + o);
    let n = !1
      , t = !1
      , e = !1
      , s = "";
    d.modal({
        keyboard: !1,
        backdrop: "static",
        show: !1
    }),
    d.on("show.bs.modal", ()=>{
        n = !0
    }
    ),
    d.on("hide.bs.modal", ()=>{
        n = !0
    }
    ),
    d.on("shown.bs.modal", ()=>{
        n = !1,
        t = !1,
        e && (e = !1,
        l())
    }
    ),
    d.on("hidden.bs.modal", ()=>{
        n = !1,
        e = !1,
        t && (t = !1,
        a(s))
    }
    );
    const a = o=>{
        if (!n)
            return d.find(".text-box").html(o),
            d.modal("show");
        t = !0,
        s = o
    }
      , l = ()=>{
        if (!n)
            return d.modal("hide");
        e = !0
    }
    ;
    return {
        warn: a,
        hide: l,
        object: d
    }
}
;
