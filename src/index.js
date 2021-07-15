import {
  Cesium3DTileset,
  Cesium3DTileStyle,
  createWorldTerrain,
  Color,
  Cartesian3,
  Ellipsoid,
  Scene,
  Matrix4,
  Math,
  Cartographic,
  Ion,
  IonResource,
  Viewer,
  OpenStreetMapImageryProvider,
  sampleTerrainMostDetailed,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "./css/main.css";

import GsiTerrainProvider from "cesium-gsi-terrain";

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMmNkMTY0ZS02ZjQzLTQ1YmMtYjkyOS1iMTM2ZGRhYzY0M2MiLCJpZCI6NTg3MjUsImlhdCI6MTYyNTM2NjEwNn0.hJZUnjHThFQjkUf-Vr8NFNz1r7VSOgxrWuyzh3V8to8";

var viewer = new Viewer("cesiumContainer", {
  terrainProvider: createWorldTerrain(),
  // terrainProvider: new GsiTerrainProvider({}),
  baseLayerPicker: false,
  //Use OpenStreetMaps
  imageryProvider: new OpenStreetMapImageryProvider({
    url: "https://a.tile.openstreetmap.org/",
  }),
  // shadows: true,
  shouldAnimate: true,
});

//地形の下を見えなくする
// viewer.scene.globe.depthTestAgainstTerrain = true;

var city1 = viewer.scene.primitives.add(
  new Cesium3DTileset({
    url: IonResource.fromAssetId(510093),
  })
);
var city2 = viewer.scene.primitives.add(
  new Cesium3DTileset({
    url: IonResource.fromAssetId(510091),
  })
);

viewer.camera.flyTo({
  destination: Cartesian3.fromDegrees(
    139.68517220466106,
    35.60694405098508,
    1000
  ),
});

function createModel(models) {
  models.forEach((model) => {
    IonResource.fromAssetId(510457).then(function (resource) {
      let x = model.location.lng;
      let y = model.location.lat;

      // not working
      var pos = new Cartographic.fromDegrees(x, y);
      console.log("pos", pos);
      console.log(viewer.terrainProvider);
      var promise = sampleTerrainMostDetailed(viewer.terrainProvider, pos);
      promise.then((uppdateposition) => {
        console.log(
          "uppdateposition",
          Math.toDegrees(uppdateposition.latitude),
          Math.toDegrees(uppdateposition.longitude),
          Math.toDegrees(uppdateposition.height)
        );
      });

      let height = model.height + 77;
      var position = Cartesian3.fromDegrees(x, y, height);
      viewer.entities.add({
        name: model.name,
        position: position,
        model: { uri: resource },
      });
    });
  });
}

let models = staticLoadmodels();
createModel(models);

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
