<template>
  <div class="shop-list">
    <!-- 我的店铺 -->
    <h4 v-if="shopList.length > 0">店铺申请</h4>
    <el-table :data="shopList" style="width: 100%" stripe>
      <el-table-column label="店铺 ID" prop="shopId"></el-table-column>
      <el-table-column label="店铺名称" prop="name"></el-table-column>
      <el-table-column label="备注" prop="checkMsg"></el-table-column>
      <el-table-column label="操作" width="240px">
        <template slot-scope="scope">
          <el-button size="small" @click="handleViewDetails(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" type="success" @click="handlePass(scope.$index, scope.row)">通过</el-button>
          <el-button size="mini" type="danger" @click="handleReject(scope.$index, scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 店铺申请信息 -->
    <el-dialog title="店铺申请信息" :visible.sync="dialogFormVisible">
      <el-form :model="viewForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="店铺名称:">
              <span>{{ viewForm.name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="店铺 ID:">
              <span>{{ viewForm.shopId }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="店铺介绍:">
              <span>{{ viewForm.notice }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="店铺地址:">
              <span>{{ viewForm.address }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话:">
              <span>{{ viewForm.tel }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="营业时间:">
              <span>{{ viewForm.time }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="店铺法人:">
              <span>{{ viewForm.legalRepr }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号:">
              <span>{{ viewForm.idNumber }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="店铺头像:">
              <img
                v-if="viewForm.shopImg"
                :src="baseImgUploadedPath + viewForm.shopImg"
                class="pic"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="营业执照:">
              <img
                v-if="viewForm.licenseImg"
                :src="baseImgUploadedPath + viewForm.licenseImg"
                class="pic"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="身份证正:">
              <img
                v-if="viewForm.withIdFrontImg"
                :src="baseImgUploadedPath + viewForm.withIdFrontImg"
                class="pic"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证反:">
              <img
                v-if="viewForm.withIdBackImg"
                :src="baseImgUploadedPath + viewForm.withIdBackImg"
                class="pic"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="修改建议:">
              <span>{{ viewForm.checkMsg }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 通过确认 -->
    <el-dialog title="提示" :visible.sync="dialogConfirmVisible">
      <span>确认通过审核？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogConfirmVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlePassShop">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 拒绝理由 -->
    <el-dialog title="拒绝通过" :visible.sync="dialogRejectVisible">
      <el-form :model="rejectForm" :rules="rules" ref="rejectForm">
        <el-form-item label="修改意见" prop="message">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="不超过85个字"
            v-model="rejectForm.message"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRejectVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleRejectShop('rejectForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { baseImgUploadedPath } from '@/config/env'
import { getShopsAdmin, updateShopAdmin } from '@/api/shop'
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogConfirmVisible: false,
      dialogRejectVisible: false,
      viewForm: {},
      shopList: [],
      rejectForm: {
        message: '',
      },
      rules: {
        message: [
          { required: true, message: '请输入修改意见', trigger: 'blur' },
        ],
      },
      baseImgUploadedPath,
    }
  },
  computed: {
    ...mapGetters(['username']),
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 初始化数据
    initData() {
      // 店铺申请列表
      getShopsAdmin()
        .then(res => {
          this.shopList = res.data
        })
        .catch(err => {
          this.$notify.error({
            title: '失败',
            message: '系统出错，请重试!',
          })
        })
    },
    // 查看
    handleViewDetails(index, row) {
      this.viewForm = row
      this.dialogFormVisible = true
    },
    // 点击通过
    handlePass(index, row) {
      this.viewForm = row
      this.dialogConfirmVisible = true
    },
    // 点击拒绝
    handleReject(index, row) {
      this.viewForm = row
      this.dialogRejectVisible = true
    },
    // 通过申请
    handlePassShop() {
      this.dialogConfirmVisible = false
      if (!this.viewForm.shopId) {
        this.$notify.error({
          title: '失败',
          message: '系统出错，请重试!',
        })
        return
      }
      updateShopAdmin({
        shopId: this.viewForm.shopId,
        op: 'pass',
        checkMsg: '',
      })
        .then(res => {
          if (res.data.success) {
            this.$notify.success({
              title: '成功',
              message: res.data.message,
            })
            this.initData()
          } else {
            this.$notify.error({
              title: '失败',
              message: res.data.message,
            })
          }
        })
        .catch(err => {
          this.$notify.error({
            title: '失败',
            message: '系统出错，请重试!',
          })
        })
    },
    // 拒绝申请
    handleRejectShop(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogRejectVisible = false
          if (!this.viewForm.shopId) {
            this.$notify.error({
              title: '失败',
              message: '系统出错，请重试!',
            })
            return
          }
          updateShopAdmin({
            shopId: this.viewForm.shopId,
            op: 'reject',
            checkMsg: this.rejectForm.message,
          })
            .then(res => {
              if (res.data.success) {
                this.$notify.success({
                  title: '成功',
                  message: res.data.message,
                })
                this.initData()
                this.rejectForm = {
                  message: '',
                }
              } else {
                this.$notify.error({
                  title: '失败',
                  message: res.data.message,
                })
              }
            })
            .catch(err => {
              this.$notify.error({
                title: '失败',
                message: '系统出错，请重试!',
              })
            })
        } else {
          this.$notify.info({
            title: '提示',
            message: '请输入修改意见！',
          })
        }
      })
    },
  },
}
</script>

<style scoped>
.shop-list {
  box-sizing: border-box;
  min-width: 780px;
  padding: 20px;
}

.pic {
  width: 160px;
  height: 160px;
  display: block;
}
</style>
