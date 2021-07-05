import {
  Cesium3DTileset,
  createWorldTerrain,
  Cartesian3,
  Viewer,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "./css/main.css";

var viewer = new Viewer("cesiumContainer", {
  // terrainProvider: createWorldTerrain(),
  shadows: true,
  shouldAnimate: true,
});

// viewer.scene.primitives.add(
//   Cesium3DTileset({
//     url: "./assets/13110_meguro-ku/tileset.json",
//   })
// );
// viewer.scene.primitives.add(
//   Cesium3DTileset({
//     url: "./assets/13111_ota-ku/tileset.json",
//   })
// );
viewer.camera.flyTo({
  destination: Cartesian3.fromDegrees(
    139.68517220466106,
    35.60694405098508,
    1000
  ),
});

function createModel(models) {
  models.forEach((model) => {
    x = model.location.lng;
    y = model.location.lat;
    height = model.height + 73;
    url = `./assets/${model.model_type}/${model.model_type}.gltf`;

    var position = Cartesian3.fromDegrees(x, y, height);
    viewer.entities.add({
      name: model.name,
      position: position,
      model: {
        uri: url,
      },
    });
  });
}

window.addEventListener("load", () => {
  console.log("loaded");
  let models = staticLoadmodels();
  createModel(models);
});

function staticLoadmodels() {
  return [
    {
      id: 1,
      name: "本館",
      location: {
        lat: 35.60456954,
        lng: 139.68385423,
      },
      height: 20,
      model_type: "pin",
      caption: "",
      open_time: "",
    },
    {
      id: 2,
      name: "滝プラザ",
      location: {
        lat: 35.60618984,
        lng: 139.68464816,
      },
      height: 20,
      model_type: "pin",
      caption: "",
      open_time: "",
    },
    {
      id: 3,
      name: "東京工業大学附属図書館",
      location: {
        lat: 35.60644499,
        lng: 139.68397225,
      },
      height: 20,
      model_type: "pin",
      caption: "",
      open_time: "",
    },
    {
      id: 4,
      name: "百年記念館",
      location: {
        lat: 35.6068287769,
        lng: 139.68478654721,
      },
      height: 20,
      model_type: "pin",
      caption: "",
      open_time: "",
    },
  ];
}
