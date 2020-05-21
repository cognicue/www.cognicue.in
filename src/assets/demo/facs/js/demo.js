function Demo(pageAlert, metric) {
    const t = this;

    this.States = {
        CONSENT: "CONSENT",
        LOADING: "LOADING",
        RECORDING: "RECORDING",
        PLAYBACK: "PLAYBACK",
        SUMMARY: "SUMMARY"
    };

    let current_state = t.States.CONSENT
      , o = !1
      , n = null
      , s = !1
      , i = 0
      , r = 0
      , l = 0
      , d = !0
      , c = null
      , m = !1
      , subject = $("#media-subject")
      , video = $("#media-stimulus")
      , video_playback = $("#media-object");

    let recorder, stream, capturer, beam, demo_type;

    const u = 20, p = metric;

    let g = AsyncPlayer("media-stimulus")
      , h = AsyncPlayer("media-object")
      , j = AsyncPlayer("media-subject")
      , y = new Graph("#svg-curve",{
                emoRoot: "#emotion-buttons",
                buttons: p
            })
      , b = Summarizer(p)
      , w = pageAlert;


    this.state = (()=>current_state),
    this.start = (()=>Promise.all([k(), v()]).then(C).then(()=>{
                    A()
                })["catch"](e=>{
                    w.warn(e)
                }));

    const f = (e,t)=>{
        let a = ()=>new Promise(e=>{
            $(t).fadeIn(300, ()=>{
                e()
            })
        });
        return new Promise(t=>{
            $(e).fadeOut(200, ()=>{
                t()
            })
        }).then(a)
    }

      , v = ()=>new Promise(e=>{
        $("#demo-consent").one("click", ()=>{
            f("#consent-container", "#loading-container").then(e)
        })
    })

      , k = ()=>new Promise((e,t)=>{
        $("#loading-text").text(messages.loadingPlayer);
        const video_src = video.attr("data");
        g("load", video_src, a=>{
            "loaded" === a ? e() : "error" === a ? w.warn(messages.videoLoadingFailure) : t(a)
        })
    })

      , C = ()=>new Promise((e,t)=>{
        
        let a = document.getElementById("facevideo-node");

        (c = new affdex.CameraDetector(a)).detectAllEmotions(),
            c.detectAllExpressions(),c.detectAllAppearance(),
            c && !c.isRunning && c.start(),

            c.addEventListener("onWebcamConnectSuccess", ()=>{

            }),
            c.addEventListener("onWebcamConnectFailure", ()=>{
                t(messages.webcamFailure)
            }),
            c.addEventListener("onInitializeSuccess", ()=>{
                e()
            }),
            c.addEventListener("onImageResultsSuccess", P),

            $("#facevideo-node video")[0].addEventListener("playing", ()=>{
                $("#loading-text").text(messages.detectorLoaded)
            })
        })

      , P = e=>{
        if (current_state === t.States.RECORDING && s) {
            m || (i = Date.now(),m = !0), e.length > 0 
            ? data = Object.assign({}, e[0].emotions, e[0].expressions) 
            : data = undefined,b.log(data);

            const t = S();
            l > u && d && (d = !1, w.warn(messages.noFace)),
            e.length > 0 ? (d || (d = !0, w.hide()),l = 0,y.updatePlot(data, t)) : (l++,y.noData(t))
        }
    }
      , S = ()=>Date.now() - i

      , startPresenting = async () => {
          await navigator.mediaDevices.getDisplayMedia({
            video: { mediaSource: "screen" },
            audio: true
          }).catch((e)=>{w.warn(messages.noPresent)}).then((_stream)=>{

          video.attr("poster", present_conf.play);
          video_playback.attr("poster", present_conf.share);

          stream = _stream;
          recorder = new MediaRecorder(stream);

          const chunks = [];

          recorder.onstart = e => {
            s = !0,startCapturing()
            setTimeout(presentTimeout, present_conf.timeout*1000);
          },
          recorder.ondataavailable = e => {
            chunks.push(e.data);
          },
          recorder.onstop = e => {
            const completeBlob = new Blob(chunks, { type: chunks[0].type });
            video_playback.attr("src", URL.createObjectURL(completeBlob));
            video_playback.attr("data", null);
          },
          recorder.onerror = e => {
          };

          recorder.start();
          video.srcObject = stream;

        })

    }

      , stopPresenting = ()=>{
            recorder && recorder.state === "recording" ?
            (recorder.stop(),stream.getVideoTracks()[0].stop()) : !0
    }

    , startCapturing = async () =>{
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        }).catch((e)=>{w.warn(messages.noPresent)}).then((_stream)=>{

              beam = _stream;
              capturer = new MediaRecorder(beam);
              const chunks = [];

              capturer.onstart = e => {
              },
              capturer.ondataavailable = e => {
                chunks.push(e.data);
              },
              capturer.onstop = e => {
                const completeBlob = new Blob(chunks, { type: chunks[0].type });
                subject.attr("src", URL.createObjectURL(completeBlob));
                j('load');
              },
              capturer.onerror = e => {
              };

              capturer.start();

            })
    }

      , stopCapturing = ()=>{
            capturer && capturer.state === "recording" ?
            (capturer.stop(),beam.getVideoTracks()[0].stop()) : !0
    }    


      , A = ()=>{
            w.hide(),
            f("#loading-container", "#demo-container").then(()=>{
                current_state = t.States.RECORDING,
                w.warn(messages.videoStart),
                y.initPlot(document.getElementById("media-stimulus").duration, $("#video-wrapper").width()),
                y.initButtons(),

                $("#startVideo").one("click", ()=>{
                    $("#showControl").fadeIn(100),
                    demo_type = "play",
                    g("play", null, (e,o)=>{
                        "video start" === e || (
                            "buffer finished" === e ? m && (s = !0, r += o) 
                            : "buffer started" === e ? m && (s = !1) 
                            : "ended" === e ? (s = !1, current_state === t.States.PLAYBACK ? y.translateCursor(0) : E(), g("seek", 0), g("pause"), stopCapturing())
                            : "network fail" === e ? (s = !1, c.stop(), w.warn("No Internet")) 
                            : "error" === e && w.warn(o)
                        )
                    }),
                    s = !0,
                    startCapturing();
                }),
                $("#startShare").one("click", ()=>{
                    $("#showControl").fadeIn(100),
                    y.clearPlot(present_conf.timeout),
                    demo_type = "present",
                    startPresenting();
                }),
                $("#stopFACS").one("click", ()=>{
                    demo_type === "play" ? (E(a=>{
                        "stop recording" === a ? stopCapturing() : !0}),g("pause")) :
                    E(a=>{
                        "stop recording" === a ? (stopPresenting(),stopCapturing()) : "loaded" === a ? (h("seek", 0), h("pause")) : !0
                    });
                })
            })
    }

    , presentTimeout = ()=>{
        s && $("#stopFACS").length && $("#stopFACS").click();
    }


      , E = (p=()=>{})=>{
        current_state = t.States.PLAYBACK,
        c.stop(),
        b.done(),
        w.hide(),
        p("stop recording"),
        $("#alert").data("bs.modal")._config.keyboard = !0,
        $("#alert").data("bs.modal")._config.backdrop = !0,
        w.warn(messages.videoEnd),
        $("#alert").on("hidden.bs.modal", ()=>{
            const e = video_playback.attr("data");
            h("load", e, p),

            video.css("display", "none"),
            subject.css("display", "block"),            
            video_playback.css("display", "block"),

            (demo_type === "play" && subject.prop('muted', true)),

            $("#showSubject").fadeIn(200),
            $("#showSummary").fadeIn(200),
            $("#showControl").fadeOut(100),

            bindPlayerOnKeypress(),
            bindPlayerOnD3()
        })
    }

      , bindPlayerOnD3 = ()=>{
        let e = y.initializeCursor();
        B(),
        e.call(d3.drag().on("drag", N).on("start", L).on("end", R)),
        y.getCurveBox().on("click", O),
        $("#summaryButton").on("click", x)
    }
      , bindPlayerOnKeypress = ()=>{
        document.onkeypress = (e=>{
            32 == (e || window.event).charCode && ((h("getPlayingState") || j("getPlayingState")) ? (h("pause"),j("pause")) : (h("resume"),j("resume")))
        }
        )
    }
      , N = ()=>{
        const e = y.clipX(d3.event.x), t = y.playbackFromX(e);
        y.translateCursor(e),
        h("seek", t),
        j("seek", t)
    }
      , L = ()=>{
        (h("getPlayingState") || j("getPlayingState")) && (clearInterval(n), o = !0, h("pause"), j("pause")),
        y.setMousePointerDragging()
    }
      , R = ()=>{
        o && (h("resume"), j("resume"), o = !1, h("setPlayingState", !0), j("setPlayingState", !0), B()),
        y.setMousePointerUndragging()
    }
      , O = function() {
        const e = y.clipX(d3.mouse(this)[0]) , t = y.playbackFromX(e);
        (h("getPlayingState") || j("getPlayingState")) ? (clearInterval(n), y.translateCursor(e), h("seek", t), j("seek", t), B()) : (y.translateCursor(e), h("seek", t), j("seek", t));
    }
      , B = ()=>{
            n = setInterval(()=>{
                        const e = y.playbackToX(h("getCurrentTime"));
                        y.translateCursor(e)
                    }
                , 50)
    }

      , x = ()=>{
            g("pause"),
            f("#demo-container", "#summary-container"),
            $("#demoButton").on("click", ()=>{
                f("#summary-container", "#demo-container")
            })
    }

}


const _messages = {
    incompatableBrowser: "It appears that you are using an unsupported browser. Please try this demo on an updated version of Chrome, Firefox, Opera or Edge.",
    loadingPlayer: "Loading Player...",
    webcamFailure: "Unable to connect to webcam, please make sure your webcam is connected, and this page has permission to access it.",
    detectorLoaded: "Loading the emotion detector...",
    noFace: "<h4>No face detected</h4> <p>Please make sure your face is in view of the webcam.</p>",
    videoStart: '\n  <h4>Welcome!</h4>\n  <p>We are about to play a video for you. While that video is playing, we will be using your webcam to determine your emotional engagement.</p>\n  <p>The graph below will plot your engagement with the video over time using various metrics. You can focus on a specific metric by clicking a label on the left.</p>\n  <button type="button" class="btnC btn btn-primary float-left" id="startShare" data-dismiss="modal">Present <i class="fa fa-share-square-o"></i></button><button type="button" class="btnC btn btn-primary float-right" id="startVideo" data-dismiss="modal">Play <i class="fa fa-play-circle"></i></button>\n  ',
    videoEnd: '\n  <p>Analysis Complete!</p>\n  <p>Now that your analysis has finished, you can playback the video and see your emotional reactions to it over time.</p>\n  <p>You can use the video controls to play, pause, and seek the video. Also, you can click in the graph to seek the video to that point in time and press the spacebar key to play or pause the video.</p>\n  <p>Use the buttons to the left of the video to highlight a specific metric or highlight all metrics.</p>\n  <br>\n  <button type="button" class="btnC btn btn-primary float-right" data-dismiss="modal">OK</button>\n  ',
    noPresent: '\n  <p>Analyse New Video</p>\n  <p>Now that your analysis has finished, you can playback the video and see your emotional reactions to it over time.</p>\n  <p>You can use the video controls to play, pause, and seek the video. Also, you can click in the graph to seek the video to that point in time and press the spacebar key to play or pause the video.</p>\n  <p>Use the buttons to the left of the video to highlight a specific metric or highlight all metrics.</p>\n  <br>\n  <a href="." class="btnC btn btn-info float-right">Cancel</a>\n  ',
}
  , browserCheck = ()=>!0;



let FACSDemo = null;
const pageAlert = Alert("alert");

$(document).ready(()=>{
    FACSDemo = new Demo(pageAlert, metric),
    browserCheck() ? FACSDemo.start() : pageAlert.warn(messages.incompatableBrowser)
});
