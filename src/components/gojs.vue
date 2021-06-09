<template>
  <div style="padding-top:20px">
    <div id="myDiagramDiv" style="width:100%;height:600px;border:1px solid #dcdfe6" />
    <div id="contextMenu" class="contextMenu">
      <ul>
        <li id="contextMenu_addChildNode" class="contextMenu_normallabel" @click="cxcommand($event)"><a href="#" target="_self">新增子节点</a></li>
        <li id="contextMenu_addBroNode" class="contextMenu_normallabel" @click="cxcommand($event)"><a href="#" target="_self">新增同级节点</a></li>
        <li id="contextMenu_editNode" class="contextMenu_normallabel" @click="cxcommand($event)"><a href="#" target="_self">编辑</a></li>
        <li id="contextMenu_detailNode" class="contextMenu_normallabel" @click="cxcommand($event)"><a href="#" target="_self">详情</a></li>
        <li id="contextMenu_syncNode" class="contextMenu_normallabel" @click="cxcommand($event)"><a href="#" target="_self">同步配置</a></li>
        <li id="contextMenu_enableNode" class="contextMenu_normallabel" @click="cxcommand($event)"><a href="#" target="_self">启用</a></li>
        <li id="contextMenu_unenabledNode" class="contextMenu_normallabel" @click="cxcommand($event)"><a href="#" target="_self">禁用</a></li>
        <li id="contextMenu_deleteNode" class="contextMenu_deletelabel" @click="cxcommand($event)"><a href="#" target="_self">删除</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import go from 'gojs';
let $ = go.GraphObject.make // 后面很多用到该变量来初始化diagram
import { topologylistByLevel } from '@/api/system'
export default {

  name: 'diagram',
  props: {
    parenData: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      diagram: null,
      myDiagram: null,
      chartList: [],
      selectedNodeData: {}
    }
  },
  watch: {
  },
  methods: {
    cxcommand(event, val) {
      if (val === undefined) val = event.currentTarget.id;
      switch (val) {
        case "contextMenu_addChildNode": this.addNodeAndLink(); break;
        case "contextMenu_addBroNode": this.addNodeAndLink(); break;
        case "contextMenu_editNode": this.addNodeAndLink(); break;
        case "contextMenu_detailNode": this.addNodeAndLink(); break;
        case "contextMenu_syncNode": this.addNodeAndLink(); break;
        case "contextMenu_enableNode": this.addNodeAndLink(); break;
        case "contextMenu_unenabledNode": this.addNodeAndLink(); break;
        case "contextMenu_deleteNode": this.addNodeAndLink(); break;

      }
      this.myDiagram.currentTool.stopTool();
    },
    addNodeAndLink() {
    },
    // for拓扑
    topologylistByLevel() { 
      const params = {
        level: 10
      }
      this.toposhow = false
      topologylistByLevel(params).then(res => {
        // this.chartList.push({ key: 1, name: '边缘平台' })
        this.searchData(res.data)
        console.log(this.chartList)
        this.init()
      })
    },
    searchData(val) {
      let len = val.length
      if (len) {
        for (let i = 0; i < len; i++) {
          let obj = {
            key: val[i].id,
            name: val[i].label,
            bindKey: val[i].bindKey,
            type: val[i].type,
            parent: val[i].parentId||0,
            children: val[i].children
          }
          this.chartList.push(obj)
          if (val[i].children && val[i].children.length) {
            this.searchData(val[i].children)
          }
        }
      } else {
        return false
      }
    },
    ChangedSelection(e) {//选择事件
      let _this = this
      var data = null;
      e.diagram.selection.each(function(nodeOrLink) {
        if (nodeOrLink instanceof go.Node) {//选择节点
          _this.selectedNodeData = nodeOrLink.data;
        }
      });
    },
    init() {
      let _this = this
     console.log(_this.chartList)
     debugger
      _this.myDiagram =
        $(go.Diagram, "myDiagramDiv",
          {
            allowCopy: false,
            maxSelectionCount: 1, // users can select only one part at a time
            "draggingTool.dragsTree": true,
            validCycle: go.Diagram.CycleDestinationTree, // make sure users can only create trees
            "commandHandler.deletesTree": true,
            layout:
              $(go.TreeLayout,
                { angle: 90, arrangement: go.TreeLayout.ArrangementFixedRoots }),
            "undoManager.isEnabled": true,
            "clickCreatingTool.archetypeNodeData": { // allow double-click in background to create a new node
              name: "(new person)",
              title: "",
              comments: ""
            },
            "clickCreatingTool.insertPart": function(loc) {  // scroll to the new node
              var node = go.ClickCreatingTool.prototype.insertPart.call(this, loc);
              if (node !== null) {
                this.diagram.select(node);
                this.diagram.commandHandler.scrollToPart(node);
                this.diagram.commandHandler.editTextBlock(node.findObject("NAMETB"));
              }
              return node;
            },
            "ChangedSelection": _this.ChangedSelection,

            // nodeSelectionAdornmentTemplate:
            //       $(go.Adornment, "Auto",
            //           $(go.Shape, "Rectangle", { fill: "white", stroke: 'green',strokeWidth:1.5 }),
            //       ),
            //自定义选中时的样式
            nodeSelectionAdornmentTemplate:
              $(go.Adornment, "Auto",
                $(go.Shape, {
                  fill: null,
                  stroke: "green",
                  strokeWidth: 1.5,
                  strokeDashArray: [4, 2]
                }
                ),
                $(go.Placeholder)
              )
          },

        );
      var cxElement = document.getElementById("contextMenu");
      cxElement.addEventListener("contextmenu", function(e) {
        e.preventDefault();
        return false;
      }, false);
      function showContextMenu(obj, diagram, tool) {
        var cmd = diagram.commandHandler;
        // document.getElementById("delete").style.display = cmd.canDeleteSelection() ? "block" : "block";
        document.getElementById("contextMenu_addChildNode").style.display = 'block';
        document.getElementById("contextMenu_addBroNode").style.display = 'block';
        document.getElementById("contextMenu_editNode").style.display = (obj.data.type === "CHANNEL" || obj.data.type === "NORMAL" ? "block" : "none");
        document.getElementById("contextMenu_detailNode").style.display = (obj.data.type === "CHANNEL" ? "block" : "none");
        document.getElementById("contextMenu_syncNode").style.display = (obj.data.type === "CHANNEL" ? "block" : "none");
        document.getElementById("contextMenu_enableNode").style.display = (obj.data.type === "CHANNEL" ? "block" : "none");
        document.getElementById("contextMenu_unenabledNode").style.display = (obj.data.type === "CHANNEL" ? "block" : "none");
        document.getElementById("contextMenu_deleteNode").style.display = 'block';

        // Now show the whole context menu element
        cxElement.style.display = "block";
        // we don't bother overriding positionContextMenu, we just do it here:
        var mousePt = diagram.lastInput.viewPoint;
        cxElement.style.left = mousePt.x + "px";
        cxElement.style.top = mousePt.y + "px";
      }
      var myContextMenu = $(go.HTMLInfo, {
        show: showContextMenu,
        mainElement: cxElement
      });

      // the template we defined earlier
      _this.myDiagram.nodeTemplate =
        $(go.Node, "Spot",
          { // handle dragging a Node onto a Node to (maybe) change the reporting relationship
            mouseDragEnter: function(e, node, prev) {
              var diagram = node.diagram;
              var selnode = diagram.selection.first();
              if (!mayWorkFor(selnode, node)) return;
              var shape = node.findObject("SHAPE");
              if (shape) {
                shape._prevFill = shape.fill;  // remember the original brush
                shape.fill = "darkred";
              }
            },
            mouseDragLeave: function(e, node, next) {
              var shape = node.findObject("SHAPE");
              if (shape && shape._prevFill) {
                shape.fill = shape._prevFill;  // restore the original brush
              }
            },
            mouseDrop: function(e, node) {
              var diagram = node.diagram;
              var selnode = diagram.selection.first();  // assume just one Node in selection
              if (mayWorkFor(selnode, node)) {
                // find any existing link into the selected node
                var link = selnode.findTreeParentLink();
                if (link !== null) {  // reconnect any existing link
                  link.fromNode = node;
                } else {  // else create a new link
                  diagram.toolManager.linkingTool.insertLink(node, node.port, selnode, selnode.port);
                }
              }
            }
          },
          $(go.Panel, "Auto",
            $(go.Shape, "Rectangle",
              { fill: "#00b259", strokeWidth: 0 }),
            $(go.TextBlock, "Click small button\nto collapse/expand subtree",
              { margin: 10, stroke: "#fff", },
              {
                editable: true,
                textEdited: function(textBlock, previousText, currentText) {
                }
              },   //节点是否可以编辑
              new go.Binding("text", "name")
            )
          ),
          $("TreeExpanderButton",
            { alignment: go.Spot.Bottom, alignmentFocus: go.Spot.Top },
            { visible: true })
        );
      //监听节点编辑事件
      _this.myDiagram.addDiagramListener("TextEdited",
        function(e) {
          var partData = e.subject.part.data;
          var GraphSize = go.Point.parse(partData.size);
          var resizePart = _this.myDiagram.model.findNodeDataForKey(partData.key);
          //进行一些具体操作
        }
      );
      //自定义连接线
      // define a Link template that routes orthogonally, with no arrowhead
      _this.myDiagram.linkTemplate =
        $(go.Link,
          { routing: go.Link.Orthogonal, corner: 5 },
          $(go.Shape, // the link's path shape
            { strokeWidth: 2, stroke: "#555" }));

      //自定义右键菜单
      _this.myDiagram.nodeTemplate.contextMenu = myContextMenu
      //拖拽 节点合并
      function mayWorkFor(node1, node2) {
        if (!(node1 instanceof go.Node)) return false;  // must be a Node
        if (node1 === node2) return false;  // cannot work for yourself
        if (node2.isInTreeOf(node1)) return false;  // cannot work for someone who works for you
        return true;
      }
      //监听键盘键delete
      _this.myDiagram.addDiagramListener("SelectionDeleting", function(e) {
        e.preventDefault();
        var node = e.subject.first(); // e.subject is the myDiagram.selection collection,

        // so we'll get the first since we know we only have one selection
        // myDiagram.startTransaction("clear boss");
        // if (part instanceof go.Node) {
        //   var it = part.findTreeChildrenNodes(); // find all child nodes
        //   while (it.next()) { // now iterate through them and clear out the boss information
        //     var child = it.value;
        //     var bossText = child.findObject("boss"); // since the boss TextBlock is named, we can access it by name
        //     if (bossText === null) return;
        //     bossText.text = "";
        //   }
        // } else if (part instanceof go.Link) {
        //   var child = part.toNode;
        //   var bossText = child.findObject("boss"); // since the boss TextBlock is named, we can access it by name
        //   if (bossText === null) return;
        //   bossText.text = "";
        // }
        // myDiagram.commitTransaction("clear boss");
      });
      //通过键盘delete是否删除
      _this.myDiagram.commandHandler.canDeleteSelection = function(e) {
        //用例获取选中的节点或线 
        return _this.myDiagram.selection.all(function(nodeOrLink) {
          //判断是否存在不允许删除的节点或线 
          const node = nodeOrLink.data
          let obj2 = {
            id: node.key,
            children: node.children
          }
          _this.$emit('todelete', obj2)
        });
      }
      var model = $(go.TreeModel);
      model.nodeDataArray = _this.chartList
      _this.myDiagram.model = model;
    }
  },
  mounted() {
    this.topologylistByLevel()

    // this.init()
  }
};
</script>

<style lang="scss">
#myDiagramDiv {
  canvas {
    &:focus {
      outline: #dcdfe6 auto 1px;
    }
  }
}
/* CSS for the traditional context menu */
.contextMenu {
  z-index: 10002;
  position: absolute;
  left: 5px;
  width: 130px;
  display: none;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.12);
  font-size: 14px;
  text-align: left;
  li {
    height: 38px;
    line-height: 38px;
    padding-left: 16px;
  }
  &_normallabel {
    color: #21252e;
    &:hover {
      color: #00b259;
    }
  }
  &_deletelabel {
    color: #e60000;
    border-top: 1px solid #ebecef;
  }
}
// #contextMenu ul {
//   list-style: none;
//   top: 0;
//   left: 0;
//   margin: 0;
//   padding: 0;
// }
// #contextMenu li a {
//   position: relative;
//   min-width: 60px;
//   color: #444;
//   display: inline-block;
//   padding: 6px;
//   text-decoration: none;
//   cursor: pointer;
// }
// #contextMenu li:hover {
//   background: #CEDFF2;
//   color: #EEE;
// }
// #contextMenu li ul li {
//   display: none;
// }
//   #contextMenu li ul li a {
//     position: relative;
//     min-width: 60px;
//     padding: 6px;
//     text-decoration: none;
//     cursor: pointer;
//   }
// #contextMenu li:hover ul li {
//   display: block;
//   margin-left: 0px;
//   margin-top: 0px;
// }
</style>