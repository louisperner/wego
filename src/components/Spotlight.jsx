import React, { useState } from "react";
import { useScrapeStore } from "../store/ScraperStore";
import Scraper from "./Scraper";
import Loading from "./Loading";
import EventForm from "./PlacesForm";

const Spotlight = () => {
  const store = useScrapeStore();
  const { create, setCreate } = store;

  const handleDomReady = () => {
    store.setLoading(true);
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
          const revealCard = document.querySelector("button[jsaction='reveal.card.latLng']")
          
          if(revealCard){
            const latLong = revealCard.textContent;

            return {
              id: false,
              name: false,
              latLong: latLong
            }
           } else {
             return {
               id: placeId,
               name: searchForTitle(),
               latLong: false
             };
           }

         
        })();
        `
      )
      .then(async (html) => {
        console.log(html);
        if (html.id) {
          // store.setPlace(html);
          store.setPlace({ id: html.id, name: html.name });
          store.setLoading(false);
        } else if (html.latLong) {
          // store.setPlace(html);
          store.setPlace({ latLong: html.latLong });
          store.setLoading(false);
        }
      })
      .catch((err) => console.error("Error getting source code:", err));
  };

  return (
    <>
      {!create ? (
        <div className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#d7dc54] p-[14px] w-[682px] h-[155px] rounded-[35px] drop-shadow-2xl z-50">
          <div className="bg-[#050318] w-[653px] h-[125px] rounded-[25px] drop-shadow-2xl">
            <div className="flex p-6 w-full">
              <div className="flex w-full h-20 gap-4 text-white p-4 justify-evenly">
                <img src="./assets/logob2.png" />
                <div className="">
                  <div className="flex w-full justify-between">
                    <div className="w-full min-w-[350px]">
                      {!store.place.id && !store.place.latLong ? (
                        <div>
                          <div className="text-[16px]">Buscador de ID's</div>
                          <div className="text-[16px]">v0.0.1</div>
                        </div>
                      ) : (
                        <div>
                          {store.place.id && (
                            <div className="text-[16px]">{store.place.id}</div>
                          )}
                          {store.place.latLong && (
                            <div>
                              <div className="text-[20px]">
                                {store.place.latLong}
                              </div>
                              <div className="text-[16px]">Custom place</div>
                            </div>
                          )}

                          <div className="text-[16px]">
                            {store.place.name &&
                              store.place.name.replace(" - Google Maps", "")}
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className="w-[100px] cursor-pointer"
                      onClick={() => handleDomReady()}
                    >
                      {!store.loading ? (
                        !store.place.latLong ? (
                          <img src="./assets/go.png" />
                        ) : (
                          <div onClick={() => setCreate(true)}>
                            <img src="./assets/go.png" />
                            <div className="text-[16px]">criar</div>
                          </div>
                        )
                      ) : (
                        <Loading />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EventForm />
      )}

      <Scraper />
    </>
  );
};

export default Spotlight;
