import Cesium from "cesium";
import {
  Cesium3DTileset,
  Cesium3DTileStyle,
  createWorldTerrain,
  Cartesian3,
  Scene,
  Matrix4,
  Math,
  Cartographic,
  Ion,
  IonResource,
  Viewer,
  OpenStreetMapImageryProvider,
  sampleTerrain,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "./css/main.css";

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMmNkMTY0ZS02ZjQzLTQ1YmMtYjkyOS1iMTM2ZGRhYzY0M2MiLCJpZCI6NTg3MjUsImlhdCI6MTYyNTM2NjEwNn0.hJZUnjHThFQjkUf-Vr8NFNz1r7VSOgxrWuyzh3V8to8";

var viewer = new Viewer("cesiumContainer", {
  terrainProvider: createWorldTerrain(),
  //Use OpenStreetMaps
  imageryProvider: new OpenStreetMapImageryProvider({
    url: "https://a.tile.openstreetmap.org/",
  }),
  shadows: true,
  shouldAnimate: true,
});

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

// city1.readyPromise.then(function (tileset) {
//   consol.log("reading");
//   consol.log("tileset", tileset);
//   // Position tileset
//   var boundingSphere = tileset.boundingSphere;
//   console.log(boundingSphere);

//   var cartographic = Cartographic.fromCartesian(boundingSphere.center);
//   var heightOffset = viewer.scene.sampleHeight(cartographic);
//   var surface = Cartesian3.fromRadians(
//     cartographic.longitude,
//     cartographic.latitude,
//     0.0
//   );
//   var offset = Cartesian3.fromRadians(
//     cartographic.longitude,
//     cartographic.latitude,
//     heightOffset
//   );
//   var translation = Cartesian3.subtract(
//     offset,
//     surface,
//     new Cesium.Cartesian3()
//   );
//   tileset.modelMatrix = Matrix4.fromTranslation(translation);
//   console.log(translation);
// });

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
      var pos = Cartographic.fromDegrees(x, y);
      var promise = sampleTerrain(viewer.terrainProvider, 11, pos);
      promise.then((uppdateposition) => {
        console.log(uppdateposition);
      });

      let height = model.height + 74;
      // let height = model.height + 77;
      var position = Cartesian3.fromDegrees(x, y, height);
      viewer.entities.add({
        name: model.name,
        position: position,
        model: { uri: resource },
      });
    });
  });
}

var positions = [
  Cartographic.fromDegrees(86.925145, 27.988257),
  Cartographic.fromDegrees(87.0, 28.0),
];
var promise = sampleTerrain(viewer.terrainProvider, 11, positions);
promise.then((uppdateposition) => {
  console.log(uppdateposition);
});

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
