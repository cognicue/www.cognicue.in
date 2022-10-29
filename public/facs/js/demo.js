function Demo(pageAlert, metric, defaults) {
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

    const u = 20, p = metric, q = defaults;

    let g = AsyncPlayer("media-stimulus")
      , h = AsyncPlayer("media-object")
      , j = AsyncPlayer("media-subject")
      , y = new Graph("#svg-curve",{
                emoRoot: "#emotion-buttons",
                buttons: p,
                defaults: q
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

      , lock = (orientation)=>{
        function mobileAndTabletCheck() {
          let check = false;
          (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
          return check;
        };

        if (mobileAndTabletCheck()) {
          // Go into full screen first
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
          } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
          }
          try{
            // Then lock orientation
            screen.orientation.lock(orientation);
          }
          catch{
            console.log("Screen Orientation Web API Not Supported");
          }
        }
    }

      , v = ()=>new Promise(e=>{
        $("#demo-consent").one("click", ()=>{
            lock("landscape-primary");
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
            audio: false
          }).catch(e=>{w.warn(messages.noPresent)}).then(_stream=>{

          video.attr("poster", DEMO_TYPE.present);
          video_playback.attr("poster", DEMO_TYPE.play);

          stream = _stream;
          try{
            recorder = new MediaRecorder(stream);
          }
          catch{
            $("#checkMediaRecorder").html(messages.noMediaRecorder);
            s = !0,startCapturing();
            return;
          }

          const chunks = [];

          recorder.onstart = e => {
            s = !0,startCapturing()
            setTimeout(presentTimeout, DEMO_TYPE.presentTimeout*1000);
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
          recorder && recorder.state === "recording" && recorder.stop();
          stream && stream.getVideoTracks()[0].stop();
    }

    , startCapturing = async (audio=false) =>{
        await navigator.mediaDevices.getUserMedia({
          video: { mirrored: true },
          audio: audio
        }).catch(e=>{w.warn(messages.noPresent)}).then(_stream=>{

              if(demo_type==="watch"){
                let mirror = document.querySelector('#media-stimulus')
                  , buffer = document.querySelector('#media-object');

                mirror.style.webkitTransform = buffer.style.webkitTransform = "scaleX(-1)";
                mirror.style.transform = buffer.style.transform = "scaleX(-1)";
                
                mirror.srcObject = _stream;
                mirror.play();
                mirror.onplay = function() {
                  video.prop('muted', true);
                  video.css("display", "block");
                };
              }

              beam = _stream;
              try{
                capturer = new MediaRecorder(beam);
              }
              catch{
                $("#checkMediaRecorder").html(messages.noMediaRecorder);
                return;
              }
              const chunks = [];

              capturer.onstart = e => {
              },
              capturer.ondataavailable = e => {
                chunks.push(e.data);
              },
              capturer.onstop = e => {
                const completeBlob = new Blob(chunks, { type: chunks[0].type });
                if(demo_type==="watch"){
                  video_playback.attr("src", URL.createObjectURL(completeBlob));
                  video_playback.attr("data", null);
                }
                else{
                  subject.attr("src", URL.createObjectURL(completeBlob));
                  j('load'),j("seek", 1000000000),j("seek", 0),j("pause");
                }
              },
              capturer.onerror = e => {
              };

              capturer.start();

            })
    }

      , stopCapturing = ()=>{
            capturer && capturer.state === "recording" && capturer.stop();
            beam && beam.getVideoTracks()[0].stop();
    }

      , startMirroring = ()=>{
          $("#checkMediaRecorder").html(messages.verbalAnalyticsBody);
          $('#rhsCardHeader').text(messages.verbalAnalyticsCard)
      }


      , A = ()=>{
            w.hide(),
            f("#loading-container", "#demo-container").then(()=>{
                current_state = t.States.RECORDING,
                // w.warn(messages.demoMessage),
                messages.demoMessage(),
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
                    y.clearPlot(DEMO_TYPE.presentTimeout),
                    demo_type = "present",
                    startPresenting();
                }),
                $("#startMirror").one("click", ()=>{
                    $("#showControl").fadeIn(100),
                    y.clearPlot(60),
                    demo_type = "watch",
                    s = !0,
                    startMirroring();
                    startCapturing(true);
                }),                
                $("#stopFACS").one("click", ()=>{
                    if(demo_type === "play"){
                      (E(a=>{
                        "stop recording" === a ? stopCapturing() : !0}),g("pause"))
                    }
                    else if(demo_type === "present"){
                      E(a=>{
                          "stop recording" === a ? (stopPresenting(),stopCapturing()) : "loaded" === a ? (h("seek", 0), h("pause")) : !0
                      });
                    }
                    else if(demo_type === "watch"){
                      E(a=>{
                          "stop recording" === a ? (stopCapturing()) : "loaded" === a ? (h("seek", 0), h("pause")) : !0
                      });
                    }                    

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
            });
            setSubjectDuration();
            setObjectDuration();
    }

      , getDuration =  e=>{
          let video = document.getElementById(e)
            , duration = Math.round(video.duration);

          return duration === Infinity ? "-" : duration || "--";
      }

      , setObjectDuration = ()=>{
          let subject = getDuration("media-object");
          $("#summaryObject").html(subject);
      }

      , setSubjectDuration = ()=>{
          let subject = getDuration("media-subject");
          $("#summarySubject").html(subject);
      }

}

browserCheck = ()=>!0;



let FACSDemo = null;
const pageAlert = Alert("alert");

$(document).ready(()=>{
    FACSDemo = new Demo(pageAlert, metric, defaults),
    browserCheck() ? FACSDemo.start() : pageAlert.warn(messages.incompatableBrowser)
});
