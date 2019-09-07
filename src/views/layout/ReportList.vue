<template>
  <div class="report-list">
    <h4 v-if="reportList.length > 0">用户举报</h4>
    <el-table :data="reportList" style="width: 100%" stripe>
      <el-table-column label="举报 ID" prop="reportId"></el-table-column>
      <el-table-column label="举报用户" prop="userId"></el-table-column>
      <el-table-column label="商店 ID" prop="shopId"></el-table-column>
      <el-table-column label="商品 ID" prop="cmdtId"></el-table-column>
      <el-table-column label="举报原因" prop="reason"></el-table-column>
      <el-table-column label="操作" width="240px">
        <template slot-scope="scope">
          <el-button size="small" @click="handleViewDetails(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" type="danger" @click="handleDown(scope.$index, scope.row)">下线商店</el-button>
          <el-button size="mini" type="warning" @click="handleIgnore(scope.$index, scope.row)">忽略</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 店铺和商品详情 -->
    <el-dialog title="店铺和商品详情" :visible.sync="dialogFormVisible">
      <!-- 店铺信息 -->
      <h4>商铺信息</h4>
      <el-form :model="shopForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="店铺名称:">
              <span>{{ shopForm.name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="店铺 ID:">
              <span>{{ shopForm.shopId }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="店铺介绍:">
              <span>{{ shopForm.notice }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="店铺地址:">
              <span>{{ shopForm.address }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话:">
              <span>{{ shopForm.tel }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="营业时间:">
              <span>{{ shopForm.time }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="店铺法人:">
              <span>{{ shopForm.legalRepr }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号:">
              <span>{{ shopForm.idNumber }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="店铺头像:">
              <img
                v-if="shopForm.shopImg"
                :src="baseImgUploadedPath + shopForm.shopImg"
                class="pic"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="营业执照:">
              <img
                v-if="shopForm.licenseImg"
                :src="baseImgUploadedPath + shopForm.licenseImg"
                class="pic"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="身份证正:">
              <img
                v-if="shopForm.withIdFrontImg"
                :src="baseImgUploadedPath + shopForm.withIdFrontImg"
                class="pic"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证反:">
              <img
                v-if="shopForm.withIdBackImg"
                :src="baseImgUploadedPath + shopForm.withIdBackImg"
                class="pic"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="修改建议:">
              <span>{{ shopForm.checkMsg }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 商品信息 -->
      <h4>商品信息</h4>
      <el-form :model="commodityForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品名称:">
              <span>{{ commodityForm.name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品 ID:">
              <span>{{ commodityForm.id }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品分类:">
              <span>{{ commodityForm.classValue }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品详情:">
              <span>{{ commodityForm.details }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动详情:">
              <span>{{ commodityForm.promotionInfo }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="原价:">
              <span>{{ commodityForm.originalPrice }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始时间:">
              <span>{{ commodityForm.startTime }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="现价:">
              <span>{{ commodityForm.price }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间:">
              <span>{{ commodityForm.endTime }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品图片1:" v-if="commodityForm.pic1">
              <img
                v-if="commodityForm.pic1"
                :src="baseImgUploadedPath + commodityForm.pic1"
                class="pic"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品图片2:" v-if="commodityForm.pic2">
              <img
                v-if="commodityForm.pic2"
                :src="baseImgUploadedPath + commodityForm.pic2"
                class="pic"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品图片3:" v-if="commodityForm.pic3">
              <img
                v-if="commodityForm.pic3"
                :src="baseImgUploadedPath + commodityForm.pic1"
                class="pic"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品图片4:" v-if="commodityForm.pic4">
              <img
                v-if="commodityForm.pic4"
                :src="baseImgUploadedPath + commodityForm.pic2"
                class="pic"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品图片5:" v-if="commodityForm.pic5">
              <img
                v-if="commodityForm.pic5"
                :src="baseImgUploadedPath + commodityForm.pic5"
                class="pic"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 忽略举报 -->
    <el-dialog title="提示" :visible.sync="dialogConfirmVisible">
      <span>确认忽略？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogConfirmVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleIgnoreReport">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 填写下线理由 -->
    <el-dialog title="下线商店" :visible.sync="dialogDownVisible">
      <el-form :model="downShopForm" :rules="rules" ref="downShopForm">
        <el-form-item label="修改意见" prop="message">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="不超过85个字"
            v-model="downShopForm.message"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDownVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDownShop('downShopForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { baseImgUploadedPath } from '@/config/env'
import { getShop, updateShopAdmin } from '@/api/shop'
import { getCommodity } from '@/api/commodity'
import { getReports, updateReport } from '@/api/report'
export default {
  data() {
    return {
      selectedReportId: '',
      dialogFormVisible: false,
      dialogConfirmVisible: false,
      dialogDownVisible: false,
      shopForm: {},
      commodityForm: {},
      reportList: [],
      downShopForm: {
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
      // 举报列表
      getReports()
        .then(res => {
          this.reportList = res.data
        })
        .catch(err => {
          this.$notify.error({
            title: '失败',
            message: '系统出错，请重试!',
          })
        })
    },
    // 查看详情
    handleViewDetails(index, row) {
      getShop(row.shopId)
        .then(res => {
          this.shopForm = res.data
        })
        .catch(err => {
          this.$notify.error({
            title: '失败',
            message: '系统出错，请重试!',
          })
        })
      getCommodity(row.cmdtId)
        .then(res => {
          this.commodityForm = res.data
          // 格式化时间
          this.commodityForm.startTime = this.moment(
            this.commodityForm.startTime,
          ).format('YYYY-MM-DD HH:mm:ss')
          this.commodityForm.endTime = this.moment(
            this.commodityForm.endTime,
          ).format('YYYY-MM-DD HH:mm:ss')
        })
        .catch(err => {
          this.$notify.error({
            title: '失败',
            message: '系统出错，请重试!',
          })
        })
      this.dialogFormVisible = true
    },
    // 点击忽略
    handleIgnore(index, row) {
      this.selectedReportId = row.reportId
      this.dialogConfirmVisible = true
    },
    // 点击下线商店
    handleDown(index, row) {
      this.selectedReportId = row.reportId
      this.shopForm = row
      this.dialogDownVisible = true
    },
    // 通过申请
    handleIgnoreReport() {
      this.dialogConfirmVisible = false
      updateReport(this.selectedReportId).then(res => {
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
    },
    // 拒绝申请
    handleDownShop(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogDownVisible = false
          if (!this.shopForm.shopId) {
            this.$notify.error({
              title: '失败',
              message: '系统出错，请重试!',
            })
            return
          }
          updateShopAdmin({
            shopId: this.shopForm.shopId,
            op: 'down',
            checkMsg: this.downShopForm.message,
          })
            .then(res => {
              if (res.data.success) {
                this.$notify.success({
                  title: '成功',
                  message: res.data.message,
                })
                return updateReport(this.selectedReportId)
              } else {
                this.$notify.error({
                  title: '失败',
                  message: res.data.message,
                })
              }
            })
            .then(res => {
              if (res.data.success) {
                this.$notify.success({
                  title: '成功',
                  message: res.data.message,
                })
                this.initData()
                this.downShopForm = {
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
.report-list {
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
