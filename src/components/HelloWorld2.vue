<template>
  <div>
    <!-- <div id="myDiagramDiv" style="width:600px;height:600px">
    </div> -->
    <div class="radar">
      <div class="fan"></div>
    </div>
  </div>
</template>

<script>
import go from 'gojs';
/* eslint-disable */
let $ = go.GraphObject.make // 后面很多用到该变量来初始化diagram
export default {
  name: 'diagram',
  props: ['modelData'],
  data() {
    return {
      diagram: null,
      myDiagram: null
    }
  },
  watch: {
  },
  methods: {
    init() {
      var myDiagram =
        $(go.Diagram, "myDiagramDiv",
          {
            "undoManager.isEnabled": true,
            layout: $(go.TreeLayout,
              { angle: 90, layerSpacing: 35 })
          });

      // the template we defined earlier
      myDiagram.nodeTemplate =
        $(go.Node, "Horizontal",
          { background: "#44CCFF" },
          $(go.Picture,
            { margin: 10, width: 50, height: 50, background: "red" },
            new go.Binding("source")),
          $(go.TextBlock, "Default Text",
            { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
            new go.Binding("text", "name"))
        );

      // define a Link template that routes orthogonally, with no arrowhead
      myDiagram.linkTemplate =
        $(go.Link,
          { routing: go.Link.Orthogonal, corner: 5 },
          $(go.Shape, // the link's path shape
            { strokeWidth: 3, stroke: "#555" }));

      var model = $(go.TreeModel);
      model.nodeDataArray =
        [
          { key: "1", name: "Don Meow", source: "cat1.png" },
          { key: "2", parent: "1", name: "Demeter", source: "cat2.png" },
          { key: "3", parent: "1", name: "Copricat", source: "cat3.png" },
          { key: "4", parent: "3", name: "Jellylorum", source: "cat4.png" },
          { key: "5", parent: "3", name: "Alonzo", source: "cat5.png" },
          { key: "6", parent: "2", name: "Munkustrap", source: "cat6.png" }
        ];
      myDiagram.model = model;
    }
  },
  mounted() {
    // this.init()
    // Default options are marked with *
    fetch('http://10.70.41.50:32080/edge-server/transmit/v1/list', {
      // body: JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNoUy0EOgyAQRuG7_GtJisNMDZcxyAwNTapGdNV499Lty_e-aNeCiIQBV7NjropIA1reduvd9GVz0k9dO6jpRPTi5cHM0tX7rP_X85OtmCMmdiGJukVJXfCSC095DBRw_wAAAP__.vtAbXV6V5B-TVCQw76T-k6U1cDfv-bE7x38ZUmYcYME',
        'userId': 3,
        'userName': 'a',
        'IOT-LANGUAGE': 'zh_CN'
      },
      method: 'get', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
      params: {
        pageSize: 10,
        pageNum: 1
      }
    })
      .then(response => response.json()) // parses response to JSON
  }
};
</script>

<style >
.myDiagramDiv{
  position: relative;
}
.zhezhao{
  position: absolute;
  left: 0;
  top: 0;
  width: 100px;
  height: 100px;
  background: red;
  z-index: 11111111;
}
.radar {
  overflow: hidden;
  position: relative;
  margin: 200px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #5ef2ff;
  box-sizing: border-box;
}

.radar::before {
  width: 100px; 
  height: 200px;
  content: '';
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  border-left: 1px solid #5ef2ff;
}

.radar::after {
  width: 200px; 
  height: 100px;
  content: '';
  display: block;
  box-sizing: border-box;
  border-bottom: 1px solid #5ef2ff;
}

.fan {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  box-sizing: border-box;
  border: 1px solid #5ef2ff;
  width: 100px;
  height: 100px;
}

.fan::after {
  content: "";
  width: 100px;
  height: 100px;
  display: block;
  box-sizing: border-box;
  position: relative;
  top: -50%;
  right: -50%;
  transform-origin: 0% 100%;
  border-bottom: 3px solid transparent;
  border-image: linear-gradient(to right, transparent, #5ef2ff);
  border-image-slice: 3;
  background: transparent;
  background-image: linear-gradient(to right, transparent, #9bfdfd);
  animation: rotateAnimate 2s linear infinite;
}

@keyframes rotateAnimate {
  from {
    transform: rotate(0deg) skew(-10deg)
  }
  to {
    transform: rotate(360deg) skew(-10deg)
  }
}

</style>