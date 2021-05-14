<template>
  <div class="d3Chart" />
</template>
<script>
import * as d3 from 'd3'
/* eslint-disable */
export default {
  mounted() {
    this.initViewOne()
  },
  data() {
    return {
       // 源数据
       dataList : {
        'name': '中国',
        'children':
          [
            {
              'name': '浙江',
              'children':
                [
                  { 'name': '杭州' },
                  { 'name': '宁波' },
                  { 'name': '温州' },
                  { 'name': '绍兴' }
                ]
            },
            {
              'name': '广西',
              'children':
                [
                  {
                    'name': '桂林',
                    'children':
                      [
                        { 'name': '秀峰区' },
                        { 'name': '叠彩区' },
                        { 'name': '象山区' },
                        { 'name': '七星区' }
                      ]
                  },
                  { 'name': '南宁' },
                  { 'name': '柳州' },
                  { 'name': '防城港' }
                ]
            },
            {
              'name': '黑龙江',
              'children':
                [
                  { 'name': '哈尔滨' },
                  { 'name': '齐齐哈尔' },
                  { 'name': '牡丹江' },
                  { 'name': '大庆' }
                ]
            },
            {
              'name': '新疆',
              'children':
                [
                  { 'name': '乌鲁木齐' },
                  { 'name': '克拉玛依' },
                  { 'name': '吐鲁番' },
                  { 'name': '哈密' }
                ]
            }
          ]
      }
    }
  },
  methods: {
    initSelf(){

    },
    initViewOne() {
      // 画布的参数1
      const mapWidth = 600
      const mapHeight = 600
      const mapPadding = 20
      // 定义画布—— 外边距 10px
      const svgMap = d3.select('.d3Chart').append('svg').attr('width', mapWidth).attr('height', mapHeight).style('margin', '10px')
      // 定义树状图画布
      const treeMap = svgMap.append('g').attr('transform', 'translate(' + mapPadding + ',' + mapPadding + ')')
      // 将源数据转换为可以生成树状图的数据(有节点 nodes 和连线 links )
   let _this = this
      const treeData = d3.tree()
        // 设置树状图的尺寸
        .size([mapWidth - 3 * mapPadding, mapHeight - 6 * mapPadding])
        // 设置树状图节点之间的间隔
        .separation(function(a, b) {
          return (a.parent === b.parent ? 1 : 2) / a.depth
        })(
          // 创建层级布局，对源数据进行数据转换
          d3.hierarchy(_this.dataList).sum(function(d) {
            
            return d.name
          })
        )
      // 贝塞尔曲线生成器
      console.log(d3.linkHorizontal())
      const Bézier_curve_generator = d3.linkHorizontal()
        .x(function(d) {
          return d.y
        })
        .y(function(d) {
          return d.x
        })
      // 绘制边
      treeMap.selectAll('path')
        // 节点的关系 links
        .data(treeData.links())
        .enter()
        .append('path')
        .attr('d', function(d) {
          // 根据name值的长度调整连线的起点
          var start = { x: d.source.x, y: d.source.y + d.source.data.name.length * 16 + 12 }
          var end = { x: d.target.x, y: d.target.y }
          return Bézier_curve_generator({ source: start, target: end })
        })
        .attr('fill', 'none')
        .attr('stroke', 'green')
        .attr('stroke-width', 1)
      // 创建分组——节点+文字
      const groups = treeMap.selectAll('g')
        // 节点 nodes
        .data(treeData.descendants())
        .enter()
        .append('g')
        .attr('transform', function(d) {
          var cx = d.x
          var cy = d.y
          return 'translate(' + cy + ',' + cx + ')'
        })
      // 绘制节点
      groups.append('circle')
        .attr('r', 4)
        .attr('fill', 'green')
        .attr('stroke', 'green')
        .attr('stroke-width', 1)
      // 绘制文字
      groups.append('text')
        .attr('x', function(d) {
          return 8
        })
        .attr('y', -5)
        .attr('dy', 10)
        .text(function(d) {
          return d.data.name
        })
    },
    initView() {
      var width = 1100
      var height = 700
      var cluster = d3.tree()
        .size([width, height - 200])

      var diagonal = d3.linkHorizontal()
       .x(function(d) {
          return d.y
        })
        .y(function(d) {
          return d.x
        })
      var svg = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('transform', 'translate(' + 612 + ',' + 50 + ')')

      // 箭头
      var marker =
        svg.append('marker')
          .attr('id', 'resolved')
          .attr('markerUnits', 'strokeWidth')// 设置为strokeWidth箭头会随着线的粗细发生变化
          .attr('markerUnits', 'userSpaceOnUse')
          .attr('viewBox', '0 -5 10 10')// 坐标系的区域
          .attr('refX', 10)// 箭头坐标
          .attr('refY', -1)
          .attr('markerWidth', 12)// 标识的大小
          .attr('markerHeight', 12)
          .attr('orient', 'auto')// 绘制方向，可设定为：auto（自动确认方向）和 角度值
          .attr('stroke-width', 2)// 箭头宽度
          .append('path')
          .attr('d', 'M0,-5L10,0L0,5')// 箭头的路径
          .attr('fill', '#000000')// 箭头颜色

      var root = {
        'name': '中国',
        'number': '2000',
        'children':
          [
            {
              'name': '浙江',
              'number': '100',
              'children':
                [
                  {
                    'name': '杭州',
                    'number': '100'
                  },
                  {
                    'name': '宁波',
                    'number': '200'
                  }
                ]
            },
            {
              'name': '广西',
              'number': '500',
              'children':
                [
                  {
                    'name': '桂林',
                    'number': '100'
                  },
                  {
                    'name': '南宁',
                    'number': '200'
                  }
                ]
            },
            {
              'name': '黑龙江',
              'number': '500',
              'children':
                [
                  {
                    'name': '哈尔滨',
                    'number': '100'
                  }
                ]
            },
            {
              'name': '新疆',
              'number': '500',
              'children':
                [
                  {
                    'name': '乌鲁木齐',
                    'number': '100'
                  }
                ]
            }]
      }
      var i = 0
      var nodes = cluster.nodes(root).reverse()
      nodes.forEach(function(d) { d.y = d.depth * 200 })

      var links = cluster.links(nodes)

      var linkEnter = svg.selectAll('path.link')
        .data(links)

      linkEnter.enter().append('path')// 在指定元素之前插入一个元素
        .attr('class', 'link')
        .attr('d', diagonal)
        .attr('stroke', 'white')
        .attr('marker-end', 'url(#resolved)')// 根据箭头标记的id号标记箭头
        .style('fill', 'white')
        .style('fill-opacity', 1)
        // 首先为每条节点连线添加标识id
        .attr('id', function(d, i) {
          return 'mypath' + i
        })

      // 为连线添加文字
      linkEnter.enter().append('text')
        .attr('x', 100)
        .attr('y', 80)
        .style('fill', 'green')
        .style('font-size', '15px')
        .style('font-weight', 'bold')
        .append('textPath')
        .attr({ // 引用路径
          'xlink:href': function(d, i) {
            return '#mypath' + i
          }
        })
        .text(function(d, i) {
          debugger
          return d.target.number
        })

      var node = svg.selectAll('.node')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', function(d) {
          return 'translate(' + (d.x + -50) + ',' + (d.y) + ')'
        })

      node.append('rect')
        .attr('width', 100)
        .attr('height', 40)
        .attr('x', 0)
        .attr('y', 0)
        .attr('style', 'fill:#2990ca;')
        .attr('rx', 3)

      node.append('text')
        .attr('dx', function(d) {
          return 30
        })
        .attr('dy', 25)
        .style('text-anchor', function(d) {
          return 'middle'
        })
        .style('fill', '#fff')
        .text(function(d) { return d.name })

      node.append('text')
        .attr('dx', function(d) {
          return 70
        })
        .attr('dy', 25)
        .style('text-anchor', function(d) {
          return 'middle'
        })
        .style('fill', '#fff')
        .text(function(d) { return d.number })
    }
  }
}
</script>
<style scoped>
</style>
