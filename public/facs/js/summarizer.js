function Summarizer(e) {
    const n = 1;
    let m = Object.keys(e)
      , a = 0
      , r = 0
      , l = 0
      , t = "summary"
      , o = {};
    m.forEach(e=>{
        o[e] = []
    }
    );
    let s = !1
      , u = {
        coverage: null
    };
    m.forEach(n=>{
        u[e[n].mr_name] = {
            max: null,
            mean: null,
            std_dev: null,
            min: null
        }
    }
    );
    const c = (n,t)=>{
        if (r + l !== a)
            return !1;
        let o = !0
          , s = Object.values(t)[0].length;
        return m.forEach(e=>{
            t[e] && t[e].length === s || (o = !1)
        }
        ),
        m.forEach(m=>{
            null !== n[e[m].mr_name].max && null !== n[e[m].mr_name].std_dev && null !== n[e[m].mr_name].mean && null !== n[e[m].mr_name].min || (o = !1)
        }
        ),
        o
    }
      , h = e=>n=>new Promise((m,a)=>{
        console.log("Not a single data being sent. Happy Privacy!")
    }
    )
      , i = e=>Number.parseFloat(Number.parseFloat(e).toFixed(n))
      , _ = (n,m)=>{
        let a = i(n);
        o[m].push(a);
        let l = u[e[m].mr_name].max
          , t = u[e[m].mr_name].mean
          , s = u[e[m].mr_name].min;
        null === l ? u[e[m].mr_name].max = a : l < a && (u[e[m].mr_name].max = a),
        null === s ? u[e[m].mr_name].min = a : s > a && (u[e[m].mr_name].min = a),
        u[e[m].mr_name].mean = null === t ? a : (t * r + a) / (r + 1)
    }
      , d = (e,n)=>{
        let m = 0;
        for (let a = 0; a < e.length; a++)
            m += Math.pow(n - e[a], 2);
        return e.length >= 2 ? (m /= e.length - 1,
        Math.sqrt(m)) : null
    }
    ;
    return {
        log: n=>{
            n !== undefined ? (m.forEach(m=>{
                _(n[e[m].sdk_name], m)
            }
            ),
            a++,
            r++) : (a++,
            l++)
        }
        ,
        done: ()=>{
            u.coverage = r / a,
            new Promise(n=>{
                m.forEach(n=>{
                    const m = u[e[n].mr_name].mean;
                    u[e[n].mr_name].std_dev = d(o[n], m)
                }
                ),
                n(u)
            }
            ).then(a=>(m.forEach(m=>{
                $("#userMean" + e[m].sdk_name).text(a[e[m].mr_name].mean.toFixed(n).toString())
            }
            ),
            s = !0,
            c(a, o) ? Promise.resolve(a) : Promise.reject("Data did not pass validation."))).then(h(t)).then(e=>{
                console.log(e)
            }
            )["catch"](e=>{
                console.log("Unable to perform aggregation:"),
                console.log(e)
            }
            )
        }
        ,
        show: ()=>s ? {
            summary: u,
            metrics: o
        } : null
    }
}
