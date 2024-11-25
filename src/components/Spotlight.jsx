import React from "react";

import { useScrapeStore } from "../store/ScraperStore";
import Scraper from "./Scraper";

const Spotlight = () => {
  const store = useScrapeStore();

  const handleDomReady = () => {
    const webview = store.webviewRef.current;
    console.log("DOM is ready");
    // webview.openDevTools();
    webview
      // .executeJavaScript('document.documentElement.outerHTML')
      .executeJavaScript(
        `
        (async function() {
          function searchInObjects(obj, searchString, visited = new Set(), path = 'window') {
              if (visited.has(obj)) {
                  return null;
              }
              visited.add(obj);

              const placeIdRegex = /placeid=([^&]+)/;

              for (let key in obj) {
                  try {
                      let newPath = path + "." + key;
                      if (typeof obj[key] === 'object' && obj[key] !== null) {
                          const result = searchInObjects(obj[key], searchString, visited, newPath);
                          if (result) {
                              return result;
                          }
                      } else if (typeof obj[key] === 'string' && obj[key].includes(searchString)) {
                          const match = obj[key].match(placeIdRegex);
                          if (match) {
                              return match[1];
                          }
                      }
                  } catch (e) {
                      // Skip properties that cause errors
                      continue;
                  }
              }

              return null;
          }

          function searchForTitle() {
            return window.document.title;
          }

          // Start the search from the global window object
          const placeId = searchInObjects(window.document, 'placeid');
          console.log(placeId);
          return {
            id: placeId,
            name: searchForTitle(),
          };
        })();
        `
      )
      .then(async (html) => {
        // webview.openDevTools();
        console.log("Source Code:", html);

        store.setPlace(html);
        store.setPlace({ id: html.id, name: html.name });
      })
      .catch((err) => console.error("Error getting source code:", err));
  };

  return (
    <>
      <div className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#d7dc54] p-[14px] w-[682px] h-[255px] rounded-[35px] drop-shadow-2xl z-50">
        <div className="bg-[#050318] w-[653px] h-[225px] rounded-[25px] drop-shadow-2xl">
          <div className="flex p-6 w-full">
            <div className="w-[90px] h-20 mr-50 mt-3">
              <img src="./assets/logob2.png" />
            </div>
            <div className="flex w-full h-20 gap-4 text-white text-[35px] p-4">
              {store.url != "" ? (
                <div>
                  {!store.place.id ? (
                    <div
                      className="ml-40  cursor-pointer"
                      onClick={() => handleDomReady()}
                    >
                      {"Pegar ID"}
                    </div>
                  ) : (
                    <div>
                      <div className="text-[16px]">{store.place.id}</div>
                      <div className="text-[16px]">
                        {store.place.name.replace(" - Google Maps", "")}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="text-[26px]">Buscador de ID's</div>
                  <div className="text-[16px]">v 0.0.1</div>
                </div>
              )}
            </div>
          </div>
          <div className="absolute w-[95%] bg-[#474747] h-[75px] rounded-[15px] bottom-4 left-4 z-8 text-[24px] text-white p-4 flex justify-between">
            <input
              className="w-[75%] h-full pl-5 outline-none"
              value={store.question}
              placeholder="// Cole o link do estabelecimento"
              onChange={(e) => {
                store.setQuestion(e.currentTarget.value);
              }}
            />
            <div
              className="bottom-6 right-8 cursor-pointer pr-1"
              onClick={async () => {
                store.setUrl(store.question);
              }}
            >
              <div className="w-[100px]">
                <img src="./assets/go.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Scraper />
    </>
  );
};

export default Spotlight;
