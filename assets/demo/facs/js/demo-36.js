function Demo(e) {
    const t = this;
    this.States = {
        CONSENT: "CONSENT",
        LOADING: "LOADING",
        RECORDING: "RECORDING",
        PLAYBACK: "PLAYBACK",
        SUMMARY: "SUMMARY"
    };
    let a = t.States.CONSENT,
        o = !1,
        n = null,
        s = !1,
        i = 0,
        r = 0,
        l = 0,
        d = !0,
        c = null,
        m = !1;
    const u = 20,
        p = JSON.parse($("#emotion-buttons").attr("data"));
    let g = AsyncPlayer("media-stimulus"),
        h = AsyncPlayer("media-object"),
        y = new Graph("#svg-curve", {
            root: "#emotion-buttons",
            buttons: p
        }),
        b = Summarizer(p),
        w = e;
    this.state = (() => a), this.start = (() => Promise.all([k(), v()]).then(C).then(() => {
        A()
    })["catch"](e => {
        w.warn(e)
    }));
    const f = (e, t) => {
            let a = () => new Promise(e => {
                $(t).fadeIn(300, () => {
                    e()
                })
            });
            return new Promise(t => {
                $(e).fadeOut(200, () => {
                    t()
                })
            }).then(a)
        },
        v = () => new Promise(e => {
            $("#demo-consent").one("click", () => {
                f("#consent-container", "#loading-container").then(e)
            })
        }),
        k = () => new Promise((e, t) => {
            $("#loading-text").text(messages.loadingPlayer);
            const a = $("#media-stimulus").attr("data");
            g("load", a, a => {
                "loaded" === a ? e() : t(a)
            })
        }),
        C = () => new Promise((e, t) => {
            let a = document.getElementById("facevideo-node");
            (c = new affdex.CameraDetector(a)).detectAllEmotions(), c.detectAllExpressions(), c && !c.isRunning && c.start(), c.addEventListener("onWebcamConnectSuccess", () => {}), c.addEventListener("onWebcamConnectFailure", () => {
                t(messages.webcamFailure)
            }), c.addEventListener("onInitializeSuccess", () => {
                e()
            }), c.addEventListener("onImageResultsSuccess", P), $("#facevideo-node video")[0].addEventListener("playing", () => {
                $("#loading-text").text(messages.detectorLoaded)
            })
        }),
        P = e => {
            if (a === t.States.RECORDING && s) {
                m || (i = Date.now(), m = !0), e.length > 0 ? data = Object.assign({}, e[0].emotions, e[0].expressions) : data = undefined, b.log(data);
                const t = S();
                l > u && d && (d = !1, w.warn(messages.noFace)), e.length > 0 ? (d || (d = !0, w.hide()), l = 0, y.updatePlot(data, t)) : (l++, y.noData(t))
            }
        },
        S = () => Date.now() - i,
        A = () => {
            w.hide(), f("#loading-container", "#demo-container").then(() => {
                a = t.States.RECORDING, w.warn(messages.videoStart), y.initPlot(document.getElementById("media-stimulus").duration, $("#video-wrapper").width()), y.initButtons(), $("#startVideo").one("click", () => {
                    g("play", null, (e, o) => {
                        "video start" === e || ("buffer finished" === e ? m && (s = !0, r += o) : "buffer started" === e ? m && (s = !1) : "ended" === e ? (s = !1, a === t.States.PLAYBACK ? y.translateCursor(0) : E(), g("seek", 0), g("pause")) : "network fail" === e ? (s = !1, c.stop(), w.warn("No Internet")) : "error" === e && w.warn(o))
                    }), s = !0
                })
            })
        },
        E = () => {
            a = t.States.PLAYBACK, c.stop(), b.done(), w.hide(), $("#alert").data("bs.modal")._config.keyboard = !0, $("#alert").data("bs.modal")._config.backdrop = !0, w.warn(messages.videoEnd), $("#alert").on("hidden.bs.modal", () => {
                const e = $("#media-object").attr("data");
                h("load", e, () => {}), $("#media-stimulus").css("display", "none"), $("#media-object").css("display", "block"), $("#toSummary").fadeIn(200), D(), I()
            })
        },
        I = () => {
            let e = y.initializeCursor();
            B(), e.call(d3.drag().on("drag", N).on("start", L).on("end", R)), y.getCurveBox().on("click", O), $("#summaryButton").on("click", x)
        },
        D = () => {
            document.onkeypress = (e => {
                32 == (e || window.event).charCode && (h("getPlayingState") ? h("pause") : h("resume"))
            })
        },
        N = () => {
            const e = y.clipX(d3.event.x),
                t = y.playbackFromX(e);
            y.translateCursor(e), h("seek", t)
        },
        L = () => {
            h("getPlayingState") && (clearInterval(n), o = !0, h("pause")), y.setMousePointerDragging()
        },
        R = () => {
            o && (h("resume"), o = !1, h("setPlayingState", !0), B()), y.setMousePointerUndragging()
        },
        O = function() {
            const e = y.clipX(d3.mouse(this)[0]),
                t = y.playbackFromX(e);
            h("getPlayingState") ? (clearInterval(n), y.translateCursor(e), h("seek", t), B()) : (y.translateCursor(e), h("seek", t))
        },
        B = () => {
            n = setInterval(() => {
                const e = y.playbackToX(h("getCurrentTime"));
                y.translateCursor(e)
            }, 50)
        },
        x = () => {
            g("pause"), f("#demo-container", "#summary-container"), $("#demoButton").on("click", () => {
                f("#summary-container", "#demo-container")
            })
        }
}
const messages = {
        incompatableBrowser: "It appears that you are using an unsupported browser. Please try this demo on an updated version of Chrome, Firefox, Opera or Edge.",
        loadingPlayer: "Loading Player...",
        webcamFailure: "Unable to connect to webcam, please make sure your webcam is connected, and this page has permission to access it.",
        detectorLoaded: "Loading the emotion detector...",
        noFace: "<h4>No face detected</h4> <p>Please make sure your face is in view of the webcam.</p>",
        videoStart: '\n  <h4>Welcome!</h4>\n  <p>We are about to play a video for you. While that video is playing, we will be using your webcam to determine your emotional engagement.</p>\n  <p>The graph below will plot your engagement with the video over time using various metrics. You can focus on a specific metric by clicking a label on the left.</p>\n  <button type="button" class="btn btn-primary float-right" id="startVideo" data-dismiss="modal">Play <i class="fa fa-play-circle"></i></button>\n  ',
        videoEnd: '\n  <p>Analysis Complete!</p>\n  <p>Now that your analysis has finished, you can playback the video and see your emotional reactions to it over time.</p>\n  <p>You can use the video controls to play, pause, and seek the video. Also, you can click in the graph to seek the video to that point in time and press the spacebar key to play or pause the video.</p>\n  <p>Use the buttons to the left of the video to highlight a specific metric or highlight all metrics.</p>\n  <br>\n  <button type="button" class="btn btn-primary float-right" data-dismiss="modal">OK</button>\n  '
    },
    browserCheck = () => !0;
let MRDemo = null;
const pageAlert = Alert("alert");
$(document).ready(() => {
    MRDemo = new Demo(pageAlert), browserCheck() ? MRDemo.start() : pageAlert.warn(messages.incompatableBrowser)
});