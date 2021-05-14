<template>
  <div id="container" />
</template>

<script>
import G6 from '@antv/g6'
// import insertCss from 'insert-css'
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.initG6()
  },
  methods: {
    initG6() {
      const data = {
        nodes: [
          {
            id: '0',
            label: '零',
            cluster: 'a'
          },
          {
            id: '1',
            label: '一',
            cluster: 'a'
          },
          {
            id: '2',
            label: '二',
            cluster: 'a'
          },
          {
            id: '3',
            label: '三',
            cluster: 'a'
          },
          {
            id: '4',
            label: '四',
            cluster: 'a'
          },
          {
            id: '5',
            label: '五',
            cluster: 'a'
          },
          {
            id: '6',
            label: '六',
            cluster: 'a'
          },
          {
            id: '7',
            label: '七',
            cluster: 'a'
          },
          {
            id: '8',
            label: '八',
            cluster: 'a'
          },
          {
            id: '9',
            label: '九',
            cluster: 'a'
          },
          {
            id: '10',
            label: '一零',
            cluster: 'a'
          },
          {
            id: '11',
            label: '一一',
            cluster: 'a'
          },
          {
            id: '12',
            label: '一二',
            cluster: 'a'
          },
          {
            id: '13',
            label: '一三',
            cluster: 'b'
          },
          {
            id: '14',
            label: '一四',
            cluster: 'b'
          },
          {
            id: '15',
            label: '一五',
            cluster: 'b'
          },
          {
            id: '16',
            label: '一六',
            cluster: 'b'
          },
          {
            id: '17',
            label: '一七',
            cluster: 'b'
          },
          {
            id: '18',
            label: '一八',
            cluster: 'c'
          },
          {
            id: '19',
            label: '一九',
            cluster: 'c'
          },
          {
            id: '20',
            label: '二一',
            cluster: 'c'
          },
          {
            id: '21',
            label: '二一',
            cluster: 'c'
          },
          {
            id: '22',
            label: '二二',
            cluster: 'c'
          },
          {
            id: '23',
            label: '二三',
            cluster: 'c'
          },
          {
            id: '24',
            label: '二四',
            cluster: 'c'
          },
          {
            id: '25',
            label: '二五',
            cluster: 'c'
          },
          {
            id: '26',
            label: '二六',
            cluster: 'c'
          },
          {
            id: '27',
            label: '二七',
            cluster: 'c'
          },
          {
            id: '28',
            label: '二八',
            cluster: 'c'
          },
          {
            id: '29',
            label: '二九',
            cluster: 'c'
          },
          {
            id: '30',
            label: '三一',
            cluster: 'c'
          },
          {
            id: '31',
            label: '三一',
            cluster: 'd'
          },
          {
            id: '32',
            label: '三二',
            cluster: 'd'
          },
          {
            id: '33',
            label: '三三',
            cluster: 'd'
          }
        ],
        edges: [
          {
            source: '0',
            target: '1'
            // style: {
            //   fill: '#f00',
            //   stroke: '#ff8fcd',
            //   lineWidth: 1,
            //   endArrow: false,
            //   startArrow: true,
            //   cursor: '#ff8fcd'
            //   // ... 其他属性
            // }
          },
          {
            source: '0',
            target: '2',
            label: 'aa'
            // labelCfg: {
            //   style: {
            //     fill: 'red'
            //   }
            // }
          },
          {
            source: '0',
            target: '3',
            label: 'bb'
          },
          {
            source: '0',
            target: '4'
          },
          {
            source: '0',
            target: '5'
          },
          {
            source: '0',
            target: '7'
          },
          {
            source: '0',
            target: '8'
          },
          {
            source: '0',
            target: '9'
          },
          {
            source: '0',
            target: '10'
          },
          {
            source: '0',
            target: '11'
          },
          {
            source: '0',
            target: '13'
          },
          {
            source: '0',
            target: '14'
          },
          {
            source: '0',
            target: '15'
          },
          {
            source: '0',
            target: '16'
          },
          {
            source: '2',
            target: '3'
          },
          {
            source: '4',
            target: '5'
          },
          {
            source: '4',
            target: '6'
          },
          {
            source: '5',
            target: '6'
          },
          {
            source: '7',
            target: '13'
          },
          {
            source: '8',
            target: '14'
          },
          {
            source: '9',
            target: '10'
          },
          {
            source: '10',
            target: '22'
          },
          {
            source: '10',
            target: '14'
          },
          {
            source: '10',
            target: '12'
          },
          {
            source: '10',
            target: '24'
          },
          {
            source: '10',
            target: '21'
          },
          {
            source: '10',
            target: '20'
          },
          {
            source: '11',
            target: '24'
          },
          {
            source: '11',
            target: '22'
          },
          {
            source: '11',
            target: '14'
          },
          {
            source: '12',
            target: '13'
          },
          {
            source: '16',
            target: '17'
          },
          {
            source: '16',
            target: '18'
          },
          {
            source: '16',
            target: '21'
          },
          {
            source: '16',
            target: '22'
          },
          {
            source: '17',
            target: '18'
          },
          {
            source: '17',
            target: '20'
          },
          {
            source: '18',
            target: '19'
          },
          {
            source: '19',
            target: '20'
          },
          {
            source: '19',
            target: '33'
          },
          {
            source: '19',
            target: '22'
          },
          {
            source: '19',
            target: '23'
          },
          {
            source: '20',
            target: '21'
          },
          {
            source: '21',
            target: '22'
          },
          {
            source: '22',
            target: '24'
          },
          {
            source: '22',
            target: '25'
          },
          {
            source: '22',
            target: '26'
          },
          {
            source: '22',
            target: '23'
          },
          {
            source: '22',
            target: '28'
          },
          {
            source: '22',
            target: '30'
          },
          {
            source: '22',
            target: '31'
          },
          {
            source: '22',
            target: '32'
          },
          {
            source: '22',
            target: '33'
          },
          {
            source: '23',
            target: '28'
          },
          {
            source: '23',
            target: '27'
          },
          {
            source: '23',
            target: '29'
          },
          {
            source: '23',
            target: '30'
          },
          {
            source: '23',
            target: '31'
          },
          {
            source: '23',
            target: '33'
          },
          {
            source: '32',
            target: '33'
          }
        ]
      }
      // 初始化
      const width = document.getElementById('container').scrollWidth
      const height = document.getElementById('container').scrollHeight || 500
      const graph = new G6.Graph({
        container: 'container',
        width,
        height,
        // 这里在后面用到，是提示框信息，以及鹰眼的时候用的组件
        // plugins: [tooltip, minimap]
        modes: {
          // 拖动，缩放
          default: ['drag-canvas', 'drag-node', 'zoom-canvas']
        },
        layout: {
          // 拓扑图的类型
          type: 'fruchterman',
          gravity: 7,
          speed: 5
        },
        animate: true,
        defaultNode: {
          size: 30,
          style: {
            lineWidth: 2,
            stroke: '#5B8FF9',
            fill: '#C6E5FF'
          },
          // 圈内字体大小
          labelCfg: {
            style: {
              fontSize: 10
            }
          }
        },
        defaultEdge: {
          size: 1,
          color: '#e2e2e2',
          style: {
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              fill: '#e2e2e2'
            }
          }
        }
      })
      graph.data(data)
      graph.render()
    }
  }
}
</script>

<style>
  #container {
    width: 100%;
    height: 100%;
    background-color: #ceb8b8;
  }
</style>

