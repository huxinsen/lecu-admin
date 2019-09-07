<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <div
        class="sysname"
        :class="collapsed?'sysname_collapsed':'sysname_expanded'"
      >{{ collapsed?'':sysName }}</div>
      <div class="header-right">
        <div class="collapse-toggle" @click.prevent="collapse">
          <i :class="collapsed?iconUnfold:iconFold"></i>
        </div>
        <el-dropdown @command="handleCommand">
          <img src="../../assets/admin.jpg" alt="头像" class="avator" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="home">首页</el-dropdown-item>
            <el-dropdown-item command="signout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
    <el-col :span="24" class="main">
      <aside class="aside" :class="collapsed?'menu_collapsed':'menu_expanded'">
        <el-menu :default-active="$route.path" unique-opened router :collapse="collapsed">
          <template v-for="(item, index) in $router.options.routes">
            <el-submenu :index="index + ''" v-if="!item.hidden" :key="item.name">
              <template slot="title">
                <i :class="item.iconClass"></i>
                <span class="nav-title" slot="title">{{ item.name }}</span>
              </template>
              <template v-for="child in item.children">
                <el-menu-item :index="child.path" :key="child.name">{{ child.name }}</el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </aside>
      <section class="content">
        <router-view />
      </section>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      sysName: 'LECU系统管理',
      collapsed: false,
      iconUnfold: 'el-icon-s-unfold',
      iconFold: 'el-icon-s-fold',
    }
  },
  computed: {
    ...mapGetters(['loginType']),
  },
  methods: {
    ...mapActions(['Logout']),
    collapse() {
      this.collapsed = !this.collapsed
    },
    handleCommand(command) {
      if (command === 'home') {
        this.$router.push('/')
      } else if (command === 'signout') {
        this.Logout().then(() => {
          this.$router.push('/login')
        })
      }
    },
  },
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* header */
.header {
  display: flex;
  height: 60px;
  background-color: #20a0ff;
}

.sysname {
  height: 60px;
  line-height: 60px;
  color: #fff;
  font-size: 22px;
  text-align: center;
  border-color: rgba(238, 241, 146, 0.3);
  border-right-width: 1px;
  border-right-style: solid;
}

.sysname_expanded {
  width: 220px;
}

.sysname_collapsed {
  width: 64px;
}

.header-right {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.collapse-toggle {
  width: 66px;
  height: 60px;
  line-height: 60px;
  padding: 0 25px;
  color: #fff;
  cursor: pointer;
}

.header-right .el-dropdown {
  width: 100px;
  text-align: center;
}

.avator {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
}

.header-right .el-dropdown-menu__item {
  text-align: center;
}

/* main */
.main {
  display: flex;
  flex: 1;
  overflow: auto;
}

.aside {
  height: 100%;
}

.nav-title {
  margin-left: 10px;
}

.menu_collapsed {
  flex: 0 0 64px;
  width: 64px;
}

.menu_expanded {
  flex: 0 0 220px;
  width: 220px;
}

.aside .el-menu {
  height: 100%;
}

.content {
  flex: 1;
  overflow: auto;
}
</style>
