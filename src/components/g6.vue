<template>
  <div id="container" />
</template>

<script>
/* eslint-disable */
import G6 from '@antv/g6'
// import insertCss from 'insert-css';
// import insertCss from 'insert-css'
console.log('xeshisss')
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.initg61()
  },
  methods: {
    initg61() {

      const data = {
        id: 'root',
        label: 'root',
        typename: 'system',
        children: [
          {
            id: 'c1',
            label: 'c1',
            typename: 'system1',
            children: [
              {
                id: 'c1-1',
                label: 'c1-1',
                typename: 'system1',
              },
              {
                id: 'c1-2',
                label: 'c1-2',
                typename: 'system1',
                children: [
                  {
                    id: 'c1-2-1',
                    label: 'c1-2-1',
                    typename: 'system1',
                  },
                  {
                    id: 'c1-2-2',
                    label: 'c1-2-2',
                    typename: 'system1',
                  }
                ]
              }
            ]
          },
          {
            id: 'c2',
            label: 'c2',
            typename: 'system1',
          },
          {
            id: 'c3',
            label: 'c3',
            typename: 'system1',
            children: [
              {
                id: 'c3-1',
                label: 'c3-1',
                typename: 'system1',
              },
              {
                id: 'c3-2',
                label: 'c3-2',
                typename: 'system1',
                children: [
                  {
                    id: 'c3-2-1',
                    label: 'c3-2-1',
                    typename: 'system1',
                  },
                  {
                    id: 'c3-2-2',
                    label: 'c3-2-2',
                    typename: 'system1',
                  },
                  {
                    id: 'c3-2-3',
                    label: 'c3-2-3',
                    typename: 'system1',
                  }
                ]
              },
              {
                id: 'c3-3',
                label: 'c3-3',
                typename: 'system1',
              }
            ]
          }
        ]
      }
      //       insertCss(`
      //   #contextMenu {
      //     position: absolute;
      //     list-style-type: none;
      //     padding: 10px 8px;
      //     left: -150px;
      //     background-color: rgba(255, 255, 255, 0.9);
      //     border: 1px solid #e2e2e2;
      //     border-radius: 4px;
      //     font-size: 12px;
      //     color: #545454;
      //   }
      //   #contextMenu li {
      //     cursor: pointer;
      // 		list-style-type:none;
      //     list-style: none;
      //     margin-left: 0px;
      //     text-align:left
      //   }
      //   #contextMenu li:hover {
      //     color: #aaa;
      //   }
      // `);
      const contextMenu = new G6.Menu({
        getContent(evt) {
          // let header;
          // if (evt.target && evt.target.isCanvas && evt.target.isCanvas()) {
          //   header = 'Canvas ContextMenu';
          // } else if (evt.item) {
          //   const itemType = evt.item.getType();
          //   header = `${itemType.toUpperCase()} ContextMenu`;
          // }
          const { _cfg } = evt.item
          return `
      <ul>
        <li style="display:${_cfg.model.typename === 'system' ? 'none' : ''}" id="contextMenu_addChildNode" class="contextMenu_normallabel" >新增子节点 </li>

        <li id="contextMenu_addBroNode" class="contextMenu_normallabel" >新增同级节点 </li>
        <li id="contextMenu_editNode" class="contextMenu_normallabel" > 编辑 </li>
        <li id="contextMenu_detailNode" class="contextMenu_normallabel" > 详情 </li>
        <li id="contextMenu_syncNode" class="contextMenu_normallabel" > 同步配置 </li>
        <li id="contextMenu_enableNode" class="contextMenu_normallabel"> 启用 </li>
        <li id="contextMenu_unenabledNode" class="contextMenu_normallabel" > 禁用 </li>
        <li id="contextMenu_deleteNode" class="contextMenu_deletelabel"> 删除 </li>
      </ul>
    `;
        },
        handleMenuClick: (target, item) => {
        },
        // offsetX and offsetY include the padding of the parent container
        // 需要加上父级容器的 padding-left 16 与自身偏移量 10
        offsetX: 16 + 10,
        // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
        offsetY: 0,
        // the types of items that allow the menu show up
        // 在哪些类型的元素上响应
        itemTypes: ['node'],
        // itemTypes: ['node', 'edge', 'canvas'],
      });
      G6.registerNode('card-node', {
        draw: function drawShape(cfg, group) {
          const r = 2;
          const color = '#00b259';
          const w = cfg.size[0];
          const h = cfg.size[1];
          const shape = group.addShape('rect', {
            attrs: {
              x: -w / 2,
              y: -h / 2,
              width: w, //200,
              height: h, // 60
              stroke: color,
              radius: r,
              fill: '#fff',
            },
            name: 'main-box',
            draggable: true,
            zIndex: 1,
          });

          group.addShape('rect', {
            attrs: {
              x: -w / 2,
              y: -h / 2,
              width: w, //200,
              height: h / 2, // 60
              fill: "#00b259",
              radius: [r, r, 0, 0],
            },
            name: 'title-box',
            draggable: true,
          });

          // title text
          group.addShape('text', {
            attrs: {
              textBaseline: 'top',
              // x: -w / 2 + 8,
              y: -h / 2 + 12,
              text: cfg.id,
              fill: '#fff',
              textAlign: 'center',
            },
            name: 'title',
          });
          cfg.children &&
            group.addShape('marker', {
              attrs: {
                x: 0,
                y: h / 2,
                r: 6,
                cursor: 'pointer',
                //也可以使用path  https://g6.antv.vision/zh/docs/manual/middle/elements/shape/shape-and-properties/#%E6%A0%87%E8%AE%B0%E5%9B%BE%E5%BD%A2-marker
                symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
                stroke: '#666',
                lineWidth: 1,
                size: 2 * h,
                fill: '#fff',
              },
              name: 'collapse-icon',
            });
          group.addShape('text', {
            attrs: {
              textBaseline: 'hanging',
              // x: -w / 2 + 40,
              y: -h / 2 + 36,
              text: 'description',
              fill: '#8C97B2',
              textAlign: 'center',
              color: '#8C97B2'
            },
            name: `description`,
          });
          return shape;
        },
        update: (cfg, item) => {
          const group = item.getContainer();
          const icon = group.find((e) => e.get('name') === 'collapse-icon');
          icon.attr('symbol', cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse);
        },
        // update: undefined,
        //此方式相当于重写hover select 等状态事件
        // setState(name, value, item) {
        //   if (name === 'collapsed') {
        //     const marker = item.get('group').find((ele) => ele.get('name') === 'collapse-icon');
        //     const icon = value ? G6.Marker.expand : G6.Marker.collapse;
        //     marker.attr('symbol', icon);
        //   }
        // },

      }, 'rect');

      G6.registerEdge('flow-line', {
        draw(cfg, group) {
          const startPoint = cfg.startPoint
          const endPoint = cfg.endPoint

          const { style } = cfg
          const shape = group.addShape('path', {
            attrs: {
              stroke: style.stroke,
              endArrow: style.endArrow,
              path: [
                ['M', startPoint.x, startPoint.y],
                ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
                ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
                ['L', endPoint.x, endPoint.y]
              ]
            }
          })

          return shape
        }
      })

      const defaultStateStyles = {
        hover: {
          stroke: '#8C97B2',
          lineWidth: 2,
          lineDash: [4, 3]
        },
        selected: {
          stroke: '#8C97B2',
          lineWidth: 0,
          shadowColor: '#00b259',
          lineDash: [8, 3],
          shadowBlur: 10,
        },


      }

      const defaultNodeStyle = {
        fill: '#00b259',
        stroke: '#00b259',
        radius: 2,
      }

      const defaultEdgeStyle = {
        stroke: '#00b259',
        endArrow: {
          path: G6.Arrow.circle(3),
          fill: '#4498FF',
          d: -30
        }
      }

      const defaultLayout = {
        type: 'compactBox',
        direction: 'TB',
        getId: function getId(d) {
          return d.id
        },
        getHeight: function getHeight() {
          return 16
        },
        getWidth: function getWidth() {
          return 16
        },
        getVGap: function getVGap() {
          return 40
        },
        getHGap: function getHGap() {
          return 70
        }
      }

      const defaultLabelCfg = {
        style: {
          fill: '#fff',
          fontSize: 12,
          textAlign: 'center',
        }
      }
      const _this = this
      const container = document.getElementById('container')
      const width = container.scrollWidth
      const height = container.scrollHeight || 500

      // const minimap = new G6.Minimap({
      //   size: [150, 100]
      // })
      G6.registerBehavior('activate-node', {
        getDefaultCfg() {
          return {
            multiple: true
          };
        },
        getEvents() {
          return {
            'collapse-expand': 'onNodeClick',
          };
        },
        onNodeClick(e) {
          const data = e.item.get('model');
          let flag = !(data.collapsed ? true : false)
          console.log(data)
          graph.updateItem(e.item, {
            flag
          });
          data.collapsed = true;
          return true;
        },
      });
      const graph = new G6.TreeGraph({
        container: 'container',
        width,
        height,
        linkCenter: true,
        // back
        // plugins: [minimap],
        plugins: [contextMenu],
        modes: {
          default: [
            {
              type: 'drag-node',
              // enableDebounce:true,
              // enableDelegate: true,   //拖动节点过程中是否启用 delegate，即在拖动过程中是否使用方框代替元素的直接移动，效果区别见下面两个动图。默认值为  false
              // onlyChangeComboSize: true,
              shouldBegin: (e) => {
                e.item._cfg.group.zIndex = e.item._cfg.group.zIndex += 1
                // 不允许拖拽 id 为 'node1' 的节点
                if (e.item && e.item.getModel().id === 'root') {
                  return false
                } else {
                  return true
                };
              },
            },
            //当节点被点击时也会触发折叠与展开
            // {
            //   type: 'collapse-expand',

            //   onChange: function onChange(event, collapsed) {
            //     // console.log(event)
            //     // if(event._cfg.children.length===0) return
            //     // const data = event.get('model');
            //     // graph.updateItem(event, {
            //     //   collapsed,
            //     // });
            //     // data.collapsed = collapsed;
            //     return false;
            //   },
            // },
            'drag-canvas', 'zoom-canvas',]
        },
        defaultNode: {
          type: 'card-node',
          size: [140, 60],
          style: defaultNodeStyle,
          color: "#fff",
          labelCfg: defaultLabelCfg
        },
        defaultEdge: {
          type: 'flow-line',
          style: defaultEdgeStyle
        },
        nodeStateStyles: defaultStateStyles,
        edgeStateStyles: defaultStateStyles,
        layout: defaultLayout
      })
      //监听节点展开折叠事件
      //       graph.on('itemcollapsed', (e) => {
      //   debugger
      //   // 当前被操作的节点 item
      //   console.log(e.item);
      //   // 当前操作是收起（`true`）还是展开（`false`）
      //   console.log(e.collapsed);
      // });

      graph.data(data)
      graph.render()
      graph.fitView()

      graph.on('node:mouseenter', (evt) => {
        const { item } = evt
        graph.setItemState(item, 'hover', true)
      })
      graph.on('dragnodeend', (evt) => {
        graph.getNodes().forEach(node => {
          if (node === evt.items[0]) {
            node.toFront()
            // node.getKeyShape().toFront()
          }
        })
        // evt.item[0].toFront();
        if (evt.targetItem) {
          const { model } = evt.targetItem._cfg
          // evt.targetItem._cfg.group.cfg.zIndex = 9
        }
      })

      graph.on('node:mouseleave', (evt) => {
        const { item } = evt
        graph.setItemState(item, 'hover', false)
      })
      graph.on('node:click', (evt) => {
        console.log(evt)
        // graph.setItemState(edge, "highlight.light", false);
        // evt.item.setState('selected', true)
        //  console.log(evt.item.hasState('selected'))
        const { item, target } = evt
        //展开与折叠子节点
        if (evt.target.get('name') === 'collapse-icon') {
          // evt.item.getModel().collapsed = !evt.item.getModel().collapsed;
          // graph.setItemState(evt.item, 'collapsed', evt.item.getModel().collapsed);
          graph.updateItem(item, {
            collapsed: !item.getModel().collapsed
          });
          graph.layout();
        }
        graph.setItemState(item, 'selected', true)
        let nodes = graph.getNodes()
        let nodelen = nodes.length
        if (nodelen) {
          for (let i = 0; i < nodelen; i++) {
            if (nodes[i] !== item) {
              graph.setItemState(nodes[i], 'selected', false)
            }
          }
        }
        //  graph.setItemState(item, "highlight.light", true);
        // 增加元素
        // const targetType = target.get('type')
        // const name = target.get('name')
        // if (targetType === 'marker') {
        //   const model = item.getModel()
        //   if (name === 'add-item') {
        //     if (!model.children) {
        //       model.children = []
        //     }
        //     const id = `n-${Math.random()}`
        //     model.children.push({
        //       id,
        //       label: id.substr(0, 8),
        //       leftIcon: {
        //         style: {
        //           fill: '#e6fffb',
        //           stroke: '#e6fffb'
        //         },
        //         img:
        //           'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ'
        //       }
        //     })
        //     graph.updateChild(model, model.id)
        //   } else if (name === 'remove-item') {
        //     graph.removeChild(model.id)
        //   }
        // }
      })
      const nodeContainerGroup = graph.get('nodeGroup'); // 获得存储节点图形分组的组
      const nodeGroups = nodeContainerGroup.get('children'); // 获得所有节点的图形分组
      for (let i = 0; i < nodeGroups.length; i++) {
        nodeGroups[i].set('zIndex', 10); // 把第 0 个节点的图形分组 zIndex 设置为 10
      }
      // nodeContainerGroup.sort() // 排序
      if (typeof window !== 'undefined') {
        window.onresize = () => {
          if (!graph || graph.get('destroyed')) return
          if (!container || !container.scrollWidth || !container.scrollHeight) return
          graph.changeSize(container.scrollWidth, container.scrollHeight)
        }
      }
    },

  }
}
</script>

<style>
#container {
  width: 100%;
  height: 100%;
  border: 1px solid #ebecef;
  /* background: linear-gradient(to right,#ccc 1px,transparent 1px),
     linear-gradient(to bottom,#ccc 1px,transparent 1px);
     background-repeat: repeat;
     background-size: 10px 10px; */
  background: #fff;
  background-image: linear-gradient(#fff 14px, transparent 0), linear-gradient(90deg, #ebecef 2px, transparent 0);
  background-size: 16px 16px, 16px 16px;
}
.g6-component-contextmenu {
  padding: 0;
  background-color: rgba(255, 255, 255, 1);
}
ul {
  list-style: none;
  padding: 0 10px;
  margin: 0;
}
li {
  height: 30px;
  line-height: 30px;
  text-align: left;
  cursor: pointer;
}
.contextMenu_normallabel {
  color: #21252e;
}
.contextMenu_normallabel:hover {
  color: #00b259;
}
.contextMenu_deletelabel {
  color: #e60000;
  border-top: 1px solid #ebecef;
}
</style>

