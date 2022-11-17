// ==UserScript==
// @name         qm
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  fast blacket spammer
// @author       qaiik
// @match        https://v2.blacket.org/market
// @icon         https://www.google.com/s2/favicons?sz=64&domain=blacket.org
// @grant        unsafeWindow
// ==/UserScript==

function fix() {
    unsafeWindow.location.href = "https://v2.blacket.org/market"
}

setInterval(fix, 1000 * (60 * 2))
if (!localStorage.pack) localStorage.pack = "Space"
function packmodal() {
  const $ = unsafeWindow["$"];
  const document = unsafeWindow["document"];
  $("body").append(`<div id="pop" class="arts__modal___VpEAD-camelCase">
            <form class="styles__container___1BPm9-camelCase">
                <div class="styles__text___KSL4--camelCase">Set pack</div>
                <div class="styles__holder___3CEfN-camelCase">
                    <div class="styles__numRow___xh98F-camelCase">
                        <div style="border: 3px solid rgba(0, 0, 0, 0.17);
                        border-radius: 6px;
                        width: 90%;
                        height: 50px;
                        margin: 0px;
                        display: flex;
                        flex-direction: row;
                        align-items: center;"><input id="textp" style="  border: none;
                        height: 40px;
                        line-height: 40px;
                        font-size: 28px;
                        text-align: center;
                        font-weight: 700;
                        font-family: Nunito, sans-serif;
                        color: #ffffff;
                        background-color: #3f3f3f;
                        outline: none;
                        width: 100%;
                      " placeholder="Pack" maxlength="16" value="" style="width: 60px;"/></div>
                    </div>
                    <div id="setpbutton" class="styles__buttonContainer___2EaVD-camelCase">
                        <div class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" role="button" tabindex="0">
                            <div class="styles__shadow___3GMdH-camelCase"></div>
                            <div class="styles__edge___3eWfq-camelCase" style="background-color: #2f2f2f;"></div>
                            <div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: #2f2f2f;">Set</div>
                        </div>
                        <div id="cancelbutton" class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" role="button" tabindex="0">
                            <div class="styles__shadow___3GMdH-camelCase"></div>
                            <div class="styles__edge___3eWfq-camelCase" style="background-color: #2f2f2f;"></div>
                            <div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: #2f2f2f;">Cancel</div>
                        </div>
                    </div>
                </div>
                <input type="submit" style="opacity: 0; display: none;" />
            </form>
                    </div>`);

            document.querySelector("#setpbutton").onclick = () => {
              localStorage.pack = document.querySelector("#textp").value
              document.querySelector("#pop").remove()
            }

            document.querySelector("#cancelbutton").onclick = () => {
              document.querySelector("#pop").remove()
            }
}

const blacket = unsafeWindow["blacket"]
class gbutils {
  constructor() {
    this.pack = localStorage.pack
      setInterval(this.open, 400)
  }

  open() {
    this.pack = localStorage.pack
    blacket.requests.post("/worker/open", {pack:this.pack}, function(d){
      console.log(d)
      if (d.error) fix()
    })
  }

}

const _gb = new gbutils()
unsafeWindow.gb = _gb

unsafeWindow.addEventListener("keyup", (e) => {
  if (e.code == "KeyC" && e.ctrlKey) {
    e.preventDefault()
    packmodal(_gb)
  }
})
