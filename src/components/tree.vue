<template>
  <div>
    <ul class="tree-root" style="z-index: -1">
      <li class="tree-node"><span>123 <i class="el-icon-circle-plus-outline"/></span></li>
      <li class="tree-node" style="z-index: -1">1
        <ul class="tree-child hide-node" style="z-index: -1">
          <li class="tree-node">456</li>
          <li class="tree-node">456</li>
          <li class="tree-node" style="z-index: 100">2
            <ul class="tree-child hide-node">
              <li class="tree-node">456</li>
              <li class="tree-node">456</li>
              <li class="tree-node">456</li>
            </ul>
          </li>
        </ul>
      </li>
      <li @click="collspanNode">123</li>
      <li>123</li>
      <li>123</li>
    </ul>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]">
    </el-tree>
  </div>
</template>

<script>
  export default {
    name: "tree",
    data() {
      return {
        data: [{
          id: 1,
          label: '一级 2',
          children: [{
            id: 3,
            label: '二级 2-1',
            children: [{
              id: 4,
              label: '三级 3-1-1'
            }, {
              id: 5,
              label: '三级 3-1-2',
              disabled: true
            }]
          }, {
            id: 2,
            label: '二级 2-2',
            disabled: true,
            children: [{
              id: 6,
              label: '三级 3-2-1'
            }, {
              id: 7,
              label: '三级 3-2-2',
              disabled: true
            }]
          }, {
            id: 2,
            label: '二级 2-2',
            disabled: true,
            children: [{
              id: 6,
              label: '三级 3-2-1'
            }, {
              id: 7,
              label: '三级 3-2-2',
              disabled: true
            }]
          }, {
            id: 2,
            label: '二级 2-2',
            disabled: true,
            children: [{
              id: 6,
              label: '三级 3-2-1'
            }, {
              id: 7,
              label: '三级 3-2-2',
              disabled: true
            }]
          }, {
            id: 2,
            label: '二级 2-2',
            disabled: true,
            children: [{
              id: 6,
              label: '三级 3-2-1'
            }, {
              id: 7,
              label: '三级 3-2-2',
              disabled: true
            }]
          }, {
            id: 2,
            label: '二级 2-2',
            disabled: true,
            children: [{
              id: 6,
              label: '三级 3-2-1'
            }, {
              id: 7,
              label: '三级 3-2-2',
              disabled: true
            }]
          }, {
            id: 2,
            label: '二级 2-2',
            disabled: true,
            children: [{
              id: 6,
              label: '三级 3-2-1'
            }, {
              id: 7,
              label: '三级 3-2-2',
              disabled: true
            }]
          }, {
            id: 2,
            label: '二级 2-2',
            disabled: true,
            children: [{
              id: 6,
              label: '三级 3-2-1'
            }, {
              id: 7,
              label: '三级 3-2-2',
              disabled: true
            }]
          }, {
            id: 2,
            label: '二级 2-2',
            disabled: true,
            children: [{
              id: 6,
              label: '三级 3-2-1'
            }, {
              id: 7,
              label: '三级 3-2-2',
              disabled: true
            }]
          }, {
            id: 2,
            label: '二级 2-2',
            disabled: true,
            children: [{
              id: 6,
              label: '三级 3-2-1'
            }, {
              id: 7,
              label: '三级 3-2-2',
              disabled: true
            }]
          }, {
            id: 2,
            label: '二级 2-2',
            disabled: true,
            children: [{
              id: 6,
              label: '三级 3-2-1'
            }, {
              id: 7,
              label: '三级 3-2-2',
              disabled: true
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    mounted() {
      let elements = document.querySelectorAll(".tree-node");
      elements.forEach(e => {
        e.addEventListener("click", this.collspanNode.bind(this.$event), {capture: false, once: false})
      })
    },
    methods: {
      collspanNode(e) {
        e.stopPropagation()
        e.preventDefault()

        let target = e.currentTarget;
        console.log(target)
        let childrenNodes = target.childNodes;
        childrenNodes.forEach(item => {
          if (item.tagName && item.tagName === 'UL') {
            let classList = item.classList;
            if (classList.contains("hide-node")) {
              let height = item.childElementCount * 20;
              if (isNaN(height)) {
                height = 0
              }
              let parentZIndex = target.style.zIndex;
              item.style.zIndex = parentZIndex + 1
              item.style.maxHeight = 60 + "px"
              classList.remove("hide-node")
            } else {
              classList.add("hide-node")
              item.style.maxHeight = "0px"
            }
          }
        })
      },
    }
  }
</script>

<style scoped>
  ul {
    list-style: none;
    width: 70px;
    z-index: -1;
  }

  ul.tree-root {
    padding-left: 0px;
  }

  ul.tree-child {
    padding-left: 20px;
    max-height: 0px;
    overflow: hidden;
    transition: max-height .5s;
  }

  ul.hide-node {
    max-height: 0px;
  }


  li {

  }

</style>

