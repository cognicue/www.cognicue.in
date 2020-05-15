function AsyncPlayer(e) {
    let n = null;
    let t = 0
      , l = 0
      , a = 0
      , o = 0
      , r = !1
      , u = !1;
    const i = ()=>{}
    ;
    return (s,d=null,p=(()=>{}
    ))=>{
        if ("load" === s) {
            n = document.getElementById(e);
            if (d) {
                var c = new XMLHttpRequest;
                c.open("GET", d, !0),
                c.responseType = "blob",
                c.onload = function() {
                    if (200 === this.status) {
                        var e = this.response
                          , t = URL.createObjectURL(e);
                        n.src = t,
                        p("loaded", null)
                    } else
                        p("error", null)
                }
                ,
                c.onerror = function() {
                    p("error", null)
                }
                ,
                c.send()
            }
            else{
                p("loaded", null)
            }
        }  
        else
            "play" === s ? (n.play().then(()=>{
                l = n.duration,
                p("video start", {
                    video_duration_sec: l
                })
            }
            ),
            n.onwaiting = (()=>{
                u || (t = Date.now(),
                u = !0,
                p("buffer started", null))
            }
            ),
            n.onpause = (()=>{
                r = !1
            }
            ),
            n.onplaying = (()=>{
                r = !0,
                u && (u = !1,
                p("buffer finished", Date.now() - t))
            }
            ),            
            n.onended = (()=>{
                n.onended = i,
                n.onplaying = i,
                n.onpause = i,
                n.onwaiting = i,
                p("ended", null)
            }
            )) : "seek" === s ? (n.currentTime = d,

            p("seeked", null)) : "pause" === s ? (n.pause(),
            r = !1,
            p("paused", null)) : "resume" === s && (n.play(),
            r = !0,
            p("playing", null));
        return "getVideoDurationSec" === s ? l : "getVideoDurationMs" === s ? a : "getStartTime" === s ? o : "getPlayingState" === s ? r : "getCurrentTime" === s ? n.currentTime : void ("setPlayingState" === s && (r = d,
        d ? n.play() : n.pause()))
    }
}
