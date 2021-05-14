<template>
  <div>
    <div id="tree" ref="tree" style="width:600px;height:600px" />
  </div>
</template>

<script>
/* eslint-disable */
 import OrganizationChart from 'vue-organization-chart'
  import 'vue-organization-chart/dist/orgchart.css'
export default {
  data() {
    return {
      nodes: [
        { id: 1, name: "Denny Curtis", title: "CEO", img: "https://cdn.balkan.app/shared/2.jpg" },
        { id: 2, pid: 1, name: "Ashley Barnett", title: "Sales Manager", img: "https://cdn.balkan.app/shared/3.jpg" },
        { id: 3, pid: 1, name: "Caden Ellison", title: "Dev Manager", img: "https://cdn.balkan.app/shared/4.jpg" },
        { id: 4, pid: 2, name: "Elliot Patel", title: "Sales", img: "https://cdn.balkan.app/shared/5.jpg" },
        { id: 5, pid: 2, name: "Lynn Hussain", title: "Sales", img: "https://cdn.balkan.app/shared/6.jpg" },
        { id: 6, pid: 3, name: "Tanner May", title: "Developer", img: "https://cdn.balkan.app/shared/7.jpg" },
        { id: 7, pid: 3, name: "Fran Parsons", title: "Developer", img: "https://cdn.balkan.app/shared/8.jpg" }
      ]
    }
  },


  mounted() {
    this.oc(this.$refs.tree, this.nodes)
  },
  methods: {
     oc: function(domEl, x) {
      this.chart = new OrgChart(domEl, {
        nodes: x,
        nodeBinding: {
          field_0: "name",
          field_1: "title",
          img_0: "img"
        }
      });
    },
    clickEvent() {
      var ds = {
        'name': 'Lao Lao',
        'title': 'general manager',
        'children': [
          { 'name': 'Bo Miao', 'title': 'department manager' },
          {
            'name': 'Su Miao', 'title': 'department manager',
            'children': [
              { 'name': 'Tie Hua', 'title': 'senior engineer' },
              {
                'name': 'Hei Hei', 'title': 'senior engineer',
                'children': [
                  { 'name': 'Pang Pang', 'title': 'engineer' },
                  { 'name': 'Xiang Xiang', 'title': 'UE engineer' }
                ]
              }
            ]
          },
          { 'name': 'Hong Miao', 'title': 'department manager' },
          { 'name': 'Chun Miao', 'title': 'department manager' }
        ]
      };

      var oc = $('#tree').orgchart({
        'data': ds,
        'depth': 2,
        'nodeContent': 'title'
      });

      $('#tree').find('.node').on('click', function() {
        alert(JSON.stringify($(this).data('nodeData')));
      });

    }
  }
}
</script>

<style>
</style>