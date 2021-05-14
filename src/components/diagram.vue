<template>
  <div id="myDiagramDiv" style="width:1920px;height:1000px">
    <div class="zhezhao"></div>
  </div>
</template>

<script>
/* eslint-disable */
let $ = go.GraphObject.make // 后面很多用到该变量来初始化diagram
export default {
  name: 'diagram',
  props: ['modelData'],
  data() {
    return {
      diagram: null
    }
  },
  mounted: function() {
  let  myDiagram =
        $(go.Diagram, "myDiagramDiv",
          {
            allowCopy: false,
            "draggingTool.dragsTree": true,
            "commandHandler.deletesTree": true,
            layout:
              $(go.TreeLayout,
                { angle: 90, arrangement: go.TreeLayout.ArrangementFixedRoots }),
            "undoManager.isEnabled": true
          });

      // when the document is modified, add a "*" to the title and enable the "Save" button
      myDiagram.addDiagramListener("Modified", function(e) {
        var button = document.getElementById("SaveButton");
        if (button) button.disabled = !myDiagram.isModified;
        var idx = document.title.indexOf("*");
        if (myDiagram.isModified) {
          if (idx < 0) document.title += "*";
        } else {
          if (idx >= 0) document.title = document.title.substr(0, idx);
        }
      });

      var bluegrad = $(go.Brush, "Linear", { 0: "#C4ECFF", 1: "#70D4FF" });
      var greengrad = $(go.Brush, "Linear", { 0: "#B1E2A5", 1: "#7AE060" });

      // each action is represented by a shape and some text
      var actionTemplate =
        $(go.Panel, "Horizontal",
          $(go.TextBlock,
            { font: "10pt Verdana, sans-serif" },
            new go.Binding("text")
          )
        );

      // each regular Node has body consisting of a title followed by a collapsible list of actions,
      // controlled by a PanelExpanderButton, with a TreeExpanderButton underneath the body
      myDiagram.nodeTemplate =  // the default node template
        $(go.Node, "Vertical",
         {
          // 添加点击事件
          click: function(e, obj) {
            // obj.lb
          }
        },
          new go.Binding("isTreeExpanded").makeTwoWay(),  // remember the expansion state for
          new go.Binding("wasTreeExpanded").makeTwoWay(), //   when the model is re-loaded
          { selectionObjectName: "BODY" },
          // the main "BODY" consists of a RoundedRectangle surrounding nested Panels
          $(go.Panel, "Auto",
            { name: "BODY" },
            $(go.Shape, "Rectangle",
              { fill: greengrad, stroke: null }
            ),
            $(go.Panel, "Vertical",
              { margin: 3 },
              // the title
              $(go.TextBlock,
                {
                  stretch: go.GraphObject.Horizontal,
                  font: "bold 12pt Verdana, sans-serif"
                },
                new go.Binding("text", "question")
              ),
              // the optional list of actions
              $(go.Panel, "Vertical",
                { stretch: go.GraphObject.Horizontal, visible: false },  // not visible unless there is more than one action
                new go.Binding("visible", "actions", function(acts) {
                  return (Array.isArray(acts) && acts.length > 0);
                }),
                // headered by a label and a PanelExpanderButton inside a Table
                $(go.Panel, "Table",
                  { stretch: go.GraphObject.Horizontal },
                  // $(go.TextBlock, "Choices",
                  //   {
                  //     alignment: go.Spot.Left,
                  //     font: "10pt Verdana, sans-serif"
                  //   }
                  // ),
                  // $("PanelExpanderButton", "COLLAPSIBLE",  // name of the object to make visible or invisible
                  //   { column: 1, alignment: go.Spot.Right }
                  // )
                ), // end Table panel
                // with the list data bound in the Vertical Panel
                $(go.Panel, "Vertical",
                  {
                    // name: "COLLAPSIBLE",  // identify to the PanelExpanderButton
                    padding: 4,
                    // stretch: go.GraphObject.Horizontal,  // take up whole available width
                    background: "white",  // to distinguish from the node's body
                    // defaultAlignment: go.Spot.Left,  // thus no need to specify alignment on each element
                    itemTemplate: actionTemplate  // the Panel created for each item in Panel.itemArray
                  },
                  new go.Binding("itemArray", "actions")  // bind Panel.itemArray to nodedata.actions
                )  // end action list Vertical Panel
              )  // end optional Vertical Panel
            )  // end outer Vertical Panel
          ),  // end "BODY"  Auto Panel
          $(go.Panel,  // this is underneath the "BODY"
            { height: 17 },  // always this height, even if the TreeExpanderButton is not visible
            $("TreeExpanderButton")
          )
        );

      // define a second kind of Node:  小圆圈
      myDiagram.nodeTemplateMap.add("Terminal",
        $(go.Node, "Spot",
         {
          // 添加点击事件
          click: function(e, obj) {
            // obj.key
          }
        },
          $(go.Shape, "Circle",
            { width: 55, height: 55, fill: greengrad, stroke: null },
            
          ),
          $(go.TextBlock,
            { font: "10pt Verdana, sans-serif" },
            new go.Binding("text")
          )
        )
      );

      myDiagram.linkTemplate =
        $(go.Link, go.Link.Orthogonal,
          { deletable: false, corner: 10 },
          $(go.Shape,
            { strokeWidth: 2 }
          ),
          $(go.TextBlock, go.Link.OrientUpright,
            {
              background: "white",
              visible: false,  // unless the binding sets it to true for a non-empty string
              segmentIndex: -2,
              segmentOrientation: go.Link.None
            },
            new go.Binding("text", "isgate"),
            // hide empty string;
            // if the "isgate" property is undefined, visible is false due to above default setting
            new go.Binding("visible", "isgate", function(a) { return (a ? true : false); })
          )
        );

      var nodeDataArray = [
        {
          key: 1, question: "Greeting",
          // actions: [
          //   { text: "Sales", figure: "ElectricalHazard", fill: "blue" },
          //   { text: "Parts and Services", figure: "FireHazard", fill: "red" },
          //   { text: "Representative", figure: "IrritationHazard", fill: "yellow" }
          // ]
        },
        {
          key: 2, question: "Sales",
          actions: [
            { text: "Compact", figure: "", fill: "#fff" },
            { text: "Mid-Size", figure: "FireHazard", fill: "red" },
            { text: "Large", figure: "IrritationHazard", fill: "yellow" }
          ]
        },
        {
          key: 3, question: "Parts and Services",
          // actions: [
          //   { text: "Maintenance", figure: "ElectricalHazard", fill: "blue" },
          //   { text: "Repairs", figure: "FireHazard", fill: "red" },
          //   { text: "State Inspection", figure: "IrritationHazard", fill: "yellow" }
          // ]
        },
        { key: 4, question: "Representative" },
        { key: 5, question: "Compact" },
        { key: 6, question: "Mid-Size" },
        {
          key: 7, question: "Large",
          // actions: [
          //   { text: "SUV", figure: "ElectricalHazard", fill: "blue" },
          //   { text: "Van", figure: "FireHazard", fill: "red" }
          // ]
        },
        { key: 8, question: "Maintenance" },
        { key: 9, question: "Repairs" },
        { key: 10, question: "State Inspection" },
        { key: 11, question: "SUV" },
        { key: 12, question: "Van" },
        { key: 13, category: "Terminal", text: "Susan" },
        { key: 14, category: "Terminal", text: "Eric" },
        { key: 15, category: "Terminal", text: "Steven" },
        { key: 16, category: "Terminal", text: "Tom" },
        { key: 17, category: "Terminal", text: "Emily" },
        { key: 18, category: "Terminal", text: "Tony" },
        { key: 19, category: "Terminal", text: "Ken" },
        { key: 20, category: "Terminal", text: "Rachel" }
      ];
      var linkDataArray = [
        { from: 1, to: 2, isgate: 1 },
        { from: 1, to: 3, isgate: 2 },
        { from: 1, to: 4, isgate: 3 },
        { from: 2, to: 5, isgate: 1 },
        { from: 2, to: 6, isgate: 2 },
        { from: 2, to: 7, isgate: 3 },
        { from: 3, to: 8, isgate: 1 },
        { from: 3, to: 9, isgate: 2 },
        { from: 3, to: 10, isgate: 3 },
        { from: 7, to: 11, isgate: 1 },
        { from: 7, to: 12, isgate: 2 },
        { from: 5, to: 13 },
        { from: 6, to: 14 },
        { from: 11, to: 15 },
        { from: 12, to: 16 },
        { from: 8, to: 17 },
        { from: 9, to: 18 },
        { from: 10, to: 19 },
        { from: 4, to: 20 }
      ];
        myDiagram.model = $(go.GraphLinksModel,
        {
          copiesArrays: true,
          copiesArrayObjects: true,
          nodeDataArray: nodeDataArray,
          linkDataArray: linkDataArray
        },
        
        );
         myDiagram.model.removeChangedListener((e)=>{
           debugger
         })


  },
  watch: {
    modelData: function(val) {
      this.updateModel(val);
    },
  },
  methods: {
    model: function() {
      return this.diagram.model;
    },
    updateModel: function(val) {
      // No GoJS transaction permitted when replacing Diagram.model.
      if (val instanceof go.Model) {
        this.diagram.model = val;
      } else {
        let m = new go.GraphLinksModel();
        if (val) {
          for (let p in val) {
            if (val[p]) {
              m[p] = val[p];
            }
          }
        }
        this.diagram.model = m;
      }
    },
    updateDiagramFromData: function() {
      this.diagram.startTransaction();
      this.diagram.updateAllRelationshipsFromData();
      this.diagram.updateAllTargetBindings();
      this.diagram.commitTransaction('updated');
    },
  },
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
</style>