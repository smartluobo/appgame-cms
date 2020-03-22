<template>

	<div style="padding: 50px;">
    <Form :model="formItem" :label-width="80" ref="formItem" :rules ="rules">
		<Row>
			<Col span="5">
			  <FormItem label="分类名称" prop="typeValue">
				  <Input v-model="formItem.typeValue" placeholder="Enter name..." autocomplete="off"></Input>
			  </FormItem>
			</Col>
			
			<Col span="5">
			   <FormItem label="序号" prop="serialNumber">
				   <Input v-model="formItem.serialNumber" placeholder="Enter appid..." autocomplete="off" ></Input>
			   </FormItem>
			</Col>
		</Row>
		
		<Row>
			<Col span="5">
			   <FormItem label="展示类型" prop="showType">
					<RadioGroup v-model="formItem.showType">
						<Radio label="1">宫格</Radio>
						<Radio label="2">列表</Radio>
					</RadioGroup>
				</FormItem>
			</Col>
			
			<Col span="5">
			   <FormItem label="是否隐藏" prop="isHide">
					<RadioGroup v-model="formItem.isHide">
						<Radio label="1">显示</Radio>
						<Radio label="2">隐藏</Radio>
					</RadioGroup>
				</FormItem>
			</Col>
		</Row>
		
		<Row style="padding-bottom: 10px;">
			<Col span="5">
			 <img :src="formItem.typeLogo" style="width: 150px;height: 150px;">
			</Col>
			<Icon type="checkmark"></Icon>

		</Row>
		
		<Row>
			<Col span="6">
				<Upload 
				action="http://120.25.250.175:8088/customerApp/contr/uploadImg/"
				:show-upload-list="false"
				:format="['jpg','jpeg','png']"
				:max-size="2048"
				:on-success="handleSuccess"
				:data = "formItem"
				style="display: inline-block;width:58px;"
				>
					<i-button type="dashed" icon="ios-cloud-upload-outline">上传logo</i-button>
				</Upload>
			</Col>
			
			<Col span="3">
				<i-button type="info" @click="handleSubmit('formItem')">保存</i-button>
				<Button @click="goback">取消</Button>
			</Col>
		</Row>
	 

    </Form>
	</div>
</template>
<script>
    export default {
        data () {
            return {
                formItem: {
					id:'',
                    typeValue: '',
                    serialNumber: '',
                    name: '',
                    isHide: '',
					typeLogo:''
                },
				rules:{
				  typeValue: [
					{required: true, message: '必填',tirgger:'blur'}
				  ],
				  serialNumber: [
					{required: true, message: '必填',tirgger:'blur'}
				  ],
				  showType: [
					{required: true, message: '必填',tirgger:'blur'}
				  ],
				  isHide: [
					{required: true, message: '必填'}
				  ],
				  typeLogo: [
					{required: true, message: '必填',tirgger:'blur'}
				  ]
				},
				props:['id'],
				defaultList: [],
				imgName: '',
				visible: false,
				image:""
            }
        },
		computed: {
			uploadList () {
				return this.$refs.upload ? this.$refs.upload.fileList : [];
			}
		},
		mounted(){
			var id = this.$route.params.id;
			var that = this;
			console.log(id);
			if(id !=undefined){
				that.handleType = "edit"
				this.https.fetchPost('/type/contr/find_type', {
				  id: id,        // 参数 firstName
				})
				.then(function (response) {
					that.formItem = response.data;
					that.formItem.showType =response.data.showType+"";
					that.formItem.isHide =response.data.isHide+"";
					
				})
				.catch(function (error) {
				  console.log(error);
				});
			}
		 },
		created: function () {
		 },
		 methods:{
			 handleSubmit (name) {
			 	var that = this;
				
				
				if(that.formItem.id !=""){
					this.https.fetchPost('/type/contr/editType',that.formItem)
					 .then(function (response) {
						if(response.data.code =="200"){
							that.$Message.success('修改成功!');
							///that.$router.push({name:'customerAddImages',params:{'id':response.data.id,"logo":""}});
							that.$router.push({path: "/type_list"})
						}
					 })
					 .catch(function (error) {
					   console.log(error);
					 });
				}else{
					this.https.fetchPost('/type/contr/add_type',that.formItem)
					 .then(function (response) {
						if(response.data.code =="200"){
							that.$Message.success('添加成功!');
							///that.$router.push({name:'customerAddImages',params:{'id':response.data.id,"logo":""}});
							that.$router.push({path: "/type_list"})
						}
					 })
					 .catch(function (error) {
					   console.log(error);
					 });
				}
			 },
			 goback(){
				 this.$router.go(-1);
			 },
			 handleSuccess (res, file) {
				 // 因为上传过程为实例，这里模拟添加 url
				 console.log(res);
				 console.log(file);
				 this.formItem.typeLogo = res.url;
			 },
		 }
		
    }
</script>
