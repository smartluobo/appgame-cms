<style>

.title{
	padding-left: 30px;
	padding-right: 10px;
}

</style>
<template>
	<div id="app" style="padding: 3px;">
		<div>
			<Form ref="formValidate" :model="formValidate" :label-width="100">
				<Row>
				<Col span="5">

			    <FormItem label="appid" prop="jumpAppId">
			        <Input v-model="formValidate.jumpAppId" placeholder="Enter your jumpAppId"  style="width:250px"></Input>
			    </FormItem>
				
				</Col>
				<Col span="5">
			   
			   <FormItem label="广告名" prop="jumpName">
			       <Input v-model="formValidate.jumpName" placeholder="Enter your jumpName" style="width:250px" ></Input>
			   </FormItem>
				</Col>
				
				<Col span="5">
				<FormItem label="分类" prop="typeId">
					<Select v-model="formValidate.typeId" style="width:250px" autocomplete="off" >
						<Option v-for="(item,index) in typeList" :value="item.id" :key="item.typeValue">{{ item.typeValue }}</Option>
					</Select>
				</FormItem>
				</Col>
				</Row>
				<Row>
					<Col span="5">
					<FormItem label="隐藏" prop="isHide">
						<Select v-model="formValidate.isHide" style="width:250px" autocomplete="off" >
							<Option value="">全部</Option>
							<Option value="0">隐藏</Option>
							<Option value="1">显示</Option>
						</Select>
					</FormItem>
					</Col>
					
					<Col span="5">
					<FormItem label="盒子" prop="appid">
						<Select v-model="formValidate.appId" style="width:250px" autocomplete="off" >
							<Option v-for="(item,index) in boxList" :value="item.id" :key="item.appId">{{ item.appId }}-{{ item.title }}</Option>
						</Select>
					</FormItem>
					</Col>
					
					<FormItem>
						<div style="float:left;padding-left: 50px">
						<i-button type="primary" icon="ios-search" @click="handleSubmit('formValidate')">搜索</i-button>
					    <Button @click="handleReset('formValidate')" icon="ios-search">重置</Button>
						</div>
						<div style="float:left;padding-left:5px;">
						<i-button type="primary" icon="ios-cloud-upload-outline" @click="add_customer_app()">新增</i-button>
						</div>
					</FormItem>
					
				</Row>

			   
			</Form>
		</div>
		<Modal title="查看大图" v-model="visible" class-name="fl-image-modal">
		      <img :src="imgUrl" v-if="visible" style="width: 100%">
		</Modal>
		   <Table border :columns="columns7" :data="dataList" style="height: 750px;"></Table>
		  <Page :total="this.$data.formValidate.total" :current="this.$data.formValidate.pageNo" show-elevator style="padding-top: 5px;" @on-change="changePage"/>
	</div>

</template>

<script>
    export default {
		name: 'app',
        data () {
            return {
                columns7: [
                    {
                        title: 'id',
                        key: 'id',
						width: 80,
						align: 'center'
                    },
                    {
                        title: '广告名',
                        key: 'jumpName',
						align: 'center',
						width: 150
					},
					{
					    title: '跳转路径',
					    key: 'jumpUrl',
						align: 'center',
						width: 150,
						 render: (h, params) => {
						
						                return h('div', [
						
						                h('span', {
						
						                style: {
						
						                display:'inline-block',
						
						                    width:'95%',
						
						                    overflow:'hidden',
						
						                    textOverflow:'ellipsis',
						
						                    whiteSpace:'nowrap'
						
						                  },
						
						                  domProps: {
						
						                        title: params.row.jumpUrl
						
						                  },
						
						                  on: {
						
						                    click: (e) => {
						
						                        e.stopPropagation();
						
						                    }
						
						            }
						
						        }, params.row.jumpUrl)
						
						        ]);
						
						            }
						
					},
					{
					    title: '描述',
					    key: 'introduce',
						align: 'center',
						width: 150,
						render: (h, params) => {
						
						                return h('div', [
						
						                h('span', {
						
						                style: {
						
						                display:'inline-block',
						
						                    width:'95%',
						
						                    overflow:'hidden',
						
						                    textOverflow:'ellipsis',
						
						                    whiteSpace:'nowrap'
						
						                  },
						
						                  domProps: {
						
						                        title: params.row.introduce
						
						                  },
						
						                  on: {
						
						                    click: (e) => {
						
						                        e.stopPropagation();
						
						                    }
						
						            }
						
						        }, params.row.introduce)
						
						        ]);
						
						            }
						
					},
					{
					    title: '图标',
					    key: 'logo',
						align: 'center',
						width: 100,
						render: (h, params) => {
							if(params.row.logo == ""){
								return h('span', '无logo');
							}else{
								return h('img',{
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										width: '60px', // 改变icon的样式
										height:'60px'
									},
									attrs:{
										src :params.row.logo
									}
								})
							}
							
							
						}
					},
					{
					    title: '广告图',
					    key: 'bannerUrl',
						align: 'center',
						width: 150,
						render: (h, params) => {
							if(params.row.bannerUrl == ""){
								return h('span', '无广告图');
							}else{
								return h('img',{
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										width: '120px', // 改变icon的样式
										height:'60px'
									},
									attrs:{
										src :params.row.bannerUrl,
										onerror:'this.src="http://g.eecup.cn/images/img/404.png"'
									},
									 on:{
										click:(e)=>{
											this.handleView(e.srcElement.currentSrc)
										}
									}
								})
							}
							
						}
					},
	/* 				{
					    title: '序号',
					    key: 'itemIndex',
						align: 'center',
						width: 100
					}, */
					{
					    title: '点击量',
					    key: 'clickNub',
						align: 'center',
						width: 100
					},
					{
					    title: 'appid',
					    key: 'jumpAppId',
						align: 'center',
						width: 180
					},
					{
					    title: '盒子appid',
					    key: 'appId',
						align: 'center',
						width: 180
					},
					{
					    title: '是否隐藏',
					    key: 'isHide',
						align: 'center',
						width: 100,
						render: (h, params) => {
						   return h('i-switch',{
						        props: {
						          size: 'large',
						          value: params.row.isHide == 0 ? false:true
						        },
						        on: {
						          'on-change': (value) => {//触发事件是on-change,用双引号括起来，
									 this.switch(params.row,params.index) //params.index是拿到table的行序列，可以取到对应的表格值
									 }
						        }
						      }, [
						          h('span', {
						              slot: 'open'
						          }, '显示'),
						          h('span', {
						              slot: 'close'
						          }, '隐藏')
						      ])
						}
					},
					{
					    title: '轮播显示',
					    key: 'isBaner',
						align: 'center',
						width: 100,
						render: (h, params) => {
						   return h('i-switch',{
						        props: {
						          size: 'large',
						          value: params.row.isBaner == 0 ? false:true
						        },
						        on: {
						          'on-change': (value) => {//触发事件是on-change,用双引号括起来，
									 this.edit_is_baner(params.row,params.index) //params.index是拿到table的行序列，可以取到对应的表格值
									 }
						        }
						      }, [
						          h('span', {
						              slot: 'open'
						          }, '显示'),
						          h('span', {
						              slot: 'close'
						          }, '隐藏')
						      ])
						}
					},
					{
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
						  return h('div', [
							h('Button', {
								  props: {
									type: 'primary' ,// iview自带的删除icon
									icon: 'ios-add-circle'
								  },
								  on: {
									click: () => {
										this.edit_customer_app(params.row.id);
									}
								  }
							},'编辑'),
							h('Button', {
								  props: {
									icon: 'ios-trash' ,// iview自带的删除icon
									type: 'error' ,// iview自带的删除icon
								  },
								  style: {
									marginLeft: '10px', // 改变icon的样式
								  },
								  on: {
									click: (value) => {
										this.del(params.row,params.index);
									}
								  }
							},"删除")
						  ])
                        }
                    }
                ],
				dataList:[],
			formValidate: {
			    jumpAppId: '',
			    typeId: '',
				jumpName:'',
				appId:"",
				pageNo:0,
				total:0
			},
			typeList:[],
			boxList:[],
			visible:false,
			imgUrl :"",
			pageNo:1,
			ruleValidate: {
			    name: [
			        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
			    ],
			    city: [
			        { required: true, message: 'Please select the city', trigger: 'change' }
			    ]
			}
            }
        },
	   created: function () {
		   var that = this;
		   // `this` 指向 vm 实例
		   this.https.fetchPost('/customerApp/contr/findByPrimaryKey', that.formValidate)
			.then(function (response) {
			  that.dataList = response.data.rows;
			  that.formValidate.pageNo = response.data.pageNo;
			  that.formValidate.total = response.data.total;
			})
			.catch(function (error) {
			  console.log(error);
			});
			
			
			
			this.https.fetchPost('/customerApp/contr/getBoxList', that.formValidate)
			.then(function (response) {
			    that.typeList = response.data.typeList;
				that.boxList = response.data.boxList;
			})
			.catch(function (error) {
			  console.log(error);
			});
			
			
			
		},
        methods: {
			handleView(url) {
			      this.imgUrl = url;
			      this.visible = true;
			},
			handleSubmit (name) {
				var that = this;
				this.https.fetchPost('/customerApp/contr/findByPrimaryKey', that.formValidate)
				 .then(function (response) {
					that.dataList = response.data.rows;
					that.formValidate.total =  response.data.total,
					that.formValidate.pageNo =  response.data.pageNo
				 })
				 .catch(function (error) {
				   console.log(error);
				 });
			},
			handleReset (name) {
			   this.$refs[name].resetFields();
			},
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
			search (){
				var that = this.appId;
			},
			switch(param,index) {
			  //打开是true,已经处理1
			  var isHide = param.isHide;
			  var id = param.id;
			  if(isHide ==0){
				  isHide = 1
			  }else{
				  isHide = 0;
			  } 
			  var that = this;
			 // `this` 指向 vm 实例
			  this.https.fetchPost('/customerApp/contr/changeIsHide', {
			     id: id,        
			     isHide: isHide   
			   })
			   .then(function (response) {
				that.dataList[index].isHide = isHide;
			   })
			   .catch(function (error) {
			     console.log(error);
			   });
			 },
			 del (params,index){
				 var that = this;
				 var id = params.id;
				 this.https.fetchPost('/customerApp/contr/delCustomerApp', {
				    id: id        // 参数 firstName
				  })
				  .then(function (response) {
					  if(response.data.code == "200"){
						  that.dataList.splice(index);
						  that.$Message.success('删除成功!');
					  }else{
						  that.$Message.success('删除失败!');
					  }
						
				  })
				  .catch(function (error) {
				    console.log(error);
				  });
			 },
			 changePage(res){
				 var that = this;
				 that.formValidate.pageNo = res;
				 // `this` 指向 vm 实例
				 this.https.fetchPost('/customerApp/contr/findByPrimaryKey',that.formValidate)
				  .then(function (response) {
				 		that.dataList = response.data.rows;
						that.formValidate.pageNo = response.data.pageNo;
						that.formValidate.total = response.data.total;
				  })
				  .catch(function (error) {
				    console.log(error);
				  });
			 },
			 add_customer_app(){
				 this.$router.push({path: "/add_customer_app"})
			 },
			 edit_customer_app(id){
				 console.log(id);
				 this.$router.push({name:'addCustomerApp',params:{'id':id}});
			 },
			 edit_is_baner(params,index){
				 var that = this;
				 var id = params.id;
				 var isBaner =  params.isBaner;
				 if(isBaner ==0){
					 isBaner = 1;
				 }else{
					 isBaner = 0;
				 }
				 this.https.fetchPost('/customerApp/contr/edit_is_baner',{
					 id:id,
					 isBaner:isBaner
				 })
				  .then(function (response) {
					  that.dataList[index].isBaner = isBaner;
				  })
				  .catch(function (error) {
				    console.log(error);
				  });
			 }
        }
    }
</script>
