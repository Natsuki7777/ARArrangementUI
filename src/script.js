//------------------------firebase----------------------------------------
// const firebaseConfig = {
//   apiKey: "AIzaSyD4YpyFameyN-vur5feYE989hb6VpxmNos",
//   authDomain: "socialar-9a0d4.firebaseapp.com",
//   databaseURL:
//     "https://socialar-9a0d4-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "socialar-9a0d4",
//   storageBucket: "socialar-9a0d4.appspot.com",
//   messagingSenderId: "236737913974",
//   appId: "1:236737913974:web:31fe2c2f8b3ba475eb6b57",
//   measurementId: "G-XJLY1GV226",
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// var storage = firebase.app().storage("gs://socialar-9a0d4.appspot.com");

//---------------------Cesium 基本設定----------------------------------------
const viewer = new Cesium.Viewer("cesiumContainer", {
  terrainProvider: Cesium.createWorldTerrain(),
  imageryProvider: new Cesium.OpenStreetMapImageryProvider({
    url: "https://a.tile.openstreetmap.org/",
  }),
  infoBox: false,
  shadows: true,
  shouldAnimate: true,
});

var tileset1 = viewer.scene.primitives.add(
  new Cesium.Cesium3DTileset({
    url: "./src/assets/13110_meguro-ku/tileset.json",
  })
);
var tileset2 = viewer.scene.primitives.add(
  new Cesium.Cesium3DTileset({
    url: "./src/assets/13111_ota-ku/tileset.json",
  })
);

viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(
    139.6846917645,
    35.6059416358,
    200
  ),
});

//--------------------add 3dmodel from loacal------------------------
//load models
var gltfModels = staticLoadmodels();

function createModel(models) {
  models.forEach((model) => {
    let x = model.location.lng;
    let y = model.location.lat;

    let terrainProvider = Cesium.createWorldTerrain();
    // List でないとダメ！！！！！！
    let positions = [Cesium.Cartographic.fromDegrees(x, y)];
    let promise = Cesium.sampleTerrainMostDetailed(terrainProvider, positions);
    Cesium.when(promise, function (updatedPositions) {
      console.log(updatedPositions);
      height = model.height + updatedPositions[0].height;
      url = `./src/assets/${model.model_type}/${model.model_type}.gltf`;

      let position = Cesium.Cartesian3.fromDegrees(x, y, height);
      viewer.entities.add({
        id: model.id,
        name: model.name,
        position: position,
        model: {
          uri: url,
        },
      });
    });
  });
}

//---------------3dmodel が選択された時の操作------------------------

function pickEntity(viewer, windowPosition) {
  var picked = viewer.scene.pick(windowPosition);
  if (Cesium.defined(picked)) {
    var entity = Cesium.defaultValue(picked.id, picked.primitive.id);
    if (entity instanceof Cesium.Entity) {
      console.log(entity.id);
      return id;
    }
  }
  return undefined;
}
viewer.scene.canvas.addEventListener("click", function (event) {
  pickEntity(viewer, event);
});

//  ----------------- add 3dmodel from firebase------------------------
// function createModel(models) {
//   models.forEach((model) => {
//     var x = model.location.lng;
//     var y = model.location.lat;

//     var terrainProvider = Cesium.createWorldTerrain();
//     // List でないとダメ！！！！！！
//     var positions = [Cesium.Cartographic.fromDegrees(x, y)];
//     var promise = Cesium.sampleTerrainMostDetailed(terrainProvider, positions);
//     Cesium.when(promise, function (updatedPositions) {
//       console.log(updatedPositions);
//       height = model.height + updatedPositions[0].height;
//       console.log(model.name);
//       var position = Cesium.Cartesian3.fromDegrees(x, y, height);
//       console.log(position);
//       var ref = storage.ref("/3Dmodel/pin.gltf").getDownloadURL();
//       ref.then((url) => {
//         viewer.entities.add({
//           name: model.name,
//           position: position,
//           model: {
//             uri: url,
//           },
//         });
//       });
//     });
//   });
// }
//  ----------------- add 3dmodel from firebase------------------------

// ------緯度経度表示マーカーを先に作ってこいつを移動させる------------
viewer.pickTranslucentDepth = true;
const locationMarker = viewer.entities.add({
  name: "location",
  point: {
    pixelSize: 10,
    color: Cesium.Color.RED,
    outlineColor: Cesium.Color.WHITE,
    outlineWidth: 2,
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
  },
  label: {
    text: "check",
    font: "14pt monospace",
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    outlineWidth: 4,
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    pixelOffset: new Cesium.Cartesian2(0, -9),
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
  },
});

//----------------------- mouse position--------------------------
viewer.scene.canvas.addEventListener("contextmenu", function (event) {
  // var entity = viewer.entities.getById("mou");
  event.preventDefault();
  const mousePosition = new Cesium.Cartesian2(event.clientX, event.clientY);
  const selectedLocation = viewer.scene.pickPosition(mousePosition);
  const cartio = Cesium.Cartographic.fromCartesian(selectedLocation);
  console.log(cartio);
  if (cartio) {
    var longitudeString = Cesium.Math.toDegrees(cartio.longitude);
    var latitudeString = Cesium.Math.toDegrees(cartio.latitude);
    document.getElementById("mousePosition").innerHTML =
      "(" + latitudeString + ", " + longitudeString + ")";

    locationMarker.position = selectedLocation;
    locationMarker.label.text =
      "(" + latitudeString + ", " + longitudeString + ")";
  } else {
    return;
  }
});

//---------------------------------------------------------------------------
window.addEventListener("load", () => {
  console.log("loaded");
  createModel(gltfModels);
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

//------------infoBox で操作しようとした残骸---------------
// viewer.infoBox.frame.removeAttribute("sandbox");
// viewer.infoBox.frame.src = "about:blank";
// console.log(viewer.infoBox.frame);

// function entityDescription(model) {
//   let x = model.location.lng;
//   let y = model.location.lat;
//   let url = `./src/assets/${model.model_type}/${model.model_type}.gltf`;
//   let description = url;
//   // `<iframe
//   //       src="http://127.0.0.1:5500/ARArrangementUI/src/modelbox.html"
//   //       frameborder="0"
//   //     ></iframe>`;

//   //   `<script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
//   //   <script src="https://cdn.jsdelivr.net/gh/donmccurdy/aframe-extras@v6.1.1/dist/aframe-extras.min.js"></script>
//   //   <script src="https://unpkg.com/aframe-orbit-controls@1.2.0/dist/aframe-orbit-controls.min.js"></script>
//   //     `<a-scene vr-mode-ui="enabled: false">
//   //     <a-assets>
//   //       <a-asset-item id="pin" src="./assets/pin/pin.gltf"></a-asset-item>
//   //     </a-assets>
//   //     <a-sky color="#ECECEC"></a-sky>
//   //     <a-entity
//   //       camera
//   //       look-controls
//   //       orbit-controls="target: 0 1.6 -0.5; minDistance: 0.5; maxDistance: 180; initialPosition: 0 5 15"
//   //     ></a-entity>
//   //   </a-scene>

//   // <script>
//   //   var scene = document.querySelector("a-scene");
//   //   let model = document.createElement("a-entity");
//   //   var model_type = "pin";
//   //   model.setAttribute(
//   //     "gltf-model",
//   //     ${url}
//   //   );
//   //   model.setAttribute("animation-mixer", "");
//   //   model.setAttribute("response-type", "arraybuffer");

//   //   scene.appendChild(model);
//   // </script>
//   //    `;
//   return description;
// }
